
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

export default function Contacto() {
  const { t } = useTranslation();
  const form = useRef();
  const [enviado, setEnviado] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_gp73grc", // Tu Service ID
        "template_xy1dbks", // Tu Template ID
        form.current,
        "xG8m8azZGL94ju0Im" // Tu Public Key
      )
      .then(
        () => {
          setEnviado(true);
          form.current.reset();
        },
        () => {
          alert(t("contacto.error"));
        }
      );
  };

  return (
    <section id="contacto" className="bg-[#F5F7FA] py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#23272F] mb-8">
          {t("contacto.titulo")}
        </h2>
        <form ref={form} onSubmit={sendEmail} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <input
            type="text"
            name="user_name"
            placeholder={t("contacto.nombre")}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFD700]"
          />
          <input
            type="email"
            name="user_email"
            placeholder={t("contacto.correo")}
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFD700]"
          />
          <textarea
            name="message"
            placeholder={t("contacto.mensaje")}
            required
            rows={5}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFD700]"
          />
          <button
            type="submit"
            className="bg-[#FFD700] text-[#23272F] font-bold py-3 rounded-lg hover:bg-[#00BFA6] hover:text-white transition"
          >
            {t("contacto.boton")}
          </button>
          {enviado && (
            <div className="text-green-600 font-semibold text-center">
              {t("contacto.exito")}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}