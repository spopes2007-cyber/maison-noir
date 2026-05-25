"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/lib/products";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function ProductVisual({ product }: { product: Product }) {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{ background: `linear-gradient(145deg, var(--bg-surface), var(--bg-charcoal))` }}
    >
      {/* Abstract clothing silhouette based on category */}
      <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id={`vg-${product.id}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={product.accentColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id={`cg-${product.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#111111" />
          </linearGradient>
        </defs>

        {/* Background glow */}
        <rect width="300" height="360" fill={`url(#vg-${product.id})`} />

        {product.category === "Hoodies" && (
          <g>
            <path d="M100 80 L70 100 L55 140 L80 145 L80 300 H220 L220 145 L245 140 L230 100 L200 80 C200 80 190 110 150 110 C110 110 100 80 100 80Z" fill={`url(#cg-${product.id})`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M150 80 L150 110 M130 110 C130 110 140 120 150 120 C160 120 170 110 170 110" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M80 300 H220" stroke={product.accentColor} strokeWidth="1" opacity="0.3" />
          </g>
        )}

        {product.category === "T-Shirts" && (
          <g>
            <path d="M110 90 L75 110 L65 145 L90 148 L90 300 H210 L210 148 L235 145 L225 110 L190 90 C190 90 180 105 150 105 C120 105 110 90 110 90Z" fill={`url(#cg-${product.id})`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M135 185 L165 185" stroke={product.accentColor} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
          </g>
        )}

        {product.category === "Pants" && (
          <g>
            <path d="M100 60 H200 L215 200 L190 200 L175 340 H145 L140 220 L135 340 H105 L90 200 L65 200 Z" fill={`url(#cg-${product.id})`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M100 60 H200" stroke={product.accentColor} strokeWidth="1.5" opacity="0.4" />
            <path d="M140 180 L142 340" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </g>
        )}

        {product.category === "Jackets" && (
          <g>
            <path d="M90 75 L50 100 L40 155 L70 158 L70 310 H230 L230 158 L260 155 L250 100 L210 75 C210 75 195 105 150 105 C105 105 90 75 90 75Z" fill={`url(#cg-${product.id})`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M150 105 L150 310" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <path d="M90 120 L90 160 M210 120 L210 160" stroke={product.accentColor} strokeWidth="1" opacity="0.3" />
          </g>
        )}

        {product.category === "Sneakers" && (
          <g>
            <ellipse cx="150" cy="260" rx="110" ry="35" fill={`url(#cg-${product.id})`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M55 260 C55 240 70 210 90 200 L120 195 C130 190 150 185 170 185 L220 190 L240 200 C255 210 255 240 255 260" fill={`url(#cg-${product.id})`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M80 220 L200 215" stroke={product.accentColor} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
            <path d="M90 235 L200 230" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeLinecap="round" />
          </g>
        )}

        {product.category === "Accessories" && (
          <g>
            {/* Cap */}
            <path d="M80 200 C80 160 110 130 150 130 C190 130 220 160 220 200 L230 210 H210 L210 220 H90 L90 210 H70 Z" fill={`url(#cg-${product.id})`} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <path d="M90 200 H210" stroke={product.accentColor} strokeWidth="1" opacity="0.4" />
            <text x="150" y="170" textAnchor="middle" fontSize="14" fill={product.accentColor} opacity="0.4" fontFamily="serif" letterSpacing="2">K</text>
          </g>
        )}

        {/* KONANE watermark */}
        <text
          x="150" y="340"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(255,255,255,0.06)"
          fontFamily="serif"
          letterSpacing="6"
        >
          KONANE
        </text>
      </svg>

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer" />
    </div>
  );
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [hovering, setHovering] = useState(false);
  const { dispatch, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", product, size: selectedSize });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_WISHLIST", product });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "SET_QUICK_VIEW", product });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group card-hover relative flex flex-col cursor-pointer"
      style={{
        backgroundColor: "var(--bg-charcoal)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 4,
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleQuickView}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && dispatch({ type: "SET_QUICK_VIEW", product })}
      aria-label={`View ${product.name}`}
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <ProductVisual product={product} />

        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 z-10"
            style={{
              padding: "4px 10px",
              backgroundColor: "var(--crimson)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              color: "white",
              borderRadius: 1,
              textTransform: "uppercase",
            }}
          >
            {product.badge}
          </div>
        )}

        {product.isNew && !product.badge && (
          <div
            className="absolute top-3 left-3 z-10"
            style={{
              padding: "4px 10px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              color: "var(--white-90)",
              borderRadius: 1,
              textTransform: "uppercase",
            }}
          >
            New
          </div>
        )}

        {/* Action buttons */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col gap-2 z-10"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: hovering ? 1 : 0, x: hovering ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={handleToggleWishlist}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: 36,
              height: 36,
              backgroundColor: inWishlist ? "var(--crimson)" : "rgba(0,0,0,0.6)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${inWishlist ? "var(--crimson)" : "rgba(255,255,255,0.1)"}`,
              color: "white",
              transition: "all 200ms ease",
            }}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={14} fill={inWishlist ? "white" : "none"} />
          </button>

          <button
            onClick={handleQuickView}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{
              width: 36,
              height: 36,
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              transition: "all 200ms ease",
            }}
            aria-label="Quick view"
          >
            <Eye size={14} />
          </button>
        </motion.div>

        {/* Quick add overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-10"
          initial={{ y: 60 }}
          animate={{ y: hovering ? 0 : 60 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 cursor-pointer"
            style={{
              padding: "14px",
              backgroundColor: "var(--crimson)",
              color: "white",
              fontSize: "11px",
              letterSpacing: "0.2em",
              fontWeight: 600,
              textTransform: "uppercase",
              border: "none",
              transition: "background-color 200ms ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--crimson-bright)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--crimson)")}
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between">
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "var(--white-30)",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {product.category}
            </p>
            <h3 style={{ fontSize: "14px", color: "var(--white-90)", fontWeight: 500, lineHeight: 1.3 }}>
              {product.name}
            </h3>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p style={{ fontSize: "15px", color: "var(--white)", fontWeight: 600, fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}>
              ${product.price}
            </p>
            {product.originalPrice && (
              <p style={{ fontSize: "12px", color: "var(--white-30)", textDecoration: "line-through" }}>
                ${product.originalPrice}
              </p>
            )}
          </div>
        </div>

        {/* Size selector */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Select size">
          {product.sizes.slice(0, 5).map((size) => (
            <button
              key={size}
              onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
              className="cursor-pointer"
              style={{
                padding: "3px 8px",
                fontSize: "10px",
                letterSpacing: "0.1em",
                border: `1px solid ${selectedSize === size ? "var(--crimson)" : "var(--border-subtle)"}`,
                backgroundColor: selectedSize === size ? "rgba(196,18,48,0.15)" : "transparent",
                color: selectedSize === size ? "var(--crimson-bright)" : "var(--white-30)",
                borderRadius: 1,
                transition: "all 150ms ease",
              }}
              aria-pressed={selectedSize === size}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Color swatches */}
        <div className="flex gap-2 items-center">
          {product.colors.map((color, i) => (
            <div
              key={i}
              className="rounded-full cursor-pointer"
              style={{
                width: 12,
                height: 12,
                backgroundColor: color,
                border: `1px solid rgba(255,255,255,${i === 0 ? 0.3 : 0.1})`,
                boxShadow: i === 0 ? `0 0 0 2px rgba(255,255,255,0.15)` : "none",
                transition: "transform 150ms ease",
              }}
              aria-label={`Color option ${i + 1}`}
              role="radio"
              aria-checked={i === 0}
            />
          ))}
        </div>
      </div>
    </motion.article>
  );
}
