
import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Target, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { Country, countries } from '@/data/countries';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@1/countries-110m.json";

interface WorldMapGameProps {
  onBackToGuess: () => void;
}

const WorldMapGame: React.FC<WorldMapGameProps> = ({ onBackToGuess }) => {
  const [targetCountry, setTargetCountry] = useState<Country | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string>("");

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    setTargetCountry(countries[randomIndex]);
    setGameWon(false);
    setAttempts(0);
    setWrongGuesses([]);
    console.log('Nouveau jeu géographie commencé. Pays à trouver:', countries[randomIndex].name);
  };

  const handleCountryClick = (geo: any) => {
    if (!targetCountry || gameWon) return;

    const clickedCountryCode = geo.id;
    const clickedCountryName = geo.properties.NAME || geo.properties.name || 'Pays inconnu';
    
    setAttempts(prev => prev + 1);

    if (clickedCountryCode === targetCountry.code || clickedCountryName.toLowerCase().includes(targetCountry.name.toLowerCase())) {
      setGameWon(true);
      toast.success(`Félicitations ! Tu as trouvé ${targetCountry.name} !`);
    } else {
      setWrongGuesses(prev => [...prev, clickedCountryName]);
      toast.error(`Ce n'est pas ${targetCountry.name}. Tu as cliqué sur ${clickedCountryName}.`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-teal-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
            L3INFOdle.net
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Trouve le pays sur la carte !
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Pays à trouver: <strong className="text-white text-xl">{targetCountry?.name}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Tentatives: {attempts}</span>
            </div>
          </div>

          {hoveredCountry && (
            <div className="mb-4">
              <p className="text-sm text-gray-400">
                <MapPin className="w-4 h-4 inline mr-1" />
                Survol: {hoveredCountry}
              </p>
            </div>
          )}

          {!gameWon && targetCountry && (
            <div className="mb-6 bg-blue-900/50 rounded-lg p-4">
              <p className="text-lg mb-2">
                Clique sur <strong>{targetCountry.name}</strong> sur la carte du monde !
              </p>
            </div>
          )}

          {/* World Map */}
          <div className="mb-6 bg-gray-800 rounded-lg p-4 shadow-2xl">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
                center: [0, 20]
              }}
              width={800}
              height={500}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isWrongGuess = wrongGuesses.some(wrong => 
                      geo.properties.NAME?.toLowerCase().includes(wrong.toLowerCase()) ||
                      geo.properties.name?.toLowerCase().includes(wrong.toLowerCase())
                    );
                    
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => handleCountryClick(geo)}
                        onMouseEnter={() => {
                          setHoveredCountry(geo.properties.NAME || geo.properties.name || 'Pays inconnu');
                        }}
                        onMouseLeave={() => {
                          setHoveredCountry("");
                        }}
                        style={{
                          default: {
                            fill: isWrongGuess ? "#ef4444" : "#374151",
                            outline: "none",
                            stroke: "#6b7280",
                            strokeWidth: 0.5,
                            cursor: gameWon ? "default" : "pointer"
                          },
                          hover: {
                            fill: gameWon ? (isWrongGuess ? "#ef4444" : "#374151") : "#3b82f6",
                            outline: "none",
                            stroke: "#6b7280",
                            strokeWidth: 0.5,
                            cursor: gameWon ? "default" : "pointer"
                          },
                          pressed: {
                            fill: "#1d4ed8",
                            outline: "none",
                            stroke: "#6b7280",
                            strokeWidth: 0.5
                          }
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={startNewGame}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Nouveau pays
            </Button>
            
            <Button
              onClick={onBackToGuess}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Retour au mode classique
            </Button>
          </div>
        </div>

        {/* Wrong Guesses */}
        {wrongGuesses.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">Tentatives incorrectes</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {wrongGuesses.map((country, index) => (
                <span
                  key={index}
                  className="bg-red-600 px-3 py-1 rounded-full text-sm"
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Game Won Message */}
        {gameWon && targetCountry && (
          <div className="mt-8 bg-gradient-to-r from-green-600 to-green-600 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">🎉 Bravo ! 🌍</h3>
            <p className="text-lg">
              Tu as trouvé <strong>{targetCountry.name}</strong> en {attempts} tentative{attempts > 1 ? 's' : ''} !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMapGame;
