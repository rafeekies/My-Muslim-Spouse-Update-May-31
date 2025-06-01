import React, { createContext, useContext, useState } from 'react'
import { db } from '../firebase/config'

const FirestoreContext = createContext()

export const useFirestore = () => {
  return useContext(FirestoreContext)
}

export const FirestoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Mock function for getting user profile
  const getUserProfile = async (userId) => {
    try {
      setLoading(true)
      setError(null)
      
      // In a real app, we would fetch from Firestore
      // For now, return mock data
      return {
        id: userId,
        name: 'Test User',
        email: 'user@example.com',
        gender: 'male',
        bio: 'This is a test user profile',
        location: 'Test City',
        interests: ['Islam', 'Reading', 'Technology'],
        profileCompleted: true,
        createdAt: new Date().toISOString(),
        settings: {
          emailNotifications: true,
          profileVisibility: 'public'
        }
      }
    } catch (err) {
      setError(err.message)
      console.error('Error getting user profile:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Mock function for updating user profile
  const updateUserProfile = async (userId, profileData) => {
    try {
      setLoading(true)
      setError(null)
      
      // In a real app, we would update Firestore
      console.log('Updating profile for user:', userId, profileData)
      
      // Return success
      return true
    } catch (err) {
      setError(err.message)
      console.error('Error updating user profile:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Mock function for getting potential matches
  const getPotentialMatches = async (userId, filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      // In a real app, we would query Firestore
      // For now, return mock data
      return [
        {
          id: 'user1',
          name: 'Ahmed Abdullah',
          age: 28,
          location: 'New York, USA',
          bio: 'Software engineer who loves Islam and technology',
          interests: ['Islam', 'Technology', 'Travel'],
          profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
          id: 'user2',
          name: 'Fatima Hassan',
          age: 26,
          location: 'London, UK',
          bio: 'Medical student with a passion for Islamic studies',
          interests: ['Islam', 'Medicine', 'Reading'],
          profileImage: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
          id: 'user3',
          name: 'Omar Khan',
          age: 30,
          location: 'Toronto, Canada',
          bio: 'Teacher and part-time Islamic calligraphy artist',
          interests: ['Islam', 'Art', 'Education'],
          profileImage: 'https://randomuser.me/api/portraits/men/3.jpg'
        }
      ]
    } catch (err) {
      setError(err.message)
      console.error('Error getting potential matches:', err)
      return []
    } finally {
      setLoading(false)
    }
  }

  const value = {
    loading,
    error,
    getUserProfile,
    updateUserProfile,
    getPotentialMatches
  }

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  )
}
