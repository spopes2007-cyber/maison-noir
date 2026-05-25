"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartSidebar() {
  const { cart, cartOpen, cartTotal, dispatch } = useStore();

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-60"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-70 flex flex-col"
            style={{
              width: "min(440px, 100vw)",
              backgroundColor: "var(--bg-charcoal)",
              borderLeft: "1px solid var(--border-subtle)",
            }}
            aria-label="Shopping cart"
            role="dialog"
            aria-modal
          >
            {/* Header */}
            <div
              className="flex items-center justify-between"
              style={{ padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} style={{ color: "var(--crimson)" }} />
                <h2 className="font-display" style={{ fontSize: "16px", letterSpacing: "0.15em", color: "var(--white)" }}>
                  YOUR BAG
                </h2>
                {cart.length > 0 && (
                  <span
                    style={{
                      padding: "2px 8px",
                      backgroundColor: "var(--crimson)",
                      borderRadius: 2,
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => dispatch({ type: "TOGGLE_CART" })}
                className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer"
                style={{ color: "var(--white-60)", transition: "color 200ms, background-color 200ms" }}
                aria-label="Close cart"
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

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto" style={{ padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4"
                >
                  <ShoppingBag size={48} style={{ color: "var(--white-10)" }} />
                  <p style={{ color: "var(--white-30)", fontSize: "14px", letterSpacing: "0.05em" }}>Your bag is empty</p>
                  <button
                    onClick={() => dispatch({ type: "TOGGLE_CART" })}
                    className="btn-primary cursor-pointer"
                    style={{ padding: "10px 24px", borderRadius: 2, fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    Shop Now
                  </button>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item, i) => (
                    <motion.div
                      key={`${item.product.id}-${item.size}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4"
                      style={{
                        padding: "16px",
                        backgroundColor: "var(--bg-surface)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: 4,
                      }}
                    >
                      {/* Product visual mini */}
                      <div
                        className="flex-shrink-0 rounded"
                        style={{
                          width: 72,
                          height: 90,
                          backgroundColor: "var(--bg-elevated)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid var(--border-subtle)",
                          overflow: "hidden",
                        }}
                      >
                        <svg viewBox="0 0 72 90" fill="none" style={{ width: "100%", height: "100%" }}>
                          <rect width="72" height="90" fill="rgba(196,18,48,0.05)" />
                          <text x="36" y="50" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="serif" letterSpacing="1">
                            {item.product.category.slice(0, 1)}
                          </text>
                        </svg>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: "10px", color: "var(--crimson)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>
                          {item.product.category}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--white-90)", fontWeight: 500, lineHeight: 1.3, marginBottom: 4 }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: "11px", color: "var(--white-30)", marginBottom: 8 }}>Size: {item.size}</p>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div
                            className="flex items-center gap-2"
                            style={{ border: "1px solid var(--border-subtle)", borderRadius: 2, padding: "2px" }}
                          >
                            <button
                              onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: item.product.id, size: item.size, quantity: item.quantity - 1 })}
                              className="flex items-center justify-center w-6 h-6 cursor-pointer"
                              style={{ color: "var(--white-60)", transition: "color 150ms" }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontSize: "13px", color: "var(--white)", fontWeight: 600, minWidth: 20, textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch({ type: "UPDATE_QUANTITY", productId: item.product.id, size: item.size, quantity: item.quantity + 1 })}
                              className="flex items-center justify-center w-6 h-6 cursor-pointer"
                              style={{ color: "var(--white-60)", transition: "color 150ms" }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price + delete */}
                          <div className="flex items-center gap-3">
                            <span style={{ fontSize: "14px", color: "var(--white)", fontWeight: 600 }}>
                              ${item.product.price * item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch({ type: "REMOVE_FROM_CART", productId: item.product.id, size: item.size })}
                              className="cursor-pointer"
                              style={{ color: "var(--white-30)", transition: "color 150ms" }}
                              aria-label={`Remove ${item.product.name} from cart`}
                              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--crimson)")}
                              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--white-30)")}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid var(--border-subtle)" }}>
                <div className="flex justify-between mb-2">
                  <span style={{ fontSize: "12px", color: "var(--white-30)", letterSpacing: "0.05em" }}>Subtotal</span>
                  <span style={{ fontSize: "14px", color: "var(--white-60)" }}>${cartTotal}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span style={{ fontSize: "12px", color: "var(--white-30)", letterSpacing: "0.05em" }}>Shipping</span>
                  <span style={{ fontSize: "12px", color: "var(--crimson)", letterSpacing: "0.05em" }}>Free</span>
                </div>
                <div className="divider-glow mb-5" />
                <div className="flex justify-between mb-6">
                  <span className="font-display" style={{ fontSize: "14px", color: "var(--white)", letterSpacing: "0.1em" }}>TOTAL</span>
                  <span className="font-display" style={{ fontSize: "18px", color: "var(--white)", letterSpacing: "0.05em" }}>${cartTotal}</span>
                </div>
                <motion.button
                  className="btn-primary w-full"
                  style={{
                    padding: "16px",
                    borderRadius: 2,
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
                <p style={{ fontSize: "11px", color: "var(--white-30)", textAlign: "center", marginTop: 10 }}>
                  Secure checkout · Free returns · 48h delivery
                </p>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
