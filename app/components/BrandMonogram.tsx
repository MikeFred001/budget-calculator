export default function BrandMonogram({
    size,
    color,
}: {
    size: number;
    color: string;
}) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 24" aria-hidden="true">
            <path
                d="M3 21V16 M10 21V11 M17 21V3L29 21V7"
                fill="none"
                stroke={color}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
