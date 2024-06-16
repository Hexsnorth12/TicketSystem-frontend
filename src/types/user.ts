export interface User {
    account: string
    email: string
    token: string
}

export interface UserInfo extends User {
    name: string
    createdAt: string
    birthDate: string
    phone: number
    gender: string
    address: string
    imgUrl: string
}

export interface UserComment extends User {
    avatarPath: string
}
