import InputField from "./common/InputField";
import FrequencyInput from "./FrequencyInput";
import Button from "./common/Button";
import useAppStore from "../store/appStore";
import GirlMathAPI from "@/utils/api";
import { sortByDay, toCamelCase } from "@/utils/helpers";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function AddBudgetItemForm({
  groupFreq,
}: {
  groupFreq?: string;
}) {
  const initialFormData: IFormData = {
    name: "",
    cost: "",
    freq: groupFreq || "Monthly",
    startDate: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { budgetItems, setAppState } = useAppStore();

  return (
    <form
      className="ADD-BUDGET-ITEM-FORM flex flex-col md:h-14 p-1 gap-[2px] md:gap-3 md:flex-row"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col md:flex-row md:flex-grow gap-[2px] md:gap-0">
        <InputField
          inputName="name"
          value={formData.name}
          onChange={handleChange}
          className={`flex-grow w-full md:w-[9rem]
            ${formData.freq ? `${formData.freq}-outline` : "Default-outline"}
          `}
        />
        <InputField
          inputName="cost"
          value={formData.cost}
          onChange={handleChange}
          className={`w-full md:w-[9rem]
            ${formData.freq ? `${formData.freq}-outline` : "Default-outline"}
          `}
        />
        <InputField
          inputName="startDate"
          value={formData.startDate}
          maxLength={10}
          onChange={handleChange}
          className={`w-full md:w-[9rem]
            ${formData.freq ? `${formData.freq}-outline` : "Default-outline"}
          `}
        />
      </div>
      {!groupFreq && (
        <FrequencyInput
          selected={formData.freq}
          onClick={handleOptionClick}
          className="hidden md:flex"
        />
      )}
      <div className="flex gap-1 justify-center">
        {!groupFreq && (
          <FrequencyInput
            selected={formData.freq}
            onClick={handleOptionClick}
            className="md:hidden flex h-[50px] flex-grow"
          />
        )}
        <Button
          className={`w-[52px] font-arial font-bold text-[2rem] active:bg-white active:border-white ${formData.freq}-hover
          ${formData.freq ? `${formData.freq}-outline` : "Default-outline"}
        `}
          type="submit"
        >
          +
        </Button>
        <Button
          onClick={() => setAppState({ addingBudgetItem: "" })}
          className={`w-[52px] font-arial font-bold ${formData.freq}-hover hover:text-black active:bg-white active:border-white active:text-black ${formData.freq}-outline`}
        >
          <FontAwesomeIcon icon={faBan} />
        </Button>
      </div>
    </form>
  );

  async function addItem(formData: IFormData) {
    const entries = Object.values(formData);
    for (let entry of entries) {
      if (entry === "") {
        alert("Fill out all the fields, idiot.");
        return;
      }
    }
    try {
      const formattedItem = {
        ...formData,
        cost: Number(formData.cost),
        startDate: convertToUtcISO(formData.startDate),
      };
      const addedItem = toCamelCase(
        await GirlMathAPI.addBudgetItem(formattedItem)
      );

      if (!addedItem) throw new Error("Failed to add item");

      setAppState({ budgetItems: sortByDay([...budgetItems, addedItem]) });
    } catch (err) {
      console.error("Failed to add budget item:", err);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addItem(formData);
    setFormData(initialFormData);
  }

  function handleOptionClick(freq: string) {
    setFormData((formData) => ({
      ...formData,
      freq,
    }));
  }

  function formatCurrency(value: string) {
    if (value === "") return "0.00";

    const numericValue = value.replace(/\D/g, "");
    const paddedValue = numericValue.padStart(3, "0");
    const dollars = paddedValue.slice(0, -2);
    const cents = paddedValue.slice(-2);
    return `${Number(dollars)}.${cents}`;
  }

  function formatDateInput(value: string) {
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
    if (inputName === "startDate") newValue = formatDateInput(value);

    setFormData((formData) => ({
      ...formData,
      [inputName]: newValue,
    }));
  }

  function convertToUtcISO(date: string): string {
    const [month, day, year] = date.split("/");
    return `${year}-${month}-${day}T12:00:00.000Z`;
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
  cost: number;
  freq: string;
  startDate: string;
}
