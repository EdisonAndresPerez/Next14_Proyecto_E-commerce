'use client'

import { setUserAddress, deleteUserAddress } from '@/actions'
import type { Country, Address } from '@/interfaces'
import { useAddressStore } from '@/store/address/address.store'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormInputs = {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postalCode: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}

interface Props {
  countries: Country[]
  userStoredAddress?: Partial<Address>
}

export default function AddressForm({
  countries,
  userStoredAddress = {}
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [message, setMessage] = useState('')
  const [hasStoredAddress, setHasStoredAddress] = useState(false)

  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset
  } = useForm<FormInputs>({
    defaultValues: {
      ...(userStoredAddress as any),
      rememberAddress: false
    }
  })

  const { data: session } = useSession({
    required: true
  })

  const setAddress = useAddressStore(state => state.setAddress)
  const address = useAddressStore(state => state.address)

  useEffect(() => {
    if (address.firstName) {
      reset(address)
      setHasStoredAddress(true)
    }
  }, [address, reset])

  const handleDeleteAddress = async () => {
    if (!session?.user?.id) {
      setMessage('Error: No se pudo identificar el usuario')
      return
    }

    if (
      !confirm('¿Estás seguro de que deseas eliminar la dirección guardada?')
    ) {
      return
    }

    try {
      setIsDeleting(true)
      setMessage('')

      const result = await deleteUserAddress(session.user.id)

      if (result.ok) {
        setMessage('Dirección eliminada exitosamente')
        setHasStoredAddress(false)
        // Limpiar el formulario
        reset({
          firstName: '',
          lastName: '',
          address: '',
          address2: '',
          postalCode: '',
          city: '',
          country: '',
          phone: '',
          rememberAddress: false
        })
        // Limpiar el store
        setAddress({
          firstName: '',
          lastName: '',
          address: '',
          address2: '',
          postalCode: '',
          city: '',
          country: '',
          phone: '',
          rememberAddress: false
        })
      } else {
        setMessage(result.message || 'Error al eliminar la dirección')
      }
    } catch (error) {
      console.error('Error deleting address:', error)
      setMessage('Error inesperado al eliminar la dirección')
    } finally {
      setIsDeleting(false)
    }
  }

  const onSubmit = async (data: FormInputs) => {
    try {
      const { rememberAddress, ...restAddress } = data
      setAddress(data)

      if (rememberAddress) {
        if (!session?.user?.id) {
          setMessage('Error: No se pudo identificar el usuario')
          return
        }

        setIsLoading(true)
        setMessage('')

        const result = await setUserAddress(restAddress, session.user.id)

        if (result.ok) {
          setMessage('Dirección guardada exitosamente')
          setHasStoredAddress(true)
      
          // Redirigir a la página de resumen del checkout
          router.push('/checkout')
        } else {
          setMessage(result.message || 'Error al guardar la dirección')
        }
      } else {
        // Solo guardar en el store local, no en BD
        setMessage('Dirección guardada temporalmente')
        // Redirigir a la página de resumen del checkout
        router.push('/checkout')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setMessage('Error inesperado al procesar la dirección')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'
    >
      <div className='flex flex-col mb-2'>
        <span>Nombres</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('firstName', { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Apellidos</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('lastName', { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Dirección</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('address', { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Dirección 2 (opcional)</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('address2')}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Código postal</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('postalCode', { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>Ciudad</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('city', { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <span>País</span>
        <select
          className='p-2 border rounded-md bg-gray-200'
          {...register('country', { required: true })}
        >
          <option value=''>[ Seleccione ]</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col mb-2'>
        <span>Teléfono</span>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('phone', { required: true })}
        />
      </div>

      <div className='inline-flex items-center'>
        <label
          className='relative flex cursor-pointer items-center rounded-full p-3'
          htmlFor='checkbox'
          data-ripple-dark='true'
        >
          <input
            {...register('rememberAddress')}
            type='checkbox'
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
            id='checkbox'
          />
          <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='1'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </label>
        <span>¿Recordar direccion?</span>
      </div>
      <div className='flex flex-col mb-2 sm:mt-10'>
        {message && (
          <div
            className={clsx('mb-2 p-2 rounded text-sm', {
              'bg-green-100 text-green-700': message.includes('exitosamente'),
              'bg-red-100 text-red-700':
                message.includes('Error') || message.includes('error')
            })}
          >
            {message}
          </div>
        )}

        <div className='flex gap-2'>
          <button
            disabled={!isValid || isLoading || isDeleting}
            type='submit'
            className={clsx('flex-1', {
              'btn-primary': isValid && !isLoading && !isDeleting,
              'btn-disable': !isValid || isLoading || isDeleting
            })}
          >
            {isLoading ? 'Guardando...' : 'Siguiente'}
          </button>

          {hasStoredAddress && (
            <button
              disabled={isLoading || isDeleting}
              type='button'
              onClick={handleDeleteAddress}
              className={clsx('px-4 py-2 rounded text-sm font-medium', {
                'bg-red-500 text-white hover:bg-red-600':
                  !isLoading && !isDeleting,
                'bg-gray-300 text-gray-500 cursor-not-allowed':
                  isLoading || isDeleting
              })}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar Dirección'}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
