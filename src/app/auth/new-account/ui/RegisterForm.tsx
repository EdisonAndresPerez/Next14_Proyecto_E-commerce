'use client'

import { registerUser, login } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
  name: string
  email: string
  password: string
}

export default function RegisterForm() {

  const router = useRouter()


  const [errorMessage, setErrorMessage] = useState('')

  const { register,  handleSubmit,   formState: { errors } } = useForm<FormInputs>()

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    setErrorMessage('')
    const { name, email, password } = data
    const resp = await registerUser(name, email, password)

    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }
    console.log(resp)

    await login(email.toLowerCase(), password)
    router.replace('/')



  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <label htmlFor='email'>Nombre completo</label>
      <input
        autoFocus
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name
        })}
        type='text'
        {...register('name', { required: true })}
      />

      <label htmlFor='email'>Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email
        })}
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
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password
        })}
        type='password'
        {...register('password', {
          required: 'La contraseña es obligatoria',
          minLength: {
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres'
          }
        })}
      />

      <span className='text-red-500'>{errorMessage}</span>

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
