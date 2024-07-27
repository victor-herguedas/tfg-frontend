'use client'
import { useGetMeetingRepository } from "@/adapters/repositorys/meetingsRepository"
import { Meeting, SummaryState } from "@/domain/models/Meeting"
import { getRelativeDateService } from "@/utilities/relativeDateService"
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import MeetingInfo from "./components/MeetingInfo"
import Chat from "./components/ChatComponent"
import ImageWithLoader from "@/components/ImageWithLoader"
import { Skeleton, Spinner, Stack } from "@chakra-ui/react"

interface Props {
    params: {
        id: string
    }
}

export default function MeetingPage({ params }: Props) {
    const { id } = params
    const { meeting, loading, error, fetchMeeting } = useGetMeetingRepository({ id })
    const [localMeeting, setLocalMeeting] = useState<Meeting | null>(null)

    useEffect(() => {
        fetchMeeting()
    }, [])

    useEffect(() => {
        if (meeting !== null) {
            setLocalMeeting(meeting)
        }
    }, [meeting])

    if (localMeeting !== null) {
        return meetingLoaded(localMeeting, setLocalMeeting)
    }
}

const meetingLoaded = (meeting: Meeting, setMeeting: (meeting: Meeting) => void) => {
    return (
        <div className="text-white flex flex-col justify-center items-center w-full mt-6">
            <div className="w-3/4 sm:w-3/4 lg:w-3/5 xl:w-3/6">
                <h1 className="text-5xl text-primary-200">{meeting.name}</h1>
                <p className="text-sm mt-1">{getRelativeDateService(new Date(meeting.meetingDate))}</p>
                <div className="mt-6">
                    {
                        meeting.summaryState === SummaryState.COMPLETED ?
                            <p >{meeting.summary}</p> :
                            <Stack>
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                            </Stack>
                    }
                </div>
                <div className="flex justify-center mt-4">
                    {
                        meeting.imageState === "COMPLETED" ?
                            <ImageWithLoader
                                imageUrl={meeting.imageUrl}
                                imageWidth={10000}
                                imageHeight={500}
                                alt={meeting.summary ?? "Loading..."}
                            /> :
                            <div className="flex justify-center items-center w-full h-64">
                                <Spinner
                                    thickness="4px"
                                    speed="0.65s"
                                    emptyColor="gray.200"
                                    color="blue.500"
                                    size="xl"
                                    className="absolute"
                                />
                            </div>
                    }
                </div>
                <div className="w-full mt-4">
                    <MeetingInfo meeting={meeting} setMeeting={setMeeting} />
                </div>
            </div>
            <Chat meetingId={meeting.id} />
        </div>
    )
}