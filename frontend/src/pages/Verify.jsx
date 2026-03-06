import axios from 'axios'
import { CheckCircle, Loader2, XCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
    const { token } = useParams()
    const [status, setStatus] = useState("Verifying your email...")
    const [verificationState, setVerificationState] = useState('loading') // loading, success, error
    const navigate = useNavigate()

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(`http://localhost:8000/user/verify`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    setStatus("Email Verified Successfully")
                    setVerificationState('success')
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setStatus("Invalid or Expired Token")
                    setVerificationState('error')
                }
            } catch (error) {
                setStatus("Verification Failed. Please try again.")
                setVerificationState('error')

            }
        };

        verifyEmail()
    }, [token, navigate])
    return (
        <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 px-4'>

            <div className='glass-card p-8 rounded-xl shadow-xl text-center w-[90%] max-w-md animate-in fade-in zoom-in duration-500'>
                <div className="mb-6 flex justify-center">
                    {verificationState === 'loading' && (
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    )}
                    {verificationState === 'success' && (
                        <div className="bg-green-500/10 p-4 rounded-full animate-in zoom-in duration-300">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                    )}
                    {verificationState === 'error' && (
                        <div className="bg-destructive/10 p-4 rounded-full animate-in zoom-in duration-300">
                            <XCircle className="h-12 w-12 text-destructive" />
                        </div>
                    )}
                </div>

                <h2 className='text-2xl font-semibold text-foreground mb-3 tracking-tight'>{status}</h2>
                <p className="text-muted-foreground text-sm">
                    {verificationState === 'success'
                        ? "Redirecting you to the login session..."
                        : verificationState === 'loading'
                            ? "Please wait while we secure your verification."
                            : "Please request a new verification link."}
                </p>
            </div>
        </div>
    )
}

export default Verify
