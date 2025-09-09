'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ProductGridItemProps } from '@/interfaces';


export const ProductGridItem = ({ 
  product, 
  showDescription = false, 
  showPlatform = false,
  showTags = false,
  className = ""
}: ProductGridItemProps) => {

  const [ displayImage, setDisplayImage ] = useState( product.images[ 0 ] );


  return (
    <div className={`rounded-md overflow-hidden fade-in ${className}`}>
      <Link href={ `/product/${ product.slug }` }>
        <Image
          src={ `/products/${ displayImage }` }
          alt={ product.name }
          className="w-full object-cover rounded"
          width={ 500 }
          height={ 500 }
          onMouseEnter={ () => setDisplayImage( product.images[1] )  }
          onMouseLeave={ () => setDisplayImage( product.images[0] ) }
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={ `/product/${ product.slug }` }>
          { product.name }
        </Link>
        
        {showDescription && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">${ product.msrp }</span>
          <span className={`text-sm ${product.inStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock > 0 ? `Stock: ${product.inStock}` : 'Agotado'}
          </span>
        </div>
      </div>

    </div>
  );
};