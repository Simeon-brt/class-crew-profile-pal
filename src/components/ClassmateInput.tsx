
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Classmate } from '@/types/classmate';
import { Search, Play } from 'lucide-react';

interface ClassmateInputProps {
  classmates: Classmate[];
  onGuess: (classmate: Classmate) => void;
  disabled?: boolean;
}

const ClassmateInput: React.FC<ClassmateInputProps> = ({ classmates, onGuess, disabled = false }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Classmate[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.length > 0) {
      const filtered = classmates.filter(classmate =>
        classmate.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input, classmates]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSelect(suggestions[selectedIndex]);
      } else if (suggestions.length === 1) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (classmate: Classmate) => {
    setInput('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onGuess(classmate);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tape le nom d'un camarade..."
          disabled={disabled}
          className="pl-10 pr-12 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 transition-colors"
        />
        <Play className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((classmate, index) => (
            <div
              key={classmate.id}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-200 hover:bg-gray-700'
              }`}
              onClick={() => handleSelect(classmate)}
            >
              {classmate.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassmateInput;
