
import React from 'react';
import { GuessResult as GuessResultType } from '@/types/classmate';
import { TrendingUp, TrendingDown, Check, X, Minus } from 'lucide-react';

interface GuessResultProps {
  result: GuessResultType;
}

const GuessResult: React.FC<GuessResultProps> = ({ result }) => {
  const getBackgroundColor = () => {
    switch (result.status) {
      case 'correct':
        return 'bg-green-500';
      case 'partial':
        return 'bg-orange-500';
      case 'higher':
        return 'bg-red-500';
      case 'lower':
        return 'bg-red-500';
      case 'incorrect':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getIcon = () => {
    switch (result.status) {
      case 'correct':
        return <Check className="w-4 h-4" />;
      case 'partial':
        return <Minus className="w-4 h-4" />;
      case 'higher':
        return <TrendingUp className="w-4 h-4" />;
      case 'lower':
        return <TrendingDown className="w-4 h-4" />;
      case 'incorrect':
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${getBackgroundColor()} text-white p-3 rounded-lg flex flex-col items-center justify-center min-h-[80px] transition-all duration-300 hover:scale-105 shadow-lg`}
    >
      <div className="flex items-center justify-center mb-1">
        {getIcon()}
      </div>
      <div className="text-sm font-medium text-center">{result.value}</div>
    </div>
  );
};

export default GuessResult;
