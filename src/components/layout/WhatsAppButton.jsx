import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const number  = import.meta.env.VITE_WHATSAPP_NUMBER || '+221000000000'
  const message = encodeURIComponent('Bonjour ChezAntaBada ! 👋 Je souhaite des informations sur vos hijabs.')

  return (
    <motion.a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366]
                 rounded-full flex items-center justify-center
                 shadow-[0_4px_20px_rgba(37,211,102,0.5)]
                 hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)]
                 transition-shadow duration-300"
      aria-label="Contacter via WhatsApp"
    >
      <FaWhatsapp size={28} className="text-white" />
      <motion.span
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-[#25D366]"
      />
    </motion.a>
  )
}
