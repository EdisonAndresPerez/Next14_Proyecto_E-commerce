'use server'

import { signIn } from '@/auth.config'
import { ok } from 'assert'
import { CredentialsSignin } from 'next-auth'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false
    })

    return 'Success'
  } catch (error) {
    if ((error as any).type === CredentialsSignin) {
      return 'CredentialsSignin'
    }
    return 'error'
  }
}


export const login = async(email: string, password: string) => {

  try {
    
    await signIn('credentials', {email, password})

    return {ok: true,
      message: 'Login correcto'
    }

  } catch (error) {
      console.log(error)
      return{
        ok: false,
        message: 'Error en el login'
      }
  }

}
