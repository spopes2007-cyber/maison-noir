"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import CartSidebar from "@/components/CartSidebar";
import WishlistSidebar from "@/components/WishlistSidebar";
import QuickView from "@/components/QuickView";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import { StoreProvider } from "@/context/StoreContext";

function AppContent() {
  return (
    <>
      <MouseGlow />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <HeroSection />

        {/* Scrolling brand strip */}
        <div
          style={{
            overflow: "hidden",
            borderTop: "1px solid var(--border-subtle)",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "14px 0",
            backgroundColor: "var(--bg-dark)",
          }}
          aria-hidden
        >
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 whitespace-nowrap"
            style={{ width: "max-content" }}
          >
            {Array(4).fill(null).flatMap((_, gi) =>
              ["INTELLIGENCE", "ELEGANCE", "POWER", "KONANE", "2025", "LUXURY STREETWEAR"].map((word) => (
                <span
                  key={`${gi}-${word}`}
                  className="font-display inline-block"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.35em",
                    color: word === "KONANE" ? "var(--crimson)" : "rgba(255,255,255,0.18)",
                    textTransform: "uppercase",
                  }}
                >
                  {word}
                </span>
              ))
            )}
          </motion.div>
        </div>

        <ProductsSection />

        {/* Features section */}
        <section
          style={{ backgroundColor: "var(--bg-dark)", padding: "80px 0", borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Premium Materials", desc: "Japanese fabrics, Italian hardware, obsessive quality control." },
                { title: "Limited Drops", desc: "Each collection is capped. Never mass-produced. Always rare." },
                { title: "Free Worldwide", desc: "Delivered in 48 hours. No thresholds. Zero compromises." },
                { title: "Elite Returns", desc: "30-day returns, no questions. Because you deserve flexibility." },
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  style={{
                    padding: "24px",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 4,
                    backgroundColor: "var(--bg-surface)",
                  }}
                >
                  <div className="w-8 h-px mb-4" style={{ backgroundColor: "var(--crimson)" }} />
                  <h3 className="font-display" style={{ fontSize: "13px", letterSpacing: "0.12em", color: "var(--white)", marginBottom: 8 }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--white-30)", lineHeight: 1.6 }}>
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>

      <Footer />

      {/* Overlays */}
      <CartSidebar />
      <WishlistSidebar />
      <QuickView />
    </>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <StoreProvider>
      <AnimatePresence mode="wait">
        {!loaded && <LoadingScreen key="loader" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && <AppContent />}
    </StoreProvider>
  );
}
