import type { Metadata } from "next";
import "./globals.css";
import { fontInter, fontSyne } from "./fonts";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroller } from "@/components/core/SmoothScroller";

export const metadata: Metadata = {
  title: "Education Centre Jaipur | Coaching, Consultancy, Training, Placements",
  description:
    "With over 10 years of experience, Education Centre in Jaipur offers quality education, industry-ready training, and career consultancy to help students think beyond and achieve excellence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontInter.variable} ${fontSyne.variable}`}>
      <body className="bg-background text-foreground">
        <SmoothScroller>{children}</SmoothScroller>
        <Analytics />
      </body>
    </html>
  );
}