import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiTrash2, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

export default function Cart() {
  const { items, total, remove, updateQty } = useCart()
  const { user }    = useAuth()
  const navigate    = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate('/connexion?redirect=/paiement')
    } else {
      navigate('/paiement')
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-24 min-h-screen bg-night flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag size={64} className="text-gold-500/40 mx-auto mb-6" />
          <h2 className="font-display text-2xl font-bold text-white mb-4">Votre panier est vide</h2>
          <p className="text-muted mb-8">Découvrez nos magnifiques foulards !</p>
          <Link to="/boutique" className="btn-gold">Visiter la boutique</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Panier — ChezAntaBada</title>
      </Helmet>

      <div className="pt-24 min-h-screen bg-night">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <h1 className="font-display text-3xl font-bold text-white mb-8">
            Mon panier <span className="text-gold-500">({items.length})</span>
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Items */}
            <div className="md:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item._id}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-card border border-border rounded-2xl p-4 flex gap-4 shadow-card"
                  >
                    <img
                      src={item.images?.[0] || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-20 h-24 rounded-xl object-cover bg-darker"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gold-500 mb-1">{item.category?.name}</p>
                      <h3 className="font-semibold text-white text-sm mb-2 line-clamp-1">{item.name}</h3>
                      <p className="font-bold text-gold-400">{item.price?.toLocaleString('fr-FR')} FCFA</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center border border-border rounded-full text-sm text-white">
                          <button onClick={() => item.qty > 1 ? updateQty(item._id, item.qty - 1) : remove(item._id)}
                                  className="px-3 py-1 hover:bg-border rounded-l-full transition-colors">−</button>
                          <span className="px-3 font-medium">{item.qty}</span>
                          <button onClick={() => updateQty(item._id, item.qty + 1)}
                                  className="px-3 py-1 hover:bg-border rounded-r-full transition-colors">+</button>
                        </div>
                        <button onClick={() => remove(item._id)}
                                className="text-red-400 hover:text-red-600 transition-colors ml-auto">
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right font-bold text-white">
                      {(item.price * item.qty).toLocaleString('fr-FR')} FCFA
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="bg-card border border-border text-white rounded-2xl p-6 h-fit sticky top-28 shadow-card">
              <h2 className="font-display text-xl font-bold mb-6">Récapitulatif</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-white/70">Sous-total</span>
                  <span>{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Livraison</span>
                  <span className="text-gold-400">Gratuite</span>
                </div>
                <hr className="border-white/20" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold-400">{total.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="btn-gold w-full flex items-center justify-center gap-2">
                Commander <FiArrowRight />
              </button>
              <Link to="/boutique" className="block text-center text-white/50 text-sm mt-4 hover:text-white transition-colors">
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
