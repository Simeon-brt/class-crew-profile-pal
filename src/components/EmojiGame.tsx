
import React, { useState, useEffect } from 'react';
import { Classmate } from '@/types/classmate';
import { classmates } from '@/data/classmates';
import ClassmateInput from './ClassmateInput';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Users, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface EmojiGameProps {
  onBackToGuess: () => void;
}

const EmojiGame: React.FC<EmojiGameProps> = ({ onBackToGuess }) => {
  const [targetClassmate, setTargetClassmate] = useState<Classmate | null>(null);
  const [revealedEmojis, setRevealedEmojis] = useState<number>(1); // Start with 1 emoji revealed
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);

  useEffect(() => {
    startNewEmojiGame();
  }, []);

  const startNewEmojiGame = () => {
    const randomIndex = Math.floor(Math.random() * classmates.length);
    setTargetClassmate(classmates[randomIndex]);
    setRevealedEmojis(1);
    setGameWon(false);
    setAttempts(0);
    setWrongGuesses([]);
    console.log('Nouveau jeu emoji commencé. Personne à deviner:', classmates[randomIndex].name);
  };

  const handleGuess = (guessedClassmate: Classmate) => {
    if (!targetClassmate || gameWon) return;

    setAttempts(prev => prev + 1);

    if (guessedClassmate.id === targetClassmate.id) {
      setGameWon(true);
      toast.success(`Félicitations ! Tu as trouvé ${targetClassmate.name} avec ${revealedEmojis} emoji${revealedEmojis > 1 ? 's' : ''} !`);
    } else {
      setWrongGuesses(prev => [...prev, guessedClassmate.name]);
      if (revealedEmojis < 3) {
        setRevealedEmojis(prev => prev + 1);
        toast.info(`Ce n'est pas ${guessedClassmate.name}. Un nouvel emoji est révélé !`);
      } else {
        toast.error(`Ce n'est pas ${guessedClassmate.name}. Tous les emojis sont révélés !`);
      }
    }
  };

  const renderEmojis = () => {
    if (!targetClassmate) return null;

    return (
      <div className="flex justify-center gap-4 mb-8">
        {targetClassmate.emojis.map((emoji, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl transition-all duration-300 ${
              index < revealedEmojis
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg'
                : 'bg-gray-700 shadow-inner'
            }`}
          >
            {index < revealedEmojis ? emoji : <HelpCircle className="w-8 h-8 text-gray-400" />}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            L3INFOdle.net
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Devine le camarade grâce aux emojis !
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">Emojis révélés: {revealedEmojis}/3</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Tentatives: {attempts}</span>
            </div>
          </div>

          {/* Emojis Display */}
          {renderEmojis()}

          {!gameWon && (
            <div className="mb-6">
              <p className="text-lg mb-4 text-gray-300">
                Quel camarade ces emojis décrivent-ils ?
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Chaque mauvaise réponse révèle un nouvel emoji !
              </p>
              <ClassmateInput
                classmates={classmates}
                onGuess={handleGuess}
                disabled={gameWon}
              />
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Button
              onClick={startNewEmojiGame}
              className="bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Nouveau jeu emoji
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
              {wrongGuesses.map((name, index) => (
                <span
                  key={index}
                  className="bg-red-600 px-3 py-1 rounded-full text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Game Won Message */}
        {gameWon && targetClassmate && (
          <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">🎉 Bravo ! 🎉</h3>
            <p className="text-lg">
              Tu as trouvé <strong>{targetClassmate.name}</strong> avec {revealedEmojis} emoji{revealedEmojis > 1 ? 's' : ''} !
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {targetClassmate.emojis.map((emoji, index) => (
                <span key={index} className="text-2xl">{emoji}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiGame;
