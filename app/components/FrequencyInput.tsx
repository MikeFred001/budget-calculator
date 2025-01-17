import Button from "./common/Button";

export default function FrequencyInput({
  selected,
  onClick,
}: IFrequencyInputProps) {
  const options = ["BiWeekly", "Monthly", "Yearly"];

  return (
    <div
      className={`FREQUENCY-INPUT flex h-full
        ${selected ? `${selected}-outline` : "Default-outline"}
      `}
    >
      {options.map((option, i) => (
        <Button
          key={i}
          onClick={() => onClick(option)}
          className={`hover:font-bold cursor-pointer
            ${
              selected && selected === option
                ? `${selected}-filled`
                : `${selected}-outline`
            }
          `}
        >
          {option}
        </Button>
      ))}
    </div>
  );
}

interface IFrequencyInputProps {
  selected: string;
  onClick: (value: string) => void;
}
