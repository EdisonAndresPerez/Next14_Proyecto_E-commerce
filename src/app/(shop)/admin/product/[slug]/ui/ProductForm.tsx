'use client'

import { Product, Category, ValidGenres, ValidPlatforms } from '@/interfaces'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface Props {
  product: Product
  categories: Category[]
}

const genres = [
  'action',
  'adventure',
  'sports',
  'rpg',
  'shooter',
  'racing',
  'strategy',
  'simulation',
  'horror',
  'platformer',
  'puzzle',
  'fighting',
  'stealth',
  'other'
]

const platforms = [
  'ps5',
  'ps4',
  'ps3',
  'ps2',
  'ps1',
  'xbox_series_x',
  'xbox_series_s',
  'xbox_one',
  'xbox_360',
  'nintendo_switch',
  'nintendo_3ds',
  'pc',
  'steam',
  'epic_games'
]

interface FormInputs {
  name: string
  slug: string
  description: string
  msrp: number
  inStock: number
  genre: ValidGenres
  platform: ValidPlatforms
  tags: string
  categoryId: string
  images?: FileList
}

export const ProductForm = ({ product, categories }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const productDefaults = {
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    msrp: product?.msrp ?? 0,
    inStock: product?.inStock ?? 0,
    genre: product?.genre ?? ('action' as ValidGenres),
    platform: product?.platform ?? ('ps5' as ValidPlatforms),
    tags: product?.tags?.join(', ') ?? '',
    categoryId: product?.categoryId ?? ''
  }

  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm<FormInputs>({
    defaultValues: {
      ...productDefaults
    }
  })

  const onSubmit = async (data: FormInputs) => {
    console.log('Form data:', data)

    const formData = new FormData()

    const { ...productToSave } = data

    formData.append('id', product.id ?? '')
    formData.append('name', productToSave.name ?? '')
    formData.append('slug', productToSave.slug ?? '')
    formData.append('description', productToSave.description ?? '')
    formData.append('msrp', productToSave.msrp.toString() ?? '')
    formData.append('inStock', productToSave.inStock.toString() ?? '')
    formData.append('genre', productToSave.genre.toString() ?? '')
    formData.append('platform', productToSave.platform.toString() ?? '')
    formData.append('tags', productToSave.tags ?? '')
    formData.append('categoryId', productToSave.categoryId ?? '')

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitMessage('✅ Producto guardado exitosamente!')
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage('❌ Error al guardar el producto')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Información del producto */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Nombre del Juego</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.name}
            {...register('name', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Slug</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.slug}
            {...register('slug', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Descripción</span>
          <textarea
            rows={5}
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.description}
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Precio (MSRP)</span>
          <input
            type='number'
            step='0.01'
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.msrp}
            {...register('msrp', { required: true, min: 0 })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Inventario</span>
          <input
            type='number'
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.inStock}
            {...register('inStock', { required: true })}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Género</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.genre}
            {...register('genre', { required: true })}
          >
            <option value=''>[Seleccione un género]</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Plataforma</span>
          <select
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.platform}
            {...register('platform', { required: true })}
          >
            <option value=''>[Seleccione una plataforma]</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform.toUpperCase().replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Categoría</span>

          <select
            className='p-2 border rounded-md bg-gray-200'
            defaultValue={product?.categoryId ?? ''}
            {...register('categoryId', { required: true })}
          >
            <option value=''>[Seleccione una categoría]</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type='submit'
          className={`btn-primary w-full ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
        </button>

        {/* Mostrar mensaje de resultado */}
        {submitMessage && (
          <div
            className={`mt-3 p-2 rounded ${
              submitMessage.includes('✅')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* Mostrar errores de validación */}
        {Object.keys(errors).length > 0 && (
          <div className='mt-3 p-2 bg-red-100 text-red-800 rounded'>
            <p className='font-semibold'>Errores de validación:</p>
            <ul className='list-disc list-inside'>
              {errors.name && <li>El nombre es requerido</li>}
              {errors.slug && <li>El slug es requerido</li>}
              {errors.description && <li>La descripción es requerida</li>}
              {errors.msrp && <li>El precio es requerido</li>}
              {errors.inStock && <li>El inventario es requerido</li>}
              {errors.genre && <li>El género es requerido</li>}
              {errors.platform && <li>La plataforma es requerida</li>}
              {errors.categoryId && <li>La categoría es requerida</li>}
            </ul>
          </div>
        )}
      </div>

      {/* Tags y Fotos */}
      <div className='w-full'>
        <div className='flex flex-col mb-2'>
          <span>Tags (separados por coma)</span>
          <input
            type='text'
            className='p-2 border rounded-md bg-gray-200'
            placeholder='ej: multijugador, online, cooperativo'
            defaultValue={product?.tags?.join(', ')}
            {...register('tags')}
          />
        </div>

        <div className='flex flex-col mb-2'>
          <span>Estado</span>
          <div className='flex items-center gap-4 p-2'>
            <label className='flex items-center gap-2'>
              <input
                type='checkbox'
                defaultChecked={true}
                className='w-4 h-4'
              />
              <span>Producto activo</span>
            </label>
          </div>
        </div>

        <div className='flex flex-col mb-2'>
          <span>Imágenes del Producto</span>
          <input
            type='file'
            multiple
            className='p-2 border rounded-md bg-gray-200'
            accept='image/png, image/jpeg, image/webp'
            {...register('images')}
          />
          <small className='text-gray-500 mt-1'>
            Sube múltiples imágenes del juego (portada, capturas, etc.)
          </small>
        </div>

        {/* Mostrar imágenes existentes si las hay */}
        {product?.images && product.images.length > 0 && (
          <div className='flex flex-col mb-2'>
            <span>Imágenes actuales</span>
            <div className='grid grid-cols-2 gap-2 mt-2'>
              {product.images.map((image, index) => (
                <div key={index} className='relative'>
                  <Image
                    src={`/products/${image}`}
                    alt={`${product.name} - ${index + 1}`}
                    width={100}
                    height={100}
                    className='w-20 h-20 object-cover rounded'
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
