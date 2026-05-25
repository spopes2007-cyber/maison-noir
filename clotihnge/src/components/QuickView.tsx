"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function QuickView() {
  const { quickViewProduct, dispatch, isInWishlist } = useStore();
  const product = quickViewProduct;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const effectiveSize = selectedSize || product.sizes[1] || product.sizes[0];

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", product, size: effectiveSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleClose = () => {
    dispatch({ type: "SET_QUICK_VIEW", product: null });
    setSelectedSize(null);
    setAdded(false);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="qv-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-80"
            style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={handleClose}
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            key="qv-modal"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-90 flex items-center justify-center p-4"
            aria-modal
            role="dialog"
            aria-labelledby="qv-title"
          >
            <div
              className="relative flex flex-col md:flex-row max-h-[90vh] w-full overflow-hidden"
              style={{
                maxWidth: 880,
                backgroundColor: "var(--bg-charcoal)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 6,
                boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(196,18,48,0.1)",
              }}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full cursor-pointer"
                style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "var(--white-60)", border: "1px solid var(--border-subtle)", transition: "color 200ms" }}
                aria-label="Close"
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--white)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--white-60)")}
              >
                <X size={16} />
              </button>

              {/* Image */}
              <div
                className="flex-shrink-0 md:w-2/5 relative overflow-hidden"
                style={{
                  minHeight: 300,
                  backgroundColor: "var(--bg-surface)",
                  borderRight: "1px solid var(--border-subtle)",
                }}
              >
                <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <radialGradient id="qvGrad" cx="50%" cy="40%" r="60%">
                      <stop offset="0%" stopColor={product.accentColor} stopOpacity="0.2" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                    <linearGradient id="qvCloth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#252525" />
                      <stop offset="100%" stopColor="#0F0F0F" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#qvGrad)" />

                  {/* Category shape */}
                  {product.category === "Hoodies" && (
                    <path d="M130 100 L90 125 L75 175 L108 180 L108 400 H292 L292 180 L325 175 L310 125 L270 100 C270 100 256 140 200 140 C144 140 130 100 130 100Z" fill="url(#qvCloth)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                  )}
                  {product.category === "Jackets" && (
                    <path d="M120 95 L70 125 L55 195 L90 198 L90 415 H310 L310 198 L345 195 L330 125 L280 95 C280 95 265 138 200 138 C135 138 120 95 120 95Z" fill="url(#qvCloth)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                  )}
                  {product.category === "T-Shirts" && (
                    <path d="M140 110 L100 135 L88 175 L118 178 L118 400 H282 L282 178 L312 175 L300 135 L260 110 C260 110 246 142 200 142 C154 142 140 110 140 110Z" fill="url(#qvCloth)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                  )}
                  {product.category === "Pants" && (
                    <path d="M130 80 H270 L290 270 L255 270 L235 460 H195 L190 290 L185 460 H145 L125 270 L110 270 Z" fill="url(#qvCloth)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                  )}
                  {product.category === "Sneakers" && (
                    <>
                      <ellipse cx="200" cy="350" rx="145" ry="46" fill="url(#qvCloth)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                      <path d="M70 350 C70 318 92 275 120 262 L160 255 C180 248 200 243 225 243 L295 252 L322 265 C348 278 340 318 335 350" fill="url(#qvCloth)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                    </>
                  )}
                  {product.category === "Accessories" && (
                    <g>
                      <path d="M105 270 C105 210 145 170 200 170 C255 170 295 210 295 270 L315 285 H280 L280 300 H120 L120 285 H85 Z" fill="url(#qvCloth)" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                      <text x="200" y="225" textAnchor="middle" fontSize="18" fill={product.accentColor} opacity="0.4" fontFamily="serif" letterSpacing="2">K</text>
                    </g>
                  )}

                  {/* KONANE label */}
                  <text x="200" y="470" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.06)" fontFamily="serif" letterSpacing="8">KONANE</text>
                </svg>

                {/* Glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${product.accentColor}18 0%, transparent 70%)`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto" style={{ padding: "32px 28px" }}>
                {/* Category + badges */}
                <div className="flex items-center gap-3 mb-3">
                  <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--crimson)", textTransform: "uppercase", fontWeight: 600 }}>
                    {product.category}
                  </span>
                  {product.badge && (
                    <span style={{ padding: "2px 8px", backgroundColor: "var(--crimson)", borderRadius: 1, fontSize: "9px", fontWeight: 700, color: "white", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      {product.badge}
                    </span>
                  )}
                  {product.isNew && !product.badge && (
                    <span style={{ padding: "2px 8px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 1, fontSize: "9px", fontWeight: 600, color: "var(--white-60)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                      New
                    </span>
                  )}
                </div>

                {/* Name */}
                <h2 id="qv-title" className="font-display" style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "var(--white)", letterSpacing: "0.08em", lineHeight: 1.1, marginBottom: 12 }}>
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span style={{ fontSize: "22px", color: "var(--white)", fontWeight: 700 }}>${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span style={{ fontSize: "16px", color: "var(--white-30)", textDecoration: "line-through" }}>${product.originalPrice}</span>
                      <span style={{ fontSize: "12px", color: "var(--crimson)", fontWeight: 600 }}>
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                <div className="divider-glow mb-6" />

                {/* Description */}
                <p style={{ color: "var(--white-60)", fontSize: "14px", lineHeight: 1.7, marginBottom: 24 }}>
                  {product.description}
                </p>

                {/* Colors */}
                <div className="mb-6">
                  <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--white-30)", textTransform: "uppercase", marginBottom: 10 }}>
                    Colors
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color, i) => (
                      <div
                        key={i}
                        className="rounded-full cursor-pointer"
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: color,
                          border: `2px solid ${i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}`,
                          boxShadow: i === 0 ? "0 0 0 3px rgba(255,255,255,0.1)" : "none",
                        }}
                        aria-label={`Color ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "var(--white-30)", textTransform: "uppercase" }}>
                      Size
                    </p>
                    {!selectedSize && (
                      <p style={{ fontSize: "11px", color: "var(--crimson)", letterSpacing: "0.05em" }}>
                        Select a size
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="cursor-pointer"
                        style={{
                          padding: "8px 14px",
                          fontSize: "12px",
                          letterSpacing: "0.1em",
                          border: `1px solid ${selectedSize === size ? "var(--crimson)" : "var(--border-subtle)"}`,
                          backgroundColor: selectedSize === size ? "rgba(196,18,48,0.15)" : "transparent",
                          color: selectedSize === size ? "var(--crimson-bright)" : "var(--white-60)",
                          borderRadius: 2,
                          transition: "all 150ms ease",
                          minWidth: 44,
                          minHeight: 44,
                        }}
                        aria-pressed={selectedSize === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
                    style={{
                      padding: "15px 24px",
                      backgroundColor: added ? "#166534" : "var(--crimson)",
                      color: "white",
                      border: "none",
                      borderRadius: 2,
                      fontSize: "12px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      transition: "background-color 300ms ease",
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Add to cart"
                  >
                    {added ? (
                      <>
                        <Check size={14} />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        Add to Bag
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => dispatch({ type: "TOGGLE_WISHLIST", product })}
                    className="flex items-center justify-center cursor-pointer"
                    style={{
                      width: 50,
                      height: 50,
                      border: `1px solid ${inWishlist ? "var(--crimson)" : "var(--border-subtle)"}`,
                      backgroundColor: inWishlist ? "rgba(196,18,48,0.15)" : "transparent",
                      borderRadius: 2,
                      color: inWishlist ? "var(--crimson)" : "var(--white-60)",
                      transition: "all 200ms ease",
                      flexShrink: 0,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={inWishlist}
                  >
                    <Heart size={16} fill={inWishlist ? "var(--crimson)" : "none"} />
                  </motion.button>
                </div>

                {/* Trust badges */}
                <div className="flex gap-6 mt-6">
                  {["Free Returns", "48H Delivery", "Secure Pay"].map((badge) => (
                    <div key={badge} className="flex flex-col items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--crimson)" }} />
                      <span style={{ fontSize: "10px", color: "var(--white-30)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
