import InputField from "./common/InputField";
import Button from "./common/Button";
import useAppStore from "../store/appStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect, useRef } from "react";

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
    <form className="ADD-DEBT-ITEM-FORM flex items-center h-[60px] gap-[1px]">
      <div className="flex flex-grow h-[90%] px-1">
        <InputField
          inputName="name"
          value={formData.name}
          onChange={handleChange}
          inputRef={inputRef}
          className="flex-grow"
        />
        <InputField
          inputName="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          className={`w-[52px] font-arial font-bold hover:bg-green-300 hover:border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline text-[2rem]`}
        >
          +
        </Button>
        <Button
          onClick={() => setAppState({ addingDebtItem: false })}
          className={`text-[2rem] w-[52px] font-arial font-bold hover:bg-green-300 hover:border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline`}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </Button>
      </div>
    </form>
  );

  function addDebtItem(newItem: IFormData) {
    const entries = Object.values(newItem);

    for (let entry of entries) {
      if (entry === "") {
        alert("Fill out all the fields, idiot.");
        return;
      }
    }

    const newItemWithId: IDebtItem = {
      ...newItem,
      id: debtItems.length + 1,
      amount: Number(newItem.amount),
    };

    setAppState({ debtItems: [newItemWithId, ...debtItems] });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addDebtItem(formData);
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

interface IDebtItem {
  id: number;
  name: string;
  amount: number;
}
