"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@/lib/products";

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  cartOpen: boolean;
  wishlistOpen: boolean;
  quickViewProduct: Product | null;
}

type StoreAction =
  | { type: "ADD_TO_CART"; product: Product; size: string }
  | { type: "REMOVE_FROM_CART"; productId: string; size: string }
  | { type: "UPDATE_QUANTITY"; productId: string; size: string; quantity: number }
  | { type: "TOGGLE_WISHLIST"; product: Product }
  | { type: "TOGGLE_CART" }
  | { type: "TOGGLE_WISHLIST_PANEL" }
  | { type: "SET_QUICK_VIEW"; product: Product | null }
  | { type: "CLOSE_ALL" };

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  cartOpen: false,
  wishlistOpen: false,
  quickViewProduct: null,
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(
        (i) => i.product.id === action.product.id && i.size === action.size
      );
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.product.id === action.product.id && i.size === action.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          cartOpen: true,
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: 1, size: action.size }],
        cartOpen: true,
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (i) => !(i.product.id === action.productId && i.size === action.size)
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.product.id === action.productId && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i
        ).filter((i) => i.quantity > 0),
      };
    case "TOGGLE_WISHLIST": {
      const inWishlist = state.wishlist.some((p) => p.id === action.product.id);
      return {
        ...state,
        wishlist: inWishlist
          ? state.wishlist.filter((p) => p.id !== action.product.id)
          : [...state.wishlist, action.product],
      };
    }
    case "TOGGLE_CART":
      return { ...state, cartOpen: !state.cartOpen, wishlistOpen: false };
    case "TOGGLE_WISHLIST_PANEL":
      return { ...state, wishlistOpen: !state.wishlistOpen, cartOpen: false };
    case "SET_QUICK_VIEW":
      return { ...state, quickViewProduct: action.product };
    case "CLOSE_ALL":
      return { ...state, cartOpen: false, wishlistOpen: false, quickViewProduct: null };
    default:
      return state;
  }
}

interface StoreContextValue extends StoreState {
  dispatch: React.Dispatch<StoreAction>;
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
  isInWishlist: (id: string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = state.wishlist.length;
  const cartTotal = state.cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const isInWishlist = (id: string) => state.wishlist.some((p) => p.id === id);

  return (
    <StoreContext.Provider value={{ ...state, dispatch, cartCount, wishlistCount, cartTotal, isInWishlist }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
