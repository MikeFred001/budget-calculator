import { addMonths, isAfter, lastDayOfMonth, parseISO } from "date-fns";

function getNextPaymentDate(startDate: string): Date {
  let paymentDate = parseISO(startDate);
  const today = new Date().toISOString();

  while (!isAfter(paymentDate, today)) {
    paymentDate = addMonths(paymentDate, 1);

    if (paymentDate.getDate() !== parseISO(startDate).getDate()) {
      paymentDate = lastDayOfMonth(paymentDate);
    }
  }
  return paymentDate;
}

function getNextPaymentDateUS(startDate: string): string {
  let paymentDate = parseISO(startDate);
  const today = new Date().toISOString();

  while (!isAfter(paymentDate, today)) {
    paymentDate = addMonths(paymentDate, 1);

    if (paymentDate.getDate() !== parseISO(startDate).getDate()) {
      paymentDate = lastDayOfMonth(paymentDate);
    }
  }

  return formatDateUS(paymentDate.toISOString());
}

function formatDateUS(dateISO: string, shortenYear: boolean = false): string {
  const [year, month, day] = dateISO.split("T")[0].split("-");

  return shortenYear
    ? `${month}/${day}/${year.slice(2)}`
    : `${month}/${day}/${year}`;
}

function sortByFullDate(items: IBudgetItem[]): IBudgetItem[] {
  const sorted = items.sort((a, b) => {
    const aDate = getNextPaymentDate(a.startDate);
    const bDate = getNextPaymentDate(b.startDate);

    return aDate.getTime() - bDate.getTime();
  });

  return sorted;
}

function calculateMonthly(cost: number, freq: string): number {
  if (freq === "Monthly") return cost;

  const freqMapping = { BiWeekly: 0.5, Monthly: 1, Yearly: 12 };
  const monthly = Number(cost) / freqMapping[freq];

  return monthly;
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

//--INTERFACES---------------------------------------//

interface IBudgetItem {
  id: number;
  name: string;
  cost: number;
  freq: string;
  startDate: string;
}

//--EXPORTS-----------------------------------------//

export {
  getNextPaymentDate,
  getNextPaymentDateUS,
  formatDateUS,
  calculateMonthly,
  sortByFullDate,
  capitalize,
};
