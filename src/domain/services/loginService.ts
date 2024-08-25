'use client'

import { NEXT_PUBLIC_API_URL } from "@/utilities/environment"

interface Props {
    email: string,
    password: string
}

export const loginService = async ({ email, password }: Props) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        })

        if (response.ok) {
            const jwt = response.headers.get('Authorization') as string
            console.log("JWT" + jwt)
        } else {
            const responseData = await response.json()
            if (responseData.message) throw new Error(responseData.message)
            else throw new Error('login failed')
        }

    } catch (error) {
        throw error
    }
}