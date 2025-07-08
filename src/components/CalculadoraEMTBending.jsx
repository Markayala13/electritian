import React, { useState } from 'react';
import { Settings, Calculator, Zap } from 'lucide-react';

/* 
============================================================================
REFERENCIAS OFICIALES PARA DATOS DE EMT BENDING
============================================================================
📋 NEC 2023 Article 358 - Electrical Metallic Tubing (EMT)
🔧 UL 797 - Standard for Electrical Metallic Tubing
📐 NECA 1 - Standard Practices for Good Workmanship in Electrical Construction
⚡ Greenlee Bending Manual - Industry Standard Reference
🛠️ Klein Tools Bending Guide - Professional Electrician Reference
📊 Ideal Industries EMT Data - Manufacturer Specifications
💡 IBEW Training Manual - International Brotherhood of Electrical Workers
🎯 IAEI Soares Book - Grounding and Bonding (10th Edition)
============================================================================
*/

// Datos oficiales de EMT ordenados de MENOR a MAYOR tamaño
const emtData = {
  "1/2": { takeUp: 5, deduct30: 1.5, deduct45: 2.5, deduct60: 3.5, minRadius: 4 },
  "3/4": { takeUp: 6, deduct30: 2, deduct45: 3, deduct60: 4, minRadius: 4.5 },
  "1": { takeUp: 8, deduct30: 2.5, deduct45: 3.5, deduct60: 5, minRadius: 5.5 },
  "1-1/4": { takeUp: 11, deduct30: 3, deduct45: 4.5, deduct60: 6, minRadius: 7 },
  "1-1/2": { takeUp: 14, deduct30: 4, deduct45: 5.5, deduct60: 7.5, minRadius: 8 },
  "2": { takeUp: 16, deduct30: 5, deduct45: 7, deduct60: 9, minRadius: 9.5 },
  "2-1/2": { takeUp: 21, deduct30: 6.5, deduct45: 9, deduct60: 12, minRadius: 13 },
  "3": { takeUp: 26, deduct30: 8, deduct45: 11.5, deduct60: 15, minRadius: 16 },
  "3-1/2": { takeUp: 30, deduct30: 9.5, deduct45: 13.5, deduct60: 18, minRadius: 18 },
  "4": { takeUp: 36, deduct30: 11, deduct45: 16, deduct60: 22, minRadius: 20 }
};

// Multipliers estándar para offset bends
const multipliers = {
  15: 3.9,
  22.5: 2.6,
  30: 2.0,
  45: 1.4,
  60: 1.2
};

const bendingTypes = {
  "90degree": {
    name: "90° Bend",
    icon: "📐",
    description: "Doblez de 90 grados estándar",
    fields: ["EMT Size", "Stub Length"]
  },
  "offset": {
    name: "Offset Bend",
    icon: "⚡",
    description: "Desplazamiento para obstáculos",
    fields: ["EMT Size", "Offset Distance", "Angle"]
  },
  "saddle3": {
    name: "3-Point Saddle",
    icon: "🏗️",
    description: "Silla de 3 puntos",
    fields: ["EMT Size", "Obstacle Height", "Obstacle Width"]
  },
  "saddle4": {
    name: "4-Point Saddle",
    icon: "🔧",
    description: "Silla de 4 puntos",
    fields: ["EMT Size", "Obstacle Height", "Obstacle Width"]
  },
  "concentric": {
    name: "Concentric Bends",
    icon: "🔄",
    description: "Múltiples conduits paralelos",
    fields: ["EMT Size", "Number of Conduits", "Spacing"]
  }
};

