import React, { useState } from "react";
import { Zap, Calculator, AlertTriangle, CheckCircle, XCircle, Thermometer, Settings } from "lucide-react";

// Tabla de calibres AWG para COBRE 60°C (140°F)
const tablaCobrre60C = [
  { amperaje: 15, calibre: "14 AWG" },
  { amperaje: 20, calibre: "12 AWG" },
  { amperaje: 30, calibre: "10 AWG" },
  { amperaje: 40, calibre: "8 AWG" },
  { amperaje: 55, calibre: "6 AWG" },
  { amperaje: 70, calibre: "4 AWG" },
  { amperaje: 85, calibre: "3 AWG" },
  { amperaje: 95, calibre: "2 AWG" },
  { amperaje: 110, calibre: "1 AWG" },
  { amperaje: 125, calibre: "1/0 AWG" },
  { amperaje: 145, calibre: "2/0 AWG" },
  { amperaje: 165, calibre: "3/0 AWG" },
  { amperaje: 195, calibre: "4/0 AWG" },
  { amperaje: 215, calibre: "250 kcmil" },
  { amperaje: 240, calibre: "300 kcmil" },
  { amperaje: 260, calibre: "350 kcmil" },
  { amperaje: 280, calibre: "400 kcmil" },
  { amperaje: 320, calibre: "500 kcmil" },
  { amperaje: 350, calibre: "600 kcmil" },
  { amperaje: 385, calibre: "700 kcmil" },
  { amperaje: 400, calibre: "750 kcmil" },
  { amperaje: 410, calibre: "800 kcmil" },
  { amperaje: 435, calibre: "900 kcmil" },
  { amperaje: 455, calibre: "1000 kcmil" },
  { amperaje: 495, calibre: "1250 kcmil" },
  { amperaje: 525, calibre: "1500 kcmil" },
  { amperaje: 545, calibre: "1750 kcmil" },
  { amperaje: 555, calibre: "2000 kcmil" },
];

// Tabla de calibres AWG para COBRE 75°C (167°F)
const tablaCobrre75C = [
  { amperaje: 20, calibre: "14 AWG" },
  { amperaje: 25, calibre: "12 AWG" },
  { amperaje: 35, calibre: "10 AWG" },
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
  { amperaje: 590, calibre: "1250 kcmil" },
  { amperaje: 625, calibre: "1500 kcmil" },
  { amperaje: 650, calibre: "1750 kcmil" },
  { amperaje: 665, calibre: "2000 kcmil" },
];

// Tabla de calibres AWG para COBRE 90°C (194°F)
const tablaCobrre90C = [
  { amperaje: 25, calibre: "14 AWG" },
  { amperaje: 30, calibre: "12 AWG" },
  { amperaje: 40, calibre: "10 AWG" },
  { amperaje: 55, calibre: "8 AWG" },
  { amperaje: 75, calibre: "6 AWG" },
  { amperaje: 95, calibre: "4 AWG" },
  { amperaje: 115, calibre: "3 AWG" },
  { amperaje: 130, calibre: "2 AWG" },
  { amperaje: 145, calibre: "1 AWG" },
  { amperaje: 170, calibre: "1/0 AWG" },
  { amperaje: 195, calibre: "2/0 AWG" },
  { amperaje: 225, calibre: "3/0 AWG" },
  { amperaje: 260, calibre: "4/0 AWG" },
  { amperaje: 290, calibre: "250 kcmil" },
  { amperaje: 320, calibre: "300 kcmil" },
  { amperaje: 350, calibre: "350 kcmil" },
  { amperaje: 380, calibre: "400 kcmil" },
  { amperaje: 430, calibre: "500 kcmil" },
  { amperaje: 475, calibre: "600 kcmil" },
  { amperaje: 520, calibre: "700 kcmil" },
  { amperaje: 535, calibre: "750 kcmil" },
  { amperaje: 555, calibre: "800 kcmil" },
  { amperaje: 585, calibre: "900 kcmil" },
  { amperaje: 615, calibre: "1000 kcmil" },
  { amperaje: 665, calibre: "1250 kcmil" },
  { amperaje: 705, calibre: "1500 kcmil" },
  { amperaje: 735, calibre: "1750 kcmil" },
  { amperaje: 750, calibre: "2000 kcmil" },
];

