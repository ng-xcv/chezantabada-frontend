import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiHeart } from 'react-icons/fi'
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
    toast.success('Ajouté au panier ✨', { icon: '🛍️' })
  }

  const images = product.images?.length ? product.images : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80']

  return (
    <Link to={`/produit/${product._id}`}>
      <div className="card-product group relative">
        <div className="relative overflow-hidden aspect-[3/4] bg-silk">
          <img
            src={images[imgIdx]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80' }}
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Nouveau
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Rupture
            </span>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100
                          transition-opacity flex items-end justify-center pb-4">
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleAdd}
              disabled={product.stock === 0}
              className="bg-blue-500 text-white rounded-full px-5 py-2 text-sm font-medium
                         hover:bg-blue-600 transition-colors flex items-center gap-2
                         disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              <FiShoppingBag size={14} /> Ajouter
            </motion.button>
          </div>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur
                       flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <FiHeart size={14} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
          </button>
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
              {images.map((_, i) => (
                <button key={i} onMouseEnter={() => setImgIdx(i)}
                        onClick={e => { e.preventDefault(); setImgIdx(i) }}
                        className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-blue-500 font-medium mb-1 uppercase tracking-wider">
            {product.category?.name || 'Hijab'}
          </p>
          <h3 className="font-display font-semibold text-ink text-sm line-clamp-1 mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-bold text-ink">{product.price?.toLocaleString('fr-FR')} FCFA</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">{product.oldPrice.toLocaleString('fr-FR')} FCFA</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
