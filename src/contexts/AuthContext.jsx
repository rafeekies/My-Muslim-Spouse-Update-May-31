import React, { createContext, useState, useEffect, useContext } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../firebase/config'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [authStateReady, setAuthStateReady] = useState(false)

  // Sign up function
  const signup = async (email, password, displayName) => {
    try {
      setError(null)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update profile with display name
      if (displayName && userCredential.user) {
        await firebaseUpdateProfile(userCredential.user, { displayName })
      }
      
      return { user: userCredential.user }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Login function
  const login = async (email, password) => {
    try {
      setError(null)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { user: userCredential.user }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Logout function
  const logout = async () => {
    try {
      setError(null)
      await signOut(auth)
      setUserProfile(null)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Reset password function
  const resetPassword = async (email) => {
    try {
      setError(null)
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      setError(null)
      if (currentUser) {
        // Update the Firebase profile if we have a real user
        await firebaseUpdateProfile(currentUser, profileData)
        
        // Update the local state
        setUserProfile(prev => ({
          ...prev,
          ...profileData
        }))
        return true
      } else {
        console.warn('Cannot update profile: No current user')
        return false
      }
    } catch (err) {
      setError(err.message)
      console.error('Error updating profile:', err)
      return false
    }
  }

  // Fetch user profile
  const fetchUserProfile = async (userId) => {
    try {
      setError(null)
      // In a real app, we would fetch the profile from Firestore
      // For now, just return the basic user info we have
      return userProfile || { displayName: currentUser?.displayName || 'User' }
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      if (user) {
        // Set basic profile info from the user object
        setUserProfile({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      } else {
        setUserProfile(null)
      }
      setLoading(false)
      setAuthStateReady(true)
    })

    // Cleanup subscription
    return unsubscribe
  }, [])

  // Mock user for development if needed
  useEffect(() => {
    // Uncomment this section to use a mock user during development
    /*
    if (process.env.NODE_ENV === 'development') {
      const mockUser = {
        uid: 'mock-user-id',
        email: 'user@example.com',
        displayName: 'Test User',
        photoURL: null
      };
      setCurrentUser(mockUser);
      setUserProfile(mockUser);
      setLoading(false);
      setAuthStateReady(true);
    }
    */
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    authStateReady,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    fetchUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
