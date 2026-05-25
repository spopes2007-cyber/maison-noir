"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function WishlistSidebar() {
  const { wishlist, wishlistOpen, dispatch } = useStore();

  return (
    <>
      <AnimatePresence>
        {wishlistOpen && (
          <motion.div
            key="wishlist-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => dispatch({ type: "TOGGLE_WISHLIST_PANEL" })}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wishlistOpen && (
          <motion.aside
            key="wishlist-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-70 flex flex-col"
            style={{
              width: "min(420px, 100vw)",
              backgroundColor: "var(--bg-charcoal)",
              borderLeft: "1px solid var(--border-subtle)",
            }}
            aria-label="Wishlist"
            role="dialog"
            aria-modal
          >
            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-center gap-3">
                <Heart size={18} style={{ color: "var(--crimson)" }} fill="var(--crimson)" />
                <h2 className="font-display" style={{ fontSize: "16px", letterSpacing: "0.15em", color: "var(--white)" }}>
                  WISHLIST
                </h2>
                {wishlist.length > 0 && (
                  <span
                    style={{
                      padding: "2px 8px",
                      backgroundColor: "rgba(196,18,48,0.2)",
                      border: "1px solid var(--crimson)",
                      borderRadius: 2,
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--crimson-bright)",
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: "TOGGLE_WISHLIST_PANEL" })}
                className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer"
                style={{ color: "var(--white-60)", transition: "color 200ms, background-color 200ms" }}
                aria-label="Close wishlist"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--white)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--white-60)";
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto" style={{ padding: "16px 24px" }}>
              {wishlist.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4"
                >
                  <Heart size={48} style={{ color: "var(--white-10)" }} />
                  <p style={{ color: "var(--white-30)", fontSize: "14px", letterSpacing: "0.05em" }}>No saved items yet</p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlist.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 items-center"
                      style={{
                        padding: "14px",
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: 4,
                      }}
                    >
                      {/* Mini visual */}
                      <div
                        className="flex-shrink-0 rounded"
                        style={{
                          width: 60,
                          height: 76,
                          backgroundColor: "var(--bg-elevated)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <span style={{ fontSize: "20px", color: "rgba(196,18,48,0.3)", fontFamily: "serif" }}>
                          {product.category.slice(0, 1)}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: "10px", color: "var(--crimson)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>
                          {product.category}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--white-90)", fontWeight: 500, marginBottom: 4 }}>
                          {product.name}
                        </p>
                        <p style={{ fontSize: "14px", color: "var(--white)", fontWeight: 600 }}>
                          ${product.price}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => dispatch({ type: "ADD_TO_CART", product, size: product.sizes[1] || product.sizes[0] })}
                          className="flex items-center justify-center w-8 h-8 rounded cursor-pointer"
                          style={{
                            backgroundColor: "var(--crimson)",
                            color: "white",
                            border: "none",
                            transition: "background-color 150ms",
                          }}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingBag size={13} />
                        </button>
                        <button
                          onClick={() => dispatch({ type: "TOGGLE_WISHLIST", product })}
                          className="flex items-center justify-center w-8 h-8 rounded cursor-pointer"
                          style={{
                            backgroundColor: "transparent",
                            color: "var(--white-30)",
                            border: "1px solid var(--border-subtle)",
                            transition: "color 150ms, border-color 150ms",
                          }}
                          aria-label={`Remove ${product.name} from wishlist`}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--crimson)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--crimson)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--white-30)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
