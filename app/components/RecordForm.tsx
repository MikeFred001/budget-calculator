"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { parseAmount } from "@/utils/helpers";

export function readAmount(fields: FormData, name: string) {
  const amount = parseAmount(String(fields.get(name) ?? "").trim());
  if (amount === null) {
    throw new Error(
      "Enter a dollar amount from 0 to 99,999,999.99 with up to two decimal places.",
    );
  }
  return amount;
}

export function readName(fields: FormData) {
  const name = String(fields.get("name") ?? "").trim();
  if (!name) throw new Error("Enter a name.");
  return name;
}

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  autoFocus,
  decimal,
}: {
  label: string;
  name: string;
  type?: "text" | "date";
  defaultValue?: string;
  autoFocus?: boolean;
  decimal?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        inputMode={decimal ? "decimal" : undefined}
        maxLength={decimal ? 11 : 50}
        placeholder={decimal ? "0.00" : undefined}
        required
      />
    </label>
  );
}

export default function RecordForm({
  children,
  submitLabel,
  onSave,
  onClose,
}: {
  children: ReactNode;
  submitLabel: string;
  onSave: (fields: FormData) => void;
  onClose: () => void;
}) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      onSave(new FormData(event.currentTarget));
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Couldn’t save this change.",
      );
    }
  }

  return (
    <form className="record-form" onSubmit={submit}>
      <fieldset className="form-fields">{children}</fieldset>
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button className="button button-primary" type="submit">
          {submitLabel}
        </button>
        <button className="button" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
