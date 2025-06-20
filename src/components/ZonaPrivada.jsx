// import React, { useState } from "react";
// import { Calculator, AlertTriangle, CheckCircle, XCircle, Wrench, Cable, BookOpen, Zap } from "lucide-react";

// import ConduitFillCalculator from "./ConduitFillCalculator";

// // Tabla de calibres AWG
// const tablaCalibres = [
//   { amperaje: 15, calibre: "14 AWG" },
//   { amperaje: 20, calibre: "12 AWG" },
//   { amperaje: 30, calibre: "10 AWG" },
//   { amperaje: 50, calibre: "8 AWG" },
//   { amperaje: 65, calibre: "6 AWG" },
//   { amperaje: 85, calibre: "4 AWG" },
//   { amperaje: 100, calibre: "3 AWG" },
//   { amperaje: 115, calibre: "2 AWG" },
//   { amperaje: 130, calibre: "1 AWG" },
//   { amperaje: 150, calibre: "1/0 AWG" },
//   { amperaje: 175, calibre: "2/0 AWG" },
//   { amperaje: 200, calibre: "3/0 AWG" },
//   { amperaje: 230, calibre: "4/0 AWG" },
//   { amperaje: 255, calibre: "250 kcmil" },
//   { amperaje: 285, calibre: "300 kcmil" },
//   { amperaje: 310, calibre: "350 kcmil" },
//   { amperaje: 335, calibre: "400 kcmil" },
//   { amperaje: 380, calibre: "500 kcmil" },
//   { amperaje: 420, calibre: "600 kcmil" },
//   { amperaje: 460, calibre: "700 kcmil" },
//   { amperaje: 475, calibre: "750 kcmil" },
//   { amperaje: 490, calibre: "800 kcmil" },
//   { amperaje: 520, calibre: "900 kcmil" },
//   { amperaje: 545, calibre: "1000 kcmil" },
// ];

// // Componente de Calculadora de Calibre
// function CalculadoraCalibreCable() {
//   const [amperaje, setAmperaje] = useState("");
//   const [resultado, setResultado] = useState("");
//   const [tipoResultado, setTipoResultado] = useState("");

//   const calcular = () => {
//     const amp = parseInt(amperaje, 10);
//     if (isNaN(amp) || amp <= 0) {
//       setResultado("Ingresa un amperaje válido.");
//       setTipoResultado("error");
//       return;
//     }

//     const encontrado = tablaCalibres.find((row) => amp <= row.amperaje);
//     if (encontrado) {
//       setResultado(`Calibre mínimo recomendado: ${encontrado.calibre}`);
//       setTipoResultado("success");
//     } else {
//       setResultado("Amperaje fuera de rango para esta tabla.");
//       setTipoResultado("error");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       calcular();
//     }
//   };

//   const getResultIcon = () => {
//     switch (tipoResultado) {
//       case "success":
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "error":
//         return <XCircle className="w-5 h-5 text-red-500" />;
//       default:
//         return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
//     }
//   };

//   const getResultStyle = () => {
//     switch (tipoResultado) {
//       case "success":
//         return "bg-green-50 border-green-200 text-green-800";
//       case "error":
//         return "bg-red-50 border-red-200 text-red-800";
//       default:
//         return "bg-yellow-50 border-yellow-200 text-yellow-800";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <label className="block text-sm font-semibold text-gray-700">
//           Amperaje Requerido (A)
//         </label>
//         <div className="relative">
//           <input
//             type="number"
//             min="1"
//             value={amperaje}
//             onChange={(e) => setAmperaje(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Ingresa el amperaje"
//             className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none pl-12"
//           />
//           <Zap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//         </div>
//       </div>

//       <button
//         onClick={calcular}
//         className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
//       >
//         <Calculator className="w-5 h-5" />
//         Calcular Calibre
//       </button>

//       {resultado && (
//         <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${getResultStyle()}`}>
//           {getResultIcon()}
//           <span className="font-semibold">{resultado}</span>
//         </div>
//       )}
//     </div>
//   );
// }

// // Componente de Tutoriales
// function ComponenteTutoriales() {
//   const [categoriaActiva, setCategoriaActiva] = useState("switches");

