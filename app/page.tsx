"use client";

import Switch from "./components/Switch";
import Typography from "./components/common/Typography";
import Breakdown from "./components/Breakdown";
import BudgetItemList from "./components/BudgetItemList";
import SplitBudgetItemList from "./components/SplitBudgetItemList";
import AddItemForm from "./components/AddItemForm";
import useAppStore from "./store/appStore";
import { useEffect } from "react";

import Button from "./components/common/Button"; // Just for testing

export default function Home() {
  const { budgetItems, split, monthlyIncome, setAppState } = useAppStore();

  useEffect(() => {
    setAppState({
      budgetItems: exBudgetItems,
      monthlyIncome: "2500.00",
    });
  }, [setAppState]);

  return (
    <div className="HOME p-6 flex flex-col gap-4">
      <Typography className="text-[2rem] leading-none">Girl Math</Typography>
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
    </div>
  );

  function addRandomTestItem() {
    const frequencies = ["BiWeekly", "Monthly", "Yearly"];
    const randomFreq = frequencies[Math.floor(Math.random() * 3)];
    const randomCost = Math.floor(Math.random() * 1000).toFixed(2);

    const randomItem: IBudgetItem = {
      id: budgetItems.length + 1,
      name: "Test",
      cost: randomCost,
      freq: randomFreq,
      startDate: "01/01/2025",
    };
    setAppState({ budgetItems: [...budgetItems, randomItem] });
  }

  function toggleSplit(setting: boolean) {
    setAppState({ split: setting });
  }

  function calculateMonthlyTotal(budgetItems: IBudgetItem[]): string {
    const freqMapping = { BiWeekly: 0.5, Monthly: 1, Yearly: 12 };

    let monthlyTotalInCents: number = 0;

    for (let item of budgetItems) {
      const costInCents = Math.round(Number(item.cost) * 100);
      const monthlyCostInCents = Math.round(
        costInCents / freqMapping[item.freq]
      );

      monthlyTotalInCents += Math.ceil(monthlyCostInCents);
    }

    return (monthlyTotalInCents / 100).toFixed(2);
  }
}

const exBudgetItems: IBudgetItem[] = [
  {
    id: 0,
    name: "Spotify",
    cost: "50.99",
    freq: "Yearly",
    startDate: "01/10/2021",
  },
  {
    id: 1,
    name: "Adobe",
    cost: "349.99",
    freq: "Yearly",
    startDate: "10/01/2021",
  },
  {
    id: 2,
    name: "Netflix",
    cost: "19.99",
    freq: "Monthly",
    startDate: "01/09/2021",
  },
  {
    id: 3,
    name: "Github Copilot",
    cost: "15.00",
    freq: "Monthly",
    startDate: "01/09/2021",
  },
  {
    id: 4,
    name: "Hulu",
    cost: "5.00",
    freq: "BiWeekly",
    startDate: "01/08/2021",
  },
  {
    id: 5,
    name: "Food",
    cost: "200.00",
    freq: "BiWeekly",
    startDate: "01/08/2021",
  },
];
interface IBudgetItem {
  id: number;
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}
