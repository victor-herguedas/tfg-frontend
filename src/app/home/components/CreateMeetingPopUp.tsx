'use client'
import { useEffect, useRef, useState } from "react"
import styles from "./MeetingCard.module.css"
import Image from "next/image"

interface Props {
    isActivated: boolean,
    setIsActivated: (isActivated: boolean) => void
}

export default function CreateMeetingPopUp({ isActivated, setIsActivated }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (overlayRef.current && contentRef.current && !contentRef.current.contains(event.target as Node)) {
            setIsActivated(false);
        }
    };

    useEffect(() => {
        if (isActivated) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActivated]);

    return (
        <>
            <div ref={overlayRef} className={`${styles.popup} ${isActivated ? styles.active : ""}`}>
                <div className={`${styles.overlay} `}>
                    <div ref={contentRef} className={`${styles.content} border-2 border-white rounded-lg overflow-x-hidden overflow-y-auto flex flex-col`}>
                        <div className={`${styles.closeBtn} hover:cursor-pointer`} onClick={() => setIsActivated(!isActivated)}>&times;</div>
                        <h2 className="text-2xl mb-10">ADD A NEW MEETING</h2>
                        <Image
                            className='mb-10'
                            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3ZuOTF5bWN4Z2w5N3ducGluNDA1djU3YmNpb3dpM2lubDR4dWQzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FlWgXEtj5aM5G/giphy.gif"
                            alt="fire room with a dog saying its fine"
                            width={400}
                            height={400}
                        />
                        <form className="flex flex-col gap-y-6">
                            <div className="flex flex-col">
                                <label htmlFor="meetingName" className="text-lg">Name</label>
                                <input
                                    className="border-2 border-white rounded-lg p-2"
                                    id="meetingName"
                                    type="text" placeholder="Meeting Name" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="date" className="text-lg">Date</label>
                                <input
                                    className="border-2 border-white rounded-lg p-2"
                                    id="date"
                                    type="date" placeholder="Meeting Name" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="file" className="text-lg">Mp3 File</label>
                                <input
                                    className="border-2 border-white rounded-lg p-2"
                                    id="file"
                                    accept=".mp3"
                                    type="file" placeholder="mp3 File" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}