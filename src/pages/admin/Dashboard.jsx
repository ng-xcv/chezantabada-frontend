import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiPackage, FiShoppingBag, FiUsers, FiAlertTriangle,
  FiPlus, FiTrendingUp, FiDollarSign
} from 'react-icons/fi'
import api from '@/services/api'
import Loader from '@/components/ui/Loader'

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn:  () => api.get('/admin/stats').then(r => r.data),
    refetchInterval: 30000,
  })

  const CARDS = [
    { icon: FiShoppingBag,   label: 'Commandes',  value: stats?.orders,   color: 'text-blue-400',  bg: 'bg-blue-500/10 border-blue-500/20',   to: '/admin/commandes' },
    { icon: FiPackage,       label: 'Produits',   value: stats?.products, color: 'text-gold-400',  bg: 'bg-gold-500/10 border-gold-500/20',   to: '/admin/produits'  },
    { icon: FiUsers,         label: 'Clients',    value: stats?.users,    color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', to: null               },
    { icon: FiAlertTriangle, label: 'Ruptures',   value: stats?.lowStock, color: 'text-red-400',   bg: 'bg-red-500/10 border-red-500/20',     to: null               },
  ]

  if (isLoading) return <Loader />

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-muted mt-1">Bienvenue dans votre espace admin ✨</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/produits" className="btn-gold flex items-center gap-2 text-sm px-4 py-2">
            <FiPlus size={15} /> Nouveau produit
          </Link>
          <Link to="/admin/categories" className="btn-outline-gold flex items-center gap-2 text-sm px-4 py-2">
            <FiPlus size={15} /> Catégorie
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {CARDS.map((card, i) => (
          <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" animate="visible">
            {card.to ? (
              <Link to={card.to}
                    className={`block card-dark p-5 border ${card.bg} hover:scale-[1.02] transition-transform`}>
                <CardContent card={card} />
              </Link>
            ) : (
              <div className={`card-dark p-5 border ${card.bg}`}>
                <CardContent card={card} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Revenue */}
      {stats?.revenue > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="card-dark p-6 border border-gold-500/20">
          <div className="flex items-center gap-3 mb-2">
            <FiDollarSign className="text-gold-400" size={20} />
            <h2 className="font-semibold text-white">Chiffre d'affaires</h2>
          </div>
          <p className="text-3xl font-bold gold-text">
            {stats.revenue.toLocaleString('fr-FR')} FCFA
          </p>
          <p className="text-xs text-muted mt-1">Commandes payées + livrées</p>
        </motion.div>
      )}

      {/* Stock alerts */}
      {stats?.lowStockProducts?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="card-dark p-6 border border-red-500/30">
          <h2 className="font-semibold text-red-400 flex items-center gap-2 mb-4">
            <FiAlertTriangle /> Alertes stock faible ({stats.lowStockProducts.length})
          </h2>
          <div className="space-y-3">
            {stats.lowStockProducts.map(p => (
              <div key={p._id} className="flex justify-between items-center">
                <span className="text-sm text-white/80">{p.name}</span>
                <span className="badge-gold">{p.stock} restant{p.stock > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick links */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { to: '/admin/produits',   icon: FiPackage,     label: 'Gérer les produits',   desc: 'Ajouter, modifier, supprimer' },
          { to: '/admin/categories', icon: FiTrendingUp,  label: 'Gérer les catégories', desc: 'Organiser le catalogue'       },
          { to: '/admin/commandes',  icon: FiShoppingBag, label: 'Voir les commandes',   desc: 'Suivre et mettre à jour'      },
        ].map(({ to, icon: Icon, label, desc }) => (
          <Link key={to} to={to}
                className="card-dark p-5 border border-border hover:border-gold-500/40
                           transition-all hover:-translate-y-1 group">
            <Icon size={22} className="text-gold-400 mb-3 group-hover:scale-110 transition-transform" />
            <p className="font-semibold text-white text-sm mb-1">{label}</p>
            <p className="text-xs text-muted">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function CardContent({ card }) {
  return (
    <>
      <card.icon size={22} className={`${card.color} mb-3`} />
      <p className={`text-3xl font-bold ${card.color}`}>{card.value ?? '—'}</p>
      <p className="text-sm text-muted mt-1">{card.label}</p>
    </>
  )
}
