
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ChangePassword = () => {
    const { email } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleChangePassword = async () => {
        setError("")
        setSuccess("")

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/change-password/${email}`, {
                newPassword,
                confirmPassword
            })

            setSuccess(res.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-24 pb-8 px-4'>

            <div className='w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700'>
                <Card className="glass-card border-none">
                    <CardHeader className="text-center pb-6 pt-6">
                        <CardTitle className='text-xl md:text-2xl font-heading font-semibold tracking-wide text-white'>New Password</CardTitle>
                        <CardDescription className="text-white/50">
                            Set a new security credential for <span className='font-semibold text-primary'>{email}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {error && <p className='text-destructive text-sm text-center bg-destructive/10 py-2 rounded-md'>{error}</p>}
                        {success && <p className='text-green-500 text-sm text-center bg-green-500/10 py-2 rounded-md'>{success}</p>}

                        <div className='space-y-4'>
                            <Input
                                type="password"
                                placeholder="New Password"
                                className="glass-input h-11"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={isLoading || success}
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                className="glass-input h-11"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading || success}
                            />
                            <Button
                                className='w-full h-11 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]'
                                disabled={isLoading || success}
                                onClick={handleChangePassword}
                            >
                                {
                                    isLoading ? <><Loader2 className='mr-2 w-4 h-4 animate-spin' />Changing...</> : "Change Password"
                                }
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default ChangePassword
