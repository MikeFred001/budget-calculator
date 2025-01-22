import Typography from "./common/Typography";

export default function BreakdownCell({
  title,
  amount,
  className = "",
}: IBreakdownCellProps) {
  return (
    <div
      className={`BREAKDOWN-CELL flex flex-col items-center leading-none relative border-green-300 py-5 ${className}`}
    >
      <Typography className="absolute left-1 top-1 font-semibold text-[.9rem]">
        {title}
      </Typography>
      <Typography className="text-[2rem]" currency>
        {amount}
      </Typography>
      <Typography className="text-[1.2rem] opacity-70" currency>
        {(Number(amount) / 2).toFixed(2)}
      </Typography>
    </div>
  );
}

interface IBreakdownCellProps {
  title: string;
  amount: string;
  className?: string;
}
