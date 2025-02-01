import Typography from "./Typography";
import { formatDateUS, getNextPaymentDateUS } from "@/utils/helpers";

export default function DateInfo({
  startDate,
  className = "",
}: IDateInfoProps) {
  const nextPaymentDate = getNextPaymentDateUS(startDate);
  const initialStartDate = formatDateUS(startDate, true);

  return (
    <div
      className={`DATE-INFO flex flex-col items-end leading-none ${className}`}
    >
      <Typography>{nextPaymentDate}</Typography>
      <Typography className="opacity-70 text-[.6em]">
        {`Est. ${initialStartDate}`}
      </Typography>
    </div>
  );
}

interface IDateInfoProps {
  startDate: string;
  className?: string;
}
