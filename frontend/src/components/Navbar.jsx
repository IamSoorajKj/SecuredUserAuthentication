import { LogOut, User, Menu, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
    const { user, setUser } = getData()
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`https://secureduserauthentication.onrender.com/user/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                localStorage.clear()
                setUser(null)
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            // logout failed silently
        }
    }

    return (
        <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className={`glass rounded-full px-6 py-3 flex justify-between items-center transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border-white/10 ${scrolled ? 'bg-black/40 backdrop-blur-2xl' : 'bg-black/20 backdrop-blur-md'}`}>
                    {/* logo section  */}
                    <Link to="/" className='flex gap-2 items-center group'>
                        <h1 className='font-heading font-bold text-xl tracking-tight text-white'>
                            <span className='gradient-text'>SecureAuth</span>
                        </h1>
                    </Link>

                    <div className='flex gap-6 items-center'>
                        <ul className='hidden md:flex gap-8 items-center font-medium text-sm text-white/70'>
                            <li className='hover:text-white hover:text-glow transition-all duration-300 cursor-pointer'>Features</li>
                            <li className='hover:text-white hover:text-glow transition-all duration-300 cursor-pointer'>Solutions</li>
                            <li className='hover:text-white hover:text-glow transition-all duration-300 cursor-pointer'>Pricing</li>
                        </ul>

                        {user ? (
                            <div className="hidden md:block">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="outline-none">
                                        <Avatar className="ring-2 ring-white/10 hover:ring-primary transition-all duration-300 shadow-lg cursor-pointer">
                                            <AvatarImage src={user?.avatar} referrerPolicy="no-referrer" />
                                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-heading">
                                                {user?.username ? user.username[0].toUpperCase() : "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="glass-card min-w-[16rem] max-w-[24rem] p-2 border-white/10 bg-black/60 backdrop-blur-3xl">
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none text-white truncate">{user.username}</p>
                                                <p className="text-xs leading-tight text-white/50 break-all">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem asChild className="cursor-pointer text-white/80 focus:bg-white/10 focus:text-white rounded-md transition-colors">
                                            <Link to="/">
                                                <User className="mr-2 h-4 w-4" />Profile
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive rounded-md transition-colors"><LogOut className="mr-2 h-4 w-4" />Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className="hidden md:flex gap-4 items-center">
                                <Link to={'/login'} className='text-sm font-medium text-white/70 hover:text-white hover:text-glow transition-all duration-300'>
                                    Sign In
                                </Link>
                                <Link to={'/signup'} className='text-sm bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-white/90 transition-all shadow-[0_0_20px_#ffffff4d] hover:shadow-[0_0_25px_#ffffff80] hover:scale-105'>
                                    Get Started
                                </Link>
                            </div>
                        )}
                        {user && (
                            <div className="md:hidden flex items-center mr-1">
                                <Avatar className="h-8 w-8 ring-2 ring-white/10 shadow-lg cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                    <AvatarImage src={user?.avatar} referrerPolicy="no-referrer" />
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-heading text-xs">
                                        {user?.username ? user.username[0].toUpperCase() : "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                        {!user && (
                            <button
                                className="md:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full inset-x-4 mt-2 animate-in slide-in-from-top-4 duration-300">
                        <div className="bg-[#12141a] rounded-3xl p-6 shadow-2xl border border-white/10 flex flex-col gap-4">
                            <ul className="flex flex-col gap-4 text-white/70 font-medium">
                                <li className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">Features</li>
                                <li className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">Solutions</li>
                                <li className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">Pricing</li>

                                <div className="h-px bg-white/10 my-2"></div>

                                {user ? (
                                    <>
                                        {/* User Info Header */}
                                        <div className="px-4 py-2 flex items-center gap-3 bg-white/5 rounded-2xl mb-2">
                                            <Avatar className="h-10 w-10 ring-2 ring-white/10 shadow-lg">
                                                <AvatarImage src={user?.avatar} referrerPolicy="no-referrer" className="animate-in fade-in duration-500" />
                                                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-heading">
                                                    {user?.username ? user.username[0].toUpperCase() : "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col min-w-0">
                                                <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                                                <p className="text-xs text-white/50 truncate">{user.email}</p>
                                            </div>
                                        </div>

                                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2">
                                            <User className="w-4 h-4" /> Profile
                                        </Link>
                                        <button onClick={() => { logoutHandler(); setIsMobileMenuOpen(false); }} className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors flex items-center gap-2 text-destructive text-left">
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors">
                                            Sign In
                                        </Link>
                                        <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 hover:bg-white/5 rounded-xl transition-colors">
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
