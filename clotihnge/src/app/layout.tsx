import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KONANE — Luxury Streetwear",
  description: "Elite men's streetwear. Futuristic. Mysterious. Powerful.",
  keywords: ["KONANE", "luxury streetwear", "men's fashion", "futuristic clothing"],
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
