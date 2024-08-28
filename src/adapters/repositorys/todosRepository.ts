import { Todo } from "@/domain/models/Meeting";
import { NEXT_PUBLIC_API_URL } from "@/utilities/environment";
import { useRef, useState } from "react";

export const useUpdateTodos = () => {
    const [areSaved, setAreSaved] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    const timeOutRef = useRef<NodeJS.Timeout | null>(null)

    const saveTodos = async (todos: Todo[], meetingId: string) => {
        setLoading(true)
        setError(null)
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current)
        }
        timeOutRef.current = setTimeout(() => {
            fetchTodos(todos, meetingId)
        }, 2000)
    }

    const fetchTodos = async (todos: Todo[], meetingId: string) => {
        try {
            setAreSaved(false)
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/meetings/${meetingId}/todos`, {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({todos})
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.message)
            } else{
                setAreSaved(true)
            }

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An error occurred")
            }
        } finally {
            setLoading(false)
        }
    }

    return { saveTodos, areSaved, loading, error }
}