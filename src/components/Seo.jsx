import React from "react";
import { Helmet } from "react-helmet";

export default function SEO() {
  return (
    <Helmet>
      <title>K&G Electrical Service | Electricistas en Los Ángeles</title>
      <meta name="description" content="Electricistas profesionales en Los Ángeles. Instalación, reparación y proyectos eléctricos residenciales y comerciales con atención personalizada y garantía." />
      <meta name="keywords" content="electricista, Los Ángeles, instalación eléctrica, reparación, paneles eléctricos, LED, cargadores eléctricos, smart home" />
      <meta name="author" content="K&G Electrical Service" />
      <meta property="og:title" content="K&G Electrical Service" />
      <meta property="og:description" content="Electricistas profesionales en Los Ángeles. Instalación, reparación y proyectos eléctricos residenciales y comerciales." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://tusitio.com/imagen-og.jpg" />
      <meta property="og:url" content="https://tusitio.com/" />
      <meta name="robots" content="index, follow" />
      <html lang="es" />
    </Helmet>
  );
}