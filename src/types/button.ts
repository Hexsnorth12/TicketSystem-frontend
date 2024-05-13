import { PropsWithChildren } from 'react'

type Button = {
    onClick?: () => void
    title: string
    className?: string
    disabled?: boolean
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
}

export type SocialButton = {
    type: 'facebook' | 'x' | 'line' | 'link'
    disabled?: boolean
    iconDimension?: { width: number; height: number }
}

export type ChatButton = {
    disabled?: boolean
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
