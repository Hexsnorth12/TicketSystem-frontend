import React, { useState, useEffect } from 'react'
import { Button } from '../common'
import avatar from '@icon/avatar.svg'
import type { ChatButton } from '@/types'
import { useButton } from '@/hooks/button'
import * as Ably from 'ably'
import AblyChat from '@components/Chat/chat'
import { AblyProvider, ChannelProvider } from 'ably/react'
import { useAlert } from '@/components/useAlert/useAlert'
import { useLazyGetInfoQuery } from '@/services/modules/user'
import { Session } from 'next-auth'
const client = new Ably.Realtime({
    key: 'fdxeXQ.vQ53EQ:-5NaA5sXsII1Ono7Ygi4XBAFNBwQ7Ftl9008W6a0mmo',
})
interface ChatBtnProps extends ChatButton {
    session: Session
}
const ChatBtn: React.FC<ChatBtnProps> = ({
    disabled,
    ticketId,
    index,
    name,
    session,
}) => {
    const { basicButtonProps } = useButton(disabled)
    const defaultStyle = buttonStyle()
    const showAlert = useAlert()
    function buttonStyle() {
        return !disabled
            ? 'border-gray-1 bg-gray-1 text-primary hover:text-gray-1'
            : ''
    }
    const isAuth = !!session
    const [getInfo, { data: userInfo }] = useLazyGetInfoQuery()
    useEffect(() => {
        if (!isAuth) return
        const getUserInfo = async () => {
            getInfo({ token: session?.accessToken ?? '' }).unwrap()
        }
        getUserInfo()
    }, [isAuth, session])
    const [openChats, setOpenChats] = useState<string[]>([])
    function onClickHandler() {
        if (!session) {
            showAlert('請登入後，再開啟聊天室', 'warning')
            return
        }
        if (!openChats.includes(ticketId)) {
            setOpenChats((prev) => [...prev, ticketId])
        }
    }

    function handleCloseChat(ticketId: string) {
        setOpenChats((prev) => prev.filter((id) => id !== ticketId))
    }
    //未來添加相對應功能
    const translateYValue = `${index * 50}px`
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
                            {userInfo && (
                                <AblyChat
                                    userInfo={userInfo?.imgUrl ?? avatar}
                                    userAccount={session.user.account}
                                    ticketId={id}
                                    onClose={() => handleCloseChat(id)}
                                    offset={translateYValue} // 将 offset 属性传递给 AblyChat
                                    name={name}
                                />
                            )}
                        </ChannelProvider>
                    </AblyProvider>
                )
            })}
        </div>
    )
}

export default ChatBtn
