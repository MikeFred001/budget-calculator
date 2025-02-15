import Typography from "./Typography";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chip({ freq, cost, className, onClick }: IChipProps) {
  const freqStyling = {
    BiWeekly: "hover:bg-blue-400",
    Monthly: "hover:bg-green-400",
    Yearly: "hover:bg-red-400",
  };

  return (
    <div
      className={`CHIP relative w-[3rem] md:w-[6.5rem] h-[2.8rem] flex flex-col items-center justify-center text-center bg-black py-1 border-2 justify-self-end leading-none text-[1.1rem] font-semibold cursor-pointer group active:bg-white active:border-white ${freqStyling[freq]} ${freq}-outline ${className}`}
      onClick={onClick}
    >
      {/* Desktop */}
      <Typography className="hidden md:block group-hover:hidden">
        {freq}
      </Typography>

      {/* Mobile */}
      <Typography className="md:hidden block group-hover:hidden active:text-black active:bg-white active:border-white">
        {freq[0]}
        <FontAwesomeIcon
          icon={faTrashCan}
          className="absolute right-[3px] top-[3px] text-[.7rem]"
        />
      </Typography>
      <Typography
        currency
        className="hidden md:block text-[.8rem] group-hover:hidden"
      >
        {cost}
      </Typography>
      <Typography className="hidden group-hover:block group-hover:text-black text-[1.4rem]">
        <FontAwesomeIcon icon={faTrashCan} />
      </Typography>
    </div>
  );
}

interface IChipProps {
  freq: string;
  cost: number;
  className?: string;
  onClick?: () => void;
}