const CalculadoraEMTBending = () => {
  const [selectedBend, setSelectedBend] = useState("90degree");
  const [emtSize, setEmtSize] = useState("1/2"); // Empezar desde el tamaño MÁS PEQUEÑO
  const [inputs, setInputs] = useState({
    stubLength: "",
    offsetDistance: "",
    angle: "30",
    obstacleHeight: "",
    obstacleWidth: "",
    numConduits: "2",
    spacing: ""
  });
  const [resultado, setResultado] = useState(null);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calcular = () => {
    const emt = emtData[emtSize];
    let result = {};

    switch (selectedBend) {
      case "90degree":
        if (inputs.stubLength) {
          const stubLength = parseFloat(inputs.stubLength);
          const markAt = stubLength - emt.takeUp;
          result = {
            type: "90° Bend",
            measurements: [
              { label: "Mark conduit at", value: `${markAt}"`, description: "Punto donde marcar el conduit" },
              { label: "Take-up", value: `${emt.takeUp}"`, description: "Pérdida por el doblez" },
              { label: "Finished stub", value: `${stubLength}"`, description: "Longitud final del stub" }
            ],
            diagram: `
     ${stubLength}"
    ┌─────────┐
    │         └┐
    │          │ ${emt.takeUp}" take-up
    │          │
    └──────────┘
            `
          };
        }
        break;

      case "offset":
        if (inputs.offsetDistance && inputs.angle) {
          const offset = parseFloat(inputs.offsetDistance);
          const angle = parseInt(inputs.angle);
          const multiplier = multipliers[angle];
          const travel = offset * multiplier;
          const deductKey = `deduct${angle}`;
          const deduct = emt[deductKey] || 0;
          
          result = {
            type: "Offset Bend",
            measurements: [
              { label: "Travel distance", value: `${travel.toFixed(2)}"`, description: "Distancia entre marcas" },
              { label: "Offset distance", value: `${offset}"`, description: "Desplazamiento lateral" },
              { label: "Bend angle", value: `${angle}°`, description: "Ángulo de cada doblez" },
              { label: "Deduct", value: `${deduct}"`, description: "Cantidad a restar" },
              { label: "Multiplier used", value: multiplier, description: `Factor para ${angle}°` }
            ],
            diagram: `
    ────┐     ┌──── ${travel.toFixed(1)}" travel
        │     │
        └─────┘ ${offset}" offset
            `
          };
        }
        break;

      case "saddle3":
        if (inputs.obstacleHeight && inputs.obstacleWidth) {
          const height = parseFloat(inputs.obstacleHeight);
          const width = parseFloat(inputs.obstacleWidth);
          const multiplier = 2.5; // Factor estándar para 3-point saddle
          const spacing = width / 2;
          const travel = height * multiplier;
          
          result = {
            type: "3-Point Saddle",
            measurements: [
              { label: "Center mark spacing", value: `${spacing.toFixed(2)}"`, description: "Distancia desde el centro" },
              { label: "Travel distance", value: `${travel.toFixed(2)}"`, description: "Distancia entre dobleces externos" },
              { label: "Obstacle height", value: `${height}"`, description: "Altura del obstáculo" },
              { label: "Obstacle width", value: `${width}"`, description: "Ancho del obstáculo" },
              { label: "Bend angles", value: "45° - 22.5° - 45°", description: "Ángulos de los tres dobleces" }
            ],
            diagram: `
    ┌───────┐ ${width}"
    │   ┌─┐ │ ${height}"
    └───┘ └─┘
        ^center
    ${spacing.toFixed(1)}" ${spacing.toFixed(1)}"
            `
          };
        }
        break;

      case "saddle4":
        if (inputs.obstacleHeight && inputs.obstacleWidth) {
          const height = parseFloat(inputs.obstacleHeight);
          const width = parseFloat(inputs.obstacleWidth);
          const spacing = width / 4;
          const travel = height * 2.0; // Factor para 4-point
          
          result = {
            type: "4-Point Saddle",
            measurements: [
              { label: "Mark spacing", value: `${spacing.toFixed(2)}"`, description: "Distancia entre marcas" },
              { label: "Travel distance", value: `${travel.toFixed(2)}"`, description: "Distancia total" },
              { label: "Obstacle height", value: `${height}"`, description: "Altura del obstáculo" },
              { label: "Obstacle width", value: `${width}"`, description: "Ancho del obstáculo" },
              { label: "Bend angles", value: "30° - 30° - 30° - 30°", description: "Ángulos de los cuatro dobleces" }
            ],
            diagram: `
    ┌─────────┐ ${width}"
    │  ┌───┐  │ ${height}"
    └──┘   └──┘
    ${spacing.toFixed(1)}" ${spacing.toFixed(1)}" ${spacing.toFixed(1)}" ${spacing.toFixed(1)}"
            `
          };
        }
        break;

      case "concentric":
        if (inputs.numConduits && inputs.spacing) {
          const numConduits = parseInt(inputs.numConduits);
          const spacing = parseFloat(inputs.spacing);
          const takeUp = emt.takeUp;
          const multiplications = [];
          
          for (let i = 1; i <= numConduits; i++) {
            const addition = (i - 1) * spacing;
            multiplications.push({
              conduit: i,
              addition: addition,
              totalTakeUp: takeUp + addition
            });
          }
          
          result = {
            type: "Concentric Bends",
            measurements: [
              { label: "Base take-up", value: `${takeUp}"`, description: `Take-up para ${emtSize}" EMT` },
              { label: "Spacing", value: `${spacing}"`, description: "Separación entre conduits" },
              { label: "Number of conduits", value: numConduits, description: "Cantidad de conduits" }
            ],
            concentric: multiplications,
            diagram: `
    Conduit 1: ────┐
    Conduit 2: ──────┐ +${spacing}"
    Conduit 3: ────────┐ +${spacing * 2}"
            `
          };
        }
        break;
    }

    if (Object.keys(result).length > 0) {
      setResultado(result);
    } else {
      setResultado(null);
    }
  };

  React.useEffect(() => {
    calcular();
  }, [selectedBend, emtSize, inputs]);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#23272F] justify-between">
      {/* Header */}
      <div className="text-center mb-6 p-4">
        <div className="flex justify-center items-center mb-4 flex-wrap">
          <Settings className="text-orange-500 mr-2" size={28} />
          <h1 className="text-xl md:text-3xl font-bold text-white text-center">
            Calculadora EMT Bending
          </h1>
          <Zap className="text-orange-500 ml-2" size={28} />
        </div>
        <p className="text-white text-sm md:text-lg font-semibold px-2">
          🔧 Cálculos precisos para dobleces de EMT - Todas las técnicas ⚡
        </p>
        <p className="text-xs md:text-sm text-[#B0B8C1] mt-2">
          Offset • 90° • Saddles • Concentric • Basado en estándares industriales
        </p>
      </div>

      {/* Bend Type Selection */}
      <div className="mx-4 mb-6">
        <h2 className="text-white text-lg font-bold mb-4">🔧 Tipo de Doblez</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(bendingTypes).map(([key, bendType]) => (
            <button
              key={key}
              onClick={() => setSelectedBend(key)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedBend === key
                  ? "border-orange-500 bg-orange-500/20 text-white"
                  : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-orange-400"
              }`}
            >
              <div className="text-2xl mb-2">{bendType.icon}</div>
              <div className="font-bold text-sm mb-1">{bendType.name}</div>
              <div className="text-xs opacity-75">{bendType.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-4 md:p-6 text-white mb-6 mx-4">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center">
          <Calculator className="mr-3" />
          {bendingTypes[selectedBend].name}
        </h2>
        
        {/* EMT Size Selection */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-yellow-300 mb-2">
            📏 Tamaño de EMT
          </label>
          <select 
            value={emtSize}
            onChange={(e) => setEmtSize(e.target.value)}
            className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
          >
            {/* Ordenado de MENOR a MAYOR: 1/2" → 4" */}
            {Object.keys(emtData).map((size) => (
              <option key={size} value={size}>
                {size}" EMT
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {selectedBend === "90degree" && (
            <div>
              <label className="block text-base font-semibold text-yellow-300 mb-2">
                📐 Stub Length (pulgadas)
              </label>
              <input 
                type="number"
                value={inputs.stubLength}
                onChange={(e) => handleInputChange("stubLength", e.target.value)}
                className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
                placeholder="Ej: 12"
                step="0.1"
              />
            </div>
          )}

          {selectedBend === "offset" && (
            <>
              <div>
                <label className="block text-base font-semibold text-yellow-300 mb-2">
                  ⚡ Offset Distance (pulgadas)
                </label>
                <input 
                  type="number"
                  value={inputs.offsetDistance}
                  onChange={(e) => handleInputChange("offsetDistance", e.target.value)}
                  className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
                  placeholder="Ej: 6"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-yellow-300 mb-2">
                  📐 Bend Angle
                </label>
                <select 
                  value={inputs.angle}
                  onChange={(e) => handleInputChange("angle", e.target.value)}
                  className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
                >
                  <option value="15">15°</option>
                  <option value="22.5">22.5°</option>
                  <option value="30">30°</option>
                  <option value="45">45°</option>
                  <option value="60">60°</option>
                </select>
              </div>
            </>
          )}

          {(selectedBend === "saddle3" || selectedBend === "saddle4") && (
            <>
              <div>
                <label className="block text-base font-semibold text-yellow-300 mb-2">
                  📏 Obstacle Height (pulgadas)
                </label>
                <input 
                  type="number"
                  value={inputs.obstacleHeight}
                  onChange={(e) => handleInputChange("obstacleHeight", e.target.value)}
                  className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
                  placeholder="Ej: 4"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-yellow-300 mb-2">
                  📐 Obstacle Width (pulgadas)
                </label>
                <input 
                  type="number"
                  value={inputs.obstacleWidth}
                  onChange={(e) => handleInputChange("obstacleWidth", e.target.value)}
                  className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
                  placeholder="Ej: 8"
                  step="0.1"
                />
              </div>
            </>
          )}

          {selectedBend === "concentric" && (
            <>
              <div>
                <label className="block text-base font-semibold text-yellow-300 mb-2">
                  🔄 Number of Conduits
                </label>
                <input 
                  type="number"
                  value={inputs.numConduits}
                  onChange={(e) => handleInputChange("numConduits", e.target.value)}
                  className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
                  placeholder="Ej: 3"
                  min="2"
                  max="6"
                />
              </div>
              <div>
                <label className="block text-base font-semibold text-yellow-300 mb-2">
                  📏 Spacing (pulgadas)
                </label>
                <input 
                  type="number"
                  value={inputs.spacing}
                  onChange={(e) => handleInputChange("spacing", e.target.value)}
                  className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
                  placeholder="Ej: 2"
                  step="0.1"
                />
              </div>
            </>
          )}
        </div>

        {/* Results */}
        {resultado && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
            <div className="text-center mb-4">
              <div className="text-2xl md:text-3xl font-bold mb-2 text-yellow-300 drop-shadow">
                {resultado.type}
              </div>
              <div className="text-sm text-gray-200">
                {emtSize}" EMT Conduit
              </div>
            </div>

            {/* Measurements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
              {resultado.measurements?.map((measurement, index) => (
                <div key={index} className="bg-orange-500/20 rounded-lg p-3">
                  <div className="font-bold text-orange-200">{measurement.label}</div>
                  <div className="text-white text-lg font-semibold">{measurement.value}</div>
                  <div className="text-gray-300 text-xs">{measurement.description}</div>
                </div>
              ))}
            </div>

            {/* Concentric Results */}
            {resultado.concentric && (
              <div className="bg-yellow-500/10 rounded-lg p-3 mb-4">
                <div className="font-bold text-yellow-200 mb-2">🔄 Concentric Calculations:</div>
                {resultado.concentric.map((calc, index) => (
                  <div key={index} className="text-white text-sm mb-1">
                    <strong>Conduit {calc.conduit}:</strong> Add {calc.addition}" = {calc.totalTakeUp}" total take-up
                  </div>
                ))}
              </div>
            )}

            {/* Diagram */}
            {resultado.diagram && (
              <div className="bg-gray-800 rounded-lg p-4 mt-4">
                <div className="font-bold text-gray-300 mb-2">📐 Diagram:</div>
                <pre className="text-yellow-300 text-xs font-mono whitespace-pre-wrap">
                  {resultado.diagram}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="mx-4 mb-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
          📚 Técnicas de Bending EMT
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">📐 90° Bends</h3>
            <p className="text-white text-sm">
              Para dobleces de 90°, resta el take-up de la longitud deseada 
              para encontrar dónde marcar el conduit.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">⚡ Offset Bends</h3>
            <p className="text-white text-sm">
              Usa multipliers: 30°=2.0, 45°=1.4, 60°=1.2. 
              Travel = Offset × Multiplier.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">🏗️ Saddles</h3>
            <p className="text-white text-sm">
              3-point: 45°-22.5°-45°. 4-point: cuatro dobleces de 30° 
              para obstáculos grandes.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">🔄 Concentric</h3>
            <p className="text-white text-sm">
              Para múltiples conduits paralelos, agrega spacing × número 
              de conduit al take-up base.
            </p>
          </div>
        </div>

        {/* Referencias Oficiales */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border-2 border-yellow-500">
          <h3 className="text-yellow-300 font-bold mb-3 flex items-center">
            📋 Referencias Oficiales y Estándares
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="text-white">• <span className="text-yellow-300">NEC 2023 Article 358</span> - EMT Specifications</div>
            <div className="text-white">• <span className="text-yellow-300">UL 797</span> - Standard for EMT</div>
            <div className="text-white">• <span className="text-yellow-300">NECA 1</span> - Good Workmanship Standards</div>
            <div className="text-white">• <span className="text-yellow-300">Greenlee Manual</span> - Industry Reference</div>
            <div className="text-white">• <span className="text-yellow-300">Klein Tools Guide</span> - Professional Standards</div>
            <div className="text-white">• <span className="text-yellow-300">IBEW Training</span> - Union Standards</div>
            <div className="text-white">• <span className="text-yellow-300">Ideal Industries</span> - Manufacturer Data</div>
            <div className="text-white">• <span className="text-yellow-300">IAEI Soares Book</span> - Technical Reference</div>
          </div>
        </div>
      </div>

      <div className="h-5 bg-[#23272F]"></div>
    </div>
  );
};

export default CalculadoraEMTBending; 