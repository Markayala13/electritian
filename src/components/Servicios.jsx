import React from "react";
import { useTranslation } from "react-i18next";
import { FiZap, FiHome, FiTool, FiSun, FiTrendingUp, FiBatteryCharging, FiCpu } from "react-icons/fi";

const icons = [
  <FiCpu className="text-4xl text-[#FFD700]" />,
  <FiSun className="text-4xl text-[#00BFA6]" />,
  <FiTrendingUp className="text-4xl text-[#5A6B68]" />,
  <FiTool className="text-4xl text-[#FFD700]" />,
  <FiBatteryCharging className="text-4xl text-[#00BFA6]" />,
  <FiHome className="text-4xl text-[#5A6B68]" />,
  <FiZap className="text-4xl text-[#FFD700]" />,
  <FiTool className="text-4xl text-[#00BFA6]" />,
  <FiZap className="text-4xl text-[#FFD700]" />
];

export default function Servicios() {
  const { t } = useTranslation();
  const servicios = t("servicios.items", { returnObjects: true });

  return (
    <section id="servicios" className="bg-[#F5F7FA] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#23272F] mb-4">
          {t("servicios.titulo")}
        </h2>
        <p className="text-lg text-center text-[#5A6B68] mb-12 max-w-3xl mx-auto">
          {t("servicios.descripcion")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {servicios.map((servicio, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-4">{icons[idx]}</div>
              <h3 className="text-xl font-bold mb-2 text-[#5A6B68]">{servicio.titulo}</h3>
              <p className="text-gray-600">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}