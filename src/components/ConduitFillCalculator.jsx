
// import React, { useState } from 'react';
// import { Calculator, Zap } from 'lucide-react';

// const ConduitFillCalculator = () => {
//   const [selectedConduitType, setSelectedConduitType] = useState('EMT');
//   const [selectedConduitSize, setSelectedConduitSize] = useState('1/2');
//   const [selectedConductorType, setSelectedConductorType] = useState('THWN');
//   const [selectedConductorSize, setSelectedConductorSize] = useState('12');

//   // Datos oficiales del NEC 2023 Chapter 9 Table 4 - Áreas de Conduit (40% fill para 3+ conductores)
//   const conduitAreas = {
//     'EMT': {
//       '1/2': 0.122,
//       '3/4': 0.213,
//       '1': 0.346,
//       '1-1/4': 0.598,
//       '1-1/2': 0.814,
//       '2': 1.342,
//       '2-1/2': 2.343,
//       '3': 3.538
//     },
//     'Rigid Steel': {
//       '1/2': 0.125,
//       '3/4': 0.220,
//       '1': 0.355,
//       '1-1/4': 0.610,
//       '1-1/2': 0.829,
//       '2': 1.363,
//       '2-1/2': 2.071,
//       '3': 3.169,
//       '3-1/2': 4.004,
//       '4': 5.153
//     },
//     'PVC Sch 40': {
//       '1/2': 0.114,
//       '3/4': 0.203,
//       '1': 0.333,
//       '1-1/4': 0.581,
//       '1-1/2': 0.794,
//       '2': 1.316,
//       '2-1/2': 2.071,
//       '3': 3.169,
//       '3-1/2': 4.004,
//       '4': 5.153,
//       '5': 8.085,
//       '6': 11.663
//     },
//     'PVC Sch 80': {
//       '1/2': 0.096,
//       '3/4': 0.167,
//       '1': 0.275,
//       '1-1/4': 0.495,
//       '1-1/2': 0.684,
//       '2': 1.150,
//       '2-1/2': 1.825,
//       '3': 2.850,
//       '3-1/2': 3.701,
//       '4': 4.768,
//       '5': 7.708,
//       '6': 11.176
//     }
//   };

//   // Áreas de conductores del NEC Chapter 9 Table 5
//   const conductorAreas = {
//     'THWN': {
//       '14': 0.0097,
//       '12': 0.0133,
//       '10': 0.0211,
//       '8': 0.0366,
//       '6': 0.0507,
//       '4': 0.0824,
//       '3': 0.0973,
//       '2': 0.1158,
//       '1': 0.1562,
//       '1/0': 0.1855,
//       '2/0': 0.2223,
//       '3/0': 0.2679,
//       '4/0': 0.3237,
//       '250': 0.3970,
//       '300': 0.4608,
//       '350': 0.5242,
//       '400': 0.5863,
//       '500': 0.7073
//     },
//     'THHN': {
//       '14': 0.0097,
//       '12': 0.0133,
//       '10': 0.0211,
//       '8': 0.0366,
//       '6': 0.0507,
//       '4': 0.0824,
//       '3': 0.0973,
//       '2': 0.1158,
//       '1': 0.1562,
//       '1/0': 0.1855,
//       '2/0': 0.2223,
//       '3/0': 0.2679,
//       '4/0': 0.3237,
//       '250': 0.3970,
//       '300': 0.4608,
//       '350': 0.5242,
//       '400': 0.5863,
//       '500': 0.7073
//     },
//     'XHHW': {
//       '14': 0.0139,
//       '12': 0.0181,
//       '10': 0.0260,
//       '8': 0.0437,
//       '6': 0.0590,
//       '4': 0.0973,
//       '3': 0.1134,
//       '2': 0.1333,
//       '1': 0.1901,
//       '1/0': 0.2290,
//       '2/0': 0.2733,
//       '3/0': 0.3267,
//       '4/0': 0.3904,
//       '250': 0.4784,
//       '300': 0.5281,
//       '350': 0.5958,
//       '400': 0.6619,
//       '500': 0.7901
//     }
//   };

