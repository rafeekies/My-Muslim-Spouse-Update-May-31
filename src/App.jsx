import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Layout components
import Layout from './components/layout/Layout'

// Page components
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Browse from './pages/Browse'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'
import Guidelines from './pages/Guidelines'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import FAQs from './pages/FAQs'
import Messages from './pages/Messages'
import Conversation from './pages/Conversation'
import Notifications from './pages/Notifications'
import Favorites from './pages/Favorites'
import Settings from './pages/Settings'
import ForgotPassword from './pages/ForgotPassword'
import About from './pages/About'
import Contact from './pages/Contact'
import FamilyInIslam from './pages/FamilyInIslam'
import IslamicMarriage from './pages/IslamicMarriage'
import HadithCollection from './pages/HadithCollection'
import QuranReferences from './pages/QuranReferences'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="guidelines" element={<Guidelines />} />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<ArticleDetail />} />
        <Route path="faqs" element={<FAQs />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="family-in-islam" element={<FamilyInIslam />} />
        <Route path="islamic-marriage" element={<IslamicMarriage />} />
        <Route path="hadith-collection" element={<HadithCollection />} />
        <Route path="quran-references" element={<QuranReferences />} />
        
        {/* Protected routes */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        <Route path="edit-profile" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
        
        <Route path="settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        
        <Route path="browse" element={
          <ProtectedRoute>
            <Browse />
          </ProtectedRoute>
        } />
        
        <Route path="profile/:id" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        
        <Route path="messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } />
        
        <Route path="messages/:id" element={
          <ProtectedRoute>
            <Conversation />
          </ProtectedRoute>
        } />
        
        <Route path="notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        
        <Route path="favorites" element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } />
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
