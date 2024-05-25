'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export const refreshAuth = async (path: string = '/') => {
    revalidateTag('auth')
    revalidatePath('/')
    redirect(path)
}
