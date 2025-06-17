import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <nav className="w-full bg-[#5A6B68] text-white shadow fixed top-0 left-0 z-50 h-16">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo a la izquierda */}
        <div className="flex items-center gap-2">
          <img
            src="/IMAGE1.png"
            alt="K&G Logo"
            className="h-10 w-auto rounded"
          />
          <span className="font-bold text-xl tracking-widest">K&G</span>
        </div>
        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
        {/* Menú desktop */}
        <ul className="hidden md:flex gap-6 font-semibold items-center">
          <li><a href="#home" className="hover:text-[#FFD700] transition">{t("navbar.home")}</a></li>
          <li><a href="#servicios" className="hover:text-[#FFD700] transition">{t("navbar.servicios")}</a></li>
          <li><a href="#galeria" className="hover:text-[#FFD700] transition">{t("navbar.proyectos")}</a></li>
          <li><a href="#contacto" className="hover:text-[#FFD700] transition">{t("navbar.contacto")}</a></li>
          {/* Botones de idioma redondos con banderas */}
          <li className="flex gap-2 ml-4">
            <button
              onClick={() => i18n.changeLanguage("es")}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl shadow hover:scale-110 transition"
              title="Español"
            >
              <span role="img" aria-label="Español">🇪🇸</span>
            </button>
            <button
              onClick={() => i18n.changeLanguage("en")}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl shadow hover:scale-110 transition"
              title="English"
            >
              <span role="img" aria-label="English">🇺🇸</span>
            </button>
          </li>
        </ul>
      </div>
      {/* Menú móvil */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 bg-[#5A6B68] px-6 py-4 font-semibold">
          <li><a href="#home" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>{t("navbar.home")}</a></li>
          <li><a href="#servicios" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>{t("navbar.servicios")}</a></li>
          <li><a href="#galeria" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>{t("navbar.proyectos")}</a></li>
          <li><a href="#contacto" className="hover:text-[#FFD700] transition" onClick={() => setOpen(false)}>{t("navbar.contacto")}</a></li>
          <li className="flex gap-2">
            <button
              onClick={() => { i18n.changeLanguage("es"); setOpen(false); }}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl shadow"
              title="Español"
            >
              <span role="img" aria-label="Español">🇪🇸</span>
            </button>
            <button
              onClick={() => { i18n.changeLanguage("en"); setOpen(false); }}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl shadow"
              title="English"
            >
              <span role="img" aria-label="English">🇺🇸</span>
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}