import BreakdownCell from "./BreakdownCell";
import EditIncomeForm from "./EditIncomeForm";
import PanelHeader from "./common/PanelHeader";
import { useState } from "react";

import useAppStore from "../store/appStore";

export default function Breakdown({
  monthlyTotal,
  monthlyIncome,
}: IBreakdownProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { editingIncome } = useAppStore();

  const monthlyRemaining: number = monthlyIncome - monthlyTotal;

  return (
    <div className="BREAKDOWN flex flex-col border Default-outline">
      <PanelHeader
        defaultText="Monthly Breakdown"
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`grid grid-cols-1 text-center border-2 border-green-300 md:grid-cols-3 ${
          collapsed ? "hidden" : ""
        } ${monthlyRemaining < 0 ? "text-red-600" : ""}`}
      >
        {editingIncome ? (
          <EditIncomeForm initialAmount={monthlyIncome.toFixed(2)} />
        ) : (
          <BreakdownCell
            title="Income"
            amount={monthlyIncome}
            className="border-b md:border-r"
            editable
          />
        )}
        <BreakdownCell
          title="Total"
          amount={monthlyTotal}
          className="border-b md:border-r"
        />
        <BreakdownCell title="Remaining" amount={monthlyRemaining} />
      </div>
    </div>
  );
}

interface IBreakdownProps {
  monthlyTotal: number;
  monthlyIncome: number;
}