// Tabla de calibres AWG para ALUMINIO 60°C (140°F)
const tablaAluminio60C = [
  { amperaje: 15, calibre: "12 AWG" },
  { amperaje: 25, calibre: "10 AWG" },
  { amperaje: 35, calibre: "8 AWG" },
  { amperaje: 40, calibre: "6 AWG" },
  { amperaje: 55, calibre: "4 AWG" },
  { amperaje: 65, calibre: "3 AWG" },
  { amperaje: 75, calibre: "2 AWG" },
  { amperaje: 85, calibre: "1 AWG" },
  { amperaje: 100, calibre: "1/0 AWG" },
  { amperaje: 115, calibre: "2/0 AWG" },
  { amperaje: 130, calibre: "3/0 AWG" },
  { amperaje: 150, calibre: "4/0 AWG" },
  { amperaje: 170, calibre: "250 kcmil" },
  { amperaje: 195, calibre: "300 kcmil" },
  { amperaje: 210, calibre: "350 kcmil" },
  { amperaje: 225, calibre: "400 kcmil" },
  { amperaje: 260, calibre: "500 kcmil" },
  { amperaje: 285, calibre: "600 kcmil" },
  { amperaje: 315, calibre: "700 kcmil" },
  { amperaje: 320, calibre: "750 kcmil" },
  { amperaje: 330, calibre: "800 kcmil" },
  { amperaje: 355, calibre: "900 kcmil" },
  { amperaje: 375, calibre: "1000 kcmil" },
  { amperaje: 405, calibre: "1250 kcmil" },
  { amperaje: 435, calibre: "1500 kcmil" },
  { amperaje: 455, calibre: "1750 kcmil" },
  { amperaje: 470, calibre: "2000 kcmil" },
];

// Tabla de calibres AWG para ALUMINIO 75°C (167°F)
const tablaAluminio75C = [
  { amperaje: 20, calibre: "12 AWG" },
  { amperaje: 30, calibre: "10 AWG" },
  { amperaje: 40, calibre: "8 AWG" },
  { amperaje: 50, calibre: "6 AWG" },
  { amperaje: 65, calibre: "4 AWG" },
  { amperaje: 75, calibre: "3 AWG" },
  { amperaje: 90, calibre: "2 AWG" },
  { amperaje: 100, calibre: "1 AWG" },
  { amperaje: 120, calibre: "1/0 AWG" },
  { amperaje: 135, calibre: "2/0 AWG" },
  { amperaje: 155, calibre: "3/0 AWG" },
  { amperaje: 180, calibre: "4/0 AWG" },
  { amperaje: 205, calibre: "250 kcmil" },
  { amperaje: 230, calibre: "300 kcmil" },
  { amperaje: 250, calibre: "350 kcmil" },
  { amperaje: 270, calibre: "400 kcmil" },
  { amperaje: 310, calibre: "500 kcmil" },
  { amperaje: 340, calibre: "600 kcmil" },
  { amperaje: 375, calibre: "700 kcmil" },
  { amperaje: 385, calibre: "750 kcmil" },
  { amperaje: 395, calibre: "800 kcmil" },
  { amperaje: 425, calibre: "900 kcmil" },
  { amperaje: 445, calibre: "1000 kcmil" },
  { amperaje: 485, calibre: "1250 kcmil" },
  { amperaje: 520, calibre: "1500 kcmil" },
  { amperaje: 545, calibre: "1750 kcmil" },
  { amperaje: 560, calibre: "2000 kcmil" },
];

