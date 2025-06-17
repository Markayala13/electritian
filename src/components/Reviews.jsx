import React from "react";
import { useTranslation } from "react-i18next";

export default function Reviews() {
  const { t } = useTranslation();
  const reviews = t("reviews.items", { returnObjects: true });

  return (
    <section className="bg-[#F5F7FA] py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-[#23272F]">
          {t("reviews.titulo")}
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