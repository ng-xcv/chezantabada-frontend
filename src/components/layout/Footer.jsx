import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold text-gold-400 mb-4">ChezAntaBada</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Des foulards et hijabs d'exception, pensés pour la femme élégante et moderne.
              Qualité premium, livraison rapide.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { Icon: FaInstagram, href: '#' },
                { Icon: FaFacebook,  href: '#' },
                { Icon: FaTiktok,    href: '#' },
                { Icon: FaWhatsapp,  href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}` },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 border border-white/20 rounded-full flex items-center
                              justify-center hover:border-gold-400 hover:text-gold-400 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gold-300 mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/boutique" className="hover:text-gold-300 transition-colors">Tous les foulards</Link></li>
              <li><Link to="/boutique?category=soie" className="hover:text-gold-300 transition-colors">Collection Soie</Link></li>
              <li><Link to="/boutique?category=coton" className="hover:text-gold-300 transition-colors">Collection Coton</Link></li>
              <li><Link to="/boutique?featured=true" className="hover:text-gold-300 transition-colors">Pièces phares</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-gold-300 mb-4">Aide</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/connexion" className="hover:text-gold-300 transition-colors">Mon compte</Link></li>
              <li><Link to="/commandes" className="hover:text-gold-300 transition-colors">Mes commandes</Link></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors">Livraison &amp; retours</a></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between
                        items-center gap-4 text-sm text-white/40">
          <p>© 2025 ChezAntaBada. Tous droits réservés.</p>
          <p>Paiements sécurisés 🔒 Stripe SSL</p>
        </div>
      </div>
    </footer>
  )
}
