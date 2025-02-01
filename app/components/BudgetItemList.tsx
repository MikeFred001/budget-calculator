import BudgetItem from "./BudgetItem";
import Typography from "./common/Typography";

export default function BudgetItemList({
  items,
  groupFreq,
}: IBudgetItemListProps) {
  return (
    <div
      className={`BUDGET-ITEM-LIST flex flex-col border ${
        groupFreq ? `${groupFreq}-outline` : "Default-outline"
      } ${items.length < 1 ? "hidden" : ""}`}
    >
      {groupFreq && (
        <div
          className={`${
            groupFreq ? `${groupFreq}-filled` : "Default-filled"
          } px-2`}
        >
          <Typography className="text-black font-bold">{groupFreq}</Typography>
        </div>
      )}
      {items.map((item, i) => (
        <BudgetItem key={i} item={item} className={i > 0 ? "border-t" : ""} />
      ))}
    </div>
  );
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}

interface IBudgetItemListProps {
  items: IBudgetItem[];
  groupFreq?: string;
}