//   const tutoriales = {
//     switches: [
//       {
//         titulo: "Cómo Instalar un Switch Básico",
//         canal: "The Electrician U",
//         duracion: "27 min",
//         descripcion: "Tutorial completo sobre instalación de switches, desde el cableado hasta la conexión final.",
//         url: "https://www.youtube.com/watch?v=4oRFwlCS4jo",
//         puntosClave: [
//           "Montaje de cajas eléctricas",
//           "Instalación de Romex 12/2",
//           "Conexión de switch de 15A",
//           "Instalación de fixture sin llave"
//         ]
//       },
//       {
//         titulo: "Switch de 3 Vías - Instalación Correcta",
//         canal: "Family Handyman",
//         duracion: "3:47 min",
//         descripcion: "Aprende a cablear switches de 3 vías para controlar una luz desde dos ubicaciones.",
//         url: "https://www.youtube.com/watch?v=Ba8aJoxGmzs",
//         puntosClave: [
//           "Identificación del terminal común",
//           "Etiquetado de cables",
//           "Conexión de ambos switches",
//           "Instalación de la luz"
//         ]
//       },
//       {
//         titulo: "Cómo Encender y Apagar un Foco desde Tres Lugares",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "8:00 min",
//         descripcion: "Tutorial completo para instalar switches de 4 vías y controlar una luz desde tres ubicaciones diferentes.",
//         url: "https://youtu.be/b5vugs1xYiQ",
//         puntosClave: [
//           "Identificación de cables en switches de 4 vías",
//           "Conexión del cable común",
//           "Instalación de múltiples puntos de control",
//           "Pruebas de funcionamiento"
//         ]
//       }
//     ],
//     outlets: [
//       {
//         titulo: "Instalación de Outlets - Tutorial Rápido",
//         canal: "Making Sawdust",
//         duracion: "2:02 min",
//         descripcion: "El tutorial más rápido de YouTube para instalar outlets correctamente.",
//         url: "https://www.youtube.com/watch?v=rTzH5PnmqHk",
//         puntosClave: [
//           "Preparación del cable Romex",
//           "Conexión: Verde-Tierra, Blanco-Plata, Negro-Cobre",
//           "Técnicas de doblado de cables",
//           "Uso de probadores eléctricos"
//         ]
//       },
//       {
//         titulo: "Cómo Hallar la Fase y el Neutro en un Tomacorriente",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "5:15 min", 
//         descripcion: "Método simple y seguro para identificar fase y neutro en outlets usando herramientas básicas.",
//         url: "https://youtu.be/EE0paCB0GCI",
//         puntosClave: [
//           "Uso del probador de voltaje",
//           "Identificación visual de cables",
//           "Medidas de seguridad",
//           "Verificación con multímetro"
//         ]
//       }
//     ],
//     luces: [
//       {
//         titulo: "Instalación de Luces Empotradas (Can Lights)",
//         canal: "The Home Depot",
//         duracion: "4:30 min",
//         descripcion: "Guía completa para instalar luces empotradas paso a paso.",
//         url: "https://www.youtube.com/watch?v=I5v6kRQVUUc",
//         puntosClave: [
//           "Plantillas y marcado en el techo",
//           "Localización de vigas",
//           "Corte de agujeros",
//           "Cableado y montaje"
//         ]
//       }
//     ],
//     ventilacion: [
//       {
//         titulo: "Instalación de Extractor de Baño",
//         canal: "This Old House",
//         duracion: "7:33 min",
//         descripcion: "Instalación profesional de ventilador de baño con timer.",
//         url: "https://www.youtube.com/watch?v=Zm_k6WmH7ys",
//         puntosClave: [
//           "Conexión desde switch existente",
//           "Instalación de timer con múltiples opciones",
//           "Montaje entre vigas",
//           "Ducto hacia exterior"
//         ]
//       }
//     ],
//     fundamentos: [
//       {
//         titulo: "Curso Completo de Electricidad Paso a Paso",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "45:00 min",
//         descripcion: "Curso completo desde conceptos básicos hasta instalaciones prácticas para principiantes.",
//         url: "https://www.youtube.com/watch?v=QgxXUkyeDFs",
//         puntosClave: [
//           "Conceptos básicos de voltaje y corriente",
//           "Instalación de interruptores simples",
//           "Conexión de múltiples focos",
//           "Prácticas de seguridad eléctrica"
//         ]
//       },
//       {
//         titulo: "Electricity for Beginners - Voltage, Current, Power",
//         canal: "RGB Engineering",
//         duracion: "23:32 min",
//         descripcion: "Fundamentos de ingeniería eléctrica explicados por un ingeniero eléctrico profesional.",
//         url: "https://www.youtube.com/watch?v=YBqP0J0LDYs",
//         puntosClave: [
//           "Conceptos de carga y corriente",
//           "Explicación de voltaje y potencia",
//           "Elementos básicos de circuitos",
//           "Ejemplos prácticos con simulaciones"
//         ]
//       },
//       {
//         titulo: "Electricidad Básica 0: Entender la Electricidad de la Casa",
//         canal: "Bricocrack",
//         duracion: "18:45 min",
//         descripcion: "Explicación de cómo funciona la electricidad doméstica comparándola con la fontanería para facilitar el entendimiento.",
//         url: "https://www.youtube.com/watch?v=IBXCiZQvBUs",
//         puntosClave: [
//           "Diferencia de potencial y tensión",
//           "Intensidad y resistencia eléctrica",
//           "Cálculo de intensidad por circuito",
//           "Dimensionado de cables y automáticos"
//         ]
//       }
//     ],
//     errores: [
//       {
//         titulo: "7 Errores en Instalaciones Eléctricas que Debes Evitar",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "12:30 min",
//         descripcion: "Los errores más comunes en instalaciones eléctricas residenciales y cómo evitarlos.",
//         url: "https://youtu.be/Lr09BWA6ZaA",
//         puntosClave: [
//           "Errores en conexiones de neutro",
//           "Problemas con la puesta a tierra",
//           "Sobrecarga de circuitos",
//           "Uso incorrecto de materiales"
//         ]
//       },
//       {
//         titulo: "10 Errores de Electricidad Residencial que Debes Evitar",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "15:20 min", 
//         descripcion: "Los 10 errores más críticos en electricidad residencial con soluciones prácticas.",
//         url: "https://youtu.be/nJnAfoNvmHE",
//         puntosClave: [
//           "Errores de cálculo de cargas",
//           "Problemas de aislamiento",
//           "Conexiones mal ejecutadas",
//           "Incumplimiento de normativas"
//         ]
//       }
//     ]
//   };

//   const categorias = [
//     { id: "switches", nombre: "Switches", icono: "⚡", color: "blue" },
//     { id: "outlets", nombre: "Outlets", icono: "🔌", color: "green" },
//     { id: "luces", nombre: "Luces", icono: "💡", color: "yellow" },
//     { id: "ventilacion", nombre: "Ventilación", icono: "🌪️", color: "purple" },
//     { id: "fundamentos", nombre: "Fundamentos", icono: "📚", color: "indigo" },
//     { id: "errores", nombre: "Errores Comunes", icono: "⚠️", color: "red" }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Selector de Categorías */}
//       <div className="flex flex-wrap justify-center gap-2 mb-6">
//         {categorias.map((categoria) => (
//           <button
//             key={categoria.id}
//             onClick={() => setCategoriaActiva(categoria.id)}
//             className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//               categoriaActiva === categoria.id
//                 ? `bg-gradient-to-r from-${categoria.color}-500 to-${categoria.color}-600 text-white shadow-md`
//                 : "bg-gray-100 text-gray-600 hover:text-gray-800"
//             }`}
//           >
//             <span>{categoria.icono}</span>
//             {categoria.nombre}
//           </button>
//         ))}
//       </div>

//       {/* Lista de Tutoriales */}
//       <div className="grid gap-4">
//         {tutoriales[categoriaActiva]?.map((tutorial, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">{tutorial.titulo}</h3>
//                 <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
//                   <span className="flex items-center gap-1">
//                     📺 {tutorial.canal}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     ⏱️ {tutorial.duracion}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{tutorial.descripcion}</p>
//               </div>
//             </div>

