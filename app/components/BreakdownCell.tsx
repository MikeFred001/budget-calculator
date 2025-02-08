import Typography from "./common/Typography";
import { useState } from "react";

import useAppStore from "../store/appStore";

export default function BreakdownCell({
  title,
  amount,
  editable = false,
  className = "",
}: IBreakdownCellProps) {
  console.log("TYPE OF AMOUNT:", typeof amount);
  const [hover, setHover] = useState(false);
  const { setAppState } = useAppStore();

  const hoverStyling: string = "bg-green-900 cursor-pointer";

  return (
    <div
      className={`BREAKDOWN-CELL flex flex-col items-center leading-none relative border-green-300 py-5 group
      ${hover && editable ? hoverStyling : ""}
      ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={showEditForm}
    >
      <Typography
        className={`absolute left-1 top-1 font-semibold text-[.9rem]
          ${hover && editable ? "text-[1.25rem]" : ""}
        `}
      >
        {hover && editable ? "EDIT" : title}
      </Typography>
      <Typography className="text-[2rem]" currency>
        {amount}
      </Typography>
      <Typography className="text-[1.2rem] opacity-70" currency>
        {amount / 2}
      </Typography>
    </div>
  );

  function showEditForm(): void {
    if (!editable) return;
    setAppState({ editingIncome: true });
  }
}

interface IBreakdownCellProps {
  title: string;
  amount: number;
  editable?: boolean;
  className?: string;
}
