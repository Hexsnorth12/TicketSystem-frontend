import { PropsWithChildren } from 'react'

type Button = {
  onClick: () => void
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