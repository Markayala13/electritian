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
        return "bg-[#5ED36A] bg-opacity-20 border-[#5ED36A] text-[#FFFFFF]";
      case "error":
        return "bg-[#9E5CBD] bg-opacity-20 border-[#9E5CBD] text-[#FFFFFF]";
      default:
        return "bg-[#F7B84B] bg-opacity-20 border-[#F7B84B] text-[#FFFFFF]";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-[#FFFFFF]">
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
            className="w-full px-4 py-4 text-lg border-2 border-[#8B8F92] bg-[#5E6468] text-[#FFFFFF] rounded-xl focus:border-[#F7B84B] focus:ring-4 focus:ring-[#F7B84B] focus:ring-opacity-20 transition-all duration-200 outline-none pl-12 placeholder-[#8B8F92]"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#F7B84B]">⚡</span>
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full bg-[#F7B84B] text-[#000000] font-bold py-4 px-6 rounded-xl hover:bg-[#F7B84B] hover:opacity-90 focus:ring-4 focus:ring-[#F7B84B] focus:ring-opacity-20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        🧮 Calcular Calibre
      </button>

      {resultado && (
        <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${getResultStyle()}`}>
          <span>{getResultIcon()}</span>
          <span className="font-semibold text-[#FFFFFF]">{resultado}</span>
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
        titulo: "How to Install a Light Switch / Single Pole Switch",
        canal: "The Electrician U",
        duracion: "15:30 min",
        descripcion: "Tutorial completo para instalar un switch de polo simple paso a paso con todas las técnicas profesionales.",
        url: "https://www.youtube.com/watch?v=ro3DSQQHfbM",
        puntosClave: [
          "Identificación de cables fase y neutro",
          "Preparación de la caja eléctrica",
          "Conexión correcta del switch",
          "Pruebas de funcionamiento"
        ]
      },
      {
        titulo: "The Best Explanation of 3-Way Switching: In Under 3 Minutes!",
        canal: "The Electrician U",
        duracion: "2:45 min",
        descripcion: "Explicación rápida y clara de cómo funcionan los switches de 3 vías y su cableado.",
        url: "https://www.youtube.com/watch?v=RKZrg6XKjak",
        puntosClave: [
          "Funcionamiento de switches de 3 vías",
          "Identificación del terminal común",
          "Conexión de cables viajeros",
          "Principios básicos de control"
        ]
      },
      {
        titulo: "How to wire a switch loop",
        canal: "The Electrician U",
        duracion: "8:15 min",
        descripcion: "Técnica profesional para cablear un switch loop cuando el cable va directo a la luz.",
        url: "https://www.youtube.com/watch?v=invMXtTOMiQ",
        puntosClave: [
          "Identificación de switch loop",
          "Conexión en la caja de la luz",
          "Cableado del switch",
          "Aplicaciones prácticas"
        ]
      },
      {
        titulo: "How to wire and install 4-way switches",
        canal: "The Electrician U",
        duracion: "12:20 min",
        descripcion: "Instalación completa de switches de 4 vías para controlar una luz desde tres o más ubicaciones.",
        url: "https://www.youtube.com/watch?v=-vizSnmtLKw",
        puntosClave: [
          "Configuración de 4 vías",
          "Posicionamiento de switches",
          "Conexión de cables viajeros",
          "Pruebas de funcionamiento"
        ]
      },
      {
        titulo: "How To Install a 3 Way Dimmer Switch! Lutron 3 Way Dimmer Switch",
        canal: "The Electrician U",
        duracion: "10:45 min",
        descripcion: "Instalación profesional de dimmer de 3 vías Lutron con todas las configuraciones necesarias.",
        url: "https://www.youtube.com/watch?v=ObcJPogBdI4",
        puntosClave: [
          "Configuración de dimmer Lutron",
          "Conexión de 3 vías con dimmer",
          "Ajustes de intensidad",
          "Compatibilidad de luces"
        ]
      },
      {
        titulo: "Troubleshooting 3-Way Switches: Why Does My 3-Way Switch Only Work Sometimes?",
        canal: "The Electrician U",
        duracion: "9:30 min",
        descripcion: "Diagnóstico y solución de problemas comunes en switches de 3 vías que funcionan intermitentemente.",
        url: "https://www.youtube.com/watch?v=k2yLAFKkzeQ",
        puntosClave: [
          "Identificación de problemas",
          "Verificación de conexiones",
          "Solución de fallas comunes",
          "Pruebas de diagnóstico"
        ]
      },
      {
        titulo: "How to Install & Program an Occupancy Sensor - Having Your Lights Turn On/Off Automatically",
        canal: "The Electrician U",
        duracion: "14:15 min",
        descripcion: "Instalación y programación de sensores de ocupación para automatización de luces.",
        url: "https://www.youtube.com/watch?v=9lZUP-Fe9to",
        puntosClave: [
          "Instalación del sensor",
          "Configuración de sensibilidad",
          "Programación de tiempos",
          "Aplicaciones prácticas"
        ]
      },
      {
        titulo: "How do I replace a 3-way switch? Where does each wire go?",
        canal: "The Electrician U",
        duracion: "11:20 min",
        descripcion: "Guía paso a paso para reemplazar switches de 3 vías identificando correctamente cada cable.",
        url: "https://www.youtube.com/watch?v=5tD5XEVI2Gc",
        puntosClave: [
          "Identificación de cables",
          "Etiquetado antes de desconectar",
          "Conexión correcta del reemplazo",
          "Verificación de funcionamiento"
        ]
      }
    ],
    outletsBreakers: [
      {
        titulo: "Where and Why Do We Need GFCI Protection?",
        canal: "The Electrician U",
        duracion: "16:45 min",
        descripcion: "Explicación completa de dónde y por qué necesitamos protección GFCI en instalaciones eléctricas residenciales y comerciales.",
        url: "https://www.youtube.com/watch?v=56Oc6cbYuxU",
        puntosClave: [
          "Ubicaciones que requieren GFCI",
          "Principio de funcionamiento GFCI",
          "Códigos y normativas",
          "Instalación y pruebas"
        ]
      },
      {
        titulo: "Electrician U Explains How Receptacles Work",
        canal: "The Electrician U",
        duracion: "14:20 min",
        descripcion: "Explicación detallada de cómo funcionan los receptáculos eléctricos y sus componentes internos.",
        url: "https://www.youtube.com/watch?v=V5_DsWF3EGQ",
        puntosClave: [
          "Componentes internos del outlet",
          "Funcionamiento de contactos",
          "Tipos de receptáculos",
          "Mantenimiento y limpieza"
        ]
      },
      {
        titulo: "Why do outlets have different types of holes?",
        canal: "The Electrician U",
        duracion: "8:30 min",
        descripcion: "Explicación de por qué los outlets tienen diferentes tipos de agujeros y su propósito en la seguridad eléctrica.",
        url: "https://www.youtube.com/watch?v=-UraBUoui2M",
        puntosClave: [
          "Diferencias entre agujeros",
          "Propósito de cada contacto",
          "Estándares de seguridad",
          "Compatibilidad de enchufes"
        ]
      },
      {
        titulo: "How Electricians MAKE-READY a Receptacle",
        canal: "The Electrician U",
        duracion: "12:15 min",
        descripcion: "Proceso profesional de preparación y acondicionamiento de receptáculos para instalación y uso.",
        url: "https://www.youtube.com/watch?v=60xQH_i0qO8",
        puntosClave: [
          "Preparación de la caja",
          "Acondicionamiento de cables",
          "Instalación del receptáculo",
          "Pruebas de funcionamiento"
        ]
      },
      {
        titulo: "How to wire and install an electrical outlet receptacle",
        canal: "The Electrician U",
        duracion: "18:40 min",
        descripcion: "Tutorial completo paso a paso para cablear e instalar un receptáculo eléctrico de forma profesional y segura.",
        url: "https://www.youtube.com/watch?v=QuR6_i27WcI&t=29s",
        puntosClave: [
          "Identificación de cables",
          "Conexión correcta de terminales",
          "Instalación en caja",
          "Verificación de seguridad"
        ]
      },
      {
        titulo: "How to wire and install an electrical outlet receptacle (Full Version)",
        canal: "The Electrician U",
        duracion: "18:40 min",
        descripcion: "Versión completa del tutorial de instalación de receptáculos con todos los detalles y técnicas profesionales.",
        url: "https://www.youtube.com/watch?v=QuR6_i27WcI",
        puntosClave: [
          "Técnicas profesionales completas",
          "Herramientas necesarias",
          "Medidas de seguridad",
          "Troubleshooting común"
        ]
      },
      {
        titulo: "How to work with live circuits: circuit breaker replacement",
        canal: "The Electrician U",
        duracion: "22:15 min",
        descripcion: "Técnicas seguras para trabajar con circuitos energizados durante el reemplazo de breakers.",
        url: "https://www.youtube.com/watch?v=5YNLC80clS8&t=13s",
        puntosClave: [
          "Medidas de seguridad con circuitos vivos",
          "Procedimiento de reemplazo",
          "Herramientas de protección",
          "Verificación post-instalación"
        ]
      },
      {
        titulo: "Fault detection devices: GFCI, AFCI, DF, AFGFCI",
        canal: "The Electrician U",
        duracion: "19:30 min",
        descripcion: "Explicación completa de todos los dispositivos de detección de fallas y sus aplicaciones.",
        url: "https://www.youtube.com/watch?v=86fg_4dSQUM",
        puntosClave: [
          "Tipos de dispositivos de protección",
          "Diferencias entre GFCI y AFCI",
          "Aplicaciones de cada tipo",
          "Códigos y normativas"
        ]
      },
      {
        titulo: "Where and Why Do We Need AFCI Protection?",
        canal: "The Electrician U",
        duracion: "17:45 min",
        descripcion: "Guía completa sobre dónde y por qué necesitamos protección AFCI en instalaciones eléctricas.",
        url: "https://www.youtube.com/watch?v=jMjBGzyoWUY",
        puntosClave: [
          "Ubicaciones que requieren AFCI",
          "Prevención de incendios eléctricos",
          "Códigos de instalación",
          "Instalación y configuración"
        ]
      },
      {
        titulo: "Electrician Explains How Circuit Breakers And Electrical Panels Work",
        canal: "The Electrician U",
        duracion: "25:20 min",
        descripcion: "Explicación detallada de cómo funcionan los breakers y paneles eléctricos desde la teoría hasta la práctica.",
        url: "https://www.youtube.com/watch?v=t2de7A2d3gE",
        puntosClave: [
          "Funcionamiento de breakers",
          "Componentes del panel eléctrico",
          "Distribución de circuitos",
          "Mantenimiento del panel"
        ]
      },
      {
        titulo: "AFCI Breaker Vs Circuit Breaker- What's The Difference?",
        canal: "The Electrician U",
        duracion: "14:10 min",
        descripcion: "Comparación detallada entre breakers AFCI y breakers convencionales, sus diferencias y aplicaciones.",
        url: "https://www.youtube.com/watch?v=8HJXsJNR0Q8",
        puntosClave: [
          "Diferencias entre AFCI y convencional",
          "Funciones de protección",
          "Aplicaciones específicas",
          "Costo vs beneficio"
        ]
      },
      {
        titulo: "Where Should We Be Using Dual Function Breakers?",
        canal: "The Electrician U",
        duracion: "16:35 min",
        descripcion: "Guía sobre cuándo y dónde usar breakers de función dual que combinan GFCI y AFCI.",
        url: "https://www.youtube.com/watch?v=eVyLSkEN908",
        puntosClave: [
          "Aplicaciones de breakers duales",
          "Combinación GFCI/AFCI",
          "Instalación y configuración",
          "Ventajas y consideraciones"
        ]
      }
    ],
    panels: [
      {
        titulo: "How to wire a subpanel: VERY DETAILED INSTALLATION! From start to finish",
        canal: "The Electrician U",
        duracion: "32:15 min",
        descripcion: "Instalación completa y muy detallada de un subpanel desde el inicio hasta el final con todas las técnicas profesionales.",
        url: "https://www.youtube.com/watch?v=gfaw-XAvn4M",
        puntosClave: [
          "Planificación de la instalación",
          "Cableado del subpanel",
          "Conexión al panel principal",
          "Pruebas y verificación final"
        ]
      },
      {
        titulo: "DIY Sub Panel Install: COMPLETE Tutorial, Save Thousands!",
        canal: "The Electrician U",
        duracion: "28:45 min",
        descripcion: "Tutorial completo para instalar un subpanel por tu cuenta, ahorrando miles de dólares en costos de instalación.",
        url: "https://www.youtube.com/watch?v=uThjbVDcpxo",
        puntosClave: [
          "Herramientas necesarias",
          "Procedimiento paso a paso",
          "Medidas de seguridad",
          "Ahorro en costos"
        ]
      },
      {
        titulo: "Electrical Panel Upgrade | EASY 200 AMP Main Panel Replacement | FULL TUTORIAL By MASTER ELECTRICIAN",
        canal: "The Electrician U",
        duracion: "45:20 min",
        descripcion: "Actualización completa de panel principal a 200 amperios con tutorial detallado de un electricista maestro.",
        url: "https://www.youtube.com/watch?v=gDozp7t7A0Y",
        puntosClave: [
          "Actualización a 200 amperios",
          "Reemplazo del panel principal",
          "Técnicas de electricista maestro",
          "Cumplimiento de códigos"
        ]
      },
      {
        titulo: "¿Cómo funcionan los paneles eléctricos? ¡Una explicación de todas las partes!",
        canal: "The Electrician U",
        duracion: "24:30 min",
        descripcion: "Explicación completa de cómo funcionan los paneles eléctricos y todas sus partes componentes.",
        url: "https://www.youtube.com/watch?v=YaDpoT8PJA4",
        puntosClave: [
          "Componentes del panel eléctrico",
          "Funcionamiento de cada parte",
          "Distribución de energía",
          "Mantenimiento básico"
        ]
      },
      {
        titulo: "How to wire a main electrical panel for a house: Load center and design tips.",
        canal: "The Electrician U",
        duracion: "35:15 min",
        descripcion: "Cableado de panel principal residencial con consejos de diseño y centro de carga.",
        url: "https://www.youtube.com/watch?v=O4HJEX4i8Ic",
        puntosClave: [
          "Diseño del panel principal",
          "Distribución de circuitos",
          "Centro de carga",
          "Consejos de diseño profesional"
        ]
      }
    ],
    bathroomFanLights: [
      {
        titulo: "Install Panasonic Whisper Bathroom Exhaust Fan Like a Pro",
        canal: "This Old House",
        duracion: "24:15 min",
        descripcion: "Instalación profesional del ventilador de baño Panasonic Whisper con técnicas de electricista experto.",
        url: "https://www.youtube.com/watch?v=nUM2XsfHvNI",
        puntosClave: [
          "Instalación del Panasonic Whisper",
          "Técnicas profesionales",
          "Conexión eléctrica",
          "Ducto y ventilación"
        ]
      },
      {
        titulo: "How to replace and install a bathroom exhaust fan",
        canal: "The Home Depot",
        duracion: "18:30 min",
        descripcion: "Guía completa para reemplazar e instalar un ventilador de extracción de baño paso a paso.",
        url: "https://www.youtube.com/watch?v=Igim_iXOJMQ",
        puntosClave: [
          "Reemplazo de ventilador",
          "Instalación paso a paso",
          "Conexión de cables",
          "Mantenimiento del ducto"
        ]
      },
      {
        titulo: "The Best Way To Install String Lights | Quick and Easy Cable Kit",
        canal: "The Electrician U",
        duracion: "12:45 min",
        descripcion: "Instalación rápida y fácil de luces de cadena usando kit de cable profesional.",
        url: "https://www.youtube.com/watch?v=inKEq5dcFPU",
        puntosClave: [
          "Kit de cable para luces",
          "Instalación rápida",
          "Técnicas profesionales",
          "Aplicaciones exteriores"
        ]
      },
      {
        titulo: "Under Cabinet Light Install",
        canal: "The Electrician U",
        duracion: "16:20 min",
        descripcion: "Instalación profesional de luces bajo gabinete para cocinas y áreas de trabajo.",
        url: "https://www.youtube.com/watch?v=WXg9uFrZexo",
        puntosClave: [
          "Instalación bajo gabinete",
          "Conexión de luces LED",
          "Posicionamiento correcto",
          "Control de interruptores"
        ]
      },
      {
        titulo: "How to Install a Halo Canless LED Light in Your Ceiling",
        canal: "The Electrician U",
        duracion: "14:30 min",
        descripcion: "Instalación de luces LED Halo sin caja en el techo para un acabado limpio y moderno.",
        url: "https://www.youtube.com/watch?v=b53oRig1GVA",
        puntosClave: [
          "Luces LED sin caja",
          "Instalación en techo",
          "Acabado limpio",
          "Técnicas de corte"
        ]
      },
      {
        titulo: "How to Install a 240W High Bay Light in a Storage Room | JC-LGL LED Lighting",
        canal: "The Electrician U",
        duracion: "20:15 min",
        descripcion: "Instalación de luz de alta bahía LED de 240W para almacenes y espacios comerciales.",
        url: "https://www.youtube.com/watch?v=VcIbl8yNCUs",
        puntosClave: [
          "Luz de alta bahía LED",
          "Instalación en almacén",
          "Conexión de alta potencia",
          "Posicionamiento estratégico"
        ]
      },
      {
        titulo: "How to Install LED Recessed Down Lights with NIGHT LIGHT option !! NO Attic Space Needed",
        canal: "The Electrician U",
        duracion: "18:45 min",
        descripcion: "Instalación de luces empotradas LED con opción de luz nocturna sin necesidad de espacio en ático.",
        url: "https://www.youtube.com/watch?v=XlU-dWaW--Y",
        puntosClave: [
          "Luces empotradas LED",
          "Opción de luz nocturna",
          "Instalación sin ático",
          "Conexión de controles"
        ]
      },
      {
        titulo: "Convert Fluorescent Tube Lights to LED - Easy Ballast Bypass Instructional | Builds by Maz",
        canal: "Builds by Maz",
        duracion: "22:30 min",
        descripcion: "Conversión fácil de luces fluorescentes a LED con bypass del balastro paso a paso.",
        url: "https://www.youtube.com/watch?v=zc-29W_p1M4",
        puntosClave: [
          "Conversión fluorescente a LED",
          "Bypass del balastro",
          "Ahorro de energía",
          "Instalación paso a paso"
        ]
      },
      {
        titulo: "Planning Your Installation",
        canal: "The Electrician U",
        duracion: "15:40 min",
        descripcion: "Guía de planificación para instalaciones de iluminación eléctrica profesional.",
        url: "https://www.youtube.com/watch?v=PyxeVhGRdB4",
        puntosClave: [
          "Planificación de instalación",
          "Cálculos de iluminación",
          "Selección de productos",
          "Preparación del trabajo"
        ]
      }
    ],
    casetaLutron: [
      {
        titulo: "Lutron Caseta Switch Installation and Setup",
        canal: "Lutron",
        duracion: "18:30 min",
        descripcion: "Instalación y configuración completa del switch inteligente Lutron Caseta con todas las técnicas profesionales.",
        url: "https://www.youtube.com/watch?v=-YgqqmYzQww",
        puntosClave: [
          "Instalación del switch Caseta",
          "Configuración inicial",
          "Conexión de cables",
          "Pruebas de funcionamiento"
        ]
      },
      {
        titulo: "HOW TO CONNECT LUTRON SMART DIMMER. CASÉTA WIRELESS.",
        canal: "Lutron",
        duracion: "15:45 min",
        descripcion: "Conexión y configuración del dimmer inteligente inalámbrico Lutron Caseta para control de intensidad.",
        url: "https://www.youtube.com/watch?v=zuPitEENApE",
        puntosClave: [
          "Conexión del dimmer inalámbrico",
          "Configuración de intensidad",
          "Control remoto",
          "Compatibilidad de luces"
        ]
      },
      {
        titulo: "How To Set Up Lutron Caseta Motion Sensor & Occupancy Sensor",
        canal: "Lutron",
        duracion: "22:15 min",
        descripcion: "Configuración completa de sensores de movimiento y ocupación Lutron Caseta para automatización.",
        url: "https://www.youtube.com/watch?v=7x_Rsh7J4BE",
        puntosClave: [
          "Instalación de sensores",
          "Configuración de sensibilidad",
          "Programación de tiempos",
          "Aplicaciones prácticas"
        ]
      },
      {
        titulo: "How to configure Lutron Caseta Dimmer with Alexa. SMART HOME",
        canal: "Lutron",
        duracion: "12:30 min",
        descripcion: "Configuración del dimmer Lutron Caseta con Alexa para control por voz en hogares inteligentes.",
        url: "https://www.youtube.com/watch?v=SWNMBJCKLVM",
        puntosClave: [
          "Integración con Alexa",
          "Configuración de voz",
          "Comandos de control",
          "Automatización del hogar"
        ]
      },
      {
        titulo: "How to install the Lutron Caseta dimmer",
        canal: "Lutron",
        duracion: "16:20 min",
        descripcion: "Instalación paso a paso del dimmer Lutron Caseta con técnicas profesionales y consejos.",
        url: "https://www.youtube.com/watch?v=wYUT0viLoGY",
        puntosClave: [
          "Instalación del dimmer",
          "Conexión de cables",
          "Configuración básica",
          "Troubleshooting común"
        ]
      },
      {
        titulo: "Lutron Caseta Smart Switch and Motion Sensor | NOT What I Expected",
        canal: "Review Channel",
        duracion: "25:40 min",
        descripcion: "Revisión honesta del switch inteligente y sensor de movimiento Lutron Caseta con expectativas vs realidad.",
        url: "https://www.youtube.com/watch?v=PJ5q09qbQWo",
        puntosClave: [
          "Revisión del producto",
          "Expectativas vs realidad",
          "Pros y contras",
          "Recomendaciones"
        ]
      },
      {
        titulo: "Review & Programming Caseta Wireless Motion Sensor + Review 2020 Updates",
        canal: "Review Channel",
        duracion: "28:15 min",
        descripcion: "Revisión y programación del sensor de movimiento inalámbrico Caseta con actualizaciones de 2020.",
        url: "https://www.youtube.com/watch?v=EQsLgQI80Js",
        puntosClave: [
          "Actualizaciones 2020",
          "Programación avanzada",
          "Nuevas características",
          "Mejoras de rendimiento"
        ]
      },
      {
        titulo: "How to install a Lutron Maestro Motion Sensor Switch | No Neutral Required",
        canal: "Lutron",
        duracion: "14:50 min",
        descripcion: "Instalación del switch sensor de movimiento Lutron Maestro que no requiere cable neutro.",
        url: "https://www.youtube.com/watch?v=4kIEoL0X4EM",
        puntosClave: [
          "Instalación sin neutro",
          "Switch Maestro",
          "Sensor de movimiento",
          "Aplicaciones especiales"
        ]
      }
    ],
    bendingPipes: [
      {
        titulo: "Bending Conduit Part 1 of 5 - Introduction to Conduit Bending",
        canal: "Polly Friendshuh",
        duracion: "18:30 min",
        descripcion: "Primera parte de la serie completa de doblado de conductos. Introducción a herramientas, tipos de conductos y conceptos básicos.",
        url: "https://www.youtube.com/watch?v=G2uEOMwDEJ0&t=199s",
        puntosClave: [
          "Introducción a herramientas de doblado",
          "Tipos de conductos EMT",
          "Conceptos básicos de doblado",
          "Medidas y cálculos iniciales"
        ]
      },
      {
        titulo: "Bending Conduit Part 2 of 5 - 90 Degree Bends",
        canal: "Polly Friendshuh",
        duracion: "22:15 min",
        descripcion: "Segunda parte: Técnicas profesionales para doblar conductos en 90 grados con precisión y exactitud.",
        url: "https://www.youtube.com/watch?v=Vqz29dubjgM",
        puntosClave: [
          "Técnicas de doblado de 90°",
          "Uso correcto del bender",
          "Medidas y marcado",
          "Verificación de ángulos"
        ]
      },
      {
        titulo: "Bending Conduit Part 3 of 5 - Offset Bends",
        canal: "Polly Friendshuh",
        duracion: "25:40 min",
        descripcion: "Tercera parte: Aprende a hacer offsets (desplazamientos) en conductos para evitar obstáculos y obstrucciones.",
        url: "https://www.youtube.com/watch?v=FXo5D-OXmaw&t=257s",
        puntosClave: [
          "Cálculo de offsets",
          "Técnicas de doblado offset",
          "Aplicaciones prácticas",
          "Medidas de desplazamiento"
        ]
      },
      {
        titulo: "Bending Conduit Part 4 of 5 - Three Point Saddle",
        canal: "Polly Friendshuh",
        duracion: "28:20 min",
        descripcion: "Cuarta parte: Técnica avanzada de silla de montar de 3 puntos para rodear obstáculos grandes.",
        url: "https://www.youtube.com/watch?v=mRtKWp2YJ5Q",
        puntosClave: [
          "Cálculo de silla de 3 puntos",
          "Marcado de puntos de doblado",
          "Técnica de doblado secuencial",
          "Verificación de resultados"
        ]
      },
      {
        titulo: "Bending Conduit Part 5 of 5 - Four Point Saddle",
        canal: "Polly Friendshuh",
        duracion: "31:15 min",
        descripcion: "Quinta y última parte: Silla de montar de 4 puntos para obstáculos muy grandes y técnicas avanzadas.",
        url: "https://www.youtube.com/watch?v=gCIgEO1LvG0",
        puntosClave: [
          "Cálculo de silla de 4 puntos",
          "Técnicas avanzadas de doblado",
          "Aplicaciones en proyectos grandes",
          "Trucos profesionales"
        ]
      },
      {
        titulo: "How To Bend EMT Conduit For Beginners!",
        canal: "The Electrician U",
        duracion: "15:45 min",
        descripcion: "Tutorial completo para principiantes sobre doblado de conductos EMT con técnicas básicas y consejos profesionales.",
        url: "https://www.youtube.com/watch?v=r3h97SfQYYI",
        puntosClave: [
          "Herramientas básicas necesarias",
          "Técnicas de doblado para principiantes",
          "Errores comunes a evitar",
          "Consejos de seguridad"
        ]
      },
      {
        titulo: "Cómo doblar conductos/tubos EMT: CÓMO LOS ELECTRICISTAS DOBLAN CONEXIONES DE 90°",
        canal: "Electrician U",
        duracion: "12:30 min",
        descripcion: "Técnica profesional para doblar conexiones de 90 grados como lo hacen los electricistas experimentados.",
        url: "https://www.youtube.com/watch?v=5L5Kujr98Cg",
        puntosClave: [
          "Técnica profesional de 90°",
          "Marcado preciso de puntos",
          "Uso eficiente del bender",
          "Verificación de resultados"
        ]
      },
      {
        titulo: "Flexión EMT: Cómo hacer una flexión de silla de montar de 3 puntos sin gráficos ni aplicaciones",
        canal: "Electrician U",
        duracion: "20:15 min",
        descripcion: "Método manual para calcular y hacer sillas de montar de 3 puntos sin necesidad de gráficos o aplicaciones.",
        url: "https://www.youtube.com/watch?v=CoFGJvxZg8s",
        puntosClave: [
          "Cálculo manual de silla de 3 puntos",
          "Fórmulas matemáticas simples",
          "Técnica sin herramientas digitales",
          "Aplicación práctica en campo"
        ]
      }
    ]
  };

  const categorias = [
    { id: "switches", nombre: "Switches", icono: "⚡", color: "blue" },
    { id: "outletsBreakers", nombre: "Outlets & Breakers", icono: "🔌", color: "green" },
    { id: "panels", nombre: "Panels", icono: "📊", color: "orange" },
    { id: "bathroomFanLights", nombre: "Bathroom Fan & Lights", icono: "💡", color: "yellow" },
    { id: "casetaLutron", nombre: "Caseta Lutron", icono: "🏠", color: "purple" },
    { id: "bendingPipes", nombre: "Bending Pipes", icono: "🔧", color: "red" }
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
        {tutoriales[categoriaActiva]?.length > 0 ? (
          tutoriales[categoriaActiva].map((tutorial, index) => (
            <div key={index} className="bg-[#1E1D1A] rounded-xl shadow-lg p-6 border border-[#F7B84B] hover:shadow-xl transition-all duration-300" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
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
                ▶️ Ver en YouTube
              </a>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-[#1E1D1A] rounded-xl border-2 border-dashed border-[#F7B84B]" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
            <p className="text-[#FFFFFF] mb-4">📚 Tutoriales en preparación para esta categoría</p>
            <p className="text-sm text-[#8B8F92]">Próximamente: Tutoriales profesionales de {categorias.find(cat => cat.id === categoriaActiva)?.nombre}</p>
          </div>
        )}
      </div>

      {/* Nota de Seguridad */}
      <div className="bg-[#1E1D1A] border-l-4 border-[#F7B84B] p-6 rounded-r-xl" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
        <h3 className="font-semibold text-[#F7B84B] mb-3">⚠️ Importante - Seguridad Eléctrica:</h3>
        <ul className="text-sm text-[#FFFFFF] space-y-1">
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

// Componente principal
const ZonaPrivada = () => {
  const [calculadoraActiva, setCalculadoraActiva] = useState("calibre");

  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div
      className="relative min-h-screen bg-[#1E1D1A] text-white overflow-hidden px-4"
      style={{
        minHeight: '100vh',
      }}
    >
      {/* Overlay de fondo */}
      <div className="absolute inset-0 z-10 bg-[#1E1D1A]" aria-hidden="true" />
      <div className="relative z-20 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-6 md:mt-10">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#F7B84B] mb-4 tracking-wider">
            Zona Privada - Herramientas Eléctricas
          </h1>
          <p className="text-[#8B8F92] text-base md:text-lg mb-2 font-medium">
            Herramientas profesionales para electricistas
          </p>
        </div>
        {/* Selector de Herramienta */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="bg-[#8B8F92] bg-opacity-20 rounded-xl p-2 md:p-4 w-full max-w-2xl flex flex-col md:flex-row gap-2 md:gap-4" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
            {/* Desktop: Botones en fila */}
            <div className="flex flex-row md:gap-2 gap-1 w-full justify-center">
              <button
                onClick={() => setCalculadoraActiva("calibre")}
                className={`flex-1 px-3 py-3 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap text-xs md:text-base ${
                  calculadoraActiva === "calibre"
                    ? "bg-[#F7B84B] text-[#000000]"
                    : "text-[#8B8F92] font-regular"
                }`}
              >
                ⚡ Calibre de Cable
              </button>
              <button
                onClick={() => setCalculadoraActiva("conduit")}
                className={`flex-1 px-3 py-3 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap text-xs md:text-base ${
                  calculadoraActiva === "conduit"
                    ? "bg-[#F7B84B] text-[#000000]"
                    : "text-[#8B8F92] font-regular"
                }`}
              >
                🔧 Llenado de Conduit
              </button>
              <button
                onClick={() => setCalculadoraActiva("tutoriales")}
                className={`flex-1 px-3 py-3 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap text-xs md:text-base ${
                  calculadoraActiva === "tutoriales"
                    ? "bg-[#F7B84B] text-[#000000]"
                    : "text-[#8B8F92] font-regular"
                }`}
              >
                📚 Tutoriales
              </button>
            </div>
          </div>
        </div>
        {/* Herramienta Activa */}
        <div className="mb-10 md:mb-12">
          {calculadoraActiva === "calibre" ? (
            <div className="bg-[#8B8F92] bg-opacity-10 rounded-xl p-6 md:p-10 mb-8" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-[#28ACA6] rounded-full mb-5">
                  <span className="text-2xl md:text-3xl text-[#FFFFFF]">⚡</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#F7B84B] mb-3 tracking-wider">
                  Calculadora de Calibre de Cable
                </h2>
                <p className="text-[#8B8F92] text-base md:text-lg mb-2 font-medium">
                  Encuentra el calibre mínimo según el amperaje requerido
                </p>
              </div>
              <CalculadoraCalibreCable />
            </div>
          ) : calculadoraActiva === "conduit" ? (
            <div className="bg-[#8B8F92] bg-opacity-10 rounded-xl p-6 md:p-10 mb-8" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-[#5ED36A] rounded-full mb-5">
                  <span className="text-2xl md:text-3xl text-[#FFFFFF]">🔧</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#F7B84B] mb-3 tracking-wider">
                  Calculadora de Llenado de Conduit
                </h2>
                <p className="text-[#8B8F92] text-base md:text-lg mb-2 font-medium">
                  Determina el número máximo de cables por conduit
                </p>
              </div>
              <ConduitFillCalculator />
            </div>
          ) : calculadoraActiva === "tutoriales" ? (
            <div className="bg-[#8B8F92] bg-opacity-10 rounded-xl p-6 md:p-10 mb-8" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-[#9E5CBD] rounded-full mb-5">
                  <span className="text-2xl md:text-3xl text-[#FFFFFF]">📚</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#F7B84B] mb-3 tracking-wider">
                  Tutoriales de Electricidad
                </h2>
                <p className="text-[#8B8F92] text-base md:text-lg mb-2 font-medium">
                  Guías paso a paso para instalaciones eléctricas
                </p>
              </div>
              <ComponenteTutoriales />
            </div>
          ) : (
            <div className="bg-[#23272F] rounded-2xl shadow-2xl p-6 md:p-10 border-2 border-[#00BFA6] mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-[#00BFA6] rounded-full mb-5 shadow-lg">
                  <span className="text-2xl md:text-3xl text-[#FFD700]">📝</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#00BFA6] mb-3 drop-shadow tracking-wide">
                  Notas de Trabajo
                </h2>
                <p className="text-[#B0B8C1] text-base md:text-lg mb-2 font-medium">
                  Organiza tus notas, materiales y recordatorios
                </p>
              </div>
              {/* <ComponenteNotas /> */}
            </div>
          )}
        </div>
        {/* Información Técnica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-[#8B8F92] bg-opacity-10 rounded-xl p-4 md:p-6" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
            <h3 className="font-semibold text-[#F7B84B] mb-2 flex items-center gap-2 text-sm md:text-base">
              ⚠️ Especificaciones Técnicas
            </h3>
            <p className="text-xs md:text-sm text-[#8B8F92]">
              Basado en tabla NEC para conductores de cobre THHN, 75°C y 
              tabla de llenado de conduit al 40% según normativa.
            </p>
          </div>

          <div className="bg-[#8B8F92] bg-opacity-10 rounded-xl p-4 md:p-6" style={{boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}>
            <h3 className="font-semibold text-[#F7B84B] mb-2 flex items-center gap-2 text-sm md:text-base">
              📋 Normativa de Referencia
            </h3>
            <p className="text-xs md:text-sm text-[#8B8F92]">
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
