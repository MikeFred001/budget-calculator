import Typography from "./common/Typography";
import Chip from "./common/Chip";
import useAppStore from "../store/appStore";

export default function BudgetItem({ item, className }: IBudgetItemProps) {
  console.log("ITEM", item);
  const { budgetItems, setAppState } = useAppStore();

  return (
    <div
      className={`BUDGET-ITEM grid grid-cols-4 items-center p-2 border ${item.freq}-outline ${className}`}
    >
      <Typography>{item.name}</Typography>
      <Typography currency className="justify-self-end">
        {calculateMonthly(item.cost)}
      </Typography>
      <Typography className="justify-self-end">{item.startDate}</Typography>
      <Chip
        freq={item.freq}
        cost={item.cost}
        onClick={() => deleteItem(item.id)}
      />
    </div>
  );

  function calculateMonthly(cost: string): string {
    if (item.freq === "Monthly") return cost;

    const freqMapping = { BiWeekly: 0.5, Monthly: 1, Yearly: 12 };
    const monthly = Number(cost) / freqMapping[item.freq];

    return monthly.toFixed(2);
  }

  function deleteItem(id: number): void {
    const filtered: IBudgetItem[] = budgetItems.filter((item) => {
      return item.id !== id;
    });
    setAppState({ budgetItems: filtered });
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
  cost: string;
  freq: string;
  startDate: string;
}
