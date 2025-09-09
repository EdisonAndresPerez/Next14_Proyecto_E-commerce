import { ProductGridProps } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';


export const ProductGrid = ( { products, className = "" }: ProductGridProps ) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10 ${className}`}>
      {
        products.map( product => (
          <ProductGridItem
            key={ product.slug }
            product={ product }
          />
        ) )
      }

    </div>
  );
};