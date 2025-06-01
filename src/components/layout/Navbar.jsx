import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import { 
  FaUser, 
  FaSignOutAlt, 
  FaUserEdit, 
  FaTachometerAlt, 
  FaSearch, 
  FaEnvelope, 
  FaHeart, 
  FaQuestionCircle, 
  FaBook, 
  FaMosque, 
  FaUserFriends,
  FaBell,
  FaComments,
  FaInfoCircle,
  FaEnvelopeOpen,
  FaQuran,
  FaBookOpen
} from 'react-icons/fa'

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false)
  const [isMessagesMenuOpen, setIsMessagesMenuOpen] = useState(false)
  const [isIslamicMenuOpen, setIsIslamicMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Refs for dropdown menus
  const profileMenuRef = useRef(null)
  const resourcesMenuRef = useRef(null)
  const messagesMenuRef = useRef(null)
  const islamicMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  
  // Handle clicks outside of dropdown menus
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click was outside the profile menu
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
      
      // Check if the click was outside the resources menu
      if (resourcesMenuRef.current && !resourcesMenuRef.current.contains(event.target)) {
        setIsResourcesMenuOpen(false)
      }
      
      // Check if the click was outside the messages menu
      if (messagesMenuRef.current && !messagesMenuRef.current.contains(event.target)) {
        setIsMessagesMenuOpen(false)
      }
      
      // Check if the click was outside the islamic menu
      if (islamicMenuRef.current && !islamicMenuRef.current.contains(event.target)) {
        setIsIslamicMenuOpen(false)
      }
    }
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Clean up menus on location change
  useEffect(() => {
    setIsMenuOpen(false)
    setIsProfileMenuOpen(false)
    setIsResourcesMenuOpen(false)
    setIsMessagesMenuOpen(false)
    setIsIslamicMenuOpen(false)
  }, [location])
  
  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to log out')
    }
  }

  const toggleProfileMenu = (e) => {
    e.stopPropagation()
    setIsProfileMenuOpen(!isProfileMenuOpen)
    setIsResourcesMenuOpen(false)
    setIsMessagesMenuOpen(false)
    setIsIslamicMenuOpen(false)
  }

  const toggleResourcesMenu = (e) => {
    e.stopPropagation()
    setIsResourcesMenuOpen(!isResourcesMenuOpen)
    setIsProfileMenuOpen(false)
    setIsMessagesMenuOpen(false)
    setIsIslamicMenuOpen(false)
  }

  const toggleMessagesMenu = (e) => {
    e.stopPropagation()
    setIsMessagesMenuOpen(!isMessagesMenuOpen)
    setIsProfileMenuOpen(false)
    setIsResourcesMenuOpen(false)
    setIsIslamicMenuOpen(false)
  }
  
  const toggleIslamicMenu = (e) => {
    e.stopPropagation()
    setIsIslamicMenuOpen(!isIslamicMenuOpen)
    setIsProfileMenuOpen(false)
    setIsResourcesMenuOpen(false)
    setIsMessagesMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeAllMenus = () => {
    setIsMenuOpen(false)
    setIsProfileMenuOpen(false)
    setIsResourcesMenuOpen(false)
    setIsMessagesMenuOpen(false)
    setIsIslamicMenuOpen(false)
  }
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FaMosque className="h-6 w-6 text-green-600 mr-2" />
              <span className="text-green-600 font-bold text-xl">My Muslim Spouse</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 ${
                location.pathname === '/' ? 'text-green-600 bg-gray-50' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            
            {/* About Link */}
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 ${
                location.pathname === '/about' ? 'text-green-600 bg-gray-50' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            
            {/* Islamic Resources Dropdown */}
            <div className="relative" ref={islamicMenuRef}>
              <button
                type="button"
                className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 flex items-center ${
                  ['/family-in-islam', '/islamic-marriage', '/hadith-collection', '/quran-references'].includes(location.pathname) 
                    ? 'text-green-600 bg-gray-50' 
                    : 'text-gray-700'
                }`}
                onClick={toggleIslamicMenu}
              >
                <FaQuran className="mr-1" />
                <span>Islamic Resources</span>
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {isIslamicMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      to="/family-in-islam"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsIslamicMenuOpen(false)}
                    >
                      <FaUserFriends className="mr-2" />
                      Family in Islam
                    </Link>
                    
                    <Link
                      to="/islamic-marriage"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsIslamicMenuOpen(false)}
                    >
                      <FaHeart className="mr-2" />
                      Islamic Marriage
                    </Link>
                    
                    <Link
                      to="/hadith-collection"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsIslamicMenuOpen(false)}
                    >
                      <FaBookOpen className="mr-2" />
                      Hadith Collection
                    </Link>
                    
                    <Link
                      to="/quran-references"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsIslamicMenuOpen(false)}
                    >
                      <FaQuran className="mr-2" />
                      Quran References
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesMenuRef}>
              <button
                type="button"
                className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 flex items-center ${
                  ['/guidelines', '/articles', '/faqs'].includes(location.pathname) 
                    ? 'text-green-600 bg-gray-50' 
                    : 'text-gray-700'
                }`}
                onClick={toggleResourcesMenu}
              >
                <FaBook className="mr-1" />
                <span>Resources</span>
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {isResourcesMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      to="/guidelines"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsResourcesMenuOpen(false)}
                    >
                      <FaMosque className="mr-2" />
                      Islamic Guidelines
                    </Link>
                    
                    <Link
                      to="/articles"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsResourcesMenuOpen(false)}
                    >
                      <FaBook className="mr-2" />
                      Articles
                    </Link>
                    
                    <Link
                      to="/faqs"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsResourcesMenuOpen(false)}
                    >
                      <FaQuestionCircle className="mr-2" />
                      FAQs
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Link */}
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 ${
                location.pathname === '/contact' ? 'text-green-600 bg-gray-50' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
            
            {currentUser ? (
              <>
                <Link 
                  to="/browse" 
                  className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 flex items-center ${
                    location.pathname === '/browse' ? 'text-green-600 bg-gray-50' : 'text-gray-700'
                  }`}
                >
                  <FaSearch className="mr-1" />
                  Browse
                </Link>
                
                {/* Messages Dropdown */}
                <div className="relative" ref={messagesMenuRef}>
                  <button
                    type="button"
                    className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 flex items-center ${
                      ['/messages', '/notifications'].includes(location.pathname) 
                        ? 'text-green-600 bg-gray-50' 
                        : 'text-gray-700'
                    }`}
                    onClick={toggleMessagesMenu}
                  >
                    <FaEnvelope className="mr-1" />
                    <span>Messages</span>
                    <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  
                  {isMessagesMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <Link
                          to="/messages"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMessagesMenuOpen(false)}
                        >
                          <FaComments className="mr-2" />
                          Conversations
                        </Link>
                        
                        <Link
                          to="/notifications"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMessagesMenuOpen(false)}
                        >
                          <FaBell className="mr-2" />
                          Notifications
                        </Link>
                        
                        <Link
                          to="/favorites"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsMessagesMenuOpen(false)}
                        >
                          <FaHeart className="mr-2" />
                          Favorites
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 flex items-center ${
                    location.pathname === '/dashboard' ? 'text-green-600 bg-gray-50' : 'text-gray-700'
                  }`}
                >
                  <FaTachometerAlt className="mr-1" />
                  Dashboard
                </Link>
                
                <div className="relative ml-3" ref={profileMenuRef}>
                  <div>
                    <button
                      type="button"
                      className={`flex items-center px-3 py-2 border border-transparent hover:text-green-600 hover:bg-gray-50 rounded-md focus:outline-none ${
                        ['/profile', '/edit-profile', '/settings'].includes(location.pathname) 
                          ? 'text-green-600 bg-gray-50' 
                          : 'text-gray-700'
                      }`}
                      onClick={toggleProfileMenu}
                    >
                      <span className="mr-2">{currentUser.displayName || 'Account'}</span>
                      <FaUser />
                    </button>
                  </div>
                  
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <FaUser className="mr-2" />
                          Your Profile
                        </Link>
                        
                        <Link
                          to="/edit-profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <FaUserEdit className="mr-2" />
                          Edit Profile
                        </Link>
                        
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <FaUserFriends className="mr-2" />
                          Account Settings
                        </Link>
                        
                        <button
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsProfileMenuOpen(false)
                            handleLogout()
                          }}
                        >
                          <FaSignOutAlt className="mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-3 py-2 rounded-md hover:text-green-600 hover:bg-gray-50 ${
                    location.pathname === '/login' ? 'text-green-600 bg-gray-50' : 'text-gray-700'
                  }`}
                >
                  Login
                </Link>
                
                <Link 
                  to="/register" 
                  className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" ref={mobileMenuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/about' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaInfoCircle className="mr-2" />
                About Us
              </div>
            </Link>
            
            {/* Mobile Islamic Resources Submenu */}
            <Link
              to="/family-in-islam"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/family-in-islam' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaUserFriends className="mr-2" />
                Family in Islam
              </div>
            </Link>
            
            <Link
              to="/islamic-marriage"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/islamic-marriage' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaHeart className="mr-2" />
                Islamic Marriage
              </div>
            </Link>
            
            <Link
              to="/hadith-collection"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/hadith-collection' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaBookOpen className="mr-2" />
                Hadith Collection
              </div>
            </Link>
            
            <Link
              to="/quran-references"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/quran-references' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaQuran className="mr-2" />
                Quran References
              </div>
            </Link>
            
            {/* Mobile Resources Submenu */}
            <Link
              to="/guidelines"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/guidelines' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaMosque className="mr-2" />
                Islamic Guidelines
              </div>
            </Link>
            
            <Link
              to="/articles"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/articles' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaBook className="mr-2" />
                Articles
              </div>
            </Link>
            
            <Link
              to="/faqs"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/faqs' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaQuestionCircle className="mr-2" />
                FAQs
              </div>
            </Link>
            
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md ${
                location.pathname === '/contact' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <FaEnvelopeOpen className="mr-2" />
                Contact Us
              </div>
            </Link>
            
            {currentUser ? (
              <>
                <Link
                  to="/browse"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/browse' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaSearch className="mr-2" />
                    Browse
                  </div>
                </Link>
                
                <Link
                  to="/messages"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/messages' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaComments className="mr-2" />
                    Messages
                  </div>
                </Link>
                
                <Link
                  to="/notifications"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/notifications' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaBell className="mr-2" />
                    Notifications
                  </div>
                </Link>
                
                <Link
                  to="/favorites"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/favorites' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaHeart className="mr-2" />
                    Favorites
                  </div>
                </Link>
                
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/dashboard' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaTachometerAlt className="mr-2" />
                    Dashboard
                  </div>
                </Link>
                
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/profile' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    Your Profile
                  </div>
                </Link>
                
                <Link
                  to="/edit-profile"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/edit-profile' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaUserEdit className="mr-2" />
                    Edit Profile
                  </div>
                </Link>
                
                <Link
                  to="/settings"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/settings' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <FaUserFriends className="mr-2" />
                    Account Settings
                  </div>
                </Link>
                
                <button
                  className="w-full text-left block px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleLogout()
                  }}
                >
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" />
                    Sign out
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md ${
                    location.pathname === '/login' ? 'text-green-600 bg-gray-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
