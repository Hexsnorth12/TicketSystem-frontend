import React, { useState } from 'react'
import { Button } from '../common'

import type { ChatButton } from '@/types'
import { useButton } from '@/hooks/button'
import * as Ably from 'ably'
import AblyChat from '@components/Chat/chat'
import {
    AblyProvider,
    ChannelProvider,
    useChannel,
    useConnectionStateListener,
} from 'ably/react'
const client = new Ably.Realtime({
    key: 'fdxeXQ.vQ53EQ:-5NaA5sXsII1Ono7Ygi4XBAFNBwQ7Ftl9008W6a0mmo',
})
const ChatBtn: React.FC<ChatButton> = ({ disabled, ticketId, index, name }) => {
    const { basicButtonProps } = useButton(disabled)
    const defaultStyle = buttonStyle()

    function buttonStyle() {
        return !disabled
            ? 'border-gray-1 bg-gray-1 text-primary hover:text-gray-1'
            : ''
    }

    const [openChats, setOpenChats] = useState<string[]>([])
    console.log(openChats, 'openChats')

    function onClickHandler() {
        if (!openChats.includes(ticketId)) {
            setOpenChats((prev) => [...prev, ticketId])
        }
    }

    function handleCloseChat(ticketId: string) {
        setOpenChats((prev) => prev.filter((id) => id !== ticketId))
    }
    //未來添加相對應功能
    function openChat() {}
    const translateYValue = `${index * 350}px`
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
            {/* 渲染多个聊天窗口，按垂直方向堆叠 */}
            {openChats.map((id) => {
                return (
                    <AblyProvider key={id} client={client}>
                        <ChannelProvider channelName={`chat-${id}`}>
                            <AblyChat
                                ticketId={id}
                                onClose={() => handleCloseChat(id)}
                                offset={translateYValue} // 将 offset 属性传递给 AblyChat
                                name={name}
                            />
                        </ChannelProvider>
                    </AblyProvider>
                )
            })}
        </div>
    )
}

export default ChatBtn
