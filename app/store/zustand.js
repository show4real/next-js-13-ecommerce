import { create } from "zustand";

const useCartStore = create((set) => {
  // Load initial cart state from localStorage or use an empty array
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

  return {
    cart: initialCart,
    addToCart: (item) => {
      set((state) => {
        const updatedCart = [...state.cart, { ...item, quantity: 1 }];
        typeof window !== "undefined"
          ? localStorage.setItem("cart", JSON.stringify(updatedCart))
          : null;

        return { cart: updatedCart };
      });
    },
    removeFromCart: (itemId) => {
      set((state) => {
        const updatedCart = state.cart.filter(
          (cartItem) => cartItem.id !== itemId
        );

        typeof window !== "undefined"
          ? localStorage.setItem("cart", JSON.stringify(updatedCart))
          : null;
        return { cart: updatedCart };
      });
    },
    isItemInCart: (itemId) =>
      state.cart.some((cartItem) => cartItem.id === itemId),
    updateCart: (itemId, quantity) => {
      set((state) => {
        const updatedCart = state.cart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
        );
        typeof window !== "undefined"
          ? localStorage.setItem("cart", JSON.stringify(updatedCart))
          : null;
        return { cart: updatedCart };
      });
    },
    getTotalCartPrice: () => {
      return state.cart.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0);
    },
    clearCart: () => {
      typeof window !== "undefined" ? localStorage.removeItem("cart") : null;
      return { cart: [] }; // Clear the cart state
    },
  };
});

export default useCartStore;
