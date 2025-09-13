import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function ShopLayout({
  children
}: {
  children: React.ReactNode
}) {
  const sesion = await auth()

  console.log({ sesion })

  if (sesion?.user) {
    redirect('/')
  }

  return (
    <main className='flex justify-center'>
      <div className='w-full sm:w-[350px] px-10'>{children}</div>
    </main>
  )
}
