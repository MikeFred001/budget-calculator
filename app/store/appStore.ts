import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  isLoggedIn: boolean;
  budgetItems: IBudgetItem[];
  monthlyIncome: string;
  split: boolean;
  setAppState: (payload: Partial<AppState>) => void;
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      budgetItems: [],
      monthlyIncome: "0",
      isLoggedIn: false,
      split: false,
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
