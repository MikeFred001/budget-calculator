import { ImageResponse } from "next/og";
import BrandMonogram from "./components/BrandMonogram";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #81372e",
                    borderRadius: 7,
                    background: "#441611",
                }}
            >
                <BrandMonogram size={24} color="#f96150" />
            </div>
        ),
        size,
    );
}
