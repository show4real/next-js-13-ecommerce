import Link from "next/link";
import {
  TrashIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import useCartStore from "/app/store/zustand";
import useHasMounted from "/app/hooks/useHasMounted";

const CartQuick = () => {
  const { cart: persistedCart, removeFromCart, updateCart, clearCart } =
    useCartStore();
  // Treat the cart as empty until mounted so server and first client render
  // agree (the cart only exists in the browser's localStorage).
  const hasMounted = useHasMounted();
  const cart = hasMounted ? persistedCart : [];

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const formatNumber = (number) =>
    number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;

  if (!cart.length) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50 text-primary">
          <ShoppingBagIcon className="h-9 w-9" />
        </div>
        <h3 className="text-base font-bold text-primary">Your cart is empty</h3>
        <p className="mt-1 text-sm text-gray-500">
          Browse our deals and add items to get started.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Count + clear */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-500">
          {cart.length} item{cart.length > 1 ? "s" : ""}
        </span>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-gray-400 transition hover:text-red-500"
        >
          Clear all
        </button>
      </div>

      {/* Items */}
      <ul className="space-y-3">
        {cart.map((product) => (
          <li
            key={product.id}
            className="flex gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
          >
            <Link
              href={`/products/${product.slug}`}
              className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-1"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/products/${product.slug}`}
                  className="line-clamp-2 text-sm font-semibold leading-snug text-gray-800 transition hover:text-primary"
                >
                  {product.name}
                </Link>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  aria-label="Remove item"
                  className="flex-shrink-0 rounded-md p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-0.5 text-xs text-gray-400">
                &#8358;{formatNumber(product.price)} each
              </p>

              <div className="mt-auto flex items-center justify-between pt-2">
                {/* Quantity stepper */}
                <div className="inline-flex items-center rounded-lg border border-gray-200">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      product.quantity > 1
                        ? updateCart(product.id, product.quantity - 1)
                        : removeFromCart(product.id)
                    }
                    className="flex h-7 w-7 items-center justify-center text-gray-600 transition hover:text-primary"
                  >
                    <MinusIcon className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold text-gray-800">
                    {product.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => updateCart(product.id, product.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center text-gray-600 transition hover:text-primary"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="text-sm font-bold text-primary">
                  &#8358;{formatNumber(product.quantity * product.price)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Subtotal */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Subtotal</span>
          <span className="text-lg font-extrabold text-primary">
            &#8358;{formatNumber(totalPrice)}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Shipping &amp; VAT calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartQuick;
