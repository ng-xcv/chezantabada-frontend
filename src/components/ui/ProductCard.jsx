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

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    add(product)
    toast.success('Ajouté au panier !', { icon: '🛍️' })
  }

  const images = product.images?.length
    ? product.images
    : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80']

  return (
    <Link to={`/produit/${product._id}`} className="block">
      <div className="card-product group cursor-pointer">
        {/* Image container */}
        <div className="relative overflow-hidden aspect-[3/4] bg-silk">
          <img
            src={images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80' }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="badge-blue">Nouveau</span>
            )}
            {product.oldPrice && (
              <span className="badge-gold">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
            {product.stock === 0 && (
              <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Rupture
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md
                       flex items-center justify-center hover:scale-110 transition-transform"
          >
            <FiHeart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover:opacity-100
                          transition-all duration-300 flex items-center justify-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="bg-white text-blue-600 font-semibold rounded-full px-4 py-2 text-xs
                         hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-1.5
                         shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingBag size={13} /> Ajouter
            </motion.button>
            <Link to={`/produit/${product._id}`}
                  className="bg-white text-blue-600 rounded-full w-9 h-9 flex items-center
                             justify-center hover:bg-blue-500 hover:text-white transition-colors shadow-lg"
                  onClick={e => e.stopPropagation()}
            >
              <FiEye size={13} />
            </Link>
          </div>

          {/* Image dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button key={i}
                        onMouseEnter={() => setImgIdx(i)}
                        onClick={e => { e.preventDefault(); setImgIdx(i) }}
                        className={`rounded-full transition-all duration-200 ${
                          i === imgIdx ? 'w-4 h-2 bg-blue-500' : 'w-2 h-2 bg-white/70'
                        }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4">
          <p className="text-xs text-blue-500 font-semibold mb-1 uppercase tracking-wider">
            {product.category?.name || 'Hijab'}
          </p>
          <h3 className="font-display font-semibold text-ink text-sm line-clamp-1 mb-2.5 group-hover:text-blue-500 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-ink">
                {product.price?.toLocaleString('fr-FR')} FCFA
              </span>
              {product.oldPrice && (
                <span className="text-xs text-muted line-through">
                  {product.oldPrice.toLocaleString('fr-FR')}
                </span>
              )}
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <span className="text-xs text-gold-600 font-medium">⚡ {product.stock} restant</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
