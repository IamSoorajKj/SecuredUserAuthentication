import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { CheckCircle, Loader2, RotateCcw } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([])
  const { email } = useParams()
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    // Take only the last character if multiple are entered/pasted
    const char = value.slice(-1)
    if (!/^\d*$/.test(char)) return

    const updatedOtp = [...otp]
    updatedOtp[index] = char
    setOtp(updatedOtp)

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const data = e.clipboardData.getData('text').slice(0, 6).split('')
    const updatedOtp = [...otp]
    data.forEach((char, i) => {
      if (/^\d$/.test(char)) {
        updatedOtp[i] = char
      }
    })
    setOtp(updatedOtp)
    const nextIndex = Math.min(data.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerify = async () => {
    const finalOtp = otp.join("")
    if (finalOtp.length !== 6) {
      setError("Incomplete verification sequence")
      return
    }

    // Clear any previous messages before verifying
    setError("")
    setSuccessMessage("")

    try {
      setIsLoading(true)
      const res = await axios.post(`https://secureduserauthentication.onrender.com/user/verify-otp/${email}`, {
        otp: finalOtp,
      })
      setSuccessMessage("OTP Verified")
      setIsVerified(true)
      setTimeout(() => {
        navigate(`/change-password/${email}`)
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Sequence Failed")
    } finally {
      setIsLoading(false)
    }
  }

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""])
    setError("")
    setSuccessMessage("")
    inputRefs.current[0]?.focus()
  }

  return (
    <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 px-4'>

      <div className='w-full max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10'>
        <div className='text-center space-y-3'>
          <h1 className='text-4xl font-heading font-bold tracking-tight text-white mb-2'>
            Verify Your Email
          </h1>
          <p className='text-white/60 text-lg'>We've routed a 6-digit access code to{" "}
            <span className="font-semibold text-white">{email || "your uplink"}</span>
          </p>
        </div>

        <Card className='glass-card border-white/10 overflow-hidden relative'>
          {/* Subtle top highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <CardHeader className='space-y-1 text-center pb-8 pt-8 relative z-10'>
            <CardTitle className='text-2xl font-heading font-semibold tracking-wide text-white'>Enter OTP</CardTitle>
            <CardDescription className="text-white/50">
              {
                isVerified
                  ? "Code verified successfully! Redirecting..."
                  :
                  "Enter the 6-digit code sent to your email"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6 px-8 relative z-10'>
            {
              error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive animate-in fade-in zoom-in duration-300">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )
            }
            {successMessage && <p className='text-[#4ade80] text-sm mb-3 text-center bg-[#4ade80]/10 py-3 rounded-xl border border-[#4ade80]/20 font-medium'>{successMessage}</p>}
            {
              isVerified ? (
                <div className='py-6 flex flex-col items-center justify-center text-center space-y-4'>
                  <div className='bg-primary/20 rounded-full p-4 shadow-[0_0_30px] shadow-primary/30'>
                    <CheckCircle className='h-8 w-8 text-primary' />
                  </div>
                  <div className='space-y-2'>
                    <h3 className='font-heading font-medium text-xl text-white'>Verification Successful</h3>
                    <p className='text-white/60'>Your email has been verified. You'll be redirected shortly.</p>
                  </div>
                  <div className='flex items-center space-x-3 text-white/80 pt-4'>
                    <Loader2 className='h-5 w-5 animate-spin' />
                    <span className='text-sm font-medium'>Redirecting...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* OTP Input */}
                  <div className='flex justify-between gap-3 mb-6'>
                    {
                      otp.map((digit, index) => (
                        <Input
                          key={index}
                          type="text"
                          inputMode="numeric"
                          value={otp[index]}
                          onChange={(e) => handleChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          maxLength={1}
                          ref={(el) => (inputRefs.current[index] = el)}
                          disabled={isVerified}
                          className="w-14 h-16 text-center text-2xl font-heading font-bold glass-input rounded-xl focus:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      ))
                    }
                  </div>
                  {/* Action Buttons */}
                  <div className='space-y-4'>
                    <Button
                      onClick={handleVerify}
                      disabled={isLoading || otp.some((digit) => digit === "")}
                      className='w-full h-12 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-[0_0_20px_#ffffff33] hover:shadow-[0_0_30px_#ffffff66] transition-all hover:scale-[1.02] rounded-xl'>
                      {isLoading ? <><Loader2 className='mr-2 h-5 w-5 animate-spin' />Verifying...</> : "Verify Code"}
                    </Button>
                    <Button variant='ghost'
                      onClick={clearOtp}
                      className='w-full h-12 glass hover:bg-white/10 text-white/70 hover:text-white transition-all rounded-xl border-white/5 font-medium'
                      disabled={isLoading || isVerified}
                    >
                      <RotateCcw className='mr-2 h-4 w-4' />
                      Clear Input
                    </Button>
                  </div>
                </>
              )
            }
          </CardContent>
          <CardFooter className='flex justify-center pb-8 pt-4 relative z-10'>
            <p className='text-sm text-white/50'>
              Wrong email?{" "}
              <Link to={'/forgot-password'} className='text-primary hover:text-primary/80 hover:underline font-medium transition-colors'>Go back</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default VerifyOTP
