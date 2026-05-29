import { useEffect, useState } from 'react'
import { api } from '../api'

export default function useRegistrations() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadRegistrations() {
    try {
      const res = await api.get('/registrations')
      setRegistrations(res.data)
    } catch (error) {
      console.error('Failed to fetch registrations:', error)
      setRegistrations([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRegistrations()
  }, [])

  return {
    registrations,
    setRegistrations,
    loading,
    reload: loadRegistrations,
  }
}