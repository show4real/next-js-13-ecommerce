import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getEffectivePrice } from '/app/lib/price';

// On the server `localStorage` doesn't exist. Hand persist a no-op store there
// so importing/evaluating this module (e.g. during SSR of a client component)
// never throws "localStorage is not defined".
const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // Add product to cart. Normalize `price` to the effective (unstruck)
      // price so totals, payment and the order request all use what the
      // customer actually pays — the new price when on sale, else the normal.
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { ...product, price: getEffectivePrice(product), quantity: 1 }]
          });
        }
      },
      
      // Remove product from cart completely
      removeFromCart: (productId) => {
        const { cart } = get();
        set({
          cart: cart.filter(item => item.id !== productId)
        });
      },
      
      // Update quantity of a specific product
      updateCart: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({
            cart: cart.filter(item => item.id !== productId)
          });
        } else {
          set({
            cart: cart.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      
      // Clear entire cart
      clearCart: () => {
        set({ cart: [] });
      },
      
      // Get total number of items in cart
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Get total price of all items in cart
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      // Get specific item from cart
      getCartItem: (productId) => {
        const { cart } = get();
        return cart.find(item => item.id === productId);
      },
      
      // Check if item is in cart
      isInCart: (productId) => {
        const { cart } = get();
        return cart.some(item => item.id === productId);
      }
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage
      ),
      partialize: (state) => ({ cart: state.cart }), // only persist the cart array
      onRehydrateStorage: () => (state) => {
        // Optional: Log when storage is rehydrated
        console.log('Cart store rehydrated');
      }
    }
  )
);

export default useCartStore;