export interface Server {
    [T: string]: string
}

// server 自定義狀態碼
export const serverCode: Server = {
    SUCCESS: '6000',
    NOT_LOGGED_IN: '6303',
}

export const BASE_URL = 'https://ticketsystembackend-zz2vrjpjsa-de.a.run.app/'

// 保護路由: 驗證失敗會重導登入頁
export const protectedRoutes = ['/search']

// 公開路由
export const publicRoutes = ['/login', '/signup', '/', '/Dashboard']
