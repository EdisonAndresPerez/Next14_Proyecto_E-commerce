'use client'

import React, { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { authenticate } from '@/actions'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'

  const [state, dispatch] = useFormState(authenticate, undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (state === 'Success') {
      console.log('✅ Login exitoso, redirigiendo a:', redirectTo)
      // Usar window.location.href para una redirección más confiable
      window.location.href = redirectTo
    }
  }, [state, redirectTo])

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 3000))

    dispatch(formData)
    setIsLoading(false)
  }

  return (
    <form className='flex flex-col' action={handleSubmit}>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
        disabled={isLoading}
        required
      />

      <label htmlFor='password'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
        disabled={isLoading}
        required
      />

      {/* Mostrar mensaje de error */}
      {state && state !== 'Success' && (
        <div className='flex items-center gap-2 mb-5 p-3 bg-red-100 border border-red-300 rounded'>
          <svg
            className='h-5 w-5 text-red-500'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
          <p className='text-sm text-red-600'>
            {state === 'CredentialsSignin'
              ? 'Las credenciales no son correctas'
              : 'Error al iniciar sesión'}
          </p>
        </div>
      )}

      <button
        type='submit'
        disabled={isLoading}
        className={`py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform shadow-lg ${
          isLoading
            ? 'bg-black text-white cursor-not-allowed'
            : 'bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:scale-105'
        }`}
      >
        {isLoading ? (
          <div className='flex items-center justify-center gap-2'>
            <div className='w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin'></div>
            Ingresando...
          </div>
        ) : (
          'Ingresar'
        )}
      </button>

      {/* divisor line */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <button
        type='button'
        onClick={() =>
          router.push(
            `/auth/new-account?redirectTo=${encodeURIComponent(redirectTo)}`
          )
        }
        className={`btn-secondary text-center ${
          isLoading ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Crear una nueva cuenta
      </button>
    </form>
  )
}
