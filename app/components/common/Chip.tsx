import Typography from "./Typography";

export default function Chip({ freq, cost }: IChipProps) {
  return (
    <div
      className={`CHIP w-[6.5rem] text-center py-1 border-2 justify-self-end leading-none text-[1.1rem] font-semibold ${freq}-outline`}
    >
      <Typography>{freq}</Typography>
      <Typography className="text-[.8rem]">{`$${cost}`}</Typography>
    </div>
  );
}

interface IChipProps {
  freq: string;
  cost: string;
}
