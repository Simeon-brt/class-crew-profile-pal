
export interface Classmate {
  id: number;
  name: string;
  age: number;
  height: number; // en cm
  gender: 'Masculin' | 'Féminin';
  hairColor: 'Blond' | 'Brun' | 'Châtain' | 'Roux' | 'Noir' | 'Gris';
  skinColor: 'Blanc' | 'Métisse' | 'Noir' | 'Asiatique';
  class: 'Dev' | 'Réseau';
  emojis: [string, string, string]; // Exactly 3 emojis
}

export interface GuessResult {
  attribute: string;
  value: string | number;
  status: 'correct' | 'partial' | 'incorrect' | 'higher' | 'lower';
}

export type GameMode = 'guess' | 'emoji';
