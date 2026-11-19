"use client";

import { useRef, useState } from "react";
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
  onSave: (fields: FormData) => Promise<void>;
  onClose: () => void;
}) {
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const fields = new FormData(event.currentTarget);
    submitting.current = true;
    setPending(true);
    setError("");
    try {
      await onSave(fields);
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Couldn’t save this change.",
      );
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <form className="record-form" onSubmit={submit} aria-busy={pending}>
      <fieldset className="form-fields" disabled={pending}>
        {children}
      </fieldset>
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button
          className="button button-primary"
          type="submit"
          disabled={pending}
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <button
          className="button"
          type="button"
          onClick={onClose}
          disabled={pending}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
