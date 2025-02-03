export default function Button({
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`BUTTON flex justify-center items-center border px-4 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}

interface IButtonProps {
  className?: string;
  onClick?: (e) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
}
