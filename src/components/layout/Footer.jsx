import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-blue-gradient text-white">
      {/* Main footer */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="ChezAntaBada" className="h-14 w-auto"
                   onError={e => e.target.style.display='none'} />
              <div>
                <h3 className="font-display text-xl font-bold text-white">ChezAntaBada</h3>
                <p className="text-gold-300 text-xs tracking-[0.25em] font-medium">HIJAB FASHION</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-6">
              Des hijabs et foulards d'exception, pensés pour la femme élégante et moderne.
              Qualité premium, livraison rapide au Sénégal et partout en Afrique.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { Icon: FaInstagram, href: '#',     label: 'Instagram' },
                { Icon: FaFacebook,  href: '#',     label: 'Facebook'  },
                { Icon: FaTiktok,    href: '#',     label: 'TikTok'    },
                { Icon: FaWhatsapp,  href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`, label: 'WhatsApp' },
              ].map(({ Icon, href, label }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                   aria-label={label}
                   className="w-9 h-9 bg-white/10 border border-white/20 rounded-full flex items-center
                              justify-center hover:bg-gold-500 hover:border-gold-500 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-semibold text-gold-300 mb-4 uppercase tracking-wider text-xs">Boutique</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                { to: '/boutique',              label: 'Tous les hijabs'   },
                { to: '/boutique',              label: 'Collection Soie'   },
                { to: '/boutique',              label: 'Collection Coton'  },
                { to: '/boutique?featured=true',label: 'Pièces phares'     },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-gold-300 transition-colors hover:pl-1 duration-200 block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="font-semibold text-gold-300 mb-4 uppercase tracking-wider text-xs">Aide</h4>
            <ul className="space-y-3 text-sm text-white/70">
              {[
                { to: '/connexion',  label: 'Mon compte'          },
                { to: '/commandes',  label: 'Mes commandes'       },
                { to: '#',           label: 'Livraison & retours' },
                { to: '#',           label: 'Contact'             },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-gold-300 transition-colors hover:pl-1 duration-200 block">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between
                        items-center gap-4 text-xs text-white/40">
          <p>© 2025 ChezAntaBada · Tous droits réservés</p>
          <p className="flex items-center gap-2">
            <span>🔒 Paiements sécurisés Stripe SSL</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
