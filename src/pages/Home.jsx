import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import ProductCard from '@/components/ui/ProductCard'
import { FiArrowRight, FiStar, FiTruck, FiAward, FiHeart, FiShield, FiInstagram, FiZap, FiGift } from 'react-icons/fi'
import { useRef } from 'react'
import WomanSilk3D from '@/components/hero/WomanSilk3D'

const TESTIMONIALS = [
  { name: 'Fatou D.',    city: 'Dakar',   text: 'Qualité exceptionnelle ! Le hijab est encore plus beau en vrai. Je recommande vivement.', stars: 5 },
  { name: 'Mariama B.',  city: 'Abidjan', text: 'Livraison super rapide, emballage cadeau magnifique. Ma sœur a adoré son cadeau !',        stars: 5 },
  { name: 'Aminata S.',  city: 'Conakry', text: 'Service client au top, je suis conquise par ChezAntaBada. Ma boutique préférée !',         stars: 5 },
  { name: 'Aïssatou K.', city: 'Bamako',  text: "Des couleurs sublimes, la soie est d'une douceur incroyable. Commande déjà passée !",    stars: 5 },
]

const VALUES = [
  { icon: FiAward,  label: 'Qualité premium',  desc: 'Matières naturelles certifiées', color: 'text-gold-400'  },
  { icon: FiTruck,  label: 'Livraison rapide',  desc: "Toute l'Afrique de l'Ouest",    color: 'text-blue-400'  },
  { icon: FiHeart,  label: 'Fait avec amour',   desc: 'Collections artisanales uniques',color: 'text-gold-400'  },
  { icon: FiShield, label: 'Paiement sécurisé', desc: 'Stripe SSL 256-bit',            color: 'text-blue-400'  },
]

const STATS = [
  { value: '2 500+', label: 'Clientes satisfaites' },
  { value: '150+',   label: 'Modèles disponibles'  },
  { value: '4.9/5',  label: 'Note moyenne'         },
  { value: '48h',    label: 'Délai de livraison'   },
]

