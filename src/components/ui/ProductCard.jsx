import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiHeart } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { add }           = useCart()
  const [liked, setLiked] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    add(product)
    toast.success('Ajouté au panier ✨', { icon: '🛍️' })
  }

  const images = product.images?.length ? product.images : ['/placeholder.jpg']

  return (
    <Link to={`/produit/${product._id}`}>
      <div className="card-product group relative">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/4] bg-silk">
          <img
            src={images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = '/placeholder.jpg' }}
          />

          {product.isNew && (
            <span className="absolute top-3 left-3 bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Nouveau
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Rupture
            </span>
          )}

          {/* Hover actions */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100
                          transition-opacity flex items-end justify-center pb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="bg-white text-ink rounded-full px-5 py-2 text-sm font-medium
                         hover:bg-gold-500 hover:text-white transition-colors flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingBag size={14} /> Ajouter
            </motion.button>
          </div>

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur
                       flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <FiHeart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
          </button>

          {/* Image dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setImgIdx(i)}
                  onClick={e => { e.preventDefault(); setImgIdx(i) }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === imgIdx ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-gold-500 font-medium mb-1 uppercase tracking-wider">
            {product.category?.name || 'Foulard'}
          </p>
          <h3 className="font-display font-semibold text-ink text-sm line-clamp-1 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-bold text-ink">
              {product.price?.toLocaleString('fr-FR')} FCFA
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.oldPrice.toLocaleString('fr-FR')} FCFA
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
