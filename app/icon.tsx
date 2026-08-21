import { ImageResponse } from "next/og";
import { ACCENT, ACCENT_FOREGROUND, PLANE_PATH } from "@/app/lib/brand";

// 48 rather than 32: Google will not use a favicon smaller than 48x48 in search
// results, and a 32px icon is simply dropped there. Browsers downscale to the 16
// or 32 they want for the tab strip.
export const size = { width: 48, height: 48 };
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
          width={30}
          height={30}
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
