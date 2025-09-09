import { FaCartShopping } from "react-icons/fa6";
import { Title } from "@/components";
import Link from 'next/link'

export default function CartPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center  gap-4 mb-6">
        <Title
          title="Mis Compras"
          showIcon={false}
          className="mb-0"
        />
        <FaCartShopping className="text-4xl md:text-5xl text-black-600 mt-3" />
      </div>
      <hr className="mb-6 bg-slate-950 h-1 border-0" />


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* carrito */}
            <div className="flex flex-col mt-5">
                <span className="text-xl">agregar mas juegos</span>
                <Link href="/" className="underline mb-5">
                Continuar comprando
                </Link>
            </div>

           {/* checkout */}

      </div>




      
      {/* Aquí puedes agregar el contenido del carrito */}
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
        <p className="text-gray-400 mt-2">¡Agrega algunos productos para comenzar!</p>
      </div>
    </div>
  );
}