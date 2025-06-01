import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaEnvelope, FaUser, FaCircle, FaEllipsisH, FaTrash, FaFlag, FaBan } from 'react-icons/fa'

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeConversation, setActiveConversation] = useState(null)
  const [showOptions, setShowOptions] = useState(null)
  
  // Mock conversations data
  const conversations = [
    {
      id: 1,
      user: {
        id: 101,
        name: 'Ahmed Hassan',
        avatar: null,
        isOnline: true,
        lastActive: 'Just now'
      },
      lastMessage: {
        text: 'Assalamu alaikum, I would like to know more about your interests in Islamic studies.',
        time: '10:30 AM',
        isRead: false,
        isFromMe: false
      },
      unreadCount: 2
    },
    {
      id: 2,
      user: {
        id: 102,
        name: 'Fatima Ali',
        avatar: null,
        isOnline: false,
        lastActive: '2 hours ago'
      },
      lastMessage: {
        text: 'Wa alaikum assalam, thank you for your message. I would be happy to discuss further.',
        time: 'Yesterday',
        isRead: true,
        isFromMe: true
      },
      unreadCount: 0
    },
    {
      id: 3,
      user: {
        id: 103,
        name: 'Omar Khan',
        avatar: null,
        isOnline: false,
        lastActive: '1 day ago'
      },
      lastMessage: {
        text: 'I noticed we share similar views on family values. Would you be interested in discussing this further?',
        time: '2 days ago',
        isRead: true,
        isFromMe: false
      },
      unreadCount: 0
    },
    {
      id: 4,
      user: {
        id: 104,
        name: 'Aisha Rahman',
        avatar: null,
        isOnline: true,
        lastActive: 'Just now'
      },
      lastMessage: {
        text: 'Jazak Allah khair for sharing those resources about marriage in Islam.',
        time: '3 days ago',
        isRead: true,
        isFromMe: false
      },
      unreadCount: 0
    }
  ]
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation => 
    conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  // Mock messages for the selected conversation
  const mockMessages = [
    {
      id: 1,
      text: 'Assalamu alaikum, I hope you are doing well.',
      time: '10:15 AM',
      isFromMe: false
    },
    {
      id: 2,
      text: 'Wa alaikum assalam, Alhamdulillah I am well. How are you?',
      time: '10:18 AM',
      isFromMe: true
    },
    {
      id: 3,
      text: 'I am good, thank you. I noticed from your profile that you are interested in Islamic studies.',
      time: '10:20 AM',
      isFromMe: false
    },
    {
      id: 4,
      text: 'I would like to know more about your interests in this area if you don\'t mind sharing.',
      time: '10:20 AM',
      isFromMe: false
    },
    {
      id: 5,
      text: 'Yes, I have been studying Fiqh and Hadith for the past few years. I\'m particularly interested in family law in Islam.',
      time: '10:25 AM',
      isFromMe: true
    },
    {
      id: 6,
      text: 'That\'s wonderful! I have a similar interest. I\'ve been focusing on the rights and responsibilities in marriage according to Islamic teachings.',
      time: '10:28 AM',
      isFromMe: false
    },
    {
      id: 7,
      text: 'Assalamu alaikum, I would like to know more about your interests in Islamic studies.',
      time: '10:30 AM',
      isFromMe: false
    }
  ]
  
  // Handle conversation options
  const handleOptionsClick = (id, e) => {
    e.stopPropagation()
    setShowOptions(showOptions === id ? null : id)
  }
  
  // Get selected conversation
  const selectedConversation = conversations.find(conv => conv.id === activeConversation)
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">
            Connect with potential spouses in a halal environment
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Conversation List */}
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <div className="p-4 border-b">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search messages"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(600px-73px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer relative ${
                        activeConversation === conversation.id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => setActiveConversation(conversation.id)}
                    >
                      <div className="flex items-start">
                        <div className="relative flex-shrink-0">
                          {conversation.user.avatar ? (
                            <img 
                              src={conversation.user.avatar} 
                              alt={conversation.user.name} 
                              className="h-12 w-12 rounded-full"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                              <FaUser className="text-primary-600" />
                            </div>
                          )}
                          {conversation.user.isOnline && (
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">{conversation.user.name}</h3>
                            <p className="text-xs text-gray-500">{conversation.lastMessage.time}</p>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <p className={`text-sm ${
                              conversation.unreadCount > 0 && !conversation.lastMessage.isFromMe 
                                ? 'font-medium text-gray-900' 
                                : 'text-gray-500'
                            } truncate`}>
                              {conversation.lastMessage.isFromMe && 'You: '}
                              {conversation.lastMessage.text}
                            </p>
                            {conversation.unreadCount > 0 && !conversation.lastMessage.isFromMe && (
                              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-600 text-xs font-medium text-white">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Options button */}
                        <button 
                          className="ml-2 text-gray-400 hover:text-gray-600"
                          onClick={(e) => handleOptionsClick(conversation.id, e)}
                        >
                          <FaEllipsisH />
                        </button>
                        
                        {/* Options dropdown */}
                        {showOptions === conversation.id && (
                          <div className="absolute right-4 top-12 z-10 w-48 bg-white rounded-md shadow-lg py-1">
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FaTrash className="mr-2 text-gray-400" />
                              Delete Conversation
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FaFlag className="mr-2 text-gray-400" />
                              Report User
                            </button>
                            <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <FaBan className="mr-2 text-gray-400" />
                              Block User
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <FaEnvelope className="mx-auto text-gray-400 mb-4" size={32} />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No conversations found</h3>
                    <p className="text-sm text-gray-500">
                      {searchTerm ? 'Try a different search term' : 'Start browsing to connect with potential matches'}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-500"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Area */}
            <div className="w-full md:w-2/3 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center">
                      {selectedConversation?.user.avatar ? (
                        <img 
                          src={selectedConversation.user.avatar} 
                          alt={selectedConversation.user.name} 
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <FaUser className="text-primary-600" />
                        </div>
                      )}
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{selectedConversation?.user.name}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          {selectedConversation?.user.isOnline ? (
                            <>
                              <FaCircle className="text-green-500 mr-1" size={8} />
                              <span>Online</span>
                            </>
                          ) : (
                            <>
                              <span>Last active: {selectedConversation?.user.lastActive}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Link 
                        to={`/profile/${selectedConversation?.user.id}`}
                        className="text-sm font-medium text-primary-600 hover:text-primary-500"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {mockMessages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                              message.isFromMe 
                                ? 'bg-primary-600 text-white' 
                                : 'bg-white text-gray-900 border border-gray-200'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 text-right ${
                              message.isFromMe ? 'text-primary-100' : 'text-gray-500'
                            }`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <form className="flex items-center">
                      <input
                        type="text"
                        className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Type a message..."
                      />
                      <button
                        type="submit"
                        className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700"
                      >
                        Send
                      </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2">
                      Remember to maintain Islamic etiquette in all communications.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center p-6">
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                      <FaEnvelope className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500 max-w-sm">
                      Choose a conversation from the list or start a new one by browsing potential matches.
                    </p>
                    <Link
                      to="/browse"
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                    >
                      Browse Matches
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-primary-50 rounded-lg p-6 border-l-4 border-primary-500">
          <h3 className="font-medium text-primary-800 mb-2">Communication Guidelines</h3>
          <p className="text-sm text-gray-600">
            Remember to maintain Islamic etiquette in all communications. Keep conversations respectful, modest, and focused on getting to know each other for marriage purposes. Family members can be added to conversations for proper chaperoning.
          </p>
          <Link 
            to="/guidelines" 
            className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Read Full Guidelines →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Messages
