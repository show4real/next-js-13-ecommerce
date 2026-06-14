import React from "react";
import Image from "next/image";
// Bundled static import (hashed asset URL) so it shows in production regardless
// of whether the host serves the /public folder.
import Whatsapp from "../../public/whatsapp.webp";

const WhatsAppButton = ({ phoneNumber, message }) => {
  const encodedMessage = encodeURIComponent(message);

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-20 left-4 right-auto z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] py-2 pl-2 pr-4 font-bold text-white shadow-lg ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-[#1ebe5b] hover:shadow-xl active:scale-95 lg:bottom-5 lg:left-auto lg:right-4"
    >
      <Image
        src={Whatsapp}
        alt="WhatsApp"
        width={32}
        height={32}
        quality={100}
      />
      <span className="hidden text-sm sm:inline">Chat with Us</span>
    </a>
  );
};

export default WhatsAppButton;
