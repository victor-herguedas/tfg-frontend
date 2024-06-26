import { Chat } from "@/domain/models/Chat"
import { NEXT_PUBLIC_API_URL } from "@/utilities/environment"
import { useEffect, useState } from "react"


interface Props {
    meetingId: string
    chatId?: string
}


export const useChatRepository = ({ meetingId, chatId: chatIdProp }: Props) => {
    const [chat, setChat] = useState<Chat | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    const [chatId, setChatId] = useState<string | null>(chatIdProp !== undefined ? chatIdProp : null)

    const handleSetChat = (chat: Chat) => {
        chat.createdAt = new Date(chat.createdAt)
        chat.updatedAt = new Date(chat.updatedAt)
        chat.messages = chat.messages.map(message => {
            message.createdAt = new Date(message.createdAt)
            return message
        })
        setChat(chat)
    }

    useEffect(() => {
        if (chatIdProp === undefined) {
            setLoading(false)
            return
        }
        const fetchMessages = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/${meetingId}/chats/${chatId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                )
                const chatEntity = await response.json()
                handleSetChat(chatEntity as Chat)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMessages()
    }, [meetingId, chatIdProp])

    const sendMessage = async (message: string) => {
        try {
            setLoading(true)
            if (chatId === null || chatId === undefined) {
                console.log("No conocemos" + chatId)
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/${meetingId}/chats`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ message })
                    }
                )
                const chatEntity = await response.json()
                handleSetChat(chatEntity as Chat)
                setChatId(chatEntity.id)
            } else {
                console.log("Conocemos" + chatId)
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/${meetingId}/chats/${chatId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ question: message })
                    }
                )
                const chatEntity = await response.json()
                handleSetChat(chatEntity as Chat)
            }
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { chat, loading, error, sendMessage }
}