"use client";

import Header from "./components/Header";
import Switch from "./components/Switch";
import Breakdown from "./components/Breakdown";
import AddItemForm from "./components/AddItemForm";
import BudgetItemList from "./components/BudgetItemList";
import SplitBudgetItemList from "./components/SplitBudgetItemList";
import DebtItemList from "./components/DebtItemList";
import GirlMathAPI from "../utils/api";
import { sortByFullDate, toCamelCase } from "@/utils/helpers";
import { useEffect } from "react";

import useAppStore from "./store/appStore";

export default function Home() {
  const { budgetItems, debtItems, split, monthlyIncome, setAppState } =
    useAppStore();

  useEffect(() => {
    async function fetchInitialAppData() {
      try {
        const budgetItems = toCamelCase(await GirlMathAPI.getAllBudgetItems());
        console.log("BUDGET ITEMS IN USE EFFECT:", budgetItems);

        const debtItems = toCamelCase(await GirlMathAPI.getAllDebtItems());
        console.log("DEBT ITEMS IN USE EFFECT:", debtItems);

        const appSettings = toCamelCase(await GirlMathAPI.getAppSettings());
        console.log("MONTHLY INCOME IN USE EFFECT:", appSettings);

        setAppState({
          budgetItems: sortByDay(budgetItems),
          debtItems,
          monthlyIncome: Number(appSettings.monthlyIncome),
        });
      } catch (err) {
        console.error("Failed to fetch initial app data:", err);
        setAppState({ budgetItems: [], debtItems: [], monthlyIncome: 0 });
      }
    }
    fetchInitialAppData();
  }, []);

  useEffect(() => {
    getNearestPaymentDate();
  }, [budgetItems]);

  return (
    <div className="HOME p-6 flex flex-col gap-4">
      <Header />
      <AddItemForm />
      <Switch split={split} toggleSplit={toggleSplit} />
      <Breakdown
        monthlyTotal={calculateMonthlyTotal(budgetItems)}
        monthlyIncome={monthlyIncome}
      />
      {split ? (
        <SplitBudgetItemList items={budgetItems} />
      ) : (
        <BudgetItemList items={budgetItems} />
      )}
      <DebtItemList items={debtItems} />
    </div>
  );

  function toggleSplit(setting: boolean) {
    setAppState({ split: setting });
  }

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

  function sortByDay(items: IBudgetItem[]): IBudgetItem[] {
    const sorted = items.sort((a, b) => {
      const aDate = new Date(a.startDate);
      const bDate = new Date(b.startDate);

      return aDate.getDate() - bDate.getDate();
    });

    return sorted;
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
