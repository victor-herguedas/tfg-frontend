import PopUp from "@/components/PopUp";
import { PopUpProvider } from "@/components/PopUpProvider";
import { useState } from "react";

export default function Chat() {
    const [isActivated, setIsActivated] = useState<boolean>(true)
    return (
        <PopUpProvider isActivated={isActivated} setIsActivated={setIsActivated}>
            <PopUp stylesProp="overflow-hidden">
                <div className="overflow-hidden bg-pink-400 h-screen flex flex-col">
                    <div style={{minHeight: "50px"}} className="headder flex flex-row justify-between items-center overflow-hidden bg-blue-400">
                        <button onClick={() => setIsActivated(false)}>Other Chats</button>
                        <h1>Chat</h1>
                        <button onClick={() => setIsActivated(false)}>Close</button>
                    </div>
                    <div className="body flex-grow bg-green-400 overflow-hidden flex flex-col justify-end">
                        <div className="messages-area bg-slate-200 h-full overflow-y-auto overflow-x-hidden">
                        <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>
                            <p className="text-black">Hola</p>


                        </div>
                        <div style={{minHeight: "50px"}} className="send-area bg-orange-400 w-full">

                        </div>
                    </div>
                </div>
            </PopUp>
        </PopUpProvider>
    )
}