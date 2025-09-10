
export interface Product {
  id?: string;
  name: string; 
  description: string;
  images: string[];
  inStock: number;
  msrp: number;
  slug: string;
  tags: string[];
  genre: ValidGenres;
  platform: ValidPlatforms; 
  category: ValidCategories; 
}

// Géneros reales de videojuegos
export type ValidGenres = 'action'|'adventure'|'sports'|'rpg'|'shooter'|'racing'|'strategy'|'simulation'|'horror'|'platformer'|'puzzle'|'fighting'|'stealth'|'other';

// Plataformas disponibles
export type ValidPlatforms = 'ps5'|'ps4'|'ps3'|'ps2'|'ps1';

// Categorías para navegación
export type ValidCategories = 'ps5'|'ps2'|'ps1';



// ===== INTERFACES PARA COMPONENTES =====
export interface ProductGridProps {
  products: Product[];
  className?: string;
}

export interface ProductGridItemProps {
  product: Product;
  showDescription?: boolean;
  showPlatform?: boolean;
  showTags?: boolean;
  className?: string;
}
export interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  selectedGenre?: ValidGenres;
  priceRange?: {
    min: number;
    max: number;
  };
}