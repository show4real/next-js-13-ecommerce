"use client";
import React, { useState, useEffect } from "react";

import useCartStore from "/app/store/zustand";
import { notification, Spin } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaymentImage from "./PaymentImage";
import DeliverySelect from "./DeliverySelect";
import { getReferrers } from "../services/productService";
import { initiatePayment, storeOrder } from "../services/api";
import {
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const Checkout = () => {
  const { cart, clearCart } = useCartStore();

  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const discount_price = 0.005 * totalPrice;
  // VAT rate (assumed 7.5%). Change this value if a different VAT is required.
  const VAT_RATE = 0.075;

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
    pickup: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    pickup: "",
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
    // update amount whenever cart, pickup or discount changes
    // compute initial amount including pickup and VAT if any
  const pickup_charges = Number(fields.pickup || 0);
  // new formula: total = VAT + SUBTOTAL + DELIVERY (discount not subtracted)
  const subtotal = totalPrice; // pre-discount subtotal
  const vatAmount = Math.round(subtotal * VAT_RATE); // VAT on pre-discount subtotal
  const finalAmount = Math.round(vatAmount + subtotal + pickup_charges);
    setAmount(finalAmount);
  }, []);

  // keep amount updated when relevant values change
  useEffect(() => {
  const pickup_charges = Number(fields.pickup || 0);
  // new formula: total = VAT + SUBTOTAL + DELIVERY (discount not subtracted)
  const subtotal = totalPrice; // pre-discount subtotal
  const vatAmount = Math.round(subtotal * VAT_RATE);
  const finalAmount = Math.round(vatAmount + subtotal + pickup_charges);
    setAmount(finalAmount);
  }, [totalPrice, fields.pickup, discount, discount_price]);

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
    const { email, name, pickup } = fields;
    console.log(fields);
    setSaving(true);

  const pickup_charges = Number(pickup);
  // new formula: total = VAT + SUBTOTAL + DELIVERY (discount not subtracted)
  const subtotal = totalPrice; // pre-discount subtotal
  const vatAmount = Math.round(subtotal * VAT_RATE); // VAT on pre-discount subtotal
  const finalAmount = Math.round(vatAmount + subtotal + pickup_charges);

    try {
      const data = await initiatePayment({
        amount: finalAmount - pickup_charges,
        email,
        discount,
        pickup_charges,
        vat: vatAmount,
        subtotal,
      });
      const checkout =
        typeof window !== "undefined"
          ? localStorage.setItem("cart", JSON.stringify(cart))
          : null;
      const shipping_details =
        typeof window !== "undefined"
          ? localStorage.setItem("shipping_details", JSON.stringify(fields))
          : null;
      router.push(data.payment_url);

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
      case "pickup":
        return !value ? "Pickup is required" : "";
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
    data.set("pickup", Number(fields.pickup));
    for (var i in cart) {
      data.set(`price[${i}]`, cart[i].price);
      data.set(`product_id[${i}]`, cart[i].id);
      data.set(`quantity[${i}]`, cart[i].quantity);
      data.set(`product_image[${i}]`, cart[i].image);
      data.set(`product_name[${i}]`, cart[i].name);
      data.set(`total[${i}]`, cart[i].quantity * cart[i].price);
    }
    data.set("total_price", totalPrice);

    return storeOrder(data)
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

  const inputCls =
    "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-primary";
  const labelCls = "mb-1.5 block text-sm font-semibold text-gray-700";
  const errCls = "mt-1 block text-xs font-medium text-red-500";

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {cart.length > 0 ? (
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Checkout
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              You have {totalItems} item{totalItems > 1 ? "s" : ""} in your cart — complete your order below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Customer details */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card sm:p-8">
                <h2 className="text-lg font-bold text-primary">Customer Details</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Complete your order by providing your details.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={fields.email}
                      onChange={handleCartInput}
                      className={inputCls}
                      placeholder="your.email@gmail.com"
                    />
                    <span className={errCls}>{errors.email}</span>
                  </div>

                  <div>
                    <label htmlFor="name" className={labelCls}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={fields.name}
                      onChange={handleCartInput}
                      className={inputCls}
                      placeholder="Your full name"
                    />
                    <span className={errCls}>{errors.name}</span>
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelCls}>Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={fields.phone}
                      onChange={handleCartInput}
                      className={inputCls}
                      placeholder="080 0000 0000"
                    />
                    <span className={errCls}>{errors.phone}</span>
                  </div>

                  <div>
                    <label htmlFor="pickup" className={labelCls}>Delivery State / City</label>
                    <DeliverySelect
                      value={fields.pickup}
                      onChange={(val) =>
                        handleCartInput({ target: { name: "pickup", value: val } })
                      }
                    />
                    <span className={errCls}>{errors.pickup}</span>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className={labelCls}>Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={fields.address}
                      onChange={handleCartInput}
                      className={inputCls}
                      placeholder="Street, area, landmark"
                    />
                    <span className={errCls}>{errors.address}</span>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="description" className={labelCls}>Order Notes</label>
                    <textarea
                      id="description"
                      placeholder="Notes about your order, e.g. special instructions for delivery."
                      name="description"
                      rows={3}
                      className={inputCls}
                      value={fields.description}
                      onChange={handleCartInput}
                    />
                    <span className={errCls}>{errors.description}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-primary">Order Summary</h2>

                {/* Items */}
                <div className="mt-4 divide-y divide-gray-100">
                  {cart.map((product, key) => (
                    <div className="flex items-start justify-between gap-3 py-3" key={key}>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">{product.name}</p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {product.quantity} × &#8358;{formatNumber(product.price)}
                        </p>
                      </div>
                      <span className="flex-shrink-0 text-sm font-bold text-primary">
                        &#8358;{formatNumber(product.quantity * product.price)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Payment options */}
                <div className="mt-5">
                  <p className="mb-2.5 text-sm font-bold text-gray-700">Payment Option</p>
                  <div className="space-y-2.5">
                    {[
                      {
                        id: "payNow",
                        selected: payNowSelected,
                        icon: CreditCardIcon,
                        title: "Pay Now",
                        desc: "Secure online payment via Paystack",
                      },
                      {
                        id: "sendOrder",
                        selected: sendOrderSelected,
                        icon: ChatBubbleLeftRightIcon,
                        title: "Send Request",
                        desc: "We'll reach out to confirm your order",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handlePaymentOptionChange(opt.id)}
                        className={`relative flex w-full items-center gap-3 rounded-xl border-2 p-3.5 text-left transition ${
                          opt.selected
                            ? "border-primary bg-primary-50 shadow-sm"
                            : "border-gray-200 bg-white hover:border-primary-300 hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition ${
                            opt.selected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <opt.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-primary">{opt.title}</span>
                          <span className="block text-xs text-gray-500">{opt.desc}</span>
                        </span>
                        {opt.selected ? (
                          <CheckCircleIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                        ) : (
                          <span className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Referrer code */}
                {payNowSelected && (
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Referrer code (optional)"
                        value={referrerCode}
                        onChange={(e) => setReferrerCode(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary"
                      />
                      <button
                        type="button"
                        onClick={handleApplyButtonClick}
                        className="flex-shrink-0 rounded-lg border border-primary-200 bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary-300 hover:bg-primary-100 active:scale-[0.98]"
                      >
                        Apply
                      </button>
                    </div>
                    {invalidCode && (
                      <p className="mt-2 text-xs font-medium text-red-500">Invalid referrer code</p>
                    )}
                    {discount && (
                      <p className="mt-2 text-xs font-medium text-green-600">Discount applied!</p>
                    )}
                  </div>
                )}

                {payNowSelected && (
                  <div className="mt-4">
                    <PaymentImage />
                  </div>
                )}

                {/* Totals */}
                <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-800">&#8358;{formatNumber(totalPrice)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">VAT (7.5%)</span>
                    <span className="font-semibold text-gray-800">
                      &#8358;{formatNumber(Math.round(totalPrice * VAT_RATE))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Delivery</span>
                    <span className="font-semibold text-gray-800">
                      &#8358;{formatNumber(fields.pickup || 0)}
                    </span>
                  </div>
                  {discount && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-semibold text-red-600">
                        − &#8358;{formatNumber(discount_price)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-base font-bold text-primary">Total</span>
                  <span className="text-2xl font-extrabold text-primary">
                    &#8358;{formatNumber(amount)}
                  </span>
                </div>

                <button
                  onClick={payNowSelected ? initiatePayment : handleSubmit}
                  disabled={saving}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-accent-600 hover:shadow-md active:scale-[0.98] disabled:opacity-70"
                >
                  {saving ? (
                    <>
                      <Spin size="small" />
                      {payNowSelected ? "Initiating payment…" : "Sending…"}
                    </>
                  ) : payNowSelected ? (
                    "Pay Now"
                  ) : (
                    "Send Request"
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-gray-400">
                  Secure checkout • Pay on delivery available
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center px-4 py-20">
          <div className="text-center">
            <div className="mb-4 text-6xl">🛒</div>
            <h1 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
              Your cart is empty
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-gray-500">
              Looks like you haven&apos;t added anything yet. Let&apos;s find you a great deal.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 hover:shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
