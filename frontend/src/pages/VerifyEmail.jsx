import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import React from 'react'

const VerifyEmail = () => {
  return (
    <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 px-4'>

      <div className='w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10'>
        <Card className="glass-card border-white/10 overflow-hidden relative">
          {/* Subtle top highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <CardHeader className="flex flex-col items-center text-center space-y-4 pb-2 pt-8 relative z-10">
            <div className='bg-primary/20 rounded-full p-4 shadow-[0_0_30px] shadow-primary/30'>
              <CheckCircle className='h-10 w-10 text-primary' />
            </div>
            <CardTitle className='text-3xl font-heading font-semibold tracking-wide text-white'>Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-white/50 pb-10 px-8 relative z-10 mt-2">
            <p className="text-lg leading-relaxed">
              We've sent a verification link to your inbox. Please click the link to verify your account.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default VerifyEmail
