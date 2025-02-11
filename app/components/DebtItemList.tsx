import React from "react";
import useAppStore from "../store/appStore";
import AddDebtItemForm from "./AddDebtItemForm";
import DebtItem from "./DebtItem";

export default function DebtItemList({ items }: IDebtItemListProps) {
  const { addingDebtItem } = useAppStore();
  return (
    <div className="DEBT-ITEM-LIST flex-grow">
      {addingDebtItem && <AddDebtItemForm />}
      {items.map((item, i) => (
        <DebtItem key={i} item={item} />
      ))}
    </div>
  );
}

interface IDebtItemListProps {
  items: IDebtItem[];
}
interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}
