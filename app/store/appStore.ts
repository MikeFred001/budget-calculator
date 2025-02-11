import { create } from "zustand";
import { persist } from "zustand/middleware";

localStorage.removeItem("app-storage");
interface IAppState {
  budgetItems: IBudgetItem[];
  debtItems: IDebtItem[];
  monthlyIncome: number;
  split: boolean;
  editingIncome: boolean;
  addingDebtItem: boolean;
  nearestPaymentDate?: string;
  loading: boolean;
  setAppState: (payload: Partial<IAppState>) => void;
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}

interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}

const useAppStore = create<IAppState>()(
  persist(
    (set) => ({
      budgetItems: [],
      debtItems: [],
      monthlyIncome: 0,
      split: false,
      editingIncome: false,
      addingDebtItem: false,
      nextPaymentDate: "",
      loading: true,
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
