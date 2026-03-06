import { ArrowRight, Zap, CheckCircle2, Sparkles } from 'lucide-react'
import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/userContext'

const Home = () => {
  const { user } = getData()
  const navigate = useNavigate()

  return (
    <div key={user ? 'logged-in' : 'logged-out'} className="relative w-full overflow-x-hidden min-h-screen flex items-center justify-center pt-20 md:pt-32 pb-10">
      <section className="w-full z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            {user && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Badge variant="outline" className="px-5 py-2 border-white/10 bg-white/5 text-white/90 backdrop-blur-md rounded-full shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2 text-primary animate-pulse" />
                  Welcome back, {user.username} 👋
                </Badge>
              </div>
            )}

            <div className="space-y-6 max-w-4xl flex flex-col items-center">
              {!user && (
                <Badge variant="secondary" className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 backdrop-blur-md rounded-full animate-in zoom-in duration-1000 shadow-[0_0_20px] shadow-primary/30">
                  <Zap className="w-3.5 h-3.5 mr-1.5 fill-primary" />
                  <span className="font-medium tracking-wide text-xs uppercase">Welcome to SecureAuth</span>
                </Badge>
              )}

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-in slide-in-from-bottom-8 duration-1000 delay-100 leading-[1.1]">
                Your workflow, <br className="hidden md:block" />
                orchestrated <span className="relative inline-block">
                  <span className="gradient-text font-extrabold pb-2">beautifully</span>
                  <div className="absolute w-full h-4 -bottom-2 left-0 bg-primary/20 blur-xl"></div>
                </span>
              </h1>

              <p className="mx-auto max-w-[600px] text-white/50 text-base md:text-lg font-light leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-200">
                Experience the next generation of productivity. Designed for modern teams who demand excellence, speed, and premium aesthetics.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto animate-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button onClick={() => navigate(user ? '/dashboard' : '/signup')} size="lg" className="h-12 px-8 text-base rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_30px_#ffffff66] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] font-medium">
                {user ? 'Go to Dashboard' : 'Get Started'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-white/40 animate-in fade-in duration-1000 delay-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Enterprise grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>14-day premium trial</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
