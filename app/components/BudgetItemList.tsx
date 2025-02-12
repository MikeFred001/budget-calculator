import BudgetItem from "./BudgetItem";
import PanelHeader from "./common/PanelHeader";
import { useState } from "react";
import { sortByFullDate, sortByDay } from "@/utils/helpers";
import useAppStore from "../store/appStore";
import AddBudgetItemForm from "./AddBudgetItemForm";

export default function BudgetItemList({
  items,
  groupFreq,
}: IBudgetItemListProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { addingBudgetItem, budgetItemsSorted, split, setAppState } =
    useAppStore();

  const sortedItems = budgetItemsSorted
    ? sortByFullDate(items)
    : sortByDay(items);

  return (
    <div
      className={`BUDGET-ITEM-LIST flex flex-col border
        ${groupFreq ? `${groupFreq}-outline` : "Default-outline"}
        ${items.length < 1 ? "hidden" : ""}
      `}
    >
      <PanelHeader
        defaultText={groupFreq || "Monthly Costs"}
        collapsed={collapsed}
        groupFreq={groupFreq}
        setCollapsed={setCollapsed}
        onButtonClick={() => setAppState({ addingBudgetItem: true })}
      />

      <div className={collapsed ? "hidden" : ""}>
        {addingBudgetItem && <AddBudgetItemForm groupFreq={groupFreq} />}
        {sortedItems.map((item, i) => (
          <BudgetItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
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
