export default function InputField({
  inputName,
  value,
  maxLength,
  className = "",
  onChange,
}: IInputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(inputName, e.target.value);
  };

  const name = parseCamelCase(inputName);

  return (
    <input
      className={`
        INPUT-FIELD border border-green-300 bg-transparent
        p-2 focus:outline-none focus:border-[3px] w-[10rem]
        ${className}
      `}
      id={name}
      name={name}
      placeholder={name}
      value={value}
      maxLength={maxLength || 50}
      onChange={handleChange}
    />
  );

  function parseCamelCase(str: string): string {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  }
}

interface IInputFieldProps {
  inputName: string;
  value: string;
  maxLength?: number;
  className?: string;
  onChange: (inputName: string, value: string) => void;
}
