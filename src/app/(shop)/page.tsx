import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title, Pagination } from '@/components'

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  
  // Obtener productos de la página solicitada
  const result = await getPaginatedProductsWithImages({ 
    page: page, 
    take: 12 
  });


  if (!result.ok) {
    return (
      <div className="text-center py-10">
        <Title title='Error' subtitle='No se pudieron cargar los productos' />
      </div>
    )
  }

  return (
    <>
      <Title
        title='WordGames'
        subtitle={`Todos los videojuegos disponibles`}
        className='mb-2'
      />

      <ProductGrid products={result.products} />
      
      
      {/* Info de debugging */}
      <div className="text-center text-sm text-gray-600 mt-4">
        Página {result.currentPage} de {result.totalPages} 
        | Mostrando {result.products.length} de {result.totalCount} productos
      </div>

      <Pagination totalPages={result.totalPages} />
    </>
  )
}
