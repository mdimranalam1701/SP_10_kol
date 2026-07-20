import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Customer Portal",
  description: "Gym Member Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", outfit.variable, geist.variable)}>
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-brand-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
