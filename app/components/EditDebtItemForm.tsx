import InputField from "./common/InputField";
import Button from "./common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faArrowAltCircleLeft,
} from "@fortawesome/free-regular-svg-icons";
import useAppStore from "../store/appStore";
import { useState, useEffect, useRef } from "react";

export default function EditDebtItemForm({
  item,
  setEditingDebtItem,
}: IEditDebtItemFormProps) {
  const initialFormData: IFormData = {
    name: item.name,
    amount: item.amount.toFixed(2),
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
    <form className="EDIT-DEBT-ITEM-FORM flex items-center h-[60px] gap-[1px]">
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
          className={`text-[2rem] w-[52px] font-arial font-bold hover:bg-green-300 hover:border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline`}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
        </Button>
        <Button
          onClick={() => setEditingDebtItem(false)}
          className={`text-[2rem] w-[52px] font-arial font-bold hover:bg-green-300 hover:border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline`}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </Button>
      </div>
    </form>
  );

  function editDebtItem(newItem: IFormData) {
    const entries = Object.values(newItem);

    for (let entry of entries) {
      if (entry === "") {
        alert("Fill out all the fields, idiot.");
        return;
      }
    }

    const newDebtItems = debtItems.map((dItem) =>
      dItem.id === item.id
        ? { ...dItem, ...newItem, amount: Number(newItem.amount) }
        : dItem
    );

    setAppState({ debtItems: newDebtItems });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    editDebtItem(formData);
    setFormData(initialFormData);
    setEditingDebtItem(false);
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

interface IEditDebtItemFormProps {
  item: IDebtItem;
  setEditingDebtItem: React.Dispatch<React.SetStateAction<boolean>>;
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
