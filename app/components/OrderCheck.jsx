"use client";
import React from "react";
import Image from "next/image";

const cartData =
  typeof window !== "undefined" ? localStorage.getItem("cart") : null;

const carts = cartData ? JSON.parse(cartData) : [];
const totalPrice =
  carts.length > 0 &&
  carts.reduce((acc, item) => acc + item.quantity * item.price, 0);

const OrderCheck = () => {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Order Summary</h1>

      {/* Product List */}
      <div className="space-y-4">
        {/* Product Item */}
        {carts !== null &&
          carts.map((cart, key) => (
            <div className="flex justify-between items-center" key={key}>
              <div className="flex items-center">
                <Image
                  src={cart.image}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">Product Name</h2>
                  <p className="text-gray-500">Quantity: {cart.name}</p>
                </div>
              </div>
              <span className="text-gray-600">&#8358;{cart.price}</span>
            </div>
          ))}
        {/* Add more product items as needed */}

        {/* Order Total */}
        <div className="flex justify-between border-t pt-4">
          <span className="font-semibold">Order Total:</span>
          <span className="text-xl font-bold">&#8358;{totalPrice}</span>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
        <p className="text-gray-600">
          John Doe
          <br />
          123 Street Name
          <br />
          City, Country
          <br />
          Postal Code
        </p>
      </div>

      {/* Order Status */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Order Status</h2>
        <p className="text-green-600 font-semibold">Shipped</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default OrderCheck;
