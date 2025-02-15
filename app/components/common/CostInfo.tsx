import Typography from "./Typography";

export default function CostInfo({ amount, className = "" }: ICostInfoProps) {
  return (
    <div
      className={`COST-INFO flex flex-col items-end leading-none ${className}`}
    >
      <Typography currency>{amount}</Typography>
      <Typography className="opacity-70 text-[.6em] hidden md:block" currency>
        {amount / 2}
      </Typography>
    </div>
  );
}

interface ICostInfoProps {
  amount: number;
  className?: string;
}
