import Typography from "./common/Typography";
import InputField from "./common/InputField";
import Button from "./common/Button";
import { useState, useEffect } from "react";

export default function AddItemForm() {
  const [formData, setFormData] = useState({
    name: "",
    cost: "",
    frequency: "",
    startDate: "",
  });

  useEffect(() => {
    console.log("FORM DATA", "\n", formData);
  }, [formData]);

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

    if (inputName === "cost") {
      newValue = formatCurrency(value);
    }

    setFormData((prev) => ({
      ...prev,
      [inputName]: newValue,
    }));
  }

  return (
    <form className="ADD-ITEM-FORM flex mb-4">
      <InputField
        inputName="name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        inputName="cost"
        value={formData.cost}
        onChange={handleChange}
      />
      <InputField
        inputName="start date"
        value={formData.startDate}
        onChange={handleChange}
      />
      <InputField
        inputName="frequency"
        value={formData.frequency}
        onChange={handleChange}
      />
      <Button label="Add Item" className="ml-auto" />
    </form>
  );
}

interface IFormData {
  name: string;
  cost: string;
  frequency: string;
  startDate: string;
}
