import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const number  = import.meta.env.VITE_WHATSAPP_NUMBER || '+221000000000'
  const message = encodeURIComponent('Bonjour ChezAntaBada ! Je souhaite des informations sur vos produits 🌿')

  return (
    <motion.a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366]
                 rounded-full flex items-center justify-center shadow-2xl
                 hover:shadow-green-400/40"
      aria-label="Contacter via WhatsApp"
    >
      <FaWhatsapp size={30} className="text-white" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    </motion.a>
  )
}
