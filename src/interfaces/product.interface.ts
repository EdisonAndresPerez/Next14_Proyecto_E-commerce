
export interface Product {
  id?: string; // Opcional para expansión futura con base de datos
  name: string; 
  description: string;
  images: string[];
  inStock: number;
  msrp: number;
  slug: string;
  tags: string[];
  genre: ValidGenres; // Géneros reales del juego
  platform: ValidPlatforms; // Plataforma del juego
  category: ValidCategories; // Para agrupar por consola
}

// Géneros reales de videojuegos
export type ValidGenres = 'action'|'adventure'|'sports'|'rpg'|'shooter'|'racing'|'strategy'|'simulation'|'horror'|'platformer'|'puzzle'|'fighting'|'stealth'|'other';

// Plataformas disponibles
export type ValidPlatforms = 'ps5'|'ps4'|'ps3'|'ps2'|'ps1'|'pc'|'xbox';

// Categorías para navegación
export type ValidCategories = 'ps5'|'ps2'|'ps1'|'retro'|'modern';

// ===== INTERFACES PARA COMPONENTES =====

// Props para el grid de productos
export interface ProductGridProps {
  products: Product[];
  className?: string;
}

// Props para items individuales de producto
export interface ProductGridItemProps {
  product: Product;
  showDescription?: boolean;
  showPlatform?: boolean;
  showTags?: boolean;
  className?: string;
}

// Props para filtros de productos
export interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  selectedGenre?: ValidGenres;
  priceRange?: {
    min: number;
    max: number;
  };
}