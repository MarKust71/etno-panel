import { useState } from 'react'
import { api } from '../api/config'

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false)

  const getUsers = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/user/list', {
        headers: {
          Accept: 'application/json',
        },
      })
      setIsLoading(false)

      return response.data
    } catch (error) {
      setIsLoading(false)
      console.log('Error:', error)

      return null
    }
  }

  return { getUsers, isLoading }
}
