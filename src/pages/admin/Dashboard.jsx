import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiPackage, FiShoppingBag, FiUsers, FiAlertTriangle, FiPlus } from 'react-icons/fi'
import api from '@/services/api'
import Loader from '@/components/ui/Loader'

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/admin/stats').then(r => r.data),
  })

  const CARDS = [
    { icon: FiShoppingBag,   label: 'Commandes', value: stats?.orders,   color: 'bg-blue-500',  to: '/admin/commandes' },
    { icon: FiPackage,       label: 'Produits',  value: stats?.products, color: 'bg-gold-500',  to: '/admin/produits'  },
    { icon: FiUsers,         label: 'Clients',   value: stats?.users,    color: 'bg-green-500', to: null               },
    { icon: FiAlertTriangle, label: 'Ruptures',  value: stats?.lowStock, color: 'bg-red-500',   to: null               },
  ]

  if (isLoading) return <Loader />

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Espace admin ChezAntaBada 🛠️</p>
        </div>
        <Link to="/admin/produits" className="btn-gold flex items-center gap-2 text-sm">
          <FiPlus /> Nouveau produit
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-4`}>
              <card.icon className="text-white" size={20} />
            </div>
            <p className="text-3xl font-bold">{card.value ?? '—'}</p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {stats?.lowStockProducts?.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <h2 className="font-semibold text-red-700 flex items-center gap-2 mb-4">
            <FiAlertTriangle /> Alertes stock faible
          </h2>
          <div className="space-y-2">
            {stats.lowStockProducts.map(p => (
              <div key={p._id} className="flex justify-between items-center text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-red-600 font-bold">{p.stock} restant(s)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
