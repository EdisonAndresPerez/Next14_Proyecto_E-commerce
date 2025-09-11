import { ProductGrid, Title } from '@/components'
import { getFilteredProducts } from '@/actions'
import { notFound } from 'next/navigation'

// Labels para los géneros y categorías
const categoryLabels: Record<string, { title: string; subtitle: string }> = {
  // Géneros
  action: { title: 'Juegos de Acción', subtitle: 'Adrenalina y diversión' },
  adventure: {
    title: 'Juegos de Aventura',
    subtitle: 'Explora mundos increíbles'
  },
  sports: { title: 'Juegos de Deportes', subtitle: 'La emoción del deporte' },
  rpg: { title: 'Juegos RPG', subtitle: 'Rol y fantasía' },
  shooter: { title: 'Juegos de Disparos', subtitle: 'Acción y estrategia' },
  racing: { title: 'Juegos de Carreras', subtitle: 'Velocidad extrema' },
  strategy: { title: 'Juegos de Estrategia', subtitle: 'Piensa y conquista' },
  simulation: { title: 'Simuladores', subtitle: 'Experiencias realistas' },
  horror: { title: 'Juegos de Terror', subtitle: 'Suspenso y miedo' },
  platformer: { title: 'Plataformas', subtitle: 'Salta y aventúrate' },
  puzzle: { title: 'Juegos de Puzzle', subtitle: 'Desafía tu mente' },
  fighting: { title: 'Juegos de Lucha', subtitle: 'Combate y habilidad' },
  stealth: { title: 'Juegos de Sigilo', subtitle: 'Infiltración táctica' },
  other: { title: 'Otros Juegos', subtitle: 'Variedad y diversión' },
  
  // Categorías/Plataformas
  ps5: {
    title: 'Juegos de PS5',
    subtitle: 'La nueva generación de PlayStation'
  },
  ps2: {
    title: 'Clásicos de PS2',
    subtitle: 'Los mejores juegos retro de PlayStation 2'
  },
  ps1: {
    title: 'Clásicos de PS1',
    subtitle: 'Las joyas de la PlayStation original'
  }
}

interface Props {
  params: {
    id: string
  }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Readonly<Props>) {
  const { id } = params
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  // Si no existe la categoría/género, redirigir a 404
  if (!categoryLabels[id]) {
    notFound()
  }

  // Determinar si es una categoría (plataforma) o un género
  const isCategory = ['ps5', 'ps2', 'ps1'].includes(id)
  const filters = isCategory 
    ? { category: id as 'ps5' | 'ps2' | 'ps1', page }
    : { genre: id, page }

  // Obtener productos filtrados desde la base de datos
  const result = await getFilteredProducts(filters)

  if (!result.ok) {
    return (
      <div className="text-center py-10">
        <Title title='Error' subtitle='No se pudieron cargar los productos' />
      </div>
    )
  }

  // Obtener el título y subtítulo para la categoría/género
  const { title, subtitle } = categoryLabels[id]

  return (
    <>
      <Title 
        title={title} 
        subtitle={`${subtitle} - ${result.totalCount} productos disponibles`} 
        className='mb-2' 
      />

      <ProductGrid products={result.products} />
      
      {/* Info de debugging/paginación */}
      <div className="text-center text-sm text-gray-600 mt-4">
        Página {result.currentPage} de {result.totalPages} 
        | Mostrando {result.products.length} de {result.totalCount} productos
      </div>
    </>
  )
}
