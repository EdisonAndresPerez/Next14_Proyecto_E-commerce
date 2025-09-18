'use client'

import { titleFont } from '@/config/fonts'
import RegisterForm from './ui/RegisterForm'
import { useEffect, useState } from 'react'

export default function LoginPage() {
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>([])
  const [showSubtitle, setShowSubtitle] = useState(false)
  const title = 'WordGames|'

  useEffect(() => {
    // Inicializar array de letras como no animadas
    const totalLetters = title.length
    setAnimatedLetters(new Array(totalLetters).fill(false))

    // Animar cada letra con delay
    const delays = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

    delays.forEach((delay, index) => {
      if (index < totalLetters) {
        setTimeout(() => {
          setAnimatedLetters(prev => {
            const newArray = [...prev]
            newArray[index] = true
            return newArray
          })
        }, delay)
      }
    })

    // Mostrar "Ingresar" con slide después de que termine "WordGames|"
    setTimeout(() => {
      setShowSubtitle(true)
    }, 1200) // 100ms extra después de la última letra
  }, [])

  return (
    <main className='flex flex-col min-h-screen pt-32 sm:pt-52'>
      <div className='flex justify-center items-end mb-10'>
        {/* WordGames| animado */}
        <h1 className={`${titleFont.className} text-3xl mb-5 font-bold flex`}>
          {title.split('').map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-500 ${
                animatedLetters[index]
                  ? 'transform translate-y-0 opacity-100'
                  : 'transform -translate-y-8 opacity-0'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Ingresar con efecto slide */}
        <h2
          className={`font-thin text-2xl transition-all duration-700 ease-out ${
            showSubtitle
              ? 'transform translate-x-0 opacity-100'
              : 'transform translate-x-8 opacity-0'
          }`}
        >
          Registrarse
        </h2>
      </div>

      <RegisterForm />
    </main>
  )
}
