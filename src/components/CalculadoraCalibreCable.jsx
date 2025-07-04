import React, { useState } from "react";
import { Zap, Calculator, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

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

export default function CalculadoraCalibreCable() {
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
            {/* Input Section */}
            <div className="space-y-4">
              <label className="block text-base font-semibold text-white">
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
              Especificaciones Técnicas
            </h3>
            <p className="text-[#B0B8C1]">
              Basado en tabla NEC para conductores de cobre THHN, 75°C.
            </p>
          </div>

          <div className="bg-transparent rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              Normativa de Referencia
            </h3>
            <p className="text-[#B0B8C1]">
              Basado en la tabla de ampacidad del California Electrical Code (CEC 2022), 
              equivalente a NEC 2020, para conductores de cobre THHN a 75°C y máximo 
              3 conductores en tubería. Consulta siempre la normativa vigente y 
              condiciones específicas de instalación.
            </p>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="bg-transparent rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="font-semibold text-white mb-4">Referencia Rápida</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {tablaCalibres.slice(0, 8).map((item, index) => (
              <div key={index} className="bg-[#181C23] rounded-lg p-2 text-center">
                <div className="font-semibold text-[#00BFA6]">{item.amperaje}A</div>
                <div className="text-[#F5F7FA]">{item.calibre}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#B0B8C1] mt-3 text-center">
            Mostrando los calibres más comunes. La calculadora incluye el rango completo.
          </p>
        </div>
      </div>
    </div>
  );
}
