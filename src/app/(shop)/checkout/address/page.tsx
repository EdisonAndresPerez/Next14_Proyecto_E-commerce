import { Title } from '@/components'
import AddressForm from './ui/AddressForm'
import { getCountries, getUserAddress } from '@/actions'
import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function AddressPage() {
  const countries = await getCountries()

  const session = await auth()

  if (!session?.user) {
    // Redirigir al login con redirectTo para volver aquí después del login
    redirect('/auth/login?redirectTo=%2Fcheckout%2Faddress')
  }

  const userAddressResult = await getUserAddress(session.user.id)
  const userAddress = userAddressResult && 'ok' in userAddressResult ? undefined : userAddressResult



  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Dirección' subtitle='Dirección de entrega' />

        <AddressForm countries={countries} userStoredAddress={userAddress} />
      </div>
    </div>
  )
}