//   // Tamaños disponibles por tipo de conduit
//   const availableSizes = {
//     'EMT': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3'],
//     'Rigid Steel': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4'],
//     'PVC Sch 40': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4', '5', '6'],
//     'PVC Sch 80': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4', '5', '6']
//   };

//   const calculateMaxConductors = () => {
//     const conduitArea = conduitAreas[selectedConduitType]?.[selectedConduitSize] || 0;
//     const conductorArea = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
    
//     if (conductorArea === 0 || conduitArea === 0) return 0;
    
//     return Math.floor(conduitArea / conductorArea);
//   };

//   const getConduitDescription = (type) => {
//     const descriptions = {
//       'EMT': 'Electrical Metallic Tubing - Galvanizado, uso interior/exterior',
//       'Rigid Steel': 'Rigid Metal Conduit - Acero galvanizado, máxima protección',
//       'PVC Sch 40': 'PVC Schedule 40 - Uso general, enterrado y expuesto',
//       'PVC Sch 80': 'PVC Schedule 80 - Pared gruesa, áreas de daño físico'
//     };
//     return descriptions[type] || '';
//   };

//   const maxConductors = calculateMaxConductors();
//   const conduitArea = conduitAreas[selectedConduitType]?.[selectedConduitSize] || 0;
//   const conductorArea = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
//   const totalConductorArea = maxConductors * conductorArea;
//   const fillPercentage = conduitArea > 0 ? ((totalConductorArea / (conduitArea / 0.4)) * 100).toFixed(1) : 0;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
//       <div className="bg-white rounded-2xl shadow-2xl p-8">
//         <div className="text-center mb-8">
//           <div className="flex justify-center items-center mb-4">
//             <Zap className="text-yellow-500 mr-3" size={32} />
//             <h1 className="text-3xl font-bold text-gray-900">
//               Calculadora de Conduit Fill
//             </h1>
//             <Zap className="text-yellow-500 ml-3" size={32} />
//           </div>
//           <p className="text-gray-600 text-lg">
//             EMT • Rigid Steel • PVC Schedule 40 • PVC Schedule 80
//           </p>
//           <p className="text-sm text-gray-500 mt-2">
//             Basado en NEC 2023 - Código Eléctrico de California
//           </p>
//         </div>

//         {/* Calculator Section */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
//           <h2 className="text-xl font-semibold mb-6 flex items-center">
//             <Calculator className="mr-3" />
//             Calculadora Principal
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Tipo de Conduit
//               </label>
//               <select 
//                 value={selectedConduitType}
//                 onChange={(e) => {
//                   setSelectedConduitType(e.target.value);
//                   setSelectedConduitSize(availableSizes[e.target.value][0]);
//                 }}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
//               >
//                 {Object.keys(conduitAreas).map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Tamaño (pulgadas)
//               </label>
//               <select 
//                 value={selectedConduitSize}
//                 onChange={(e) => setSelectedConduitSize(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
//               >
//                 {availableSizes[selectedConduitType].map(size => (
//                   <option key={size} value={size}>{size}"</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Tipo de Conductor
//               </label>
//               <select 
//                 value={selectedConductorType}
//                 onChange={(e) => setSelectedConductorType(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
//               >
//                 {Object.keys(conductorAreas).map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Calibre AWG/kcmil
//               </label>
//               <select 
//                 value={selectedConductorSize}
//                 onChange={(e) => setSelectedConductorSize(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
//               >
//                 {Object.keys(conductorAreas[selectedConductorType] || {}).map(size => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="bg-white/10 backdrop-blur rounded-lg p-4">
//             <p className="text-sm opacity-90 mb-2">{getConduitDescription(selectedConduitType)}</p>
//           </div>
//         </div>

