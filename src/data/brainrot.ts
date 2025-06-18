
export interface BrainrotItem {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
}

export const brainrotItems: BrainrotItem[] = [
  {
    id: 1,
    name: "Tralalero Tralala",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Le fameux mème italien qui chante"
  },
  {
    id: 2,
    name: "Brmm Brmm Patapim",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Le son de moteur italien"
  },
  {
    id: 3,
    name: "Gabagool",
    imageUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "Le classique italien-américain"
  },
  {
    id: 4,
    name: "Mamma Mia",
    imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "L'expression italienne emblématique"
  },
  {
    id: 5,
    name: "Pesto Pasta",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "La passion italienne pour les pâtes"
  },
  {
    id: 6,
    name: "Bella Ciao",
    imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "La célèbre chanson italienne"
  }
];
