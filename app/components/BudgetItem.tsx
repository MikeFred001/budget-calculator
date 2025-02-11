import Typography from "./common/Typography";
import CostInfo from "./common/CostInfo";
import DateInfo from "./common/DateInfo";
import Chip from "./common/Chip";
import { calculateMonthly, capitalize } from "@/utils/helpers";
import GirlMathAPI from "@/utils/api";
import useAppStore from "../store/appStore";

export default function BudgetItem({ item, className }: IBudgetItemProps) {
  const { budgetItems, nearestPaymentDate, split, setAppState } = useAppStore();

  const highlight =
    nearestPaymentDate &&
    item?.startDate?.slice(8, 10) === nearestPaymentDate?.slice(8, 10);

  return (
    <div
      className={`
        BUDGET-ITEM grid grid-cols-4 items-center p-2 border text-[1.4rem]
        ${determineStyling()} ${className}
      `}
    >
      <Typography>{capitalize(item.name)}</Typography>
      <CostInfo amount={calculateMonthly(item.cost, item.freq)} />
      <DateInfo startDate={item.startDate} />
      <Chip
        freq={item.freq}
        cost={item.cost}
        onClick={deleteItem}
        className={highlight ? "outline outline-black" : ""}
      />
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
