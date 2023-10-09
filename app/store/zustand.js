import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) || [],
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
  isItemInCart: (itemId) =>
    state.cart.some((cartItem) => cartItem.id === itemId),
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
    return state.cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);
  },

  clearCart: () => {
    localStorage.removeItem("cart"); // Remove cart data from localStorage
    set({ cart: [] });
  },
}));

export default useCartStore;