//         {/* Results Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Main Result */}
//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
//             <h3 className="text-lg font-semibold mb-4">📊 Resultado Principal</h3>
//             <div className="text-center">
//               <div className="text-5xl font-bold mb-2">{maxConductors}</div>
//               <div className="text-lg">Conductores Máximos</div>
//               <div className="text-sm opacity-90 mt-2">
//                 {selectedConductorType} {selectedConductorSize} AWG en {selectedConduitType} {selectedConduitSize}"
//               </div>
//             </div>
//           </div>

//           {/* Technical Details */}
//           <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
//             <h3 className="text-lg font-semibold mb-4">🔧 Detalles Técnicos</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span>Área del Conduit (40%):</span>
//                 <span className="font-semibold">{conduitArea}" sq</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Área por Conductor:</span>
//                 <span className="font-semibold">{conductorArea}" sq</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Área Total Usada:</span>
//                 <span className="font-semibold">{totalConductorArea.toFixed(4)}" sq</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>% de Llenado:</span>
//                 <span className="font-semibold">{fillPercentage}%</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Comparison Table */}
//         <div className="bg-gray-50 rounded-xl p-6">
//           <h3 className="text-xl font-semibold mb-4 text-gray-900">
//             📋 Comparación de Capacidades - {selectedConductorType} {selectedConductorSize} AWG
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Tamaño</th>
//                   <th className="border border-gray-300 px-4 py-3 text-center font-semibold">EMT</th>
//                   <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Rigid Steel</th>
//                   <th className="border border-gray-300 px-4 py-3 text-center font-semibold">PVC Sch 40</th>
//                   <th className="border border-gray-300 px-4 py-3 text-center font-semibold">PVC Sch 80</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {availableSizes.EMT.map(size => {
//                   const conductorArea = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
//                   return (
//                     <tr key={size} className="hover:bg-gray-100">
//                       <td className="border border-gray-300 px-4 py-2 font-medium">{size}"</td>
//                       <td className="border border-gray-300 px-4 py-2 text-center">
//                         {conduitAreas.EMT[size] ? Math.floor(conduitAreas.EMT[size] / conductorArea) : '-'}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-center">
//                         {conduitAreas['Rigid Steel'][size] ? Math.floor(conduitAreas['Rigid Steel'][size] / conductorArea) : '-'}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-center">
//                         {conduitAreas['PVC Sch 40'][size] ? Math.floor(conduitAreas['PVC Sch 40'][size] / conductorArea) : '-'}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2 text-center">
//                         {conduitAreas['PVC Sch 80'][size] ? Math.floor(conduitAreas['PVC Sch 80'][size] / conductorArea) : '-'}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Notes */}
//         <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
//           <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Notas Importantes del NEC:</h3>
//           <ul className="text-sm text-yellow-700 space-y-2">
//             <li>• <strong>40% de llenado</strong> para 3 o más conductores del mismo tipo</li>
//             <li>• <strong>31% de llenado</strong> para exactamente 2 conductores</li>
//             <li>• <strong>53% de llenado</strong> para 1 solo conductor</li>
//             <li>• Los niples de máximo 24" pueden llenarse al <strong>60%</strong></li>
//             <li>• Siempre verificar con la autoridad local (AHJ) antes de la instalación</li>
//             <li>• Datos basados en NEC 2023 Chapter 9 Tables 4 y 5</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConduitFillCalculator;

import React, { useState } from 'react';
import { Calculator, Zap } from 'lucide-react';

