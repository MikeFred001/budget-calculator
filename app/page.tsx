"use client";

import Typography from "./components/common/Typography";
import BudgetItemList from "./components/BudgetItemList";
import AddItemForm from "./components/AddItemForm";
import { useState } from "react";

const exampleCosts = [
  {
    name: "Spotify",
    cost: 9.99,
    frequency: 1,
    startDate: "2021-09-01",
  },
  {
    name: "Netflix",
    cost: 13.99,
    frequency: 1,
    startDate: "2021-09-01",
  },
];

export default function Home() {
  const [costs, setCosts] = useState(exampleCosts);

  return (
    <div className="HOME p-6">
      <Typography className="text-[2rem]">Home Page</Typography>
      <AddItemForm />
      <BudgetItemList items={costs} />
    </div>
  );
}
