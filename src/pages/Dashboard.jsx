import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FaUser, FaEnvelope, FaBell, FaUserFriends, FaCalendarAlt, FaBook, FaMosque } from 'react-icons/fa'
import PrayerTimesWidget from '../components/widgets/PrayerTimesWidget'
import IslamicQuoteWidget from '../components/widgets/IslamicQuoteWidget'

const Dashboard = () => {
  const { currentUser } = useAuth()
  
  // Mock data for demonstration
  const recentMatches = [
    {
      id: 1,
      name: 'Aisha',
      age: 28,
      location: 'London, UK',
      avatar: 'https://images.pexels.com/photos/6953867/pexels-photo-6953867.jpeg',
      compatibility: 85
    },
    {
      id: 2,
      name: 'Fatima',
      age: 26,
      location: 'Birmingham, UK',
      avatar: 'https://images.pexels.com/photos/5325840/pexels-photo-5325840.jpeg',
      compatibility: 78
    },
    {
      id: 3,
      name: 'Maryam',
      age: 30,
      location: 'Manchester, UK',
      avatar: 'https://images.pexels.com/photos/4148842/pexels-photo-4148842.jpeg',
      compatibility: 92
    }
  ]
  
  const notifications = [
    {
      id: 1,
      type: 'message',
      content: 'You have a new message from Aisha',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'match',
      content: 'New match suggestion: Fatima',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'system',
      content: 'Complete your profile to get better matches',
      time: '3 days ago',
      read: true
    }
  ]
  
  const upcomingEvents = [
    {
      id: 1,
      title: 'Virtual Marriage Seminar',
      date: 'June 15, 2023',
      time: '7:00 PM',
      description: 'Learn about building a successful Islamic marriage'
    },
    {
      id: 2,
      title: 'Community Matchmaking Event',
      date: 'June 25, 2023',
      time: '2:00 PM',
      description: 'Meet potential spouses with family involvement'
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-md p-6 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-islamic-pattern opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">As-salamu alaykum, {currentUser?.displayName || 'Brother/Sister'}</h1>
            <p className="mb-4">May Allah bless you with a righteous spouse who will be the comfort of your eyes.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/browse" className="btn bg-white text-primary-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium">
                Browse Profiles
              </Link>
              <Link to="/edit-profile" className="btn bg-primary-500 text-white hover:bg-primary-600 px-4 py-2 rounded-md font-medium">
                Complete Your Profile
              </Link>
            </div>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Completion */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Profile Completion</h2>
                <Link to="/edit-profile" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Complete Profile
                </Link>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <p className="text-gray-600 mb-4">Your profile is 65% complete. Complete your profile to get better matches.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <FaUser className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Basic Info</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <FaBook className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Religious Background</p>
                    <p className="text-xs text-gray-500">Partially Completed</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <FaUserFriends className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Family Information</p>
                    <p className="text-xs text-gray-500">Not Started</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <FaMosque className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Marriage Preferences</p>
                    <p className="text-xs text-gray-500">Partially Completed</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Matches */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Matches</h2>
                <Link to="/browse" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentMatches.map(match => (
                  <div key={match.id} className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                    <img 
                      src={match.avatar} 
                      alt={match.name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold">{match.name}, {match.age}</h3>
                      <p className="text-gray-600 text-sm">{match.location}</p>
                    </div>
                    <div>
                      <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                        {match.compatibility}% Match
                      </div>
                      <Link 
                        to={`/profile/${match.id}`} 
                        className="block text-center text-primary-600 hover:text-primary-700 text-sm mt-2"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Upcoming Islamic Events</h2>
              
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="border-l-4 border-primary-500 pl-4 py-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <FaCalendarAlt className="text-primary-500 mt-1" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-gray-600 text-sm">{event.date} at {event.time}</p>
                        <p className="text-gray-500 text-sm mt-1">{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-8">
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                  {notifications.filter(n => !n.read).length} New
                </span>
              </div>
              
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-primary-50'}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        {notification.type === 'message' && <FaEnvelope className="text-primary-500 mt-1" />}
                        {notification.type === 'match' && <FaUserFriends className="text-primary-500 mt-1" />}
                        {notification.type === 'system' && <FaBell className="text-primary-500 mt-1" />}
                      </div>
                      <div>
                        <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'}`}>
                          {notification.content}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Prayer Times Widget */}
            <PrayerTimesWidget />
            
            {/* Islamic Quote Widget */}
            <IslamicQuoteWidget />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
