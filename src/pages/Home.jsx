import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '@/components/ui/ProductCard'
import { FiArrowRight, FiStar, FiTruck, FiAward, FiHeart, FiShield } from 'react-icons/fi'

const TESTIMONIALS = [
  { name: 'Fatou D.',   text: 'Qualité exceptionnelle, le hijab est encore plus beau en vrai !', stars: 5 },
  { name: 'Mariama B.', text: 'Livraison super rapide et emballage magnifique. Je recommande !',  stars: 5 },
  { name: 'Aminata S.', text: 'Service client au top, je suis conquise par ChezAntaBada !',       stars: 5 },
]

const VALUES = [
  { icon: FiAward,  label: 'Qualité premium',     desc: 'Matières naturelles sélectionnées' },
  { icon: FiTruck,  label: 'Livraison rapide',     desc: 'Partout au Sénégal & Afrique'     },
  { icon: FiHeart,  label: 'Fait avec amour',      desc: 'Collections exclusives artisanales'},
  { icon: FiShield, label: 'Paiement sécurisé',    desc: 'Stripe SSL certifié'               },
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
        <meta name="description" content="Découvrez notre collection exclusive de hijabs élégants. Qualité premium, livraison rapide." />
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] bg-hero-gradient overflow-hidden flex items-center">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo animé */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex justify-center"
            >
              <motion.img
                src="/logo.png"
                alt="ChezAntaBada"
                className="h-32 w-auto drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                onError={e => { e.target.style.display='none' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-script text-gold-300 text-2xl mb-2">Bienvenue chez</p>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-3 leading-tight">
                Chez<span className="text-blue-300">Anta</span>Bada
              </h1>
              <p className="text-gold-300 font-semibold tracking-[0.4em] text-sm mb-6 uppercase">
                ✦ Hijab Fashion ✦
              </p>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Des hijabs et foulards d'exception pour la femme élégante moderne.
                <br />Qualité premium · Livraison rapide · Made with ❤️
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/boutique"
                      className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full
                                 hover:bg-blue-50 active:scale-95 transition-all duration-200
                                 shadow-xl inline-flex items-center gap-2 text-base">
                  Découvrir la collection <FiArrowRight />
                </Link>
                <Link to="/boutique?featured=true"
                      className="border-2 border-gold-400 text-gold-300 font-semibold px-8 py-4
                                 rounded-full hover:bg-gold-500 hover:text-white hover:border-gold-500
                                 transition-all duration-200 inline-flex items-center gap-2 text-base">
                  Pièces phares ✨
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-blue-100 hover:border-blue-300
                           hover:shadow-blue-sm transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center
                                mx-auto mb-3 group-hover:bg-blue-500 transition-colors duration-300">
                  <v.icon size={22} className="text-blue-500 group-hover:text-white transition-colors" />
                </div>
                <p className="font-semibold text-ink text-sm mb-1">{v.label}</p>
                <p className="text-xs text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-gold-500 text-2xl mb-2">Notre sélection</p>
            <h2 className="section-title mb-3">Pièces phares</h2>
            <div className="w-20 h-1 bg-gold-gradient rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(data?.products || []).map((product, i) => (
              <motion.div key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
            {!data?.products?.length && Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-blue-100" />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/boutique" className="btn-outline-blue inline-flex items-center gap-2">
              Voir tout le catalogue <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-blue-500 text-2xl mb-2">Notre univers</p>
            <h2 className="section-title mb-3">Nos Collections</h2>
            <div className="w-20 h-1 bg-blue-gradient rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Hijab Soie',   desc: 'Luxe & légèreté',     img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80' },
              { name: 'Hijab Coton',  desc: 'Confort au quotidien', img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80' },
              { name: 'Foulard Luxe', desc: 'Éditions exclusives',  img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80' },
            ].map((cat, i) => (
              <motion.div key={i}
                whileHover={{ y: -4 }}
                className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer
                           shadow-blue-sm hover:shadow-blue-md transition-all duration-300"
              >
                <img src={cat.img} alt={cat.name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     onError={e => { e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-600/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-gold-300 text-sm mb-3">{cat.desc}</p>
                  <Link to="/boutique"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white
                                   bg-blue-500/80 hover:bg-blue-500 px-4 py-1.5 rounded-full
                                   transition-colors backdrop-blur-sm">
                    Voir →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-script text-gold-500 text-2xl mb-2">Elles témoignent</p>
            <h2 className="section-title mb-3">Ce qu'elles disent</h2>
            <div className="w-20 h-1 bg-gold-gradient rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-blue-100 shadow-blue-sm
                           hover:shadow-blue-md hover:border-blue-300 transition-all duration-300"
              >
                <div className="flex gap-1 mb-3">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <FiStar key={j} className="fill-gold-400 text-gold-400" size={16} />
                  ))}
                </div>
                <p className="text-muted mb-4 italic text-sm leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <p className="font-semibold text-blue-600 text-sm">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-20 bg-hero-gradient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-script text-gold-300 text-2xl mb-3">Prête ?</p>
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Sublimez votre style
            </h2>
            <p className="text-white/70 mb-8 text-lg max-w-md mx-auto">
              Trouvez le hijab parfait dans notre collection exclusive.
            </p>
            <Link to="/boutique"
                  className="bg-white text-blue-600 font-bold px-10 py-4 rounded-full
                             hover:bg-blue-50 transition-colors inline-flex items-center gap-2
                             text-lg shadow-xl">
              Visiter la boutique <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
