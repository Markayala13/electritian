
import React from "react";

const reviews = [
  {
    nombre: "Carlos",
    imagen: "/review2.jpg",
    texto: "¡Excelente servicio! Me ayudaron con la instalación eléctrica de mi casa y todo quedó perfecto. Muy profesionales y atentos, los recomiendo totalmente.",
  },
  {
    nombre: "Rex",
    imagen: "/review3.jpg",
    texto: "Muy buen trabajo y rápidos. Explicaron todo el proceso y resolvieron mis dudas. Sin duda volveré a contratarlos para futuros proyectos.",
  },
  {
    nombre: "Emily",
    imagen: "/review1.jpg",
    texto: "Great experience! The team was friendly, efficient, and made sure everything was up to code. I feel much safer at home now. Thank you!",
  },
];

export default function Reviews() {
  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#23272F]">
          Lo que opinan nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center"
            >
              <img
                src={review.imagen}
                alt={review.nombre}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-[#FFD700] shadow"
              />
              <p className="text-gray-700 italic mb-4">"{review.texto}"</p>
              <div className="font-bold text-[#5A6B68]">{review.nombre}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}