//             {/* Puntos Clave */}
//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-700 mb-2">🎯 Puntos Clave:</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {tutorial.puntosClave.map((punto, idx) => (
//                   <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
//                     <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                     {punto}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Botón Ver Tutorial */}
//             <a
//               href={tutorial.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
//             >
//               ▶️ Ver en YouTube
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Nota de Seguridad */}
//       <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
//         <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Importante - Seguridad Eléctrica:</h3>
//         <ul className="text-sm text-yellow-700 space-y-1">
//           <li>• **Siempre apaga la electricidad** en el panel principal antes de trabajar</li>
//           <li>• **Verifica con un probador** que no hay corriente antes de tocar cables</li>
//           <li>• **Consulta códigos locales** - algunos trabajos requieren electricista licenciado</li>
//           <li>• **Usa herramientas aisladas** y equipo de protección personal</li>
//           <li>• **Si no estás seguro, contrata un profesional** - la seguridad es lo primero</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Componente principal
// export default function ZonaPrivada() {
//   const [calculadoraActiva, setCalculadoraActiva] = useState("calibre");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Zona Privada - Calculadoras Eléctricas
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Herramientas profesionales para electricistas
//           </p>
//         </div>

//         {/* Selector de Calculadora */}
//         <div className="flex justify-center mb-8">
//           <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-wrap gap-1">
//             <button
//               onClick={() => setCalculadoraActiva("calibre")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//                 calculadoraActiva === "calibre"
//                   ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               <Zap className="w-5 h-5" />
//               Calibre de Cable
//             </button>
//             <button
//               onClick={() => setCalculadoraActiva("conduit")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//                 calculadoraActiva === "conduit"
//                   ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               <Cable className="w-5 h-5" />
//               Llenado de Conduit
//             </button>
//             <button
//               onClick={() => setCalculadoraActiva("tutoriales")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//                 calculadoraActiva === "tutoriales"
//                   ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               <BookOpen className="w-5 h-5" />
//               Tutoriales
//             </button>
//           </div>
//         </div>

//         {/* Calculadora Activa */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
//           {calculadoraActiva === "calibre" ? (
//             <div>
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
//                   <Zap className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Calculadora de Calibre de Cable
//                 </h2>
//                 <p className="text-gray-600">
//                   Encuentra el calibre mínimo según el amperaje requerido
//                 </p>
//               </div>
//               <CalculadoraCalibreCable />
//             </div>
//           ) : calculadoraActiva === "conduit" ? (
//             <div>
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
//                   <Cable className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Calculadora de Llenado de Conduit
//                 </h2>
//                 <p className="text-gray-600">
//                   Determina el número máximo de cables por conduit
//                 </p>
//               </div>
//               <ConduitFillCalculator />
//             </div>
//           ) : (
//             <div>
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
//                   <BookOpen className="w-8 h-8 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Tutoriales de Electricidad
//                 </h2>
//                 <p className="text-gray-600">
//                   Guías paso a paso para instalaciones eléctricas
//                 </p>
//               </div>
//               <ComponenteTutoriales />
//             </div>
//           )}
//         </div>

//         {/* Información Técnica */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <AlertTriangle className="w-5 h-5 text-amber-500" />
//               Especificaciones Técnicas
//             </h3>
//             <p className="text-sm text-gray-600">
//               Basado en tabla NEC para conductores de cobre THHN, 75°C y 
//               tabla de llenado de conduit al 40% según normativa.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               <AlertTriangle className="w-5 h-5 text-blue-500" />
//               Normativa de Referencia
//             </h3>
//             <p className="text-sm text-gray-600">
//               Basado en California Electrical Code (CEC 2022), equivalente a NEC 2020. 
//               Consulta siempre la normativa vigente y condiciones específicas de instalación.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';
// import ConduitFillCalculator from "./ConduitFillCalculator";

// // Tabla de calibres AWG
// const tablaCalibres = [
//   { amperaje: 15, calibre: "14 AWG" },
//   { amperaje: 20, calibre: "12 AWG" },
//   { amperaje: 30, calibre: "10 AWG" },
//   { amperaje: 50, calibre: "8 AWG" },
//   { amperaje: 65, calibre: "6 AWG" },
//   { amperaje: 85, calibre: "4 AWG" },
//   { amperaje: 100, calibre: "3 AWG" },
//   { amperaje: 115, calibre: "2 AWG" },
//   { amperaje: 130, calibre: "1 AWG" },
//   { amperaje: 150, calibre: "1/0 AWG" },
//   { amperaje: 175, calibre: "2/0 AWG" },
//   { amperaje: 200, calibre: "3/0 AWG" },
//   { amperaje: 230, calibre: "4/0 AWG" },
//   { amperaje: 255, calibre: "250 kcmil" },
//   { amperaje: 285, calibre: "300 kcmil" },
//   { amperaje: 310, calibre: "350 kcmil" },
//   { amperaje: 335, calibre: "400 kcmil" },
//   { amperaje: 380, calibre: "500 kcmil" },
//   { amperaje: 420, calibre: "600 kcmil" },
//   { amperaje: 460, calibre: "700 kcmil" },
//   { amperaje: 475, calibre: "750 kcmil" },
//   { amperaje: 490, calibre: "800 kcmil" },
//   { amperaje: 520, calibre: "900 kcmil" },
//   { amperaje: 545, calibre: "1000 kcmil" },
// ];

// // Componente de Calculadora de Calibre
// function CalculadoraCalibreCable() {
//   const [amperaje, setAmperaje] = useState("");
//   const [resultado, setResultado] = useState("");
//   const [tipoResultado, setTipoResultado] = useState("");

//   const calcular = () => {
//     const amp = parseInt(amperaje, 10);
//     if (isNaN(amp) || amp <= 0) {
//       setResultado("Ingresa un amperaje válido.");
//       setTipoResultado("error");
//       return;
//     }

//     const encontrado = tablaCalibres.find((row) => amp <= row.amperaje);
//     if (encontrado) {
//       setResultado(`Calibre mínimo recomendado: ${encontrado.calibre}`);
//       setTipoResultado("success");
//     } else {
//       setResultado("Amperaje fuera de rango para esta tabla.");
//       setTipoResultado("error");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       calcular();
//     }
//   };

//   const getResultIcon = () => {
//     switch (tipoResultado) {
//       case "success":
//         return "✅";
//       case "error":
//         return "❌";
//       default:
//         return "⚠️";
//     }
//   };

