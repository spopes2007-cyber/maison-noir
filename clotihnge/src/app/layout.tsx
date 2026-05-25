import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KONANE — Luxury Streetwear",
  description: "Elite men's streetwear. Futuristic. Mysterious. Powerful.",
  keywords: ["KONANE", "luxury streetwear", "men's fashion", "futuristic clothing"],
  icons: {
    icon: [
      { url: "/maison-noir/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/maison-noir/icon.svg",
    apple: "/maison-noir/icon.svg",
  },
  themeColor: "#0D0D0D",
  manifest: undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: "var(--bg-void)" }}>
        {children}
      </body>
    </html>
  );
}
