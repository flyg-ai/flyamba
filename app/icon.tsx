import { ImageResponse } from "next/og";
import { ACCENT, ACCENT_FOREGROUND, PLANE_PATH } from "@/app/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The Navbar's brand mark: a white plane rotated -45° on an accent-orange circle.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Round with transparent corners, like the mark itself — reads cleanly
          // against both light and dark browser chrome.
          background: ACCENT,
          borderRadius: "50%",
        }}
      >
        <svg
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill={ACCENT_FOREGROUND}
          stroke={ACCENT_FOREGROUND}
          strokeWidth={0.5}
          strokeLinejoin="round"
          style={{ transform: "rotate(-45deg)" }}
        >
          <path d={PLANE_PATH} />
        </svg>
      </div>
    ),
    { ...size },
  );
}
