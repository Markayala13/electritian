import React, { useState, useEffect } from 'react';
import { Calculator, Zap } from 'lucide-react';

// Áreas de conductores THHN (in²) según NEC 2023, Chapter 9, Table 5 - ACTUALIZADO
const conductorAreas = {
  'THHN': {
    '14': 0.0097,   // CORREGIDO: era 0.0083
    '12': 0.0133,   // CORREGIDO: era 0.0113
    '10': 0.0211,   // CORREGIDO: era 0.0181
    '8': 0.0366,    // CORREGIDO: era 0.0323
    '6': 0.0507,    // CORREGIDO: era 0.0484
    '4': 0.0824,    // ✅ CORRECTO
    '3': 0.0973,    // CORREGIDO: era 0.104
    '2': 0.1158,    // CORREGIDO: era 0.1257
    '1': 0.1562,    // CORREGIDO: era 0.1541
    '1/0': 0.1855,  // CORREGIDO: era 0.1953
    '2/0': 0.2223,  // CORREGIDO: era 0.2327
    '3/0': 0.2679,  // CORREGIDO: era 0.2767
    '4/0': 0.3237,  // CORREGIDO: era 0.3197
    '250': 0.3970,  // CORREGIDO: era 0.3673
    '300': 0.4608,  // CORREGIDO: era 0.4244
    '350': 0.5242,  // CORREGIDO: era 0.4837
    '400': 0.5863,  // CORREGIDO: era 0.5438
    '500': 0.7073,  // CORREGIDO: era 0.6547
    '600': 0.8676,  // NUEVO TAMAÑO
    '700': 0.9887,  // NUEVO TAMAÑO
    '750': 1.0496,  // NUEVO TAMAÑO
    '800': 1.1085,  // NUEVO TAMAÑO
    '900': 1.2311,  // NUEVO TAMAÑO
    '1000': 1.3478  // NUEVO TAMAÑO
  },
  'THWN': {
    '14': 0.0097,   // ✅ YA CORRECTO (igual que THHN en NEC 2023)
    '12': 0.0133,   // ✅ YA CORRECTO
    '10': 0.0211,   // ✅ YA CORRECTO
    '8': 0.0366,    // ✅ YA CORRECTO
    '6': 0.0507,    // ✅ YA CORRECTO
    '4': 0.0824,    // ✅ YA CORRECTO
    '3': 0.0973,    // ✅ YA CORRECTO
    '2': 0.1158,    // ✅ YA CORRECTO
    '1': 0.1562,    // ✅ YA CORRECTO
    '1/0': 0.1855,  // ✅ YA CORRECTO
    '2/0': 0.2223,  // ✅ YA CORRECTO
    '3/0': 0.2679,  // ✅ YA CORRECTO
    '4/0': 0.3237,  // ✅ YA CORRECTO
    '250': 0.3970,  // ✅ YA CORRECTO
    '300': 0.4608,  // ✅ YA CORRECTO
    '350': 0.5242,  // ✅ YA CORRECTO
    '400': 0.5863,  // ✅ YA CORRECTO
    '500': 0.7073,  // ✅ YA CORRECTO
    '600': 0.8676,  // NUEVO TAMAÑO
    '700': 0.9887,  // NUEVO TAMAÑO
    '750': 1.0496,  // NUEVO TAMAÑO
    '800': 1.1085,  // NUEVO TAMAÑO
    '900': 1.2311,  // NUEVO TAMAÑO
    '1000': 1.3478  // NUEVO TAMAÑO
  },
  'XHHW': {
    '14': 0.0139,   // ✅ YA CORRECTO
    '12': 0.0181,   // ✅ YA CORRECTO
    '10': 0.0243,   // CORREGIDO: era 0.0260
    '8': 0.0437,    // ✅ YA CORRECTO
    '6': 0.0590,    // ✅ YA CORRECTO
    '4': 0.0814,    // CORREGIDO: era 0.0973
    '3': 0.0962,    // CORREGIDO: era 0.1134
    '2': 0.1146,    // CORREGIDO: era 0.1333
    '1': 0.1534,    // CORREGIDO: era 0.1901
    '1/0': 0.1825,  // CORREGIDO: era 0.2290
    '2/0': 0.2190,  // CORREGIDO: era 0.2733
    '3/0': 0.2642,  // CORREGIDO: era 0.3267
    '4/0': 0.3197,  // CORREGIDO: era 0.3904
    '250': 0.3904,  // CORREGIDO: era 0.4784
    '300': 0.4536,  // CORREGIDO: era 0.5281
    '350': 0.5166,  // CORREGIDO: era 0.5958
    '400': 0.5782,  // CORREGIDO: era 0.6619
    '500': 0.6984,  // CORREGIDO: era 0.7901
    '600': 0.8709,  // NUEVO TAMAÑO
    '700': 0.9923,  // NUEVO TAMAÑO
    '750': 1.0532,  // NUEVO TAMAÑO
    '800': 1.1122,  // NUEVO TAMAÑO
    '900': 1.2351,  // NUEVO TAMAÑO
    '1000': 1.3519, // NUEVO TAMAÑO
    '1250': 1.7180, // NUEVO TAMAÑO
    '1500': 2.0156, // NUEVO TAMAÑO
    '1750': 2.3127, // NUEVO TAMAÑO
    '2000': 2.6079  // NUEVO TAMAÑO
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
    // EMT - Electrical Metallic Tubing (NEC 2023 Table 4) - ACTUALIZADO
    'EMT': {
      '0.5': 0.122,
      '0.75': 0.213,
      '1': 0.346,
      '1.25': 0.598,
      '1.5': 0.814,    // CORREGIDO: era 0.832
      '2': 1.342,
      '2.5': 2.343,    // CORREGIDO: era 2.288
      '3': 3.538,      // CORREGIDO: era 3.864
      '3.5': 4.618,    // CORREGIDO: era 4.858
      '4': 5.901,      // CORREGIDO: era 6.684
      '5': 8.085,      // NUEVO TAMAÑO
      '6': 11.663      // NUEVO TAMAÑO
    },
    // Rigid Steel Conduit (NEC 2023 Table 4) - ACTUALIZADO
    'Rigid Steel': {
      '0.5': 0.125,    // CORREGIDO: era 0.138
      '0.75': 0.220,   // CORREGIDO: era 0.242
      '1': 0.355,      // CORREGIDO: era 0.399
      '1.25': 0.610,   // CORREGIDO: era 0.684
      '1.5': 0.829,    // CORREGIDO: era 0.832
      '2': 1.363,      // CORREGIDO: era 1.360
      '2.5': 1.946,    // CORREGIDO: era 2.276 (ERROR GRANDE)
      '3': 3.000,      // CORREGIDO: era 3.864 (ERROR GRANDE)
      '3.5': 4.004,    // CORREGIDO: era 4.858 (ERROR GRANDE)
      '4': 5.153,      // CORREGIDO: era 6.684 (ERROR GRANDE)
      '5': 8.085,      // NUEVO TAMAÑO
      '6': 11.663      // NUEVO TAMAÑO
    },
    // PVC Schedule 40 (NEC 2023 Table 4) - ACTUALIZADO
    'PVC Sch 40': {
      '0.5': 0.114,    // CORREGIDO: era 0.122
      '0.75': 0.203,   // CORREGIDO: era 0.213
      '1': 0.333,      // CORREGIDO: era 0.346
      '1.25': 0.581,   // CORREGIDO: era 0.598
      '1.5': 0.794,    // CORREGIDO: era 0.832
      '2': 1.316,      // CORREGIDO: era 1.342
      '2.5': 1.878,    // CORREGIDO: era 2.288 (ERROR GRANDE)
      '3': 2.907,      // CORREGIDO: era 3.864 (ERROR MUY GRANDE)
      '3.5': 3.895,    // CORREGIDO: era 4.858 (ERROR GRANDE)
      '4': 5.022,      // CORREGIDO: era 6.684 (ERROR MUY GRANDE)
      '5': 7.904,      // CORREGIDO: era 10.864 (ERROR MASIVO)
      '6': 11.427      // CORREGIDO: era 15.882 (ERROR MASIVO)
    },
    // PVC Schedule 80 (NEC 2023 Table 4) - ACTUALIZADO
    'PVC Sch 80': {
      '0.5': 0.087,    // CORREGIDO: era 0.101
      '0.75': 0.164,   // CORREGIDO: era 0.175
      '1': 0.275,      // CORREGIDO: era 0.276 (casi correcto)
      '1.25': 0.495,   // CORREGIDO: era 0.473
      '1.5': 0.684,    // CORREGIDO: era 0.674
      '2': 1.150,      // CORREGIDO: era 1.088
      '2.5': 1.647,    // CORREGIDO: era 1.868
      '3': 2.577,      // CORREGIDO: era 3.049 (ERROR GRANDE)
      '3.5': 3.475,    // CORREGIDO: era 3.985 (ERROR GRANDE)
      '4': 4.503,      // CORREGIDO: era 5.018 (ERROR GRANDE)
      '5': 7.142,      // CORREGIDO: era 8.213 (ERROR GRANDE)
      '6': 10.239      // CORREGIDO: era 12.316 (ERROR GRANDE)
    },
    // Liquidtight Flexible Nonmetallic PVC (NEC 2023 Table 4) - ACTUALIZADO
    'Liquidtight Flexible Nonmetallic PVC': {
      '0.375': 0.074,  // NUEVO TAMAÑO: 3/8"
      '0.5': 0.121,    // CORREGIDO: era 0.122
      '0.75': 0.209,   // CORREGIDO: era 0.213
      '1': 0.333,      // CORREGIDO: era 0.346
      '1.25': 0.590,   // CORREGIDO: era 0.598
      '1.5': 0.789,    // CORREGIDO: era 0.832
      '2': 1.314       // CORREGIDO: era 1.342 (solo hasta 2" según NEC)
    },
    // Flexible Metal Conduit (FMC) - NEC 2023 Article 348 CORREGIDO
    'Metalic Aluminum Flexible Conduit': {
      '0.375': 0.046,  // NUEVO: 3/8" - NEC 2023 Art. 348
      '0.5': 0.127,    // CORREGIDO: era 0.122 - NEC 2023 Art. 348
      '0.75': 0.213,   // ✅ CORRECTO - NEC 2023 Art. 348
      '1': 0.327,      // CORREGIDO: era 0.346 - NEC 2023 Art. 348
      '1.25': 0.511,   // CORREGIDO: era 0.598 - NEC 2023 Art. 348
      '1.5': 0.743,    // CORREGIDO: era 0.832 - NEC 2023 Art. 348
      '2': 1.307,      // CORREGIDO: era 1.342 - NEC 2023 Art. 348
      '2.5': 1.963,    // CORREGIDO: era 2.288 - NEC 2023 Art. 348
      '3': 2.827,      // CORREGIDO: era 3.864 - NEC 2023 Art. 348
      '3.5': 3.848,    // CORREGIDO: era 4.858 - NEC 2023 Art. 348
      '4': 5.027       // CORREGIDO: era 6.684 - NEC 2023 Art. 348
    },
    // Liquidtight Flexible Metalic (LFMC) - NEC 2023 Article 350 CORREGIDO
    'Liquidtight Flexible Metalic': {
      '0.5': 0.077,    // CORREGIDO: era 0.138 - NEC 2023 Art. 350
      '0.75': 0.125,   // CORREGIDO: era 0.242 - NEC 2023 Art. 350
      '1': 0.216,      // CORREGIDO: era 0.399 - NEC 2023 Art. 350
      '1.25': 0.349,   // CORREGIDO: era 0.684 - NEC 2023 Art. 350
      '1.5': 0.611,    // CORREGIDO: era 0.832 - NEC 2023 Art. 350
      '2': 1.298,      // CORREGIDO: era 1.360 - NEC 2023 Art. 350
      '2.5': 1.953,    // CORREGIDO: era 2.276 - NEC 2023 Art. 350
      '3': 2.990,      // CORREGIDO: era 3.864 - NEC 2023 Art. 350
      '3.5': 3.893,    // CORREGIDO: era 4.858 - NEC 2023 Art. 350
      '4': 5.077       // CORREGIDO: era 6.684 - NEC 2023 Art. 350
    }
  };

  // Tamaños disponibles por tipo de conduit
  const availableSizes = {
    'EMT': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6'],
    'Rigid Steel': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6'],
    'PVC Sch 40': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6'],
    'PVC Sch 80': ['0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6'],
    'Liquidtight Flexible Nonmetallic PVC': ['0.375', '0.5', '0.75', '1', '1.25', '1.5', '2'],
    'Metalic Aluminum Flexible Conduit': ['0.375', '0.5', '0.75', '1', '1.25', '1.5', '2', '2.5', '3', '3.5', '4'],
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
      'Rigid Steel': 'Rigid Metal Conduit (RMC) - Acero galvanizado, máxima protección mecánica - NEC 2023 ✅',
      'PVC Sch 40': 'PVC Schedule 40 - Uso general, enterrado y expuesto - NEC 2023 ✅ ERRORES CRÍTICOS CORREGIDOS',
      'PVC Sch 80': 'PVC Schedule 80 - Pared gruesa, áreas de daño físico - NEC 2023 ✅ ERRORES CORREGIDOS',
      'Liquidtight Flexible Nonmetallic PVC': 'Liquidtight Flexible Nonmetallic Conduit (LFNC-C) - Flexible, resistente al agua, 3/8" a 2" - NEC 2023 ✅',
      'Metalic Aluminum Flexible Conduit': 'Flexible Metal Conduit (FMC) - NEC 2023 Article 348 ✅ CORREGIDO - Flexible metálico, ideal para conexiones a equipos',
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
          🟢 EMT ✅ • 🔵 Rigid Steel ✅ • 🟠 PVC Sch 40 ✅ • 🔴 PVC Sch 80 ✅ • 🟦 LFNC ✅ • 🟣 FMC ✅ • 🟫 LFMC ✅
        </p>
        <p className="text-xs md:text-sm text-[#B0B8C1] mt-2">
          Basado en NEC 2023 - National Electrical Code (ACTUALIZADO)
        </p>
      </div>

      {/* Type Selection Highlight - Responsive */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-3 md:p-4 mb-6 text-center">
        <h2 className="text-lg md:text-xl font-bold text-white mb-2">🔧 SELECCIONA TU TIPO DE CONDUIT/TUBO</h2>
        <p className="text-white text-sm md:text-base">Cada tipo tiene diferentes capacidades según NEC 2023</p>
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
              <option value="Liquidtight Flexible Nonmetallic PVC">🟦 Liquidtight Flexible Nonmetallic (LFNC)</option>
              <option value="Metalic Aluminum Flexible Conduit">🟣 FMC - Flexible Metal Conduit</option>
                              <option value="Liquidtight Flexible Metalic">🟫 LFMC - Liquidtight Flexible Metalic</option>
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

      {/* Technical References Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 md:p-6 mb-6 text-white">
        <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
          📚 Referencias Técnicas del NEC 2023
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-bold text-yellow-300 mb-2">📊 Fuentes de Datos</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Chapter 9, Table 4:</strong> Áreas de conduits disponibles</li>
              <li>• <strong>Chapter 9, Table 5:</strong> Áreas de conductores</li>
              <li>• <strong>Section 300.17:</strong> Reglas de porcentaje de llenado</li>
            </ul>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-bold text-yellow-300 mb-2">🧮 Cálculo Utilizado</h4>
            <div className="text-sm space-y-1">
              <div><strong>Fórmula:</strong> Área Conduit ÷ Área Conductor = Máx. Conductores</div>
              <div><strong>Ejemplo:</strong> 0.346 in² ÷ 0.0133 in² = 26 conductores</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h4 className="font-bold text-yellow-300 mb-3">❓ ¿Por qué el 40%?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-200">1 Conductor</div>
              <div className="text-xs">53% máximo</div>
              <div className="text-xs opacity-80">Poco calor generado</div>
            </div>
            <div className="text-center border-l border-r border-white/20 px-2">
              <div className="text-lg font-bold text-red-200">2 Conductores</div>
              <div className="text-xs">31% máximo</div>
              <div className="text-xs opacity-80">Más restrictivo (fase-neutro alta corriente)</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-200">3+ Conductores</div>
              <div className="text-xs">40% máximo</div>
              <div className="text-xs opacity-80">Circuitos balanceados (lo más común)</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-center opacity-90">
            <strong>Razón:</strong> Múltiples conductores generan calor. El 40% asegura suficiente espacio para ventilación y previene sobrecalentamiento.
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
        <h3 className="font-semibold text-yellow-800 mb-3 text-sm md:text-base">⚠️ Notas Importantes del NEC 2023:</h3>
        <ul className="text-xs md:text-sm text-yellow-700 space-y-1 md:space-y-2">
          <li>• <strong>40% de llenado máximo</strong> para 3 o más conductores (caso más común)</li>
          <li>• <strong>31% de llenado máximo</strong> para exactamente 2 conductores</li>
          <li>• <strong>53% de llenado máximo</strong> para 1 solo conductor</li>
          <li>• <strong>Niples de 24" o menos</strong> pueden llenarse al 60%</li>
          <li>• <strong>Siempre verificar con inspección local (AHJ)</strong> antes de instalar</li>
          <li>• <strong>Usar cable de tamaño adecuado</strong> - conduit más grande no significa cable más pequeño</li>
          <li>• <strong>Dejar cable extra</strong> para futuras conexiones o cambios</li>
        </ul>
      </div>
    </div>
  );
};

export default ConduitFillCalculator;
