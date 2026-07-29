import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

export const metadata: Metadata = {
  title: "For Sidrat | 100 Days of Us",
  description: "A private interactive love letter celebrating 100 days of our love. Handcrafted with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${caveat.variable} dark`}>
      <body className="bg-background text-foreground antialiased min-h-screen selection:bg-pink-accent/20 selection:text-pink-accent overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
