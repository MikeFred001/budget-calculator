import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 3,
        paddingBottom: 7,
        border: "1px solid #81372e",
        borderRadius: 7,
        background: "#441611",
      }}
    >
      {[6, 10, 15].map((height) => (
        <div
          key={height}
          style={{ width: 3, height, background: "#f96150", borderRadius: 1 }}
        />
      ))}
    </div>,
    size,
  );
}
