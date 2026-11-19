import { useRef, useState } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteAction({
  name,
  onDelete,
  onPending,
}: {
  name: string;
  onDelete: () => Promise<void>;
  onPending?: (pending: boolean) => void;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [confirming, setConfirming] = useState(false);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function remove() {
    if (pending) return;
    setPending(true);
    onPending?.(true);
    setError("");
    try {
      await onDelete();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Couldn’t delete this entry.",
      );
    } finally {
      setPending(false);
      onPending?.(false);
    }
  }

  function closeConfirmation() {
    setConfirming(false);
    setError("");
    trigger.current?.focus();
  }

  return (
    <div
      className="delete-action"
      onKeyDown={(event) => {
        if (event.key === "Escape" && confirming && !pending) {
          closeConfirmation();
        }
      }}
    >
      <button
        className="button button-icon button-danger"
        type="button"
        ref={trigger}
        aria-label={`Delete ${name}`}
        aria-expanded={confirming}
        onClick={() => (confirming ? closeConfirmation() : setConfirming(true))}
        disabled={pending}
      >
        <FontAwesomeIcon icon={faTrashCan} aria-hidden="true" />
      </button>
      {confirming && (
        <div
          className="delete-confirmation"
          role="group"
          aria-label={`Delete ${name}?`}
        >
          <p>Delete {name}?</p>
          <div className="form-actions">
            <button
              className="button"
              type="button"
              autoFocus
              onClick={closeConfirmation}
              disabled={pending}
            >
              Keep
            </button>
            <button
              className="button button-danger"
              type="button"
              onClick={remove}
              disabled={pending}
            >
              {pending ? "Deleting…" : "Delete"}
            </button>
          </div>
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