// Tabla de calibres AWG para ALUMINIO 90°C (194°F)
const tablaAluminio90C = [
  { amperaje: 25, calibre: "12 AWG" },
  { amperaje: 35, calibre: "10 AWG" },
  { amperaje: 45, calibre: "8 AWG" },
  { amperaje: 55, calibre: "6 AWG" },
  { amperaje: 75, calibre: "4 AWG" },
  { amperaje: 85, calibre: "3 AWG" },
  { amperaje: 100, calibre: "2 AWG" },
  { amperaje: 115, calibre: "1 AWG" },
  { amperaje: 135, calibre: "1/0 AWG" },
  { amperaje: 150, calibre: "2/0 AWG" },
  { amperaje: 175, calibre: "3/0 AWG" },
  { amperaje: 205, calibre: "4/0 AWG" },
  { amperaje: 230, calibre: "250 kcmil" },
  { amperaje: 260, calibre: "300 kcmil" },
  { amperaje: 280, calibre: "350 kcmil" },
  { amperaje: 305, calibre: "400 kcmil" },
  { amperaje: 350, calibre: "500 kcmil" },
  { amperaje: 385, calibre: "600 kcmil" },
  { amperaje: 425, calibre: "700 kcmil" },
  { amperaje: 435, calibre: "750 kcmil" },
  { amperaje: 445, calibre: "800 kcmil" },
  { amperaje: 480, calibre: "900 kcmil" },
  { amperaje: 500, calibre: "1000 kcmil" },
  { amperaje: 545, calibre: "1250 kcmil" },
  { amperaje: 585, calibre: "1500 kcmil" },
  { amperaje: 615, calibre: "1750 kcmil" },
  { amperaje: 630, calibre: "2000 kcmil" },
];

// Organización de tablas por material y temperatura
const tablasConductores = {
  cobre: {
    "60": tablaCobrre60C,
    "75": tablaCobrre75C,
    "90": tablaCobrre90C
  },
  aluminio: {
    "60": tablaAluminio60C,
    "75": tablaAluminio75C,
    "90": tablaAluminio90C
  }
};

// Información de tipos de conductores
const tiposConductores = {
  "60": {
    temperatura: "60°C (140°F)",
    tipos: "TW, UF",
    descripcion: "Aplicaciones básicas, ambientes húmedos"
  },
  "75": {
    temperatura: "75°C (167°F)",
    tipos: "THHN, THWN, XHHW",
    descripcion: "Uso general, más común en instalaciones"
  },
  "90": {
    temperatura: "90°C (194°F)",
    tipos: "THHN, THWN-2, XHHW-2",
    descripcion: "Condiciones secas, máxima capacidad"
  }
};

// Información de materiales
const tiposMateriales = {
  cobre: {
    nombre: "Cobre",
    icono: "🟤",
    descripcion: "Conductividad superior, uso residencial y comercial",
    ventajas: ["Mayor conductividad", "Más flexible", "Resistente a corrosión"]
  },
  aluminio: {
    nombre: "Aluminio",
    icono: "🔘",
    descripcion: "Económico, uso industrial y servicios eléctricos",
    ventajas: ["Más económico", "Más liviano", "Ideal para grandes instalaciones"]
  }
};

