import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/lib/theme";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flyamba.com"),
  title: "Flyamba — AI flight search for curious travelers",
  description:
    "Describe your dream trip. Flyamba's AI finds the perfect flights across hundreds of airlines in seconds.",
  openGraph: {
    title: "Flyamba — AI flight search for curious travelers",
    description: "Smarter flight search powered by AI. Describe your dream trip — we handle the rest.",
    type: "website",
  },
  twitter: { card: "summary_large_image", site: "@Flyamba" },
};

// Runs before hydration to set the theme class, preventing a flash of the
// wrong theme. Mirrors lib/theme.tsx's resolution (stored → system).
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('flyamba-theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
