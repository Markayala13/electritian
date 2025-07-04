import React, { useState, useEffect } from 'react';
import { Calculator, Zap } from 'lucide-react';

// Áreas de conductores THHN (in²) según NEC 2023, Chapter 9, Table 5
const conductorAreas = {
  'THHN': {
    '14': 0.0083,
    '12': 0.0113,
    '10': 0.0181,
    '8': 0.0323,
    '6': 0.0484,
    '4': 0.0824,
    '3': 0.104,
    '2': 0.1257,
    '1': 0.1541,
    '1/0': 0.1953,
    '2/0': 0.2327,
    '3/0': 0.2767,
    '4/0': 0.3197,
    '250': 0.3673,
    '300': 0.4244,
    '350': 0.4837,
    '400': 0.5438,
    '500': 0.6547
  },
  'THWN': {
    '14': 0.0097,
    '12': 0.0133,
    '10': 0.0211,
    '8': 0.0366,
    '6': 0.0507,
    '4': 0.0824,
    '3': 0.0973,
    '2': 0.1158,
    '1': 0.1562,
    '1/0': 0.1855,
    '2/0': 0.2223,
    '3/0': 0.2679,
    '4/0': 0.3237,
    '250': 0.3970,
    '300': 0.4608,
    '350': 0.5242,
    '400': 0.5863,
    '500': 0.7073
  },
  'XHHW': {
    '14': 0.0139,
    '12': 0.0181,
    '10': 0.0260,
    '8': 0.0437,
    '6': 0.0590,
    '4': 0.0973,
    '3': 0.1134,
    '2': 0.1333,
    '1': 0.1901,
    '1/0': 0.2290,
    '2/0': 0.2733,
    '3/0': 0.3267,
    '4/0': 0.3904,
    '250': 0.4784,
    '300': 0.5281,
    '350': 0.5958,
    '400': 0.6619,
    '500': 0.7901
  }
};

