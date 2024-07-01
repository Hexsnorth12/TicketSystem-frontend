'use client'
import React, { useState } from 'react'
import { useChannel, useConnectionStateListener } from 'ably/react'
import { Button } from '../common'
interface ChatMessage {
    id: string
    content: string
    timestamp: number
}
interface ChatProps {
    ticketId: string
    onClose: () => void // 添加 onClose 属性
    offset: string
    name: string
}
const AblyChat: React.FC<ChatProps> = ({ ticketId, onClose, offset, name }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    // 使用票證 ID 作為頻道名稱
    const channelName = `chat-${ticketId}`
    // Listening to the connection state
    useConnectionStateListener('connected', () => {
        console.log('Connected to Ably!')
    })

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
                },
            })
            setInput('')
        }
    }

    return (
        <div
            className="fixed bottom-10 right-0 z-50"
            style={{
                transform: `translateX(-${offset})`, // 使用 translateY 控制视窗位置
            }}>
            <div className="w-80 rounded-md bg-gray-3  shadow-lg">
                <div className="flex items-center justify-between px-4 py-3">
                    <h3 className="text-btn1 font-medium text-white ">
                        聊聊 {name}
                    </h3>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-5 ">
                        <button
                            onClick={onClose}
                            className="text-small2 text-gray-1">
                            ×
                        </button>
                    </div>
                </div>
                <div className="h-48 overflow-auto  bg-gray-1 p-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="relative mb-2 flex w-10/12 flex-col items-start gap-2 rounded-lg bg-secondary px-4 py-3 text-gray-800">
                            <span className="block text-sm text-gray-600">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                            <span className="block text-white">
                                {msg.content}
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
    )
}
export default AblyChat
