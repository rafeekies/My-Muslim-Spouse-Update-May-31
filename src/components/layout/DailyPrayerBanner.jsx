import React, { useState, useEffect } from 'react'
import { FaMosque, FaSun, FaMoon } from 'react-icons/fa'

const DailyPrayerBanner = () => {
  const [prayerTimes, setPrayerTimes] = useState({
    fajr: '05:12 AM',
    dhuhr: '12:30 PM',
    asr: '03:45 PM',
    maghrib: '06:58 PM',
    isha: '08:15 PM'
  })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isVisible, setIsVisible] = useState(true)
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    
    // Clean up interval on unmount
    return () => {
      clearInterval(timer)
    }
  }, [])
  
  // Format current time
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
  
  // Format current date
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  // Handle close banner
  const closeBanner = () => {
    setIsVisible(false)
  }
  
  if (!isVisible) {
    return null
  }
  
  return (
    <div className="bg-green-600 text-white py-2 px-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <FaMosque className="mr-2" />
          <span className="text-sm font-medium mr-6">Prayer Times</span>
          
          <div className="hidden sm:flex space-x-4">
            <div className="text-xs">
              <span className="font-semibold">Fajr:</span> {prayerTimes.fajr}
            </div>
            <div className="text-xs">
              <span className="font-semibold">Dhuhr:</span> {prayerTimes.dhuhr}
            </div>
            <div className="text-xs">
              <span className="font-semibold">Asr:</span> {prayerTimes.asr}
            </div>
            <div className="text-xs">
              <span className="font-semibold">Maghrib:</span> {prayerTimes.maghrib}
            </div>
            <div className="text-xs">
              <span className="font-semibold">Isha:</span> {prayerTimes.isha}
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <FaSun className="mr-1 text-yellow-300" />
            <span className="text-xs">{formattedTime}</span>
          </div>
          <div className="text-xs hidden md:block">
            {formattedDate}
          </div>
          <button 
            onClick={closeBanner}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
            aria-label="Close banner"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DailyPrayerBanner
