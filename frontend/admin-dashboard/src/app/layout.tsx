import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Premium Gym Owner Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", outfit.variable, geist.variable)}>
      <body className="flex flex-col min-h-screen bg-background text-foreground selection:bg-brand-green selection:text-black">
        {children}
      </body>
    </html>
  );
}
