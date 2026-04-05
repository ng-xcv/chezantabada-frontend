import { useRef, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring } from 'framer-motion'

/* ─── Particules de soie flottantes ─── */
function SilkParticle({ delay, x, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, width: size, height: size, background: color, filter: 'blur(1px)' }}
      animate={{
        y: [0, -180, -360],
        x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.2, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  )
}

/* ─── Voile de soie animé (SVG path fluide) ─── */
function SilkVeil({ className }) {
  return (
    <motion.svg
      viewBox="0 0 300 500"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="silkGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#e8d5a3" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="silkBlue" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1E90FF" stopOpacity="0.0" />
        </linearGradient>
        <filter id="silkBlur">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* ─ Couche soie principale ─ */}
      <motion.path
        d="M150,30 C180,50 220,80 240,140 C260,200 255,260 240,320 C225,380 200,420 175,460 C160,480 140,490 130,480 C110,460 105,420 110,370 C115,320 125,280 120,230 C115,180 90,150 80,110 C70,70 90,40 120,30 Z"
        fill="url(#silkGold)"
        animate={{
          d: [
            "M150,30 C180,50 220,80 240,140 C260,200 255,260 240,320 C225,380 200,420 175,460 C160,480 140,490 130,480 C110,460 105,420 110,370 C115,320 125,280 120,230 C115,180 90,150 80,110 C70,70 90,40 120,30 Z",
            "M150,30 C190,60 215,90 225,150 C235,210 230,270 215,335 C200,400 180,435 155,462 C140,478 118,488 108,476 C92,455 95,415 102,365 C109,315 122,272 118,222 C114,172 88,138 85,98 C82,58 100,35 130,28 Z",
            "M150,30 C175,45 225,75 245,138 C265,195 258,258 242,318 C226,378 202,418 177,458 C162,480 142,492 132,481 C112,461 108,422 112,372 C116,322 127,282 122,232 C117,182 92,148 82,108 C72,68 92,38 122,28 Z",
            "M150,30 C180,50 220,80 240,140 C260,200 255,260 240,320 C225,380 200,420 175,460 C160,480 140,490 130,480 C110,460 105,420 110,370 C115,320 125,280 120,230 C115,180 90,150 80,110 C70,70 90,40 120,30 Z",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ─ Couche soie droite ─ */}
      <motion.path
        d="M160,40 C200,65 240,100 255,165 C270,225 260,285 245,340 C230,395 208,432 185,462 C205,445 225,405 235,355 C245,305 242,255 235,200 C228,145 205,110 200,80 Z"
        fill="url(#silkGold)"
        opacity={0.5}
        animate={{
          d: [
            "M160,40 C200,65 240,100 255,165 C270,225 260,285 245,340 C230,395 208,432 185,462 C205,445 225,405 235,355 C245,305 242,255 235,200 C228,145 205,110 200,80 Z",
            "M165,38 C208,68 248,108 258,172 C268,232 255,290 238,348 C221,406 200,438 178,468 C200,450 218,412 228,360 C238,308 237,258 230,202 C223,146 198,108 195,76 Z",
            "M155,42 C195,62 238,96 252,162 C266,222 258,282 243,338 C228,394 207,428 184,460 C204,442 226,400 236,350 C246,300 244,250 237,195 C230,140 205,106 200,78 Z",
            "M160,40 C200,65 240,100 255,165 C270,225 260,285 245,340 C230,395 208,432 185,462 C205,445 225,405 235,355 C245,305 242,255 235,200 C228,145 205,110 200,80 Z",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* ─ Reflet lumineux ─ */}
      <motion.ellipse
        cx="170" cy="180" rx="30" ry="80"
        fill="white" opacity={0.12}
        animate={{ opacity: [0.08, 0.18, 0.08], cy: [180, 190, 180] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

/* ─── Silhouette SVG d'une femme africaine voilée ─── */
export default function WomanSilk3D() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), { stiffness: 80, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 80, damping: 20 })

  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const particles = [
    { delay: 0,   x: 20, size: 6,  color: 'rgba(201,168,76,0.8)' },
    { delay: 0.5, x: 70, size: 4,  color: 'rgba(30,144,255,0.7)' },
    { delay: 1,   x: 45, size: 8,  color: 'rgba(232,213,163,0.6)'},
    { delay: 1.5, x: 80, size: 5,  color: 'rgba(201,168,76,0.9)' },
    { delay: 2,   x: 30, size: 7,  color: 'rgba(30,144,255,0.5)' },
    { delay: 2.5, x: 60, size: 4,  color: 'rgba(255,255,255,0.4)'},
    { delay: 0.8, x: 15, size: 5,  color: 'rgba(201,168,76,0.6)' },
    { delay: 1.8, x: 85, size: 6,  color: 'rgba(232,213,163,0.7)'},
  ]

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: 1000 }}
    >
      {/* Halo de lumière en fond */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: 'radial-gradient(ellipse 55% 65% at 50% 45%, rgba(201,168,76,0.18) 0%, rgba(30,144,255,0.10) 50%, transparent 80%)',
        }}
      />

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bottom-0">
        {particles.map((p, i) => <SilkParticle key={i} {...p} />)}
      </div>

      {/* ─── Carte 3D principale ─── */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-72 h-[480px] md:w-80 md:h-[540px]"
      >
        {/* Ombre portée 3D */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.35) 0%, transparent 70%)', filter: 'blur(8px)', translateZ: -40 }}
          animate={{ scaleX: [1, 0.85, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* SVG femme africaine voilée */}
        <svg
          viewBox="0 0 300 540"
          className="absolute inset-0 w-full h-full drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 0 24px rgba(201,168,76,0.4))' }}
        >
          <defs>
            <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="60%" stopColor="#5C2A0A" />
              <stop offset="100%" stopColor="#3B1A05" />
            </radialGradient>
            <radialGradient id="faceGrad" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#A0522D" />
              <stop offset="70%" stopColor="#7B3A1A" />
              <stop offset="100%" stopColor="#5C2A0A" />
            </radialGradient>
            <linearGradient id="hijabMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A84C" />
              <stop offset="30%" stopColor="#e8d5a3" />
              <stop offset="70%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#9A7A30" />
            </linearGradient>
            <linearGradient id="hijabShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9A7A30" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#5C4A18" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="robeGrad" x1="0%" y1="0%" x2="30%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="40%" stopColor="#16213e" />
              <stop offset="100%" stopColor="#0f3460" />
            </linearGradient>
            <linearGradient id="robeBorder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
              <stop offset="50%" stopColor="#C9A84C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="silkDrape" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#e8d5a3" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="glowLine" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#1E90FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#1E90FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1E90FF" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Corps / Robe ── */}
          <path d="M100,250 C85,270 75,310 70,360 C65,410 68,460 72,510 C90,515 210,515 228,510 C232,460 235,410 230,360 C225,310 215,270 200,250 Z"
            fill="url(#robeGrad)" />
          {/* Bordure dorée robe */}
          <path d="M100,250 C85,270 75,310 70,360 C65,410 68,460 72,510"
            stroke="url(#robeBorder)" strokeWidth="1.5" fill="none" />
          <path d="M200,250 C215,270 225,310 230,360 C235,410 232,460 228,510"
            stroke="url(#robeBorder)" strokeWidth="1.5" fill="none" />

          {/* ── Broderies col ── */}
          <path d="M120,252 C150,258 180,258 180,252" stroke="#C9A84C" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M125,258 C150,263 175,263 175,258" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.4" />

          {/* ── Bras (pose élégante) ── */}
          {/* Bras gauche */}
          <path d="M100,260 C80,275 65,295 58,325 C55,340 60,355 70,360 C80,340 88,315 100,295 Z"
            fill="url(#skinGrad)" />
          {/* Bras droit */}
          <path d="M200,260 C220,275 235,295 242,325 C245,340 240,355 230,360 C220,340 212,315 200,295 Z"
            fill="url(#skinGrad)" />

          {/* ── Mains ── */}
          <ellipse cx="62" cy="362" rx="12" ry="10" fill="url(#skinGrad)" />
          <ellipse cx="238" cy="362" rx="12" ry="10" fill="url(#skinGrad)" />

          {/* ── Cou ── */}
          <path d="M130,210 C138,215 162,215 170,210 L168,245 C158,250 142,250 132,245 Z"
            fill="url(#skinGrad)" />

          {/* ── Visage ── */}
          <ellipse cx="150" cy="185" rx="52" ry="62" fill="url(#faceGrad)" />
          {/* Reflet pommette */}
          <ellipse cx="125" cy="178" rx="12" ry="8" fill="white" opacity="0.07" transform="rotate(-20,125,178)" />
          <ellipse cx="175" cy="178" rx="12" ry="8" fill="white" opacity="0.07" transform="rotate(20,175,178)" />

          {/* Yeux */}
          <ellipse cx="128" cy="182" rx="9" ry="6" fill="#1a0a00" />
          <ellipse cx="172" cy="182" rx="9" ry="6" fill="#1a0a00" />
          {/* Iris */}
          <ellipse cx="129" cy="183" rx="5" ry="5" fill="#2C1810" />
          <ellipse cx="171" cy="183" rx="5" ry="5" fill="#2C1810" />
          {/* Pupilles */}
          <circle cx="130" cy="183" r="2.5" fill="#050505" />
          <circle cx="170" cy="183" r="2.5" fill="#050505" />
          {/* Reflets yeux */}
          <circle cx="132" cy="181" r="1.2" fill="white" opacity="0.9" />
          <circle cx="172" cy="181" r="1.2" fill="white" opacity="0.9" />
          {/* Cils */}
          <path d="M119,178 C122,172 128,170 135,172" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M163,172 C169,170 175,172 179,178" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Sourcils */}
          <path d="M116,170 C122,165 132,164 138,167" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M162,167 C168,164 178,165 184,170" stroke="#2C1810" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Nez */}
          <path d="M148,190 C144,205 143,212 148,215 C153,218 157,215 152,212 C149,209 148,202 152,190"
            fill="#6B3318" opacity="0.6" />

          {/* Lèvres */}
          <path d="M136,225 C142,220 158,220 164,225 C158,232 142,232 136,225 Z"
            fill="#8B3A2A" opacity="0.85" />
          <path d="M136,225 C142,222 158,222 164,225" stroke="#A04030" strokeWidth="0.8" fill="none" />

          {/* ── Hijab principal (soie dorée) ── */}
          {/* Calotte */}
          <path d="M98,155 C100,115 115,90 150,85 C185,90 200,115 202,155 C195,148 175,143 150,142 C125,143 105,148 98,155 Z"
            fill="url(#hijabMain)" />

          {/* Voile gauche descendant */}
          <motion.path
            d="M98,155 C88,168 78,185 72,215 C65,248 64,280 68,310 C75,345 88,370 100,395 C90,380 82,355 78,325 C74,295 76,265 82,235 C88,205 96,180 98,155 Z"
            fill="url(#silkDrape)"
            animate={{
              d: [
                "M98,155 C88,168 78,185 72,215 C65,248 64,280 68,310 C75,345 88,370 100,395 C90,380 82,355 78,325 C74,295 76,265 82,235 C88,205 96,180 98,155 Z",
                "M98,155 C85,170 74,188 68,218 C62,250 62,282 67,312 C74,347 87,373 100,398 C90,382 81,356 77,326 C73,296 76,266 83,236 C90,206 96,180 98,155 Z",
                "M98,155 C91,166 82,182 76,212 C69,246 68,278 72,308 C79,343 91,368 103,393 C93,378 85,353 81,323 C77,293 78,263 84,233 C90,203 96,180 98,155 Z",
                "M98,155 C88,168 78,185 72,215 C65,248 64,280 68,310 C75,345 88,370 100,395 C90,380 82,355 78,325 C74,295 76,265 82,235 C88,205 96,180 98,155 Z",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Voile droit descendant */}
          <motion.path
            d="M202,155 C212,168 222,185 228,215 C235,248 236,280 232,310 C225,345 212,370 200,395 C210,380 218,355 222,325 C226,295 224,265 218,235 C212,205 204,180 202,155 Z"
            fill="url(#silkDrape)"
            animate={{
              d: [
                "M202,155 C212,168 222,185 228,215 C235,248 236,280 232,310 C225,345 212,370 200,395 C210,380 218,355 222,325 C226,295 224,265 218,235 C212,205 204,180 202,155 Z",
                "M202,155 C214,170 226,188 232,218 C238,250 238,282 233,312 C226,347 213,373 200,398 C210,382 219,356 223,326 C227,296 224,266 217,236 C210,206 204,180 202,155 Z",
                "M202,155 C209,166 218,182 224,212 C231,246 232,278 228,308 C221,343 209,368 197,393 C207,378 215,353 219,323 C223,293 222,263 216,233 C210,203 204,180 202,155 Z",
                "M202,155 C212,168 222,185 228,215 C235,248 236,280 232,310 C225,345 212,370 200,395 C210,380 218,355 222,325 C226,295 224,265 218,235 C212,205 204,180 202,155 Z",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* ── Long voile de soie fluide (spectaculaire) ── */}
          <motion.path
            d="M82,175 C55,210 35,260 28,320 C22,375 30,430 45,480 C55,510 65,525 75,530 L100,395 C88,370 75,345 68,310 C64,280 65,248 72,215 C78,185 88,168 98,155 Z"
            fill="#C9A84C" opacity={0.22}
            animate={{
              d: [
                "M82,175 C55,210 35,260 28,320 C22,375 30,430 45,480 C55,510 65,525 75,530 L100,395 C88,370 75,345 68,310 C64,280 65,248 72,215 C78,185 88,168 98,155 Z",
                "M82,175 C52,212 30,263 24,322 C18,378 27,432 43,482 C53,512 64,527 74,532 L100,398 C87,373 74,347 67,312 C62,282 62,250 68,218 C74,188 85,170 98,155 Z",
                "M82,175 C58,208 40,257 32,318 C26,372 33,428 47,478 C57,508 66,523 76,528 L103,393 C91,368 79,343 72,308 C68,278 69,246 76,212 C82,182 91,166 98,155 Z",
                "M82,175 C55,210 35,260 28,320 C22,375 30,430 45,480 C55,510 65,525 75,530 L100,395 C88,370 75,345 68,310 C64,280 65,248 72,215 C78,185 88,168 98,155 Z",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />

          <motion.path
            d="M218,175 C245,210 265,260 272,320 C278,375 270,430 255,480 C245,510 235,525 225,530 L200,395 C212,370 225,345 232,310 C236,280 235,248 228,215 C222,185 212,168 202,155 Z"
            fill="#C9A84C" opacity={0.22}
            animate={{
              d: [
                "M218,175 C245,210 265,260 272,320 C278,375 270,430 255,480 C245,510 235,525 225,530 L200,395 C212,370 225,345 232,310 C236,280 235,248 228,215 C222,185 212,168 202,155 Z",
                "M218,175 C248,212 270,263 276,322 C282,378 273,432 257,482 C247,512 236,527 226,532 L200,398 C213,373 226,347 233,312 C238,282 238,250 232,218 C226,188 214,170 202,155 Z",
                "M218,175 C242,208 260,257 268,318 C274,372 267,428 253,478 C243,508 234,523 224,528 L197,393 C209,368 221,343 228,308 C232,278 231,246 224,212 C218,182 209,166 202,155 Z",
                "M218,175 C245,210 265,260 272,320 C278,375 270,430 255,480 C245,510 235,525 225,530 L200,395 C212,370 225,345 232,310 C236,280 235,248 228,215 C222,185 212,168 202,155 Z",
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />

          {/* ── Bijoux (collier doré) ── */}
          <path d="M128,242 C138,248 162,248 172,242" stroke="#C9A84C" strokeWidth="2" fill="none" />
          <circle cx="150" cy="248" r="3" fill="#C9A84C" />
          <circle cx="135" cy="244" r="2" fill="#C9A84C" opacity="0.8" />
          <circle cx="165" cy="244" r="2" fill="#C9A84C" opacity="0.8" />

          {/* ── Ligne lumineuse bleue (effet glow) ── */}
          <motion.path
            d="M98,155 C120,145 180,145 202,155"
            stroke="url(#glowLine)" strokeWidth="3" fill="none"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            filter="url(#glow)"
          />

          {/* Reflets soie dorée sur hijab */}
          <motion.path
            d="M115,130 C120,120 135,115 145,118"
            stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </svg>

        {/* ── Anneau ornemental 3D ── */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-5 rounded-full border pointer-events-none"
          style={{
            borderColor: 'rgba(201,168,76,0.4)',
            background: 'radial-gradient(ellipse, rgba(201,168,76,0.1) 0%, transparent 70%)',
            translateZ: -20,
          }}
          animate={{ scaleX: [1, 0.9, 1], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Texte flottant décoratif */}
      <motion.div
        className="absolute top-6 right-6 text-right pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-gold-400 font-script text-lg leading-none">élégance</p>
        <p className="text-gold-300/50 text-xs tracking-widest">& grâce</p>
      </motion.div>
      <motion.div
        className="absolute bottom-10 left-4 pointer-events-none"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        <p className="text-blue-400/70 text-xs tracking-[0.3em] uppercase">Soie • Luxe • Mode</p>
      </motion.div>
    </div>
  )
}
