import { NextResponse } from "next/server";
import { z } from "zod";
import { PersonalityIdSchema } from "@/lib/schemas";
import { getPersonality } from "@/lib/personalities";

const SummarySchema = z.object({
  balance: z.number(),
  monthlyByCategory: z.array(
    z.object({ category: z.string(), total: z.number() })
  ),
  latest: z.array(
    z.object({
      title: z.string(),
      amount: z.number(),
      category: z.string(),
      type: z.enum(["expense", "income"]),
      date: z.string(),
    })
  ),
  goals: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      current: z.number(),
      target: z.number(),
      remaining: z.number(),
    })
  ),
});

const BodySchema = z.object({
  personality: PersonalityIdSchema,
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(800) }))
    .max(12),
  summary: SummarySchema,
});

const TOOLS = [
  {
    type: "function",
    function: {
      name: "add_expense",
      description: "Registra um gasto ou renda. Use só quando o usuário pedir para lançar um valor.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          amount: { type: "number" },
          category: { type: "string" },
          type: { type: "string", enum: ["expense", "income"] },
        },
        required: ["title", "amount", "type"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "contribute_goal",
      description: "Guarda um valor em um Cat-Stash existente.",
      parameters: {
        type: "object",
        properties: {
          goalId: { type: "string" },
          amount: { type: "number" },
        },
        required: ["goalId", "amount"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_week_summary",
      description: "Devolve o resumo financeiro já enviado no contexto.",
      parameters: { type: "object", properties: {} },
    },
  },
];

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { personality, messages, summary } = parsed.data;
  const persona = getPersonality(personality);

  if (!key) {
    return NextResponse.json({ error: "no_key", fallback: true }, { status: 503 });
  }

  const system = [
    persona.systemTone,
    "Você é o gato do Meowney. Responda em pt-BR, curto (máx 80 palavras).",
    "Cite APENAS números do JSON de resumo. Nunca invente saldo, metas ou gastos.",
    "Recuse conselho de investimento, crédito ou Open Finance.",
    "Se o usuário quiser lançar um gasto, chame add_expense. Se quiser guardar no cofrinho, contribute_goal.",
    `Resumo: ${JSON.stringify(summary)}`,
  ].join("\n");

  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      max_tokens: 280,
      tools: TOOLS,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });

  if (groqRes.status === 429) {
    return NextResponse.json({ error: "rate_limited", fallback: true }, { status: 429 });
  }
  if (!groqRes.ok) {
    return NextResponse.json({ error: "upstream", fallback: true }, { status: 502 });
  }

  const data = (await groqRes.json()) as {
    choices?: Array<{
      message?: {
        content?: string | null;
        tool_calls?: Array<{
          function: { name: string; arguments: string };
        }>;
      };
    }>;
  };

  const msg = data.choices?.[0]?.message;
  const toolCalls = msg?.tool_calls ?? [];
  const actions: Array<Record<string, unknown>> = [];

  for (const call of toolCalls) {
    let args: Record<string, unknown> = {};
    try {
      args = JSON.parse(call.function.arguments || "{}") as Record<string, unknown>;
    } catch {
      continue;
    }
    if (call.function.name === "add_expense") {
      const amount = Number(args.amount);
      const type = args.type === "income" ? "income" : "expense";
      const title = String(args.title || "Lançamento").slice(0, 80);
      const category = String(args.category || "Geral").slice(0, 40);
      if (amount > 0 && Number.isFinite(amount)) {
        actions.push({ type: "add_expense", title, amount, category, txType: type });
      }
    }
    if (call.function.name === "contribute_goal") {
      const amount = Number(args.amount);
      const goalId = String(args.goalId || "");
      if (amount > 0 && Number.isFinite(amount) && goalId) {
        actions.push({ type: "contribute_goal", goalId, amount });
      }
    }
    if (call.function.name === "get_week_summary") {
      actions.push({ type: "get_week_summary" });
    }
  }

  const reply =
    (msg?.content && msg.content.trim()) ||
    (actions.length
      ? "Pronto — fiz o que você pediu com os números do seu extrato."
      : "Miau. Me pergunta da semana, do lazer ou de uma meta.");

  return NextResponse.json({ reply, actions });
}
