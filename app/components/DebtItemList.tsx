import AddDebtItemForm from "./AddDebtItemForm";
import DebtItem from "./DebtItem";
import DebtTotal from "./DebtTotal";
import useAppStore from "../store/appStore";

export default function DebtItemList({ items, className }: IDebtItemListProps) {
  const { addingDebtItem } = useAppStore();
  const sortedDebtItems = items.sort((a, b) => a.amount - b.amount);

  return (
    <div className={`DEBT-ITEM-LIST flex-grow ${className}`}>
      {addingDebtItem && <AddDebtItemForm />}
      {sortedDebtItems.map((item, i) => (
        <DebtItem key={i} item={item} />
      ))}
      {items.length > 1 && <DebtTotal total={calculateDebtTotal(items)} />}
    </div>
  );

  function calculateDebtTotal(debtItems: IDebtItem[]): number {
    let totalInCents: number = 0;

    for (const item of debtItems) {
      const amountInCents = Math.round(item.amount * 100);
      totalInCents += Math.floor(amountInCents);
    }

    return totalInCents / 100;
  }
}

interface IDebtItemListProps {
  items: IDebtItem[];
  className?: string;
}
interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}
