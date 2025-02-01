export default function Button({ className, children, onClick }: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`BUTTON flex justify-center items-center border px-4 ${className}`}
    >
      {children}
    </button>
  );
}

interface IButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick: (e) => void;
}
