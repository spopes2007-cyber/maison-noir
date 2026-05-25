"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"logo" | "tagline" | "exit">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tagline"), 1800);
    const t2 = setTimeout(() => setPhase("exit"), 3400);
    const t3 = setTimeout(() => onComplete(), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "var(--bg-void)" }}
        >
          {/* Background radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,18,48,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Rotating ring */}
          <motion.div
            className="absolute"
            style={{ width: 280, height: 280 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="140" cy="140" r="136"
                stroke="url(#ringGrad)"
                strokeWidth="1"
                strokeDasharray="12 8"
                opacity="0.4"
              />
              <defs>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="280" y2="280">
                  <stop offset="0%" stopColor="#C41230" />
                  <stop offset="50%" stopColor="transparent" />
                  <stop offset="100%" stopColor="#C41230" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Static outer ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 320,
              height: 320,
              border: "1px solid rgba(196,18,48,0.15)",
            }}
          />

          {/* KONANE Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* K logo mark */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="4" fill="rgba(196,18,48,0.1)" />
                <rect x="0.5" y="0.5" width="55" height="55" rx="3.5" stroke="#C41230" strokeOpacity="0.6" />
                <path d="M16 12V44M16 28L32 12M16 28L34 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 28L32 12M16 28L34 44" stroke="#C41230" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
              </svg>
              {/* Glow behind icon */}
              <div
                className="absolute inset-0 rounded"
                style={{
                  background: "radial-gradient(circle, rgba(196,18,48,0.3) 0%, transparent 70%)",
                  filter: "blur(12px)",
                  transform: "scale(1.5)",
                }}
              />
            </motion.div>

            {/* KONANE text with glitch */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h1
                className="konane-logo"
                style={{ fontSize: "clamp(36px, 8vw, 64px)", letterSpacing: "0.3em", lineHeight: 1 }}
              >
                KONANE
              </h1>
              {/* Glitch layers */}
              <h1
                aria-hidden
                className="absolute inset-0 font-display"
                style={{
                  fontSize: "clamp(36px, 8vw, 64px)",
                  letterSpacing: "0.3em",
                  lineHeight: 1,
                  color: "#C41230",
                  opacity: 0.3,
                  clipPath: "inset(40% 0 40% 0)",
                  transform: "translate(-2px, 0)",
                  animation: "glitch-slide 6s ease-in-out infinite",
                }}
              >
                KONANE
              </h1>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="relative mt-2"
              style={{ width: 200, height: 1, backgroundColor: "rgba(255,255,255,0.1)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ backgroundColor: "var(--crimson)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 2.2, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-y-0 right-0"
                style={{
                  width: 6,
                  backgroundColor: "var(--crimson-bright)",
                  boxShadow: "0 0 8px var(--crimson)",
                }}
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ delay: 1, duration: 2.2, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Tagline */}
            <AnimatePresence>
              {phase === "tagline" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    letterSpacing: "0.35em",
                    color: "var(--white-30)",
                    textTransform: "uppercase",
                  }}
                >
                  Intelligence. Elegance. Power.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Corner accents */}
          {[
            { top: 24, left: 24, rotate: 0 },
            { top: 24, right: 24, rotate: 90 },
            { bottom: 24, right: 24, rotate: 180 },
            { bottom: 24, left: 24, rotate: 270 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ ...pos, width: 24, height: 24 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
                <path d="M0 12V0H12" stroke="#C41230" strokeWidth="1.5" strokeOpacity="0.6" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
