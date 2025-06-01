import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FaUser, FaBell, FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa'

const Settings = () => {
  const { currentUser, updateUserProfile } = useAuth()
  
  // Account Settings
  const [email, setEmail] = useState(currentUser?.email || '')
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '')
  
  // Password Settings
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    profileViews: true,
    matches: true,
    interests: true,
    systemUpdates: true,
    emailNotifications: true
  })
  
  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'all', // 'all', 'matches', 'none'
    showOnlineStatus: true,
    showLastActive: true,
    allowProfileSearch: true,
    blurPhotos: false
  })
  
  // Active tab
  const [activeTab, setActiveTab] = useState('account')
  
  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }
  
  // Handle privacy setting change
  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }
  
  // Handle account update
  const handleAccountUpdate = async (e) => {
    e.preventDefault()
    
    try {
      await updateUserProfile({ displayName })
      toast.success('Account information updated successfully')
    } catch (error) {
      toast.error('Failed to update account information')
      console.error(error)
    }
  }
  
  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      return toast.error('New passwords do not match')
    }
    
    if (newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters')
    }
    
    try {
      // In a real app, you would implement password change logic here
      toast.success('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      toast.error('Failed to update password')
      console.error(error)
    }
  }
  
  // Handle notification settings update
  const handleNotificationUpdate = async (e) => {
    e.preventDefault()
    
    try {
      // In a real app, you would save these settings to the database
      toast.success('Notification settings updated successfully')
    } catch (error) {
      toast.error('Failed to update notification settings')
      console.error(error)
    }
  }
  
  // Handle privacy settings update
  const handlePrivacyUpdate = async (e) => {
    e.preventDefault()
    
    try {
      // In a real app, you would save these settings to the database
      toast.success('Privacy settings updated successfully')
    } catch (error) {
      toast.error('Failed to update privacy settings')
      console.error(error)
    }
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and privacy
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'account'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('account')}
              >
                <FaUser className="inline-block mr-2" />
                Account
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'password'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('password')}
              >
                <FaLock className="inline-block mr-2" />
                Password
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <FaBell className="inline-block mr-2" />
                Notifications
              </button>
              <button
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'privacy'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('privacy')}
              >
                <FaShieldAlt className="inline-block mr-2" />
                Privacy
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <form onSubmit={handleAccountUpdate}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your basic account information.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        disabled
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Email cannot be changed. Contact support for assistance.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            
            {/* Password Settings */}
            {activeTab === 'password' && (
              <form onSubmit={handlePasswordUpdate}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Update your password to keep your account secure.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="currentPassword"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="block w-full pr-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="text-gray-400" />
                          ) : (
                            <FaEye className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="block w-full pr-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="text-gray-400" />
                          ) : (
                            <FaEye className="text-gray-400" />
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 6 characters long.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full pr-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="text-gray-400" />
                          ) : (
                            <FaEye className="text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <form onSubmit={handleNotificationUpdate}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Choose which notifications you'd like to receive.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">New Messages</h4>
                        <p className="text-sm text-gray-500">
                          Get notified when you receive a new message
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          notificationSettings.messages
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handleNotificationToggle('messages')}
                      >
                        <span className="sr-only">Toggle messages notifications</span>
                        <span
                          className={`${
                            notificationSettings.messages
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              notificationSettings.messages
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              notificationSettings.messages
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Profile Views</h4>
                        <p className="text-sm text-gray-500">
                          Get notified when someone views your profile
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          notificationSettings.profileViews
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handleNotificationToggle('profileViews')}
                      >
                        <span className="sr-only">Toggle profile view notifications</span>
                        <span
                          className={`${
                            notificationSettings.profileViews
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              notificationSettings.profileViews
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              notificationSettings.profileViews
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">New Matches</h4>
                        <p className="text-sm text-gray-500">
                          Get notified when you have a new match
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          notificationSettings.matches
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handleNotificationToggle('matches')}
                      >
                        <span className="sr-only">Toggle match notifications</span>
                        <span
                          className={`${
                            notificationSettings.matches
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              notificationSettings.matches
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              notificationSettings.matches
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Interest Notifications</h4>
                        <p className="text-sm text-gray-500">
                          Get notified when someone expresses interest in your profile
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          notificationSettings.interests
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handleNotificationToggle('interests')}
                      >
                        <span className="sr-only">Toggle interest notifications</span>
                        <span
                          className={`${
                            notificationSettings.interests
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              notificationSettings.interests
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              notificationSettings.interests
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">System Updates</h4>
                        <p className="text-sm text-gray-500">
                          Get notified about important system updates and announcements
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          notificationSettings.systemUpdates
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handleNotificationToggle('systemUpdates')}
                      >
                        <span className="sr-only">Toggle system update notifications</span>
                        <span
                          className={`${
                            notificationSettings.systemUpdates
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              notificationSettings.systemUpdates
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              notificationSettings.systemUpdates
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-500">
                          Receive notifications via email in addition to in-app notifications
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          notificationSettings.emailNotifications
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handleNotificationToggle('emailNotifications')}
                      >
                        <span className="sr-only">Toggle email notifications</span>
                        <span
                          className={`${
                            notificationSettings.emailNotifications
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              notificationSettings.emailNotifications
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              notificationSettings.emailNotifications
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
            
            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <form onSubmit={handlePrivacyUpdate}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Privacy Settings</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Control who can see your profile and how your information is shared.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Profile Visibility</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Choose who can view your profile
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            id="visibility-all"
                            name="profileVisibility"
                            type="radio"
                            checked={privacySettings.profileVisibility === 'all'}
                            onChange={() => handlePrivacyChange('profileVisibility', 'all')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor="visibility-all" className="ml-3 text-sm text-gray-700">
                            All users (recommended)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="visibility-matches"
                            name="profileVisibility"
                            type="radio"
                            checked={privacySettings.profileVisibility === 'matches'}
                            onChange={() => handlePrivacyChange('profileVisibility', 'matches')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor="visibility-matches" className="ml-3 text-sm text-gray-700">
                            Only my matches and those I've expressed interest in
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="visibility-none"
                            name="profileVisibility"
                            type="radio"
                            checked={privacySettings.profileVisibility === 'none'}
                            onChange={() => handlePrivacyChange('profileVisibility', 'none')}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <label htmlFor="visibility-none" className="ml-3 text-sm text-gray-700">
                            Hidden (you can still browse but others won't see you)
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Show Online Status</h4>
                        <p className="text-sm text-gray-500">
                          Allow others to see when you're online
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          privacySettings.showOnlineStatus
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handlePrivacyChange('showOnlineStatus', !privacySettings.showOnlineStatus)}
                      >
                        <span className="sr-only">Toggle online status</span>
                        <span
                          className={`${
                            privacySettings.showOnlineStatus
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              privacySettings.showOnlineStatus
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              privacySettings.showOnlineStatus
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Show Last Active Time</h4>
                        <p className="text-sm text-gray-500">
                          Allow others to see when you were last active
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          privacySettings.showLastActive
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handlePrivacyChange('showLastActive', !privacySettings.showLastActive)}
                      >
                        <span className="sr-only">Toggle last active time</span>
                        <span
                          className={`${
                            privacySettings.showLastActive
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              privacySettings.showLastActive
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              privacySettings.showLastActive
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Allow Profile Search</h4>
                        <p className="text-sm text-gray-500">
                          Allow your profile to appear in search results
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          privacySettings.allowProfileSearch
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handlePrivacyChange('allowProfileSearch', !privacySettings.allowProfileSearch)}
                      >
                        <span className="sr-only">Toggle profile search</span>
                        <span
                          className={`${
                            privacySettings.allowProfileSearch
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              privacySettings.allowProfileSearch
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              privacySettings.allowProfileSearch
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Blur Photos Until Matched</h4>
                        <p className="text-sm text-gray-500">
                          Keep your photos blurred until you match with someone
                        </p>
                      </div>
                      <button
                        type="button"
                        className={`${
                          privacySettings.blurPhotos
                            ? 'bg-primary-600'
                            : 'bg-gray-200'
                        } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none`}
                        onClick={() => handlePrivacyChange('blurPhotos', !privacySettings.blurPhotos)}
                      >
                        <span className="sr-only">Toggle photo blurring</span>
                        <span
                          className={`${
                            privacySettings.blurPhotos
                              ? 'translate-x-5'
                              : 'translate-x-0'
                          } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                        >
                          <span
                            className={`${
                              privacySettings.blurPhotos
                                ? 'opacity-0 ease-out duration-100'
                                : 'opacity-100 ease-in duration-200'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                              <path
                                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span
                            className={`${
                              privacySettings.blurPhotos
                                ? 'opacity-100 ease-in duration-200'
                                : 'opacity-0 ease-out duration-100'
                            } absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                          >
                            <FaCheck className="h-3 w-3 text-primary-600" />
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Save Privacy Settings
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-primary-50 rounded-lg p-6 border-l-4 border-primary-500">
          <h3 className="font-medium text-primary-800 mb-2">Account Security</h3>
          <p className="text-sm text-gray-600">
            We recommend using a strong, unique password and regularly reviewing your account activity to ensure your account remains secure.
          </p>
          <button className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500">
            View Account Activity →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
