import React, { useState } from 'react';

const tutoriales = {
switches: [
    // ... tutoriales existentes ...
    {
      titulo: "Cómo Encender y Apagar un Foco desde Tres Lugares",
      canal: "Tecnología y Soluciones Ingeniosas",
      duracion: "8:00 min",
      descripcion: "Tutorial completo para instalar switches de 4 vías y controlar una luz desde tres ubicaciones diferentes.",
      url: "https://youtu.be/b5vugs1xYiQ",
      puntosClave: [
        "Identificación de cables en switches de 4 vías",
        "Conexión del cable común",
        "Instalación de múltiples puntos de control",
        "Pruebas de funcionamiento"
      ]
    },
    {
      titulo: "Cómo Encender y Apagar un Foco desde Dos Lugares",
      canal: "Tecnología y Soluciones Ingeniosas", 
      duracion: "6:30 min",
      descripcion: "Aprende a instalar switches de 3 vías para controlar una luz desde dos puntos diferentes.",
      url: "https://youtu.be/ndIm2ymnczE",
      puntosClave: [
        "Diferencia entre switch simple y de 3 vías",
        "Identificación del terminal común",
        "Conexión de cables viajeros",
        "Instalación paso a paso"
      ]
    }
  ],
  
  outlets: [
    // ... tutoriales existentes ...
    {
      titulo: "Cómo Hallar la Fase y el Neutro en un Tomacorriente",
      canal: "Tecnología y Soluciones Ingeniosas",
      duracion: "5:15 min", 
      descripcion: "Método simple y seguro para identificar fase y neutro en outlets usando herramientas básicas.",
      url: "https://youtu.be/EE0paCB0GCI",
      puntosClave: [
        "Uso del probador de voltaje",
        "Identificación visual de cables",
        "Medidas de seguridad",
        "Verificación con multímetro"
      ]
    }
  ],

  fundamentos: [
    // ... tutoriales existentes ...
    {
      titulo: "Curso Completo de Electricidad Paso a Paso",
      canal: "Tecnología y Soluciones Ingeniosas",
      duracion: "45:00 min",
      descripcion: "Curso completo desde conceptos básicos hasta instalaciones prácticas para principiantes.",
      url: "https://www.youtube.com/watch?v=QgxXUkyeDFs",
      puntosClave: [
        "Conceptos básicos de voltaje y corriente",
        "Instalación de interruptores simples",
        "Conexión de múltiples focos",
        "Prácticas de seguridad eléctrica"
      ]
    },
    {
      titulo: "Electricity for Beginners - Voltage, Current, Power",
      canal: "RGB Engineering",
      duracion: "23:32 min",
      descripcion: "Fundamentos de ingeniería eléctrica explicados por un ingeniero eléctrico profesional.",
      url: "https://www.youtube.com/watch?v=YBqP0J0LDYs",
      puntosClave: [
        "Conceptos de carga y corriente",
        "Explicación de voltaje y potencia",
        "Elementos básicos de circuitos",
        "Ejemplos prácticos con simulaciones"
      ]
    },
    {
      titulo: "Introducción a la Electricidad - Electricidad Básica",
      canal: "CulturiCIENCIA",
      duracion: "15:20 min",
      descripcion: "Introducción completa a los principios básicos y conceptos fundamentales de la electricidad.",
      url: "https://www.youtube.com/watch?v=1A9CBiF1KEE",
      puntosClave: [
        "Comprensión de la carga eléctrica",
        "Conceptos de corriente y resistencia",
        "Principios fundamentales",
        "Aplicaciones prácticas básicas"
      ]
    },
    {
      titulo: "Electricidad Básica 0: Entender la Electricidad de la Casa",
      canal: "Bricocrack",
      duracion: "18:45 min",
      descripción: "Explicación de cómo funciona la electricidad doméstica comparándola con la fontanería para facilitar el entendimiento.",
      url: "https://www.youtube.com/watch?v=IBXCiZQvBUs",
      puntosClave: [
        "Diferencia de potencial y tensión",
        "Intensidad y resistencia eléctrica",
        "Cálculo de intensidad por circuito",
        "Dimensionado de cables y automáticos"
      ]
    }
  ],

  errores: [
    {
      titulo: "7 Errores en Instalaciones Eléctricas que Debes Evitar",
      canal: "Tecnología y Soluciones Ingeniosas",
      duracion: "12:30 min",
      descripcion: "Los errores más comunes en instalaciones eléctricas residenciales y cómo evitarlos.",
      url: "https://youtu.be/Lr09BWA6ZaA",
      puntosClave: [
        "Errores en conexiones de neutro",
        "Problemas con la puesta a tierra",
        "Sobrecarga de circuitos",
        "Uso incorrecto de materiales"
      ]
    },
    {
      titulo: "7 Errores en Instalaciones Eléctricas (Parte 2)",
      canal: "Tecnología y Soluciones Ingeniosas", 
      duracion: "11:45 min",
      descripcion: "Segunda parte con errores adicionales que debes evitar en instalaciones eléctricas residenciales.",
      url: "https://youtu.be/qyKR5j8aw8k",
      puntosClave: [
        "Errores en el cuadro eléctrico",
        "Problemas con interruptores diferenciales",
        "Instalación incorrecta de tomas",
        "Fallos en la distribución de cargas"
      ]
    },
    {
      titulo: "10 Errores de Electricidad Residencial que Debes Evitar",
      canal: "Tecnología y Soluciones Ingeniosas",
      duracion: "15:20 min", 
      descripcion: "Los 10 errores más críticos en electricidad residencial con soluciones prácticas.",
      url: "https://youtu.be/nJnAfoNvmHE",
      puntosClave: [
        "Errores de cálculo de cargas",
        "Problemas de aislamiento",
        "Conexiones mal ejecutadas",
        "Incumplimiento de normativas"
      ]
    }
  ],

  empalmes: [
    {
      titulo: "Cómo Hacer Empalmes Eléctricos de Forma Correcta",
      canal: "Tecnología y Soluciones Ingeniosas",
      duracion: "10:15 min",
      descripcion: "Técnicas profesionales para realizar empalmes eléctricos seguros y duraderos.",
      url: "https://youtu.be/PNxH9dE9f98",
      puntosClave: [
        "Tipos de empalmes eléctricos",
        "Preparación correcta de cables",
        "Uso de conectores y cintas",
        "Pruebas de continuidad"
      ]
    },
    {
      titulo: "How to Rough-In Electrical Wiring",
      canal: "Family Handyman",
      duracion: "8:30 min",
      descripcion: "Fundamentos del cableado eléctrico: posicionamiento de cajas y tendido de cables.",
      url: "https://www.familyhandyman.com/project/how-to-roughin-electrical-wiring/",
      puntosClave: [
        "Perforación de marcos estructurales",
        "Posicionamiento de cajas eléctricas",
        "Tendido de cables entre cajas",
        "Técnicas para esquinas y espacios ajustados"
      ]
    }
  ],

  trucos: [
    {
      titulo: "Cómo Eliminar el Parpadeo de los Focos - Truco Simple",
      canal: "Tecnología y Soluciones Ingeniosas",
      duracion: "6:45 min",
      descripcion: "Solución práctica para eliminar el molesto parpadeo en focos LED y fluorescentes.",
      url: "https://youtu.be/WWXZUvsZ21M",
      puntosClave: [
        "Causas del parpadeo en focos",
        "Soluciones con condensadores",
        "Compatibilidad con dimmers",
        "Verificación de voltaje"
      ]
    },
    {
      titulo: "Practicar Electricidad con Niños - Educación Práctica",
      canal: "Bricocrack",
      duracion: "12:20 min",
      descripcion: "Cómo enseñar electricidad básica a niños de forma segura y educativa.",
      url: "https://www.youtube.com/watch?v=xHqIxRfFjvY",
      puntosClave: [
        "Identificación de circuitos domésticos",
        "Instalación segura sin energía",
        "Diferencia entre fase y neutro",
        "Importancia de la toma de tierra"
      ]
    }
  ],

  nfpa: [
    {
      titulo: "NFPA 70E 2024 Major Changes - FREE Training",
      canal: "Jim Phillips - Brainfiller",
      duracion: "1 Hora GRATUITA + Certificado",
      descripcion: "🔥 Curso GRATUITO de 1 hora sobre los cambios principales en NFPA 70E 2024. Incluye certificado de finalización y 0.1 CEU.",
      url: "https://brainfiller.com/classes/2024-nfpa-70e-major-changes/",
      puntosClave: [
        "⚡ Cambios principales NFPA 70E 2024",
        "📋 Nuevos requisitos de seguridad",
        "🛡️ Categorías PPE actualizadas",
        "🔧 Requisitos de mantenimiento",
        "🎓 Certificado de finalización",
        "📚 7 módulos de entrenamiento"
      ]
    },
    {
      titulo: "NFPA 70E Arc Flash Electrical Safety Training",
      canal: "OSHA.com Certified Training",
      duracion: "4 Horas Online + Certificado",
      descripcion: "⚡ Entrenamiento completo de 4 horas en seguridad eléctrica NFPA 70E. Cumple con requisitos OSHA y incluye certificado descargable.",
      url: "https://www.osha.com/courses/nfpa70e-electrical.html",
      puntosClave: [
        "🔥 Protección contra Arc Flash",
        "🥽 Equipos de protección personal",
        "⚠️ Análisis de riesgos eléctricos",
        "🔒 Procedimientos LOTO",
        "📋 Cumple requisitos OSHA",
        "🏆 Certificado descargable"
      ]
    },
    {
      titulo: "NFPA 70E (2024) - Navigating Workplace Electrical Safety",
      canal: "Alison Free Training",
      duracion: "Curso Completo GRATUITO",
      descripcion: "🆓 Curso completamente gratuito sobre NFPA 70E 2024 con actualizaciones esenciales. Incluye certificado CPD acreditado.",
      url: "https://alison.com/course/nfpa-70e-2024-navigating-workplace-electrical-safety-and-essential-updates",
      puntosClave: [
        "📖 NFPA 70E 2024 actualizado",
        "🏢 Seguridad en el lugar de trabajo",
        "📋 Evaluaciones de riesgo",
        "🛡️ Prevención de accidentes",
        "🎓 Certificado CPD acreditado",
        "🆓 Completamente gratuito"
      ]
    },
    {
      titulo: "6-Hour NFPA 70E Professional Training",
      canal: "HeatSpring Certified",
      duracion: "6 Horas + Certificación NABCEP",
      descripcion: "🎓 Entrenamiento profesional de 6 horas por Jason Brozen, Master Electrician y sobreviviente de arc flash. Incluye CEUs NABCEP.",
      url: "https://www.heatspring.com/courses/6-hour-nfpa-70e-electrical-safety-training",
      puntosClave: [
        "👨‍🏫 Instructor sobreviviente de arc flash",
        "🎯 28 años de experiencia real",
        "📊 Evaluaciones comprensivas de riesgo",
        "🔥 Experiencia personal con accidentes",
        "🏆 Certificación NABCEP CEUs",
        "📱 Acceso móvil 24/7"
      ]
    },
    {
      titulo: "NFPA 70E 2021 Electrical Safety for Workers",
      canal: "Mastery Technologies",
      duracion: "23-33 Minutos + Certificado",
      descripcion: "⚡ Entrenamiento práctico en seguridad eléctrica NFPA 70E 2021. Incluye demostraciones detalladas y certificado de finalización.",
      url: "https://www.masterytech.com/products/coursecatalog/info?courseid=apsfes21_vod",
      puntosClave: [
        "🔌 Hazards eléctricos principales",
        "📏 Límites de aproximación",
        "🛡️ Equipos de protección personal",
        "🔧 Condiciones de trabajo seguro",
        "📋 14 lecciones estructuradas",
        "🎓 Certificado y wallet card"
      ]
    }
  ]
};

