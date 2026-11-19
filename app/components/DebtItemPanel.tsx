import { useRef, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoney, toCents } from "@/utils/helpers";
import type { Debt, DebtInput } from "@/utils/helpers";
import DeleteAction from "./DeleteAction";
import RecordForm, { Field, readAmount, readName } from "./RecordForm";

export default function DebtItemPanel({
  debts,
  onAdd,
  onEdit,
  onDelete,
}: {
  debts: Debt[];
  onAdd: (debt: DebtInput) => Promise<void>;
  onEdit: (debt: Debt) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [adding, setAdding] = useState(false);
  const addButton = useRef<HTMLButtonElement>(null);
  const total = debts.reduce((sum, debt) => sum + toCents(debt.amount), 0);

  return (
    <section className="panel" aria-labelledby="debts-heading">
      <div className="panel-header">
        <div>
          <h2 id="debts-heading">Debt balances</h2>
          <p className="secondary">
            Total balance{" "}
            <strong className="money debt-total">{formatMoney(total)}</strong>
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
          <span aria-hidden="true">+</span> Add debt
        </button>
      </div>
      {adding && (
        <DebtForm
          onClose={() => {
            setAdding(false);
            requestAnimationFrame(() => addButton.current?.focus());
          }}
          onSave={onAdd}
        />
      )}
      {debts.length ? (
        <ul className="records">
          {debts.map((debt) => (
            <DebtRow
              key={debt.id}
              debt={debt}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-state">No debts are being tracked.</p>
      )}
    </section>
  );
}

function DebtRow({
  debt,
  onEdit,
  onDelete,
}: {
  debt: Debt;
  onEdit: (debt: Debt) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const editButton = useRef<HTMLButtonElement>(null);

  return (
    <li className="debt-row">
      {editing ? (
        <DebtForm
          debt={debt}
          onSave={(input) => onEdit({ ...input, id: debt.id })}
          onClose={() => {
            setEditing(false);
            requestAnimationFrame(() => editButton.current?.focus());
          }}
        />
      ) : (
        <div className="debt-grid">
          <span className="record-name">{debt.name}</span>
          <span className="money">{formatMoney(toCents(debt.amount))}</span>
          <div className="row-actions">
            <button
              className="button button-icon"
              type="button"
              ref={editButton}
              aria-label={`Edit ${debt.name}`}
              disabled={deleting}
              onClick={() => setEditing(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} aria-hidden="true" />
            </button>
            <DeleteAction
              name={debt.name}
              onDelete={() => onDelete(debt.id)}
              onPending={setDeleting}
            />
          </div>
        </div>
      )}
    </li>
  );
}

function DebtForm({
  debt,
  onClose,
  onSave,
}: {
  debt?: Debt;
  onClose: () => void;
  onSave: (debt: DebtInput) => Promise<void>;
}) {
  return (
    <RecordForm
      submitLabel={debt ? "Save changes" : "Save debt"}
      onClose={onClose}
      onSave={(fields) => {
        const input = {
          name: readName(fields),
          amount: readAmount(fields, "amount"),
        };
        return onSave(input);
      }}
    >
      <Field
        name="name"
        label="Debt name"
        defaultValue={debt?.name}
        autoFocus
      />
      <Field
        name="amount"
        label="Current balance"
        defaultValue={debt?.amount.toFixed(2)}
        decimal
      />
    </RecordForm>
  );
}
