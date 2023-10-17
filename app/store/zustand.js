import { create } from "zustand";
import Cookies from "js-cookie";

const useCartStore = create((set) => {
  let storedCart = [];

  if (typeof window !== "undefined") {
    const cartFromCookie = Cookies.get("cart");
    if (cartFromCookie) {
      storedCart = JSON.parse(cartFromCookie);
    }
  }

  return {
    cart: storedCart,
    addToCart: (item) => {
      const updatedCart = [...storedCart, { ...item, quantity: 1 }];
      if (typeof window !== "undefined") {
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
      }
      set({ cart: updatedCart });
    },
    removeFromCart: (itemId) => {
      const updatedCart = storedCart.filter(
        (cartItem) => cartItem.id !== itemId
      );
      if (typeof window !== "undefined") {
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
      }
      set({ cart: updatedCart });
    },
    isItemInCart: (itemId) =>
      storedCart.some((cartItem) => cartItem.id === itemId),
    updateCart: (itemId, quantity) => {
      const updatedCart = storedCart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
      );
      if (typeof window !== "undefined") {
        Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 });
      }
      set({ cart: updatedCart });
    },
    clearCart: () => {
      if (typeof window !== "undefined") {
        Cookies.remove("cart");
      }
      set({ cart: [] });
    },
    getTotalCartPrice: () => {
      return storedCart.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      );
    },
  };
});

export default useCartStore;
