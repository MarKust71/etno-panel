import { api } from '../api/config'
import { useState } from 'react'

export const usePlaces = () => {
  const [isLoading, setIsLoading] = useState(false)

  const getPlaces = async () => {
    try {
      setIsLoading(true)
      const response = await api.get('/places', {
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

  const getPlace = async (id) => {
    try {
      setIsLoading(true)
      const response = await api.get(`/places/show/${id}`, {
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

  const updatePlace = async (id, payload) => {
    if (!id || !payload) return null

    try {
      setIsLoading(true)
      const response = await api.post(`/places/edit/${id}`, payload, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; charset=UTF-8',
        },
      })
      setIsLoading(false)

      // TODO: remove!
      console.log(response)

      return response.data
    } catch (error) {
      setIsLoading(false)
      console.log('Error:', error)

      return null
    }
  }

  const deletePlace = async (id) => {
    try {
      setIsLoading(true)
      const response = await api.post(`/places/delete/${id}`, {
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

  return { getPlaces, getPlace, updatePlace, deletePlace, isLoading }
}
