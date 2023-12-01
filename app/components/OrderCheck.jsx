"use client";
import React, { useState } from "react";
import settings from "/app/services/settings";
import { authService } from "../services/response";
import { notification, Spin } from "antd";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const cartData =
  typeof window !== "undefined" ? localStorage.getItem("cart") : null;
const shipping_details =
  typeof window !== "undefined"
    ? localStorage.getItem("shipping_details")
    : null;

const carts = cartData ? JSON.parse(cartData) : [];
const totalPrice =
  carts.length > 0 &&
  carts.reduce((acc, item) => acc + item.quantity * item.price, 0);

const OrderCheck = () => {
  const referenceParams = useSearchParams();
  const [saving, setSaving] = useState(false);

  const reference = Number(referenceParams.get("reference"));
  console.log(reference);

  const details = shipping_details ? JSON.parse(shipping_details) : {};

  console.log(details.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSaving(true);
    const data = new FormData();

    data.set("name", details.name);
    data.set("phone", details.phone);
    data.set("address", details.address);
    data.set("email", details.email);
    data.set("description", details.description);
    data.set("password", details.name);
    data.set("payment_reference", reference);
    data.set("discount", details.discount);

    for (var i in carts) {
      data.set(`price[${i}]`, carts[i].price);
      data.set(`product_id[${i}]`, carts[i].id);
      data.set(`quantity[${i}]`, carts[i].quantity);
      data.set(`product_image[${i}]`, carts[i].image);
      data.set(`product_name[${i}]`, carts[i].name);
      data.set(`total[${i}]`, carts[i].quantity * carts[i].price);
    }
    data.set("total_price", totalPrice);

    return axios
      .post(
        `${settings.API_URL}complete/order`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        },
        authService.handleResponse
      )
      .then((res) => {
        setSaving(false);

        notification.success({
          message: "Order Sent",
          description:
            "Your order has been successfully sent and will be processed.",
        });

        typeof window !== "undefined" ? localStorage.removeItem("cart") : null;
        typeof window !== "undefined"
          ? localStorage.removeItem("shipping_details")
          : null;

        setTimeout(() => {
          window.location.href = "/order-success";
        }, 2000);
      })
      .catch((err) => {
        setSaving(false);
        // setTimeout(() => {
        //   window.location.href = "/order-failed";
        // }, 1000);
      });
  };

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
                {/* <Image
                  src={cart.image}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded"
                /> */}
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{cart.name}</h2>
                  <p className="text-gray-500">Quantity: {cart.quantity}</p>
                </div>
              </div>
              <span className="text-gray-600">&#8358;{cart.price}</span>
            </div>
          ))}
        {/* Add more product items as needed */}

        {/* Order Total */}
        {discount && (
          <div className="flex justify-between border-t pt-4">
            <span className="font-semibold">Discount:</span>
            <span className="text-xl font-bold">
              &#8358;{details.discount_price}
            </span>
          </div>
        )}
        {discount ? (
          <div className="flex justify-between border-t pt-4">
            <span className="font-semibold">Order Total:</span>
            <span className="text-xl font-bold">
              &#8358;{totalPrice - details.discount_price}
            </span>
          </div>
        ) : (
          <div className="flex justify-between border-t pt-4">
            <span className="font-semibold">Order Total:</span>
            <span className="text-xl font-bold">&#8358;{totalPrice}</span>
          </div>
        )}
      </div>

      {/* Shipping Information */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Shipping Information</h2>
        <p className="text-gray-600">
          {details.name}
          <br />
          {details.address}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          <span>
            {saving ? (
              <>
                <Spin />
                Sending
              </>
            ) : (
              "Complete Order"
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default OrderCheck;
