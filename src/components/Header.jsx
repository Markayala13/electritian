import React from "react";
import { FiPhone, FiMail } from "react-icons/fi"; // Importa los iconos
import {  FiAward } from "react-icons/fi";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-white shadow p-4">
      <div className="flex items-center gap-4">
        <img
          src="/img/k&g-logo.png"
          alt=""
          className="h-16"
        />
        <div>
          <h1 className="text-3xl font-serif text-[#5A6B68]">K&G</h1>
          <p className="tracking-widest text-xs text-black">ELECTRICAL SERVICE</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex flex-col md:items-end text-[#5A6B68] gap-2">
        <span className="flex items-center gap-2 font-semibold">
          <FiPhone /> <a href="tel:8184810531" className="hover:underline">818 4810531</a>
        </span>
        <span className="flex items-center gap-2 font-semibold">
          <FiMail /> <a href="mailto:Kandgelectricalservice@gmail.com" className="hover:underline">Email</a>
        </span>
      <span className="flex items-center gap-2 font-semibold">
          <FiAward /> Licencia: 1041959
        </span>
      </div>
    </header>
  );
}