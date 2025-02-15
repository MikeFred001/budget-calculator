import DebtItemList from "./DebtItemList";
import PanelHeader from "./common/PanelHeader";
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
      <DebtItemList items={items} className={collapsed ? "hidden" : ""} />
    </div>
  );
}

interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}

interface IDebtItemPanelProps {
  items: IDebtItem[];
}
