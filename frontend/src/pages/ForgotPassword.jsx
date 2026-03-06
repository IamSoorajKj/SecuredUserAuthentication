import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setError("")
        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/forgot-password`, {
                email
            });
            if (res.data.success) {
                navigate(`/verify-otp/${email}`)
                toast.success(res.data.message)
                setEmail("")
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to initiate recovery sequence.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 px-4'>

            <div className='w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10'>
                <div className='text-center space-y-3'>
                    <h1 className='text-4xl font-heading font-bold tracking-tight text-white mb-2'>
                        Reset Password
                    </h1>
                    <p className='text-white/60 text-lg'>Enter your email to receive reset instructions</p>
                </div>

                <Card className='glass-card border-white/10 overflow-hidden relative'>
                    {/* Subtle top highlight */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <CardHeader className='space-y-1 text-center pb-8 pt-8 relative z-10'>
                        <CardTitle className='text-2xl font-heading font-semibold text-white tracking-wide'>Forgot Password</CardTitle>
                        <CardDescription className="text-white/50">
                            {
                                isSubmitted ? "Check your email for reset instructions"
                                    : "Enter your email address to receive a password reset link"
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4 px-8 relative z-10'>
                        {error && (
                            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive animate-in fade-in zoom-in duration-300">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {
                            isSubmitted ? (
                                <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>
                                    <div className='bg-primary/20 rounded-full p-4 shadow-[0_0_30px] shadow-primary/30'>
                                        <CheckCircle className='h-8 w-8 text-primary' />
                                    </div>
                                    <div className='space-y-3'>
                                        <h3 className='font-heading font-medium text-xl text-white'>Email Sent</h3>
                                        <p className='text-white/60 text-sm'>We've sent a password reset link to <br /><span className='font-medium text-white'>{email}</span></p>
                                        <p className='text-xs text-white/40 pt-4'>
                                            Didn't receive it?{" "}
                                            <button
                                                className='text-primary hover:text-primary/80 hover:underline font-medium transition-colors'
                                                onClick={() => setIsSubmitted(false)}>
                                                Try again
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleForgotPassword} className='space-y-6'>
                                    <div className='space-y-2.5'>
                                        <Label htmlFor="email" className="text-white/80 font-medium">Email Address</Label>
                                        <Input
                                            id="email"
                                            type='email'
                                            placeholder="Enter Your Email ID"
                                            className="glass-input h-12 text-base px-4 rounded-xl"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-12 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-[0_0_20px_#ffffff33] hover:shadow-[0_0_30px_#ffffff66] transition-all hover:scale-[1.02] rounded-xl" disabled={isLoading}>
                                        {
                                            isLoading ? (
                                                <>
                                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                                    Sending Link...
                                                </>
                                            ) : ("Send Reset Link")
                                        }
                                    </Button>
                                </form>
                            )
                        }
                    </CardContent>
                    <CardFooter className='flex justify-center pb-8 pt-4 relative z-10'>
                        <p className="text-sm text-white/50">
                            Remember your password?{" "}
                            <Link to={'/login'} className='text-primary hover:text-primary/80 hover:underline font-medium transition-colors'>Sign In</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default ForgotPassword
