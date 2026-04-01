import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-night text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.svg" alt="ChezAntaBada" className="h-10 w-auto"
                   onError={e => e.target.style.display='none'} />
              <div>
                <h3 className="font-display text-xl font-bold logo-text">ChezAntaBada</h3>
                <p className="text-xs text-blue-400 tracking-[0.2em]">HIJAB FASHION</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Des hijabs et foulards d'exception, pensés pour la femme élégante et moderne.
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
                   className="w-10 h-10 border border-blue-500/30 rounded-full flex items-center
                              justify-center hover:border-blue-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-300 mb-4">Boutique</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/boutique" className="hover:text-blue-300 transition-colors">Tous les hijabs</Link></li>
              <li><Link to="/boutique" className="hover:text-blue-300 transition-colors">Collection Soie</Link></li>
              <li><Link to="/boutique" className="hover:text-blue-300 transition-colors">Collection Coton</Link></li>
              <li><Link to="/boutique?featured=true" className="hover:text-blue-300 transition-colors">Pièces phares</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-blue-300 mb-4">Aide</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link to="/connexion" className="hover:text-blue-300 transition-colors">Mon compte</Link></li>
              <li><Link to="/commandes" className="hover:text-blue-300 transition-colors">Mes commandes</Link></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Livraison &amp; retours</a></li>
              <li><a href="#" className="hover:text-blue-300 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between
                        items-center gap-4 text-sm text-white/30">
          <p>© 2025 ChezAntaBada. Tous droits réservés.</p>
          <p>Paiements sécurisés 🔒 Stripe SSL</p>
        </div>
      </div>
    </footer>
  )
}
