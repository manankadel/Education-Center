"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only init cursor on desktop
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  },[]);

  return (
    <div className="hidden md:block">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-accent/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 backdrop-invert-[0.1]"
      />
    </div>
  );
};