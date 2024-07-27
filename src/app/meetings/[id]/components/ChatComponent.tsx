import PopUp from "@/components/PopUp";
import { PopUpProvider } from "@/components/PopUpProvider";
import React, { use, useEffect, useRef, useState } from "react";
import { CloseButton, Textarea } from "@chakra-ui/react";
import MessageArea from "./MessageArea";
import { Chat as ChatModel, Message, MessageRole } from "@/domain/models/Chat";
import AutoResizingTextArea from "./AutoResizingTextArea";
import { IoMdSend } from "react-icons/io";
import { useChatRepository } from "@/adapters/repositorys/chatRepository";
import ChatButton from "./ChatButton";

interface Props {
    meetingId: string;
}

export default function Chat({ meetingId }: Props) {
    const [isActivated, setIsActivated] = useState<boolean>(false)
    const [newMessage, setNewMessage] = useState<string>("")
    const { chat, loading, error, sendMessage } = useChatRepository({ meetingId })
    const [messages, setMessages] = useState<Message[]>(chat?.messages ?? [])
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMessages(chat?.messages ?? [])
    }, [chat])


    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return
        setMessages([...messages, {
            text: newMessage,
            role: MessageRole.USER,
            createdAt: new Date()
        }]
        )
        setNewMessage("")
        await sendMessage(newMessage)
    }

    const welcomeMessages: Message[] = [
        {
            text: "Welcome I am Sally 😎. \nMy work is to be your personal agent.",
            role: MessageRole.SYSTEM,
            createdAt: new Date()
        },
        {
            text: "I will help you with the meeting, ask me anything you want.",
            role: MessageRole.SYSTEM,
            createdAt: new Date()
        }
    ]

    const handleClickButton = () => {
        if (!isActivated) {
            setIsActivated(!isActivated)
        } else {
            setIsActivated(false)
        }
    }

    const filterMessages = (messages: Message[] | null): Message[] => {
        if (messages === null) {
            return welcomeMessages
        } else {
            messages[0] = welcomeMessages[0]
            messages[1] = welcomeMessages[1]
        }
        return messages
    }

    return (
        <PopUpProvider isActivated={isActivated} setIsActivated={setIsActivated}>
            <div ref={buttonRef}>
                <ChatButton isActivated={isActivated} handleClick={handleClickButton} />
            </div>
            <PopUp stylesProp="overflow-hidden" buttonRef={buttonRef}>
                <div className="overflow-hidden h-screen flex flex-col w-full">
                    <div style={{ minHeight: "20px", maxHeight: "50px" }} className="headder flex flex-row justify-end items-start overflow-hidden">
                        {/* <div>
                            <CloseButton
                                onClick={() => setIsActivated(false)} />
                        </div> */}
                        {/* <div>
                            <h1>{name}</h1>
                        </div> */}
                        <div >
                            <CloseButton
                                onClick={() => setIsActivated(false)} />
                        </div>
                    </div>
                    {/* <div style={{ height: "1px" }} className="rounded-3xl w-full bg-white mb-4"> </div> */}
                    <div className="body flex-grow overflow-hidden flex flex-col justify-end">
                        <div className="messages-area h-full overflow-y-auto overflow-x-hidden">
                            <MessageArea messages={filterMessages(messages)} isLoading={loading} />
                        </div>
                        <div style={{ minHeight: "50px", maxHeight: "100px" }} className="send-area  w-full flex flex-row items-center gap-2">

                            <AutoResizingTextArea
                                className="w-full bg-black p-2 rounded-lg border-2 border-white my-2"
                                setValue={setNewMessage}
                                value={newMessage}
                                styles={{ maxHeight: "90px", height: "25px" }}
                            />
                            <IoMdSend
                                onClick={handleSendMessage}
                                color="white" size="1.5em" className="ml-2 hover:cursor-pointer" />
                        </div>
                    </div>
                </div>
            </PopUp>
        </PopUpProvider>
    )
}