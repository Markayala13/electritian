
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contacto() {
  const form = useRef();
  const [enviado, setEnviado] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_gp73grc", // Reemplaza por tu Service ID de EmailJS
        "template_xy1dbks", // Reemplaza por tu Template ID de EmailJS
        form.current,
        "xG8m8azZGL94ju0Im" // Reemplaza por tu Public Key de EmailJS
      )
      .then(
        () => {
          setEnviado(true);
          form.current.reset();
        },
        (error) => {
          alert("Error al enviar el mensaje. Intenta de nuevo.");
        }
      );
  };

  return (
    <section id="contacto" className="bg-[#F5F7FA] py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#23272F] mb-8">
          Contáctanos
        </h2>
        <form ref={form} onSubmit={sendEmail} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
          <input
            type="text"
            name="user_name"
            placeholder="Tu nombre"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFD700]"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Tu correo electrónico"
            required
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFD700]"
          />
          <textarea
            name="message"
            placeholder="¿En qué podemos ayudarte?"
            required
            rows={5}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFD700]"
          />
          <button
            type="submit"
            className="bg-[#FFD700] text-[#23272F] font-bold py-3 rounded-lg hover:bg-[#00BFA6] hover:text-white transition"
          >
            Enviar mensaje
          </button>
          {enviado && (
            <div className="text-green-600 font-semibold text-center">
              ¡Mensaje enviado! Te contactaremos pronto.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}