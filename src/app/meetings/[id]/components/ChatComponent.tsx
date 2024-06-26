import PopUp from "@/components/PopUp";
import { PopUpProvider } from "@/components/PopUpProvider";
import { useState } from "react";
import { CloseButton, Textarea } from "@chakra-ui/react";
import MessageArea from "./MessageArea";
import { Message, MessageRole } from "@/domain/models/Chat";
import AutoResizingTextArea from "./AutoResizingTextArea";
import { IoMdSend } from "react-icons/io";
import { useChatRepository } from "@/adapters/repositorys/chatRepository";

interface Props {
    name: string;
    meetingId: string;
}

export default function Chat({ name, meetingId }: Props) {
    const [isActivated, setIsActivated] = useState<boolean>(true)
    const [newMessage, setNewMessage] = useState<string>("")
    const { chat, loading, error, sendMessage } = useChatRepository({ meetingId })

    const messages: Message[] = chat?.messages ?? []

    const handleSendMessage = async () => {
        if (newMessage.trim() === "") return
        await sendMessage(newMessage)
        setNewMessage("")
    }


    return (
        <PopUpProvider isActivated={isActivated} setIsActivated={setIsActivated}>
            <PopUp stylesProp="overflow-hidden">
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
                            <MessageArea messages={messages} isLoading={loading} />
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