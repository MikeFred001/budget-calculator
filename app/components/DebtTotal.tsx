import React from "react";
import Typography from "./common/Typography";

export default function DebtTotal({ total }: { total: number }) {
  return (
    <div className="flex flex-col items-center justify-center px-10 border Default-outline text-[2rem] leading-snug">
      <Typography>Total</Typography>
      <Typography currency>{total}</Typography>
    </div>
  );
}
