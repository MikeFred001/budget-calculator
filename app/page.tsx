"use client";

import Switch from "./components/Switch";
import Breakdown from "./components/Breakdown";
import BudgetItemList from "./components/BudgetItemList";
import SplitBudgetItemList from "./components/SplitBudgetItemList";
import AddItemForm from "./components/AddItemForm";
import { useState } from "react";

export default function Home() {
  const [budgetItems, setBudgetItems] = useState(exBudgetItems);
  const [split, setSplit] = useState(true);

  return (
    <div className="HOME p-6 flex flex-col gap-4">
      <AddItemForm addItem={addItem} />
      <Switch split={split} toggleGrouping={toggleGrouping} />
      <Breakdown />
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
    setBudgetItems((prev) => [...prev, newItem]);
  }

  function toggleGrouping(setting: boolean) {
    setSplit(setting);
  }
}

interface IBudgetItem {
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}

const exBudgetItems = [
  {
    name: "Spotify",
    cost: "50.99",
    freq: "Yearly",
    startDate: "01/10/2021",
  },
  {
    name: "Adobe",
    cost: "349.99",
    freq: "Yearly",
    startDate: "10/01/2021",
  },
  {
    name: "Netflix",
    cost: "19.99",
    freq: "Monthly",
    startDate: "01/09/2021",
  },
  {
    name: "Github Copilot",
    cost: "15.00",
    freq: "Monthly",
    startDate: "01/09/2021",
  },
  {
    name: "Hulu",
    cost: "5.00",
    freq: "BiWeekly",
    startDate: "01/08/2021",
  },
  {
    name: "Food",
    cost: "200.00",
    freq: "BiWeekly",
    startDate: "01/08/2021",
  },
];
