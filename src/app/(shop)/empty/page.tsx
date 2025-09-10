import { RiGameLine } from "react-icons/ri"
import Link from "next/link"


export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      {/* Icono animado */}
      <RiGameLine className="text-6xl text-black-600 animate-bounce mb-4" />

      {/* Texto */}
      <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
      <p className="text-gray-500">Agrega algunos juegos </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Ir a la tienda
      </Link>
    </div>
  )
}
