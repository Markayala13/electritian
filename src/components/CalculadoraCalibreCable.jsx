import React, { useState } from "react";
import { Zap, Calculator } from "lucide-react";

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
  copper: {
    "60": tablaCobrre60C,
    "75": tablaCobrre75C,
    "90": tablaCobrre90C
  },
  aluminum: {
    "60": tablaAluminio60C,
    "75": tablaAluminio75C,
    "90": tablaAluminio90C
  }
};

// Información de materiales
const tiposMateriales = {
  copper: {
    nombre: "Copper",
    descripcion: "Copper is the standard material for electrical wiring due to its excellent conductivity and durability.",
    imagen: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=500&h=300&fit=crop"
  },
  aluminum: {
    nombre: "Aluminum", 
    descripcion: "Aluminum is a lighter and more cost-effective alternative to copper, suitable for larger gauge wires.",
    imagen: "https://images.unsplash.com/photo-1535082783524-2fde8d3d8e6d?w=500&h=300&fit=crop"
  }
};

// Calibres más comunes para la tabla de referencia
const calibresComunes = [
  { calibre: "14 AWG", amperaje: "15 Amps" },
  { calibre: "12 AWG", amperaje: "20 Amps" },
  { calibre: "10 AWG", amperaje: "30 Amps" },
  { calibre: "8 AWG", amperaje: "40 Amps" },
  { calibre: "6 AWG", amperaje: "55 Amps" },
  { calibre: "4 AWG", amperaje: "70 Amps" },
];

export default function CalculadoraCalibreCable() {
  const [materialSeleccionado, setMaterialSeleccionado] = useState("copper");
  const [temperaturaSeleccionada, setTemperaturaSeleccionada] = useState("75");
  const [amperaje, setAmperaje] = useState("");
  const [resultado, setResultado] = useState("");

  // Seleccionar tabla según material y temperatura
  const getTablaActual = () => {
    return tablasConductores[materialSeleccionado][temperaturaSeleccionada];
  };

  const calcular = () => {
    const amp = parseInt(amperaje, 10);
    if (isNaN(amp) || amp <= 0) {
      setResultado("Enter valid amperage");
      return;
    }

    const tablaActual = getTablaActual();
    const encontrado = tablaActual.find((row) => amp <= row.amperaje);
    if (encontrado) {
      setResultado(`You need ${encontrado.calibre} ${materialSeleccionado} wire`);
    } else {
      setResultado("Amperage out of range for this table");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calcular();
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#23272F] justify-between">
      {/* TÍTULO TEMPORAL PARA VERIFICAR CAMBIOS */}
      <div className="bg-red-500 text-white text-center p-4 text-2xl font-bold">
        🚨 NUEVO DISEÑO CARGADO - SI VES ESTO, FUNCIONÓ 🚨
      </div>
      
      <div>
        {/* Header */}
        <div className="flex items-center bg-[#23272F] p-4 pb-2 justify-between">
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
            Cable Size Calculator
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
              <Zap className="w-6 h-6 text-[#FFD700]" />
            </button>
          </div>
        </div>

        {/* Material Selection */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Material
        </h2>
        <div className="flex flex-wrap gap-3 p-4">
          {Object.entries(tiposMateriales).map(([key, info]) => (
            <label
              key={key}
              className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-white cursor-pointer transition-all duration-200 ${
                materialSeleccionado === key
                  ? "border-[3px] border-[#FFD700] px-3.5"
                  : "border border-[#B0B8C1] hover:border-[#FFD700]"
              }`}
            >
              {info.nombre}
              <input
                type="radio"
                className="invisible absolute"
                name="material"
                value={key}
                checked={materialSeleccionado === key}
                onChange={(e) => setMaterialSeleccionado(e.target.value)}
              />
            </label>
          ))}
        </div>

        {/* Temperature Selection */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Temperature
        </h2>
        <div className="flex flex-wrap gap-3 p-4">
          {["60", "75", "90"].map((temp) => (
            <label
              key={temp}
              className={`text-sm font-medium leading-normal flex items-center justify-center rounded-xl border px-4 h-11 text-white cursor-pointer transition-all duration-200 ${
                temperaturaSeleccionada === temp
                  ? "border-[3px] border-[#FFD700] px-3.5"
                  : "border border-[#B0B8C1] hover:border-[#FFD700]"
              }`}
            >
              {temp}°C
              <input
                type="radio"
                className="invisible absolute"
                name="temperature"
                value={temp}
                checked={temperaturaSeleccionada === temp}
                onChange={(e) => setTemperaturaSeleccionada(e.target.value)}
              />
            </label>
          ))}
        </div>

        {/* Amperage Input */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Amperage
        </h2>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              type="number"
              placeholder="Enter Amperage"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#B0B8C1] bg-[#181C23] focus:border-[#FFD700] h-14 placeholder:text-[#B0B8C1] p-[15px] text-base font-normal leading-normal"
              value={amperaje}
              onChange={(e) => setAmperaje(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </label>
        </div>

        {/* Calculate Button */}
        <div className="flex px-4 py-3">
          <button
            onClick={calcular}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#FFD700] text-[#23272F] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#E6C200] transition-colors duration-200"
          >
            <Calculator className="w-5 h-5 mr-2" />
            <span className="truncate">CALCULATE GAUGE</span>
          </button>
        </div>

        {/* Result */}
        {resultado && (
          <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
            {resultado}
          </p>
        )}

        {/* Material Information */}
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Material Information
        </h2>
        
        {Object.entries(tiposMateriales).map(([key, info]) => (
          <div key={key} className="p-4">
            <div
              className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-[132px]"
              style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url("${info.imagen}")`
              }}
            >
              <div className="flex w-full items-end justify-between gap-4 p-4">
                <div className="flex max-w-[440px] flex-1 flex-col gap-1">
                  <p className="text-white tracking-light text-2xl font-bold leading-tight max-w-[440px]">
                    {info.nombre}
                  </p>
                  <p className="text-white text-base font-medium leading-normal">
                    {info.descripcion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Common Cable Sizes Table */}
      <div>
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Common Cable Sizes
        </h2>
        <div className="p-4 grid grid-cols-2">
          {calibresComunes.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 border-t border-solid border-t-[#B0B8C1] py-4 pr-2"
            >
              <p className="text-[#00BFA6] text-sm font-normal leading-normal">
                {item.calibre}
              </p>
              <p className="text-white text-sm font-normal leading-normal">
                {item.amperaje}
              </p>
            </div>
          ))}
        </div>
        <div className="h-5 bg-[#23272F]"></div>
      </div>
    </div>
  );
}
