import type { Metadata } from "next";
import "./globals.css";
import { fontInter, fontSyne } from "./fonts";
import { SmoothScroller } from "@/components/core/SmoothScroller";
import { CustomCursor } from "@/components/core/CustomCursor";

export const metadata: Metadata = {
  title: "Education Centre Jaipur | Thinks Beyond",
  description: "Since 2008. Coaching, Consultancy, Training, and Placements in Jaipur.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontInter.variable} ${fontSyne.variable} scroll-smooth`}>
      <body className="bg-background text-foreground selection:bg-accent selection:text-white">
        <CustomCursor />
        <SmoothScroller>
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}