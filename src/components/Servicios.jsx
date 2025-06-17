import React from "react";
import { FiZap, FiHome, FiTool, FiSun, FiTrendingUp, FiBatteryCharging, FiCpu } from "react-icons/fi";

const servicios = [
  {
    icon: <FiCpu className="text-4xl text-[#FFD700]" />,
    titulo: "Instalación de Paneles Eléctricos",
    descripcion: "Montaje y actualización de paneles eléctricos para máxima seguridad y eficiencia.",
  },
  {
    icon: <FiSun className="text-4xl text-[#00BFA6]" />,
    titulo: "Instalación de LED Lights",
    descripcion: "Iluminación LED moderna y eficiente para interiores y exteriores.",
  },
  {
    icon: <FiTrendingUp className="text-4xl text-[#5A6B68]" />,
    titulo: "Electrical Upgrades",
    descripcion: "Mejoras eléctricas para aumentar la capacidad y seguridad de tu propiedad.",
  },
  {
    icon: <FiTool className="text-4xl text-[#FFD700]" />,
    titulo: "Instalación de Luces de Jardín",
    descripcion: "Iluminación exterior y de jardines para realzar la belleza y seguridad.",
  },
  {
    icon: <FiBatteryCharging className="text-4xl text-[#00BFA6]" />,
    titulo: "Cargadores para Vehículos Eléctricos",
    descripcion: "Instalación profesional de cargadores para autos eléctricos en tu hogar o negocio.",
  },
  {
    icon: <FiHome className="text-4xl text-[#5A6B68]" />,
    titulo: "Residencial y Comercial",
    descripcion: "Soluciones eléctricas completas para casas, departamentos, oficinas y negocios.",
  },
  {
    icon: <FiZap className="text-4xl text-[#FFD700]" />,
    titulo: "Emergencias Eléctricas",
    descripcion: "Atención rápida y profesional ante fallas eléctricas o situaciones de riesgo.",
  },

   {
    icon: <FiTool className="text-4xl text-[#00BFA6]" />,
    titulo: "Mantenimiento Preventivo",
    descripcion: "Revisiones periódicas y mantenimiento para evitar fallas y prolongar la vida útil de tus instalaciones eléctricas.",
  },
  {
    icon: <FiZap className="text-4xl text-[#FFD700]" />,
    titulo: "Smart Home Solutions",
    descripcion: "Soluciones inteligentes para controlar la iluminación, seguridad y energía de tu hogar o negocio desde cualquier lugar.",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="bg-[#F5F7FA] py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#23272F] mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-lg text-center text-[#5A6B68] mb-12 max-w-3xl mx-auto">
          Ofrecemos soluciones eléctricas profesionales y seguras, cumpliendo con todos los códigos de California y más de 20 años de experiencia. Nuestro equipo está listo para ayudarte en proyectos residenciales, comerciales y de innovación tecnológica.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {servicios.map((servicio, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-4">{servicio.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-[#5A6B68]">{servicio.titulo}</h3>
              <p className="text-gray-600">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}