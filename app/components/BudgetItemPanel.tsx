import useAppStore from "../store/appStore";
import BudgetItemList from "./BudgetItemList";
import SplitBudgetItemList from "./SplitBudgetItemList";
import Controls from "./Controls";

export default function BudgetItemPanel({
  budgetItems,
}: IBudgetItemPanelProps) {
  const { split } = useAppStore();

  return (
    <div className="BUDGET-ITEM-PANEL flex flex-col gap-2">
      <Controls />
      {split ? (
        <SplitBudgetItemList items={budgetItems} />
      ) : (
        <BudgetItemList items={budgetItems} />
      )}
    </div>
  );
}

interface IBudgetItemPanelProps {
  budgetItems: IBudgetItem[];
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}
