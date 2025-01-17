"use client";

import Switch from "./components/Switch";
import Typography from "./components/common/Typography";
import Breakdown from "./components/Breakdown";
import BudgetItemList from "./components/BudgetItemList";
import SplitBudgetItemList from "./components/SplitBudgetItemList";
import AddItemForm from "./components/AddItemForm";
import useAppStore from "./store/appStore";
import { useEffect } from "react";

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
    </div>
  );

  function addItem(newItem: IBudgetItem) {
    const entries = Object.values(newItem);
    for (let entry of entries) {
      if (entry === "") {
        alert("Fill out all the fields, idiot.");
        return;
      }
    }
    setAppState({ budgetItems: [...budgetItems, newItem] });
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
