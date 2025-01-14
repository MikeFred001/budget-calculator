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
      }`}
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
        <BudgetItem
          key={i}
          item={item}
          className={`${i > 0 ? "border-t" : ""} ${
            groupFreq ? `${groupFreq}-outline` : "Default-outline"
          }`}
        />
      ))}
    </div>
  );
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}

interface IBudgetItemListProps {
  items: IBudgetItem[];
  groupFreq?: string;
}
