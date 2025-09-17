import { Title } from '@/components'
import AddressForm from './ui/AddressForm'
import { getCountries, getUserAddress } from '@/actions'
import { auth } from '@/auth.config'

export default async function AddressPage() {
  const countries = await getCountries()


const session = await auth()

if (!session?.user) {
  return (
    <div className="text-center py-10">
      <Title title='Error' subtitle='Debes iniciar sesión para ver esta página' />
    </div>
  )
}

const userAddressResult = await getUserAddress(session.user.id)
const userAddress = userAddressResult && 'ok' in userAddressResult ? undefined : userAddressResult



  return (
    <div className='flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0'>
      <div className='w-full  xl:w-[1000px] flex flex-col justify-center text-left'>
        <Title title='Dirección' subtitle='Dirección de entrega' />

        <AddressForm countries={countries}   userStoredAddress={userAddress}  />
      </div>
    </div>
  )
}
