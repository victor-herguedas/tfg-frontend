'use client'

import { NEXT_PUBLIC_API_URL } from "@/utilities/environment"

interface Props {
    name: string,
    email: string,
    password: string,
    registerCode: string
}

export const registerService = async ({ name, email, password, registerCode }: Props) => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name, email, password, registerCode})
        })

        if (response.ok) {
            const jwt = response.headers.get('Authorization') as string
            console.log("JWT" + jwt)
        } else {
            const responseData = await response.json()
            if (responseData.message) throw new Error(responseData.message)
            else throw new Error('register failed')
            
        }

    } catch (error) {
        throw error
    }
}