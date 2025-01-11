export default function Typography({
  as: Tag = "p",
  children,
  className = "",
  onClick,
}: TypographyProps) {
  return (
    <Tag className={`${className}`} onClick={onClick}>
      {children}
    </Tag>
  );
}

type TypographyProps = {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
