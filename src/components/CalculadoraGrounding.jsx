import React, { useState } from 'react';
import { Shield, Zap, AlertTriangle } from 'lucide-react';

// NEC 2023 Table 250.122 - Equipment Grounding Conductors (VALORES EXACTOS VERIFICADOS)
const groundingTable = [
  { 
    rating: "15", 
    copperSize: "14 AWG", 
    aluminumSize: "12 AWG",
    description: "Circuitos básicos residenciales - tomacorrientes, luces"
  },
  { 
    rating: "20", 
    copperSize: "12 AWG", 
    aluminumSize: "10 AWG",
    description: "Circuitos residenciales estándar - cocina, baños"
  },
  { 
    rating: "60", 
    copperSize: "10 AWG", 
    aluminumSize: "8 AWG",
    description: "Motores comerciales, aires centrales grandes"
  },
  { 
    rating: "100", 
    copperSize: "8 AWG", 
    aluminumSize: "6 AWG",
    description: "Sub-paneles residenciales, motores industriales"
  },
  { 
    rating: "200", 
    copperSize: "6 AWG", 
    aluminumSize: "4 AWG",
    description: "Paneles principales residenciales"
  },
  { 
    rating: "300", 
    copperSize: "4 AWG", 
    aluminumSize: "2 AWG",
    description: "Paneles principales comerciales pequeños"
  },
  { 
    rating: "400", 
    copperSize: "3 AWG", 
    aluminumSize: "1 AWG",
    description: "Sistemas comerciales medianos"
  },
  { 
    rating: "500", 
    copperSize: "2 AWG", 
    aluminumSize: "1/0 AWG",
    description: "Sistemas comerciales grandes"
  },
  { 
    rating: "600", 
    copperSize: "1 AWG", 
    aluminumSize: "2/0 AWG",
    description: "Sistemas industriales básicos"
  },
  { 
    rating: "800", 
    copperSize: "1/0 AWG", 
    aluminumSize: "3/0 AWG",
    description: "Sistemas industriales medianos"
  },
  { 
    rating: "1000", 
    copperSize: "2/0 AWG", 
    aluminumSize: "4/0 AWG",
    description: "Sistemas industriales grandes"
  },
  { 
    rating: "1200", 
    copperSize: "3/0 AWG", 
    aluminumSize: "250 kcmil",
    description: "Sistemas industriales muy grandes"
  },
  { 
    rating: "1600", 
    copperSize: "4/0 AWG", 
    aluminumSize: "350 kcmil",
    description: "Sistemas industriales masivos"
  },
  { 
    rating: "2000", 
    copperSize: "250 kcmil", 
    aluminumSize: "400 kcmil",
    description: "Sistemas de alta capacidad"
  },
  { 
    rating: "2500", 
    copperSize: "350 kcmil", 
    aluminumSize: "600 kcmil",
    description: "Sistemas de muy alta capacidad"
  },
  { 
    rating: "3000", 
    copperSize: "400 kcmil", 
    aluminumSize: "600 kcmil",
    description: "Sistemas de capacidad máxima"
  },
  { 
    rating: "4000", 
    copperSize: "500 kcmil", 
    aluminumSize: "750 kcmil",
    description: "Sistemas industriales súper pesados"
  },
  { 
    rating: "5000", 
    copperSize: "700 kcmil", 
    aluminumSize: "1250 kcmil",
    description: "Sistemas de capacidad extrema"
  },
  { 
    rating: "6000", 
    copperSize: "800 kcmil", 
    aluminumSize: "1250 kcmil",
    description: "Sistemas de capacidad máxima industrial"
  }
];

