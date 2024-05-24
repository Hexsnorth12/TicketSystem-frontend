import { getSession, signOut } from 'next-auth/react'

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
        const response = await fetch(url.toString(), {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
            body: body || undefined,
            ...(tags && { next: { tags } }),
        })

        if (!response.ok) {
            throw response
        }

        return response
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
