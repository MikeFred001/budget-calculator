import Typography from "./Typography";

export default function Chip({ freq, cost, onClick }: IChipProps) {
  const freqStyling = {
    BiWeekly: "hover:bg-blue-400",
    Monthly: "hover:bg-green-400",
    Yearly: "hover:bg-red-400",
  };

  return (
    <div
      className={`CHIP w-[6.5rem] h-[2.8rem] flex flex-col items-center justify-center text-center py-1 border-2 justify-self-end leading-none text-[1.1rem] font-semibold cursor-pointer group active:bg-white active:border-white ${freqStyling[freq]} ${freq}-outline`}
      onClick={onClick}
    >
      <Typography className="group-hover:hidden">{freq}</Typography>
      <Typography currency className="text-[.8rem] group-hover:hidden">
        {cost}
      </Typography>
      <Typography className="hidden group-hover:block group-hover:text-black text-[1.4rem]">
        DELETE
      </Typography>
    </div>
  );
}

interface IChipProps {
  freq: string;
  cost: string;
  onClick?: () => void;
}
