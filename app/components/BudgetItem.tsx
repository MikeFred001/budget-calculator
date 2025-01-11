import Typography from "./common/Typography";
import Chip from "./common/Chip";

export default function BudgetItem({ item, className }: IBudgetItemProps) {
  return (
    <div
      className={`BUDGET-ITEM grid grid-cols-4 items-center p-2 border ${item.freq}-outline ${className}`}
    >
      <Typography>{item.name}</Typography>
      <Typography className="justify-self-end">
        {calculateMonthly(item.cost)}
      </Typography>
      <Typography className="justify-self-end">{item.startDate}</Typography>
      <Chip freq={item.freq} cost={item.cost} />
    </div>
  );

  function calculateMonthly(cost: string): string {
    if (item.freq === "Monthly") return `$${cost}`;

    const freqMapping = {
      BiWeekly: 0.5,
      Monthly: 1,
      Yearly: 12,
    };

    const monthly = Number(cost) / freqMapping[item.freq];

    return `$${monthly.toFixed(2)}`;
  }
}

interface IBudgetItemProps {
  item: IBudgetItem;
  className?: string;
  groupFreq?: string;
}

interface IBudgetItem {
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}
