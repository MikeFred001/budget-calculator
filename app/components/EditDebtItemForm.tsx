import InputField from "./common/InputField";
import Button from "./common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faArrowAltCircleLeft,
} from "@fortawesome/free-regular-svg-icons";
import GirlMathAPI from "@/utils/api";
import { useState, useEffect, useRef } from "react";
import useAppStore from "../store/appStore";

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
    <form
      className="EDIT-DEBT-ITEM-FORM flex items-center h-[60px] gap-[1px]"
      onSubmit={handleSubmit}
    >
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
          className={`text-[2rem] w-[52px] font-arial font-bold hover:bg-green-300 hover:border-green-300 hover:text-black active:bg-white active:border-white ml-1 active:text-black Default-outline`}
          type="submit"
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

  async function editDebtItem(formData: IFormData) {
    const entries = Object.values(formData);
    for (let entry of entries) {
      if (entry === "") {
        alert("Fill out all the fields, idiot.");
        return;
      }
    }
    try {
      const updatedDebtItem = await GirlMathAPI.updateDebtItem(item.id, {
        name: formData.name,
        amount: Number(formData.amount),
      });

      const newDebtItems = debtItems.map((item) =>
        item.id === updatedDebtItem.id ? updatedDebtItem : item
      );
      setAppState({ debtItems: newDebtItems });
    } catch (err) {
      console.error("Failed to edit debt item:", err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await editDebtItem(formData);
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
