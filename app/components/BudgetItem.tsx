import Typography from "./common/Typography";

export default function BudgetItem({ item }: { item: IBudgetItemProps }) {
  return (
    <div className="BUDGET-ITEM grid grid-rows-1 grid-cols-3 items-center p-2 border-b border-green-300">
      <Typography>{item.name}</Typography>
      <Typography>{item.cost}</Typography>
      <Typography>{item.startDate}</Typography>
    </div>
  );
}

interface IBudgetItemProps {
  name: string;
  cost: number;
  frequency: number;
  startDate: string;
}