const categorias = [
  { id: "switches", nombre: "Switches", icono: "⚡", color: "blue" },
  { id: "outlets", nombre: "Outlets", icono: "🔌", color: "green" },
  { id: "luces", nombre: "Luces", icono: "💡", color: "yellow" },
  { id: "ventilacion", nombre: "Ventilación", icono: "🌪️", color: "purple" },
  { id: "fundamentos", nombre: "Fundamentos", icono: "📚", color: "indigo" },
  { id: "errores", nombre: "Errores Comunes", icono: "⚠️", color: "red" },
  { id: "empalmes", nombre: "Empalmes", icono: "🔗", color: "orange" },
  { id: "trucos", nombre: "Trucos y Tips", icono: "💡", color: "cyan" },
  { id: "nfpa", nombre: "NFPA Training", icono: "🔥", color: "gradient" }
];

const Tutoriales = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("switches");

  const getColorClasses = (categoria, isActive) => {
    if (categoria.color === "gradient") {
      return isActive
        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
        : "bg-gray-100 text-gray-600 hover:text-gray-800";
    }
    return isActive
      ? `bg-gradient-to-r from-${categoria.color}-500 to-${categoria.color}-600 text-white shadow-md`
      : "bg-gray-100 text-gray-600 hover:text-gray-800";
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#23272F] justify-between p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
          📚 Tutoriales de Electricidad
        </h1>
        <p className="text-white text-sm md:text-lg font-semibold">
          Aprende con los mejores tutoriales de electricidad profesional
        </p>
        <p className="text-xs md:text-sm text-[#B0B8C1] mt-2">
          YouTube • Cursos Oficiales • Entrenamientos Certificados
        </p>
      </div>

      {/* Selector de Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${getColorClasses(
              categoria,
              categoriaActiva === categoria.id
            )}`}
          >
            <span>{categoria.icono}</span>
            {categoria.nombre}
          </button>
        ))}
      </div>

      {/* Lista de Tutoriales */}
      <div className="grid gap-4 flex-1">
        {tutoriales[categoriaActiva]?.length > 0 ? (
          tutoriales[categoriaActiva].map((tutorial, index) => (
            <div key={index} className="bg-[#1E1D1A] rounded-xl shadow-lg p-6 border border-[#F7B84B] hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#FFFFFF] mb-2">{tutorial.titulo}</h3>
                  <div className="flex items-center gap-4 text-sm text-[#8B8F92] mb-2">
                    <span className="flex items-center gap-1">
                      📺 {tutorial.canal}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {tutorial.duracion}
                    </span>
                  </div>
                  <p className="text-[#8B8F92] mb-3">{tutorial.descripcion}</p>
                </div>
              </div>

              {/* Puntos Clave */}
              <div className="mb-4">
                <h4 className="font-semibold text-[#F7B84B] mb-2">🎯 Puntos Clave:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {tutorial.puntosClave.map((punto, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-[#FFFFFF]">
                      <span className="w-2 h-2 bg-[#F7B84B] rounded-full"></span>
                      {punto}
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón Ver Tutorial */}
              <a
                href={tutorial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F7B84B] text-[#000000] font-semibold py-2 px-4 rounded-lg hover:bg-[#F7B84B] hover:opacity-90 transition-all duration-200"
              >
                {categoriaActiva === "nfpa" ? "🔥 Ver Curso" : "▶️ Ver en YouTube"}
              </a>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-[#1E1D1A] rounded-xl border-2 border-dashed border-[#F7B84B]">
            <p className="text-[#FFFFFF] mb-4">📚 Tutoriales en preparación para esta categoría</p>
            <p className="text-sm text-[#8B8F92]">
              Próximamente: Tutoriales profesionales de {categorias.find(cat => cat.id === categoriaActiva)?.nombre}
            </p>
          </div>
        )}
      </div>

      <div className="h-5 bg-[#23272F]"></div>
    </div>
  );
};

export default Tutoriales;
