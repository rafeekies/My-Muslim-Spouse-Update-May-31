import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function AdminRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }
  
  // Check if user is authenticated and has admin role
  const isAdmin = currentUser && userProfile && userProfile.role === 'admin'
  
  return isAdmin ? children : <Navigate to="/dashboard" />
}
