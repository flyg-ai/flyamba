"use client";

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "flyamba-theme";

/**
 * The theme is owned by the <html> element, not by React.
 *
 * The anti-FOUC script in layout.tsx resolves and applies it before hydration,
 * so React has to *read* a value that already exists in the DOM. Mirroring that
 * into useState from an effect (the previous approach) meant rendering once with
 * the wrong theme and then setting state to correct it — a cascading render,
 * which is what react-hooks/set-state-in-effect flags. useSyncExternalStore is
 * the supported way to subscribe to state that lives outside React.
 */
const listeners = new Set<() => void>();

function currentTheme(): Theme {
  // Same resolution order as the layout script: explicit attribute, then a
  // stored choice, then the OS preference.
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") return stored;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  for (const notify of listeners) notify();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

// Server render has no DOM to read, so it assumes light — matching the
// pre-hydration default. React re-reads the real value after hydrating.
const getServerSnapshot = (): Theme => "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void; setTheme: (t: Theme) => void }>({
  theme: "light",
  toggle: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, currentTheme, getServerSnapshot);

  const value = useMemo(
    () => ({
      theme,
      toggle: () => applyTheme(theme === "dark" ? "light" : "dark"),
      setTheme: applyTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
