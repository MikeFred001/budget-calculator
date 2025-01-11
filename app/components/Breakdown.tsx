import Typography from "./common/Typography";

export default function Breakdown({ monthlyTotal }: IBreakdownProps) {
  return (
    <div className="BREAKDOWN flex-flex-col">
      <div className="p-2 bg-green-300">
        <Typography className="text-black leading-none font-bold">
          Breakdown
        </Typography>
      </div>
      <div className="grid grid-cols-4 items-center p-2 border-2 border-green-300">
        <Typography>Monthly Cost</Typography>
      </div>
    </div>
  );
}

interface IBreakdownProps {
  monthlyTotal?: number;
}
