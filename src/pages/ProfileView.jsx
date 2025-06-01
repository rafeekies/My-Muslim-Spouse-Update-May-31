import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaBook, FaHeart, FaChild, FaLanguage, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa'

export default function ProfileView() {
  const { id } = useParams()
  const { currentUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        // Check if viewing own profile
        if (id === currentUser.uid) {
          setIsOwnProfile(true)
        }
        
        const profileDoc = await getDoc(doc(db, 'users', id))
        
        if (profileDoc.exists()) {
          setProfile({
            id: profileDoc.id,
            ...profileDoc.data()
          })
        } else {
          setError('Profile not found')
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProfile()
  }, [id, currentUser])
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
            <p className="text-gray-600 mb-6">
              The profile you are looking for could not be found or you may not have permission to view it.
            </p>
            <Link to="/browse" className="btn btn-primary">
              Browse Other Profiles
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-primary-600 to-primary-800"></div>
              <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
                {profile.photoURL ? (
                  <img 
                    src={profile.photoURL} 
                    alt={profile.displayName} 
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-gray-400 text-4xl" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-20 pb-6 px-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {profile.displayName}, {profile.age}
              </h1>
              <p className="text-gray-600 flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="mr-1" /> {profile.location}
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                  {profile.profession}
                </div>
                <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                  {profile.religiousLevel}
                </div>
                <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                  {profile.maritalStatus}
                </div>
              </div>
              
              {!isOwnProfile && (
                <div className="flex justify-center gap-4">
                  <button className="btn btn-primary flex items-center">
                    <FaHeart className="mr-2" /> Express Interest
                  </button>
                  <Link to={`/messages/${profile.id}`} className="btn btn-secondary flex items-center">
                    <FaEnvelope className="mr-2" /> Send Message
                  </Link>
                </div>
              )}
              
              {isOwnProfile && (
                <Link to="/profile/edit" className="btn btn-primary">
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 text-primary-600">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-900">{profile.location}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 text-primary-600">
                        <FaBriefcase />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Profession</p>
                        <p className="text-gray-900">{profile.profession}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 text-primary-600">
                        <FaGraduationCap />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Education</p>
                        <p className="text-gray-900">{profile.education}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 text-primary-600">
                        <FaLanguage />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Languages</p>
                        <p className="text-gray-900">{profile.languages}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 text-primary-600">
                        <FaChild />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Has Children</p>
                        <p className="text-gray-900">{profile.hasChildren === 'yes' ? 'Yes' : 'No'}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 text-primary-600">
                        <FaChild />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Wants Children</p>
                        <p className="text-gray-900">
                          {profile.wantChildren === 'yes' ? 'Yes' : 
                           profile.wantChildren === 'no' ? 'No' : 'Open to it'}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Religious Practice</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {profile.praysFiveTimes ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-gray-300" />
                        )}
                      </div>
                      <p className="text-gray-700">Prays five times daily</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {profile.fastsDuringRamadan ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-gray-300" />
                        )}
                      </div>
                      <p className="text-gray-700">Fasts during Ramadan</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {profile.readsQuran ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-gray-300" />
                        )}
                      </div>
                      <p className="text-gray-700">Reads Quran regularly</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        {profile.attendsMosque ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-gray-300" />
                        )}
                      </div>
                      <p className="text-gray-700">Attends mosque regularly</p>
                    </div>
                    
                    {profile.gender === 'female' && (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          {profile.wearsHijab ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-gray-300" />
                          )}
                        </div>
                        <p className="text-gray-700">Wears Hijab</p>
                      </div>
                    )}
                    
                    {profile.gender === 'male' && (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          {profile.hasBeard ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-gray-300" />
                          )}
                        </div>
                        <p className="text-gray-700">Has Beard</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About Me</h2>
                  <p className="text-gray-700 whitespace-pre-line mb-6">{profile.bio}</p>
                  
                  {profile.hobbies && (
                    <>
                      <h3 className="text-lg font-medium mb-2">Hobbies & Interests</h3>
                      <p className="text-gray-700 mb-6">{profile.hobbies}</p>
                    </>
                  )}
                  
                  <h3 className="text-lg font-medium mb-2">Family Values</h3>
                  <p className="text-gray-700 mb-6">{profile.familyValues}</p>
                  
                  {profile.futureGoals && (
                    <>
                      <h3 className="text-lg font-medium mb-2">Future Goals</h3>
                      <p className="text-gray-700">{profile.futureGoals}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">What I'm Looking For</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {profile.prefAgeMin && profile.prefAgeMax && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Age Range</h3>
                        <p className="text-gray-900">{profile.prefAgeMin} - {profile.prefAgeMax} years</p>
                      </div>
                    )}
                    
                    {profile.prefLocation && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Location</h3>
                        <p className="text-gray-900">{profile.prefLocation}</p>
                      </div>
                    )}
                    
                    {profile.prefReligiousLevel && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Religious Level</h3>
                        <p className="text-gray-900">{profile.prefReligiousLevel}</p>
                      </div>
                    )}
                    
                    {profile.prefEducation && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Education Level</h3>
                        <p className="text-gray-900">{profile.prefEducation}</p>
                      </div>
                    )}
                    
                    {profile.prefMaritalStatus && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Marital Status</h3>
                        <p className="text-gray-900">{profile.prefMaritalStatus}</p>
                      </div>
                    )}
                    
                    {profile.prefEthnicity && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Ethnicity</h3>
                        <p className="text-gray-900">{profile.prefEthnicity}</p>
                      </div>
                    )}
                  </div>
                  
                  {profile.importantQualities && (
                    <>
                      <h3 className="text-lg font-medium mb-2">Important Qualities</h3>
                      <p className="text-gray-700">{profile.importantQualities}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
