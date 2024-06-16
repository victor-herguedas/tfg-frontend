'use client'
import Image from "next/image";
import styles from "./MeetingCard.module.css"
import { useState } from "react";
import CreateMeetingPopUp from "./CreateMeetingPopUp";


export default function CreateMeetingCard() {
    const [isActivated, setIsActivated] = useState(false)
    const imageUrl = "https://cdn-icons-png.freepik.com/512/8377/8377219.png"
    const width = "375px"
    const height = "500px"
    const imageWidth = 350
    const imageHeight = imageWidth * (9 / 16)

    const togglePopUp = () => {
        setIsActivated(!isActivated)
    }

    return (
        <div>
            <div
                onClick={togglePopUp}
                style={{ maxWidth: width, width: width, height: height, maxHeight: height }}
                className={`flex flex-col bg-secondaryBackground mt-4 mx-2 justify-around items-center py-8 rounded-lg border-white border-2 ${!isActivated ? styles.meetingCard : ""} hover:cursor-pointer hover:bg-neutral-800`}>
                    <p className="text-4xl">Create new</p>
                    <Image className="mx-auto mt-2 overflow-hidden"
                        alt={"picture with a plus for creating a meeting"}
                        width={imageHeight * 1/3}
                        height={imageHeight}
                        src={imageUrl} />
                    <p className="text-4xl">Meeting</p>
            </div>
                <CreateMeetingPopUp isActivated={isActivated} setIsActivated={setIsActivated} />
        </div>
    )
}