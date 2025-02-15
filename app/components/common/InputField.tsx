export default function InputField({
  inputName,
  value,
  maxLength,
  className = "",
  inputRef,
  onChange,
}: IInputFieldProps) {
  const name = parseCamelCase(inputName);

  return (
    <input
      className={`
        INPUT-FIELD border border-green-300 bg-transparent
        p-2 focus:outline-none focus:border-[3px]
        ${className}
      `}
      id={name}
      name={name}
      placeholder={name}
      value={value}
      ref={inputRef}
      maxLength={maxLength || 50}
      onChange={handleChange}
    />
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(inputName, e.target.value);
  }

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
  inputRef?: React.RefObject<HTMLInputElement | null>;
  onChange: (inputName: string, value: string) => void;
}
