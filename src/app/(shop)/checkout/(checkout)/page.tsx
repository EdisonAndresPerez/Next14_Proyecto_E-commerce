import { auth } from '@/auth.config'
import CheckoutPage from './ui/CheckoutPage'
import { AddressSync } from './ui/AddressSync'
import { redirect } from 'next/navigation'

export default async function CheckoutPageServer() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout')
  }

  return (
    <AddressSync>
      <CheckoutPage />
    </AddressSync>
  )
}
