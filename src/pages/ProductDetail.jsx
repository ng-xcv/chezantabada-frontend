import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import { productService } from '@/services/productService'
import { useCart } from '@/context/CartContext'
import Loader from '@/components/ui/Loader'
import toast from 'react-hot-toast'

export default function ProductDetail() {
  const { id }           = useParams()
  const { add }          = useCart()
  const [mainImg, setMainImg] = useState(0)
  const [qty, setQty]    = useState(1)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn:  () => productService.getOne(id),
  })

  if (isLoading) return <div className="pt-24"><Loader /></div>
  if (!product)  return (
    <div className="pt-24 text-center py-20">
      <p className="text-gray-500">Produit introuvable.</p>
      <Link to="/boutique" className="btn-gold mt-4 inline-block">Retour boutique</Link>
    </div>
  )

  const images = product.images?.length ? product.images : ['/placeholder.jpg']

  return (
    <>
      <Helmet>
        <title>{product.name} — ChezAntaBada</title>
        <meta name="description" content={product.description?.slice(0, 160)} />
      </Helmet>

      <div className="pt-24 min-h-screen bg-cream">
        <div className="container mx-auto px-4 py-10">
          {/* Back */}
          <Link to="/boutique" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gold-500 mb-8 transition-colors">
            <FiArrowLeft size={14} /> Retour à la boutique
          </Link>

          <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 shadow-sm">
            {/* Gallery */}
            <div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-silk mb-4">
                <motion.img
                  key={mainImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={images[mainImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = '/placeholder.jpg' }}
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImg(i)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        i === mainImg ? 'border-gold-500' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-xs text-gold-500 font-medium uppercase tracking-widest mb-2">
                {product.category?.name}
              </p>
              <h1 className="font-display text-3xl font-bold text-ink mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-ink">
                  {product.price?.toLocaleString('fr-FR')} FCFA
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.oldPrice.toLocaleString('fr-FR')} FCFA
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              {/* Details */}
              {(product.material || product.dimensions) && (
                <div className="bg-cream rounded-xl p-4 mb-6 space-y-2 text-sm">
                  {product.material   && <p><span className="font-medium">Matière :</span> {product.material}</p>}
                  {product.dimensions && <p><span className="font-medium">Dimensions :</span> {product.dimensions}</p>}
                </div>
              )}

              {/* Stock */}
              <div className="mb-6">
                {product.stock === 0 ? (
                  <span className="text-red-500 font-medium text-sm">⚠️ Rupture de stock</span>
                ) : product.stock <= 5 ? (
                  <span className="text-orange-500 font-medium text-sm">⚡ Plus que {product.stock} en stock !</span>
                ) : (
                  <span className="text-green-600 font-medium text-sm">✅ En stock</span>
                )}
              </div>

              {/* Qty + Add */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="flex items-center border-2 border-gray-200 rounded-full overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                          className="px-4 py-3 hover:bg-gray-50 transition-colors font-bold">−</button>
                  <span className="px-4 font-semibold">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                          className="px-4 py-3 hover:bg-gray-50 transition-colors font-bold">+</button>
                </div>
                <button
                  onClick={() => {
                    for (let i = 0; i < qty; i++) add(product)
                    toast.success(`${qty} article(s) ajouté(s) ✨`, { icon: '🛍️' })
                  }}
                  disabled={product.stock === 0}
                  className="btn-gold flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FiShoppingBag /> Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
