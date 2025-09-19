import { getCategories, getProductBySlug } from '@/actions'
import { Title } from '@/components'
import { redirect } from 'next/navigation'
import { ProductForm } from './ui/ProductForm'

interface Props {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {
  const { slug } = params

  const [productResult, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  // Si slug es 'new', crear un producto vacío
  if (slug === 'new') {
    const emptyProduct = {
      name: '',
      slug: '',
      description: '',
      msrp: 0,
      inStock: 0,
      genre: 'action' as const,
      platform: 'ps5' as const,
      category: 'ps5' as const,
      tags: [],
      images: []
    };

    return (
      <>
        <Title title="Nuevo producto" />
        <ProductForm product={emptyProduct} categories={categories} />
      </>
    );
  }

  // Para productos existentes, verificar que el resultado sea exitoso
  if (!productResult.ok || !productResult.product) {
    redirect('/admin/products')
  }

  return (
    <>
      <Title title="Editar producto" />
      <ProductForm product={productResult.product} categories={categories} />
    </>
  )
}
