"use client";

import Header from "./components/Header";
import Switch from "./components/Switch";
import Button from "./components/common/Button";
import Breakdown from "./components/Breakdown";
import AddItemForm from "./components/AddItemForm";
import BudgetItemList from "./components/BudgetItemList";
import SplitBudgetItemList from "./components/SplitBudgetItemList";
import DebtItemList from "./components/DebtItemList";
import { sortByFullDate } from "@/utils/helpers";
import { useEffect } from "react";

import useAppStore from "./store/appStore";

export default function Home() {
  const { budgetItems, debtItems, split, monthlyIncome, setAppState } =
    useAppStore();

  useEffect(() => {
    setAppState({
      budgetItems: sortByDay(budgetItems),
      monthlyIncome: 2500,
    });
  }, [setAppState, budgetItems]);

  useEffect(() => {
    getNearestPaymentDate();
  }, [budgetItems]);

  return (
    <div className="HOME p-6 flex flex-col gap-4">
      <Header />
      <AddItemForm />

      <div className="flex gap-4">
        <Switch split={split} toggleSplit={toggleSplit} />
        {/* Just for testing --------------------------- */}
        <Button
          onClick={addRandomTestItem}
          className="border-green-300 hover:text-black hover:bg-green-300 active:bg-white active:border-white"
        >
          Add Test Item
        </Button>
        {/* Just for testing --------------------------- */}
      </div>
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

  function addRandomTestItem(): void {
    const frequencies = ["BiWeekly", "Monthly", "Yearly"];
    const randomFreq = frequencies[Math.floor(Math.random() * 3)];
    const randomCost = Math.floor(Math.random() * 1000);

    const randomItem: IBudgetItem = {
      id: budgetItems.length + 1,
      name: "Test",
      cost: randomCost,
      freq: randomFreq,
      startDate: "2025-01-01T12:00:00.000Z",
    };

    setAppState({ budgetItems: [...budgetItems, randomItem] });
  }

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
