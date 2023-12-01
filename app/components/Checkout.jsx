"use client";
import React, { useState, useEffect } from "react";

import useCartStore from "/app/store/zustand";
import settings from "/app/services/settings";
import { authService } from "../services/response";
import { notification, Spin } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaymentImage from "./PaymentImage";
import { getReferrers } from "../services/productService";

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const discount_price = 0.01 * totalPrice;

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const [fields, setFields] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    discount: false,
    discount_price: 0,
    referrer_code: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [payNowSelected, setPayNowSelected] = useState(true);
  const [sendOrderSelected, setSendOrderSelected] = useState(false);
  const [amount, setAmount] = useState(totalPrice);
  const [referrers, setReferrers] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [discount, setDiscount] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);

  useEffect(() => {
    fetchReferrers();
  }, []);

  const fetchReferrers = async () => {
    //setLoading(true);
    await getReferrers().then(
      (res) => {
        setReferrers(res.referrer_codes);
      },
      (error) => {
        //setLoading(false);
      }
    );
  };

  const handleApplyButtonClick = () => {
    const isCodeValid = referrers.includes(referrerCode);
    console.log(isCodeValid);

    setDiscount(isCodeValid);
    setInvalidCode(!isCodeValid);

    setFields((prevData) => ({
      ...prevData, // Spread the existing properties
      discount: isCodeValid,
      discount_price: discount_price, // Replace with your logic to calculate the discount price
      referrer_code: referrerCode,
    }));
  };

  const handlePaymentOptionChange = (option) => {
    if (option === "payNow") {
      setPayNowSelected(true);
      setSendOrderSelected(false);
    } else if (option === "sendOrder") {
      setPayNowSelected(false);
      setSendOrderSelected(true);
    }
  };

  const initiatePayment = async (e) => {
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
    const { email, name } = fields;
    console.log(fields);
    setSaving(true);

    try {
      const response = await axios.post(
        "https://apiv2.hayzeeonline.com/api/initiate-payment",
        { amount, email, discount }
      );
      const checkout =
        typeof window !== "undefined"
          ? localStorage.setItem("cart", JSON.stringify(cart))
          : null;
      const shipping_details =
        typeof window !== "undefined"
          ? localStorage.setItem("shipping_details", JSON.stringify(fields))
          : null;
      router.push(response.data.payment_url);

      setSaving(false);
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

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
    data.set("discount", discount);
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
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Customer Details</p>
            <p className="text-gray-400">
              Complete your order by providing your details.
            </p>
            <div className="">
              <label
                for="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={fields.email}
                  onChange={handleCartInput}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="your.email@gmail.com"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
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
              <label for="name" className="mt-4 mb-2 block text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="name"
                  value={fields.name}
                  onChange={handleCartInput}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="address"
                  value={fields.address}
                  onChange={handleCartInput}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="phone"
                  value={fields.phone}
                  onChange={handleCartInput}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
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
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  placeholder="Notes about your order, e.g. special notes for delivery. "
                  name="description"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  value={fields.description}
                  onChange={handleCartInput}
                />
                <div>
                  <span className="text-red-400 font-medium text-sm">
                    {errors.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Summary</p>
            {/* <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p> */}

            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              {cart.map((product, key) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={key}
                >
                  {/* <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={product.image}
                    alt=""
                  /> */}
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{product.name}</span>
                    <span className="float-right text-gray-400 pt-2">
                      Quantity {product.quantity}
                    </span>
                    <p className="text-lg font-medium pt-3">
                      {product.quantity} X &#8358;{formatNumber(product.price)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="bg-white p-4 shadow-sm rounded-md">
                <h4 className="text-sm font-semibold mb-4">Payment Options</h4>

                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="payNow"
                    name="paymentOption"
                    value="payNow"
                    checked={payNowSelected}
                    onChange={() => handlePaymentOptionChange("payNow")}
                    className="mr-2"
                  />
                  <label htmlFor="payNow" className="text-sm">
                    Pay Now
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sendOrder"
                    name="paymentOption"
                    value="sendOrder"
                    checked={sendOrderSelected}
                    onChange={() => handlePaymentOptionChange("sendOrder")}
                    className="mr-2"
                  />
                  <label htmlFor="sendOrder" className="text-sm">
                    Send Request
                  </label>
                </div>
              </div>

              {payNowSelected && (
                <div className=" bg-white shadow-md rounded-md p-6 pt-10">
                  <form className="flex space-x-4">
                    <label className="flex-grow">
                      <input
                        type="text"
                        placeholder="Add Referrer Code and get Discount"
                        value={referrerCode}
                        onChange={(e) => setReferrerCode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleApplyButtonClick}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                      Apply
                    </button>
                  </form>
                  {invalidCode && (
                    <p className="text-red-500 mt-2">Invalid Referrer Code</p>
                  )}
                  {discount && (
                    <p className="text-green-500 mt-4">Discount Applied!</p>
                  )}
                </div>
              )}

              <div className="pb-10">{payNowSelected && <PaymentImage />}</div>

              <div className="border-t border-b py-2">
                <div className="flex items-center justify-between">
                  {discount && (
                    <>
                      {" "}
                      <p className="text-sm font-medium text-gray-900">
                        Discount
                      </p>
                      <p className="font-semibold text-gray-900">
                        {" "}
                        &#8358;{formatNumber(discount_price)}
                      </p>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">
                    {" "}
                    &#8358;{formatNumber(totalPrice)}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {" "}
                  &#8358;
                  {discount
                    ? formatNumber(totalPrice - discount_price)
                    : formatNumber(totalPrice)}
                </p>
              </div>

              <div className="pt-5">
                <button
                  onClick={payNowSelected ? initiatePayment : handleSubmit}
                  className="mb-8 w-full rounded-md bg-blue-500 px-6 py-3 font-medium text-white"
                >
                  {saving ? (
                    <>
                      {" "}
                      <span>
                        <Spin />{" "}
                        {payNowSelected ? "Initiating payment" : "Sending"}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">
                      {" "}
                      {payNowSelected ? "Pay now" : "Send request"}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid mt-28 px-4 bg-white place-content-center" key={1}>
          <div className="text-center">
            <h1 className="font-black text-gray-200 text-4xl">Empty Cart</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Oops!!
            </p>

            <p className="mt-4 text-gray-500">
              We cannot find Items in your Cart
            </p>

            <Link
              href="/"
              className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