//   const getResultStyle = () => {
//     switch (tipoResultado) {
//       case "success":
//         return "bg-green-50 border-green-200 text-green-800";
//       case "error":
//         return "bg-red-50 border-red-200 text-red-800";
//       default:
//         return "bg-yellow-50 border-yellow-200 text-yellow-800";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <label className="block text-sm font-semibold text-gray-700">
//           Amperaje Requerido (A)
//         </label>
//         <div className="relative">
//           <input
//             type="number"
//             min="1"
//             value={amperaje}
//             onChange={(e) => setAmperaje(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Ingresa el amperaje"
//             className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none pl-12"
//           />
//           <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">⚡</span>
//         </div>
//       </div>

//       <button
//         onClick={calcular}
//         className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
//       >
//         🧮 Calcular Calibre
//       </button>

//       {resultado && (
//         <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${getResultStyle()}`}>
//           <span>{getResultIcon()}</span>
//           <span className="font-semibold">{resultado}</span>
//         </div>
//       )}
//     </div>
//   );
// }

// // Componente de Tutoriales
// function ComponenteTutoriales() {
//   const [categoriaActiva, setCategoriaActiva] = useState("switches");

//   const tutoriales = {
//     switches: [
//       {
//         titulo: "Cómo Instalar un Switch Básico",
//         canal: "The Electrician U",
//         duracion: "27 min",
//         descripcion: "Tutorial completo sobre instalación de switches, desde el cableado hasta la conexión final.",
//         url: "https://www.youtube.com/watch?v=4oRFwlCS4jo",
//         puntosClave: [
//           "Montaje de cajas eléctricas",
//           "Instalación de Romex 12/2",
//           "Conexión de switch de 15A",
//           "Instalación de fixture sin llave"
//         ]
//       },
//       {
//         titulo: "Switch de 3 Vías - Instalación Correcta",
//         canal: "Family Handyman",
//         duracion: "3:47 min",
//         descripcion: "Aprende a cablear switches de 3 vías para controlar una luz desde dos ubicaciones.",
//         url: "https://www.youtube.com/watch?v=Ba8aJoxGmzs",
//         puntosClave: [
//           "Identificación del terminal común",
//           "Etiquetado de cables",
//           "Conexión de ambos switches",
//           "Instalación de la luz"
//         ]
//       },
//       {
//         titulo: "Cómo Encender y Apagar un Foco desde Tres Lugares",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "8:00 min",
//         descripcion: "Tutorial completo para instalar switches de 4 vías y controlar una luz desde tres ubicaciones diferentes.",
//         url: "https://youtu.be/b5vugs1xYiQ",
//         puntosClave: [
//           "Identificación de cables en switches de 4 vías",
//           "Conexión del cable común",
//           "Instalación de múltiples puntos de control",
//           "Pruebas de funcionamiento"
//         ]
//       }
//     ],
//     outlets: [
//       {
//         titulo: "Instalación de Outlets - Tutorial Rápido",
//         canal: "Making Sawdust",
//         duracion: "2:02 min",
//         descripcion: "El tutorial más rápido de YouTube para instalar outlets correctamente.",
//         url: "https://www.youtube.com/watch?v=rTzH5PnmqHk",
//         puntosClave: [
//           "Preparación del cable Romex",
//           "Conexión: Verde-Tierra, Blanco-Plata, Negro-Cobre",
//           "Técnicas de doblado de cables",
//           "Uso de probadores eléctricos"
//         ]
//       },
//       {
//         titulo: "Cómo Hallar la Fase y el Neutro en un Tomacorriente",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "5:15 min", 
//         descripcion: "Método simple y seguro para identificar fase y neutro en outlets usando herramientas básicas.",
//         url: "https://youtu.be/EE0paCB0GCI",
//         puntosClave: [
//           "Uso del probador de voltaje",
//           "Identificación visual de cables",
//           "Medidas de seguridad",
//           "Verificación con multímetro"
//         ]
//       }
//     ],
//     luces: [
//       {
//         titulo: "Instalación de Luces Empotradas (Can Lights)",
//         canal: "The Home Depot",
//         duracion: "4:30 min",
//         descripcion: "Guía completa para instalar luces empotradas paso a paso.",
//         url: "https://www.youtube.com/watch?v=I5v6kRQVUUc",
//         puntosClave: [
//           "Plantillas y marcado en el techo",
//           "Localización de vigas",
//           "Corte de agujeros",
//           "Cableado y montaje"
//         ]
//       }
//     ],
//     ventilacion: [
//       {
//         titulo: "Instalación de Extractor de Baño",
//         canal: "This Old House",
//         duracion: "7:33 min",
//         descripcion: "Instalación profesional de ventilador de baño con timer.",
//         url: "https://www.youtube.com/watch?v=Zm_k6WmH7ys",
//         puntosClave: [
//           "Conexión desde switch existente",
//           "Instalación de timer con múltiples opciones",
//           "Montaje entre vigas",
//           "Ducto hacia exterior"
//         ]
//       }
//     ],
//     fundamentos: [
//       {
//         titulo: "Curso Completo de Electricidad Paso a Paso",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "45:00 min",
//         descripcion: "Curso completo desde conceptos básicos hasta instalaciones prácticas para principiantes.",
//         url: "https://www.youtube.com/watch?v=QgxXUkyeDFs",
//         puntosClave: [
//           "Conceptos básicos de voltaje y corriente",
//           "Instalación de interruptores simples",
//           "Conexión de múltiples focos",
//           "Prácticas de seguridad eléctrica"
//         ]
//       },
//       {
//         titulo: "Electricity for Beginners - Voltage, Current, Power",
//         canal: "RGB Engineering",
//         duracion: "23:32 min",
//         descripcion: "Fundamentos de ingeniería eléctrica explicados por un ingeniero eléctrico profesional.",
//         url: "https://www.youtube.com/watch?v=YBqP0J0LDYs",
//         puntosClave: [
//           "Conceptos de carga y corriente",
//           "Explicación de voltaje y potencia",
//           "Elementos básicos de circuitos",
//           "Ejemplos prácticos con simulaciones"
//         ]
//       },
//       {
//         titulo: "Electricidad Básica 0: Entender la Electricidad de la Casa",
//         canal: "Bricocrack",
//         duracion: "18:45 min",
//         descripcion: "Explicación de cómo funciona la electricidad doméstica comparándola con la fontanería para facilitar el entendimiento.",
//         url: "https://www.youtube.com/watch?v=IBXCiZQvBUs",
//         puntosClave: [
//           "Diferencia de potencial y tensión",
//           "Intensidad y resistencia eléctrica",
//           "Cálculo de intensidad por circuito",
//           "Dimensionado de cables y automáticos"
//         ]
//       }
//     ],
//     errores: [
//       {
//         titulo: "7 Errores en Instalaciones Eléctricas que Debes Evitar",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "12:30 min",
//         descripcion: "Los errores más comunes en instalaciones eléctricas residenciales y cómo evitarlos.",
//         url: "https://youtu.be/Lr09BWA6ZaA",
//         puntosClave: [
//           "Errores en conexiones de neutro",
//           "Problemas con la puesta a tierra",
//           "Sobrecarga de circuitos",
//           "Uso incorrecto de materiales"
//         ]
//       },
//       {
//         titulo: "10 Errores de Electricidad Residencial que Debes Evitar",
//         canal: "Tecnología y Soluciones Ingeniosas",
//         duracion: "15:20 min", 
//         descripcion: "Los 10 errores más críticos en electricidad residencial con soluciones prácticas.",
//         url: "https://youtu.be/nJnAfoNvmHE",
//         puntosClave: [
//           "Errores de cálculo de cargas",
//           "Problemas de aislamiento",
//           "Conexiones mal ejecutadas",
//           "Incumplimiento de normativas"
//         ]
//       }
//     ]
//   };

