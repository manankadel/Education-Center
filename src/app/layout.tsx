import type { Metadata } from "next";
import "./globals.css";
import { fontPlayfair, fontManrope } from "./fonts";
import { SmoothScroller } from "@/components/core/SmoothScroller";
import { CustomCursor } from "@/components/core/CustomCursor";

export const metadata: Metadata = {
  title: "Education Centre | Beyond",
  description: "Jaipur's premier institution.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontPlayfair.variable} ${fontManrope.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        <CustomCursor />
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}