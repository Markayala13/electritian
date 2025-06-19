import React from "react";
import { useTranslation, Trans } from "react-i18next";

export default function Acerca() {
  const { t } = useTranslation();

  return (
    <section id="acerca" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Texto a la izquierda */}
        <div className="bg-[#F5F7FA] rounded-2xl shadow-xl p-8 flex-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#23272F] mb-4">
            {t("acerca.titulo")}
          </h2>
          <p className="text-lg text-[#5A6B68] mb-4">
            <Trans i18nKey="acerca.parrafo1">
              Somos electricistas certificados con licencia <span className="font-bold text-[#5A6B68]">1041959</span> y más de <span className="font-bold text-[#00BFA6]">20 años de experiencia</span> en el sector.
            </Trans>
          </p>
          <p className="text-lg text-[#5A6B68] mb-4">
            {t("acerca.parrafo2")}
          </p>
          <ul className="list-disc pl-5 text-[#5A6B68]">
            {t("acerca.lista", { returnObjects: true }).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Video a la derecha */}
      <div className="flex-1 w-full flex justify-center">
  <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-lg bg-gray-100" style={{minHeight: "350px"}}>
    <iframe
      src="https://www.youtube.com/embed/9O2eWDRMDFQ"
      title="Video de presentación"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
      style={{minHeight: "350px"}}
    ></iframe>
  </div>
</div>
      </div>
    </section>
  );
}