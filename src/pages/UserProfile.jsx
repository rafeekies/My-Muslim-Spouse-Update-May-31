import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const UserProfile = () => {
  const { id } = useParams()
  const { loading } = useAuth()
  
  // Mock profile data for demonstration
  const mockProfiles = {
    '1': {
      id: '1',
      displayName: 'Sarah Ahmed',
      age: 28,
      gender: 'female',
      location: 'New York, USA',
      maritalStatus: 'Never Married',
      religiousPractice: 'Practicing',
      prayerFrequency: '5 times a day',
      sect: 'Sunni',
      hijabBeard: 'Yes',
      educationLevel: 'Doctorate',
      fieldOfStudy: 'Medicine',
      profession: 'Doctor',
      incomeRange: '$80,000 - $100,000',
      aboutMe: 'I am a practicing Muslimah looking for a spouse who shares my values and commitment to Islam. I enjoy reading, outdoor activities, and spending time with family. I\'m looking for someone who is kind, intelligent, and has a good sense of humor.',
      lookingFor: 'I\'m looking for a practicing Muslim who is educated, family-oriented, and shares my values. Someone who is supportive, understanding, and ready for marriage. Age preference is 28-35 years old.'
    },
    '2': {
      id: '2',
      displayName: 'Mohammed Ali',
      age: 32,
      gender: 'male',
      location: 'Chicago, USA',
      maritalStatus: 'Never Married',
      religiousPractice: 'Very Practicing',
      prayerFrequency: '5 times a day',
      sect: 'Sunni',
      hijabBeard: 'Yes',
      educationLevel: 'Master\'s Degree',
      fieldOfStudy: 'Engineering',
      profession: 'Engineer',
      incomeRange: '$80,000 - $100,000',
      aboutMe: 'I am a practicing Muslim looking for a spouse who shares my values and commitment to Islam. I enjoy reading, outdoor activities, and spending time with family. I\'m looking for someone who is kind, intelligent, and has a good sense of humor.',
      lookingFor: 'I\'m looking for a practicing Muslimah who is educated, family-oriented, and shares my values. Someone who is supportive, understanding, and ready for marriage. Age preference is 25-30 years old.'
    }
  }
  
  const profile = mockProfiles[id]
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
            <p className="text-gray-600 mb-6">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/browse"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Back to Browse
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-8 text-white">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-gray-500 mb-4 md:mb-0 md:mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                  <p className="text-green-100">{profile.age} years, {profile.profession}</p>
                  <p className="text-green-100">{profile.location}</p>
                </div>
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              {/* Basic Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Age</h3>
                    <p className="mt-1 text-gray-900">{profile.age} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                    <p className="mt-1 text-gray-900">{profile.gender === 'male' ? 'Male' : 'Female'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-gray-900">{profile.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Marital Status</h3>
                    <p className="mt-1 text-gray-900">{profile.maritalStatus}</p>
                  </div>
                </div>
              </div>
              
              {/* Religious Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Religious Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Religious Practice</h3>
                    <p className="mt-1 text-gray-900">{profile.religiousPractice}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Pray</h3>
                    <p className="mt-1 text-gray-900">{profile.prayerFrequency}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Sect</h3>
                    <p className="mt-1 text-gray-900">{profile.sect}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{profile.gender === 'female' ? 'Hijab' : 'Beard'}</h3>
                    <p className="mt-1 text-gray-900">{profile.hijabBeard}</p>
                  </div>
                </div>
              </div>
              
              {/* Education & Career */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Education & Career</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Education Level</h3>
                    <p className="mt-1 text-gray-900">{profile.educationLevel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Field of Study</h3>
                    <p className="mt-1 text-gray-900">{profile.fieldOfStudy}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Profession</h3>
                    <p className="mt-1 text-gray-900">{profile.profession}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Income Range</h3>
                    <p className="mt-1 text-gray-900">{profile.incomeRange}</p>
                  </div>
                </div>
              </div>
              
              {/* About Me */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
                <p className="text-gray-700">
                  {profile.aboutMe}
                </p>
              </div>
              
              {/* What I'm Looking For */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What I'm Looking For</h2>
                <p className="text-gray-700">
                  {profile.lookingFor}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between">
                <Link 
                  to="/browse" 
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Browse
                </Link>
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Express Interest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