const COLLECTIONS = [
  { name: 'Hijab Soie',   desc: 'Luxe & légèreté',     img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', tag: 'Bestseller' },
  { name: 'Hijab Crêpe',  desc: 'Élégance au quotidien',img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&q=80', tag: 'Nouveau'    },
  { name: 'Foulard Luxe', desc: 'Éditions exclusives',  img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', tag: 'Limité'     },
]

const PROMO_ITEMS = [
  { icon: FiZap,  text: 'Livraison offerte dès 30 000 FCFA' },
  { icon: FiGift, text: 'Emballage cadeau gratuit'          },
  { icon: FiStar, text: 'Programme fidélité — points cadeaux'},
]

// Animation variants
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' } }),
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const { data } = useQuery({
    queryKey: ['featured-products'],
    queryFn:  () => productService.getAll({ featured: true, limit: 8 }),
  })

  return (
    <>
      <Helmet>
        <title>ChezAntaBada — Hijab Fashion Haut de Gamme</title>
        <meta name="description" content="Découvrez notre collection exclusive de hijabs élégants. Qualité premium, livraison rapide partout en Afrique." />
      </Helmet>

      {/* ─── PROMO BAR ─── */}
      <div className="bg-gold-500 text-black py-2 overflow-hidden">
        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="flex gap-16 whitespace-nowrap text-sm font-semibold"
        >
          {[...PROMO_ITEMS, ...PROMO_ITEMS, ...PROMO_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <item.icon size={14} />
              {item.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen bg-night overflow-hidden flex items-center">
        {/* Background parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          {/* Animated orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.30, 0.15] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.10, 0.20, 0.10] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-500 blur-3xl"
          />
        </motion.div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5"
             style={{ backgroundImage: 'linear-gradient(#1E90FF 1px, transparent 1px), linear-gradient(90deg, #1E90FF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 min-h-[75vh]">

            {/* ── Texte gauche ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex-1 text-center lg:text-left max-w-xl"
            >
              {/* Logo */}
              <motion.div variants={fadeUp} className="mb-8 flex justify-center lg:justify-start">
                <motion.img
                  src="https://res.cloudinary.com/dsdxrx5je/image/upload/v1775422192/chezantabada/logo.jpg"
                  alt="ChezAntaBada"
                  className="h-24 md:h-28 w-auto object-contain"
                  animate={{
                    filter: [
                      'drop-shadow(0 0 10px rgba(30,144,255,0.4))',
                      'drop-shadow(0 0 30px rgba(30,144,255,0.8))',
                      'drop-shadow(0 0 10px rgba(30,144,255,0.4))',
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  onError={e => { e.target.style.display = 'none' }}
                />
              </motion.div>

              <motion.p variants={fadeUp} className="font-script text-gold-400 text-2xl md:text-3xl mb-2">
                Bienvenue chez
              </motion.p>
              <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold text-white mb-4 leading-none">
                Chez<span className="text-blue-400">Anta</span><span className="gold-text">Bada</span>
              </motion.h1>

              <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <div className="divider-gold w-12" />
                <span className="text-gold-400 font-semibold tracking-[0.3em] text-xs">✦ HIJAB FASHION ✦</span>
                <div className="divider-gold w-12" />
              </motion.div>

              <motion.p variants={fadeUp} className="text-white/70 text-lg mb-10 leading-relaxed">
                Des hijabs d'exception pour la femme africaine élégante.
                Soie luxueuse · Qualité premium · Livraison rapide partout en Afrique.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/boutique"
                      className="btn-gold inline-flex items-center gap-2 text-base px-8 py-4">
                  Découvrir la collection <FiArrowRight />
                </Link>
                <Link to="/boutique?featured=true"
                      className="btn-outline-blue inline-flex items-center gap-2 text-base px-8 py-4">
                  Pièces phares ✨
                </Link>
              </motion.div>

              {/* Mini stats */}
              <motion.div variants={fadeUp} className="flex gap-6 mt-10 justify-center lg:justify-start">
                {[
                  { val: '2500+', label: 'Clientes' },
                  { val: '4.9★', label: 'Avis'     },
                  { val: '48h',   label: 'Livraison'},
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <p className="text-gold-400 font-bold text-xl">{s.val}</p>
                    <p className="text-muted text-xs">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Animation 3D femme voilée ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              className="flex-1 flex items-center justify-center w-full"
              style={{ minHeight: '500px', maxWidth: '480px' }}
            >
              <WomanSilk3D />
            </motion.div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none">
            <path d="M0,50 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,100 L0,100 Z" fill="#0a0a0a"/>
          </svg>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 bg-dark border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {STATS.map((s, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="relative">
                <p className="font-display text-4xl font-bold gold-text mb-1">{s.value}</p>
                <p className="text-muted text-sm">{s.label}</p>
                {i < STATS.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section className="py-20 bg-darker">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={i} variants={fadeUp} custom={i}
                whileHover={{ y: -4, scale: 1.02 }}
                className="card-dark p-6 text-center group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-dark border border-border
                             flex items-center justify-center mx-auto mb-4
                             group-hover:border-gold-500/50 transition-colors"
                >
                  <v.icon size={24} className={v.color} />
                </motion.div>
                <p className="font-semibold text-white text-sm mb-1">{v.label}</p>
                <p className="text-xs text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 bg-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true }} variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="font-script text-gold-400 text-2xl mb-3">Notre sélection</motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-4">Pièces phares</motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(data?.products || []).map((product, i) => (
              <motion.div key={product._id}
                variants={fadeUp} custom={i}
                initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
            {!data?.products?.length && Array(8).fill(0).map((_, i) => (
              <div key={i} className="card-dark h-80 animate-pulse" />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="text-center mt-14"
          >
            <Link to="/boutique" className="btn-gold inline-flex items-center gap-2 text-base">
              Voir tout le catalogue <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      <section className="py-24 bg-night">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="font-script text-blue-400 text-2xl mb-3">Explorez</motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-4">Nos Collections</motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {COLLECTIONS.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img src={cat.img} alt={cat.name}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     onError={e => { e.target.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-500" />

                {/* Tag */}
                <span className="absolute top-4 right-4 badge-gold">{cat.tag}</span>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-gold-300 text-sm mb-4">{cat.desc}</p>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to="/boutique"
                          className="inline-flex items-center gap-2 text-sm font-bold
                                     text-black bg-gold-500 hover:bg-gold-400
                                     px-4 py-2 rounded-full transition-colors">
                      Explorer <FiArrowRight size={14} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BANNER PROMO ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold-gradient opacity-15" />
        <div className="absolute inset-0 border-y border-gold-500/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-script text-gold-400 text-xl mb-2">Offre spéciale</p>
              <h2 className="font-display text-4xl font-bold text-white mb-2">
                Livraison <span className="gold-text">gratuite</span>
              </h2>
              <p className="text-muted text-lg">Pour toute commande supérieure à 30 000 FCFA</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/boutique" className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4">
                En profiter <FiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-darker">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="font-script text-gold-400 text-2xl mb-3">Elles nous font confiance</motion.p>
            <motion.h2 variants={fadeUp} className="section-title mb-4">Témoignages</motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, borderColor: 'rgba(201,168,76,0.4)' }}
                className="card-dark p-6 cursor-default"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {Array(t.stars).fill(0).map((_, j) => (
                    <motion.div key={j}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <FiStar className="fill-gold-400 text-gold-400" size={14} />
                    </motion.div>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-black font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gold-400 text-sm">{t.name}</p>
                    <p className="text-xs text-muted">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM SECTION ─── */}
      <section className="py-20 bg-dark border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <FiInstagram size={28} className="text-gold-400" />
              <h2 className="font-display text-3xl font-bold text-white">Suivez-nous</h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-muted mb-6">
              Rejoignez la communauté <span className="text-gold-400 font-semibold">@chezantabada</span> sur Instagram
            </motion.p>
            <motion.a variants={fadeUp}
              href="#" target="_blank" rel="noopener noreferrer"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              <FiInstagram size={18} /> Voir notre profil Instagram
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-28 bg-night relative overflow-hidden">
        {/* Background effects */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gold-500 blur-3xl opacity-10 mx-auto w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true }} variants={stagger}
          >
            <motion.p variants={fadeUp} className="font-script text-gold-400 text-3xl mb-3">Prête ?</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Sublimez<br />votre <span className="gold-text">style</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/60 mb-10 text-lg max-w-md mx-auto">
              Rejoignez des milliers de femmes élégantes qui font confiance à ChezAntaBada.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/boutique"
                    className="btn-gold inline-flex items-center gap-2 text-lg px-10 py-5">
                Visiter la boutique <FiArrowRight />
              </Link>
              <Link to="/inscription"
                    className="btn-outline-gold inline-flex items-center gap-2 text-lg px-10 py-5">
                Créer un compte
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
