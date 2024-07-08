import { Message, MessageRole } from "@/domain/models/Chat"
import MessageComponent from "./Message"
import WaitingResponseChat from "./WaitingResponseChat"
import { useEffect, useRef } from "react"

interface Props {
    messages: Message[]
    isLoading: boolean
}

export default function MessageArea({ messages, isLoading }: Props) {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex flex-col gap-2 mt-2 overflow-auto">
            {messages.map((message, index) => (
                <MessageComponent key={index} message={message.text} date={message.createdAt} role={message.role} />
            ))}
            {
                isLoading &&
                <WaitingResponseChat role={MessageRole.SYSTEM} />
            }
            <div ref={messagesEndRef} />
        </div>
    )
}