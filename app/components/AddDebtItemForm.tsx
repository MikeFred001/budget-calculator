import InputField from "./common/InputField";
import Button from "./common/Button";
import useAppStore from "../store/appStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import GirlMathAPI from "@/utils/api";

export default function AddDebtItemForm() {
  const initialFormData = {
    name: "",
    amount: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { debtItems, setAppState } = useAppStore();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      className="ADD-DEBT-ITEM-FORM flex items-center gap-[1px] py-1"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap flex-grow h-[90%] px-1">
        <InputField
          inputName="name"
          value={formData.name}
          onChange={handleChange}
          inputRef={inputRef}
          className="w-full flex-grow mb-1 md:w-[10rem] md:mb-0"
        />
        <InputField
          inputName="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-[6rem] flex-grow md:flex-initial md:w-[10rem]"
        />
        <Button
          className={`w-[52px] font-arial font-bold md:hover:bg-green-300 md:hover:border-green-300 md:hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline text-[2rem]`}
          type="submit"
        >
          +
        </Button>
        <Button
          onClick={() => setAppState({ addingDebtItem: false })}
          className={`text-[2rem] w-[52px] font-arial font-bold md:hover:bg-green-300 md:hover:border-green-300 md:hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline`}
        >
          <FontAwesomeIcon icon={faBan} />
        </Button>
      </div>
    </form>
  );

  async function addDebtItem(newItem: IFormData) {
    const entries = Object.values(newItem);
    for (let entry of entries) {
      if (entry === "") {
        alert("Fill out all the fields, idiot.");
        return;
      }
    }
    try {
      const newItemFormatted = {
        ...newItem,
        amount: Number(newItem.amount),
      };
      const addedDebtItem = await GirlMathAPI.addDebtItem(newItemFormatted);
      setAppState({ debtItems: [addedDebtItem, ...debtItems] });
    } catch (err) {
      console.error("Failed to add debt item:", err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addDebtItem(formData);
    setFormData(initialFormData);
    if (inputRef.current) inputRef.current.focus();
  }

  function formatCurrency(value: string) {
    if (value === "") return "0.00";

    const numericValue = value.replace(/\D/g, "");
    const paddedValue = numericValue.padStart(3, "0");
    const dollars = paddedValue.slice(0, -2);
    const cents = paddedValue.slice(-2);
    return `${Number(dollars)}.${cents}`;
  }

  function handleChange(inputName: string, value: string) {
    let newValue = value;

    if (inputName === "amount") newValue = formatCurrency(value);

    setFormData((formData) => ({
      ...formData,
      [inputName]: newValue,
    }));
  }
}

interface IFormData {
  name: string;
  amount: string;
}
