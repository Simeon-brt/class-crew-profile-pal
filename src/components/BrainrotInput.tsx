
import React, { useState, useRef, useEffect } from 'react';
import { BrainrotItem } from '@/data/brainrot';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface BrainrotInputProps {
  brainrotItems: BrainrotItem[];
  onGuess: (brainrotItem: BrainrotItem) => void;
  disabled?: boolean;
}

const BrainrotInput: React.FC<BrainrotInputProps> = ({ brainrotItems, onGuess, disabled = false }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = brainrotItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredItems.length > 0 && !disabled) {
      onGuess(filteredItems[selectedIndex]);
      setSearch('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleItemClick = (item: BrainrotItem) => {
    if (!disabled) {
      onGuess(item);
      setSearch('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder="Tape le nom du brainrot..."
            disabled={disabled}
            className="w-full px-4 py-3 text-lg border-2 border-yellow-500 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 disabled:opacity-50"
          />
          
          {showSuggestions && filteredItems.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border-2 border-yellow-500 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                    index === selectedIndex ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="font-medium text-white">{item.name}</div>
                  {item.description && (
                    <div className="text-sm text-gray-400">{item.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={disabled || filteredItems.length === 0}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 disabled:opacity-50"
        >
          <Search className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default BrainrotInput;
