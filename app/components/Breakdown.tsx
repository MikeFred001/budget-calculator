import { useRef, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoney, toCents } from "@/utils/helpers";
import RecordForm, { Field, readAmount } from "./RecordForm";

export default function Breakdown({
  income,
  expenses,
  onIncome,
}: {
  income: number;
  expenses: number;
  onIncome: (income: number) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const editButton = useRef<HTMLButtonElement>(null);
  const remaining = toCents(income) - expenses;

  return (
    <section className="overview" aria-labelledby="overview-heading">
      <h2 id="overview-heading">Monthly overview</h2>
      <dl className="metrics">
        <div className="metric">
          <dt>Income</dt>
          <dd>
            <span className="money metric-value">
              {formatMoney(toCents(income))}
            </span>
            <button
              className="button button-icon metric-edit"
              type="button"
              ref={editButton}
              aria-label="Edit monthly income"
              aria-expanded={editing}
              disabled={editing}
              onClick={() => setEditing(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} aria-hidden="true" />
            </button>
          </dd>
        </div>
        <div className="metric">
          <dt>Recurring costs</dt>
          <dd className="money metric-value">{formatMoney(expenses)}</dd>
        </div>
        <div
          className="metric metric-remaining"
          data-negative={remaining < 0 ? "" : undefined}
        >
          <dt>Remaining after payments</dt>
          <dd className="money metric-value">{formatMoney(remaining)}</dd>
        </div>
      </dl>
      {editing && (
        <RecordForm
          submitLabel="Save income"
          onClose={() => {
            setEditing(false);
            requestAnimationFrame(() => editButton.current?.focus());
          }}
          onSave={(fields) => onIncome(readAmount(fields, "income"))}
        >
          <Field
            name="income"
            label="Monthly income"
            defaultValue={income.toFixed(2)}
            decimal
            autoFocus
          />
        </RecordForm>
      )}
      <p className="overview-note">
        Recurring costs are averaged over 12 months.
      </p>
    </section>
  );
}
