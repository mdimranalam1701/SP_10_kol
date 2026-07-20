import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
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
      <body className="flex h-screen overflow-hidden bg-background text-foreground selection:bg-brand-green selection:text-black">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
