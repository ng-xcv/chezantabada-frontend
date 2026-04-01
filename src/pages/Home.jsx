import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
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
        <meta name="description" content="Découvrez notre collection exclusive de hijabs et foulards élégants. Qualité premium, livraison rapide." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="relative h-screen overflow-hidden bg-night">
        <div className="absolute inset-0 bg-hero-gradient" />
        {/* Glow effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
                        rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-20 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            {/* Logo large */}
            <motion.div
              animate={{ filter: ['drop-shadow(0 0 10px #2563EB80)', 'drop-shadow(0 0 30px #2563EB)', 'drop-shadow(0 0 10px #2563EB80)'] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-6 flex justify-center"
            >
              <img src="/logo.svg" alt="ChezAntaBada" className="h-24 w-auto mx-auto"
                   onError={e => { e.target.style.display='none' }} />
            </motion.div>

            <p className="font-script text-gold-400 text-2xl mb-3">Bienvenue chez</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-2">
              Chez<span className="text-blue-400">Anta</span><span className="logo-text">Bada</span>
            </h1>
            <p className="text-gold-300 font-medium tracking-[0.3em] text-sm mb-8">HIJAB FASHION</p>
            <p className="text-white/70 text-lg mb-10 max-w-lg mx-auto">
              Des hijabs et foulards d'exception pour la femme élégante. Qualité premium, livraison rapide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/boutique"
                    className="bg-blue-500 text-white font-medium px-8 py-4 rounded-full
                               hover:bg-blue-600 active:scale-95 transition-all duration-200
                               shadow-lg shadow-blue-500/30 inline-flex items-center gap-2 text-base">
                Découvrir la collection <FiArrowRight />
              </Link>
              <Link to="/boutique?featured=true"
                    className="border-2 border-gold-400 text-gold-400 font-medium px-8 py-4
                               rounded-full hover:bg-gold-500 hover:text-white hover:border-gold-500
                               transition-all duration-200 inline-flex items-center gap-2 text-base">
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
          <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-blue-400/70 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="bg-night text-white py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🌿', label: 'Matières naturelles' },
              { icon: '✨', label: 'Qualité premium'     },
              { icon: '🚚', label: 'Livraison rapide'    },
              { icon: '💎', label: 'Éditions limitées'   },
            ].map((v, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-3xl">{v.icon}</span>
                <p className="font-medium text-blue-300 text-sm">{v.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-blue-500 text-xl mb-2">Notre sélection</p>
            <h2 className="section-title">Pièces phares</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(data?.products || []).map((product, i) => (
              <motion.div key={product._id}
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
            <Link to="/boutique" className="btn-outline">Voir tout le catalogue</Link>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-20 bg-night">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-gold-400 text-xl mb-2">Notre univers</p>
            <h2 className="section-title text-white">Nos Collections</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Hijab Soie',
                desc: 'Luxe & légèreté',
                img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
                color: 'from-blue-900/80',
              },
              {
                name: 'Hijab Coton',
                desc: 'Confort au quotidien',
                img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80',
                color: 'from-night/80',
              },
              {
                name: 'Hijab Crêpe',
                desc: 'Élégance mate',
                img: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&q=80',
                color: 'from-blue-800/80',
              },
            ].map((cat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }}
                          className="relative h-72 rounded-2xl overflow-hidden cursor-pointer group">
                <img src={cat.img} alt={cat.name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     onError={e => { e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80' }} />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent`} />
                <Link to={`/boutique`} className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-display text-2xl font-bold">{cat.name}</h3>
                  <p className="text-blue-300 text-sm">{cat.desc}</p>
                  <span className="mt-2 inline-block text-xs text-gold-400 font-medium">Voir →</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-night text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-12 text-white">Ce qu'elles disent</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/40 transition-colors"
              >
                <div className="flex gap-1 mb-3 text-gold-400">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <FiStar key={j} className="fill-current" size={14} />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic text-sm">"{t.text}"</p>
                <p className="font-semibold text-blue-300 text-sm">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-blue-gradient text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl font-bold mb-4">Prête à sublimer votre style ?</h2>
          <p className="text-white/80 mb-8 text-lg">Découvrez notre collection complète et trouvez votre hijab idéal.</p>
          <Link to="/boutique"
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full
                           hover:bg-cream transition-colors inline-flex items-center gap-2 text-lg shadow-lg">
            Visiter la boutique <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
