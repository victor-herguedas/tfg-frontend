'use client'
import { DateTime } from 'luxon';
import { FormEventHandler, useEffect, useRef, useState } from "react"
import styles from "./MeetingCard.module.css"
import Image from "next/image"
import { Button, Input } from "@chakra-ui/react"
import { useAddMeetingsRepository } from "@/adapters/repositorys/meetingsRepository"
import { useRouter } from "next/navigation"
import { MEETING_ROUTE } from "@/utilities/localRoutes"
import { PopUpProvider } from "@/components/PopUpProvider"
import PopUp from "@/components/PopUp"


interface Props {
    isActivated: boolean,
    setIsActivated: (isActivated: boolean) => void
}

export default function CreateMeetingPopUp({ isActivated, setIsActivated }: Props) {
    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const [audio, setAudio] = useState<File | undefined>(undefined)

    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const { meeting, loading, error, sendRequest } = useAddMeetingsRepository()

    const inputStyles = {
        "&::-webkit-calendar-picker-indicator": {
            filter: "invert(1)"
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (overlayRef.current && contentRef.current && !contentRef.current.contains(event.target as Node)) {
            setIsActivated(false);
        }
    };

    const addMeetingHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const nameFormInput = (event.target as HTMLFormElement).elements.namedItem("meetingName") as HTMLInputElement
        const dateFormInput = (event.target as HTMLFormElement).elements.namedItem("date") as HTMLInputElement
        const fileFormInput = (event.target as HTMLFormElement).elements.namedItem("file") as HTMLInputElement

        const name = nameFormInput.value
        const date = DateTime.fromISO(dateFormInput.value)
        const audio = fileFormInput.files?.[0] as Blob

        sendRequest({ name, date, audio })
    }


    console.log(error)
    if ((error === null) || (error === undefined)) {
        console.log("error is null")
        if (meeting !== null && meeting !== undefined) {
            router.push(MEETING_ROUTE(meeting.id))
        }
    }

    const isFormActive = name !== "" && date !== "" && audio !== undefined

    useEffect(() => {
        if (isActivated) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <>
            <PopUpProvider isActivated={isActivated} setIsActivated={setIsActivated}>
                <PopUp>
                    <div className="flex justify-end w-full  px-4">
                        <div className={`${styles.closeBtn} hover:cursor-pointer text-2xl`} onClick={() => setIsActivated(!isActivated)}>&times;</div>
                    </div>
                    <h2 className="text-2xl mb-10">ADD A NEW MEETING</h2>
                    <Image
                        className='mb-5'
                        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3ZuOTF5bWN4Z2w5N3ducGluNDA1djU3YmNpb3dpM2lubDR4dWQzbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FlWgXEtj5aM5G/giphy.gif"
                        alt="fire room with a dog saying its fine"
                        width={400}
                        height={400}
                    />
                    <form
                        onSubmit={addMeetingHandler}
                        className="flex flex-col gap-y-6 ">
                        <div className="flex flex-col">
                            <label htmlFor="meetingName" className="text-lg">Name</label>
                            <Input
                                maxLength={600}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="border-2 border-white rounded-lg p-2 text-white"
                                id="meetingName"
                                type="text" placeholder="Meeting Name" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date" className="text-lg">Date</label>
                            <Input
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                className="border-2 border-white rounded-lg p-2 text-white"
                                id="date"
                                css={inputStyles}
                                type="datetime-local" 
                                />
                        </div>
                        <div className="flex flex-col text-white">
                            <label htmlFor="file" className="text-lg">Mp3 File</label>
                            <Input
                                onChange={(event) => setAudio(event.target.files?.[0])}
                                className="border-2 border-white rounded-lg pt-1 text-white"
                                id="file"
                                accept=".mp3"
                                type="file" placeholder="mp3 File" />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                variant="solid"
                                className="rounded-lg mt-5"
                                isDisabled={!isFormActive}
                                isLoading={loading}
                            >Add meeting</Button>
                            {
                                (error !== null && error !== undefined) && 
                                <p className="mt-2">Error to creating the meeting: {error.message}</p>
                            }
                        </div>
                    </form>
                </PopUp>
            </PopUpProvider>
        </>
    )
}






