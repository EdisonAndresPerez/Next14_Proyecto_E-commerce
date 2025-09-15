import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout/address')
  }

  // Este console.log solo lo verás en el servidor y solo si hay sesión
  console.log('Usuario autenticado:', session.user.email)

  return <>{children}</>
}