//   const categorias = [
//     { id: "switches", nombre: "Switches", icono: "⚡", color: "blue" },
//     { id: "outlets", nombre: "Outlets", icono: "🔌", color: "green" },
//     { id: "luces", nombre: "Luces", icono: "💡", color: "yellow" },
//     { id: "ventilacion", nombre: "Ventilación", icono: "🌪️", color: "purple" },
//     { id: "fundamentos", nombre: "Fundamentos", icono: "📚", color: "indigo" },
//     { id: "errores", nombre: "Errores Comunes", icono: "⚠️", color: "red" }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Selector de Categorías */}
//       <div className="flex flex-wrap justify-center gap-2 mb-6">
//         {categorias.map((categoria) => (
//           <button
//             key={categoria.id}
//             onClick={() => setCategoriaActiva(categoria.id)}
//             className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//               categoriaActiva === categoria.id
//                 ? `bg-gradient-to-r from-${categoria.color}-500 to-${categoria.color}-600 text-white shadow-md`
//                 : "bg-gray-100 text-gray-600 hover:text-gray-800"
//             }`}
//           >
//             <span>{categoria.icono}</span>
//             {categoria.nombre}
//           </button>
//         ))}
//       </div>

//       {/* Lista de Tutoriales */}
//       <div className="grid gap-4">
//         {tutoriales[categoriaActiva]?.map((tutorial, index) => (
//           <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex-1">
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">{tutorial.titulo}</h3>
//                 <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
//                   <span className="flex items-center gap-1">
//                     📺 {tutorial.canal}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     ⏱️ {tutorial.duracion}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-3">{tutorial.descripcion}</p>
//               </div>
//             </div>

//             {/* Puntos Clave */}
//             <div className="mb-4">
//               <h4 className="font-semibold text-gray-700 mb-2">🎯 Puntos Clave:</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                 {tutorial.puntosClave.map((punto, idx) => (
//                   <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
//                     <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
//                     {punto}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Botón Ver Tutorial */}
//             <a
//               href={tutorial.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
//             >
//               ▶️ Ver en YouTube
//             </a>
//           </div>
//         ))}
//       </div>

//       {/* Nota de Seguridad */}
//       <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
//         <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Importante - Seguridad Eléctrica:</h3>
//         <ul className="text-sm text-yellow-700 space-y-1">
//           <li>• **Siempre apaga la electricidad** en el panel principal antes de trabajar</li>
//           <li>• **Verifica con un probador** que no hay corriente antes de tocar cables</li>
//           <li>• **Consulta códigos locales** - algunos trabajos requieren electricista licenciado</li>
//           <li>• **Usa herramientas aisladas** y equipo de protección personal</li>
//           <li>• **Si no estás seguro, contrata un profesional** - la seguridad es lo primero</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// // Componente de Notas
// function ComponenteNotas() {
//   const [notes, setNotes] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const savedNotes = localStorage.getItem('electrician-notes');
//     setNotes(savedNotes ? JSON.parse(savedNotes) : []);
//     setIsLoaded(true);
//   }, []);

//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem('electrician-notes', JSON.stringify(notes));
//     }
//   }, [notes, isLoaded]);

//   const createNote = () => {
//     const newNote = {
//       id: Date.now(),
//       title: '',
//       content: '',
//       createdAt: new Date().toLocaleString('es-ES', {
//         day: 'numeric',
//         month: 'long',
//         hour: '2-digit',
//         minute: '2-digit'
//       })
//     };
//     setNotes([newNote, ...notes]);
//   };

//   const updateNote = (id, field, value) => {
//     setNotes(notes.map(note => 
//       note.id === id ? { ...note, [field]: value } : note
//     ));
//   };

//   const deleteNote = (id) => {
//     if (window.confirm('¿Borrar esta nota permanentemente?')) {
//       setNotes(notes.filter(note => note.id !== id));
//     }
//   };

//   const clearAllNotes = () => {
//     if (window.confirm('⚠ ¿Borrar TODAS las notas? Esto no se puede deshacer.')) {
//       setNotes([]);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Controles de notas */}
//       <div className="flex gap-2 mb-6">
//         <button onClick={createNote} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
//           <FaPlus /> Nueva Nota
//         </button>
//         <button onClick={clearAllNotes} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
//           <FaTrash /> Limpiar Todo
//         </button>
//       </div>

