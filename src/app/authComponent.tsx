'use client'
import { NEXT_PUBLIC_API_URL } from "@/utilities/environment"
import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface Props {
    children: React.ReactNode
}

interface AuthContext {
    isAuthenticated: boolean
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = React.createContext<undefined | AuthContext>(undefined)

export default function AuthComponent({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const whiteList = ['/auth/login', '/auth/register']

    useEffect(() => {
        if (!whiteList.includes(pathname)) {
            checkAuth()
        }
    }, [pathname])

    const checkAuth = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (!response.ok) {
                redirectToAuth()
            }
        } catch (error) {
            redirectToAuth()
        } finally {
            setLoading(false)
        }
    }

    const redirectToAuth = () => {
        router.push('/auth/login')
    }

    if (loading == false || whiteList.includes(pathname)) {
        return (
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
                {children}
            </AuthContext.Provider>
        )
    } else {
        return (
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
                <div>{pathname}</div>
            </AuthContext.Provider>
        )
    }

}