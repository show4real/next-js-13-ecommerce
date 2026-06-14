import React from "react";
import Image from "next/image";
// Relative static import so the bundler emits a hashed asset URL that works in
// production builds (a leading-slash "/app/..." specifier doesn't bundle).
import Paystack from "./paystack.webp";

const PaymentImage = () => {
  return (
    <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-4">
      <Image
        src={Paystack}
        alt="Secured by Paystack — Visa, Mastercard & Verve accepted"
        className="h-auto w-full max-w-[280px] object-contain"
      />
    </div>
  );
};

export default PaymentImage;
