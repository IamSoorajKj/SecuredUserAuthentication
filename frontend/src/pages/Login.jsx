import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getData } from '@/context/userContext'
import Google from "../assets/googleLogo.png"

const Login = () => {
    const { setUser } = getData()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        if (error) setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/login`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                navigate('/')
                setUser(res.data.user)
                localStorage.setItem("accessToken", res.data.accessToken)
                toast.success(res.data.message)
            }
        } catch (error) {
            setError(error.response?.data?.message || "Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='relative w-full min-h-screen flex items-center justify-center overflow-x-hidden pt-16 md:pt-24 pb-8 px-4'>

            <div className='w-full max-w-lg space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10'>
                <div className='text-center space-y-1'>
                    <h1 className='text-3xl md:text-4xl font-heading font-bold tracking-tight text-white'>
                        Welcome Back
                    </h1>
                    <p className='text-white/60 text-lg'>Sign in to your account</p>
                </div>

                <Card className="glass-card border-white/10 overflow-hidden relative">
                    {/* Subtle top highlight */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <form onSubmit={handleSubmit} className="relative z-10">
                        <CardHeader className='space-y-1 text-center pb-4 pt-4'>
                            <CardTitle className='text-xl md:text-2xl font-heading font-semibold text-white tracking-wide'>Sign In</CardTitle>
                            <CardDescription className="text-white/50">
                                Enter your email and password to login
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 px-8">
                            {error && (
                                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive animate-in fade-in zoom-in duration-300 py-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white/80 font-medium">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        className="glass-input h-12 text-base px-4 rounded-xl"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Your Email Id"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className='flex items-center justify-between'>
                                        <Label htmlFor="password" className="text-white/80 font-medium">Password</Label>
                                        <Link className='text-sm text-primary/80 hover:underline hover:text-primary transition-colors' to={'/forgot-password'}>Forgot password?</Link>
                                    </div>
                                    <div className='relative'>
                                        <Input
                                            id="password"
                                            name="password"
                                            className="glass-input h-12 pr-12 text-base px-4 rounded-xl"
                                            placeholder="Enter Your Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            type={showPassword ? "text" : "password"}
                                            required
                                        />
                                        <Button
                                            type="button"
                                            variant='ghost'
                                            size="sm"
                                            className='absolute right-1 top-1 h-10 w-10 p-0 hover:bg-white/10 text-white/40 hover:text-white rounded-lg transition-colors'
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-4 pt-2 pb-6 px-8">
                            <Button type="submit" className="w-full h-11 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-[0_0_20px_#ffffff33] hover:shadow-[0_0_30px_#ffffff66] transition-all hover:scale-[1.02] rounded-xl" disabled={isLoading}>
                                {
                                    isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                            Signing in...
                                        </>
                                    ) : "Sign In"
                                }
                            </Button>

                            <div className="relative w-full py-1">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase font-medium tracking-widest">
                                    <span className="bg-background/80 px-4 text-white/40 backdrop-blur-md rounded-full">Or</span>
                                </div>
                            </div>

                            <Button type="button" onClick={() => window.open("http://localhost:8000/auth/google", "_self")} className='w-full h-11 glass hover:bg-white/5 transition-all text-white border-white/10 rounded-xl font-medium' variant='outline'>
                                <img src={Google} className='w-5 h-5 mr-3 brightness-110' alt="Google" />
                                Continue with Google
                            </Button>

                            <p className="mt-4 text-center text-sm text-white/50">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Login
