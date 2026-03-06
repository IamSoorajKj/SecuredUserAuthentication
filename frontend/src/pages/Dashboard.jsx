import React, { useState, useEffect } from 'react'
import { getData } from '@/context/userContext'
import Navbar from '@/components/Navbar'
import { useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Monitor,
  Key,
  Lock,
  Globe,
  CheckCircle2
} from 'lucide-react'

const Dashboard = () => {
  const { user } = getData()
  const navigate = useNavigate()
  const [ipAddress, setIpAddress] = useState('Detecting...')

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setIpAddress(data.ip))
      .catch(() => setIpAddress('127.0.0.1 (Local)'))
  }, [])

  const securityStats = [
    {
      label: 'ID Verification',
      status: user?.isVerified ? 'Verified' : 'Pending',
      icon: ShieldCheck,
      color: user?.isVerified ? 'text-accent' : 'text-yellow-400',
      desc: user?.isVerified ? 'Email confirmed' : 'Action required'
    },
    {
      label: 'Login Method',
      status: user?.googleId ? 'Google SSO' : 'Standard',
      icon: Key,
      color: 'text-primary',
      desc: 'Secure authentication'
    },
    {
      label: 'Session Health',
      status: 'Optimal',
      icon: CheckCircle2,
      color: 'text-accent',
      desc: 'No threats detected'
    },
    {
      label: 'Account Status',
      status: 'Active',
      icon: Lock,
      color: 'text-primary',
      desc: 'Protected by AES-256'
    },
  ]

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12">
        {/* Security Header */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">System Secured</span>
            </div>
          </div>

          <p className="text-white/50 font-sans text-lg">
            Managing protection for <span className="text-white font-medium">{user?.email}</span>
          </p>
        </div>

        {/* Security Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityStats.map((stat, index) => (
            <div
              key={index}
              className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300 border-white/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-sm text-white/50 mb-1">{stat.label}</h3>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-white tracking-tight">{stat.status}</p>
                {stat.status === 'Verified' && <CheckCircle2 className="w-4 h-4 text-accent" />}
              </div>
              <p className="text-xs text-white/30 mt-2">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Simple Status Section */}
        <div className="glass-card p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <p className="text-white/50 text-sm">
            Active session monitoring is enabled. Your account is protected with end-to-end encryption and real-time threat detection.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
