
"use client";

import { Product, Category } from "@/interfaces";
import Image from "next/image";

interface Props {

  product: Product;
  categories: Category[]
  
}

const genres = [
  "action", "adventure", "sports", "rpg", "shooter", 
  "racing", "strategy", "simulation", "horror", 
  "platformer", "puzzle", "fighting", "stealth", "other"
];

const platforms = [
  "ps5", "ps4", "ps3", "ps2", "ps1", 
  "xbox_series_x", "xbox_series_s", "xbox_one", "xbox_360",
  "nintendo_switch", "nintendo_3ds", "pc", "steam", "epic_games"
];


export const ProductForm = ({ product, categories }: Props) => {
  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Información del producto */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Nombre del Juego</span>
          <input 
            type="text" 
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.name}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input 
            type="text" 
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.slug}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.description}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio (MSRP)</span>
          <input 
            type="number" 
            step="0.01"
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.msrp}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input 
            type="number" 
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.inStock}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Género</span>
          <select 
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.genre}
          >
            <option value="">[Seleccione un género]</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Plataforma</span>
          <select 
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.platform}
          >
            <option value="">[Seleccione una plataforma]</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform.toUpperCase().replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">

          <span>Categoría</span>

          <select 
            className="p-2 border rounded-md bg-gray-200"
            defaultValue={product?.category}
          >
            <option value="">[Seleccione una categoría]</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">
          Guardar Producto
        </button>
      </div>

      {/* Tags y Fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Tags (separados por coma)</span>
          <input 
            type="text" 
            className="p-2 border rounded-md bg-gray-200"
            placeholder="ej: multijugador, online, cooperativo"
            defaultValue={product?.tags?.join(', ')}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Estado</span>
          <div className="flex items-center gap-4 p-2">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                defaultChecked={true}
                className="w-4 h-4"
              />
              <span>Producto activo</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <span>Imágenes del Producto</span>
          <input 
            type="file"
            multiple 
            className="p-2 border rounded-md bg-gray-200" 
            accept="image/png, image/jpeg, image/webp"
          />
          <small className="text-gray-500 mt-1">
            Sube múltiples imágenes del juego (portada, capturas, etc.)
          </small>
        </div>

        {/* Mostrar imágenes existentes si las hay */}
        {product?.images && product.images.length > 0 && (
          <div className="flex flex-col mb-2">
            <span>Imágenes actuales</span>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <Image 
                    src={`/products/${image}`}
                    alt={`${product.name} - ${index + 1}`}
                    width={100}
                    height={80}
                    className="w-full h-20 object-cover rounded border"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  );
};