import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('cab_token')
    if (token) {
      authService.getMe()
        .then(data => setUser(data))
        .catch(() => localStorage.removeItem('cab_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const { user, token } = await authService.login({ email, password })
    localStorage.setItem('cab_token', token)
    setUser(user)
    toast.success(`Bienvenue, ${user.firstName} ! ✨`)
    return user
  }

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL?.replace('/api', '')}/api/auth/google`
  }

  const register = async (data) => {
    const { user, token } = await authService.register(data)
    localStorage.setItem('cab_token', token)
    setUser(user)
    toast.success('Compte créé avec succès ! 🎉')
    return user
  }

  const logout = () => {
    localStorage.removeItem('cab_token')
    setUser(null)
    toast('À bientôt ! 👋')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
