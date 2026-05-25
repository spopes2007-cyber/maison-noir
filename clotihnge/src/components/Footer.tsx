"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Share2, MessageCircle, Play } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      style={{ backgroundColor: "var(--bg-dark)", borderTop: "1px solid var(--border-subtle)", paddingTop: 80 }}
    >
      {/* Pre-footer CTA band */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(196,18,48,0.08) 0%, rgba(196,18,48,0.12) 50%, rgba(196,18,48,0.08) 100%)",
          borderTop: "1px solid rgba(196,18,48,0.2)",
          borderBottom: "1px solid rgba(196,18,48,0.2)",
          padding: "40px 24px",
          marginBottom: 64,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-display" style={{ fontSize: "clamp(22px, 3vw, 36px)", color: "var(--white)", letterSpacing: "0.1em", marginBottom: 12 }}>
            JOIN THE KONANE CIRCLE
          </h3>
          <p style={{ fontSize: "13px", color: "var(--white-30)", marginBottom: 24, letterSpacing: "0.05em" }}>
            Early access. Exclusive drops. Zero noise.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email address"
              style={{
                flex: 1,
                padding: "12px 16px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 2,
                color: "var(--white)",
                fontSize: "13px",
                outline: "none",
                transition: "border-color 200ms",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(196,18,48,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: "12px 24px",
                borderRadius: 2,
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Join Now
            </button>
          </form>
        </motion.div>
      </div>

      {/* Main footer links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="grid gap-12"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand */}
          <div className="col-span-full sm:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <svg width="28" height="28" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="4" fill="rgba(196,18,48,0.15)" />
                <rect x="0.5" y="0.5" width="55" height="55" rx="3.5" stroke="#C41230" strokeOpacity="0.7" />
                <path d="M16 12V44M16 28L32 12M16 28L34 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-display" style={{ fontSize: "18px", letterSpacing: "0.25em", color: "var(--white)", fontWeight: 700 }}>
                KONANE
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--white-30)", lineHeight: 1.7, maxWidth: 220 }}>
              Born from darkness. Dressed in power. Elite men&apos;s streetwear for those who move in silence.
            </p>
            <div className="flex gap-4 mt-5">
              {[
                { icon: Share2, label: "Instagram" },
                { icon: MessageCircle, label: "Twitter/X" },
                { icon: Play, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded"
                  style={{
                    border: "1px solid var(--border-subtle)",
                    color: "var(--white-30)",
                    transition: "color 200ms, border-color 200ms, background-color 200ms",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--white)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(196,18,48,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(196,18,48,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--white-30)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-subtle)";
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.25em", color: "var(--white)", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a
                    href="#"
                    style={{ fontSize: "13px", color: "var(--white-30)", textDecoration: "none", transition: "color 200ms" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-30)")}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.25em", color: "var(--white)", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
              Info
            </h4>
            <ul className="flex flex-col gap-3">
              {["About KONANE", "Our Story", "Sizing Guide", "Sustainability", "Careers"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ fontSize: "13px", color: "var(--white-30)", textDecoration: "none", transition: "color 200ms" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-30)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: "11px", letterSpacing: "0.25em", color: "var(--white)", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              {["Contact Us", "Returns & Exchanges", "Shipping Policy", "Privacy Policy", "Terms of Service"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ fontSize: "13px", color: "var(--white-30)", textDecoration: "none", transition: "color 200ms" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-30)")}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pb-8"
          style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 24 }}
        >
          <p style={{ fontSize: "12px", color: "var(--white-30)", letterSpacing: "0.05em" }}>
            © 2025 KONANE. All rights reserved.
          </p>
          <div className="flex gap-2 items-center">
            {["VISA", "MC", "AMEX", "PAYPAL"].map((method) => (
              <div
                key={method}
                style={{
                  padding: "3px 8px",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 2,
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: "var(--white-30)",
                  fontWeight: 600,
                }}
              >
                {method}
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "var(--white-10)", letterSpacing: "0.05em" }}>
            Intelligence. Elegance. Power.
          </p>
        </div>
      </div>
    </footer>
  );
}
