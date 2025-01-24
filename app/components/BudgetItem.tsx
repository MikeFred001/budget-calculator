import Typography from "./common/Typography";
import CostInfo from "./common/CostInfo";
import DateInfo from "./common/DateInfo";
import Chip from "./common/Chip";

import useAppStore from "../store/appStore";

export default function BudgetItem({ item, className }: IBudgetItemProps) {
  const { budgetItems, setAppState } = useAppStore();

  return (
    <div
      className={`
        BUDGET-ITEM grid grid-cols-4 items-center p-2 border text-[1.4rem]
        ${item.freq}-outline
        ${className}
      `}
    >
      <Typography>{capitalize(item.name)}</Typography>
      <CostInfo amount={calculateMonthly(item.cost)} />
      <DateInfo startDate={item.startDate} />
      <Chip
        freq={item.freq}
        cost={item.cost}
        onClick={() => deleteItem(item.id)}
      />
    </div>
  );

  function calculateMonthly(cost: string): string {
    if (item.freq === "Monthly") return cost;

    const freqMapping = { BiWeekly: 0.5, Monthly: 1, Yearly: 12 };
    const monthly = Number(cost) / freqMapping[item.freq];

    return monthly.toFixed(2);
  }

  function deleteItem(id: number): void {
    const filtered: IBudgetItem[] = budgetItems.filter((item) => {
      return item.id !== id;
    });
    setAppState({ budgetItems: filtered });
  }

  function capitalize(string: string): string {
    const wordsToIgnore = [
      "a",
      "an",
      "as",
      "at",
      "and",
      "by",
      "but",
      "or",
      "the",
      "of",
      "for",
      "on",
      "to",
    ];

    const words = string.split(" ");

    const capitalizedWords = words.map((word, i) => {
      if (i === 0 || !wordsToIgnore.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });
    return capitalizedWords.join(" ");
  }
}

interface IBudgetItemProps {
  item: IBudgetItem;
  className?: string;
  groupFreq?: string;
}

interface IBudgetItem {
  id: number;
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}
