'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export const refreshAuth = async () => {
    revalidateTag('auth')
    revalidatePath('/')
    redirect('/')
}
