'use client'
import React from 'react'
import clsx from 'clsx'

import type { ButtonProps, FormButton } from '@/types'

const Button: React.FC<ButtonProps> = (props) => {
  const { type, title, disabled, onClick, className, children } = props

  function isFormButton(buttonProps: ButtonProps): buttonProps is FormButton {
    return 'name' in buttonProps && 'value' in buttonProps
  }

  function extraProps() {
    if (isFormButton(props)) return { name: props.name, value: props.value }
  }

  function refactedClassName() {
    const defaultStyle =
      'py-3 px-5 border-primary hover:bg-primary hover:text-gray-1 rounded-full border bg-transparent tracking-widest text-white'
    return clsx(defaultStyle, className)
  }

  function onClickHandler() {
    onClick()
  }

  const elementProps = {
    type,
    title,
    disabled,
    onClick: onClickHandler,
    className: refactedClassName(),
    ...extraProps(),
  }

  return <button {...elementProps}>{children}</button>
}

export default Button
