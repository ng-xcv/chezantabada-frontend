import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) return setError('Mot de passe trop court (6 caractères min.)')
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Inscription — ChezAntaBada</title></Helmet>
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-gold-500 mb-1">ChezAntaBada</h1>
            <p className="text-gray-500 text-sm">Créer votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input type="text" required placeholder="Prénom"
                       value={form.firstName}
                       onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                       className="input-field pl-10 text-sm" />
              </div>
              <input type="text" required placeholder="Nom"
                     value={form.lastName}
                     onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                     className="input-field text-sm" />
            </div>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" required placeholder="Email"
                     value={form.email}
                     onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                     className="input-field pl-11" />
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={showPwd ? 'text' : 'password'} required placeholder="Mot de passe (6 min)"
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
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/connexion" className="text-gold-500 font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  )
}
