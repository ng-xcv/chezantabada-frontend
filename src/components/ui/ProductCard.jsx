import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { add }             = useCart()
  const [liked, setLiked]   = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const [hovered, setHovered] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    add(product)
    toast.success('Ajouté au panier !', {
      icon: '🛍️',
      style: { background: '#111827', color: '#fff', border: '1px solid #C9A84C' },
    })
  }

  const images = product.images?.length
    ? product.images
    : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80']

  return (
    <Link to={`/produit/${product._id}`} className="block">
      <motion.div
        className="card-product group cursor-pointer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4] bg-card">
          <motion.img
            src={images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.5 }}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80' }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <span className="badge-blue">Nouveau</span>}
            {product.oldPrice && (
              <span className="badge-gold">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-gray-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                Rupture
              </span>
            )}
          </div>

          {/* Wishlist */}
          <motion.button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }}
            whileTap={{ scale: 0.85 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur
                       border border-border flex items-center justify-center
                       hover:border-gold-500/50 transition-all"
          >
            <FiHeart size={14} className={liked ? 'fill-red-400 text-red-400' : 'text-white/60'} />
          </motion.button>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="flex-1 bg-gold-500 text-black font-bold rounded-full py-2 text-xs
                         hover:bg-gold-400 transition-colors flex items-center justify-center gap-1.5
                         shadow-gold-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingBag size={13} /> Ajouter
            </button>
            <Link to={`/produit/${product._id}`}
                  onClick={e => e.stopPropagation()}
                  className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center
                             hover:bg-blue-600 transition-colors shadow-blue-sm flex-shrink-0">
              <FiEye size={13} className="text-white" />
            </Link>
          </motion.div>

          {/* Image dots */}
          {images.length > 1 && (
            <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-1.5">
              {images.map((_, i) => (
                <button key={i}
                        onMouseEnter={() => setImgIdx(i)}
                        onClick={e => { e.preventDefault(); setImgIdx(i) }}
                        className={`rounded-full transition-all duration-200 ${
                          i === imgIdx ? 'w-2 h-4 bg-gold-500' : 'w-2 h-2 bg-white/40'
                        }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4 bg-card">
          <p className="text-xs text-blue-400 font-semibold mb-1 uppercase tracking-wider">
            {product.category?.name || 'Hijab'}
          </p>
          <h3 className="font-display font-semibold text-white text-sm line-clamp-1 mb-2.5
                         group-hover:text-gold-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gold-400">
                {product.price?.toLocaleString('fr-FR')} FCFA
              </span>
              {product.oldPrice && (
                <span className="text-xs text-muted line-through">
                  {product.oldPrice.toLocaleString('fr-FR')}
                </span>
              )}
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <span className="text-xs text-gold-500 font-medium">⚡ {product.stock}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
