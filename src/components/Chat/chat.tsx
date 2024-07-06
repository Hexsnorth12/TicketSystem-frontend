'use client'
import React, { useState } from 'react'
import { useChannel, useConnectionStateListener } from 'ably/react'
import { Button } from '../common'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import Image from 'next/image'
interface ChatMessage {
    id: string
    content: string
    timestamp: number
    senderImg: string
    sender: string
}
interface ChatProps {
    ticketId: string
    onClose: () => void // 添加 onClose 属性
    offset: string
    name: string
    userInfo: string
    userAccount: string
}
const AblyChat: React.FC<ChatProps> = ({
    ticketId,
    onClose,
    offset,
    name,
    userInfo,
    userAccount,
}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [isMinimized, setIsMinimized] = useState(false)
    const [minimizedChats, setMinimizedChats] = useState<string[]>([])

    // 使用票證 ID 作為頻道名稱
    const channelName = `chat-${ticketId}`
    // Listening to the connection state
    useConnectionStateListener('connected', () => {
        console.log('Connected to Ably!')
    })
    const currentUser = userAccount
    const { channel } = useChannel(channelName, (message) => {
        setMessages((prevMessages) => [...prevMessages, message.data])
    })
    // Publish a message to the channel
    const sendMessage = () => {
        if (input.trim()) {
            // 發佈消息到頻道
            channel.publish({
                name: 'message',
                data: {
                    id: Date.now().toString(),
                    content: input,
                    timestamp: Date.now(),
                    senderImg: userInfo,
                    sender: currentUser,
                },
            })
            setInput('')
        }
    }
    // toggleMinimize
    const toggleMinimize = () => {
        if (isMinimized) {
            setMinimizedChats(minimizedChats.filter((id) => id !== ticketId))
        } else {
            setMinimizedChats([...minimizedChats, ticketId])
        }
        setIsMinimized(!isMinimized)
    }

    // restoreChat
    const restoreChat = () => {
        setIsMinimized(false)
        setMinimizedChats(minimizedChats.filter((id) => id !== ticketId))
    }

    return (
        <>
            <div className="fixed bottom-10 right-1/3 z-50">
                <div
                    className="fixed bottom-10 right-0 z-50"
                    style={{
                        transform: `translateY(-${offset})`,
                    }}>
                    <div
                        className="w-40 cursor-pointer rounded-md bg-gray-6 shadow-lg"
                        onClick={restoreChat}>
                        <div className="flex items-center justify-center p-3">
                            <span className="flex items-center text-white">
                                <IoChatbubbleEllipsesOutline className="mr-2" />{' '}
                                {name}
                            </span>
                        </div>
                    </div>
                </div>
                {isMinimized ? (
                    <p></p>
                ) : (
                    <div
                        className="fixed bottom-10 right-1/3 z-50 border border-black drop-shadow-2xl md:left-2/3 "
                        style={{
                            transform: `translateX(calc(${offset}))`,
                        }}>
                        <div className="w-80 rounded-md bg-gray-3 shadow-lg">
                            <div className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center justify-center p-3">
                                    <div className="flex items-center text-white">
                                        <IoChatbubbleEllipsesOutline className="mr-2" />{' '}
                                        <h3 className="text-btn1 font-medium text-white ">
                                            聊聊 {name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={onClose}
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-5 text-small2 text-gray-1">
                                        ×
                                    </button>
                                    {/* 缩小按钮 */}
                                    <button
                                        onClick={toggleMinimize}
                                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-5 text-small2 text-gray-1">
                                        {isMinimized ? '▢' : '−'}
                                    </button>
                                </div>
                            </div>
                            <div className="h-80 overflow-auto bg-gray-1 p-2">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`relative mb-2 flex flex-col items-${
                                            msg.sender === currentUser
                                                ? 'end'
                                                : 'start'
                                        } w-10/12 gap-1`}>
                                        <div
                                            className={`flex items-center gap-2 ${
                                                msg.sender === currentUser
                                                    ? 'flex-row-reverse'
                                                    : ''
                                            }`}>
                                            {msg.sender !== currentUser && (
                                                <Image
                                                    src={msg.senderImg}
                                                    alt="avatar"
                                                    width={20}
                                                    height={20}
                                                    className="h-6 w-6 rounded-full object-cover"
                                                />
                                            )}
                                            <div
                                                className={`relative  flex flex-col rounded-lg px-4 py-2 ${
                                                    msg.sender === currentUser
                                                        ? 'bg-secondary text-right'
                                                        : 'bg-gray-4 text-left'
                                                }`}>
                                                <span className="block text-small2 text-white">
                                                    {msg.content}
                                                </span>
                                            </div>
                                            {msg.sender === currentUser && (
                                                <Image
                                                    src={msg.senderImg}
                                                    alt="avatar"
                                                    width={20}
                                                    height={20}
                                                    className="hidden h-6 w-6 rounded-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <span className="block text-small2 text-gray-4">
                                            {new Date(
                                                msg.timestamp,
                                            ).toLocaleTimeString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-x-2 border-t-[1px] border-gray-3 bg-gray-1 p-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="輸入文字..."
                                    className="w-full bg-gray-1 text-white"
                                />
                                <Button
                                    type="button"
                                    title="送出"
                                    className="w-[100px] py-1 text-small2 text-white"
                                    onClick={sendMessage}>
                                    送出
                                </Button>
                            </div>
                        </div>
                    </div>
                )}{' '}
            </div>
        </>
    )
}
export default AblyChat
