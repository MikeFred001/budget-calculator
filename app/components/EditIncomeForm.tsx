import InputField from "./common/InputField";
import Button from "./common/Button";
import Typography from "./common/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import GirlMathAPI from "@/utils/api";
import useAppStore from "../store/appStore";

export default function EditIncomeForm({
  initialAmount,
}: IEditIncomeFormProps) {
  const [income, setIncome] = useState(initialAmount);
  const { editingIncome, setAppState } = useAppStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingIncome && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    }
  }, [editingIncome]);

  return (
    <form
      className="EDIT-INCOME-FORM relative flex items-center justify-center border-b md:border-r border-green-300 p-1 md:py-0 md:px-2"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-[1px] h-[45px] md:h-[55px] w-full">
        <Typography
          className={`
            absolute left-1 top-1 font-semibold text-[.9rem] leading-none
            ${editingIncome && "hidden md:inline"}
          `}
        >
          Income
        </Typography>
        <InputField
          inputName="cost"
          value={income}
          inputRef={inputRef}
          onChange={handleChange}
          className="text-[1.8rem] flex-grow min-w-[10rem]"
        />
        <Button
          onClick={handleSubmit}
          className={`text-[2rem] w-[52px] font-arial font-bold hover:bg-green-300 border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black`}
        >
          <FontAwesomeIcon icon={faSave} />
        </Button>
        <Button
          onClick={() => setAppState({ editingIncome: false })}
          className={`text-[2rem] w-[52px] font-arial font-bold hover:bg-green-300 border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black`}
        >
          <FontAwesomeIcon icon={faBan} />
        </Button>
      </div>
    </form>
  );

  function formatCurrency(value: string): string {
    if (value === "") return "0.00";

    const numericValue = value.replace(/\D/g, "");
    const paddedValue = numericValue.padStart(3, "0");
    const dollars = paddedValue.slice(0, -2);
    const cents = paddedValue.slice(-2);
    return `${Number(dollars)}.${cents}`;
  }

  function handleChange(inputName: string, value: string): void {
    setIncome(formatCurrency(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const updatedIncome = await GirlMathAPI.updateMonthlyIncome(Number(income));
    console.log("Updated income:", updatedIncome);
    setAppState({ monthlyIncome: updatedIncome, editingIncome: false });
  }
}

interface IEditIncomeFormProps {
  initialAmount: string;
}
