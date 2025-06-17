import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t, i18n } = useTranslation();

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-[70vh] md:min-h-[80vh] w-full overflow-hidden"
    >
      {/* Imagen de fondo */}
      <img
        src="/IMAGE1.png"
        alt="Electricista fondo"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      {/* Overlay oscuro con transparencia */}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      {/* Contenido */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
        {/* Botones de idioma */}
       
        <motion.img
          src=""
          alt=""
          className="w-40 md:w-56 mb-8 drop-shadow-xl"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4"
          style={{
            textShadow: "0 4px 32px #FFD700, 0 2px 8px #000, 0 0 2px #fff"
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("hero.titulo")}
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-white/90 text-center mb-8 max-w-2xl"
          style={{
            textShadow: "0 2px 8px #FFD700, 0 1px 4px #000"
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t("hero.descripcion")}
        </motion.p>
        <motion.a
          href="#contacto"
          className="inline-block bg-[#FFD700] text-[#23272F] px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#00BFA6] hover:text-white transition"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {t("hero.boton")}
        </motion.a>
      </div>
    </section>
  );
}