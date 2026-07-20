import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Trainer Portal",
  description: "GymSaaS Trainer Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Utility for concatenating classes
  const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ");
  
  return (
    <html lang="en" className={cx("dark font-sans", outfit.variable, geist.variable)}>
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-brand-green selection:text-black">
        {/* Simple Top Navigation */}
        <nav className="glass-panel sticky top-0 z-50 border-b border-white/5 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-cyan">GymSaaS Trainer</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-zinc-300 font-medium hover:text-white cursor-pointer transition-colors">Schedule</span>
            <span className="text-zinc-300 font-medium hover:text-white cursor-pointer transition-colors">Clients</span>
            <div className="w-10 h-10 rounded-full bg-brand-green/20 border border-brand-green/50 flex items-center justify-center">
              <span className="font-bold text-brand-green">CM</span>
            </div>
          </div>
        </nav>
        <main className="p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
