import React from 'react'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { authenticate } from '@/actions'

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  console.log({ state })

  return (
    <form className='flex flex-col' action={dispatch}>
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
      />

      <label htmlFor='email'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />

      <button
        type='submit'
        className='bg-white border-2 border-black text-black font-semibold py-3 px-6 rounded-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg'
      >
        Ingresar
      </button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Crear una nueva cuenta
      </Link>
    </form>
  )
}
