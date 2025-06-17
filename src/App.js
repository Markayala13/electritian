import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Acerca from "./components/Acerca";
import Galeria from "./components/Galeria";

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
      {/* Aquí irán los demás bloques */}
    </div>
  );
}

export default App;