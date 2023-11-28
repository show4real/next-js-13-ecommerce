import React from "react";
import Image from "next/image";
import Paystack from "/app/components/paystack.webp";

const PaymentImage = () => {
  return (
    <div className="overflow-hidden bg-white rounded-sm shadow-sm">
      <Image className="object-fit w-full h-32" src={Paystack} alt="Sample" />
    </div>
  );
};

export default PaymentImage;