export default function CalculadoraCalibreCable() {
  const [amperaje, setAmperaje] = useState("");
  const [materialSeleccionado, setMaterialSeleccionado] = useState("cobre");
  const [temperaturaSeleccionada, setTemperaturaSeleccionada] = useState("75");
  const [resultado, setResultado] = useState("");
  const [tipoResultado, setTipoResultado] = useState("");

  // Seleccionar tabla según material y temperatura
  const getTablaActual = () => {
    return tablasConductores[materialSeleccionado][temperaturaSeleccionada];
  };

  const calcular = () => {
    const amp = parseInt(amperaje, 10);
    if (isNaN(amp) || amp <= 0) {
      setResultado("Ingresa un amperaje válido.");
      setTipoResultado("error");
      return;
    }

    const tablaActual = getTablaActual();
    const encontrado = tablaActual.find((row) => amp <= row.amperaje);
    if (encontrado) {
      const infoTemperatura = tiposConductores[temperaturaSeleccionada];
      const infoMaterial = tiposMateriales[materialSeleccionado];
      setResultado(`Calibre mínimo: ${encontrado.calibre} ${infoMaterial.nombre} (${infoTemperatura.temperatura})`);
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
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
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
    <div className="min-h-screen bg-transparent p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Calculadora de Calibre de Cable
          </h1>
          <p className="text-[#B0B8C1]">
            Encuentra el calibre mínimo según el amperaje requerido
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-transparent rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
          <div className="space-y-6">
            {/* Material Selector */}
            <div className="space-y-4">
              <label className="block text-base font-semibold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#FFD700]" />
                Material del Conductor
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(tiposMateriales).map(([key, info]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      materialSeleccionado === key
                        ? "border-[#FFD700] bg-[#FFD700] bg-opacity-20"
                        : "border-gray-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:bg-opacity-10"
                    }`}
                    onClick={() => setMaterialSeleccionado(key)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{info.nombre}</div>
                      <div className="text-sm text-[#00BFA6] font-semibold mt-1">{info.descripcion}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Temperature Selector */}
            <div className="space-y-4">
              <label className="block text-base font-semibold text-white flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-[#FFD700]" />
                Rango de Temperatura del Conductor
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(tiposConductores).map(([key, info]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      temperaturaSeleccionada === key
                        ? "border-[#FFD700] bg-[#FFD700] bg-opacity-20"
                        : "border-gray-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:bg-opacity-10"
                    }`}
                    onClick={() => setTemperaturaSeleccionada(key)}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{info.temperatura}</div>
                      <div className="text-sm text-[#00BFA6] font-semibold mt-1">{info.tipos}</div>
                      <div className="text-xs text-[#B0B8C1] mt-2">{info.descripcion}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <label className="block text-base font-semibold text-white">
                Amperaje Requerido (A)
              </label>
              <div className="text-sm text-[#B0B8C1] mb-2">
                Basado en valores de {tiposMateriales[materialSeleccionado].nombre} {tiposConductores[temperaturaSeleccionada].temperatura} según NEC Tabla 310.16
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={amperaje}
                  onChange={(e) => setAmperaje(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ingresa el amperaje"
                  className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none pl-12 bg-[#23272F] text-white placeholder-gray-400"
                />
                <Zap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#FFD700]" />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calcular}
              className="w-full bg-gradient-to-r from-blue-500 to-[#00BFA6] text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-[#00BFA6] focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calcular Calibre
            </button>

            {/* Result Section */}
            {resultado && (
              <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${getResultStyle()}`}>
                {getResultIcon()}
                <span className="font-semibold text-white">{resultado}</span>
              </div>
            )}
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid gap-4 mb-6">
          <div className="bg-transparent rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Material Seleccionado: {tiposMateriales[materialSeleccionado].nombre}
            </h3>
            <p className="text-[#B0B8C1] mb-2">
              {tiposMateriales[materialSeleccionado].descripcion}
            </p>
            <div className="text-sm text-[#00BFA6]">
              <strong>Ventajas:</strong> {tiposMateriales[materialSeleccionado].ventajas.join(", ")}
            </div>
          </div>

          <div className="bg-transparent rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              Especificaciones Técnicas
            </h3>
            <p className="text-[#B0B8C1]">
              Basado en tabla NEC 310.16 para conductores de {materialSeleccionado} a {tiposConductores[temperaturaSeleccionada].temperatura}.
              Tipos de conductor: {tiposConductores[temperaturaSeleccionada].tipos}.
            </p>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="bg-transparent rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="font-semibold text-white mb-4">
            Referencia Rápida - {tiposMateriales[materialSeleccionado].nombre} {tiposConductores[temperaturaSeleccionada].temperatura}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {getTablaActual().slice(0, 8).map((item, index) => (
              <div key={index} className="bg-[#181C23] rounded-lg p-2 text-center">
                <div className="font-semibold text-[#00BFA6]">{item.amperaje}A</div>
                <div className="text-[#F5F7FA]">{item.calibre}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#B0B8C1] mt-3 text-center">
            Mostrando los calibres más comunes para {materialSeleccionado}. La calculadora incluye el rango completo.
          </p>
        </div>
      </div>
    </div>
  );
}
