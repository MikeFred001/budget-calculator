export default function InputField({
  inputName,
  value,
  onChange,
}: IInputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(inputName, e.target.value);
  };

  return (
    <input
      className="INPUT-FIELD border border-green-300 bg-transparent p-2 focus:outline-none w-[10rem] focus:flex-grow transition-all duration-300"
      id={inputName}
      value={value}
      placeholder={inputName}
      onChange={handleChange}
    />
  );
}

interface IInputFieldProps {
  inputName: string;
  value: string;
  onChange: (inputName: string, value: string) => void;
}