//       {/* Lista de notas */}
//       {notes.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
//           <p className="text-gray-600 mb-4">No hay notas aún</p>
//           <button onClick={createNote} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto transition-colors">
//             <FaPlus /> Crear primera nota
//           </button>
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {notes.map(note => (
//             <div key={note.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <input
//                   type="text"
//                   value={note.title}
//                   onChange={(e) => updateNote(note.id, 'title', e.target.value)}
//                   placeholder="Ej: Materiales para instalación"
//                   className="flex-1 text-lg font-semibold border-none border-b-2 border-gray-200 focus:border-blue-500 outline-none pb-2"
//                 />
//                 <button onClick={() => deleteNote(note.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors">
//                   <FaTrash />
//                 </button>
//               </div>
//               <textarea
//                 value={note.content}
//                 onChange={(e) => updateNote(note.id, 'content', e.target.value)}
//                 placeholder="Detalles de la nota..."
//                 className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-vertical"
//               />
//               <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
//                 <FaCalendarAlt />
//                 <span>{note.createdAt}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Componente principal
// const ZonaPrivada = () => {
//   const [calculadoraActiva, setCalculadoraActiva] = useState("calibre");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">
//             Zona Privada - Herramientas Eléctricas
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Herramientas profesionales para electricistas
//           </p>
//         </div>

//         {/* Selector de Herramienta */}
//         <div className="flex justify-center mb-8">
//           <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-wrap gap-1">
//             <button
//               onClick={() => setCalculadoraActiva("calibre")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//                 calculadoraActiva === "calibre"
//                   ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               ⚡ Calibre de Cable
//             </button>
//             <button
//               onClick={() => setCalculadoraActiva("conduit")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//                 calculadoraActiva === "conduit"
//                   ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               🔧 Llenado de Conduit
//             </button>
//             <button
//               onClick={() => setCalculadoraActiva("tutoriales")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//                 calculadoraActiva === "tutoriales"
//                   ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               📚 Tutoriales
//             </button>
//             <button
//               onClick={() => setCalculadoraActiva("notas")}
//               className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
//                 calculadoraActiva === "notas"
//                   ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-800"
//               }`}
//             >
//               📝 Notas
//             </button>
//           </div>
//         </div>

//         {/* Herramienta Activa */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
//           {calculadoraActiva === "calibre" ? (
//             <div>
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
//                   <span className="text-2xl">⚡</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Calculadora de Calibre de Cable
//                 </h2>
//                 <p className="text-gray-600">
//                   Encuentra el calibre mínimo según el amperaje requerido
//                 </p>
//               </div>
//               <CalculadoraCalibreCable />
//             </div>
//           ) : calculadoraActiva === "conduit" ? (
//             <div>
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
//                   <span className="text-2xl">🔧</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Calculadora de Llenado de Conduit
//                 </h2>
//                 <p className="text-gray-600">
//                   Determina el número máximo de cables por conduit
//                 </p>
//               </div>
//               <ConduitFillCalculator />
//             </div>
//           ) : calculadoraActiva === "tutoriales" ? (
//             <div>
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
//                   <span className="text-2xl">📚</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Tutoriales de Electricidad
//                 </h2>
//                 <p className="text-gray-600">
//                   Guías paso a paso para instalaciones eléctricas
//                 </p>
//               </div>
//               <ComponenteTutoriales />
//             </div>
//           ) : (
//             <div>
//               <div className="text-center mb-6">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
//                   <span className="text-2xl">📝</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                   Notas de Trabajo
//                 </h2>
//                 <p className="text-gray-600">
//                   Organiza tus notas, materiales y recordatorios
//                 </p>
//               </div>
//               <ComponenteNotas />
//             </div>
//           )}
//         </div>

//         {/* Información Técnica */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               ⚠️ Especificaciones Técnicas
//             </h3>
//             <p className="text-sm text-gray-600">
//               Basado en tabla NEC para conductores de cobre THHN, 75°C y 
//               tabla de llenado de conduit al 40% según normativa.
//             </p>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//             <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//               📋 Normativa de Referencia
//             </h3>
//             <p className="text-sm text-gray-600">
//               Basado en California Electrical Code (CEC 2022), equivalente a NEC 2020. 
//               Consulta siempre la normativa vigente y condiciones específicas de instalación.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ZonaPrivada;
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import ConduitFillCalculator from "./ConduitFillCalculator";

// Tabla de calibres AWG
const tablaCalibres = [
  { amperaje: 15, calibre: "14 AWG" },
  { amperaje: 20, calibre: "12 AWG" },
  { amperaje: 30, calibre: "10 AWG" },
  { amperaje: 50, calibre: "8 AWG" },
  { amperaje: 65, calibre: "6 AWG" },
  { amperaje: 85, calibre: "4 AWG" },
  { amperaje: 100, calibre: "3 AWG" },
  { amperaje: 115, calibre: "2 AWG" },
  { amperaje: 130, calibre: "1 AWG" },
  { amperaje: 150, calibre: "1/0 AWG" },
  { amperaje: 175, calibre: "2/0 AWG" },
  { amperaje: 200, calibre: "3/0 AWG" },
  { amperaje: 230, calibre: "4/0 AWG" },
  { amperaje: 255, calibre: "250 kcmil" },
  { amperaje: 285, calibre: "300 kcmil" },
  { amperaje: 310, calibre: "350 kcmil" },
  { amperaje: 335, calibre: "400 kcmil" },
  { amperaje: 380, calibre: "500 kcmil" },
  { amperaje: 420, calibre: "600 kcmil" },
  { amperaje: 460, calibre: "700 kcmil" },
  { amperaje: 475, calibre: "750 kcmil" },
  { amperaje: 490, calibre: "800 kcmil" },
  { amperaje: 520, calibre: "900 kcmil" },
  { amperaje: 545, calibre: "1000 kcmil" },
];

// Componente de Calculadora de Calibre
function CalculadoraCalibreCable() {
  const [amperaje, setAmperaje] = useState("");
  const [resultado, setResultado] = useState("");
  const [tipoResultado, setTipoResultado] = useState("");

  const calcular = () => {
    const amp = parseInt(amperaje, 10);
    if (isNaN(amp) || amp <= 0) {
      setResultado("Ingresa un amperaje válido.");
      setTipoResultado("error");
      return;
    }

    const encontrado = tablaCalibres.find((row) => amp <= row.amperaje);
    if (encontrado) {
      setResultado(`Calibre mínimo recomendado: ${encontrado.calibre}`);
      setTipoResultado("success");
    } else {
      setResultado("Amperaje fuera de rango para esta tabla.");
      setTipoResultado("error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calcular();
    }
  };

  const getResultIcon = () => {
    switch (tipoResultado) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "⚠️";
    }
  };

  const getResultStyle = () => {
    switch (tipoResultado) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Amperaje Requerido (A)
        </label>
        <div className="relative">
          <input
            type="number"
            min="1"
            value={amperaje}
            onChange={(e) => setAmperaje(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ingresa el amperaje"
            className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none pl-12"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">⚡</span>
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        🧮 Calcular Calibre
      </button>

      {resultado && (
        <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${getResultStyle()}`}>
          <span>{getResultIcon()}</span>
          <span className="font-semibold">{resultado}</span>
        </div>
      )}
    </div>
  );
}

// Componente de Tutoriales
function ComponenteTutoriales() {
  const [categoriaActiva, setCategoriaActiva] = useState("switches");

  const tutoriales = {
    switches: [
      {
        titulo: "Cómo Instalar un Switch Básico",
        canal: "The Electrician U",
        duracion: "27 min",
        descripcion: "Tutorial completo sobre instalación de switches, desde el cableado hasta la conexión final.",
        url: "https://www.youtube.com/watch?v=4oRFwlCS4jo",
        puntosClave: [
          "Montaje de cajas eléctricas",
          "Instalación de Romex 12/2",
          "Conexión de switch de 15A",
          "Instalación de fixture sin llave"
        ]
      },
      {
        titulo: "Switch de 3 Vías - Instalación Correcta",
        canal: "Family Handyman",
        duracion: "3:47 min",
        descripcion: "Aprende a cablear switches de 3 vías para controlar una luz desde dos ubicaciones.",
        url: "https://www.youtube.com/watch?v=Ba8aJoxGmzs",
        puntosClave: [
          "Identificación del terminal común",
          "Etiquetado de cables",
          "Conexión de ambos switches",
          "Instalación de la luz"
        ]
      },
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
      }
    ],
    outlets: [
      {
        titulo: "Instalación de Outlets - Tutorial Rápido",
        canal: "Making Sawdust",
        duracion: "2:02 min",
        descripcion: "El tutorial más rápido de YouTube para instalar outlets correctamente.",
        url: "https://www.youtube.com/watch?v=rTzH5PnmqHk",
        puntosClave: [
          "Preparación del cable Romex",
          "Conexión: Verde-Tierra, Blanco-Plata, Negro-Cobre",
          "Técnicas de doblado de cables",
          "Uso de probadores eléctricos"
        ]
      },
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
    luces: [
      {
        titulo: "Instalación de Luces Empotradas (Can Lights)",
        canal: "The Home Depot",
        duracion: "4:30 min",
        descripcion: "Guía completa para instalar luces empotradas paso a paso.",
        url: "https://www.youtube.com/watch?v=I5v6kRQVUUc",
        puntosClave: [
          "Plantillas y marcado en el techo",
          "Localización de vigas",
          "Corte de agujeros",
          "Cableado y montaje"
        ]
      }
    ],
    ventilacion: [
      {
        titulo: "Instalación de Extractor de Baño",
        canal: "This Old House",
        duracion: "7:33 min",
        descripcion: "Instalación profesional de ventilador de baño con timer.",
        url: "https://www.youtube.com/watch?v=Zm_k6WmH7ys",
        puntosClave: [
          "Conexión desde switch existente",
          "Instalación de timer con múltiples opciones",
          "Montaje entre vigas",
          "Ducto hacia exterior"
        ]
      }
    ],
    fundamentos: [
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
        titulo: "Electricidad Básica 0: Entender la Electricidad de la Casa",
        canal: "Bricocrack",
        duracion: "18:45 min",
        descripcion: "Explicación de cómo funciona la electricidad doméstica comparándola con la fontanería para facilitar el entendimiento.",
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
    ]
  };

  const categorias = [
    { id: "switches", nombre: "Switches", icono: "⚡", color: "blue" },
    { id: "outlets", nombre: "Outlets", icono: "🔌", color: "green" },
    { id: "luces", nombre: "Luces", icono: "💡", color: "yellow" },
    { id: "ventilacion", nombre: "Ventilación", icono: "🌪️", color: "purple" },
    { id: "fundamentos", nombre: "Fundamentos", icono: "📚", color: "indigo" },
    { id: "errores", nombre: "Errores Comunes", icono: "⚠️", color: "red" }
  ];

  return (
    <div className="space-y-6">
      {/* Selector de Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => setCategoriaActiva(categoria.id)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              categoriaActiva === categoria.id
                ? `bg-gradient-to-r from-${categoria.color}-500 to-${categoria.color}-600 text-white shadow-md`
                : "bg-gray-100 text-gray-600 hover:text-gray-800"
            }`}
          >
            <span>{categoria.icono}</span>
            {categoria.nombre}
          </button>
        ))}
      </div>

      {/* Lista de Tutoriales */}
      <div className="grid gap-4">
        {tutoriales[categoriaActiva]?.map((tutorial, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{tutorial.titulo}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    📺 {tutorial.canal}
                  </span>
                  <span className="flex items-center gap-1">
                    ⏱️ {tutorial.duracion}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{tutorial.descripcion}</p>
              </div>
            </div>

            {/* Puntos Clave */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">🎯 Puntos Clave:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tutorial.puntosClave.map((punto, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
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
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200"
            >
              ▶️ Ver en YouTube
            </a>
          </div>
        ))}
      </div>

      {/* Nota de Seguridad */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
        <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Importante - Seguridad Eléctrica:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• **Siempre apaga la electricidad** en el panel principal antes de trabajar</li>
          <li>• **Verifica con un probador** que no hay corriente antes de tocar cables</li>
          <li>• **Consulta códigos locales** - algunos trabajos requieren electricista licenciado</li>
          <li>• **Usa herramientas aisladas** y equipo de protección personal</li>
          <li>• **Si no estás seguro, contrata un profesional** - la seguridad es lo primero</li>
        </ul>
      </div>
    </div>
  );
}

// Componente de Notas
// function ComponenteNotas() {
//   const [notes, setNotes] = useState([]);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const savedNotes = localStorage.getItem('electrician-notes');
//     setNotes(savedNotes ? JSON.parse(savedNotes) : []);
//     setIsLoaded(true);
//   }, []);

//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem('electrician-notes', JSON.stringify(notes));
//     }
//   }, [notes, isLoaded]);

//   const createNote = () => {
//     const newNote = {
//       id: Date.now(),
//       title: '',
//       content: '',
//       createdAt: new Date().toLocaleString('es-ES', {
//         day: 'numeric',
//         month: 'long',
//         hour: '2-digit',
//         minute: '2-digit'
//       })
//     };
//     setNotes([newNote, ...notes]);
//   };

//   const updateNote = (id, field, value) => {
//     setNotes(notes.map(note => 
//       note.id === id ? { ...note, [field]: value } : note
//     ));
//   };

//   const deleteNote = (id) => {
//     if (window.confirm('¿Borrar esta nota permanentemente?')) {
//       setNotes(notes.filter(note => note.id !== id));
//     }
//   };

//   const clearAllNotes = () => {
//     if (window.confirm('⚠ ¿Borrar TODAS las notas? Esto no se puede deshacer.')) {
//       setNotes([]);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Controles de notas */}
//       <div className="flex gap-2 mb-6">
//         <button onClick={createNote} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
//           <FaPlus /> Nueva Nota
//         </button>
//         <button onClick={clearAllNotes} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
//           <FaTrash /> Limpiar Todo
//         </button>
//       </div>

//       {/* Lista de notas */}
//       {notes.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
//           <p className="text-gray-600 mb-4">No hay notas aún</p>
//           <button onClick={createNote} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 mx-auto transition-colors">
//             <FaPlus /> Crear primera nota
//           </button>
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {notes.map(note => (
//             <div key={note.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
//               <div className="flex justify-between items-start mb-4">
//                 <input
//                   type="text"
//                   value={note.title}
//                   onChange={(e) => updateNote(note.id, 'title', e.target.value)}
//                   placeholder="Ej: Materiales para instalación"
//                   className="flex-1 text-lg font-semibold border-none border-b-2 border-gray-200 focus:border-blue-500 outline-none pb-2"
//                 />
//                 <button onClick={() => deleteNote(note.id)} className="text-red-500 hover:text-red-700 p-2 transition-colors">
//                   <FaTrash />
//                 </button>
//               </div>
//               <textarea
//                 value={note.content}
//                 onChange={(e) => updateNote(note.id, 'content', e.target.value)}
//                 placeholder="Detalles de la nota..."
//                 className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-vertical"
//               />
//               <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
//                 <FaCalendarAlt />
//                 <span>{note.createdAt}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// Componente principal
const ZonaPrivada = () => {
  const [calculadoraActiva, setCalculadoraActiva] = useState("calibre");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
            Zona Privada - Herramientas Eléctricas
          </h1>
          <p className="text-gray-600 text-sm md:text-lg">
            Herramientas profesionales para electricistas
          </p>
        </div>

        {/* Selector de Herramienta - VERSIÓN CORREGIDA */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2">
            {/* Desktop: Botones en fila */}
            <div className="hidden md:flex gap-1">
              <button
                onClick={() => setCalculadoraActiva("calibre")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  calculadoraActiva === "calibre"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                ⚡ Calibre de Cable
              </button>
              <button
                onClick={() => setCalculadoraActiva("conduit")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  calculadoraActiva === "conduit"
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                🔧 Llenado de Conduit
              </button>
              <button
                onClick={() => setCalculadoraActiva("tutoriales")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  calculadoraActiva === "tutoriales"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                📚 Tutoriales
              </button>
              {/* <button
                onClick={() => setCalculadoraActiva("notas")}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  calculadoraActiva === "notas"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                📝 Notas
              </button> */}
            </div>

            {/* Mobile: Grid 2x2 */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              <button
                onClick={() => setCalculadoraActiva("calibre")}
                className={`px-3 py-3 rounded-xl font-semibold transition-all duration-200 flex flex-col items-center gap-1 text-sm ${
                  calculadoraActiva === "calibre"
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="text-lg">⚡</span>
                <span>Calibre</span>
              </button>
              <button
                onClick={() => setCalculadoraActiva("conduit")}
                className={`px-3 py-3 rounded-xl font-semibold transition-all duration-200 flex flex-col items-center gap-1 text-sm ${
                  calculadoraActiva === "conduit"
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="text-lg">🔧</span>
                <span>Conduit</span>
              </button>
              <button
                onClick={() => setCalculadoraActiva("tutoriales")}
                className={`px-3 py-3 rounded-xl font-semibold transition-all duration-200 flex flex-col items-center gap-1 text-sm ${
                  calculadoraActiva === "tutoriales"
                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="text-lg">📚</span>
                <span>Tutoriales</span>
              </button>
              {/* <button
                onClick={() => setCalculadoraActiva("notas")}
                className={`px-3 py-3 rounded-xl font-semibold transition-all duration-200 flex flex-col items-center gap-1 text-sm ${
                  // calculadoraActiva === "notas"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="text-lg">📝</span>
                <span>Notas</span>
              </button> */}
            </div>
          </div>
        </div>

        {/* Herramienta Activa */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-6 border border-gray-100">
          {calculadoraActiva === "calibre" ? (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">⚡</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Calculadora de Calibre de Cable
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Encuentra el calibre mínimo según el amperaje requerido
                </p>
              </div>
              <CalculadoraCalibreCable />
            </div>
          ) : calculadoraActiva === "conduit" ? (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">🔧</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Calculadora de Llenado de Conduit
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Determina el número máximo de cables por conduit
                </p>
              </div>
              <ConduitFillCalculator />
            </div>
          ) : calculadoraActiva === "tutoriales" ? (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">📚</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Tutoriales de Electricidad
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Guías paso a paso para instalaciones eléctricas
                </p>
              </div>
              <ComponenteTutoriales />
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
                  <span className="text-xl md:text-2xl">📝</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  Notas de Trabajo
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Organiza tus notas, materiales y recordatorios
                </p>
              </div>
             {/* <ComponenteNotas /> */}
            </div>
          )}
        </div>

        {/* Información Técnica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm md:text-base">
              ⚠️ Especificaciones Técnicas
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              Basado en tabla NEC para conductores de cobre THHN, 75°C y 
              tabla de llenado de conduit al 40% según normativa.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2 text-sm md:text-base">
              📋 Normativa de Referencia
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              Basado en California Electrical Code (CEC 2022), equivalente a NEC 2020. 
              Consulta siempre la normativa vigente y condiciones específicas de instalación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZonaPrivada;
