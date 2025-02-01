export default function ScalableImage({
  src,
  className = "",
  containerClassName = "",
  width,
  height,
  alt = "",
  ...props
}: IScalableImageProps) {
  return (
    <div
      className={`relative ${containerClassName}`}
      style={{
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        style={{ objectFit: "cover" }}
        {...props}
      />
    </div>
  );
}

interface IScalableImageProps {
  src: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  alt?: string;
  isLoading?: boolean;
}
