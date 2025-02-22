import Button from "./common/Button";

export default function FrequencyInput({
  selected,
  className,
  onClick,
}: IFrequencyInputProps) {
  const options = ["BiWeekly", "Monthly", "Yearly"];

  return (
    <div
      className={`FREQUENCY-INPUT flex h-full
        ${selected ? `${selected}-outline` : "Default-outline"}
        ${className}
      `}
    >
      {options.map((option, i) => (
        <Button
          key={i}
          onClick={() => onClick(option)}
          className={`md:hover:font-bold cursor-pointer
            ${
              selected && selected === option
                ? `${selected}-filled md:w-[7.5rem] flex-grow`
                : `${selected}-outline md:w-[3.25rem] flex-grow`
            }
          `}
        >
          {selected && selected === option ? option : option[0]}
        </Button>
      ))}
    </div>
  );
}

interface IFrequencyInputProps {
  selected: string;
  className?: string;
  onClick: (value: string) => void;
}
