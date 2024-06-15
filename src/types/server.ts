export type Session = {
    id: string
    accountType: string
    iat: number
    exp: number
}
export interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    headers?: Record<string, string>
    body?: BodyInit
    nextConfig?: NextFetchRequestConfig
}
export interface fetchPayload {
    method?: string
    url: string
    body?: string
    token?: string
    tags?: string[]
    isTakeToken?: boolean
}