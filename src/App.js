import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Acerca from "./components/Acerca";
import Galeria from "./components/Galeria";
import PorQueEscogernos  from "./components/PorQueEscogernos";
import Reviews from "./components/Reviews";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import "./i18n";

import Servicios from "./components/Servicios";

function App() {
  return (
    <div>
      <Navbar />
      <Header />
      <Hero />
      <Acerca />
      <Galeria />
      <Servicios />
      <PorQueEscogernos />
      <Reviews />
      <Contacto/>
      <Footer />
      {/* Aquí irán los demás bloques */}
    </div>
  );
}

export default App;