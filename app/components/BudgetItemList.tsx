import BudgetItem from "./BudgetItem";

export default function BudgetItemList({ items }: { items: any[] }) {
  return (
    <div className="BUDGET-ITEM-LIST flex flex-col border border-green-300">
      {items.map((item, index) => (
        <BudgetItem item={item} key={index} />
      ))}
    </div>
  );
}
