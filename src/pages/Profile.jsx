import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiUser, FiSave } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    email:     user?.email     || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.updateProfile(form)
      toast.success('Profil mis à jour ✅')
    } catch {
      toast.error('Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Mon profil — ChezAntaBada</title></Helmet>
      <div className="pt-24 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-10 max-w-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
              <FiUser className="text-gold-500" size={24} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Mon profil</h1>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Prénom</label>
                  <input type="text" value={form.firstName}
                         onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                         className="input-field text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Nom</label>
                  <input type="text" value={form.lastName}
                         onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                         className="input-field text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input type="email" value={form.email} disabled
                       className="input-field text-sm opacity-60 cursor-not-allowed" />
              </div>
              <button type="submit" disabled={loading}
                      className="btn-gold flex items-center gap-2 disabled:opacity-70">
                <FiSave size={16} /> {loading ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}
