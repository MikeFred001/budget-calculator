export default function Button({
  className,
  children,
  style,
  type = "button",
  onClick,
  onMouseEnter,
  onMouseLeave,
}: IButtonProps) {
  return (
    <button
      type={type}
      className={`BUTTON flex justify-center items-center border px-4 ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      {children}
    </button>
  );
}

interface IButtonProps {
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  onClick?: (e) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: React.ReactNode;
}
