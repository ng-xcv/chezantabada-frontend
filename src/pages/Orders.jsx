import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { orderService } from '@/services/orderService'
import Loader from '@/components/ui/Loader'

const STATUS_MAP = {
  pending:    { label: 'En attente',  color: 'bg-yellow-100 text-yellow-700' },
  paid:       { label: 'Payée',       color: 'bg-blue-100 text-blue-700'     },
  processing: { label: 'En cours',    color: 'bg-purple-100 text-purple-700' },
  shipped:    { label: 'Expédiée',    color: 'bg-indigo-100 text-indigo-700' },
  delivered:  { label: 'Livrée',      color: 'bg-green-100 text-green-700'   },
  cancelled:  { label: 'Annulée',     color: 'bg-red-100 text-red-700'       },
}

export default function Orders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn:  orderService.getMyOrders,
  })

  return (
    <>
      <Helmet><title>Mes commandes — ChezAntaBada</title></Helmet>
      <div className="pt-24 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          <h1 className="font-display text-3xl font-bold mb-8">Mes commandes</h1>
          {isLoading ? (
            <Loader />
          ) : !orders?.length ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">📦</p>
              <p>Aucune commande pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => {
                const status = STATUS_MAP[order.status] || STATUS_MAP.pending
                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-mono text-xs text-gray-400">#{order._id.slice(-8).toUpperCase()}</p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {order.items.slice(0, 3).map((item, j) => (
                        <img key={j} src={item.image || '/placeholder.jpg'} alt={item.name}
                             className="w-12 h-14 rounded-lg object-cover bg-silk" />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{order.items.length} article(s)</span>
                      <span className="font-bold">{order.totalAmount?.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
