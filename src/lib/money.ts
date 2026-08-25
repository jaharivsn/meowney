const BRL_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const MAX_SAFE = Number.MAX_SAFE_INTEGER;

const INCOME_TYPES: ReadonlySet<string> = new Set([
  'income',
  'entrada',
  'in',
  'credit',
  'receita',
  'deposit',
  'depos',
]);

const EXPENSE_TYPES: ReadonlySet<string> = new Set([
  'expense',
  'despesa',
  'out',
  'debit',
  'saida',
  'saída',
  'payment',
  'pagamento',
]);

function isNegativeInput(value: string): boolean {
  if (value.startsWith('(') && value.endsWith(')')) {
    return true;
  }

  return /(^|[^\d])-/.test(value) || /-\s*$/.test(value);
}

function parseDecimalParts(value: string): { integer: string; fraction: string } | null {
  const sanitized = value.replace(/[^0-9.,]/g, '');

  if (!sanitized) {
    return null;
  }

  const lastComma = sanitized.lastIndexOf(',');
  const lastDot = sanitized.lastIndexOf('.');

  if (lastComma === -1 && lastDot === -1) {
    return { integer: sanitized, fraction: '' };
  }

  if (lastComma !== -1 && lastDot !== -1) {
    const decimalIndex = Math.max(lastComma, lastDot);

    return {
      integer: sanitized.slice(0, decimalIndex).replace(/[.,]/g, ''),
      fraction: sanitized.slice(decimalIndex + 1).replace(/[.,]/g, ''),
    };
  }

  const separator = lastComma !== -1 ? ',' : '.';
  const parts = sanitized.split(separator);

  if (parts.length === 1) {
    return { integer: parts[0] ?? '', fraction: '' };
  }

  if (parts.length === 2) {
    const before = parts[0] ?? '';
    const after = parts[1] ?? '';

    if (separator === ',') {
      return { integer: before, fraction: after };
    }

    const isLikelyDotThousands =
      after.length === 3 &&
      before.length > 0 &&
      before.length <= 3 &&
      !/^0+$/.test(before);

    if (isLikelyDotThousands) {
      return { integer: before + after, fraction: '' };
    }

    return { integer: before, fraction: after };
  }

  const lastPart = parts[parts.length - 1] ?? '';

  if (lastPart.length <= 2) {
    return {
      integer: parts.slice(0, -1).join(''),
      fraction: lastPart,
    };
  }

  return {
    integer: parts.join(''),
    fraction: '',
  };
}

function roundFractionToCents(fraction: string): { cents: number; carry: number } {
  if (!fraction) {
    return { cents: 0, carry: 0 };
  }

  const first = fraction.charCodeAt(0) - 48;

  if (first < 0 || first > 9) {
    return { cents: 0, carry: 0 };
  }

  if (fraction.length === 1) {
    return { cents: first * 10, carry: 0 };
  }

  const second = fraction.charCodeAt(1) - 48;

  if (second < 0 || second > 9) {
    return { cents: first * 10, carry: 0 };
  }

  const base = first * 10 + second;

  if (fraction.length === 2) {
    return { cents: base, carry: 0 };
  }

  const third = fraction.charCodeAt(2) - 48;

  if (third >= 5 && third <= 9) {
    const rounded = base + 1;

    if (rounded >= 100) {
      return { cents: 0, carry: 1 };
    }

    return { cents: rounded, carry: 0 };
  }

  return { cents: base, carry: 0 };
}

function buildCentsFromParts(
  integer: string,
  fractionCents: number,
  carry: number,
  isNegative: boolean,
): number {
  const cleanInteger = integer.replace(/^0+(?=\d)/, '') || '0';

  if (!/^\d+$/.test(cleanInteger)) {
    return 0;
  }

  let integerAmount = 0;

  for (let index = 0; index < cleanInteger.length; index += 1) {
    const digit = cleanInteger.charCodeAt(index) - 48;

    if (digit < 0 || digit > 9) {
      return 0;
    }

    if (integerAmount > Math.floor((MAX_SAFE - 9) / 10)) {
      return isNegative ? -MAX_SAFE : MAX_SAFE;
    }

    integerAmount = integerAmount * 10 + digit;
  }

  const extraCents = fractionCents + carry * 100;
  const maxAllowedInteger = Math.floor((MAX_SAFE - extraCents) / 100);

  if (integerAmount > maxAllowedInteger) {
    return isNegative ? -MAX_SAFE : MAX_SAFE;
  }

  const total = integerAmount * 100 + extraCents;

  if (!Number.isSafeInteger(total)) {
    return isNegative ? -MAX_SAFE : MAX_SAFE;
  }

  return total === 0 ? 0 : isNegative ? -total : total;
}

