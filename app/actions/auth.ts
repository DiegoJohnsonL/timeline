'use server'

import { signOut, signIn } from '@/lib/auth'

export async function signInAction(){
    return signIn()
}

export async function signOutAction()   {
    return signOut()
}

