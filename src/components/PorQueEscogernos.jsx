import React from "react";
import { useTranslation } from "react-i18next";

export default function PorQueEscogernos() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Explicación a la izquierda */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#23272F] mb-4">
            {t("porQue.titulo")}
          </h2>
          <p className="text-lg text-[#5A6B68] mb-4">
            {t("porQue.parrafo")}
          </p>
          <ul className="list-disc pl-5 text-[#5A6B68]">
            {t("porQue.lista", { returnObjects: true }).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Imagen y título a la derecha */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-[#F5F7FA] rounded-2xl shadow-xl p-4 flex flex-col items-center w-full max-w-xs">
            <img
              src="/team.png"
              alt=""
              className="rounded-xl object-cover w-full"
              style={{ aspectRatio: "9/16", maxHeight: 400 }}
            />
            <h3 className="mt-4 text-xl font-bold text-[#23272F] text-center">
              {t("porQue.imagenTitulo")}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}