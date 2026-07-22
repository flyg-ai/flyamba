"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 backdrop-blur hover:bg-card transition-colors"
    >
      <Sun
        className={`absolute h-[18px] w-[18px] text-foreground transition-all duration-500 ${
          theme === "dark" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-[18px] w-[18px] text-foreground transition-all duration-500 ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
