import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem('userToken') || null
  )
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (userToken) {
        console.log('Token used:', userToken) // Log the token
        const { id } = JSON.parse(atob(userToken.split('.')[1]))
        console.log('ID extracted from token:', id)
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/auth/user/userByID/${id}`,
            {
              headers: { Authorization: `Bearer ${userToken}` }
            }
          )
          console.log('API response:', response.data)
          setUserData(response.data)
        } catch (err) {
          console.error(
            'Failed to fetch user data:',
            err.response || err.message
          )
          localStorage.removeItem('userToken')
          setUserToken(null)
        }
      }
    }

    fetchUserData()
  }, [userToken])

  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userData, setUserData, loading, error }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
