
import React from "react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2133380162"//r tu número real
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition"
      />
    </a>
  );
}