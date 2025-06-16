import React, { useState, useEffect } from 'react';
import { Classmate, GuessResult, GameMode } from '@/types/classmate';
import { classmates } from '@/data/classmates';
import ClassmateInput from './ClassmateInput';
import GuessResultComponent from './GuessResult';
import EmojiGame from './EmojiGame';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trophy, Users, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ClassmateGuess: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>('guess');
  const [targetClassmate, setTargetClassmate] = useState<Classmate | null>(null);
  const [guesses, setGuesses] = useState<Classmate[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (gameMode === 'guess') {
      startNewGame();
    }
  }, [gameMode]);

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * classmates.length);
    setTargetClassmate(classmates[randomIndex]);
    setGuesses([]);
    setGameWon(false);
    setAttempts(0);
    console.log('Nouveau jeu commencé. Personne à deviner:', classmates[randomIndex].name);
  };

  const handleGuess = (guessedClassmate: Classmate) => {
    if (!targetClassmate || gameWon) return;

    setGuesses(prev => [...prev, guessedClassmate]);
    setAttempts(prev => prev + 1);

    if (guessedClassmate.id === targetClassmate.id) {
      setGameWon(true);
      toast.success(`Félicitations ! Tu as trouvé ${targetClassmate.name} en ${attempts + 1} essai${attempts > 0 ? 's' : ''} !`);
    } else {
      toast.info(`Ce n'est pas ${guessedClassmate.name}. Essaie encore !`);
    }
  };

  const getGuessResults = (guess: Classmate): GuessResult[] => {
    if (!targetClassmate) return [];

    const results: GuessResult[] = [
      {
        attribute: 'Nom',
        value: guess.name,
        status: guess.name === targetClassmate.name ? 'correct' : 'incorrect'
      },
      {
        attribute: 'Âge',
        value: guess.age,
        status: guess.age === targetClassmate.age ? 'correct' : 
                guess.age < targetClassmate.age ? 'higher' : 'lower'
      },
      {
        attribute: 'Taille',
        value: `${guess.height}cm`,
        status: guess.height === targetClassmate.height ? 'correct' :
                guess.height < targetClassmate.height ? 'higher' : 'lower'
      },
      {
        attribute: 'Sexe',
        value: guess.gender,
        status: guess.gender === targetClassmate.gender ? 'correct' : 'incorrect'
      },
      {
        attribute: 'Cheveux',
        value: guess.hairColor,
        status: guess.hairColor === targetClassmate.hairColor ? 'correct' : 'incorrect'
      },
      {
        attribute: 'Peau',
        value: guess.skinColor,
        status: guess.skinColor === targetClassmate.skinColor ? 'correct' : 'incorrect'
      },
      {
        attribute: 'Classe',
        value: guess.class,
        status: guess.class === targetClassmate.class ? 'correct' : 'incorrect'
      }
    ];

    return results;
  };

  if (gameMode === 'emoji') {
    return <EmojiGame onBackToGuess={() => setGameMode('guess')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            L3INFOdle.net
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Devine le camarade de classe du jour !
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">{classmates.length} personnes ont déjà trouvé !</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Tentatives: {attempts}</span>
            </div>
          </div>

          {!gameWon && (
            <ClassmateInput
              classmates={classmates}
              onGuess={handleGuess}
              disabled={gameWon}
            />
          )}

          <div className="flex gap-4 justify-center mt-4">
            <Button
              onClick={startNewGame}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Nouvelle partie
            </Button>
            
            <Button
              onClick={() => setGameMode('emoji')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Mode Emoji
            </Button>
          </div>
        </div>

        {/* Headers */}
        {guesses.length > 0 && (
          <div className="grid grid-cols-7 gap-2 mb-4 px-4">
            <div className="text-center font-semibold text-gray-300">Nom</div>
            <div className="text-center font-semibold text-gray-300">Âge</div>
            <div className="text-center font-semibold text-gray-300">Taille</div>
            <div className="text-center font-semibold text-gray-300">Sexe</div>
            <div className="text-center font-semibold text-gray-300">Cheveux</div>
            <div className="text-center font-semibold text-gray-300">Peau</div>
            <div className="text-center font-semibold text-gray-300">Classe</div>
          </div>
        )}

        {/* Guesses */}
        <div className="space-y-3">
          {guesses.map((guess, index) => {
            const results = getGuessResults(guess);
            return (
              <div
                key={index}
                className="grid grid-cols-7 gap-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {results.map((result, resultIndex) => (
                  <GuessResultComponent key={resultIndex} result={result} />
                ))}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Indicateurs de couleur</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Partiel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Incorrect / Supérieur</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Inférieur</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassmateGuess;
