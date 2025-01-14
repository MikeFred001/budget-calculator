import InputField from "./common/InputField";
import FrequencyInput from "./FrequencyInput";
import Button from "./common/Button";
import useAppStore from "../store/appStore";
import { useState, useEffect } from "react";

export default function AddItemForm() {
  const initialFormData: IFormData = {
    name: "",
    cost: "",
    freq: "Monthly",
    startDate: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const { budgetItems, setAppState } = useAppStore();

  useEffect(() => {
    console.log("FORM DATA", "\n", formData);
  }, [formData]);

  return (
    <div className="ADD-ITEM-FORM flex h-12 gap-4">
      <div className="flex flex-grow">
        <InputField
          inputName="name"
          value={formData.name}
          onChange={handleChange}
          className={`flex-grow ${
            formData.freq ? `${formData.freq}-outline` : "Default-outline"
          }`}
        />
        <InputField
          inputName="cost"
          value={formData.cost}
          onChange={handleChange}
          className={
            formData.freq ? `${formData.freq}-outline` : "Default-outline"
          }
        />
        <InputField
          inputName="startDate"
          value={formData.startDate}
          maxLength={10}
          onChange={handleChange}
          className={
            formData.freq ? `${formData.freq}-outline` : "Default-outline"
          }
        />
        <FrequencyInput selected={formData.freq} onClick={handleOptionClick} />
        <Button
          onClick={clearForm}
          className={`w-[52px] font-arial hover:font-bold hover:border-4 active:bg-white active:border-white ml-1 active:text-black ${formData.freq}-outline`}
        >
          X
        </Button>
      </div>
      <Button
        onClick={handleSubmit}
        className={`active:bg-white active:border-white hover:font-bold
          ${formData.freq ? `${formData.freq}-filled` : "Default-outline"}
        `}
      >
        Add Item
      </Button>
    </div>
  );

  function addItem(newItem: IFormData) {
    const entries = Object.values(newItem);
    for (let entry of entries) {
      if (entry === "") {
        alert("Fill out all the fields, idiot.");
        return;
      }
    }
    const newItemWithId: IBudgetItem = {
      ...newItem,
      id: budgetItems.length + 1,
    };
    setAppState({ budgetItems: [...budgetItems, newItemWithId] });
  }

  function handleOptionClick(freq: string) {
    setFormData((formData) => ({
      ...formData,
      freq,
    }));
  }

  function handleSubmit() {
    addItem(formData);
    setFormData(initialFormData);
  }

  function clearForm() {
    setFormData(initialFormData);
  }

  function formatCurrency(value: string) {
    if (value === "") return "0.00";

    const numericValue = value.replace(/\D/g, "");
    const paddedValue = numericValue.padStart(3, "0");
    const dollars = paddedValue.slice(0, -2);
    const cents = paddedValue.slice(-2);
    return `${Number(dollars)}.${cents}`;
  }

  function formatDate(value: string) {
    let newValue = value.replace(/\D/g, "");

    if (newValue.length >= 5) {
      newValue = `${newValue.slice(0, 2)}/${newValue.slice(
        2,
        4
      )}/${newValue.slice(4)}`;
    } else if (newValue.length < 5 && newValue.length > 2) {
      newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
    }

    return newValue;
  }

  function handleChange(inputName: string, value: string) {
    let newValue = value;

    if (inputName === "cost") newValue = formatCurrency(value);
    if (inputName === "startDate") newValue = formatDate(value);

    setFormData((formData) => ({
      ...formData,
      [inputName]: newValue,
    }));
  }
}

interface IFormData {
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}
