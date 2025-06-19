
import React from "react";

export default function TablaConduit({ titulo, tabla }) {
  if (!Array.isArray(tabla) || tabla.length === 0) {
    return (
      <div className="mb-8 bg-red-100 border-l-4 border-red-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-red-700 mb-2">{titulo}</h3>
        <p className="text-sm text-red-600">La tabla está vacía o no es válida.</p>
      </div>
    );
  }

  return (
    <div className="mb-10 bg-white shadow-md rounded-2xl p-6 overflow-x-auto">
      <h3 className="text-2xl font-bold text-[#23272F] mb-4">{titulo}</h3>
      <table className="min-w-full table-auto border-collapse rounded overflow-hidden text-sm">
        <thead className="bg-gradient-to-r from-[#FFD700] to-[#FFEB3B] text-[#23272F] uppercase tracking-wide">
          <tr>
            {Object.keys(tabla[0]).map((columna) => (
              <th
                key={columna}
                className="px-4 py-3 text-left font-semibold border-b border-gray-300"
              >
                {columna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tabla.map((fila, i) => (
            <tr
              key={i}
              className={
                i % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "bg-white hover:bg-gray-100"
              }
            >
              {Object.values(fila).map((valor, j) => (
                <td
                  key={j}
                  className="px-4 py-2 border-b border-gray-200 text-center whitespace-nowrap"
                >
                  {valor}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
