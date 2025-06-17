import React from "react";

export default function Acerca() {
  return (
    <section id="acerca" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Texto a la izquierda */}
        <div className="bg-[#F5F7FA] rounded-2xl shadow-xl p-8 flex-1">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#23272F] mb-4">
            Acerca de Nosotros
          </h2>
          <p className="text-lg text-[#5A6B68] mb-4">
            Somos electricistas certificados con licencia <span className="font-bold text-[#5A6B68]">1041959</span> y más de <span className="font-bold text-[#00BFA6]">20 años de experiencia</span> en el sector.
          </p>
          <p className="text-lg text-[#5A6B68] mb-4">
            Cumplimos con todos los códigos eléctricos del estado de California y ofrecemos atención profesional, segura y garantizada para cada proyecto.
          </p>
          <ul className="list-disc pl-5 text-[#5A6B68]">
            <li>Licencia vigente y asegurados</li>
            <li>Más de 20 años de experiencia</li>
            <li>Cumplimiento estricto de normativas</li>
            <li>Atención personalizada</li>
          </ul>
        </div>
        {/* Video a la derecha */}
        <div className="flex-1 w-full flex justify-center">
          <div className="aspect-w-16 aspect-h-9 w-full max-w-xl rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Video de presentación"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}