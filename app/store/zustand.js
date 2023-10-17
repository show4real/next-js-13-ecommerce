"use client";
import { create } from "zustand";

const useCartStore = create((set) => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  return {
    cart: storedCart, // Initialize cart from localStorage
    addToCart: (item) => {
      set((state) => {
        const updatedCart = [...state.cart, { ...item, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    },
    removeFromCart: (itemId) => {
      set((state) => {
        const updatedCart = state.cart.filter(
          (cartItem) => cartItem.id !== itemId
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    },
    isItemInCart: (itemId) => {
      const state = set();
      return state.cart.some((cartItem) => cartItem.id === itemId);
    },
    updateCart: (itemId, quantity) => {
      set((state) => {
        const updatedCart = state.cart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      });
    },
    getTotalCartPrice: () => {
      const state = set();
      return state.cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0);
    },
    clearCart: () => {
      localStorage.removeItem("cart");
      return { cart: [] }; // Clear the cart state
    },
  };
});

export default useCartStore;
