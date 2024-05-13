import React from 'react'
import { Button } from '../common'

import type { ChatButton } from '@/types'
import { useButton } from '@/hooks/button'

export const ChatBtn: React.FC<ChatButton> = ({ disabled }) => {
    const { basicButtonProps } = useButton(disabled)
    const defaultStyle = buttonStyle()

    function buttonStyle() {
        return !disabled ? 'border-gray-1 bg-gray-1 text-primary' : ''
    }

    function onClickHandler() {
        openChat()
    }

    //未來添加相對應功能
    function openChat() {}

    return (
        <div {...basicButtonProps}>
            <Button
                type="button"
                title="live chat"
                className={defaultStyle}
                disabled={disabled}
                onClick={onClickHandler}>
                聊聊
            </Button>
        </div>
    )
}
