export const revalidate = 0

import {getPaginateUsers } from '@/actions'
import { Title } from '@/components'
import { redirect } from 'next/navigation'
import UsersTable from './ui/UsersTable'


export default async function UsersPage() {
  const { ok, users = [] } = await getPaginateUsers()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title='Todos los usuarios de mi app' />

      <div className='mb-10'>
      <UsersTable users={users} />

      </div>
    </>
  )
}
