import Typography from "./Typography";

export default function DateInfo({
  startDate,
  className = "",
}: IDateInfoProps) {
  return (
    <div
      className={`DATE-INFO flex flex-col items-end leading-none ${className}`}
    >
      <Typography>{startDate}</Typography>
      <Typography className="opacity-70 text-[.6em]">
        {shortenYear(startDate)}
      </Typography>
    </div>
  );

  function shortenYear(date: string): string {
    return `Est. ${date.slice(0, 6)}${date.slice(-2)}`;
  }
}

interface IDateInfoProps {
  startDate: string;
  className?: string;
}
