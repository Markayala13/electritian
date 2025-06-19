//import React, { useState } from "react";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Acerca from "./components/Acerca";
import Galeria from "./components/Galeria";
import PorQueEscogernos from "./components/PorQueEscogernos";
import Reviews from "./components/Reviews";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Servicios from "./components/Servicios";
import Login from "./components/Login";
import ZonaPrivada from "./components/ZonaPrivada";
import "./i18n";
import { Helmet } from "react-helmet";

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);


  const loginRef = useRef(null);

// Hacer scroll al login cuando se muestre
useEffect(() => {
  if (mostrarLogin && loginRef.current) {
    loginRef.current.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }
}, [mostrarLogin]);


  return (
    <div>
      <Helmet>
        <title>K&G Electrical Service | Electricistas en Los Ángeles</title>
        <meta
          name="description"
          content="Electricistas profesionales en Los Ángeles. Instalación, reparación y proyectos eléctricos residenciales y comerciales con atención personalizada y garantía."
        />
        <meta
          name="keywords"
          content="electricista, Los Ángeles, instalación eléctrica, reparación, paneles eléctricos, LED, cargadores eléctricos, smart home"
        />
        <meta name="author" content="K&G Electrical Service" />
        <meta property="og:title" content="K&G Electrical Service" />
        <meta
          property="og:description"
          content="Electricistas profesionales en Los Ángeles. Instalación, reparación y proyectos eléctricos residenciales y comerciales."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="K&G Logo(1).PNG" />
        <meta property="og:url" content="https://tusitio.com/" />
        <meta name="robots" content="index, follow" />
        <html lang="es" />
      </Helmet>
      {autenticado ? (
        <ZonaPrivada />
      ) : (
        <>
          <Navbar />
          <Header />
          <Hero />
          <Acerca />
          <Galeria />
          <Servicios />
          <PorQueEscogernos />
          <Reviews />
          <Contacto />
          <Footer />
          <WhatsAppButton />
          {/* Botón para mostrar el login */}
          <button
            onClick={() => setMostrarLogin(true)}
            className="fixed bottom-24 right-6 z-50 bg-[#FFD700] text-[#23272F] px-4 py-2 rounded-full shadow hover:bg-[#00BFA6] hover:text-white transition"
          >
            Acceso equipo
          </button>
{mostrarLogin && (
  <div ref={loginRef}>
    <Login
      onLogin={() => {
        setAutenticado(true);
        setMostrarLogin(false);
      }}
    />
  </div>
)}
        </>
      )}
    </div>
  );
}

export default App;