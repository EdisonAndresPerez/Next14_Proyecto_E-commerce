'use client'

import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
  name: string
  email: string
  password: string
}

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    const { name, email, password } = data
    console.log({ name, email, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <label htmlFor='email'>Nombre completo</label>
      <input
        autoFocus
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='text'
        {...register('name', { required: true })}
      />

      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        {...register('email', {
          required: 'El correo es obligatorio',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'El correo no es válido'
          }
        })}
      />

      <label htmlFor='email'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        {...register('password')}
      />

      <button className='bg-white border-2 border-black text-black font-semibold py-3 px-6 rounded-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg'>
        Crear Cuenta
      </button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/login' className='btn-secondary text-center'>
        Iniciar sesión
      </Link>
    </form>
  )
}
