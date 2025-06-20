import React, { useState, useEffect } from 'react';
import { BrainrotItem, brainrotItems } from '@/data/brainrot';
import { GameMode } from '@/types/classmate';
import BrainrotInput from './BrainrotInput';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Users } from 'lucide-react';
import { toast } from 'sonner';
import ImageGame from './ImageGame';
import EmojiGame from './EmojiGame';
import WorldMapGame from './WorldMapGame';

interface ClassmateGuessProps {
  // No props for now
}

const ClassmateGuess: React.FC<ClassmateGuessProps> = () => {
  const [targetBrainrot, setTargetBrainrot] = useState<BrainrotItem | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<BrainrotItem[]>([]);
  const [currentGame, setCurrentGame] = useState<GameMode>('guess');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * brainrotItems.length);
    setTargetBrainrot(brainrotItems[randomIndex]);
    setGameWon(false);
    setAttempts(0);
    setWrongGuesses([]);
    console.log('Nouveau jeu brainrot commencé. Élément à deviner:', brainrotItems[randomIndex].name);
  };

  const handleGuess = (guessedBrainrot: BrainrotItem) => {
    if (!targetBrainrot || gameWon) return;

    setAttempts(prev => prev + 1);

    if (guessedBrainrot.id === targetBrainrot.id) {
      setGameWon(true);
      toast.success(`Félicitations ! Tu as trouvé ${targetBrainrot.name} en ${attempts} tentative(s) !`);
    } else {
      setWrongGuesses(prev => [...prev, guessedBrainrot]);
      toast.error(`Ce n'est pas ${guessedBrainrot.name}. Essaie encore !`);
    }
  };

  const handleNewGame = () => {
    startNewGame();
  };

  if (currentGame === 'world') {
    return (
      <WorldMapGame 
        onBackToGuess={() => setCurrentGame('guess')}
      />
    );
  }

  if (currentGame === 'image') {
    return (
      <ImageGame
        onBackToGuess={() => setCurrentGame('guess')}
      />
    );
  }

  if (currentGame === 'emoji') {
    return (
      <EmojiGame
        onBackToGuess={() => setCurrentGame('guess')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            L3INFOdle.net
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Devinez le brainrot !
          </p>

          <div className="flex gap-4 justify-center mb-8">
          <Button
            onClick={() => setCurrentGame('guess')}
            variant={currentGame === 'guess' ? 'default' : 'outline'}
            className="transition-colors"
          >
            Mode Classique
          </Button>
          <Button
            onClick={() => setCurrentGame('emoji')}
            variant={currentGame === 'emoji' ? 'default' : 'outline'}
            className="transition-colors"
          >
            Mode Emoji
          </Button>
          <Button
            onClick={() => setCurrentGame('image')}
            variant={currentGame === 'image' ? 'default' : 'outline'}
            className="transition-colors"
          >
            Mode Image
          </Button>
          <Button
            onClick={() => setCurrentGame('world')}
            variant={currentGame === 'world' ? 'default' : 'outline'}
            className="transition-colors"
          >
            Mode Monde
          </Button>
        </div>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-400" />
              <span className="text-gray-300">Joueurs: Bientôt</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Tentatives: {attempts}</span>
            </div>
          </div>

          {!gameWon && (
            <div className="mb-6">
              <p className="text-lg mb-4 text-gray-300">
                Quel est le brainrot du jour ?
              </p>
              <BrainrotInput
                brainrotItems={brainrotItems}
                onGuess={handleGuess}
                disabled={gameWon}
              />
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              onClick={handleNewGame}
              className="bg-orange-600 hover:bg-orange-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Nouveau brainrot
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
            <h3 className="text-2xl font-bold mb-2">🎉 Félicitations ! 🎉</h3>
            <p className="text-lg">
              Tu as trouvé le brainrot du jour: <strong>{targetBrainrot.name}</strong> en {attempts} tentative(s) !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassmateGuess;
