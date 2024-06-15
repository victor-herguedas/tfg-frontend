'use client'
import { MeetingSummarized } from "@/domain/models/MeetingSumarized"
import { useEffect, useState } from "react"
// import { getMeetingSummarizedEntity } from "../entitys/meetingEntity"
import { NEXT_PUBLIC_API_URL } from "@/utilities/environment"

export const useMeetingsRepository = () => {
    const [meetingsSumarized, setMeetings] = useState<MeetingSummarized[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)

    console.log(NEXT_PUBLIC_API_URL)

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                )
                const meetingsEntitys = await response.json()
                setMeetings(meetingsEntitys as MeetingSummarized[])
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMeetings()
    }, [])

    return { meetingsSumarized, loading, error }
}

// const meetingsSummarizedEnityToMeetingsSummarized = (meetingEnitys: any): MeetingSummarized[] => {
//     const meetingsSummarized = meetingEnitys.map((meeting: any) => {
//         return meetingSummarizedEnityToMeetingSummarized(meeting)
//     }
//     )
//     return meetingsSummarized
// }

// const meetingSummarizedEnityToMeetingSummarized = (meetingSummarizedEntity: any): MeetingSummarized => {
//     const meetingSummarizedEnity = getMeetingSummarizedEntity(meetingSummarizedEntity)

//     return new MeetingSummarized(
//         meetingSummarizedEntity.id,
//         new Date(meetingSummarizedEntity.createdAt),
//         new Date(meetingSummarizedEntity.meetingDate),
//         meetingSummarizedEntity.name,
//         meetingSummarizedEntity.transcriptionState,
//     )
// }