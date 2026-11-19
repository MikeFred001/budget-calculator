export const frequencies = ["BiWeekly", "Monthly", "Yearly"] as const;
export type Frequency = (typeof frequencies)[number];

export const frequencyLabels: Record<Frequency, string> = {
  BiWeekly: "Every 2 weeks",
  Monthly: "Monthly",
  Yearly: "Yearly",
};

export interface PaymentInput {
  name: string;
  cost: number;
  freq: Frequency;
  startDate: string;
}

export interface Payment extends PaymentInput {
  id: number;
}

export interface DebtInput {
  name: string;
  amount: number;
}

export interface Debt extends DebtInput {
  id: number;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const calendarDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMoney(cents: number): string {
  return usd.format(cents / 100);
}

export function toCents(amount: number): number {
  return Math.round(amount * 100);
}

export function parseAmount(value: string): number | null {
  const amount = Number(value);
  return /^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(value) &&
    amount <= 99_999_999.99
    ? amount
    : null;
}

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000")) {
    return false;
  }

  const date = new Date(value);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function todayDate(now = new Date()): string {
  const parts = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  return parts
    .map((part, index) => String(part).padStart(index === 0 ? 4 : 2, "0"))
    .join("-");
}

export function formatCalendarDate(date: string): string {
  return calendarDate.format(new Date(date));
}

const paymentsPerYear: Record<Frequency, number> = {
  BiWeekly: 26,
  Monthly: 12,
  Yearly: 1,
};

export function monthlyCents(cost: number, frequency: Frequency): number {
  return Math.round((toCents(cost) * paymentsPerYear[frequency]) / 12);
}

const twoWeeks = 14 * 24 * 60 * 60 * 1000;

export function nextPaymentDate(
  payment: Pick<Payment, "startDate" | "freq">,
  today: string,
): string {
  const start = payment.startDate.slice(0, 10);
  if (start >= today) return start;

  if (payment.freq === "BiWeekly") {
    const startTime = Date.parse(start);
    const periods = Math.ceil((Date.parse(today) - startTime) / twoWeeks);
    return new Date(startTime + periods * twoWeeks).toISOString().slice(0, 10);
  }

  const [startYear, startMonth, startDay] = start.split("-").map(Number);
  const [year, month] = today.split("-").map(Number);
  const interval = payment.freq === "Yearly" ? 12 : 1;
  const elapsedMonths = (year - startYear) * 12 + month - startMonth;
  const periods = Math.floor(elapsedMonths / interval);

  function occurrence(period: number) {
    // Recalculate from the original day so February never shifts later payments.
    const date = new Date(0);
    const monthIndex = startMonth - 1 + period * interval;
    date.setUTCFullYear(startYear, monthIndex + 1, 0);
    date.setUTCDate(Math.min(startDay, date.getUTCDate()));
    return date.toISOString().split("T")[0];
  }

  const candidate = occurrence(periods);
  return candidate >= today ? candidate : occurrence(periods + 1);
}