export function toCents(amount: number): number {
  if (!Number.isFinite(amount)) {
    return 0;
  }

  const cents = Math.round(amount * 100);

  return cents === 0 ? 0 : cents;
}

export function fromCents(cents: number): number {
  if (!Number.isFinite(cents)) {
    return 0;
  }

  const amount = cents / 100;

  return amount === 0 ? 0 : amount;
}

export function formatBRL(centsOrAmount: number, isCents = true): string {
  const safeValue = Number.isFinite(centsOrAmount) ? centsOrAmount : 0;
  const amount = isCents ? safeValue / 100 : safeValue;

  return BRL_FORMATTER.format(amount === 0 ? 0 : amount);
}

export function parseBRLInputToCents(input: string): number {
  if (typeof input !== 'string') {
    return 0;
  }

  const trimmed = input.trim();

  if (!trimmed) {
    return 0;
  }

  const validation = trimmed.replace(/R\$\s*/gi, '').replace(/\s+/g, '');

  if (/[A-Za-z]/.test(validation)) {
    return 0;
  }

  const parts = parseDecimalParts(trimmed);

  if (!parts) {
    return 0;
  }

  const { cents, carry } = roundFractionToCents(parts.fraction);

  return buildCentsFromParts(parts.integer, cents, carry, isNegativeInput(trimmed));
}

export function sumCents(values: number[]): number {
  if (!Array.isArray(values)) {
    return 0;
  }

  let total = 0;

  for (const value of values) {
    if (!Number.isFinite(value)) {
      continue;
    }

    const cents = Math.round(value);

    if (!Number.isSafeInteger(cents)) {
      return cents >= 0 ? MAX_SAFE : -MAX_SAFE;
    }

    if (cents > 0 && total > MAX_SAFE - cents) {
      return MAX_SAFE;
    }

    if (cents < 0 && total < -MAX_SAFE - cents) {
      return -MAX_SAFE;
    }

    total += cents;
  }

  return total === 0 ? 0 : total;
}

export function calculateBalanceCents(
  transactions: Array<{ type: 'income' | 'expense' | (string & {}); amount: number }>,
): number {
  if (!Array.isArray(transactions)) {
    return 0;
  }

  const signedCents: number[] = [];

  for (const transaction of transactions) {
    if (!transaction || typeof transaction !== 'object') {
      continue;
    }

    const { type, amount } = transaction;

    if (!Number.isFinite(amount)) {
      continue;
    }

    const cents = Math.round(amount);
    const normalizedType = typeof type === 'string' ? type.trim().toLowerCase() : '';

    if (INCOME_TYPES.has(normalizedType)) {
      signedCents.push(Math.abs(cents));
    } else if (EXPENSE_TYPES.has(normalizedType)) {
      signedCents.push(-Math.abs(cents));
    } else {
      signedCents.push(cents);
    }
  }

  return sumCents(signedCents);
}

export function formatCurrencyCompact(cents: number): string {
  const safeCents = Number.isFinite(cents) ? cents : 0;
  const amount = safeCents / 100;

  if (amount === 0) {
    return BRL_FORMATTER.format(0);
  }

  const absoluteAmount = Math.abs(amount);

  if (absoluteAmount < 1000) {
    return BRL_FORMATTER.format(amount);
  }

  const sign = amount < 0 ? '-' : '';

  if (absoluteAmount >= 1000000000) {
    return `${sign}R$ ${COMPACT_NUMBER_FORMATTER.format(absoluteAmount / 1000000000)} bi`;
  }

  if (absoluteAmount >= 1000000) {
    return `${sign}R$ ${COMPACT_NUMBER_FORMATTER.format(absoluteAmount / 1000000)} mi`;
  }

  return `${sign}R$ ${COMPACT_NUMBER_FORMATTER.format(absoluteAmount / 1000)} mil`;
}