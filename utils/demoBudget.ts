import type { Debt, Payment } from "./helpers";

export const demoBudget: {
  income: number;
  payments: Payment[];
  debts: Debt[];
  nextId: number;
} = {
  income: 5000,
  payments: [
    {
      id: 1,
      name: "Rent",
      cost: 1200,
      freq: "Monthly",
      startDate: "2023-01-01",
    },
    {
      id: 2,
      name: "Utilities",
      cost: 200.27,
      freq: "Monthly",
      startDate: "2024-01-11",
    },
    {
      id: 3,
      name: "Car insurance",
      cost: 1200,
      freq: "Yearly",
      startDate: "2025-02-22",
    },
    {
      id: 4,
      name: "Gym membership",
      cost: 250.55,
      freq: "Yearly",
      startDate: "2022-06-15",
    },
    {
      id: 5,
      name: "Groceries",
      cost: 200,
      freq: "BiWeekly",
      startDate: "2023-12-10",
    },
    {
      id: 6,
      name: "Spotify",
      cost: 10.99,
      freq: "Monthly",
      startDate: "2025-01-31",
    },
  ],
  debts: [
    { id: 7, name: "Credit card", amount: 5000 },
    { id: 8, name: "Student loan", amount: 14800.5 },
    { id: 9, name: "Car loan", amount: 9987.23 },
  ],
  nextId: 10,
};
