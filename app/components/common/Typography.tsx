export default function Typography({
  as: Tag = "p",
  children,
  currency,
  className = "",
  onClick,
}: TypographyProps) {
  return (
    <Tag className={className} onClick={onClick}>
      {currency && "$"}
      {children}
    </Tag>
  );
}

type TypographyProps = {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  children: React.ReactNode;
  className?: string;
  currency?: boolean;
  onClick?: () => void;
};
