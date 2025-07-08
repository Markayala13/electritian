import React, { useState } from 'react';
import { Home, Zap, Calculator } from 'lucide-react';

// Datos de aparatos eléctricos típicos basados en NEC 2023
const applianceData = {
  microwave: { name: "Microondas", watts: 1200, description: "Electrodoméstico de cocina estándar" },
  refrigerator: { name: "Refrigerador", watts: 800, description: "Refrigerador residencial típico" },
  electricRange: { name: "Estufa Eléctrica", watts: 12000, description: "Estufa eléctrica completa (NEC 220.55)" },
  electricDryer: { name: "Secadora Eléctrica", watts: 5000, description: "Secadora de ropa eléctrica (NEC 220.54)" },
  waterHeater: { name: "Calentador de Agua", watts: 4500, description: "Calentador de agua eléctrico residencial" },
  centralAC: { name: "Aire Central", watts: 4000, description: "Sistema central de aire acondicionado" }
};

const CalculadoraCargaResidencial = () => {
  const [metrosCuadrados, setMetrosCuadrados] = useState("100");
  const [appliances, setAppliances] = useState({
    microwave: false,
    refrigerator: false,
    electricRange: false,
    electricDryer: false,
    waterHeater: false,
    centralAC: false
  });
  const [resultado, setResultado] = useState(null);

  const calcularCarga = () => {
    // NEC 2023 - Cálculo oficial para dwelling units
    
    // Verificar que hay metros cuadrados válidos
    const m2 = Number(metrosCuadrados);
    if (!m2 || m2 <= 0) {
      setResultado(null);
      return;
    }
    
    // 1. Carga básica (220.41) - 33 VA/m² (incluye luces y outlets básicos)
    const cargaBasica = m2 * 33;
    
    // 2. Small appliance circuits (220.52A) - 3,000 VA
    const smallAppliances = 3000;
    
    // 3. Laundry circuit (220.52B) - 1,500 VA
    const lavanderia = 1500;
    
    // 4. Aparatos adicionales
    let aparatosVA = 0;
    const aparatosSeleccionados = [];
    
    Object.keys(appliances).forEach(key => {
      if (appliances[key]) {
        const appliance = applianceData[key];
        aparatosVA += appliance.watts;
        aparatosSeleccionados.push(appliance);
      }
    });
    
    // 5. Total antes de demand factors
    const totalBruto = cargaBasica + smallAppliances + lavanderia + aparatosVA;
    
    // 6. Aplicar demand factors NEC Table 220.45
    let demandLoad = 0;
    const generalLoad = cargaBasica + smallAppliances + lavanderia;
    
    if (generalLoad <= 3000) {
      demandLoad += generalLoad; // 100% de los primeros 3,000 VA
    } else {
      demandLoad += 3000; // Primeros 3,000 VA al 100%
      const remainder = generalLoad - 3000;
      if (remainder <= 117000) { // 3,001 a 120,000
        demandLoad += remainder * 0.35; // 35%
      } else {
        demandLoad += 117000 * 0.35; // 35% hasta 120,000
        demandLoad += (remainder - 117000) * 0.25; // 25% el resto
      }
    }
    
    // 7. Aparatos al 100% (sin demand factor para residencial típico)
    demandLoad += aparatosVA;
    
    // 8. Convertir a AMPS (240V sistema)
    const ampsCalculados = demandLoad / 240;
    
    // 9. Recomendación de panel (tamaños estándar)
    let panelRecomendado = "";
    if (ampsCalculados <= 100) {
      panelRecomendado = "100A";
    } else if (ampsCalculados <= 150) {
      panelRecomendado = "150A";
    } else if (ampsCalculados <= 200) {
      panelRecomendado = "200A";
    } else {
      panelRecomendado = "250A o mayor";
    }
    
    setResultado({
      metrosCuadrados: m2,
      cargaBasica,
      smallAppliances,
      lavanderia,
      aparatosVA,
      totalBruto,
      demandLoad,
      ampsCalculados: Math.ceil(ampsCalculados),
      panelRecomendado,
      aparatosSeleccionados
    });
  };

  React.useEffect(() => {
    calcularCarga();
  }, [metrosCuadrados, appliances]);

  const handleApplianceChange = (appliance) => {
    setAppliances(prev => ({
      ...prev,
      [appliance]: !prev[appliance]
    }));
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#23272F] justify-between">
      {/* Header */}
      <div className="text-center mb-6 p-4">
        <div className="flex justify-center items-center mb-4 flex-wrap">
          <Home className="text-blue-500 mr-2" size={28} />
          <h1 className="text-xl md:text-3xl font-bold text-white text-center">
            Calculadora de Carga Residencial
          </h1>
          <Calculator className="text-blue-500 ml-2" size={28} />
        </div>
        <p className="text-white text-sm md:text-lg font-semibold px-2">
          🏠 NEC 2023 - Metros Cuadrados → AMPS necesarios ⚡
        </p>
        <p className="text-xs md:text-sm text-[#B0B8C1] mt-2">
          Basado en NEC 2023 Sections 220.41, 220.52, Tables 220.45 y 220.55
        </p>
      </div>

      {/* Calculator Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-4 md:p-6 text-white mb-6 mx-4">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center">
          <Home className="mr-3" />
          Datos de la Casa/Departamento
        </h2>
        
        {/* Metros Cuadrados Input */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-white mb-2">
            📏 Metros Cuadrados (m²)
          </label>
          <input 
            type="number"
            value={metrosCuadrados}
            onChange={(e) => setMetrosCuadrados(e.target.value)}
            min="20"
            max="1000"
            className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
            placeholder="Ej: 120"
          />
          <p className="text-xs text-gray-200 mt-1">
            💡 Incluye automáticamente luces y outlets básicos (33 VA/m²)
          </p>
        </div>

        {/* Appliances Checkboxes */}
        <div className="mb-6">
          <label className="block text-base font-semibold text-yellow-300 mb-4">
            ⚡ Aparatos Eléctricos (marcar los que tiene)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.keys(applianceData).map((key) => {
              const appliance = applianceData[key];
              return (
                <label key={key} className="flex items-center bg-green-500/20 rounded-lg p-3 cursor-pointer hover:bg-green-500/30 border border-green-400/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={appliances[key]}
                    onChange={() => handleApplianceChange(key)}
                    className="mr-3 scale-125"
                  />
                  <div>
                    <div className="text-white font-medium">{appliance.name}</div>
                    <div className="text-gray-200 text-xs">{appliance.watts}W - {appliance.description}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {resultado && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
            <div className="text-center mb-4">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-yellow-300 drop-shadow">
                {resultado.ampsCalculados} AMPS
              </div>
              <div className="text-base md:text-lg text-gray-100">
                Carga Total Calculada
              </div>
              <div className="text-xs md:text-sm opacity-90 mt-2 text-gray-200">
                Casa de {resultado.metrosCuadrados}m² con aparatos seleccionados
              </div>
            </div>

            <div className="bg-green-500/20 rounded-lg p-3 mb-4">
              <p className="text-white text-sm font-medium text-center">
                🏠 <strong>Recomendación:</strong> Panel Principal de <span className="text-yellow-300 font-bold">{resultado.panelRecomendado}</span>
              </p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-500/20 rounded-lg p-3">
                <div className="font-bold text-blue-200">Carga Básica (220.41)</div>
                <div className="text-white">{resultado.metrosCuadrados}m² × 33 VA = {resultado.cargaBasica.toLocaleString()} VA</div>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-3">
                <div className="font-bold text-purple-200">Cocina/Lavandería (220.52)</div>
                <div className="text-white">{(resultado.smallAppliances + resultado.lavanderia).toLocaleString()} VA</div>
              </div>
              <div className="bg-orange-500/20 rounded-lg p-3">
                <div className="font-bold text-orange-200">Aparatos Adicionales</div>
                <div className="text-white">{resultado.aparatosVA.toLocaleString()} VA</div>
              </div>
              <div className="bg-green-500/20 rounded-lg p-3">
                <div className="font-bold text-green-200">Con Demand Factors</div>
                <div className="text-white">{Math.round(resultado.demandLoad).toLocaleString()} VA</div>
              </div>
            </div>

            {/* Selected Appliances */}
            {resultado.aparatosSeleccionados.length > 0 && (
              <div className="mt-4 bg-yellow-500/10 rounded-lg p-3">
                <div className="font-bold text-yellow-200 mb-2">⚡ Aparatos incluidos:</div>
                <div className="text-white text-xs">
                  {resultado.aparatosSeleccionados.map(app => app.name).join(", ")}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="mx-4 mb-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
          📚 ¿Cómo funciona el cálculo?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">📏 Carga Básica (220.41)</h3>
            <p className="text-white text-sm">
              <strong>33 VA por m²</strong> - Incluye automáticamente todas las luces, 
              switches y outlets básicos de 20A o menos.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">🍽️ Cargas Fijas (220.52)</h3>
            <p className="text-white text-sm">
              <strong>3,000 VA</strong> para cocina/comedor + <strong>1,500 VA</strong> 
              para lavandería. Son obligatorios en todas las casas.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">⚡ Aparatos Grandes</h3>
            <p className="text-white text-sm">
              Secadoras, estufas eléctricas, calentadores de agua. Cada uno 
              suma según su potencia real en watts.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">📊 Demand Factors</h3>
            <p className="text-white text-sm">
              El NEC usa factores de demanda porque no todos los aparatos 
              funcionan al 100% al mismo tiempo.
            </p>
          </div>
        </div>
      </div>

      {/* Panel Sizes Reference */}
      <div className="mx-4 mb-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
          🔌 Tamaños de Panel Estándar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { amps: "100A", use: "Casas pequeñas", size: "50-80m²" },
            { amps: "150A", use: "Casas medianas", size: "80-120m²" },
            { amps: "200A", use: "Casas grandes", size: "120m²+" },
            { amps: "250A+", use: "Casas súper grandes", size: "Todo eléctrico" }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 text-center">
              <div className="text-yellow-400 font-bold text-sm">{item.amps}</div>
              <div className="text-white text-xs">{item.use}</div>
              <div className="text-gray-300 text-xs">{item.size}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-5 bg-[#23272F]"></div>
    </div>
  );
};

export default CalculadoraCargaResidencial; 