const CalculadoraGrounding = () => {
  const [selectedRating, setSelectedRating] = useState("20");
  const [selectedMaterial, setSelectedMaterial] = useState("copper");
  const [resultado, setResultado] = useState(null);

  const calcularGrounding = () => {
    const entrada = groundingTable.find(item => item.rating === selectedRating);
    if (entrada) {
      const groundingSize = selectedMaterial === "copper" ? entrada.copperSize : entrada.aluminumSize;
      setResultado({
        rating: entrada.rating,
        groundingSize: groundingSize,
        material: selectedMaterial === "copper" ? "Cobre" : "Aluminio",
        description: entrada.description
      });
    }
  };

  React.useEffect(() => {
    calcularGrounding();
  }, [selectedRating, selectedMaterial]);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#23272F] justify-between">
      {/* Header */}
      <div className="text-center mb-6 p-4">
        <div className="flex justify-center items-center mb-4 flex-wrap">
          <Shield className="text-green-500 mr-2" size={28} />
          <h1 className="text-xl md:text-3xl font-bold text-white text-center">
            Calculadora de Grounding (Tierra)
          </h1>
          <Shield className="text-green-500 ml-2" size={28} />
        </div>
        <p className="text-white text-sm md:text-lg font-semibold px-2">
          🛡️ NEC 2023 Table 250.122 - Equipment Grounding Conductors ✅
        </p>
        <p className="text-xs md:text-sm text-[#B0B8C1] mt-2">
          Basado en NEC 2023 - Código Eléctrico de California (SEGURIDAD CRÍTICA)
        </p>
      </div>

      {/* Safety Warning */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 mb-6 mx-4">
        <div className="flex items-center justify-center mb-2">
          <AlertTriangle className="text-white mr-2" size={24} />
          <h2 className="text-lg font-bold text-white">⚠️ SEGURIDAD CRÍTICA</h2>
        </div>
        <p className="text-white text-sm text-center mb-3">
          El conductor de tierra protege vidas. NUNCA usar calibre menor al calculado.
        </p>
        <div className="bg-white/10 rounded-lg p-3">
          <p className="text-white text-xs text-center font-medium">
            📖 <strong>NEC 2023 Nota:</strong> Cuando sea necesario cumplir con 250.4(A)(5) o (B)(4), 
            el conductor de tierra debe ser MÁS GRANDE que lo indicado en esta tabla.
          </p>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-4 md:p-6 text-white mb-6 mx-4">
        <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 flex items-center">
          <Shield className="mr-3" />
          Calculadora de Conductor de Tierra
        </h2>
        
        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-base font-semibold text-white mb-2">
              ⚡ Rating del Breaker/Fusible (Amps)
            </label>
            <select 
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
            >
              {groundingTable.map((item) => (
                <option key={item.rating} value={item.rating}>
                  {item.rating} Amps
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-semibold text-white mb-2">
              🔧 Material del Conductor
            </label>
            <select 
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full p-3 border-2 border-yellow-400 rounded-lg focus:ring-2 focus:ring-green-500 text-gray-900 font-semibold bg-yellow-50 text-sm"
            >
              <option value="copper">🟫 Cobre (Copper)</option>
              <option value="aluminum">⚪ Aluminio (Aluminum)</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {resultado && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-4">
            <div className="text-center mb-4">
              <div className="text-3xl md:text-4xl font-bold mb-2 text-yellow-300 drop-shadow">
                {resultado.groundingSize}
              </div>
              <div className="text-base md:text-lg text-gray-100">
                Conductor de Tierra Mínimo ({resultado.material})
              </div>
              <div className="text-xs md:text-sm opacity-90 mt-2 text-blue-100">
                Para dispositivo de protección de {resultado.rating} Amps
              </div>
            </div>

            <div className="bg-green-500/20 rounded-lg p-3 mb-4">
              <p className="text-white text-sm font-medium">
                💡 <strong>Aplicación típica:</strong> {resultado.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-blue-500/20 rounded-lg p-3 text-center">
                <div className="font-bold text-blue-200">Breaker/Fusible</div>
                <div className="text-white">{resultado.rating} Amps</div>
              </div>
              <div className="bg-yellow-500/20 rounded-lg p-3 text-center">
                <div className="font-bold text-yellow-200">Material</div>
                <div className="text-white">{resultado.material}</div>
              </div>
              <div className="bg-green-500/20 rounded-lg p-3 text-center">
                <div className="font-bold text-green-200">Tierra Mínima</div>
                <div className="text-white">{resultado.groundingSize}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="mx-4 mb-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
          📚 ¿Cómo funciona el Grounding?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">🛡️ ¿Qué es Grounding?</h3>
            <p className="text-white text-sm">
              Es un conductor que conecta el equipo eléctrico a tierra para proteger a las personas 
              de descargas eléctricas si hay una falla en el aislamiento.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">⚡ ¿Por qué es importante?</h3>
            <p className="text-white text-sm">
              Si un cable caliente toca la carcasa metálica de un equipo, el conductor de tierra 
              lleva la corriente de falla a tierra, activando el breaker y protegiendo vidas.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">📏 ¿Cómo se calcula?</h3>
            <p className="text-white text-sm">
              El NEC Table 250.122 especifica el tamaño mínimo basado en el rating del dispositivo 
              de protección (breaker o fusible) que protege el circuito.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2">🚨 Regla de oro</h3>
            <p className="text-white text-sm">
              NUNCA usar un conductor de tierra más pequeño que el especificado en la tabla. 
              Es mejor usar más grande, pero nunca más pequeño.
            </p>
          </div>
        </div>
      </div>

      {/* Common Sizes Reference */}
      <div className="mx-4 mb-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
          📊 Tamaños Más Comunes
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { rating: "15A", copper: "14 AWG", use: "Luces básicas" },
            { rating: "20A", copper: "12 AWG", use: "Tomacorrientes" },
            { rating: "60A", copper: "10 AWG", use: "Motores/AC" },
            { rating: "100A", copper: "8 AWG", use: "Sub-panel" },
            { rating: "200A", copper: "6 AWG", use: "Panel principal" },
            { rating: "400A", copper: "3 AWG", use: "Comercial" }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 text-center">
              <div className="text-yellow-400 font-bold text-sm">{item.rating}</div>
              <div className="text-white text-xs">{item.copper}</div>
              <div className="text-gray-300 text-xs">{item.use}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-5 bg-[#23272F]"></div>
    </div>
  );
};

export default CalculadoraGrounding; 