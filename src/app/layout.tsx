import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { ScrollReset } from "@/components/ScrollReset";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cosmic Event Tracker",
  description: "Browse Near-Earth Objects and compare close approaches using NASA APIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%230ea5e9'/><circle cx='70' cy='30' r='8' fill='%23fbbf24'/></svg>`}
        />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col bg-transparent text-gray-100`}
      >
        <Starfield />
        <ScrollReset />
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
