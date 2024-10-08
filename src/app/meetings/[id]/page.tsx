'use client'
import { useGetMeetingRepository } from "@/adapters/repositorys/meetingsRepository"
import { Meeting, SummaryState } from "@/domain/models/Meeting"
import { getRelativeDateService } from "@/utilities/relativeDateService"
import { useEffect, useState } from "react"
import MeetingInfo from "./components/MeetingInfo"
import Chat from "./components/ChatComponent"
import ImageWithLoader from "@/components/ImageWithLoader"
import { Skeleton, Spinner, Stack } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useRouter } from "next/navigation"

interface Props {
    params: {
        id: string
    }
}

export default function MeetingPage({ params }: Props) {
    const router = useRouter()

    const goHome = () => {
        router.push("/meetings")
    }
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

    if (localMeeting !== null && localMeeting !== undefined) {
        return (
            <div>
                <ArrowBackIcon color="white" width="10" height="10" className="fixed top-0 left-0 mt-4 ml-4 text-white cursor-pointer" onClick={goHome}></ArrowBackIcon>
                <MeetingLoaded meeting={localMeeting} setMeeting={setLocalMeeting} />
            </div>
        )
    }
}

interface MeetingLoadedProps {
    meeting: Meeting
    setMeeting: (meeting: Meeting) => void
}

const MeetingLoaded = ({meeting, setMeeting}: MeetingLoadedProps) => {
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