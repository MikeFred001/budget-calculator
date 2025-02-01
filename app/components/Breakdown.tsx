import Typography from "./common/Typography";
import BreakdownCell from "./BreakdownCell";
import EditIncomeForm from "./EditIncomeForm";
import { useState } from "react";

import useAppStore from "../store/appStore";

export default function Breakdown({
  monthlyTotal,
  monthlyIncome,
}: IBreakdownProps) {
  const monthlyRemaining: number = monthlyIncome - monthlyTotal;
  const { editingIncome } = useAppStore();

  const [collapsed, setCollapsed] = useState(false);
  const [headerText, setHeaderText] = useState("Monthly Breakdown");

  return (
    <div className="BREAKDOWN flex-flex-col">
      <div
        className={`px-2 bg-green-300 hover:bg-green-500 cursor-pointer`}
        onClick={handleHeaderClick}
        onMouseEnter={handleHeaderHover}
        onMouseLeave={() => setHeaderText("Monthly Breakdown")}
      >
        <Typography className="text-black font-bold">{headerText}</Typography>
      </div>
      <div
        className={`grid grid-cols-3 text-center border-2 border-green-300 ${
          collapsed ? "hidden" : ""
        } ${monthlyRemaining < 0 ? "text-red-600" : ""}`}
      >
        {editingIncome ? (
          <EditIncomeForm initialAmount={monthlyIncome.toFixed(2)} />
        ) : (
          <BreakdownCell
            title="Income"
            amount={monthlyIncome}
            className="border-r"
            editable
          />
        )}
        <BreakdownCell
          title="Total"
          amount={monthlyTotal}
          className="border-r"
        />
        <BreakdownCell title="Remaining" amount={monthlyRemaining} />
      </div>
    </div>
  );

  function handleHeaderHover() {
    if (collapsed) {
      setHeaderText("EXPAND");
    } else {
      setHeaderText("COLLAPSE");
    }
  }

  function handleHeaderClick() {
    setCollapsed(!collapsed);
    if (headerText === "EXPAND") {
      setHeaderText("COLLAPSE");
    } else {
      setHeaderText("EXPAND");
    }
  }
}

interface IBreakdownProps {
  monthlyTotal: number;
  monthlyIncome: number;
}
