/* src/app/layout.tsx */
import type { Metadata } from "next";
import "./globals.css";
import { fontInter, fontSyne } from "./fonts";
import { SmoothScroller } from "@/components/core/SmoothScroller";
import { CustomCursor } from "@/components/core/CustomCursor";

export const metadata: Metadata = {
  title: "Education Centre | Beyond Ordinary Coaching",
  description: "Jaipur's premier institute for industry-ready professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontInter.variable} ${fontSyne.variable}`}>
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-black">
        <CustomCursor />
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}