const ConduitFillCalculator = () => {
  const [selectedConduitType, setSelectedConduitType] = useState('EMT');
  const [selectedConduitSize, setSelectedConduitSize] = useState('1/2');
  const [selectedConductorType, setSelectedConductorType] = useState('THWN');
  const [selectedConductorSize, setSelectedConductorSize] = useState('12');

  // Datos oficiales del NEC 2023 Chapter 9 Table 4 - Áreas de Conduit (40% fill para 3+ conductores)
  const conduitAreas = {
    'EMT': {
      '1/2': 0.122,
      '3/4': 0.213,
      '1': 0.346,
      '1-1/4': 0.598,
      '1-1/2': 0.814,
      '2': 1.342,
      '2-1/2': 2.343,
      '3': 3.538
    },
    'Rigid Steel': {
      '1/2': 0.125,
      '3/4': 0.220,
      '1': 0.355,
      '1-1/4': 0.610,
      '1-1/2': 0.829,
      '2': 1.363,
      '2-1/2': 2.071,
      '3': 3.169,
      '3-1/2': 4.004,
      '4': 5.153
    },
    'PVC Sch 40': {
      '1/2': 0.114,
      '3/4': 0.203,
      '1': 0.333,
      '1-1/4': 0.581,
      '1-1/2': 0.794,
      '2': 1.316,
      '2-1/2': 2.071,
      '3': 3.169,
      '3-1/2': 4.004,
      '4': 5.153,
      '5': 8.085,
      '6': 11.663
    },
    'PVC Sch 80': {
      '1/2': 0.096,
      '3/4': 0.167,
      '1': 0.275,
      '1-1/4': 0.495,
      '1-1/2': 0.684,
      '2': 1.150,
      '2-1/2': 1.825,
      '3': 2.850,
      '3-1/2': 3.701,
      '4': 4.768,
      '5': 7.708,
      '6': 11.176
    }
  };

  // Áreas de conductores del NEC Chapter 9 Table 5
  const conductorAreas = {
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
    'THHN': {
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

  // Tamaños disponibles por tipo de conduit
  const availableSizes = {
    'EMT': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3'],
    'Rigid Steel': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4'],
    'PVC Sch 40': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4', '5', '6'],
    'PVC Sch 80': ['1/2', '3/4', '1', '1-1/4', '1-1/2', '2', '2-1/2', '3', '3-1/2', '4', '5', '6']
  };

  const calculateMaxConductors = () => {
    const conduitArea = conduitAreas[selectedConduitType]?.[selectedConduitSize] || 0;
    const conductorArea = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
    
    if (conductorArea === 0 || conduitArea === 0) return 0;
    
    return Math.floor(conduitArea / conductorArea);
  };

  const getConduitDescription = (type) => {
    const descriptions = {
      'EMT': '🟢 Electrical Metallic Tubing - Galvanizado, uso interior/exterior ligero',
      'Rigid Steel': '🔵 Rigid Metal Conduit - Acero galvanizado, máxima protección mecánica',
      'PVC Sch 40': '🟠 PVC Schedule 40 - Uso general, enterrado directo y expuesto',
      'PVC Sch 80': '🔴 PVC Schedule 80 - Pared gruesa, áreas de alto daño físico'
    };
    return descriptions[type] || '';
  };

  const handleConduitTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedConduitType(newType);
    // Actualizar automáticamente el tamaño al primer disponible del nuevo tipo
    setSelectedConduitSize(availableSizes[newType][0]);
  };

  const maxConductors = calculateMaxConductors();
  const conduitArea = conduitAreas[selectedConduitType]?.[selectedConduitSize] || 0;
  const conductorArea = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
  const totalConductorArea = maxConductors * conductorArea;
  const fillPercentage = conduitArea > 0 ? ((totalConductorArea / (conduitArea / 0.4)) * 100).toFixed(1) : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Zap className="text-yellow-500 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">
              Calculadora de Conduit Fill - California
            </h1>
            <Zap className="text-yellow-500 ml-3" size={32} />
          </div>
          <p className="text-gray-600 text-lg font-semibold">
            🟢 EMT • 🔵 Rigid Steel • 🟠 PVC Sch 40 • 🔴 PVC Sch 80
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Basado en NEC 2023 - Código Eléctrico de California
          </p>
        </div>

        {/* Type Selection Highlight */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-6 text-center">
          <h2 className="text-xl font-bold text-white mb-2">🔧 SELECCIONA TU TIPO DE CONDUIT/TUBO</h2>
          <p className="text-white/90">Cada tipo tiene diferentes capacidades según NEC California</p>
        </div>

        {/* Calculator Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Calculator className="mr-3" />
            Calculadora Principal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                🔧 Tipo de Conduit/Tubo (NEC California)
              </label>
              <select 
                value={selectedConduitType}
                onChange={handleConduitTypeChange}
                className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-semibold bg-yellow-50"
              >
                <option value="EMT">🟢 EMT - Electrical Metallic Tubing</option>
                <option value="Rigid Steel">🔵 Rigid Steel - Tubo Rígido de Acero</option>
                <option value="PVC Sch 40">🟠 PVC Schedule 40 - Uso General</option>
                <option value="PVC Sch 80">🔴 PVC Schedule 80 - Alta Resistencia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                📏 Tamaño (pulgadas)
              </label>
              <select 
                value={selectedConduitSize}
                onChange={(e) => setSelectedConduitSize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {availableSizes[selectedConduitType].map(size => (
                  <option key={size} value={size}>{size}"</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                🔌 Tipo de Conductor
              </label>
              <select 
                value={selectedConductorType}
                onChange={(e) => setSelectedConductorType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {Object.keys(conductorAreas).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                ⚡ Calibre AWG/kcmil
              </label>
              <select 
                value={selectedConductorSize}
                onChange={(e) => setSelectedConductorSize(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {Object.keys(conductorAreas[selectedConductorType] || {}).map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm opacity-90 mb-2 font-medium">{getConduitDescription(selectedConduitType)}</p>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Main Result */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">📊 Resultado Principal</h3>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{maxConductors}</div>
              <div className="text-lg">Conductores Máximos</div>
              <div className="text-sm opacity-90 mt-2">
                {selectedConductorType} {selectedConductorSize} AWG en {selectedConduitType} {selectedConduitSize}"
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">🔧 Detalles Técnicos</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Área del Conduit (40%):</span>
                <span className="font-semibold">{conduitArea}" sq</span>
              </div>
              <div className="flex justify-between">
                <span>Área por Conductor:</span>
                <span className="font-semibold">{conductorArea}" sq</span>
              </div>
              <div className="flex justify-between">
                <span>Área Total Usada:</span>
                <span className="font-semibold">{totalConductorArea.toFixed(4)}" sq</span>
              </div>
              <div className="flex justify-between">
                <span>% de Llenado:</span>
                <span className="font-semibold">{fillPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            📋 Comparación de Capacidades - {selectedConductorType} {selectedConductorSize} AWG
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Tamaño</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">🟢 EMT</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">🔵 Rigid Steel</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">🟠 PVC Sch 40</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold">🔴 PVC Sch 80</th>
                </tr>
              </thead>
              <tbody>
                {availableSizes.EMT.map(size => {
                  const conductorArea = conductorAreas[selectedConductorType]?.[selectedConductorSize] || 0;
                  return (
                    <tr key={size} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 font-medium">{size}"</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {conduitAreas.EMT[size] ? Math.floor(conduitAreas.EMT[size] / conductorArea) : '-'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {conduitAreas['Rigid Steel'][size] ? Math.floor(conduitAreas['Rigid Steel'][size] / conductorArea) : '-'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {conduitAreas['PVC Sch 40'][size] ? Math.floor(conduitAreas['PVC Sch 40'][size] / conductorArea) : '-'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {conduitAreas['PVC Sch 80'][size] ? Math.floor(conduitAreas['PVC Sch 80'][size] / conductorArea) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
          <h3 className="font-semibold text-yellow-800 mb-3">⚠️ Notas Importantes del NEC California:</h3>
          <ul className="text-sm text-yellow-700 space-y-2">
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
    </div>
  );
};

export default ConduitFillCalculator;
