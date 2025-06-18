import React from "react";
import TablaConduit from "./TablaConduit";

// Pega aquí las tablas que te pasé antes
const tablaEMT = [
  { tamaño: "1/2\"",  "14 AWG": 12, "12 AWG": 9,  "10 AWG": 5,  "8 AWG": 3,  "6 AWG": 2 },
  { tamaño: "3/4\"",  "14 AWG": 22, "12 AWG": 16, "10 AWG": 10, "8 AWG": 5,  "6 AWG": 3 },
  { tamaño: "1\"",    "14 AWG": 35, "12 AWG": 26, "10 AWG": 16, "8 AWG": 9,  "6 AWG": 5 },
  { tamaño: "1-1/4\"", "14 AWG": 61, "12 AWG": 44, "10 AWG": 28, "8 AWG": 16, "6 AWG": 9 },
  { tamaño: "1-1/2\"", "14 AWG": 84, "12 AWG": 61, "10 AWG": 38, "8 AWG": 21, "6 AWG": 12 },
  { tamaño: "2\"",    "14 AWG": 135, "12 AWG": 98, "10 AWG": 61, "8 AWG": 35, "6 AWG": 20 },
];

const tablaRMC = [
  { tamaño: "1/2\"",  "14 AWG": 13, "12 AWG": 10, "10 AWG": 6,  "8 AWG": 3,  "6 AWG": 2 },
  { tamaño: "3/4\"",  "14 AWG": 24, "12 AWG": 18, "10 AWG": 11, "8 AWG": 6,  "6 AWG": 3 },
  { tamaño: "1\"",    "14 AWG": 41, "12 AWG": 30, "10 AWG": 19, "8 AWG": 10, "6 AWG": 6 },
  { tamaño: "1-1/4\"", "14 AWG": 72, "12 AWG": 52, "10 AWG": 33, "8 AWG": 18, "6 AWG": 10 },
  { tamaño: "1-1/2\"", "14 AWG": 99, "12 AWG": 71, "10 AWG": 45, "8 AWG": 25, "6 AWG": 14 },
  { tamaño: "2\"",    "14 AWG": 154, "12 AWG": 112, "10 AWG": 71, "8 AWG": 40, "6 AWG": 23 },
];

const tablaPVC40 = [
  { tamaño: "1/2\"",  "14 AWG": 12, "12 AWG": 9,  "10 AWG": 5,  "8 AWG": 3,  "6 AWG": 2 },
  { tamaño: "3/4\"",  "14 AWG": 22, "12 AWG": 16, "10 AWG": 10, "8 AWG": 5,  "6 AWG": 3 },
  { tamaño: "1\"",    "14 AWG": 38, "12 AWG": 28, "10 AWG": 17, "8 AWG": 9,  "6 AWG": 5 },
  { tamaño: "1-1/4\"", "14 AWG": 68, "12 AWG": 49, "10 AWG": 31, "8 AWG": 17, "6 AWG": 10 },
  { tamaño: "1-1/2\"", "14 AWG": 89, "12 AWG": 64, "10 AWG": 40, "8 AWG": 22, "6 AWG": 12 },
  { tamaño: "2\"",    "14 AWG": 146, "12 AWG": 105, "10 AWG": 66, "8 AWG": 37, "6 AWG": 21 },
];

const tablaPVC80 = [
  { tamaño: "1/2\"",  "14 AWG": 10, "12 AWG": 7,  "10 AWG": 4,  "8 AWG": 2,  "6 AWG": 1 },
  { tamaño: "3/4\"",  "14 AWG": 18, "12 AWG": 13, "10 AWG": 8,  "8 AWG": 4,  "6 AWG": 2 },
  { tamaño: "1\"",    "14 AWG": 30, "12 AWG": 22, "10 AWG": 13, "8 AWG": 7,  "6 AWG": 4 },
  { tamaño: "1-1/4\"", "14 AWG": 54, "12 AWG": 39, "10 AWG": 24, "8 AWG": 13, "6 AWG": 7 },
  { tamaño: "1-1/2\"", "14 AWG": 70, "12 AWG": 50, "10 AWG": 31, "8 AWG": 17, "6 AWG": 9 },
  { tamaño: "2\"",    "14 AWG": 115, "12 AWG": 83, "10 AWG": 52, "8 AWG": 29, "6 AWG": 16 },
];

export default function ZonaPrivada() {
  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Zona Privada</h2>
      <TablaConduit titulo="Tabla de llenado de tubería EMT (CEC/NEC)" tabla={tablaEMT} />
      <TablaConduit titulo="Tabla de llenado de tubería Rigid (CEC/NEC)" tabla={tablaRMC} />
      <TablaConduit titulo="Tabla de llenado de tubería PVC S40 (CEC/NEC)" tabla={tablaPVC40} />
      <TablaConduit titulo="Tabla de llenado de tubería PVC S80 (CEC/NEC)" tabla={tablaPVC80} />
      <div className="text-xs text-gray-500 mt-4">
        Basado en CEC 2022/NEC 2020, Annex C. Consulta siempre la normativa vigente y condiciones específicas de instalación.
      </div>
    </div>
  );
}