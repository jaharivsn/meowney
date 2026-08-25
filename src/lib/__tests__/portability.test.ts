import { describe, it, expect } from 'vitest';
import { validateAndParseBackupJSON } from '../export';
import type { MeowneyState } from '../schemas';

describe('portability & backup validation', () => {
  const sampleState: MeowneyState = {
    balance: 150000,
    expenses: [
      {
        id: 'exp_1',
        title: 'Café com bolo',
        amount: 2500,
        category: 'Alimentação',
        type: 'expense',
        date: '2026-08-24',
      },
    ],
    goals: [
      {
        id: 'goal_1',
        title: 'Viagem para Tóquio',
        targetAmount: 500000,
        currentAmount: 120000,
        category: 'Viagem',
      },
    ],
    categories: [
      {
        id: 'cat_1',
        label: 'Alimentação',
        icon: 'restaurant',
        type: 'expense',
      },
    ],
    hasSeenTutorial: true,
    personality: 'accountant',
    aiOptIn: false,
    roundUpGoalId: null,
    notificationsEnabled: false,
  };

  it('validates and parses a full MeowneyBackupFile correctly', () => {
    const backupFile = JSON.stringify({
      app: 'meowney',
      version: 1,
      exportedAt: '2026-08-24T12:00:00.000Z',
      state: sampleState,
    });

    const result = validateAndParseBackupJSON(backupFile);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.balance).toBe(150000);
      expect(result.state.expenses).toHaveLength(1);
      expect(result.state.personality).toBe('accountant');
    }
  });

  it('validates a direct state JSON payload', () => {
    const directStateJson = JSON.stringify(sampleState);
    const result = validateAndParseBackupJSON(directStateJson);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.state.goals).toHaveLength(1);
    }
  });

  it('rejects invalid JSON gracefully without throwing', () => {
    const result = validateAndParseBackupJSON('{ invalid json ...');
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain('Não foi possível ler o arquivo JSON');
    }
  });

  it('rejects incompatible schemas gracefully', () => {
    const incompatible = JSON.stringify({
      app: 'other-app',
      unknownField: 123,
    });
    const result = validateAndParseBackupJSON(incompatible);
    expect(result.ok).toBe(false);
  });
});
