import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { orderService } from '@/services/orderService'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder')

function CheckoutForm() {
  const stripe   = useStripe()
  const elements = useElements()
  const { items, total, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
    phone: '', street: '', city: '', country: 'Sénégal',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    try {
      const { clientSecret, orderId } = await orderService.createPaymentIntent({ items, address, total })
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: address.fullName },
        },
      })
      if (error) throw new Error(error.message)
      await orderService.confirmOrder(orderId, paymentIntent.id)
      clear()
      toast.success('Commande confirmée ! 🎉')
      navigate('/commandes')
    } catch (err) {
      toast.error(err.message || 'Erreur lors du paiement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold mb-4">Adresse de livraison</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: 'fullName', label: 'Nom complet', type: 'text' },
            { key: 'phone',    label: 'Téléphone',   type: 'tel'  },
            { key: 'street',   label: 'Adresse',     type: 'text' },
            { key: 'city',     label: 'Ville',       type: 'text' },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
              <input type={type} required value={address[key]}
                     onChange={e => setAddress(a => ({ ...a, [key]: e.target.value }))}
                     className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5
                                focus:border-gold-500 focus:outline-none text-sm" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-display text-xl font-bold mb-4">Paiement sécurisé</h2>
        <div className="border-2 border-gray-200 rounded-xl p-4">
          <CardElement options={{
            style: { base: { fontSize: '16px', color: '#111', '::placeholder': { color: '#aaa' } } }
          }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">🔒 Paiement sécurisé par Stripe</p>
      </div>

      <div className="bg-ink text-white rounded-2xl p-6">
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between"><span>Sous-total</span><span>{total.toLocaleString('fr-FR')} FCFA</span></div>
          <div className="flex justify-between"><span>Livraison</span><span className="text-gold-400">Gratuite</span></div>
          <hr className="border-white/20" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-gold-400">{total.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>
        <button type="submit" disabled={loading || !stripe}
                className="btn-gold w-full py-4 text-lg disabled:opacity-70">
          {loading ? '⏳ Traitement...' : `Payer ${total.toLocaleString('fr-FR')} FCFA`}
        </button>
      </div>
    </form>
  )
}

export default function Checkout() {
  const { items } = useCart()
  if (items.length === 0) return <Link to="/panier" />
  return (
    <>
      <Helmet><title>Paiement — ChezAntaBada</title></Helmet>
      <div className="pt-24 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <h1 className="font-display text-3xl font-bold mb-8">Finaliser la commande</h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  )
}
