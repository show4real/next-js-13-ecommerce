import { useState } from "react";
import Link from "next/link";

import useCartStore from "/app/store/zustand";

const CartQuick = () => {
  const [open, setOpen] = useState(true);
  const { cart, removeFromCart, clearCart } = useCartStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClearCart = () => {
    clearCart(); // Call the clearCart function to remove all items from the cart
  };

  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <div className="flex-1 overflow-y-auto px-4 py-0 sm:px-6">
        <div className="mt-0">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <Link href={`/products/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={"Product Image"}
                        className="h-full w-full object-cover object-center"
                      />
                    </Link>
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3>
                          <Link href={`/products/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="ml-4">
                          {" "}
                          &#8358;{formatNumber(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {product.quantity}</p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => {
                            removeFromCart(product.id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p> &#8358;{formatNumber(totalPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartQuick;
