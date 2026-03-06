import { getData } from '@/context/userContext'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthSuccess = () => {
    const { setUser } = getData()
    const navigate = useNavigate()
    useEffect(() => {

        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            const accessToken = params.get("token")

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const res = await axios.get(`https://secureduserauthentication.onrender.com/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    if (res.data.success) {
                        setUser(res.data.user)  //save user in context api store
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Error fetching user:", error)
                }
            }
        }
        handleAuth()
    }, [navigate])
    return (
        <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden'>

            <div className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <h2 className="text-xl font-medium text-foreground">
                    Logging you in...
                </h2>
                <p className="text-sm text-muted-foreground">Please wait a moment.</p>
            </div>
        </div>
    )
}

export default AuthSuccess
