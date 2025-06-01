import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { toast } from 'react-toastify'
import { FaCrown, FaCheck, FaTimes, FaLock, FaCreditCard } from 'react-icons/fa'

export default function Membership() {
  const { currentUser, userProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [currentPlan, setCurrentPlan] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const navigate = useNavigate()
  
  // Payment form state
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  
  useEffect(() => {
    if (userProfile) {
      checkCurrentSubscription()
    }
  }, [userProfile])
  
  const checkCurrentSubscription = async () => {
    try {
      // In a real app, you would fetch the user's subscription from your payment processor
      // This is simplified for demonstration
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
      const userData = userDoc.data()
      
      if (userData.subscription) {
        setCurrentPlan(userData.subscription.plan)
      } else {
        setCurrentPlan('free')
      }
    } catch (error) {
      console.error('Error checking subscription:', error)
      setCurrentPlan('free')
    }
  }
  
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
    setShowPaymentForm(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  
  const handleSubmitPayment = async (e) => {
    e.preventDefault()
    
    if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
      return toast.error('Please fill in all payment details')
    }
    
    try {
      setLoading(true)
      
      // In a real app, you would process the payment through a payment processor like Stripe
      // This is simplified for demonstration
      
      // Update user document with subscription info
      await updateDoc(doc(db, 'users', currentUser.uid), {
        subscription: {
          plan: selectedPlan,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          active: true
        }
      })
      
      toast.success(`Successfully subscribed to ${selectedPlan} plan!`)
      setCurrentPlan(selectedPlan)
      setShowPaymentForm(false)
      
      // Reset form
      setCardName('')
      setCardNumber('')
      setCardExpiry('')
      setCardCvc('')
    } catch (error) {
      console.error('Error processing payment:', error)
      toast.error('Failed to process payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }
  
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    
    return value
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Membership Plans</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upgrade your membership to unlock premium features and increase your chances of finding your perfect spouse
            </p>
          </div>
          
          {/* Current Plan */}
          {currentPlan && currentPlan !== 'free' && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
              <div className="flex items-center">
                <FaCrown className="text-primary-600 text-2xl mr-3" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Your Current Plan: <span className="capitalize">{currentPlan}</span>
                  </h2>
                  <p className="text-gray-600">
                    You're enjoying premium features. Your subscription will renew automatically.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Free Plan */}
            <div className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${currentPlan === 'free' ? 'border-primary-500' : 'border-transparent'}`}>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Free</h2>
                <p className="text-gray-600 mb-4">Basic features to get started</p>
                <p className="text-3xl font-bold text-gray-900 mb-6">$0 <span className="text-sm font-normal text-gray-500">/month</span></p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Create a basic profile</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Browse limited profiles</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Basic search filters</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Send messages</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>See who's interested in you</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Advanced search filters</span>
                  </li>
                </ul>
                
                {currentPlan === 'free' ? (
                  <button
                    disabled
                    className="w-full btn btn-secondary"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan('free')}
                    className="w-full btn btn-secondary"
                  >
                    Downgrade
                  </button>
                )}
              </div>
            </div>
            
            {/* Basic Plan */}
            <div className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${currentPlan === 'basic' ? 'border-primary-500' : 'border-transparent'}`}>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Basic</h2>
                <p className="text-gray-600 mb-4">Essential features for serious seekers</p>
                <p className="text-3xl font-bold text-gray-900 mb-6">$9.99 <span className="text-sm font-normal text-gray-500">/month</span></p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>All Free features</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Send up to 10 messages per day</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>See who's viewed your profile</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Advanced search filters</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Unlimited messages</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Priority profile placement</span>
                  </li>
                </ul>
                
                {currentPlan === 'basic' ? (
                  <button
                    disabled
                    className="w-full btn btn-secondary"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan('basic')}
                    className="w-full btn btn-primary"
                  >
                    {currentPlan === 'premium' ? 'Downgrade' : 'Select Plan'}
                  </button>
                )}
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className={`bg-white rounded-lg shadow-md overflow-hidden border-2 ${currentPlan === 'premium' ? 'border-primary-500' : 'border-transparent'} relative`}>
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-sm font-semibold">
                Popular
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Premium</h2>
                <p className="text-gray-600 mb-4">Ultimate experience for serious seekers</p>
                <p className="text-3xl font-bold text-gray-900 mb-6">$19.99 <span className="text-sm font-normal text-gray-500">/month</span></p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>All Basic features</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Unlimited messages</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Priority profile placement</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>See who's interested in you</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Read receipts for messages</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Premium customer support</span>
                  </li>
                </ul>
                
                {currentPlan === 'premium' ? (
                  <button
                    disabled
                    className="w-full btn btn-secondary"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan('premium')}
                    className="w-full btn btn-primary"
                  >
                    Select Plan
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          {showPaymentForm && selectedPlan !== 'free' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FaCreditCard className="mr-2 text-primary-600" />
                Payment Information
              </h2>
              
              <form onSubmit={handleSubmitPayment}>
                <div className="grid grid-cols-1 gap-6 mb-6">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      className="input"
                      placeholder="John Smith"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        className="input pl-10"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        required
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCreditCard className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        className="input"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        maxLength={5}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        className="input"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowPaymentForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Subscribe to ${selectedPlan} Plan`
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Your subscription will begin immediately and renew monthly.</p>
                <p className="mt-2">You can cancel anytime from your account settings.</p>
              </div>
            </div>
          )}
          
          {/* Features Comparison */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-12">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Features Comparison</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Free
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basic
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Create Profile
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Browse Profiles
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Limited
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Send Messages
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      10/day
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Unlimited
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Advanced Search Filters
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      See Who's Interested
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Priority Profile Placement
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Read Receipts
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaTimes className="text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <FaCheck className="text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Customer Support
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Basic
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Standard
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      Premium
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I cancel my subscription?</h3>
                <p className="text-gray-600">
                  You can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of your current billing period.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change my plan?</h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be available immediately. If you downgrade, the change will take effect at the end of your current billing period.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my payment information secure?</h3>
                <p className="text-gray-600">
                  Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details on our servers.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600">
                  We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied with our service, contact our support team within 7 days of your initial payment for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
