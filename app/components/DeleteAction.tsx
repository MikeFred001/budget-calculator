import { useRef, useState } from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteAction({
  name,
  onDelete,
}: {
  name: string;
  onDelete: () => void;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [confirming, setConfirming] = useState(false);

  function closeConfirmation() {
    setConfirming(false);
    trigger.current?.focus();
  }

  return (
    <div
      className="delete-action"
      onKeyDown={(event) => {
        if (event.key === "Escape" && confirming) {
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
        onClick={() => setConfirming(!confirming)}
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
            >
              Keep
            </button>
            <button
              className="button button-danger"
              type="button"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
