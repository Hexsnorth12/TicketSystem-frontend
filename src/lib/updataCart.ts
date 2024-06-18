import { BASE_URL } from '@/definitions'

export const updataCart = async ({
    method,
    url,
    data,
    token,
}: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    url: string
    data?: any
    token: string
}) => {
    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }

    if (method !== 'GET' && data) {
        config.body = JSON.stringify(data)
    }

    try {
        const response = await fetch(`${BASE_URL}${url}`, config)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Fetch error:', error)
        throw error
    }
}
