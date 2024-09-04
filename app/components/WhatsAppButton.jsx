import React from "react";
import Whatsapp from "/public/whatsapp.webp";
import Image from "next/image";

const WhatsAppButton = ({ phoneNumber, message }) => {
  const encodedMessage = encodeURIComponent(message);

  return (
    <div className="fixed bottom-5 right-3 z-50 text-white px-6 py-3 rounded-lg flex items-center">
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
      >
        <Image
          src={Whatsapp}
          alt="Hayzeeonline Computer resources"
          width={50}
          placeholder="blur"
          quality={100}
        />
        {/* <img src="/public/whatsapp.webp" alt="WhatsApp" style={styles.icon} /> */}
        Chat with Us
      </a>
    </div>
  );
};

const styles = {
  button: {
    backgroundColor: "#25D366",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
  icon: {
    marginRight: "10px",
    width: "24px",
    height: "24px",
  },
};

export default WhatsAppButton;
