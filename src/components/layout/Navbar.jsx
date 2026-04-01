import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiSettings } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count }        = useCart()
  const navigate         = useNavigate()
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [dropOpen, setDropOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const NAV_LINKS = [
    { to: '/',         label: 'Accueil'  },
    { to: '/boutique', label: 'Boutique' },
  ]

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white shadow-blue-sm py-3 border-b border-blue-100'
            : 'bg-white/90 backdrop-blur-md py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="ChezAntaBada"
                 className="h-12 w-auto group-hover:scale-105 transition-transform duration-200"
                 onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='block' }} />
            <span style={{display:'none'}} className="font-display text-xl font-bold">
              <span className="text-blue-500">Chez</span>
              <span className="gold-text">AntaBada</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `font-medium text-sm tracking-wide transition-all duration-200 relative ${
                    isActive
                      ? 'text-blue-500'
                      : 'text-ink hover:text-blue-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/panier"
                  className="relative p-2 rounded-full hover:bg-blue-50 text-ink hover:text-blue-500 transition-all">
              <FiShoppingBag size={22} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blue-500 text-white
                             text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-blue-50
                             text-ink hover:text-blue-500 transition-all"
                >
                  {user.avatar
                    ? <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-blue-200" />
                    : <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                        {user.firstName?.[0]?.toUpperCase()}
                      </div>
                  }
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0,  scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      className="absolute right-0 top-12 bg-white rounded-2xl shadow-blue-lg
                                 p-2 w-52 border border-blue-100 overflow-hidden"
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-blue-50 mb-1">
                        <p className="font-semibold text-sm text-ink">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-muted truncate">{user.email}</p>
                      </div>

                      <Link to="/profil" onClick={() => setDropOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink
                                       hover:bg-blue-50 hover:text-blue-500 rounded-xl transition-colors">
                        <FiUser size={14} /> Mon profil
                      </Link>
                      <Link to="/commandes" onClick={() => setDropOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink
                                       hover:bg-blue-50 hover:text-blue-500 rounded-xl transition-colors">
                        <FiPackage size={14} /> Mes commandes
                      </Link>

                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setDropOpen(false)}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium
                                         text-gold-600 hover:bg-gold-50 rounded-xl transition-colors">
                          <FiSettings size={14} /> Dashboard admin
                        </Link>
                      )}

                      <hr className="my-1 border-blue-50" />
                      <button
                        onClick={() => { logout(); setDropOpen(false); navigate('/') }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500
                                   hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <FiLogOut size={14} /> Déconnexion
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/connexion"
                    className="hidden md:flex items-center gap-2 btn-blue text-sm px-4 py-2">
                <FiUser size={15} /> Connexion
              </Link>
            )}

            {/* Mobile toggle */}
            <button className="md:hidden p-2 rounded-full hover:bg-blue-50 text-ink transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
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
              className="md:hidden bg-white border-t border-blue-100 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map(({ to, label }) => (
                  <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                        className="font-medium text-ink hover:text-blue-500 hover:bg-blue-50
                                   py-3 px-4 rounded-xl transition-all">
                    {label}
                  </Link>
                ))}
                <hr className="border-blue-100 my-2" />
                {user ? (
                  <>
                    <Link to="/profil"    onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-blue-50 text-sm">Mon profil</Link>
                    <Link to="/commandes" onClick={() => setMenuOpen(false)} className="py-3 px-4 rounded-xl hover:bg-blue-50 text-sm">Mes commandes</Link>
                    <button onClick={() => { logout(); setMenuOpen(false); navigate('/') }}
                            className="text-left py-3 px-4 text-red-500 text-sm rounded-xl hover:bg-red-50">
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link to="/connexion" onClick={() => setMenuOpen(false)}
                        className="btn-blue w-full text-center py-3 text-sm">
                    Se connecter
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  )
}
