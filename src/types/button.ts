import { PropsWithChildren } from 'react'

type Button = {
    type: 'button' | 'submit' | 'reset'
    title: string
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    className?: string
    children?: React.ReactNode
}

interface GeneralButton extends Button {
    type: 'button'
}

export interface FormButton extends Button {
    type: 'submit'
    name: string
    value: string
}

export type ButtonProps = PropsWithChildren<GeneralButton | FormButton>

export type NavigateButton = PropsWithChildren<{
    href: string
    className?: string
    onClick?: () => void
    icon?: boolean
    iconStyle?: string
    iconDimension?: { width: number; height: number }
    disabled?: boolean
    buttonStyle?: string
}>

export type TagButton = PropsWithChildren<{
    disabled?: boolean
    onClick?: () => void
    active?: boolean
}>

export type HelpersButton = {
    type: 'top' | 'bell' | 'chatroom'
    disabled?: boolean
    iconDimension?: { width: number; height: number }
    iconStyle?: string
}

export type SocialButton = {
    type: 'facebook' | 'x' | 'line' | 'link'
    disabled?: boolean
    iconDimension?: { width: number; height: number }
    iconStyle?: string
}
export type SearchButton = {
    className?: string
    onClick?: () => void
    type: 'search' | 'filter' | 'recommend'
    disabled?: boolean
    active?: boolean
    iconDimension?: { width: number; height: number }
    iconStyle?: string
}
export type ChatButton = {
    disabled?: boolean
    ticketId: string // 添加 ticketId 作为属性
    index: number
    name: string
}

export type CloseButton = {
    className?: string
    onClick?: () => void
    iconDimension?: { width: number; height: number }
    disabled?: boolean
}

export type FavoriteButton = {
    className?: string
    onClick?: () => void
    iconDimension?: { width: number; height: number }
    disabled?: boolean
    active?: boolean
}

export type CartButton = {
    amount: number
    className?: string
    onClick?: () => void
    iconDimension?: { width: number; height: number }
    disabled?: boolean
}

export type ArrowButton = {
    type: 'right' | 'left' | 'right-outline' | 'left-outline'
    className?: string
    onClick?: () => void
    iconDimension?: { width: number; height: number }
    disabled?: boolean
    iconStyle?: string
}

export type TypeTag = {
    tagName: string
}
