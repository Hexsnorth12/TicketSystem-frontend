export interface ILoginBody {
    account: string
    pwd: string
}

export interface ILoginData {
    account: string
    accountType: string
    email: string
    token: string
}

export interface ISignUpBody {
    account: string
    email: string
    pwd: string
    confirmPwd: string
}

export interface ISignUpData {}

export interface IMeta {}
