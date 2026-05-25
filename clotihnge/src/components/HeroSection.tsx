"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

function Particle({ index }: { index: number }) {
  const size = 2 + Math.random() * 3;
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 8;
  const delay = Math.random() * 6;
  const isRed = Math.random() > 0.6;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: 0,
        backgroundColor: isRed ? "var(--crimson)" : "rgba(255,255,255,0.6)",
        boxShadow: isRed ? "0 0 6px var(--crimson)" : "none",
      }}
      animate={{
        y: [0, -(300 + Math.random() * 400)],
        x: [0, (Math.random() - 0.5) * 100],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function KonaneAvatar() {
  return (
    <svg
      viewBox="0 0 400 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="KONANE character avatar"
    >
      <defs>
        <radialGradient id="auraGrad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#C41230" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#C41230" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#C41230" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#111111" />
        </radialGradient>
        <radialGradient id="faceGrad" cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#2D2D2D" />
          <stop offset="100%" stopColor="#181818" />
        </radialGradient>
        <filter id="glowFilter">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="eyeGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.8  0 0 0 0 0  0 0 0 0 0.1  0 0 0 1 0" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="coatGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C41230" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
      </defs>

      {/* Aura glow background */}
      <ellipse cx="200" cy="400" rx="180" ry="120" fill="url(#auraGrad)" opacity="0.6" />

      {/* Ground shadow */}
      <ellipse cx="200" cy="490" rx="100" ry="16" fill="#C41230" opacity="0.12" />

      {/* Long coat - body */}
      <path
        d="M100 280 C80 290 60 320 55 380 L50 500 H350 L345 380 C340 320 320 290 300 280"
        fill="url(#coatGrad)"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
      />

      {/* Coat lapels - crimson lining */}
      <path d="M200 280 L160 340 L140 500 L200 480 L260 500 L240 340 Z" fill="#111" />
      <path d="M200 280 L170 340 L155 420" stroke="url(#accentGrad)" strokeWidth="2" strokeLinecap="round" />
      <path d="M200 280 L230 340 L245 420" stroke="url(#accentGrad)" strokeWidth="2" strokeLinecap="round" />

      {/* Shirt collar / inner */}
      <path d="M180 280 L200 320 L220 280" fill="#0D0D0D" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />

      {/* Coat shoulders */}
      <path d="M100 280 C90 270 75 265 60 270 L55 290 C70 285 85 285 100 295 Z" fill="#191919" />
      <path d="M300 280 C310 270 325 265 340 270 L345 290 C330 285 315 285 300 295 Z" fill="#191919" />

      {/* Left arm */}
      <path
        d="M100 285 C75 295 60 310 55 340 L50 380 C65 375 75 360 85 340 L100 310 Z"
        fill="#161616"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth="1"
      />

      {/* Right arm */}
      <path
        d="M300 285 C325 295 340 310 345 340 L350 380 C335 375 325 360 315 340 L300 310 Z"
        fill="#161616"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth="1"
      />

      {/* Neck */}
      <rect x="185" y="215" width="30" height="70" rx="12" fill="url(#skinGrad)" />

      {/* Head */}
      <ellipse cx="200" cy="175" rx="68" ry="80" fill="url(#faceGrad)" />

      {/* Hair — sharp dark */}
      <path
        d="M135 155 C130 120 140 90 160 75 C175 63 195 58 210 60 C230 62 248 72 258 90 C268 108 268 130 265 155"
        fill="#0A0A0A"
      />
      <path
        d="M135 155 C132 130 135 105 148 88 C155 78 165 70 175 66"
        fill="#0A0A0A"
      />
      {/* Hair strands */}
      <path d="M145 120 C140 100 148 80 160 72" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      <path d="M152 115 C147 95 155 75 168 67" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

      {/* Eyebrows — sharp and angular */}
      <path d="M158 148 L180 142" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M220 142 L242 148" stroke="#0A0A0A" strokeWidth="3.5" strokeLinecap="round" />

      {/* Eyes — glowing crimson */}
      <ellipse cx="172" cy="162" rx="14" ry="9" fill="#0A0A0A" />
      <ellipse cx="228" cy="162" rx="14" ry="9" fill="#0A0A0A" />

      {/* Eye glow effect */}
      <ellipse cx="172" cy="162" rx="10" ry="6" fill="#C41230" opacity="0.15" className="animate-eye-glow" />
      <ellipse cx="228" cy="162" rx="10" ry="6" fill="#C41230" opacity="0.15" className="animate-eye-glow" />

      {/* Iris */}
      <ellipse cx="172" cy="162" rx="7" ry="6" fill="#8B0000" />
      <ellipse cx="228" cy="162" rx="7" ry="6" fill="#8B0000" />

      {/* Pupils */}
      <ellipse cx="172" cy="162" rx="4" ry="5" fill="#1A0000" />
      <ellipse cx="228" cy="162" rx="4" ry="5" fill="#1A0000" />

      {/* Eye glow rings */}
      <ellipse cx="172" cy="162" rx="9" ry="7" fill="none" stroke="#C41230" strokeWidth="1" opacity="0.6" filter="url(#eyeGlow)" />
      <ellipse cx="228" cy="162" rx="9" ry="7" fill="none" stroke="#C41230" strokeWidth="1" opacity="0.6" filter="url(#eyeGlow)" />

      {/* Eye reflections */}
      <ellipse cx="169" cy="159" rx="2" ry="2" fill="white" opacity="0.3" />
      <ellipse cx="225" cy="159" rx="2" ry="2" fill="white" opacity="0.3" />

      {/* Nose */}
      <path d="M196 175 C195 185 196 190 200 193 C204 190 205 185 204 175" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Lips */}
      <path d="M187 207 C193 203 207 203 213 207" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M188 207 C193 212 207 212 212 207" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Sharp cheekbones highlight */}
      <path d="M148 170 C152 175 156 178 162 178" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <path d="M252 170 C248 175 244 178 238 178" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Coat detail — chest buttons */}
      <circle cx="200" cy="330" r="3" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <circle cx="200" cy="355" r="3" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <circle cx="200" cy="380" r="3" fill="#0A0A0A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

      {/* KONANE subtle emblem on chest */}
      <text x="175" y="415" fontSize="9" fill="rgba(196,18,48,0.4)" fontFamily="serif" letterSpacing="4">KONANE</text>

      {/* Crimson aura ring */}
      <circle cx="200" cy="200" r="165" fill="none" stroke="#C41230" strokeWidth="0.5" opacity="0.12" />
      <circle cx="200" cy="200" r="155" fill="none" stroke="#C41230" strokeWidth="0.3" opacity="0.08" />
    </svg>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const [particles] = useState(() => Array.from({ length: 30 }, (_, i) => i));

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) / rect.width);
      mouseY.set((e.clientY - cy) / rect.height);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--bg-void)" }}
      aria-label="Hero"
    >
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((i) => <Particle key={i} index={i} />)}
      </div>

      {/* Radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(196,18,48,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Mouse follow glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(196,18,48,0.06) 0%, transparent 70%)",
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          top: "50%",
          left: "50%",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 lg:px-10 w-full gap-12 pt-20 pb-10">
        {/* Left: Text */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex items-center gap-3 justify-center lg:justify-start"
          >
            <div className="w-8 h-px" style={{ backgroundColor: "var(--crimson)" }} />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.35em",
                color: "var(--crimson)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              2025 Collection
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "0.06em" }}
          >
            <span style={{ color: "var(--white)" }}>BORN FROM</span>
            <br />
            <span className="glow-red" style={{ color: "var(--crimson-bright)" }}>DARKNESS</span>
            <br />
            <span style={{ color: "var(--white-60)" }}>DRESSED IN</span>
            <br />
            <span style={{ color: "var(--white)" }}>POWER</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            style={{
              maxWidth: 380,
              color: "var(--white-60)",
              lineHeight: 1.7,
              fontSize: "15px",
              margin: "0 auto",
            }}
            className="lg:mx-0"
          >
            Luxury streetwear for those who move in silence.
            <br />
            Every piece is a statement of intelligence and elegance.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.a
              href="#collection"
              className="btn-primary flex items-center justify-center gap-2"
              style={{
                padding: "14px 32px",
                borderRadius: 2,
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Collection
            </motion.a>
            <motion.a
              href="#"
              className="btn-ghost flex items-center justify-center"
              style={{
                padding: "14px 32px",
                borderRadius: 2,
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 500,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Lookbook
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex gap-8 justify-center lg:justify-start pt-4"
          >
            {[
              { val: "12K+", label: "Members" },
              { val: "200+", label: "Products" },
              { val: "48H", label: "Delivery" },
            ].map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center lg:items-start">
                <span className="font-display" style={{ fontSize: "22px", color: "var(--white)", letterSpacing: "0.05em" }}>
                  {val}
                </span>
                <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--white-30)", textTransform: "uppercase" }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Avatar */}
        <motion.div
          className="relative flex-shrink-0 flex items-center justify-center animate-float"
          style={{ width: "min(420px, 90vw)", height: "min(560px, 110vw)" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Outer glow rings */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "110%",
              height: "110%",
              border: "1px solid rgba(196,18,48,0.15)",
              top: "-5%",
              left: "-5%",
            }}
            animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full animate-spin-slow"
            style={{
              width: "120%",
              height: "120%",
              border: "1px dashed rgba(196,18,48,0.1)",
              top: "-10%",
              left: "-10%",
            }}
          />

          {/* Avatar SVG */}
          <div className="relative w-full h-full">
            <KonaneAvatar />
          </div>

          {/* Red aura glow beneath */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none animate-pulse-glow"
            style={{
              width: "70%",
              height: "40%",
              background: "radial-gradient(ellipse, rgba(196,18,48,0.3) 0%, transparent 70%)",
              filter: "blur(30px)",
              bottom: "-20px",
            }}
          />

          {/* Floating badge */}
          <motion.div
            className="absolute"
            style={{ top: "8%", right: "-8%" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div
              style={{
                padding: "8px 14px",
                backgroundColor: "rgba(196,18,48,0.15)",
                border: "1px solid rgba(196,18,48,0.4)",
                borderRadius: 2,
                backdropFilter: "blur(12px)",
              }}
            >
              <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--crimson-bright)", fontWeight: 600, textTransform: "uppercase" }}>
                New Drop
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.25em", color: "var(--white-30)", textTransform: "uppercase" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--crimson)" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
