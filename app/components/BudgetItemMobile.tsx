import Typography from "./common/Typography";
import CostInfo from "./common/CostInfo";
import Chip from "./common/Chip";
import {
  calculateMonthly,
  capitalize,
  formatDateUS,
  getNextPaymentDateUS,
} from "@/utils/helpers";

import GirlMathAPI from "@/utils/api";
import useAppStore from "../store/appStore";

export default function BudgetItemMobile({
  item,
  className,
}: IBudgetItemProps) {
  const {
    budgetItems,
    nearestPaymentDate,
    split,
    budgetItemsSorted,
    setAppState,
  } = useAppStore();

  const highlight =
    (nearestPaymentDate && !budgetItemsSorted) || split
      ? item?.startDate?.slice(8, 10) === nearestPaymentDate?.slice(8, 10)
      : false;

  return (
    <div
      className={`
        BUDGET-ITEM-MOBILE flex justify-between items-center p-2 border text-[1.2rem]
        ${determineStyling()} ${className}
      `}
    >
      <div className="flex flex-col">
        <Typography className="leading-tight">
          {capitalize(item.name)}
        </Typography>
        <Typography className="leading-none text-[.9rem] opacity-80">
          {getNextPaymentDateUS(item.startDate)}
        </Typography>
      </div>

      <div className="flex items-center gap-3">
        <CostInfo amount={calculateMonthly(item.cost, item.freq)} />
        <Chip
          freq={item.freq}
          cost={item.cost}
          onClick={deleteItem}
          className={highlight ? "outline outline-black" : ""}
        />
      </div>
    </div>
  );

  async function deleteItem(): Promise<void> {
    try {
      const filtered: IBudgetItem[] = budgetItems.filter(
        (bItem) => bItem.id !== item.id
      );
      await GirlMathAPI.deleteBudgetItem(item.id);
      setAppState({ budgetItems: filtered });
    } catch (err) {
      console.error("ERROR: Failed to delete budget item:", err);
    }
  }

  function determineStyling(): string {
    let className = ``;
    if (split && !highlight) {
      className += `${item.freq}-outline `;
    } else if (split && highlight) {
      className += `${item.freq}-filled font-bold !border-2 !border-black `;
    } else if (!split && highlight) {
      className += "Default-filled font-bold !border-2 !border-black ";
    } else if (!split && !highlight) {
      className += "Default-outline ";
    }
    return className;
  }
}

interface IBudgetItemProps {
  item: IBudgetItem;
  className?: string;
  groupFreq?: string;
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}
