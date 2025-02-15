"use client";

import Header from "./components/Header";
import Breakdown from "./components/Breakdown";
import Typography from "./components/common/Typography";
import BudgetItemPanel from "./components/BudgetItemPanel";
import DebtItemPanel from "./components/DebtItemPanel";
import GirlMathAPI from "@/utils/api";
import { sortByFullDate, toCamelCase } from "@/utils/helpers";
import { useEffect } from "react";
import useAppStore from "./store/appStore";

export default function Home() {
  const { budgetItems, debtItems, monthlyIncome, loading, setAppState } =
    useAppStore();

  useEffect(() => {
    async function fetchInitialAppData() {
      setAppState({ loading: true });
      try {
        const budgetItems = toCamelCase(await GirlMathAPI.getAllBudgetItems());
        const debtItems = toCamelCase(await GirlMathAPI.getAllDebtItems());
        const appSettings = toCamelCase(await GirlMathAPI.getAppSettings());

        setAppState({
          budgetItems,
          debtItems,
          monthlyIncome: Number(appSettings.monthlyIncome),
          loading: false,
        });
      } catch (err) {
        console.error("Failed to fetch initial app data:", err);
        setAppState({
          budgetItems: [],
          debtItems: [],
          monthlyIncome: 0,
          loading: false,
        });
      }
    }
    fetchInitialAppData();
  }, []);

  useEffect(() => {
    getNearestPaymentDate();
  }, [budgetItems]);

  return loading ? (
    <Typography>The matrix has you, Neo.</Typography>
  ) : (
    <div className="HOME p-2 flex flex-col gap-8 md:p-6">
      <Header />
      <Breakdown
        monthlyTotal={calculateMonthlyTotal(budgetItems)}
        monthlyIncome={monthlyIncome}
      />
      <BudgetItemPanel budgetItems={budgetItems} />
      <DebtItemPanel items={debtItems} />
    </div>
  );

  function calculateMonthlyTotal(budgetItems: IBudgetItem[]): number {
    const freqMapping = { BiWeekly: 0.5, Monthly: 1, Yearly: 12 };

    let monthlyTotalInCents: number = 0;

    for (let item of budgetItems) {
      const costInCents = Math.round(item.cost * 100);
      const monthlyCostInCents = Math.round(
        costInCents / freqMapping[item.freq]
      );

      monthlyTotalInCents += Math.ceil(monthlyCostInCents);
    }

    return monthlyTotalInCents / 100;
  }

  function getNearestPaymentDate() {
    const nearestPaymentDate = sortByFullDate([...budgetItems])[0]?.startDate;
    setAppState({ nearestPaymentDate });
  }
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
