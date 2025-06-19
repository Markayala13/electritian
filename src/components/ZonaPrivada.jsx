import React, { useState } from "react";
import { Zap, Calculator, AlertTriangle, CheckCircle, XCircle, Wrench, Cable } from "lucide-react";

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

// Tabla de llenado de conduit
const conduitFillData = {
  "1/2": { "14": 9, "12": 7, "10": 5, "8": 2, "6": 1 },
  "3/4": { "14": 15, "12": 12, "10": 9, "8": 4, "6": 3, "4": 1 },
  "1": { "14": 26, "12": 20, "10": 15, "8": 7, "6": 5, "4": 3, "3": 2, "2": 1 },
  "1-1/4": { "14": 40, "12": 31, "10": 24, "8": 12, "6": 9, "4": 5, "3": 4, "2": 3, "1": 1 },
  "1-1/2": { "14": 53, "12": 41, "10": 31, "8": 16, "6": 12, "4": 7, "3": 5, "2": 4, "1": 2, "1/0": 1 },
  "2": { "14": 89, "12": 68, "10": 52, "8": 28, "6": 20, "4": 12, "3": 9, "2": 7, "1": 4, "1/0": 3, "2/0": 2, "3/0": 1 },
  "2-1/2": { "14": 142, "12": 109, "10": 84, "8": 45, "6": 32, "4": 19, "3": 15, "2": 11, "1": 7, "1/0": 5, "2/0": 4, "3/0": 3, "4/0": 2 },
  "3": { "14": 203, "12": 157, "10": 119, "8": 64, "6": 46, "4": 27, "3": 21, "2": 16, "1": 10, "1/0": 8, "2/0": 6, "3/0": 4, "4/0": 3 },
  "3-1/2": { "14": 270, "12": 208, "10": 158, "8": 85, "6": 61, "4": 36, "3": 28, "2": 21, "1": 13, "1/0": 10, "2/0": 8, "3/0": 6, "4/0": 4 },
  "4": { "14": 343, "12": 264, "10": 201, "8": 108, "6": 78, "4": 46, "3": 35, "2": 27, "1": 17, "1/0": 13, "2/0": 10, "3/0": 8, "4/0": 6 }
};

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
          <Zap className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <Calculator className="w-5 h-5" />
        Calcular Calibre
      </button>

      {resultado && (
        <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${getResultStyle()}`}>
          {getResultIcon()}
          <span className="font-semibold">{resultado}</span>
        </div>
      )}
    </div>
  );
}

// Componente de Calculadora de Llenado de Conduit
function ConduitFillCalculator() {
  const [conduitSize, setConduitSize] = useState("");
  const [wireGauge, setWireGauge] = useState("");
  const [resultado, setResultado] = useState("");
  const [tipoResultado, setTipoResultado] = useState("");

  const calcular = () => {
    if (!conduitSize || !wireGauge) {
      setResultado("Selecciona tanto el tamaño del conduit como el calibre del cable.");
      setTipoResultado("error");
      return;
    }

    const maxWires = conduitFillData[conduitSize]?.[wireGauge];
    if (maxWires !== undefined) {
      setResultado(`Máximo de cables permitidos: ${maxWires} cables`);
      setTipoResultado("success");
    } else {
      setResultado("Combinación no encontrada en la tabla.");
      setTipoResultado("error");
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
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Tamaño del Conduit (pulgadas)
          </label>
          <select
            value={conduitSize}
            onChange={(e) => setConduitSize(e.target.value)}
            className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 outline-none"
          >
            <option value="">Selecciona tamaño</option>
            {Object.keys(conduitFillData).map((size) => (
              <option key={size} value={size}>
                {size}"
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Calibre del Cable (AWG)
          </label>
          <select
            value={wireGauge}
            onChange={(e) => setWireGauge(e.target.value)}
            className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 outline-none"
          >
            <option value="">Selecciona calibre</option>
            <option value="14">14 AWG</option>
            <option value="12">12 AWG</option>
            <option value="10">10 AWG</option>
            <option value="8">8 AWG</option>
            <option value="6">6 AWG</option>
            <option value="4">4 AWG</option>
            <option value="3">3 AWG</option>
            <option value="2">2 AWG</option>
            <option value="1">1 AWG</option>
            <option value="1/0">1/0 AWG</option>
            <option value="2/0">2/0 AWG</option>
            <option value="3/0">3/0 AWG</option>
            <option value="4/0">4/0 AWG</option>
          </select>
        </div>
      </div>

      <button
        onClick={calcular}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 px-6 rounded-xl hover:from-orange-600 hover:to-red-700 focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <Wrench className="w-5 h-5" />
        Calcular Llenado
      </button>

      {resultado && (
        <div className={`p-4 rounded-xl border-2 flex items-center gap-3 ${getResultStyle()}`}>
          {getResultIcon()}
          <span className="font-semibold">{resultado}</span>
        </div>
      )}
    </div>
  );
}

// Componente principal
export default function ZonaPrivada() {
  const [calculadoraActiva, setCalculadoraActiva] = useState("calibre");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Zona Privada - Calculadoras Eléctricas
          </h1>
          <p className="text-gray-600 text-lg">
            Herramientas profesionales para electricistas
          </p>
        </div>

        {/* Selector de Calculadora */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-2 flex">
            <button
              onClick={() => setCalculadoraActiva("calibre")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                calculadoraActiva === "calibre"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Zap className="w-5 h-5" />
              Calibre de Cable
            </button>
            <button
              onClick={() => setCalculadoraActiva("conduit")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                calculadoraActiva === "conduit"
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Cable className="w-5 h-5" />
              Llenado de Conduit
            </button>
          </div>
        </div>

        {/* Calculadora Activa */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
          {calculadoraActiva === "calibre" ? (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Calculadora de Calibre de Cable
                </h2>
                <p className="text-gray-600">
                  Encuentra el calibre mínimo según el amperaje requerido
                </p>
              </div>
              <CalculadoraCalibreCable />
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-4 shadow-lg">
                  <Cable className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Calculadora de Llenado de Conduit
                </h2>
                <p className="text-gray-600">
                  Determina el número máximo de cables por conduit
                </p>
              </div>
              <ConduitFillCalculator />
            </div>
          )}
        </div>

        {/* Información Técnica */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Especificaciones Técnicas
            </h3>
            <p className="text-sm text-gray-600">
              Basado en tabla NEC para conductores de cobre THHN, 75°C y 
              tabla de llenado de conduit al 40% según normativa.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              Normativa de Referencia
            </h3>
            <p className="text-sm text-gray-600">
              Basado en California Electrical Code (CEC 2022), equivalente a NEC 2020. 
              Consulta siempre la normativa vigente y condiciones específicas de instalación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

