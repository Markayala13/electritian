import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#5A6B68] text-white shadow fixed top-0 left-0 z-50 h-16">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo a la izquierda */}
        <div className="flex items-center gap-2">
          <img
            src="" // Cambia por la ruta de tu logo si es diferente
            alt=""
            className="h-10 w-auto rounded"
          />
          <span className="font-bold text-xl tracking-widest">K&G</span>
        </div>
        {/* Botón hamburguesa y menú igual que antes... */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
        <ul className="hidden md:flex gap-6 font-semibold">
          <li><a href="#home" className="hover:text-[#FFD700] transition">Home</a></li>
          <li><a href="#servicios" className="hover:text-[#FFD700] transition">Servicios</a></li>
          <li><a href="#galeria" className="hover:text-[#FFD700] transition">Proyectos</a></li>
          <li><a href="#contacto" className="hover:text-[#FFD700] transition">Contacto</a></li>
        </ul>
      </div>
      {/* Menú móvil igual que antes... */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 bg-[#5A6B68] px-6 py-4 font-semibold">
          <li><a href="#home" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>Home</a></li>
          <li><a href="#servicios" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>Servicios</a></li>
          <li><a href="#galeria" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>Proyectos</a></li>
          <li><a href="#contacto" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>Contacto</a></li>
        </ul>
      )}
    </nav>
  );
}