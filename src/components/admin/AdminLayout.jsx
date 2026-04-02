import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid, FiPackage, FiTag, FiShoppingBag,
  FiLogOut, FiMenu, FiX
} from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

const NAV = [
  { to: '/admin',            icon: FiGrid,        label: 'Dashboard'   },
  { to: '/admin/produits',   icon: FiPackage,     label: 'Produits'    },
  { to: '/admin/categories', icon: FiTag,         label: 'Catégories'  },
  { to: '/admin/commandes',  icon: FiShoppingBag, label: 'Commandes'   },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border
                         flex flex-col transition-transform duration-300
                         ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <p className="font-display text-lg font-bold gold-text">ChezAntaBada</p>
            <p className="text-xs text-muted tracking-widest">ADMIN PANEL</p>
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden text-muted hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to ||
              (to !== '/admin' && location.pathname.startsWith(to))
            return (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                                transition-all duration-200 ${
                      active
                        ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                        : 'text-muted hover:bg-white/5 hover:text-white'
                    }`}>
                <Icon size={18} />
                {label}
                {active && (
                  <motion.div layoutId="admin-nav-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => { logout(); navigate('/') }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                       text-muted hover:text-red-400 hover:bg-red-500/10 w-full transition-all"
          >
            <FiLogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden"
             onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur border-b border-border
                           px-6 py-4 flex items-center justify-between">
          <button onClick={() => setOpen(true)}
                  className="md:hidden text-muted hover:text-white">
            <FiMenu size={22} />
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted">En ligne</span>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
