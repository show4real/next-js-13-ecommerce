import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [], // Initialize cart as an empty array initially
  addToCart: (item) => {
    set((state) => {
      const updatedCart = [...state.cart, { ...item, quantity: 1 }];
      return { cart: updatedCart };
    });
  },
  removeFromCart: (itemId) => {
    set((state) => {
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== itemId
      );
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
      return { cart: updatedCart };
    });
  },
  getTotalCartPrice: () => {
    return state.cart.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);
  },
  clearCart: () => {
    return { cart: [] }; // Clear the cart state
  },
}));

export default useCartStore;
