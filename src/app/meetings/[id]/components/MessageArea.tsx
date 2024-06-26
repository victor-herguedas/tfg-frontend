import { Message, MessageRole } from "@/domain/models/Chat"
import MessageComponent from "./Message"
import WaitingResponseChat from "./WaitingResponseChat"

interface Props {
    messages: Message[]
    isLoading: boolean
}

export default function MessageArea({ messages, isLoading }: Props) {
    return (
        <div className="flex flex-col gap-2 mt-2">
            {messages.map((message, index) => (
                <MessageComponent key={index} message={message.text} date={message.createdAt} role={message.role} />
            ))}
            {
                isLoading &&
                <WaitingResponseChat role={MessageRole.SYSTEM} />
            }
        </div>
    )
}