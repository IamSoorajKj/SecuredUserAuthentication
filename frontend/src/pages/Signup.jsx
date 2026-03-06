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
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(`https://secureduserauthentication.onrender.com/user/register`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='relative w-full min-h-screen flex items-center justify-center overflow-x-hidden pt-6 md:pt-24 pb-8 px-4'>

            <div className='w-full max-w-lg space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10'>
                <div className='text-center space-y-1 pb-2'>
                    <h1 className='text-2xl md:text-4xl font-heading font-bold tracking-tight text-white'>
                        Sign Up
                    </h1>
                    <p className='text-white/60 text-base md:text-lg'>Create your account to get started</p>
                </div>

                <Card className="glass-card border-white/10 overflow-hidden relative">
                    {/* Subtle top highlight */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                    <form onSubmit={handleSubmit} className="relative z-10">
                        <CardHeader className='space-y-1 text-center pb-3 pt-3'>
                            <CardTitle className='text-lg md:text-2xl font-heading font-semibold text-white tracking-wide'>Create Account</CardTitle>
                            <CardDescription className="text-white/40 text-xs md:text-sm">
                                Enter your details to get started
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 px-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-white/80 font-medium">Full Name</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        className="glass-input h-12 text-base px-4 rounded-xl"
                                        value={formData.username}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter Your Username"
                                        required
                                    />
                                </div>
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
                                    <Label htmlFor="password" className="text-white/80 font-medium">Password</Label>
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
                        <CardFooter className="flex-col gap-3 pt-1 pb-5 px-8">
                            <Button type="submit" className="w-full h-11 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-[0_0_20px_#ffffff33] hover:shadow-[0_0_30px_#ffffff66] transition-all hover:scale-[1.02] rounded-xl" disabled={isLoading}>
                                {
                                    isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                                            Creating account...
                                        </>
                                    ) : "Sign Up"
                                }
                            </Button>

                            <p className="mt-4 text-center text-sm text-white/50">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors">
                                    Login
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Signup
