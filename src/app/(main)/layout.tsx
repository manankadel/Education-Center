// src/app/(main)/layout.tsx
"use client";
import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";

export default function MainLayout({ children }: { children: React.ReactNode; }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}