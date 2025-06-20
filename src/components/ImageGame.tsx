
import React, { useState, useEffect } from 'react';
import { BrainrotItem, brainrotItems } from '@/data/brainrot';
import BrainrotInput from './BrainrotInput';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Users, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';

interface ImageGameProps {
  onBackToGuess: () => void;
}

const ImageGame: React.FC<ImageGameProps> = ({ onBackToGuess }) => {
  const [targetBrainrot, setTargetBrainrot] = useState<BrainrotItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(400); // Start very zoomed in (400%)
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<BrainrotItem[]>([]);

  useEffect(() => {
    startNewImageGame();
  }, []);

  const startNewImageGame = () => {
    const randomIndex = Math.floor(Math.random() * brainrotItems.length);
    setTargetBrainrot(brainrotItems[randomIndex]);
    setZoomLevel(400); // Start very zoomed in
    setGameWon(false);
    setAttempts(0);
    setWrongGuesses([]);
    console.log('Nouveau jeu commencé. Élément à deviner:', brainrotItems[randomIndex].name);
  };

  const handleGuess = (guessedBrainrot: BrainrotItem) => {
    if (!targetBrainrot || gameWon) return;

    setAttempts(prev => prev + 1);

    if (guessedBrainrot.id === targetBrainrot.id) {
      setGameWon(true);
      toast.success(`Félicitations ! Tu as trouvé ${targetBrainrot.name} avec un zoom de ${zoomLevel}% !`);
      setZoomLevel(100); // Reset zoom level for next game
    } else {
      setWrongGuesses(prev => [...prev, guessedBrainrot]);
      if (zoomLevel > 100) {
        const newZoomLevel = Math.max(100, zoomLevel - 40); // Decrease zoom by 100% each time, minimum 100%
        setZoomLevel(newZoomLevel);
        toast.info(`Ce n'est pas ${guessedBrainrot.name}. L'image se dézoome !`);
      } else {
        toast.error(`Ce n'est pas ${guessedBrainrot.name}. L'image est complètement dézoomée !`);
      }
    }
  };

  const renderImage = () => {
    if (!targetBrainrot?.imageUrl) return null;

    return (
      <div className="mb-8 flex justify-center">
        <div className="relative w-80 h-80 rounded-lg overflow-hidden border-4 border-yellow-500 shadow-2xl">
          <div 
            className="absolute inset-0 transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'bottom center'
            }}
          >
            <img
              src={targetBrainrot.imageUrl}
              alt="Image brainrot à deviner"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Zoom indicator */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
            {zoomLevel > 100 ? <ZoomIn className="w-3 h-3" /> : <ZoomOut className="w-3 h-3" />}
            {zoomLevel}%
          </div>
        </div>
      </div>
    );
  };

  // Filter out already guessed brainrot items
  const availableBrainrot = brainrotItems.filter(
    item => !wrongGuesses.some(guess => guess.id === item.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            L3INFOdle.net
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Devine l'image !
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Zoom: {zoomLevel}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Tentatives: {attempts}</span>
            </div>
          </div>

          {/* Image Display */}
          {renderImage()}

          {!gameWon && (
            <div className="mb-6">
              <p className="text-lg mb-4 text-gray-300">
                Qui est représenté sur cette image ?
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Chaque mauvaise réponse dézoome l'image !
              </p>
              <BrainrotInput
                brainrotItems={availableBrainrot}
                onGuess={handleGuess}
                disabled={gameWon}
              />
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              onClick={startNewImageGame}
              className="bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Nouveau jeu image
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
              {wrongGuesses.map((item, index) => (
                <span
                  key={index}
                  className="bg-red-600 px-3 py-1 rounded-full text-sm"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Game Won Message */}
        {gameWon && targetBrainrot && (
          <div className="mt-8 bg-gradient-to-r from-green-600 to-green-600 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">🎉 Mamma mia ! 🇮🇹</h3>
            <p className="text-lg">
              Tu as trouvé <strong>{targetBrainrot.name}</strong> avec un zoom de {zoomLevel}% !
            </p>
            <div className="mt-4">
              <img 
                src={targetBrainrot.imageUrl} 
                alt={targetBrainrot.name}
                className="w-32 h-32 object-cover rounded-lg mx-auto shadow-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGame;
