import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingBag, FiUser, FiMenu, FiX, FiLogOut } from 'react-icons/fi'
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
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const NAV_LINKS = [
    { to: '/',         label: 'Accueil'  },
    { to: '/boutique', label: 'Boutique' },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-black/20 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="ChezAntaBada" className="h-10 w-auto" onError={e => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'block'
          }} />
          <span className="hidden font-display text-xl font-bold logo-text">ChezAntaBada</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `font-medium text-sm tracking-wide transition-colors ${
                  isActive ? 'text-blue-500' : scrolled ? 'text-ink hover:text-blue-500' : 'text-white hover:text-blue-300'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/panier" className={`relative transition-colors ${scrolled ? 'text-ink hover:text-blue-500' : 'text-white hover:text-blue-300'}`}>
            <FiShoppingBag size={22} />
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-blue-500 text-white
                           text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              >
                {count}
              </motion.span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button onClick={() => setDropOpen(!dropOpen)}
                      className={`transition-colors ${scrolled ? 'text-ink hover:text-blue-500' : 'text-white hover:text-blue-300'}`}>
                <FiUser size={22} />
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-10 bg-white rounded-2xl shadow-xl p-2 min-w-44 border border-gray-100"
                  >
                    <Link to="/profil" onClick={() => setDropOpen(false)}
                          className="block px-4 py-2.5 text-sm hover:bg-cream rounded-xl">Mon profil</Link>
                    <Link to="/commandes" onClick={() => setDropOpen(false)}
                          className="block px-4 py-2.5 text-sm hover:bg-cream rounded-xl">Mes commandes</Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setDropOpen(false)}
                            className="block px-4 py-2.5 text-sm text-blue-500 font-medium hover:bg-cream rounded-xl">Dashboard admin</Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button onClick={() => { logout(); setDropOpen(false); navigate('/') }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl">
                      <FiLogOut size={14} /> Déconnexion
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/connexion" className={`transition-colors ${scrolled ? 'text-ink hover:text-blue-500' : 'text-white hover:text-blue-300'}`}>
              <FiUser size={22} />
            </Link>
          )}

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen
              ? <FiX size={24} className={scrolled ? 'text-ink' : 'text-white'} />
              : <FiMenu size={24} className={scrolled ? 'text-ink' : 'text-white'} />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg px-4 py-6 flex flex-col gap-2"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}
                    className="font-medium text-ink hover:text-blue-500 py-2 border-b border-silk">
                {label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profil" onClick={() => setMenuOpen(false)} className="py-2 border-b border-silk text-sm">Mon profil</Link>
                <Link to="/commandes" onClick={() => setMenuOpen(false)} className="py-2 border-b border-silk text-sm">Mes commandes</Link>
                <button onClick={() => { logout(); setMenuOpen(false); navigate('/') }} className="text-left py-2 text-red-500 text-sm">Déconnexion</button>
              </>
            ) : (
              <Link to="/connexion" onClick={() => setMenuOpen(false)} className="py-2 text-blue-500 font-medium text-sm">Se connecter</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
