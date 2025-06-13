
export interface Classmate {
  id: number;
  name: string;
  age: number;
  height: number; // en cm
  gender: 'Masculin' | 'Féminin';
  hairColor: 'Blond' | 'Brun' | 'Châtain' | 'Roux' | 'Noir' | 'Gris';
  skinColor: 'Claire' | 'Mate' | 'Foncée' | 'Bronzée';
  class: 'A' | 'B' | 'C' | 'D';
}

export interface GuessResult {
  attribute: string;
  value: string | number;
  status: 'correct' | 'partial' | 'incorrect' | 'higher' | 'lower';
}
