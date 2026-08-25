import { MeowneyStateSchema, type Expense, type MeowneyState } from './schemas';

export interface MeowneyBackupFile {
  app: 'meowney';
  version: number;
  exportedAt: string;
  state: MeowneyState;
}

export function exportBackupJSON(state: MeowneyState) {
  const payload: MeowneyBackupFile = {
    app: 'meowney',
    version: 1,
    exportedAt: new Date().toISOString(),
    state,
  };
  const json = JSON.stringify(payload, null, 2);
  const dateStr = new Date().toISOString().slice(0, 10);
  downloadText(`meowney-backup-${dateStr}.json`, json, 'application/json');
}

export function validateAndParseBackupJSON(
  rawText: string
): { ok: true; state: MeowneyState } | { ok: false; error: string } {
  try {
    const raw = JSON.parse(rawText);
    if (!raw || typeof raw !== 'object') {
      return { ok: false, error: 'Arquivo JSON inválido ou vazio.' };
    }

    // Support both direct state JSON or wrapped { app: 'meowney', state: ... }
    const candidate = 'state' in raw ? (raw as Record<string, unknown>).state : raw;
    const result = MeowneyStateSchema.safeParse(candidate);

    if (result.success) {
      return { ok: true, state: result.data };
    }

    // Attempt soft fallback if missing optional fields
    if (candidate && typeof candidate === 'object') {
      const partial = candidate as Partial<MeowneyState>;
      if (Array.isArray(partial.expenses) && typeof partial.balance === 'number') {
        const fixed: MeowneyState = {
          balance: partial.balance,
          expenses: partial.expenses || [],
          goals: partial.goals || [],
          categories: partial.categories || [],
          hasSeenTutorial: partial.hasSeenTutorial ?? false,
          personality: partial.personality ?? null,
          aiOptIn: partial.aiOptIn ?? false,
          roundUpGoalId: partial.roundUpGoalId ?? null,
          notificationsEnabled: partial.notificationsEnabled ?? false,
        };
        return { ok: true, state: fixed };
      }
    }

    return { ok: false, error: 'Estrutura do arquivo incompatível com o Meowney.' };
  } catch {
    return { ok: false, error: 'Não foi possível ler o arquivo JSON.' };
  }
}

export function expensesToCsv(expenses: Expense[]): string {
  const header = 'id,title,amount,category,type,date';
  const rows = expenses.map((e) =>
    [
      e.id,
      `"${e.title.replace(/"/g, '""')}"`,
      e.amount,
      `"${e.category.replace(/"/g, '""')}"`,
      e.type,
      e.date,
    ].join(',')
  );
  return [header, ...rows].join('\n');
}

export function parseExpensesCsv(csv: string): Expense[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const out: Expense[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].match(/(".*?"|[^,]+)/g);
    if (!cols || cols.length < 6) continue;
    const clean = (s: string) => s.replace(/^"|"$/g, '').replace(/""/g, '"');
    const amount = parseFloat(cols[2]);
    if (isNaN(amount)) continue;
    const type = cols[4] === 'income' ? 'income' : 'expense';
    out.push({
      id: clean(cols[0]) || `imp_${i}_${Date.now()}`,
      title: clean(cols[1]),
      amount,
      category: clean(cols[3]),
      type,
      date: clean(cols[5]),
    });
  }
  return out;
}

export function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function nextRecurrenceIcs(title: string, nextDateIso: string, amount: number): string {
  const d = new Date(nextDateIso);
  const stamp = d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const day = stamp.slice(0, 8);
  const uid = `meowney-${day}-${amount}@local`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Meowney//Recurrence//PT',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${day}`,
    `SUMMARY:Meowney — ${title} (R$ ${amount.toFixed(2)})`,
    'DESCRIPTION:Lembrete local do Meowney',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
