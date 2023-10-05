"use client";
import React, { useState } from "react";

import useCartStore from "../store/zustand";
import settings from "../../services/settings";
import { authService } from "../../services/response";
import { notification } from "antd";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useCartStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Your Name is required" : "";
      case "phone":
        return !value ? "Phone is required" : "";
      case "email":
        return !value ? "Email is required" : "";
      case "description":
        return !value ? "Description is required" : "";
      case "address":
        return !value ? "Address is required" : "";

      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSaving(true);
    const data = new FormData();

    data.set("name", fields.name);
    data.set("phone", fields.phone);
    data.set("address", fields.address);
    data.set("email", fields.email);
    data.set("description", fields.description);
    data.set("password", fields.name);
    for (var i in cart) {
      data.set(`price[${i}]`, cart[i].price);
      data.set(`product_id[${i}]`, cart[i].id);
      data.set(`quantity[${i}]`, cart[i].quantity);
      data.set(`product_image[${i}]`, cart[i].image);
      data.set(`product_name[${i}]`, cart[i].name);
      data.set(`total[${i}]`, cart[i].quantity * cart[i].price);
    }
    data.set("total_price", totalPrice);

    return axios
      .post(
        `${settings.API_URL}store/order`,
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
        setFields({
          name: "",
          phone: "",
          email: "",
          address: "",
          description: "",
        });
        notification.success({
          message: "Order Sent",
          description:
            "Your order has been successfully sent and will be processed.",
        });

        clearCart();

        setTimeout(() => {
          window.location.reload();
        }, 2000); // 10000ms = 10 seconds
      })
      .catch((err) => {
        setSaving(false);
      });
  };

  const handleCartInput = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  return (
    <>
      {cart.length > 0 ? (
        <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium">Customer Details</p>
            <p class="text-gray-400">
              Complete your order by providing your details.
            </p>
            <div class="">
              <label for="email" class="mt-4 mb-2 block text-sm font-medium">
                Email
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={fields.email}
                  onChange={handleCartInput}
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-red-400 font-medium text-sm">
                    {errors.email}
                  </span>
                </div>
              </div>
              <label for="name" class="mt-4 mb-2 block text-sm font-medium">
                Full Name
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="email"
                  name="name"
                  value={fields.name}
                  onChange={handleCartInput}
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full Name"
                />
                <div>
                  <span className="text-red-400 font-medium text-sm">
                    {errors.name}
                  </span>
                </div>
              </div>
              <label
                for="card-holder"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                Address
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="address"
                  value={fields.address}
                  onChange={handleCartInput}
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div>
                  <span className="text-red-400 font-medium text-sm">
                    {errors.address}
                  </span>
                </div>
              </div>
              <label
                for="card-holder"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                Phone
              </label>
              <div class="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="phone"
                  value={fields.phone}
                  onChange={handleCartInput}
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Your full name here"
                />
                <div>
                  <span className="text-red-400 font-medium text-sm">
                    {errors.phone}
                  </span>
                </div>
              </div>
              <label
                for="card-holder"
                class="mt-4 mb-2 block text-sm font-medium"
              >
                Description
              </label>
              <div class="relative">
                <textarea
                  placeholder="Notes about your order, e.g. special notes for delivery. "
                  name="description"
                  class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  value={fields.description}
                  onChange={handleCartInput}
                />
                <div>
                  <span className="text-red-400 font-medium text-sm">
                    {errors.description}
                  </span>
                </div>
              </div>

              <div class="mt-6 border-t border-b py-2">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium text-gray-900">Subtotal</p>
                  <p class="font-semibold text-gray-900">
                    {" "}
                    &#8358;{formatNumber(totalPrice)}
                  </p>
                </div>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Total</p>
                <p class="text-2xl font-semibold text-gray-900">
                  {" "}
                  &#8358;{formatNumber(totalPrice)}
                </p>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            >
              {saving ? "Sending Order" : "Send Order"}
            </button>
          </div>
          <div class="px-4 pt-8">
            <p class="text-xl font-medium">Summary</p>
            <p class="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cart.map((product) => (
                <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img
                    class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={product.image}
                    alt=""
                  />
                  <div class="flex w-full flex-col px-4 py-4">
                    <span class="font-semibold">{product.name}</span>
                    <span class="float-right text-gray-400 pt-2">
                      Quantity {product.quantity}
                    </span>
                    <p class="text-lg font-medium pt-3">
                      {product.quantity} X &#8358;{formatNumber(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div class="grid mt-28 px-4 bg-white place-content-center">
          <div class="text-center">
            <h1 class="font-black text-gray-200 text-4xl">Empty Cart</h1>

            <p class="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Oops!!
            </p>

            <p class="mt-4 text-gray-500">We can't find Items in your Cart</p>

            <a
              href="/"
              class="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Go Back Home
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
