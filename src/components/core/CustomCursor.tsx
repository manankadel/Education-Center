"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const cursor = cursorRef.current;
    
    // Quick, snappy follow
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.15, 
        ease: "power2.out" 
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  },[]);

  return (
    <div
      ref={cursorRef}
      className="hidden lg:block fixed top-0 left-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
};