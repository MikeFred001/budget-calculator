import Typography from "./Typography";

export default function CostInfo({ amount, className = "" }: ICostInfoProps) {
  return (
    <div
      className={`COST-INFO flex flex-col items-end leading-none ${className}`}
    >
      <Typography currency>{amount}</Typography>
      <Typography className="opacity-70 text-[.6em]" currency>
        {(Number(amount) / 2).toFixed(2)}
      </Typography>
    </div>
  );
}

interface ICostInfoProps {
  amount: string;
  className?: string;
}
