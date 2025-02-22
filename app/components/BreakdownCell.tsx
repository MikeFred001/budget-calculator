import Typography from "./common/Typography";
import { useState } from "react";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAppStore from "../store/appStore";

export default function BreakdownCell({
  title,
  amount,
  editable = false,
  className = "",
}: IBreakdownCellProps) {
  const [hover, setHover] = useState(false);
  const { editingIncome, setAppState } = useAppStore();

  const hoverStyling = "md:bg-green-900 cursor-pointer";

  return (
    <div
      className={`BREAKDOWN-CELL relative flex flex-row justify-between p-2 md:px-0 md:flex-col items-center leading-none md:relative border-green-300 md:py-5 group
      ${hover && editable ? hoverStyling : ""}
      ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={showEditForm}
    >
      {editable && !editingIncome && (
        <FontAwesomeIcon
          icon={faEdit}
          className="absolute top-[2px] text-[.6rem] left-[3px] md:left-auto md:text-[.9rem] md:top-1 md:right-1"
        />
      )}
      <Typography
        className={`md:absolute md:left-1 md:top-1 font-semibold text-[1.1rem]
        `}
      >
        {title}
      </Typography>

      <Typography className="text-[2rem]" currency>
        {amount}
      </Typography>
      <Typography className="hidden text-[1.2rem] opacity-70 md:block" currency>
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
