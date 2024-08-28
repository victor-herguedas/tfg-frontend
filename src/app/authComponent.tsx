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

    useEffect(() => {
        if (!whiteList.includes(pathname)) {
            redirectIfNotAuthenticated()
        }
    }, [isAuthenticated, pathname]) 

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

            if (response.ok) {
                setLoading(false)
                setIsAuthenticated(true)
            } else {
                setLoading(false)
                setIsAuthenticated(false)
            }
        } catch (error) {
            setLoading(false)
            setIsAuthenticated(false)
        }
    }

    const redirectIfNotAuthenticated = () => {
        if (!isAuthenticated) {
            router.push('/auth/login')
        }
    }

    if (isAuthenticated == true || whiteList.includes(pathname)) {
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