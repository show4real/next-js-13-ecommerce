import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // Add product to cart
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
            cart: [...cart, { ...product, quantity: 1 }]
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
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({ cart: state.cart }), // only persist the cart array
      onRehydrateStorage: () => (state) => {
        // Optional: Log when storage is rehydrated
        console.log('Cart store rehydrated');
      }
    }
  )
);

export default useCartStore;