import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title, Pagination } from '@/components'



export default async function Home() {
  // Prueba con diferentes valores para evaluar tu take
  const result = await getPaginatedProductsWithImages({ 
    page: 1, 
    take: 12  // Puedes cambiar este número para probar
  });

  console.log('🏠 Resultado en Home:', result);

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
        subtitle={`${result.totalCount} videojuegos disponibles`}
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
