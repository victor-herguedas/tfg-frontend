import { AuthContext } from "@/app/authComponent"
import React from "react"


export const useAuth = () => {
     const authContext = React.useContext(AuthContext)
     if (authContext == undefined) {
         throw new Error('useAuth must be used within an AuthProvider')
     }
     const { isAuthenticated, setIsAuthenticated } = authContext
     return { isAuthenticated, setIsAuthenticated }
}