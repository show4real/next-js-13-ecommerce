import React from "react";

const PaymentFailed = () => {
  return (
    <div class="bg-white p-6  md:mx-auto">
      <svg viewBox="0 0 24 24" class="text-red-600 w-16 h-16 mx-auto my-6">
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6,16.9L16.9,18,12,13.1,7.1,18,6,16.9,10.9,12,6,7.1,7.1,6,12,10.9,16.9,6,18,7.1Z"
        ></path>
      </svg>

      <div class="text-center">
        <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Failed
        </h3>
        <p class="text-gray-600 my-2">Please Retry</p>
        <p> Thanks as you do </p>
        <div class="py-10 text-center">
          <a
            href="#"
            class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
          >
            GO BACK
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
