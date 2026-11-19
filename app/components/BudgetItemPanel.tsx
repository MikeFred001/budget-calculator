import { useRef, useState } from "react";
import {
  formatCalendarDate,
  formatMoney,
  frequencies,
  frequencyLabels,
  isCalendarDate,
  monthlyCents,
  nextPaymentDate,
  toCents,
} from "@/utils/helpers";
import type { Frequency, Payment, PaymentInput } from "@/utils/helpers";
import RecordForm, { Field, readAmount, readName } from "./RecordForm";
import DeleteAction from "./DeleteAction";

export interface Preferences {
  split: boolean;
  budgetItemsSorted: boolean;
}

export default function BudgetItemPanel({
  payments,
  today,
  preferences,
  onPreferences,
  onAdd,
  onDelete,
}: {
  payments: Payment[];
  today: string;
  preferences: Preferences;
  onPreferences: (value: Preferences) => void;
  onAdd: (payment: PaymentInput) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [adding, setAdding] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null);
  const scheduled = payments.map((payment) => ({
    payment,
    date: nextPaymentDate(payment, today),
  }));
  const nearest = scheduled.reduce<string | undefined>(
    (earliest, row) => (!earliest || row.date < earliest ? row.date : earliest),
    undefined,
  );
  const sorted = scheduled.sort(
    (a, b) =>
      (preferences.budgetItemsSorted
        ? a.date.localeCompare(b.date)
        : a.payment.startDate
            .slice(8, 10)
            .localeCompare(b.payment.startDate.slice(8, 10))) ||
      a.payment.id - b.payment.id,
  );

  const groups = preferences.split
    ? frequencies.map((frequency) => ({
        frequency,
        rows: sorted.filter(({ payment }) => payment.freq === frequency),
      }))
    : [{ frequency: null, rows: sorted }];

  return (
    <section className="panel" aria-labelledby="payments-heading">
      <div className="panel-header">
        <div>
          <h2 id="payments-heading">Recurring payments</h2>
          <p className="secondary">
            {payments.length}{" "}
            {payments.length === 1 ? "active payment" : "active payments"}
          </p>
        </div>
        <button
          className="button button-primary"
          type="button"
          ref={addButton}
          aria-expanded={adding}
          disabled={adding}
          onClick={() => setAdding(true)}
        >
          <span aria-hidden="true">+</span> Add payment
        </button>
      </div>
      <div className="toolbar">
        <label className="control">
          <span>View</span>
          <select
            value={preferences.split ? "grouped" : "all"}
            onChange={(event) =>
              onPreferences({
                ...preferences,
                split: event.target.value === "grouped",
              })
            }
          >
            <option value="all">All payments</option>
            <option value="grouped">By frequency</option>
          </select>
        </label>
        <label className="control">
          <span>Sort by</span>
          <select
            value={preferences.budgetItemsSorted ? "next" : "day"}
            onChange={(event) =>
              onPreferences({
                ...preferences,
                budgetItemsSorted: event.target.value === "next",
              })
            }
          >
            <option value="next">Next due date</option>
            <option value="day">Start day of month</option>
          </select>
        </label>
      </div>
      {adding && (
        <RecordForm
          submitLabel="Save payment"
          onClose={() => {
            setAdding(false);
            // Wait for the trigger to be enabled again.
            requestAnimationFrame(() => addButton.current?.focus());
          }}
          onSave={(fields) => {
            const name = readName(fields);
            const cost = readAmount(fields, "cost");
            const startDate = String(fields.get("startDate") ?? "");
            const frequency = frequencies.find(
              (entry) => entry === fields.get("frequency"),
            );
            if (!frequency || !isCalendarDate(startDate))
              throw new Error(
                "Choose a frequency and a valid first payment date.",
              );
            return onAdd({ name, cost, freq: frequency, startDate });
          }}
        >
          <Field name="name" label="Payment name" autoFocus />
          <Field name="cost" label="Amount per payment" decimal />
          <label className="field">
            <span>Frequency</span>
            <select name="frequency" defaultValue="Monthly">
              {frequencies.map((frequency) => (
                <option key={frequency} value={frequency}>
                  {frequencyLabels[frequency]}
                </option>
              ))}
            </select>
          </label>
          <Field name="startDate" label="First payment date" type="date" />
        </RecordForm>
      )}
      {groups.map(({ frequency, rows }) => (
        <PaymentGroup
          key={frequency ?? "all"}
          frequency={frequency}
          rows={rows}
          nearest={nearest}
          today={today}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

function PaymentGroup({
  frequency,
  rows,
  nearest,
  today,
  onDelete,
}: {
  frequency: Frequency | null;
  rows: { payment: Payment; date: string }[];
  nearest?: string;
  today: string;
  onDelete: (id: number) => Promise<void>;
}) {
  return (
    <div className="payment-group" data-frequency={frequency ?? undefined}>
      {frequency && (
        <h3 className="group-heading">{frequencyLabels[frequency]}</h3>
      )}
      {rows.length ? (
        <>
          <div className="payment-grid column-headings" aria-hidden="true">
            <span>Payment</span>
            <span>Monthly average</span>
            <span>Next due</span>
            <span>Frequency</span>
            <span />
          </div>
          <ul className="records">
            {rows.map(({ payment, date }) => (
              <li
                key={payment.id}
                className="payment-row"
                data-next={date === nearest ? "" : undefined}
              >
                <div className="payment-grid">
                  <div className="payment-name">
                    <span className="record-name">{payment.name}</span>
                    <span className="secondary">
                      {formatMoney(toCents(payment.cost))} per payment
                    </span>
                  </div>
                  <div className="payment-average">
                    <span className="mobile-label">Monthly average</span>
                    <span className="money">
                      {formatMoney(monthlyCents(payment.cost, payment.freq))}
                    </span>
                  </div>
                  <div className="payment-due">
                    <span className="mobile-label">Next due</span>
                    <time dateTime={date}>{formatCalendarDate(date)}</time>
                    {date === nearest && (
                      <span className="due-status">
                        {date === today ? "Due today" : "Next up"}
                      </span>
                    )}
                    <span className="secondary first-payment">
                      Started {formatCalendarDate(payment.startDate)}
                    </span>
                  </div>
                  <div className="payment-frequency">
                    <span
                      className="frequency-badge"
                      data-frequency={payment.freq}
                    >
                      {frequencyLabels[payment.freq]}
                    </span>
                  </div>
                  <DeleteAction
                    name={payment.name}
                    onDelete={() => onDelete(payment.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="empty-state">
          {frequency
            ? "No payments in this group."
            : "Add a recurring payment to start tracking upcoming charges."}
        </p>
      )}
    </div>
  );
}
