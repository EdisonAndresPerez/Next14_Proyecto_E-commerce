'use client';

import { ProductFilterProps, ValidGenres } from '@/interfaces';
import { useState } from 'react';

export const ProductFilter = ({ 
  products, 
  onFilterChange, 
  selectedGenre,
  priceRange 
}: ProductFilterProps) => {
  
  const [currentGenre, setCurrentGenre] = useState<ValidGenres | undefined>(selectedGenre);
  const [currentPriceRange, setCurrentPriceRange] = useState(priceRange || { min: 0, max: 1000 });

  const handleGenreChange = (genre: ValidGenres | undefined) => {
    setCurrentGenre(genre);
    applyFilters(genre, currentPriceRange);
  };

  const handlePriceChange = (min: number, max: number) => {
    const newRange = { min, max };
    setCurrentPriceRange(newRange);
    applyFilters(currentGenre, newRange);
  };

  const applyFilters = (genre?: ValidGenres, priceRange?: { min: number; max: number }) => {
    let filtered = [...products];

    if (genre) {
      filtered = filtered.filter(product => product.genre === genre);
    }

    if (priceRange) {
      filtered = filtered.filter(product => 
        product.msrp >= priceRange.min && product.msrp <= priceRange.max
      );
    }

    onFilterChange(filtered);
  };

  const genres: ValidGenres[] = ['action', 'adventure', 'rpg'];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-lg mb-4">Filtros</h3>
      
      {/* Filtro por género */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Categoría</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleGenreChange(undefined)}
            className={`block w-full text-left px-3 py-2 rounded ${
              !currentGenre ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`block w-full text-left px-3 py-2 rounded ${
                currentGenre === genre ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {genre.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro por precio */}
      <div>
        <h4 className="font-medium mb-2">Rango de Precio</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={currentPriceRange.max}
            onChange={(e) => handlePriceChange(currentPriceRange.min, Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${currentPriceRange.min}</span>
            <span>${currentPriceRange.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
