"use client"

import { Product } from '@/interfaces'
import React, { useState } from 'react'
import { titleFont } from '@/config/fonts'
import { IoGameController, TfiMoney } from '@/components/icons'
import { Contador } from '@/components/products/contador/Contador'
import { useCartStore } from '@/store/cart/cart-store'


interface Props {
  product: Product
}

export const ProductDetails = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const addProductToCart = useCartStore(state => state.addProductToCart);

  const handleAddToCart = () => {
    if (product.inStock <= 0) return;

    setIsAdding(true);

    // Convertir Product a CartProduct
    const cartProduct = {
      id: product.id || product.slug, // Usar slug como fallback si no hay id
      slug: product.slug,
      name: product.name,
      price: product.msrp,
      quantity: quantity,
      image: product.images[0] || '', // Primera imagen del array
      maxStock: product.inStock,
      platform: product.platform
    };

    addProductToCart(cartProduct);
    
    // Mostrar feedback visual
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);

    // Reset quantity después de agregar
    setQuantity(1);
    setIsAdding(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  return (
       <div className='col-span-1 px-5 bg-white rounded-lg shadow-lg border'>
        
        {/* Título del producto */}
        <div className='flex items-center gap-3 mb-6'>
          <h1
            className={`${titleFont.className} antialiased font-bold text-xl md:text-2xl text-gray-800 flex-1`}
          >
            {product.name}
          </h1>
          <IoGameController className='text-3xl md:text-4xl flex-shrink-0 text-blue-600' />
        </div>

        {/* Precio */}
        <div className='mb-4'>
          <span className='text-sm font-semibold text-gray-600'>PRECIO:</span>
          <div className='flex items-center gap-2'>
            <TfiMoney className='text-2xl text-green-600' />
            <p className='text-2xl font-bold text-green-600'>{product.msrp}</p>
          </div>
        </div>

        {/* Descripción */}
        <div className='mb-4'>
          <span className='text-sm font-semibold text-gray-600'>
            DESCRIPCIÓN:
          </span>
          <p className='text-base leading-relaxed'>{product.description}</p>
        </div>

        {/* Tags/Etiquetas */}
        <div className='mb-4'>
          <span className='text-sm font-semibold text-gray-600'>
            CARACTERÍSTICAS:
          </span>
          <div className='flex flex-wrap gap-2 mt-2'>
            {product.tags.map(tag => (
              <span
                key={tag}
                className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Información técnica */}
        <div className='space-y-2 mb-6'>
          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>
              PLATAFORMA:
            </span>
            <span className='text-sm uppercase font-bold text-blue-600'>
              {product.platform}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>GÉNERO:</span>
            <span className='text-sm capitalize'>{product.genre}</span>
          </div>

          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>
              DISPONIBILIDAD:
            </span>
            <span
              className={`text-sm font-bold ${
                product.inStock > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.inStock > 0 ? `${product.inStock} en stock` : 'Agotado'}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>SKU:</span>
            <span className='text-sm text-white-500'>{product.slug}</span>
          </div>

          <Contador
            productId={product.slug}
            initialValue={1}
            maxValue={product.inStock}
            inStock={product.inStock}
            showAddToCart={true}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />

          {/* Toast de éxito */}
          {showSuccess && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>¡Producto agregado al carrito exitosamente!</span>
            </div>
          )}
        </div>
      </div>
  )
}
