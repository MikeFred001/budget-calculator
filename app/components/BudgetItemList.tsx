import BudgetItem from "./BudgetItem";
import PanelHeader from "./common/PanelHeader";
import { useState } from "react";
import { sortByFullDate, sortByDay } from "@/utils/helpers";
import useAppStore from "../store/appStore";
import AddBudgetItemForm from "./AddBudgetItemForm";
import BudgetItemMobile from "./BudgetItemMobile";

export default function BudgetItemList({
  items,
  groupFreq,
}: IBudgetItemListProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { addingBudgetItem, budgetItemsSorted, setAppState } = useAppStore();

  const sortedItems = budgetItemsSorted
    ? sortByFullDate(items)
    : sortByDay(items);

  return (
    <div
      className={`BUDGET-ITEM-LIST flex flex-col border
        ${groupFreq ? `${groupFreq}-outline` : "Default-outline"}
      `}
    >
      <PanelHeader
        defaultText={groupFreq || "Monthly Costs"}
        collapsed={collapsed}
        groupFreq={groupFreq}
        setCollapsed={setCollapsed}
        onButtonClick={() => setAppState({ addingBudgetItem: groupFreq })}
      />

      {/* Desktop */}
      <div className={`${collapsed ? "md:hidden" : ""} md:block hidden`}>
        {addingBudgetItem === groupFreq && (
          <AddBudgetItemForm groupFreq={groupFreq} />
        )}
        {items.length > 0 &&
          sortedItems.map((item, i) => <BudgetItem key={i} item={item} />)}
      </div>

      {/* Mobile */}
      <div className={`${collapsed ? "hidden" : ""} md:hidden block`}>
        {addingBudgetItem === groupFreq && (
          <AddBudgetItemForm groupFreq={groupFreq} />
        )}
        {items.length > 0 &&
          sortedItems.map((item, i) => (
            <BudgetItemMobile key={i} item={item} />
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
  groupFreq?: "Default" | "BiWeekly" | "Monthly" | "Yearly";
}
