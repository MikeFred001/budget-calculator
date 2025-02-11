import useAppStore from "../store/appStore";
import BudgetItemList from "./BudgetItemList";
import SplitBudgetItemList from "./SplitBudgetItemList";

export default function BudgetItemPanel({
  budgetItems,
}: IBudgetItemPanelProps) {
  const { split } = useAppStore();
  return split ? (
    <>
      <SplitBudgetItemList items={budgetItems} />
    </>
  ) : (
    <>
      <BudgetItemList items={budgetItems} />
    </>
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
