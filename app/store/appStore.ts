import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  isLoggedIn: boolean;
  budgetItems: IBudgetItem[];
  monthlyIncome: number;
  split: boolean;
  editingIncome: boolean;
  nearestPaymentDate?: string;
  setAppState: (payload: Partial<AppState>) => void;
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}

const exBudgetItems: IBudgetItem[] = [
  {
    id: 0,
    name: "Spotify",
    cost: 50.99,
    freq: "Yearly",
    startDate: "2024-03-31T12:00:00.000Z",
  },
  {
    id: 1,
    name: "Adobe",
    cost: 349.99,
    freq: "Yearly",
    startDate: "2023-11-24T12:00:00.000Z",
  },
  {
    id: 2,
    name: "Netflix",
    cost: 19.99,
    freq: "Monthly",
    startDate: "2022-10-23T12:00:00.000Z",
  },
  {
    id: 3,
    name: "Github Copilot",
    cost: 15,
    freq: "Monthly",
    startDate: "2021-09-22T12:00:00.000Z",
  },
  {
    id: 4,
    name: "Hulu",
    cost: 5,
    freq: "BiWeekly",
    startDate: "2020-08-21T12:00:00.000Z",
  },
  {
    id: 5,
    name: "Food",
    cost: 200,
    freq: "BiWeekly",
    startDate: "2019-07-20T12:00:00.000Z",
  },
];

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      budgetItems: exBudgetItems,
      monthlyIncome: 2500,
      isLoggedIn: false,
      split: false,
      editingIncome: false,
      nextPaymentDate: "",
      setAppState: (payload) => set((state) => ({ ...state, ...payload })),
    }),
    {
      name: "app-storage",
      storage:
        typeof window !== "undefined"
          ? {
              getItem: (name) => {
                const item = localStorage.getItem(name);
                return item ? JSON.parse(item) : null;
              },
              setItem: (name, value) => {
                localStorage.setItem(name, JSON.stringify(value));
              },
              removeItem: (name) => {
                localStorage.removeItem(name);
              },
            }
          : undefined,
    }
  )
);

export default useAppStore;
