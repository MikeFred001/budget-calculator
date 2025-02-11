import DebtItemList from "./DebtItemList";
import PanelHeader from "./common/PanelHeader";
import DebtTotal from "./DebtTotal";
import { useState } from "react";
import useAppStore from "../store/appStore";

export default function DebtItemPanel({ items }: IDebtItemPanelProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { setAppState } = useAppStore();

  return (
    <div className="DEBT-ITEM-PANEL flex flex-col border border-green-300 Default-outline">
      <PanelHeader
        defaultText="Debt Breakdown"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onButtonClick={() => setAppState({ addingDebtItem: true })}
      />
      <div className={`flex justify-between ${collapsed ? "hidden" : ""}`}>
        <DebtItemList items={items} />
        {items.length > 1 && <DebtTotal total={calculateDebtTotal(items)} />}
      </div>
    </div>
  );

  function calculateDebtTotal(debtItems: IDebtItem[]): number {
    let totalInCents: number = 0;

    for (let item of debtItems) {
      const amountInCents = Math.round(item.amount * 100);
      totalInCents += Math.floor(amountInCents);
    }

    return totalInCents / 100;
  }
}

interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}

interface IDebtItemPanelProps {
  items: IDebtItem[];
}
