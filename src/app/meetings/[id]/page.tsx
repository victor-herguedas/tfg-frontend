'use client'
import { useGetMeetingRepository } from "@/adapters/repositorys/meetingsRepository"
import { Meeting } from "@/domain/models/Meeting"
import { getRelativeDateService } from "@/utilities/relativeDateService"
import Image from "next/image"
import { useEffect } from "react"
import MeetingInfo from "./components/MeetingInfo"
import Chat from "./components/ChatComponent"
import ImageWithLoader from "@/components/ImageWithLoader"

interface Props {
    params: {
        id: string
    }
}

export default function MeetingPage({ params }: Props) {
    const { id } = params
    const { meeting, loading, error, fetchMeeting } = useGetMeetingRepository({ id })

    useEffect(() => {
        fetchMeeting()
    }, [])

    if (meeting !== null) {
        return meetingLoaded(meeting)
    }
}

const meetingLoaded = (meeting: Meeting) => {
    return (
        <div className="text-white flex flex-col justify-center items-center w-full mt-6">
            <div className="w-3/4 sm:w-3/4 lg:w-3/5 xl:w-3/6">
                <h1 className="text-5xl text-primary-200">{meeting.name}</h1>
                <p className="text-sm">{getRelativeDateService(new Date(meeting.meetingDate))}</p>
                <p className="mt-6">{meeting.summary}</p>
                <div className="flex justify-center">
                <ImageWithLoader
                    imageUrl={meeting.imageUrl}
                    imageWidth={10000}
                    imageHeight={10000}
                    alt={meeting.summary ?? "Loading..."}
                />
                </div>
                <div className="w-full mt-6">
                    <MeetingInfo transcription={meeting.transcription} summary={meeting.summary} summaryState={meeting.summaryState} transcriptionState={meeting.transcriptionState} />
                </div>
            </div>
            <Chat name="El chat de victor el cual se fue con su madre el otro día y mola mucho" meetingId={meeting.id}/>
        </div>
    )
}