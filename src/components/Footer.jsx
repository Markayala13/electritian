import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#23272F] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Información de contacto */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="flex items-center gap-2">
            <FiMail /> <span>kandgelectricalservice@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone /> <span>(818) 481-0531</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin /> <span>Los Ángeles, CA</span>
          </div>
        </div>
        {/* Logo en vez de redes sociales */}
        <div className="flex items-center">
          <img
            src="K&G Logo(1).png"
            alt="K&G Electrical Service Logo"
            className="w-24 h-auto rounded-xl shadow-lg"
          />
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-8">
         {new Date().getFullYear()} K&G Electrical Service. 
      </div>
    </footer>
  );
}