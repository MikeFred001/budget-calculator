import React from "react";
import Typography from "./common/Typography";

export default function DebtTotal({ total }: { total: number }) {
  return (
    <div className="flex items-center justify-between px-2 gap-6 border-4 border-green-300 text-[2rem] leading-snug">
      <Typography>Total</Typography>
      <Typography currency>{total}</Typography>
    </div>
  );
}
