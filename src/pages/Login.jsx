import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      navigate(user.role === 'admin' ? '/admin' : '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants incorrects')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Connexion — ChezAntaBada</title></Helmet>
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-gold-500 mb-1">ChezAntaBada</h1>
            <p className="font-script text-gray-500 text-lg">Bon retour ✨</p>
            <p className="text-gray-500 text-sm mt-1">Connectez-vous à votre compte</p>
          </div>

          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200
                       rounded-full py-3 hover:bg-gray-50 transition-colors mb-6 font-medium text-sm"
          >
            <FcGoogle size={20} /> Continuer avec Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" required placeholder="Votre email"
                     value={form.email}
                     onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                     className="input-field pl-11" />
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPwd ? 'text' : 'password'} required placeholder="Mot de passe"
                     value={form.password}
                     onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                     className="input-field pl-11 pr-12" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showPwd ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <button type="submit" disabled={loading}
                    className="btn-gold w-full py-3 text-base disabled:opacity-70">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/inscription" className="text-gold-500 font-medium hover:underline">
              S'inscrire
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  )
}
