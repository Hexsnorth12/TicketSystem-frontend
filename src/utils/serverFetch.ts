import { FetchOptions } from '@/types'
import { serverCode } from '@/definitions'
import { BASE_URL } from '@/definitions'
import { redirect } from 'next/navigation'

export const serverFetch = async <T>(
    url: string,
    token?: string | null,
    options: FetchOptions = {},
): Promise<T> => {
    const { method = 'GET', headers = {}, body = null, nextConfig } = options

    const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
    }

    if (token) {
        requestHeaders.Authorization = `Bearer ${token}`
    }

    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            method,
            headers: requestHeaders,
            body: body ? JSON.stringify(body) : null,
            ...(nextConfig && { next: nextConfig }),
        })

        const { status, data } = await response.json()
        if (status === serverCode.TOKEN_INVALID) {
            redirect(`/login}`)
        }
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}
