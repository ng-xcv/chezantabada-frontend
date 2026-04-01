import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import api from '@/services/api'
import Loader from '@/components/ui/Loader'
import toast from 'react-hot-toast'

const STATUSES = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled']
const STATUS_MAP = {
  pending:    'bg-yellow-100 text-yellow-700',
  paid:       'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
}
const STATUS_LABELS = {
  pending: 'En attente', paid: 'Payée', processing: 'En cours',
  shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée',
}

export default function AdminOrders() {
  const qc = useQueryClient()
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => api.get('/admin/orders').then(r => r.data),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, status }) => api.put(`/admin/orders/${id}`, { status }).then(r => r.data),
    onSuccess: () => {
      qc.invalidateQueries(['admin-orders'])
      toast.success('Statut mis à jour ✅')
    },
  })

  if (isLoading) return <Loader />

  return (
    <div className="p-6">
      <h1 className="font-display text-3xl font-bold mb-8">Commandes</h1>
      <div className="space-y-4">
        {(orders || []).map((order, i) => (
          <motion.div key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-mono text-xs text-gray-400">#{order._id.slice(-8).toUpperCase()}</p>
                <p className="font-semibold">{order.user?.firstName} {order.user?.lastName}</p>
                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gold-500">{order.totalAmount?.toLocaleString('fr-FR')} FCFA</p>
                <select
                  value={order.status}
                  onChange={e => updateMut.mutate({ id: order._id, status: e.target.value })}
                  className={`mt-1 text-xs font-semibold px-2 py-1 rounded-full border-0
                              focus:outline-none cursor-pointer ${STATUS_MAP[order.status]}`}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {order.items?.map(i => `${i.name} ×${i.qty}`).join(', ')}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
