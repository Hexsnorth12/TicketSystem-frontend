'use server'

import { Session } from '@/types'
import { cookies } from 'next/headers'

// 還原 token base64
export const getSession = () => {
    const token = (cookies().get('token')?.value.split('.')[1] as string) || ''
    if (token.length === 0) {
        return { id: '' }
    }

    const session: Session = JSON.parse(atob(token))

    return session
}
