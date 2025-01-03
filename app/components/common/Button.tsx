import React from "react";

export default function Button({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button className={`BUTTON ${className} border border-green-300 px-4`}>
      {label}
    </button>
  );
}
