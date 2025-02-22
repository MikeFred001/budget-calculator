import BudgetItemList from "./BudgetItemList";
import { sortByFullDate } from "@/utils/helpers";

export default function SplitBudgetItemList({
  items,
}: {
  items: IBudgetItem[];
}) {
  const { BiWeekly, Monthly, Yearly } = groupBudgetItems(items);

  return (
    <div className="GROUPED-BUDGET-ITEM-LIST flex flex-col gap-4">
      <BudgetItemList items={sortByFullDate(BiWeekly)} groupFreq={"BiWeekly"} />
      <BudgetItemList items={sortByFullDate(Monthly)} groupFreq={"Monthly"} />
      <BudgetItemList items={sortByFullDate(Yearly)} groupFreq={"Yearly"} />
    </div>
  );

  function groupBudgetItems(budgetItems: IBudgetItem[]) {
    const groupedItems: IGroupedBudgetItems = {
      BiWeekly: [],
      Monthly: [],
      Yearly: [],
    };

    for (const item of budgetItems) {
      groupedItems[item.freq].push(item);
    }
    return groupedItems;
  }
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}

interface IGroupedBudgetItems {
  BiWeekly: IBudgetItem[];
  Monthly: IBudgetItem[];
  Yearly: IBudgetItem[];
}
