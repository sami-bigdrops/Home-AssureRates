'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'
import { track } from '@vercel/analytics/react'

const Hero = () => {
  const [zipCode, setZipCode] = useState('')
  const [cityName, setCityName] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [state, setState] = useState('')

  // Function to fetch user location using server-side IP detection (same as LeadProsper)
  const fetchUserLocation = useCallback(async () => {
    try {
      setIsLoadingLocation(true)
      // Use our API route that uses the same IP detection method as LeadProsper
      const response = await fetch('/api/get-location', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data.city && data.zipCode) {
        setCityName(data.city)
        setZipCode(data.zipCode)
        setState(data.state)
      } else {
        // Keep empty if location not available
        setCityName('')
        setZipCode('')
        setState('')
      }
    } catch {
      // Keep empty on error
      setCityName('')
      setZipCode('')
      setState('')
    } finally {
      setIsLoadingLocation(false)
    }
  }, [])

  // Fetch location after initial render to avoid blocking FCP
  useEffect(() => {
    // Use requestIdleCallback for better performance, fallback to setTimeout
    const scheduleLocationFetch = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => fetchUserLocation(), { timeout: 2000 })
      } else {
        setTimeout(() => fetchUserLocation(), 100)
      }
    }
    
    scheduleLocationFetch()
  }, [fetchUserLocation])

  // Function to get cookie value
  const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
  }

  // Function to handle redirect
  const handleContinue = () => {
    // Validate ZIP code is exactly 5 digits
    if (!/^\d{5}$/.test(zipCode)) {
      alert('Please enter a valid 5-digit ZIP code')
      return
    }

    // Get UTM parameters from cookies
    const utmSource = getCookie('utm_source') || ''
    const utmId = getCookie('utm_id') || ''
    const utmS1 = getCookie('utm_s1') || ''

    // Build the redirect URL
    const baseUrl = 'https://homequote.assurerates.com'
    const params = new URLSearchParams({
      zip_code: zipCode,
      referrer: 'homequotes.assurerates.com',
      tid: '3108'
    })

    // Map UTM parameters to affiliate tracking parameters
    if (utmSource) params.set('subid', utmSource)
    if (utmId) params.set('subid2', utmId)
    if (utmS1) params.set('c1', utmS1)

    const redirectUrl = `${baseUrl}/form?${params.toString()}`

    track('zip_submission', { state, zip_code: zipCode })
    
    // Redirect to the quote page
    window.location.href = redirectUrl
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue()
    }
  }

  return (
    <div className='w-full min-h-content sm:min-h-[800px] md:min-h-[500px] lg:min-h-[500px] xl:min-h-[400px] bg-gradient-to-b from-[#E8F4FC] to-[#FFFFFF] flex flex-col relative lg:py-20'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-12'>
          {/* Left Column - Content */}
          <div className='w-full md:max-w-xl xl:max-w-xl space-y-6 order-2 lg:order-1 md:mx-auto'>
            <div className='space-y-4'>
              <h1 className='text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[64px] font-[800] text-gray-800 leading-tight text-center lg:text-left'>
                Find the Best Home Insurance Rates{cityName ? (
                  <>
                    {' '}in <span className="text-[#3498DB]">{cityName}</span>
                  </>
                ) : ''}
              </h1>
              <p className='text-gray-700 text-[16px] sm:text-[18px] text-center lg:text-left'>
                Compare top providers in minutes and start saving today.
              </p>
            </div>
            
            <div className='flex flex-col sm:flex-row gap-3'>
              <div className='relative flex-1'>
                <MapPin className='absolute left-4 top-1/2 transform -translate-y-1/2 w-7 h-7 text-green-600' />
                <input
                  type='text'
                  placeholder={isLoadingLocation ? 'Detecting your location...' : 'Zip Code e.g. 11102'}
                  value={zipCode}
                  onChange={(e) => {
                    const value = e.target.value
                    if (/^\d{0,5}$/.test(value)) {
                      setZipCode(value)
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  disabled={isLoadingLocation}
                  className={`w-full pl-12 pr-4 py-4 text-gray-900 text-[18px] font-[600] rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#3498DB] focus:border-[#3498DB] transition-all duration-200 h-18 ${
                    isLoadingLocation ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
              <button 
                onClick={handleContinue}
                disabled={isLoadingLocation || !/^\d{5}$/.test(zipCode)}
                className={`w-full md:max-w-[200px] px-6 py-4 rounded-lg font-[600] transition-all duration-200 flex items-center justify-center gap-2 text-[18px] h-18 text-white whitespace-nowrap ${
                  isLoadingLocation || !/^\d{5}$/.test(zipCode)
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#3498DB] hover:bg-[#3476DB]'
                }`}
              >
                {isLoadingLocation ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </>
                ) : (
                  <div className='flex items-center justify-center gap-3'>
                    <span className='text-[18px] font-[600]'>Continue</span>
                  <ArrowRight className='w-6 h-6' />
                </div>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Illustration */}
          <div className='w-full lg:w-auto flex items-center justify-center order-1 lg:order-2'>
            <Image
              src='/home.svg'
              alt='Home Insurance Illustration'
              width={1000}
              height={1000}
              className='w-130 h-auto object-contain'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero