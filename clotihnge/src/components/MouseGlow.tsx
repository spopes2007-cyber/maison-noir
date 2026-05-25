"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
      glowRef.current.style.opacity = "1";
    };
    const leave = () => {
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.body.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 0,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(196,18,48,0.05) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        opacity: 0,
        transition: "opacity 0.3s ease",
        top: 0,
        left: 0,
      }}
    />
  );
}
