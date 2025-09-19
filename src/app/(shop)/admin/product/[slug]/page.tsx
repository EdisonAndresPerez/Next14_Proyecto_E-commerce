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

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])


  if (!product) {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Editar producto' : 'Nuevo producto'

  return (
    <>
      <Title title={title} />

      <ProductForm product={product} categories={categories} />
    </>
  )
}
