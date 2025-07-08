import React, { useState } from 'react';
import { Settings, Calculator, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

/* 
============================================================================
REFERENCIAS OFICIALES PARA VOLTAGE DROP CALCULATOR
============================================================================
📋 NEC 2023 Chapter 9, Table 8 - Conductor Properties
⚡ NEC 210.19(A)(1) - 3% voltage drop limit for branch circuits
🔌 NEC 215.2(A)(1) - 3% voltage drop limit for feeders  
📐 NEC 647.4(D) - 5% total voltage drop limit
💡 IEEE 141 - Recommended Practice for Electric Power Distribution
🛠️ NECA Manual of Labor Units - Installation Standards
============================================================================
*/

// Datos oficiales NEC Table 8 - Conductor Properties (Resistance in ohms per 1000 feet)
const conductorData = {
  // AWG/kcmil: {copper_ac_ohms, aluminum_ac_ohms, area_circular_mils}
  "18": { copper: 7.77, aluminum: 12.8, area: 1620 },
  "16": { copper: 4.89, aluminum: 8.05, area: 2580 },
  "14": { copper: 3.07, aluminum: 5.06, area: 4107 },
  "12": { copper: 1.93, aluminum: 3.18, area: 6530 },
  "10": { copper: 1.21, aluminum: 2.00, area: 10380 },
  "8": { copper: 0.764, aluminum: 1.26, area: 16510 },
  "6": { copper: 0.491, aluminum: 0.808, area: 26240 },
  "4": { copper: 0.308, aluminum: 0.508, area: 41740 },
  "3": { copper: 0.245, aluminum: 0.403, area: 52620 },
  "2": { copper: 0.194, aluminum: 0.319, area: 66360 },
  "1": { copper: 0.154, aluminum: 0.253, area: 83690 },
  "1/0": { copper: 0.122, aluminum: 0.201, area: 105600 },
  "2/0": { copper: 0.0967, aluminum: 0.159, area: 133100 },
  "3/0": { copper: 0.0766, aluminum: 0.126, area: 167800 },
  "4/0": { copper: 0.0608, aluminum: 0.100, area: 211600 },
  "250": { copper: 0.0515, aluminum: 0.0847, area: 250000 },
  "300": { copper: 0.0429, aluminum: 0.0707, area: 300000 },
  "350": { copper: 0.0367, aluminum: 0.0605, area: 350000 },
  "400": { copper: 0.0321, aluminum: 0.0529, area: 400000 },
  "500": { copper: 0.0258, aluminum: 0.0424, area: 500000 },
  "600": { copper: 0.0214, aluminum: 0.0353, area: 600000 },
  "700": { copper: 0.0184, aluminum: 0.0303, area: 700000 },
  "750": { copper: 0.0171, aluminum: 0.0282, area: 750000 },
  "800": { copper: 0.0161, aluminum: 0.0265, area: 800000 },
  "900": { copper: 0.0143, aluminum: 0.0235, area: 900000 },
  "1000": { copper: 0.0129, aluminum: 0.0212, area: 1000000 },
  "1250": { copper: 0.0103, aluminum: 0.0169, area: 1250000 },
  "1500": { copper: 0.00858, aluminum: 0.0141, area: 1500000 },
  "1750": { copper: 0.00735, aluminum: 0.0121, area: 1750000 },
  "2000": { copper: 0.00643, aluminum: 0.0106, area: 2000000 }
};

const systemTypes = {
  "dc": { name: "DC (Direct Current)", factor: 2, description: "Corriente directa" },
  "ac_single": { name: "AC Single Phase", factor: 2, description: "Monofásico 120/240V" },
  "ac_three": { name: "AC Three Phase", factor: 1.732, multiplier: 0.866, description: "Trifásico 208/480V" }
};

const voltageStandards = {
  "120": { nominal: 120, type: "Residential/Commercial" },
  "208": { nominal: 208, type: "Commercial Three Phase" },
  "240": { nominal: 240, type: "Residential/Small Commercial" },
  "277": { nominal: 277, type: "Commercial Lighting" },
  "480": { nominal: 480, type: "Industrial Three Phase" }
};

const CalculadoraVoltageDrop = () => {
  const [systemType, setSystemType] = useState("ac_single");
  const [conductorSize, setConductorSize] = useState("12");
  const [conductorMaterial, setConductorMaterial] = useState("copper");
  const [voltage, setVoltage] = useState("120");
  const [current, setCurrent] = useState("");
  const [distance, setDistance] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = () => {
    if (!current || !distance) {
      setResultado(null);
      return;
    }

    const conductor = conductorData[conductorSize];
    if (!conductor) return;

    // Verificar que el material esté disponible para este conductor
    const resistance = conductorMaterial === "copper" ? conductor.copper : conductor.aluminum;
    if (!resistance) {
      setResultado({ error: "Material no disponible para este tamaño de conductor" });
      return;
    }

    const systemInfo = systemTypes[systemType];
    const voltageValue = parseInt(voltage);
    const currentValue = parseFloat(current);
    const distanceValue = parseFloat(distance);

    // Cálculo de voltage drop según NEC 2023 - 215.2(A)(2)
    // VD = (2 × L × R × I) / 1000 para DC y AC monofásico
    // VD × 0.866 para sistemas trifásicos
    let voltageDrop;
    if (systemType === "ac_three") {
      // Para trifásico: VD = (2 × L × R × I) / 1000 × 0.866
      voltageDrop = (2 * distanceValue * resistance * currentValue) / 1000 * systemInfo.multiplier;
    } else {
      // Para DC y AC monofásico: VD = (2 × L × R × I) / 1000
      voltageDrop = (2 * distanceValue * resistance * currentValue) / 1000;
    }
    const voltageDropPercent = (voltageDrop / voltageValue) * 100;
    const finalVoltage = voltageValue - voltageDrop;

    // Determinar estado según NEC 2023 Informational Notes
    let status = "good";
    let recommendation = "✅ Dentro de límites recomendados";
    let necLimit = "3% para feeders/branch circuits, 5% total (Informational Notes)";

    if (voltageDropPercent > 5) {
      status = "critical";
      recommendation = "❌ CRÍTICO: Excede 5% - Requerido aumentar calibre";
    } else if (voltageDropPercent > 3) {
      status = "warning";
      recommendation = "⚠️ ADVERTENCIA: Excede 3% - Considerar aumentar calibre";
    }

    // Sugerir próximo calibre si es necesario
    let suggestedWire = null;
    if (voltageDropPercent > 3) {
      // Orden correcto de calibres de menor a mayor (menor resistencia)
      const orderedSizes = ["18", "16", "14", "12", "10", "8", "6", "4", "3", "2", "1", "1/0", "2/0", "3/0", "4/0", "250", "300", "350", "400", "500", "600", "700", "750", "800", "900", "1000", "1250", "1500", "1750", "2000"];
      const currentIndex = orderedSizes.indexOf(conductorSize);
      
      // Buscar el siguiente calibre más grande
      for (let i = currentIndex + 1; i < orderedSizes.length; i++) {
        const nextSize = orderedSizes[i];
        const nextConductor = conductorData[nextSize];
        const nextResistance = conductorMaterial === "copper" ? nextConductor.copper : nextConductor.aluminum;
        
        if (nextResistance) {
          let nextVD;
          if (systemType === "ac_three") {
            nextVD = (2 * distanceValue * nextResistance * currentValue) / 1000 * systemInfo.multiplier;
          } else {
            nextVD = (2 * distanceValue * nextResistance * currentValue) / 1000;
          }
          const nextVDPercent = (nextVD / voltageValue) * 100;
          
          if (nextVDPercent <= 3) {
            suggestedWire = nextSize;
            break;
          }
        }
      }
    }

    setResultado({
      voltageDrop: voltageDrop.toFixed(2),
      voltageDropPercent: voltageDropPercent.toFixed(2),
      finalVoltage: finalVoltage.toFixed(1),
      status,
      recommendation,
      necLimit,
      suggestedWire,
      conductorResistance: resistance,
      systemFactor: systemInfo.factor,
      calculations: {
        formula: systemType === "ac_three" 
          ? `VD = (2 × L × R × I) / 1000 × 0.866` 
          : `VD = (2 × L × R × I) / 1000`,
        values: systemType === "ac_three"
          ? `(2 × ${distanceValue}ft × ${resistance}Ω/1000ft × ${currentValue}A) / 1000 × 0.866`
          : `(2 × ${distanceValue}ft × ${resistance}Ω/1000ft × ${currentValue}A) / 1000`,
        result: `${voltageDrop.toFixed(2)}V drop`,
        reference: "NEC 2023 - 215.2(A)(2) Enhanced Content"
      }
    });
  };

  React.useEffect(() => {
    calcular();
  }, [systemType, conductorSize, conductorMaterial, voltage, current, distance]);

  const getStatusColor = (status) => {
    switch (status) {
      case "good": return "from-green-600 to-green-700";
      case "warning": return "from-yellow-600 to-orange-600";
      case "critical": return "from-red-600 to-red-700";
      default: return "from-gray-600 to-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "good": return <CheckCircle className="w-6 h-6" />;
      case "warning": return <AlertTriangle className="w-6 h-6" />;
      case "critical": return <AlertTriangle className="w-6 h-6" />;
      default: return <Calculator className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#23272F] justify-between">
      {/* Header */}
      <div className="text-center mb-6 p-4">
        <div className="flex justify-center items-center mb-4 flex-wrap">
          <Settings className="text-orange-500 mr-2" size={28} />
          <h1 className="text-xl md:text-3xl font-bold text-white text-center">
            Calculadora Voltage Drop
          </h1>
          <Zap className="text-orange-500 ml-2" size={28} />
        </div>
        <p className="text-white text-sm md:text-lg font-semibold px-2">
          📉 Caída de voltaje en cables largos - NEC Table 8 ⚡
        </p>
        <p className="text-xs md:text-sm text-[#B0B8C1] mt-2">
          AC/DC • Monofásico/Trifásico • Cobre/Aluminio • Límites 3% y 5%
        </p>
      </div>

      {/* Calculator Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-4 md:p-6 text-white mb-6 mx-4">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center">
          <Calculator className="mr-3" />
          Configuración del Sistema
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* System Type */}
          <div>
            <label className="block text-base font-semibold text-yellow-300 mb-2">
              ⚡ Tipo de Sistema
            </label>
            <select 
              value={systemType}
              onChange={(e) => setSystemType(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
            >
              {Object.entries(systemTypes).map(([key, system]) => (
                <option key={key} value={key}>
                  {system.name} - {system.description}
                </option>
              ))}
            </select>
          </div>

          {/* Voltage */}
          <div>
            <label className="block text-base font-semibold text-yellow-300 mb-2">
              🔌 Voltaje del Sistema
            </label>
            <select 
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
            >
              {Object.entries(voltageStandards).map(([volt, info]) => (
                <option key={volt} value={volt}>
                  {volt}V - {info.type}
                </option>
              ))}
            </select>
          </div>

          {/* Conductor Size */}
          <div>
            <label className="block text-base font-semibold text-yellow-300 mb-2">
              📏 Calibre del Conductor
            </label>
            <select 
              value={conductorSize}
              onChange={(e) => setConductorSize(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
            >
              {Object.entries(conductorData).map(([size, data]) => (
                <option key={size} value={size}>
                  {size} AWG {size.includes("/") || parseInt(size) >= 250 ? "kcmil" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Conductor Material */}
          <div>
            <label className="block text-base font-semibold text-yellow-300 mb-2">
              🔩 Material del Conductor
            </label>
            <select 
              value={conductorMaterial}
              onChange={(e) => setConductorMaterial(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
            >
              <option value="copper">Cobre (Copper)</option>
              <option value="aluminum">Aluminio (Aluminum)</option>
            </select>
          </div>

          {/* Current */}
          <div>
            <label className="block text-base font-semibold text-yellow-300 mb-2">
              ⚡ Corriente (Amps)
            </label>
            <input 
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
              placeholder="Ej: 20"
              step="0.1"
            />
          </div>

          {/* Distance */}
          <div>
            <label className="block text-base font-semibold text-yellow-300 mb-2">
              📐 Distancia (pies - one-way)
            </label>
            <input 
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
              placeholder="Ej: 100"
              step="1"
            />
            <p className="text-yellow-200 text-xs mt-1">Distancia de ida solamente (NEC formula incluye factor 2)</p>
          </div>
        </div>

        {/* Results */}
        {resultado && !resultado.error && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
            <div className="text-center mb-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(resultado.status)} text-white font-bold mb-2`}>
                {getStatusIcon(resultado.status)}
                <span className="ml-2">{resultado.voltageDropPercent}% Voltage Drop</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {resultado.voltageDrop}V caída • {resultado.finalVoltage}V final
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
              <div className="bg-orange-500/20 rounded-lg p-3">
                <div className="font-bold text-orange-200">Voltage Drop</div>
                <div className="text-white text-lg font-semibold">{resultado.voltageDrop} V</div>
                <div className="text-gray-300 text-xs">Caída de voltaje calculada</div>
              </div>

              <div className="bg-orange-500/20 rounded-lg p-3">
                <div className="font-bold text-orange-200">Porcentaje</div>
                <div className="text-white text-lg font-semibold">{resultado.voltageDropPercent}%</div>
                <div className="text-gray-300 text-xs">% de caída de voltaje</div>
              </div>

              <div className="bg-orange-500/20 rounded-lg p-3">
                <div className="font-bold text-orange-200">Voltaje Final</div>
                <div className="text-white text-lg font-semibold">{resultado.finalVoltage} V</div>
                <div className="text-gray-300 text-xs">Voltaje en la carga</div>
              </div>

              <div className="bg-orange-500/20 rounded-lg p-3">
                <div className="font-bold text-orange-200">Resistencia</div>
                <div className="text-white text-lg font-semibold">{resultado.conductorResistance} Ω</div>
                <div className="text-gray-300 text-xs">Por 1000 pies (NEC Table 8)</div>
              </div>
            </div>

            {/* Recommendation */}
            <div className={`bg-gradient-to-r ${getStatusColor(resultado.status)} bg-opacity-20 rounded-lg p-3 mb-4`}>
              <div className="font-bold text-yellow-200 mb-1">📋 Evaluación NEC:</div>
              <div className="text-white font-semibold">{resultado.recommendation}</div>
              <div className="text-gray-300 text-sm mt-1">Límite: {resultado.necLimit}</div>
            </div>

            {/* Wire Suggestion */}
            {resultado.suggestedWire && (
              <div className="bg-blue-500/20 rounded-lg p-3 mb-4">
                <div className="font-bold text-blue-200 mb-1">💡 Recomendación:</div>
                <div className="text-white font-semibold">
                  Usar calibre {resultado.suggestedWire} AWG para cumplir con límite del 3%
                </div>
              </div>
            )}

            {/* Calculation Details */}
            <div className="bg-gray-800 rounded-lg p-4 mt-4">
              <div className="font-bold text-gray-300 mb-2">🧮 Cálculo Detallado (NEC 2023):</div>
              <div className="text-yellow-300 text-sm font-mono mb-1">
                {resultado.calculations.formula}
              </div>
              <div className="text-white text-sm font-mono mb-1">
                {resultado.calculations.values}
              </div>
              <div className="text-green-300 text-sm font-mono mb-2">
                = {resultado.calculations.result}
              </div>
              <div className="text-blue-300 text-xs">
                📋 {resultado.calculations.reference}
              </div>
            </div>
          </div>
        )}

        {resultado && resultado.error && (
          <div className="bg-red-500/20 rounded-lg p-4 mb-4">
            <div className="text-red-200 font-bold">❌ Error:</div>
            <div className="text-white">{resultado.error}</div>
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="mx-4 mb-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
          📚 Información sobre Voltage Drop
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">📐 Límites del NEC</h3>
            <p className="text-white text-sm">
              <strong>3%</strong> máximo para feeders y circuitos ramales.
              <strong>5%</strong> máximo combinado (feeder + ramal).
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">⚡ Fórmula Oficial NEC</h3>
            <p className="text-white text-sm">
              <strong>DC/Monofásico:</strong> VD = (2×L×R×I)/1000<br/>
              <strong>Trifásico:</strong> VD × 0.866 (line-to-line)
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">🔩 Materiales</h3>
            <p className="text-white text-sm">
              <strong>Cobre:</strong> Mejor conductividad, más caro.
              <strong>Aluminio:</strong> Mayor resistencia, más económico.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">📏 Distancia (One-Way)</h3>
            <p className="text-white text-sm">
              Distancia de <strong>ida solamente</strong> según NEC.
              La fórmula incluye factor 2 para ida y vuelta.
            </p>
          </div>
        </div>

        {/* Referencias NEC */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border-2 border-yellow-500">
          <h3 className="text-yellow-300 font-bold mb-3 flex items-center">
            📋 Referencias NEC 2023
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="text-white">• <span className="text-yellow-300">Chapter 9, Table 8</span> - Conductor Resistance</div>
            <div className="text-white">• <span className="text-yellow-300">210.19 Info Note</span> - 3% Branch Circuit</div>
            <div className="text-white">• <span className="text-yellow-300">215.2(A)(2) Info Note</span> - 3% Feeder</div>
            <div className="text-white">• <span className="text-yellow-300">215.2(A)(2)</span> - Fórmula Oficial VD</div>
          </div>
        </div>
      </div>

      <div className="h-5 bg-[#23272F]"></div>
    </div>
  );
};

export default CalculadoraVoltageDrop; 