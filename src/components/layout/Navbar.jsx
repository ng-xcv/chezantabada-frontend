import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiSettings, FiSearch } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count }        = useCart()
  const navigate         = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const NAV_LINKS = [
    { to: '/',          label: 'Accueil'     },
    { to: '/boutique',  label: 'Boutique'    },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-xl border-b border-gold-500/20 py-3 shadow-gold-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img
              src="https://res.cloudinary.com/dsdxrx5je/image/upload/v1775422192/chezantabada/logo.jpg"
              alt="ChezAntaBada"
              className="h-14 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              animate={{ filter: ['drop-shadow(0 0 8px rgba(30,144,255,0.4))', 'drop-shadow(0 0 20px rgba(30,144,255,0.8))', 'drop-shadow(0 0 8px rgba(30,144,255,0.4))'] }}
              transition={{ duration: 3, repeat: Infinity }}
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}
            />
            <span style={{display:'none'}} className="flex flex-col">
              <span className="font-display text-xl font-bold">
                <span className="text-blue-400">Chez</span><span className="gold-text">AntaBada</span>
              </span>
              <span className="text-xs text-gold-500 tracking-[0.2em]">HIJAB FASHION</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `font-medium text-sm tracking-wide transition-all duration-200 relative pb-1 ${
                    isActive ? 'text-gold-400' : 'text-white/80 hover:text-gold-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #C9A84C, #e8d5a3)' }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link to="/panier"
                  className="relative p-2.5 rounded-full border border-white/10 hover:border-gold-500/50
                             text-white/80 hover:text-gold-400 hover:bg-gold-500/10 transition-all duration-200">
              <FiShoppingBag size={20} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold-500 text-black
                             text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative">
                <button onClick={() => setDropOpen(!dropOpen)}
                        className="p-2.5 rounded-full border border-white/10 hover:border-gold-500/50
                                   text-white/80 hover:text-gold-400 hover:bg-gold-500/10 transition-all duration-200">
                  {user.avatar
                    ? <img src={user.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    : <FiUser size={20} />
                  }
                </button>
                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 top-12 bg-card border border-border rounded-2xl
                                 shadow-card p-2 w-52 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border mb-1">
                        <p className="font-semibold text-sm text-white">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                      </div>
                      {[
                        { to: '/profil',    icon: FiUser,     label: 'Mon profil'     },
                        { to: '/commandes', icon: FiPackage,  label: 'Mes commandes'  },
                      ].map(({ to, icon: Icon, label }) => (
                        <Link key={to} to={to} onClick={() => setDropOpen(false)}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/80
                                         hover:bg-gold-500/10 hover:text-gold-400 rounded-xl transition-colors">
                          <Icon size={14} /> {label}
                        </Link>
                      ))}
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setDropOpen(false)}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium
                                         text-gold-400 hover:bg-gold-500/10 rounded-xl transition-colors">
                          <FiSettings size={14} /> Admin
                        </Link>
                      )}
                      <hr className="my-1 border-border" />
                      <button onClick={() => { logout(); setDropOpen(false); navigate('/') }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-400
                                         hover:bg-red-500/10 rounded-xl transition-colors">
                        <FiLogOut size={14} /> Déconnexion
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/connexion"
                    className="hidden md:flex items-center gap-2 btn-gold text-sm px-5 py-2.5">
                <FiUser size={15} /> Connexion
              </Link>
            )}

            <button className="md:hidden p-2.5 rounded-full border border-white/10 hover:border-gold-500/50
                               text-white/80 hover:text-gold-400 transition-all"
                    onClick={() => setMenuOpen(!menuOpen)}>
              <AnimatePresence mode="wait">
                <motion.div key={menuOpen ? 'x' : 'menu'}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}>
                  {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                        className="font-medium text-white/80 hover:text-gold-400 hover:bg-gold-500/10
                                   py-3 px-4 rounded-xl transition-all">
                    {label}
                  </Link>
                ))}
                <hr className="border-border my-2" />
                {user ? (
                  <>
                    <Link to="/profil"    onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-gold-500/10 text-sm text-white/80">Mon profil</Link>
                    <Link to="/commandes" onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-gold-500/10 text-sm text-white/80">Mes commandes</Link>
                    <button onClick={() => { logout(); setMenuOpen(false); navigate('/') }}
                            className="text-left py-3 px-4 text-red-400 text-sm rounded-xl hover:bg-red-500/10">Déconnexion</button>
                  </>
                ) : (
                  <Link to="/connexion" onClick={() => setMenuOpen(false)} className="btn-gold w-full text-center py-3 text-sm mt-2">
                    Se connecter
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <div className="h-24" />
    </>
  )
}
