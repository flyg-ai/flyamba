import { ImageResponse } from "next/og";
import { ACCENT, ACCENT_FOREGROUND, PLANE_PATH } from "@/app/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen icon. Deliberately a full-bleed orange square rather than the
// circle used by app/icon.tsx: iOS applies its own rounded-rect mask, and it
// composites transparent pixels to black, which would ring the circle in black.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ACCENT,
        }}
      >
        <svg
          width={108}
          height={108}
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
