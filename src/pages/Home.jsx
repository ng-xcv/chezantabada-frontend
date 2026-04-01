import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '@/components/ui/ProductCard'
import { FiArrowRight, FiStar } from 'react-icons/fi'

const TESTIMONIALS = [
  { name: 'Fatou D.',    text: 'Qualité exceptionnelle, le foulard est encore plus beau en vrai !', stars: 5 },
  { name: 'Mariama B.',  text: 'Livraison super rapide et emballage magnifique. Je recommande !',   stars: 5 },
  { name: 'Aminata S.',  text: 'Le service client est au top, je suis conquise par ChezAntaBada.',  stars: 5 },
]

export default function Home() {
  const { data } = useQuery({
    queryKey: ['featured-products'],
    queryFn:  () => productService.getAll({ featured: true, limit: 8 }),
  })

  return (
    <>
      <Helmet>
        <title>ChezAntaBada — Hijab Fashion Haut de Gamme</title>
        <meta name="description" content="Découvrez notre collection exclusive de foulards et hijabs élégants. Qualité premium, livraison rapide." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="relative h-screen overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-script text-gold-400 text-2xl mb-4">Bienvenue chez</p>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white mb-6">
              Chez<span className="text-gold-400">Anta</span>Bada
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
              Des foulards d'exception pour la femme élégante. Qualité premium, livraison rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/boutique" className="btn-gold inline-flex items-center gap-2 text-base">
                Découvrir la collection <FiArrowRight />
              </Link>
              <Link to="/boutique?featured=true" className="btn-outline border-white text-white hover:bg-white hover:text-ink inline-flex items-center gap-2 text-base">
                Pièces phares
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="bg-ink text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🌿', label: 'Matières naturelles' },
              { icon: '✨', label: 'Qualité premium'     },
              { icon: '🚚', label: 'Livraison rapide'    },
              { icon: '💎', label: 'Éditions limitées'   },
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-3xl">{v.icon}</span>
                <p className="font-medium text-gold-300 text-sm">{v.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-gold-500 text-xl mb-2">Notre sélection</p>
            <h2 className="section-title">Pièces phares</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(data?.products || []).map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

            {!data?.products?.length && Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/boutique" className="btn-outline">
              Voir tout le catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Nos Collections</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Soie',  desc: 'Luxe & légèreté',     bg: 'bg-amber-100' },
              { name: 'Coton', desc: 'Confort au quotidien', bg: 'bg-blue-50'   },
              { name: 'Crêpe', desc: 'Élégance mate',        bg: 'bg-rose-50'   },
            ].map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`relative h-72 rounded-2xl overflow-hidden cursor-pointer group ${cat.bg} flex items-center justify-center`}
              >
                <Link to={`/boutique?category=${cat.name.toLowerCase()}`} className="text-center p-8">
                  <h3 className="font-display text-3xl font-bold text-ink mb-2">{cat.name}</h3>
                  <p className="text-gold-600">{cat.desc}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-gold-500 hover:underline">
                    Voir la collection →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-ink text-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-white text-center mb-12">Ce qu'elles disent</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-3 text-gold-400">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <FiStar key={j} className="fill-current" size={14} />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic text-sm">"{t.text}"</p>
                <p className="font-semibold text-gold-300 text-sm">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-gold-gradient text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl font-bold mb-4">Prête à sublimer votre style ?</h2>
          <p className="text-white/80 mb-8 text-lg">Découvrez notre collection complète et trouvez votre foulard idéal.</p>
          <Link to="/boutique" className="bg-white text-gold-600 font-bold px-8 py-4 rounded-full
                                          hover:bg-cream transition-colors inline-flex items-center gap-2 text-lg">
            Visiter la boutique <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
