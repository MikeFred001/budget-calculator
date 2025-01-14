import BudgetItemList from "./BudgetItemList";

export default function SplitBudgetItemList({
  items,
}: {
  items: IBudgetItem[];
}) {
  const { BiWeekly, Monthly, Yearly } = groupBudgetItems(items);

  return (
    <div className="GROUPED-BUDGET-ITEM-LIST flex flex-col gap-4">
      {BiWeekly.length > 0 && (
        <BudgetItemList items={BiWeekly} groupFreq={"BiWeekly"} />
      )}
      {Monthly.length > 0 && (
        <BudgetItemList items={Monthly} groupFreq={"Monthly"} />
      )}
      {Yearly.length > 0 && (
        <BudgetItemList items={Yearly} groupFreq={"Yearly"} />
      )}
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
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}

interface IGroupedBudgetItems {
  BiWeekly: IBudgetItem[];
  Monthly: IBudgetItem[];
  Yearly: IBudgetItem[];
}
