import { getSession, signOut } from 'next-auth/react'
import { BASE_URL } from '@/definitions'

interface fetchClientProps {
    method?: string
    url: string
    body?: string
    token?: string
    tags?: string[]
}

async function fetchClient({
    method = 'GET',
    url,
    body = '',
    token,
    tags,
}: fetchClientProps) {
    try {
        const session = await getSession()
        const accessToken = token || session?.user.token
        const response = await fetch(BASE_URL + url.toString(), {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                ...(accessToken && { Authorization: 'Bearer ' + accessToken }),
            },
            body: body || undefined,
            ...(tags && { next: { tags } }),
        })

        if (!response.ok) {
            throw response
        }
        const data = await response.json()
        return data
    } catch (error) {
        if (error instanceof Response) {
            if (error.status === 401) {
                signOut()
            }

            throw error
        }

        throw new Error('Failed to fetch data', { cause: error })
    }
}

export default fetchClient
