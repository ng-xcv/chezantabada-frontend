import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-border">
      {/* Top footer */}
      <div className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="https://res.cloudinary.com/dsdxrx5je/image/upload/v1775422952/chezantabada/logo_v3.jpg"
                alt="ChezAntaBada"
                className="h-20 w-auto object-contain"
                style={{ mixBlendMode: 'screen' }}
                onError={e => e.target.style.display='none'}
              />
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
              Des hijabs et foulards d'exception, pensés pour la femme élégante et moderne.
              Qualité premium, livraison rapide partout en Afrique.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted mb-2">
              <FiMapPin size={14} className="text-gold-400" />
              <span>Dakar, Sénégal</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted mb-6">
              <FiMail size={14} className="text-gold-400" />
              <span>contact@chezantabada.com</span>
            </div>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: FaInstagram, href: '#',   label: 'Instagram' },
                { Icon: FaFacebook,  href: '#',   label: 'Facebook'  },
                { Icon: FaTiktok,    href: '#',   label: 'TikTok'    },
                { Icon: FaWhatsapp,  href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`, label: 'WhatsApp' },
              ].map(({ Icon, href, label }, i) => (
                <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
                   aria-label={label}
                   whileHover={{ y: -2, scale: 1.1 }}
                   className="w-10 h-10 bg-card border border-border rounded-full flex items-center
                              justify-center text-muted hover:text-gold-400 hover:border-gold-500/50
                              hover:bg-gold-500/10 transition-all duration-200">
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-5 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-4 h-px bg-gold-500 inline-block" /> Boutique
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/boutique',               label: 'Tous les hijabs'   },
                { to: '/boutique',               label: 'Collection Soie'   },
                { to: '/boutique',               label: 'Collection Coton'  },
                { to: '/boutique?featured=true', label: 'Pièces phares'     },
                { to: '/boutique',               label: 'Nouveautés'        },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to}
                        className="text-sm text-muted hover:text-gold-400 transition-colors
                                   flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-gold-400 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="font-semibold text-gold-400 mb-5 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-4 h-px bg-gold-500 inline-block" /> Aide
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/connexion',  label: 'Mon compte'          },
                { to: '/commandes',  label: 'Mes commandes'       },
                { to: '#',           label: 'Livraison & retours' },
                { to: '#',           label: 'Contact'             },
                { to: '#',           label: 'FAQ'                 },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to}
                        className="text-sm text-muted hover:text-gold-400 transition-colors
                                   flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-gold-400 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="divider-gold mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-subtle">
          <p>© 2025 ChezAntaBada · Tous droits réservés · Dakar, Sénégal</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Paiements sécurisés Stripe SSL 256-bit
          </p>
        </div>
      </div>
    </footer>
  )
}
