import { useState, useEffect } from 'react'
import { db } from '../firebase/config'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'

export const useFirestore = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Generic function to get a document by ID
  const getDocument = async (collectionName, id) => {
    setLoading(true)
    setError(null)
    try {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)
      
      setLoading(false)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        return null
      }
    } catch (err) {
      console.error(`Error getting document from ${collectionName}:`, err)
      setError(`Failed to get document: ${err.message}`)
      setLoading(false)
      return null
    }
  }

  // Generic function to get all documents from a collection
  const getCollection = async (collectionName, constraints = []) => {
    setLoading(true)
    setError(null)
    try {
      let q = collection(db, collectionName)
      
      if (constraints.length > 0) {
        q = query(q, ...constraints)
      }
      
      const querySnapshot = await getDocs(q)
      const documents = []
      
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() })
      })
      
      setLoading(false)
      return documents
    } catch (err) {
      console.error(`Error getting collection ${collectionName}:`, err)
      setError(`Failed to get collection: ${err.message}`)
      setLoading(false)
      return []
    }
  }

  // Generic function to add a document to a collection
  const addDocument = async (collectionName, data) => {
    setLoading(true)
    setError(null)
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      })
      
      setLoading(false)
      return { id: docRef.id, ...data }
    } catch (err) {
      console.error(`Error adding document to ${collectionName}:`, err)
      setError(`Failed to add document: ${err.message}`)
      setLoading(false)
      return null
    }
  }

  // Generic function to update a document
  const updateDocument = async (collectionName, id, data) => {
    setLoading(true)
    setError(null)
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      })
      
      setLoading(false)
      return true
    } catch (err) {
      console.error(`Error updating document in ${collectionName}:`, err)
      setError(`Failed to update document: ${err.message}`)
      setLoading(false)
      return false
    }
  }

  // Generic function to delete a document
  const deleteDocument = async (collectionName, id) => {
    setLoading(true)
    setError(null)
    try {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)
      
      setLoading(false)
      return true
    } catch (err) {
      console.error(`Error deleting document from ${collectionName}:`, err)
      setError(`Failed to delete document: ${err.message}`)
      setLoading(false)
      return false
    }
  }

  // Function to get user profile
  const getUserProfile = async (userId) => {
    return await getDocument('profiles', userId)
  }

  // Function to update user profile
  const updateUserProfile = async (userId, profileData) => {
    return await updateDocument('profiles', userId, profileData)
  }

  // Function to get potential matches
  const getPotentialMatches = async (userId, criteria = {}) => {
    const constraints = []
    
    // Add constraints based on criteria
    if (criteria.gender) {
      constraints.push(where('gender', '==', criteria.gender))
    }
    
    if (criteria.ageMin && criteria.ageMax) {
      constraints.push(where('age', '>=', criteria.ageMin))
      constraints.push(where('age', '<=', criteria.ageMax))
    }
    
    if (criteria.location) {
      constraints.push(where('location', '==', criteria.location))
    }
    
    const matches = await getCollection('profiles', constraints)
    // Filter out the current user
    return matches.filter(match => match.id !== userId)
  }

  // Function to express interest in a profile
  const expressInterest = async (userId, targetUserId) => {
    return await addDocument('interests', {
      fromUserId: userId,
      toUserId: targetUserId,
      status: 'pending'
    })
  }

  // Function to get interests for a user (both sent and received)
  const getUserInterests = async (userId) => {
    const sentInterests = await getCollection('interests', [
      where('fromUserId', '==', userId)
    ])
    
    const receivedInterests = await getCollection('interests', [
      where('toUserId', '==', userId)
    ])
    
    return {
      sent: sentInterests,
      received: receivedInterests
    }
  }

  // Function to update interest status
  const updateInterestStatus = async (interestId, status) => {
    return await updateDocument('interests', interestId, { status })
  }

  return {
    error,
    loading,
    getDocument,
    getCollection,
    addDocument,
    updateDocument,
    deleteDocument,
    getUserProfile,
    updateUserProfile,
    getPotentialMatches,
    expressInterest,
    getUserInterests,
    updateInterestStatus
  }
}
