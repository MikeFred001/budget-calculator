import { frequencies, isCalendarDate } from "./helpers";
import type { Debt, DebtInput, Payment, PaymentInput } from "./helpers";

const baseUrl = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"
).replace(/\/+$/, "");

type PaymentResponse = Omit<Payment, "cost" | "freq" | "startDate"> & {
  cost: number | string;
  freq: string;
  start_date?: string;
  startDate?: string;
};
type DebtResponse = Omit<Debt, "amount"> & { amount: number | string };
type IncomeResponse = {
  monthlyIncome?: number | string;
  monthly_income?: number | string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T>;
async function request(path: string, options?: RequestInit): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
      ...options,
    });
  } catch {
    throw new Error(
      "Couldn’t reach the budget server. Check your connection and try again.",
    );
  }
  if (!response.ok) {
    throw new Error(
      `The budget server returned an error (${response.status}). Try again.`,
    );
  }
  if (options?.method !== "DELETE") return response.json();
}

function json(method: "POST" | "PUT", body: object): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function readAmount(value: number | string | undefined): number {
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    String(value).trim() === "" ||
    !Number.isFinite(Number(value))
  ) {
    throw new Error("The budget server returned an invalid amount.");
  }
  return Number(value);
}

function readPayment(row: PaymentResponse): Payment {
  const startDate = (row.start_date ?? row.startDate)?.slice(0, 10);
  const freq = frequencies.find((frequency) => frequency === row.freq);
  if (!startDate || !isCalendarDate(startDate) || !freq) {
    throw new Error("The budget server returned an invalid payment schedule.");
  }
  return {
    id: row.id,
    name: row.name,
    cost: readAmount(row.cost),
    freq,
    startDate,
  };
}

function readDebt(row: DebtResponse): Debt {
  return { id: row.id, name: row.name, amount: readAmount(row.amount) };
}

function readIncome(row: IncomeResponse): number {
  return readAmount(row.monthlyIncome ?? row.monthly_income);
}

export async function loadBudget(signal: AbortSignal) {
  const [payments, debts, income] = await Promise.all([
    request<PaymentResponse[]>("/budget-items", { signal }),
    request<DebtResponse[]>("/debt-items", { signal }),
    request<IncomeResponse>("/app-settings", { signal }),
  ]);
  return {
    payments: payments.map(readPayment),
    debts: debts.map(readDebt),
    income: readIncome(income),
  };
}

export async function addPayment(payment: PaymentInput) {
  return readPayment(
    await request<PaymentResponse>(
      "/budget-items",
      json("POST", {
        ...payment,
        startDate: `${payment.startDate}T12:00:00.000Z`,
      }),
    ),
  );
}

export async function addDebt(debt: DebtInput) {
  return readDebt(
    await request<DebtResponse>("/debt-items", json("POST", debt)),
  );
}

export async function editDebt({ id, name, amount }: Debt) {
  return readDebt(
    await request<DebtResponse>(
      `/debt-items/${id}`,
      json("PUT", { name, amount }),
    ),
  );
}

export async function saveIncome(monthlyIncome: number) {
  return readIncome(
    await request<IncomeResponse>(
      "/app-settings",
      json("PUT", { monthlyIncome }),
    ),
  );
}

export function deletePayment(id: number) {
  return request<void>(`/budget-items/${id}`, { method: "DELETE" });
}

export function deleteDebt(id: number) {
  return request<void>(`/debt-items/${id}`, { method: "DELETE" });
}
