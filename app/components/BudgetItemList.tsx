import BudgetItem from "./BudgetItem";
import Typography from "./common/Typography";
import { useState } from "react";

export default function BudgetItemList({
  items,
  groupFreq,
}: IBudgetItemListProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [headerText, setHeaderText] = useState("Monthly Payments");

  return (
    <div
      className={`BUDGET-ITEM-LIST flex flex-col border ${
        groupFreq ? `${groupFreq}-outline` : "Default-outline"
      } ${items.length < 1 ? "hidden" : ""}`}
    >
      <div
        className={`
          ${groupFreq ? `${groupFreq}-filled ${groupFreq}-hover` : "Default-filled hover:bg-green-500"}
          px-2 cursor-pointer
        `}
        onClick={handleHeaderClick}
        onMouseEnter={handleHeaderHover}
        onMouseLeave={() => setHeaderText("Monthly Payments")}
      >
        <Typography className="text-black font-bold">
          {groupFreq ? groupFreq : headerText}
        </Typography>
      </div>
      <div className={collapsed ? "hidden" : ""}>
        {items.map((item, i) => (
          <BudgetItem key={i} item={item} />
        ))}
      </div>
    </div>
  );

  function handleHeaderHover() {
    if (collapsed) {
      setHeaderText("EXPAND");
    } else {
      setHeaderText("COLLAPSE");
    }
  }

  function handleHeaderClick() {
    setCollapsed(!collapsed);
    if (headerText === "EXPAND") {
      setHeaderText("COLLAPSE");
    } else {
      setHeaderText("EXPAND");
    }
  }
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}

interface IBudgetItemListProps {
  items: IBudgetItem[];
  groupFreq?: string;
}
