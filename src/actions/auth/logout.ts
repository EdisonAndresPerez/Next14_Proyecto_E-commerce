'use server'


import { signOut } from "@/auth.config"


export default async function logout() {
await signOut()
}
