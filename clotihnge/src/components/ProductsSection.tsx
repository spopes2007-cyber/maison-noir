"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PRODUCTS, CATEGORIES, Category } from "@/lib/products";
import ProductCard from "./ProductCard";

const ALL = "All" as const;
type Filter = typeof ALL | Category;

export default function ProductsSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filters: Filter[] = [ALL, ...CATEGORIES];
  const filtered = activeFilter === ALL
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  return (
    <section
      ref={ref}
      id="collection"
      className="relative"
      style={{ backgroundColor: "var(--bg-void)", padding: "80px 0 120px" }}
      aria-labelledby="collection-heading"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 40% at 50% 0%, rgba(196,18,48,0.04) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="divider-glow flex-1 max-w-24" />
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.35em",
                color: "var(--crimson)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              The Collection
            </span>
            <div className="divider-glow flex-1 max-w-24" />
          </div>
          <h2
            id="collection-heading"
            className="font-display"
            style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "var(--white)", letterSpacing: "0.08em", lineHeight: 1.1 }}
          >
            CRAFTED FOR THE ELITE
          </h2>
          <p style={{ color: "var(--white-30)", marginTop: 12, fontSize: "14px", letterSpacing: "0.05em" }}>
            Each piece is a weapon of style. Choose yours.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          role="tablist"
          aria-label="Filter by category"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              role="tab"
              aria-selected={activeFilter === filter}
              className="relative cursor-pointer"
              style={{
                padding: "8px 20px",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 500,
                borderRadius: 2,
                border: `1px solid ${activeFilter === filter ? "var(--crimson)" : "var(--border-subtle)"}`,
                backgroundColor: activeFilter === filter ? "rgba(196,18,48,0.12)" : "transparent",
                color: activeFilter === filter ? "var(--crimson-bright)" : "var(--white-30)",
                transition: "all 200ms ease",
              }}
            >
              {filter}
              {activeFilter === filter && (
                <motion.span
                  layoutId="filter-indicator"
                  className="absolute inset-0 rounded"
                  style={{ backgroundColor: "rgba(196,18,48,0.08)", zIndex: -1 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Product count */}
        <motion.p
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
          style={{ fontSize: "12px", color: "var(--white-30)", letterSpacing: "0.1em" }}
        >
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} available
        </motion.p>

        {/* Product grid */}
        <motion.div
          key={activeFilter}
          className="grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {/* Load more */}
        <div className="flex justify-center mt-16">
          <motion.button
            className="btn-ghost"
            style={{
              padding: "14px 48px",
              borderRadius: 2,
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label="View all products"
          >
            View Full Collection
          </motion.button>
        </div>
      </div>
    </section>
  );
}