const ConduitFillCalculator = () => {
  const [selectedConduitType, setSelectedConduitType] = useState('EMT');
  const [selectedConduitSize, setSelectedConduitSize] = useState('0.5');
  const [selectedConductorType, setSelectedConductorType] = useState('THHN');
  const initialCalibre = Object.keys(conductorAreas['THHN'])[0];
  const [selectedConductorSize, setSelectedConductorSize] = useState(initialCalibre);
  const [maxConductors, setMaxConductors] = useState(0);
  const [conduitArea, setConduitArea] = useState(0);
  const [conductorArea, setConductorArea] = useState(0);
  const [totalConductorArea, setTotalConductorArea] = useState(0);
  const [fillPercentage, setFillPercentage] = useState(0);

  // Áreas internas de conduit (in²) para llenado al 40% según NEC 2023, Chapter 9, Table 4
  const conduitAreas = {
    // EMT - Electrical Metallic Tubing (NEC 2023 Table 4)
    'EMT': {
      '0.5': 0.122,
      '0.75': 0.213,
      '1': 0.346,
      '1.25': 0.598,
      '1.5': 0.832,
      '2': 1.342,
      '2.5': 2.288,
      '3': 3.864,
      '3.5': 4.858,
      '4': 6.684
    },
    // Rigid Steel Conduit (NEC 2023 Table 4)
    'Rigid Steel': {
      '0.5': 0.138,
      '0.75': 0.242,
      '1': 0.399,
      '1.25': 0.684,
      '1.5': 0.832,
      '2': 1.360,
      '2.5': 2.276,
      '3': 3.864,
      '3.5': 4.858,
      '4': 6.684
    },
    // PVC Schedule 40 (NEC 2023 Table 4)
    'PVC Sch 40': {
      '0.5': 0.122,
      '0.75': 0.213,
      '1': 0.346,
      '1.25': 0.598,
      '1.5': 0.832,
      '2': 1.342,
      '2.5': 2.288,
      '3': 3.864,
      '3.5': 4.858,
      '4': 6.684,
      '5': 10.864,
      '6': 15.882
    },
    // PVC Schedule 80 (NEC 2023 Table 4)
    'PVC Sch 80': {
      '0.5': 0.101,
      '0.75': 0.175,
      '1': 0.276,
      '1.25': 0.473,
      '1.5': 0.674,
      '2': 1.088,
      '2.5': 1.868,
      '3': 3.049,
      '3.5': 3.985,
      '4': 5.018,
      '5': 8.213,
      '6': 12.316
    },
    // Liquidtight Flexible Nonmetallic PVC (NEC 2023 Table 4)
    'Liquidtight Flexible Nonmetallic PVC': {
      '0.5': 0.122,
      '0.75': 0.213,
      '1': 0.346,
      '1.25': 0.598,
      '1.5': 0.832,
      '2': 1.342,
      '2.5': 2.288,
      '3': 3.864,
      '3.5': 4.858,
      '4': 6.684
    },
    // Metalic Aluminum Flexible Conduit (NEC 2023 Table 4, valores aproximados para flexible)
    'Metalic Aluminum Flexible Conduit': {
      '0.5': 0.122,
      '0.75': 0.213,
      '1': 0.346,
      '1.25': 0.598,
      '1.5': 0.832,
      '2': 1.342,
      '2.5': 2.288,
      '3': 3.864,
      '3.5': 4.858,
      '4': 6.684
    },
    // Liquidtight Flexible Metalic (LFMC) - NEC 2023 Table 4
    'Liquidtight Flexible Metalic': {
      '0.5': 0.138,
      '0.75': 0.242,
      '1': 0.399,
      '1.25': 0.684,
      '1.5': 0.832,
      '2': 1.360,
      '2.5': 2.276,
      '3': 3.864,
      '3.5': 4.858,
      '4': 6.684
    }
  };

  // Tamaños disponibles por tipo de conduit
  const availableSizes = {
    'EMT': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4'],
    'Rigid Steel': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4'],
    'PVC Sch 40': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4'],
    'PVC Sch 80': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4'],
    'Liquidtight Flexible Nonmetallic PVC': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4'],
    'Metalic Aluminum Flexible Conduit': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4'],
    'Liquidtight Flexible Metalic': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4']
  };

  const handleConduitTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedConduitType(newType);
    
    // Reset to first available size for new conduit type
    const firstSize = availableSizes[newType][0];
    setSelectedConduitSize(firstSize);
  };

  const handleConductorTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedConductorType(newType);
    const firstCalibre = Object.keys(conductorAreas[newType])[0];
    setSelectedConductorSize(firstCalibre);
  };

  const getConduitDescription = (type) => {
    const descriptions = {
      'EMT': 'Electrical Metallic Tubing - Galvanizado, uso interior/exterior',
      'Rigid Steel': 'Rigid Metal Conduit - Acero galvanizado, máxima protección',
      'PVC Sch 40': 'PVC Schedule 40 - Uso general, enterrado y expuesto',
      'PVC Sch 80': 'PVC Schedule 80 - Pared gruesa, áreas de daño físico',
      'Liquidtight Flexible Nonmetallic PVC': 'Liquidtight Flexible Nonmetallic Conduit (LFNC-B) - Flexible, resistente al agua, ideal para exteriores y áreas húmedas',
      'Metalic Aluminum Flexible Conduit': 'Flexible de aluminio metálico - Uso flexible, ideal para conexiones a equipos y áreas de difícil acceso',
      'Liquidtight Flexible Metalic': 'Liquidtight Flexible Metalic Conduit (LFMC) - Flexible metálico, resistente al agua, ideal para áreas industriales y exteriores'
    };
    return descriptions[type] || '';
  };

  useEffect(() => {
    const conduitAreaValue = conduitAreas[selectedConduitType]?.[selectedConduitSize] || 0;
    const conductorAreaValue = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
    
    if (conduitAreaValue > 0 && conductorAreaValue > 0) {
      const maxCond = Math.floor(conduitAreaValue / conductorAreaValue);
      const totalArea = maxCond * conductorAreaValue;
      const fillPercent = ((totalArea / (conduitAreaValue / 0.4)) * 100).toFixed(1);
      
      setMaxConductors(maxCond);
      setConduitArea(conduitAreaValue.toFixed(4));
      setConductorArea(conductorAreaValue.toFixed(4));
      setTotalConductorArea(totalArea);
      setFillPercentage(fillPercent);
    }
  }, [selectedConduitType, selectedConduitSize, selectedConductorType, selectedConductorSize]);

  return (
    <div className="w-full">
      {/* Header mejorado para mobile */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center mb-4 flex-wrap">
          <Zap className="text-yellow-500 mr-2" size={24} />
          <h1 className="text-xl md:text-3xl font-bold text-white text-center">
            Calculadora de Conduit Fill - California
          </h1>
          <Zap className="text-yellow-500 ml-2" size={24} />
        </div>
        <p className="text-white text-sm md:text-lg font-semibold px-2">
          🟢 EMT • 🔵 Rigid Steel • 🟠 PVC Sch 40 • 🔴 PVC Sch 80
        </p>
        <p className="text-xs md:text-sm text-[#B0B8C1] mt-2">
          Basado en NEC 2023 - Código Eléctrico de California
        </p>
      </div>

      {/* Type Selection Highlight - Responsive */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-3 md:p-4 mb-6 text-center">
        <h2 className="text-lg md:text-xl font-bold text-white mb-2">🔧 SELECCIONA TU TIPO DE CONDUIT/TUBO</h2>
        <p className="text-white text-sm md:text-base">Cada tipo tiene diferentes capacidades según NEC California</p>
      </div>

      {/* Calculator Section - Responsive Grid */}
      <div className="bg-gradient-to-r from-blue-600 to-[#00BFA6] rounded-xl p-4 md:p-6 text-white mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center">
          <Calculator className="mr-3" />
          Calculadora Principal
        </h2>
        
        {/* Grid responsivo mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 lg:col-span-1">
            <label className="block text-base font-semibold text-white mb-2">
              🔧 Tipo de Conduit/Tubo
            </label>
            <select 
              value={selectedConduitType}
              onChange={handleConduitTypeChange}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-semibold bg-yellow-50 text-xs md:text-sm"
            >
              <option value="EMT">🟢 EMT - Electrical Metallic</option>
              <option value="Rigid Steel">🔵 Rigid Steel - Tubo Rígido</option>
              <option value="PVC Sch 40">🟠 PVC Schedule 40</option>
              <option value="PVC Sch 80">🔴 PVC Schedule 80</option>
              <option value="Liquidtight Flexible Nonmetallic PVC">🟦 Liquidtight Flexible Nonmetallic PVC</option>
              <option value="Metalic Aluminum Flexible Conduit">🟣 Metalic Aluminum Flexible Conduit</option>
              <option value="Liquidtight Flexible Metalic">🟫 Liquidtight Flexible Metalic</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-2">
              📏 Tamaño (pulgadas)
            </label>
            <select 
              value={selectedConduitSize}
              onChange={(e) => setSelectedConduitSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            >
              {availableSizes[selectedConduitType].map(size => (
                <option key={size} value={size}>{size}"</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-2">
              🔌 Tipo de Conductor
            </label>
            <select 
              value={selectedConductorType}
              onChange={handleConductorTypeChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            >
              {Object.keys(conductorAreas).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-2">
              ⚡ Calibre AWG/kcmil
            </label>
            <select 
              value={selectedConductorSize}
              onChange={(e) => setSelectedConductorSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
            >
              {Object.keys(conductorAreas[selectedConductorType] || {}).map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <p className="text-sm text-white opacity-90 mb-2 font-medium">{getConduitDescription(selectedConduitType)}</p>
        </div>
      </div>

      {/* Results Section - Stack en mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Main Result */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 md:p-8 text-white shadow-lg">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-blue-100">📊 Resultado Principal</h3>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300 drop-shadow">{maxConductors}</div>
            <div className="text-base md:text-lg text-gray-100">Conductores Máximos</div>
            <div className="text-xs md:text-sm opacity-90 mt-2 text-blue-100">
              {selectedConductorType} {selectedConductorSize} AWG en {selectedConduitType} {selectedConduitSize}"
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 md:p-8 text-white shadow-lg">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-orange-100">🔧 Detalles Técnicos</h3>
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between text-base md:text-lg">
              <span className="text-gray-100">Área del Conduit (40%):</span>
              <span className="font-bold text-yellow-200">{conduitArea}" sq</span>
            </div>
            <div className="flex justify-between text-base md:text-lg">
              <span className="text-gray-100">Área por Conductor:</span>
              <span className="font-bold text-yellow-200">{conductorArea}" sq</span>
            </div>
            <div className="flex justify-between text-base md:text-lg">
              <span className="text-gray-100">Área Total Usada:</span>
              <span className="font-bold text-yellow-200">{totalConductorArea.toFixed(4)}" sq</span>
            </div>
            <div className="flex justify-between text-base md:text-lg">
              <span className="text-gray-100">% de Llenado:</span>
              <span className="font-bold text-yellow-200">{fillPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table - Scroll horizontal en mobile */}
      <div className="bg-gray-900/90 rounded-2xl p-3 md:p-6 mb-8 shadow-xl overflow-x-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-blue-100">
          📋 Comparación de Capacidades - {selectedConductorType} {selectedConductorSize} AWG
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px] text-gray-100 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-800/95 text-blue-100">
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-left font-bold rounded-tl-2xl">Tamaño</th>
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-center font-bold">🟢 EMT</th>
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-center font-bold">🔵 Rigid Steel</th>
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-center font-bold">🟠 PVC Sch 40</th>
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-center font-bold">🔴 PVC Sch 80</th>
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-center font-bold">🟣 Metalic Aluminum Flexible Conduit</th>
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-center font-bold">🟦 Liquidtight Flexible Nonmetallic PVC</th>
                <th className="border border-gray-700 px-3 md:px-5 py-3 text-center font-bold rounded-tr-2xl">🟫 Liquidtight Flexible Metalic</th>
              </tr>
            </thead>
            <tbody>
              {availableSizes.EMT.map((size, idx) => {
                const conductorArea = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
                return (
                  <tr key={size} className={idx % 2 === 0 ? 'bg-gray-800/70' : 'bg-gray-900/60'}>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 font-bold text-blue-100">{size}"</td>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 text-center font-semibold">{conduitAreas.EMT[size] ? Math.floor(conduitAreas.EMT[size] / conductorArea) : '-'}</td>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 text-center font-semibold">{conduitAreas['Rigid Steel'][size] ? Math.floor(conduitAreas['Rigid Steel'][size] / conductorArea) : '-'}</td>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 text-center font-semibold">{conduitAreas['PVC Sch 40'][size] ? Math.floor(conduitAreas['PVC Sch 40'][size] / conductorArea) : '-'}</td>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 text-center font-semibold">{conduitAreas['PVC Sch 80'][size] ? Math.floor(conduitAreas['PVC Sch 80'][size] / conductorArea) : '-'}</td>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 text-center font-semibold">{conduitAreas['Metalic Aluminum Flexible Conduit'][size] ? Math.floor(conduitAreas['Metalic Aluminum Flexible Conduit'][size] / conductorArea) : '-'}</td>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 text-center font-semibold">{conduitAreas['Liquidtight Flexible Nonmetallic PVC'][size] ? Math.floor(conduitAreas['Liquidtight Flexible Nonmetallic PVC'][size] / conductorArea) : '-'}</td>
                    <td className="border border-gray-700 px-3 md:px-5 py-3 text-center font-semibold">{conduitAreas['Liquidtight Flexible Metalic'][size] ? Math.floor(conduitAreas['Liquidtight Flexible Metalic'][size] / conductorArea) : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-blue-200 mt-2 text-center opacity-80">Desliza la tabla &rarr; para ver más columnas en móvil</div>
      </div>

      {/* Notes - Texto más pequeño en mobile */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 md:p-6 rounded-r-xl">
        <h3 className="font-semibold text-yellow-800 mb-3 text-sm md:text-base">⚠️ Notas Importantes del NEC California:</h3>
        <ul className="text-xs md:text-sm text-yellow-700 space-y-1 md:space-y-2">
          <li>• <strong>40% de llenado</strong> para 3 o más conductores del mismo tipo</li>
          <li>• <strong>31% de llenado</strong> para exactamente 2 conductores</li>
          <li>• <strong>53% de llenado</strong> para 1 solo conductor</li>
          <li>• Los niples de máximo 24" pueden llenarse al <strong>60%</strong></li>
          <li>• 🟢 <strong>EMT:</strong> Uso interior/exterior ligero, fácil instalación</li>
          <li>• 🔵 <strong>Rigid Steel:</strong> Máxima protección mecánica, áreas industriales</li>
          <li>• 🟠 <strong>PVC Sch 40:</strong> Enterrado directo, uso general económico</li>
          <li>• 🔴 <strong>PVC Sch 80:</strong> Alto daño físico, pared más gruesa</li>
          <li>• Siempre verificar con la autoridad local (AHJ) antes de la instalación</li>
          <li>• Datos basados en NEC 2023 Chapter 9 Tables 4 y 5</li>
        </ul>
      </div>
    </div>
  );
};

export default ConduitFillCalculator;
