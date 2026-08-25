import type { Expense, Goal, Category, PersonalityId } from './schemas';
import { getPersonality } from './personalities';

export interface Insight {
  id: string;
  sentence: string;
  actionLabel?: string;
  actionHref?: string;
  actionAmount?: number;
  actionGoalId?: string;
  tone: 'info' | 'warn' | 'celebrate';
}

function startOfWeek(d: Date): Date {
  const x = new Date(d);
  const day = x.getDay();
  const diff = day === 0 ? 6 : day - 1;
  x.setDate(x.getDate() - diff);
  x.setHours(0, 0, 0, 0);
  return x;
}

function sumByCategory(expenses: Expense[], from: Date, to: Date): Map<string, number> {
  const map = new Map<string, number>();
  for (const e of expenses) {
    if (e.type !== 'expense') continue;
    const d = new Date(e.date);
    if (isNaN(d.getTime()) || d < from || d > to) continue;
    const key = e.category;
    map.set(key, (map.get(key) || 0) + e.amount);
  }
  return map;
}

function fmt(n: number): string {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function buildWeeklyInsight(
  expenses: Expense[],
  goals: Goal[],
  categories: Category[],
  personality: PersonalityId | null
): Insight {
  const now = new Date();
  const thisWeekStart = startOfWeek(now);
  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setMilliseconds(-1);

  const thisMap = sumByCategory(expenses, thisWeekStart, now);
  const lastMap = sumByCategory(expenses, lastWeekStart, lastWeekEnd);

  let topCat = '';
  let topAmt = 0;
  for (const [cat, amt] of thisMap) {
    if (amt > topAmt) {
      topAmt = amt;
      topCat = cat;
    }
  }

  const p = getPersonality(personality);
  const activeGoal = goals.find((g) => g.currentAmount < g.targetAmount);

  if (expenses.filter((e) => e.type === 'expense').length === 0) {
    return {
      id: 'empty',
      sentence:
        p.id === 'sassy'
          ? 'Nada no extrato ainda. O silêncio é ouro — ou medo de olhar a fatura. Lance o primeiro gasto.'
          : 'Nenhum gasto ainda. Toque na patinha e registre o primeiro — a ração não se anota sozinha.',
      actionLabel: 'Adicionar gasto',
      actionHref: '/app/add',
      tone: 'info',
    };
  }

  if (topCat && topAmt > 0) {
    const lastAmt = lastMap.get(topCat) || 0;
    let comparison = '';
    if (lastAmt > 0) {
      const pct = Math.round(((topAmt - lastAmt) / lastAmt) * 100);
      if (pct > 15) comparison = ` — ${pct}% acima da semana passada`;
      else if (pct < -15) comparison = ` — ${Math.abs(pct)}% abaixo da semana passada`;
      else comparison = ' — parecido com a semana passada';
    }

    const envelope = categories.find(
      (c) =>
        c.label.toLowerCase() === topCat.toLowerCase() ||
        c.id.toLowerCase() === topCat.toLowerCase()
    );
    const overLimit =
      envelope?.monthlyLimit &&
      (() => {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthTotal = expenses
          .filter((e) => {
            if (e.type !== 'expense') return false;
            const d = new Date(e.date);
            return (
              d >= monthStart &&
              (e.category.toLowerCase() === topCat.toLowerCase() ||
                e.category.toLowerCase() === envelope.label.toLowerCase())
            );
          })
          .reduce((s, e) => s + e.amount, 0);
        return monthTotal > envelope.monthlyLimit!;
      })();

    if (activeGoal) {
      const remaining = Math.max(0, activeGoal.targetAmount - activeGoal.currentAmount);
      const suggest = Math.min(50, remaining, Math.max(10, Math.round(remaining / 4)));
      return {
        id: 'week-cat-goal',
        sentence: `Essa semana ${topCat.toLowerCase()} comeu R$ ${fmt(topAmt)}${comparison}. "${activeGoal.title}" cabe no cofrinho se você guardar R$ ${fmt(suggest)} agora.`,
        actionLabel: `Guardar R$ ${fmt(suggest)}`,
        actionAmount: suggest,
        actionGoalId: activeGoal.id,
        actionHref: '/app/goals',
        tone: overLimit ? 'warn' : 'info',
      };
    }

    return {
      id: 'week-cat',
      sentence: `Essa semana ${topCat.toLowerCase()} comeu R$ ${fmt(topAmt)}${comparison}.`,
      actionLabel: 'Ver gastos',
      actionHref: '/app/expenses',
      tone: overLimit ? 'warn' : 'info',
    };
  }

  // Streak: days since last log
  const last = [...expenses]
    .filter((e) => e.type === 'expense')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  if (last) {
    const days = Math.floor(
      (now.getTime() - new Date(last.date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days >= 3) {
      return {
        id: 'streak',
        sentence: `Faz ${days} dias sem lançar nada. O gato esqueceu — ou você?`,
        actionLabel: 'Lançar agora',
        actionHref: '/app/add',
        tone: 'warn',
      };
    }
  }

  if (activeGoal) {
    const remaining = Math.max(0, activeGoal.targetAmount - activeGoal.currentAmount);
    return {
      id: 'goal',
      sentence: `Faltam R$ ${fmt(remaining)} para "${activeGoal.title}". Um passo de cada vez.`,
      actionLabel: 'Abrir cofrinho',
      actionHref: '/app/goals',
      tone: 'celebrate',
    };
  }

  return {
    id: 'ok',
    sentence: 'Semana calma no extrato. Bom momento pra criar um Cat-Stash.',
    actionLabel: 'Criar meta',
    actionHref: '/app/goals',
    tone: 'info',
  };
}

/** Local fallback answers when Groq is down */
export function localChatReply(
  question: string,
  expenses: Expense[],
  goals: Goal[],
  balance: number,
  personality: PersonalityId | null
): string {
  const q = question.toLowerCase();
  const insight = buildWeeklyInsight(expenses, goals, [], personality);
  const p = getPersonality(personality);

  if (q.includes('semana') || q.includes('como foi') || q.includes('resumo')) {
    return `${insight.sentence} (resumo local — o gato está offline da nuvem.)`;
  }
  if (q.includes('lazer') || q.includes('ifood') || q.includes('posso')) {
    const weekSpend = expenses
      .filter((e) => {
        if (e.type !== 'expense') return false;
        const d = new Date(e.date);
        return d >= startOfWeek(new Date());
      })
      .reduce((s, e) => s + e.amount, 0);
    const room = Math.max(0, balance * 0.1);
    return p.id === 'sassy'
      ? `Saldo R$ ${fmt(balance)}. Já saiu R$ ${fmt(weekSpend)} essa semana. Se for gastar, limite a uns R$ ${fmt(room)} — senão o cofrinho mia.`
      : `Com saldo de R$ ${fmt(balance)} e R$ ${fmt(weekSpend)} gastos na semana, um lazer de até R$ ${fmt(room)} cabe sem drama.`;
  }
  if (q.includes('ração') || q.includes('meta') || q.includes('falta') || q.includes('cofrinho')) {
    const g = goals.find((x) => x.currentAmount < x.targetAmount);
    if (!g) return 'Nenhuma meta ativa. Crie um Cat-Stash na aba Metas.';
    const left = Math.max(0, g.targetAmount - g.currentAmount);
    return `Faltam R$ ${fmt(left)} para "${g.title}".`;
  }
  return `${insight.sentence} Pergunte “como foi a semana?”, “posso gastar em lazer?” ou “quanto falta na ração?”.`;
}

export function buildFinanceSummary(expenses: Expense[], goals: Goal[], balance: number) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const byCat = new Map<string, number>();
  for (const e of expenses) {
    if (e.type !== 'expense') continue;
    const d = new Date(e.date);
    if (d < monthStart) continue;
    byCat.set(e.category, (byCat.get(e.category) || 0) + e.amount);
  }
  const monthlyByCategory = [...byCat.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);

  const latest = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
    .map((e) => ({
      title: e.title,
      amount: e.amount,
      category: e.category,
      type: e.type,
      date: e.date.slice(0, 10),
    }));

  return {
    balance,
    monthlyByCategory,
    latest,
    goals: goals.map((g) => ({
      id: g.id,
      title: g.title,
      current: g.currentAmount,
      target: g.targetAmount,
      remaining: Math.max(0, g.targetAmount - g.currentAmount),
    })),
  };
}
