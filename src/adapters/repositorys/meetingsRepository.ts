'use client'
import { useCallback, useEffect, useState } from "react"
// import { getMeetingSummarizedEntity } from "../entitys/meetingEntity"
import { NEXT_PUBLIC_API_URL } from "@/utilities/environment"
import { Meeting } from "@/domain/models/Meeting"

interface Props {
    name: string
}

export const useGetMeetingsRepository = ({ name }: Props) => {
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)
    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings${name !== "" ? "?name="+name : ""} `,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                )
                const meetingsEntitys = await response.json()
                if (response.status !== 200) {
                    throw new Error(meetingsEntitys.message)
                }
                setMeetings(meetingsEntitys as Meeting[])
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMeetings()
    }, [name])

    return { meetings, loading, error }
}

interface useGetMeetingRepositoryProps {
    id: string
}

export const useGetMeetingRepository = ({ id }: useGetMeetingRepositoryProps) => {
    const [meeting, setMeeting] = useState<Meeting | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>(null)

    const fetchMeeting = useCallback(async () => {
        try {
            setLoading(true)
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            )
            const meetingsEntitys = await response.json()
            setMeeting(meetingsEntitys as Meeting)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [id])

    return { meeting, loading, error, fetchMeeting }
}

export const useAddMeetingsRepository = () => {
    const [meeting, setMeeting] = useState<Meeting | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    interface Props {
        name: string
        date: Date
        audio: Blob
    }

    const sendRequest = useCallback(async ({ name, date, audio }: Props) => {
        const formatedDate = date.toISOString().split("T")[0]
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("date", formatedDate)
            formData.append("audio", audio)

            setLoading(true)
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/`,
                {
                    method: "POST",
                    headers: {
                        contentType: "multipart/form-data",
                    },
                    credentials: "include",
                    body: formData,
                }
            )
            const meetingsEntity = await response.json()

            if (response.status !== 200) {
                throw new Error(meetingsEntity.message)
            }
            setMeeting(meetingsEntity as Meeting)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return { meeting, loading, error, sendRequest }
}


export const useGenerateMeetingsSummaryRepository = () => {
    const [meeting, setMeeting] = useState<Meeting | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    interface Props {
        name: string
        date: Date
        audio: Blob
    }

    const sendRequest = useCallback(async ({ name, date, audio }: Props) => {
        const formatedDate = date.toISOString().split("T")[0]
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("date", formatedDate)
            formData.append("audio", audio)

            setLoading(true)
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/`,
                {
                    method: "POST",
                    headers: {
                        contentType: "multipart/form-data",
                    },
                    credentials: "include",
                    body: formData,
                }
            )
            const meetingsEntity = await response.json()
            setMeeting(meetingsEntity as Meeting)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return { meeting, loading, error, sendRequest }
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