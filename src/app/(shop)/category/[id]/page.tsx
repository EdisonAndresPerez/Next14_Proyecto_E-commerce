import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

const seedProducts = initialData.products

// Labels para los géneros
const genreLabels: Record<string, { title: string; subtitle: string }> = {
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
  other: { title: 'Otros Juegos', subtitle: 'Variedad y diversión' },
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
}

export default function CategoryPage({ params }: Readonly<Props>) {
  const { id } = params
  // Ahora filtramos por category en lugar de genre
  const products = seedProducts.filter(
    (product: any) => product.category === id
  )

  // Si no existe la categoría, redirigir a 404
  if (!genreLabels[id]) {
    notFound()
  }

  // Obtener el título y subtítulo para la categoría
  const { title, subtitle } = genreLabels[id]

  return (
    <>
      <Title title={title} subtitle={subtitle} className='mb-2' />

      <ProductGrid products={products} />
    </>
  )
}
