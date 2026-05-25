"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Menu, X, Search } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { CATEGORIES } from "@/lib/products";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlistCount, dispatch } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Collection", "New Arrivals", "About", "Contact"];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "background-color 400ms ease, backdrop-filter 400ms ease, border-color 400ms ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="56" height="56" rx="4" fill="rgba(196,18,48,0.15)" />
                <rect x="0.5" y="0.5" width="55" height="55" rx="3.5" stroke="#C41230" strokeOpacity="0.7" />
                <path d="M16 12V44M16 28L32 12M16 28L34 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span
                className="font-display"
                style={{ fontSize: "18px", letterSpacing: "0.25em", color: "var(--white)", fontWeight: 700 }}
              >
                KONANE
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href="#"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="relative group"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.18em",
                  color: "var(--white-60)",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  transition: "color 200ms ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-60)")}
              >
                {link}
                <span
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: "var(--crimson)" }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
              style={{
                color: "var(--white-60)",
                transition: "color 200ms ease, background-color 200ms ease",
              }}
              aria-label="Search"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--white-60)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <Search size={18} />
            </motion.button>

            {/* Wishlist */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              onClick={() => dispatch({ type: "TOGGLE_WISHLIST_PANEL" })}
              className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
              style={{ color: "var(--white-60)", transition: "color 200ms ease, background-color 200ms ease" }}
              aria-label={`Wishlist (${wishlistCount} items)`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--crimson-bright)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(196,18,48,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--white-60)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <Heart size={18} fill={wishlistCount > 0 ? "var(--crimson)" : "none"} color={wishlistCount > 0 ? "var(--crimson)" : undefined} />
              <AnimatePresence>
                {wishlistCount > 0 && (
                  <motion.span
                    key="w-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-white"
                    style={{ width: 16, height: 16, fontSize: 9, fontWeight: 700, backgroundColor: "var(--crimson)" }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Cart */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
              style={{ color: "var(--white-60)", transition: "color 200ms ease, background-color 200ms ease" }}
              aria-label={`Cart (${cartCount} items)`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--white-60)";
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="c-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full text-white"
                    style={{ width: 16, height: 16, fontSize: 9, fontWeight: 700, backgroundColor: "var(--crimson)" }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
              style={{ color: "var(--white-60)", transition: "color 200ms ease" }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col lg:hidden"
            style={{
              backgroundColor: "rgba(5,5,5,0.98)",
              backdropFilter: "blur(24px)",
              paddingTop: "80px",
            }}
          >
            <nav className="flex flex-col items-center justify-center flex-1 gap-6" aria-label="Mobile navigation">
              {[...navLinks].map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display"
                  style={{
                    fontSize: "28px",
                    letterSpacing: "0.2em",
                    color: "var(--white-60)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    transition: "color 200ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white-60)")}
                >
                  {link}
                </motion.a>
              ))}
              <div className="divider-glow w-48 my-2" />
              {CATEGORIES.map((cat, i) => (
                <motion.a
                  key={cat}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.2em",
                    color: "var(--white-30)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  {cat}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
