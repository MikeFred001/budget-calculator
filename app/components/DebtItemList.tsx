import Typography from "./common/Typography";
import Button from "./common/Button";
import DebtItem from "./DebtItem";
import AddDebtItemForm from "./AddDebtItemForm";
import { useState } from "react";
import useAppStore from "../store/appStore";

export default function DebtItemList({ items }: IDebtItemListProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [headerText, setHeaderText] = useState("Debt Breakdown");
  const [headerDisabled, setHeaderDisabled] = useState(false);
  const { addingDebtItem, setAppState } = useAppStore();

  return (
    <div className="DEBT-ITEM-LIST flex flex-col border border-green-300 Default-outline">
      <div
        className={`px-2 bg-green-300 ${headerText === "Debt Breakdown" ? "bg-green-300" : "bg-green-500"} cursor-pointer flex justify-between items-center`}
        onClick={handleHeaderClick}
        onMouseEnter={handleHeaderHover}
        onMouseLeave={() => setHeaderText("Debt Breakdown")}
      >
        <Typography className="text-black font-bold">{headerText}</Typography>
        <Button
          className="Default-outline bg-black outline outline-black h-[25px] font-bold hover:bg-green-300 hover:text-black"
          onClick={() => setAppState({ addingDebtItem: true })}
          onMouseEnter={handleAddHover}
          onMouseLeave={handleAddLeave}
        >
          +
        </Button>
      </div>
      <div className={`flex justify-between ${collapsed ? "hidden" : ""}`}>
        <div className="flex-grow">
          {addingDebtItem && <AddDebtItemForm />}
          {items.map((item, i) => (
            <DebtItem key={i} item={item} />
          ))}
        </div>
        {items.length > 1 && (
          <div className="flex flex-col items-center justify-center leading-none px-10 border Default-outline">
            <Typography
              className={
                items.length < 0 ? "text-[2rem] leading-tight" : "text-[1.2rem]"
              }
            >
              Total
            </Typography>
            <Typography className="text-[2rem]" currency>
              {calculateDebtTotal(items)}
            </Typography>
          </div>
        )}
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
    if (headerDisabled) return;
    setCollapsed(!collapsed);
    if (headerText === "EXPAND") {
      setHeaderText("COLLAPSE");
    } else {
      setHeaderText("EXPAND");
    }
  }

  function handleAddHover() {
    setHeaderDisabled(true);
    setHeaderText("Debt Breakdown");
  }

  function handleAddLeave() {
    setHeaderDisabled(false);
    handleHeaderHover();
  }

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

interface IDebtItemListProps {
  items: IDebtItem[];
}
