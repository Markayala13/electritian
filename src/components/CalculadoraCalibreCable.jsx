
import React, { useState } from "react";

// Tabla básica: Amperaje -> Calibre AWG
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

  const calcular = () => {
    const amp = parseInt(amperaje, 10);
    if (isNaN(amp) || amp <= 0) {
      setResultado("Ingresa un amperaje válido.");
      return;
    }
    const encontrado = tablaCalibres.find(row => amp <= row.amperaje);
    setResultado(
      encontrado
        ? `Calibre mínimo recomendado: ${encontrado.calibre}`
        : "Amperaje fuera de rango para esta tabla."
    );
  };

  return (
    <div className="bg-white rounded shadow p-6 max-w-md mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4">Calculadora de Calibre de Cable</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          min="1"
          value={amperaje}
          onChange={e => setAmperaje(e.target.value)}
          placeholder="Amperaje requerido"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={calcular}
          className="bg-[#FFD700] text-[#23272F] font-bold px-4 py-2 rounded hover:bg-[#00BFA6] hover:text-white transition"
        >
          Calcular
        </button>
      </div>
      {resultado && <div className="mt-2 font-semibold">{resultado}</div>}
      <div className="text-xs text-gray-500 mt-4">
        Basado en tabla NEC para conductores de cobre THHN, 75°C.
      </div>
      <div className="text-xs text-gray-500 mt-4">
  Basado en la tabla de ampacidad del California Electrical Code (CEC 2022), equivalente a NEC 2020, para conductores de cobre THHN a 75°C y máximo 3 conductores en tubería. Consulta siempre la normativa vigente y condiciones específicas de instalación.
</div>
    </div>
  );
}