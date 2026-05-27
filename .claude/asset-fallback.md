# ASSET FALLBACK SYSTEM — Full Autonomy, Zero User Intervention
# Save at: .claude/asset-fallback.md
# Referenced by CLAUDE.md + agency-patterns.md + 3d-system.md
# When ANY asset is unavailable: recreate. Never wait. Never ask.

---

## § THE AUTONOMY MANDATE

NovaCraft is **zero-intervention**. User pastes PROMPT, walks away, returns
to a fully working clone. No "TODO: user will provide" comments. No fallback
geometry markers. No passive event wiring. No silent failures.

**Three hard rules:**
1. If asset can't be downloaded → RECREATE IT
2. If recreation isn't possible → BUILD VISUAL EQUIVALENT
3. If neither works → OMIT THE FEATURE ENTIRELY AND HIDE THE TRIGGER

A button that does nothing is worse than no button at all.

---

## § ANTI-PASSIVE-WIRING RULE

**The #1 silent failure: components wired but never activated.**

Patterns that are FORBIDDEN in the final clone:
```tsx
// ❌ Passive wire — handler defined, never triggered visibly
onClick={() => triggerWarp()}  // ...but warp never actually plays

// ❌ Fallback geometry left as placeholder
{model ? <Model /> : <FallbackBox />}  // FallbackBox is the shipped version

// ❌ TODO comments waiting for user
// TODO: replace with actual video when user provides it

// ❌ Silent audio system
<audio src="/sounds/click.mp3" />  // file doesn't exist, no fallback

// ❌ Empty animation refs
const lottieRef = useRef(null)  // never plays anything
```

Every wired interaction MUST visibly fire. Every fallback MUST be production-ready.
If you write `<FallbackBox />`, that IS the component. Rename it, polish it, ship it.

---

## § VIDEO FILES — Recreation Protocol

**When .mp4/.webm download blocked:**

STEP 1 — Identify purpose via Chrome MCP screenshot of source:
- Background ambient loop (color, mood, motion type)
- Overlay video on hover/click (subject, duration, transition)
- Hero cinematic full-bleed

STEP 2 — Try Pexels Videos (no API key required for embed):
```tsx
// components/ui/VideoBackground.tsx
'use client'
export function VideoBackground({ pexelsId, fallbackGradient }: {
  pexelsId?: string,
  fallbackGradient: string
}) {
  if (pexelsId) {
    return (
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src={`https://videos.pexels.com/video-files/${pexelsId}/[id]-hd_1920_1080_30fps.mp4`} type="video/mp4" />
      </video>
    )
  }
  return <div className={`absolute inset-0 ${fallbackGradient}`} />
}
```

STEP 3 — CSS animated gradient fallback (always works, no network):
```tsx
// Dark abstract motion replacement
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]
    animate-gradient bg-[length:400%_400%]" />
  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ff4040]/10 to-transparent
    animate-gradient-slow bg-[length:300%_300%]" />
</div>

// tailwind.config.ts:
keyframes: {
  gradient: { '0%,100%': {backgroundPosition:'0% 50%'}, '50%': {backgroundPosition:'100% 50%'} },
  'gradient-slow': { '0%,100%': {backgroundPosition:'0% 0%'}, '50%': {backgroundPosition:'100% 100%'} }
},
animation: {
  gradient: 'gradient 8s ease-in-out infinite',
  'gradient-slow': 'gradient-slow 15s ease-in-out infinite',
}
```

STEP 4 — For triangular/clip-path video overlays (hero work showcases):
```tsx
// components/ui/TriangleOverlay.tsx — visual recreation without video
<motion.div
  className="absolute inset-0"
  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
>
  <div className="absolute inset-0 bg-gradient-to-b from-[#ff4040] via-[#8040ff] to-[#0040ff]
    animate-gradient bg-[length:200%_200%]" />
  <motion.div
    className="absolute inset-0 mix-blend-overlay"
    animate={{ background: ['radial-gradient(circle at 30% 30%, #fff 0%, transparent 50%)',
                            'radial-gradient(circle at 70% 70%, #fff 0%, transparent 50%)'] }}
    transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
  />
</motion.div>
```

**Never leave a black box where a video belongs.**

---

## § AUDIO SYSTEM — Full Activation Without Files

**When .mp3/.ogg files don't exist:**

OPTION A — Generated audio via Web Audio API (no files needed):
```tsx
// components/audio/AudioSystem.tsx
'use client'
import { useEffect, useRef, useState } from 'react'

class GeneratedAudio {
  ctx: AudioContext | null = null
  ambientOsc: OscillatorNode | null = null
  ambientGain: GainNode | null = null

  async start() {
    if (this.ctx) return
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Ambient drone — two detuned oscillators + low-pass filter
    const osc1 = this.ctx.createOscillator()
    const osc2 = this.ctx.createOscillator()
    osc1.frequency.value = 55  // A1
    osc2.frequency.value = 82.4  // E2
    osc1.type = 'sine'
    osc2.type = 'sine'

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 400

    const gain = this.ctx.createGain()
    gain.gain.value = 0
    gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 2)

    osc1.connect(filter); osc2.connect(filter)
    filter.connect(gain); gain.connect(this.ctx.destination)
    osc1.start(); osc2.start()

    this.ambientGain = gain
  }

  stop() {
    if (!this.ctx || !this.ambientGain) return
    this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5)
    setTimeout(() => { this.ctx?.close(); this.ctx = null }, 600)
  }

  click() {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.frequency.value = 800
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.05)
    gain.gain.value = 0.1
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05)
    osc.connect(gain); gain.connect(this.ctx.destination)
    osc.start(); osc.stop(this.ctx.currentTime + 0.05)
  }
}

export const audio = new GeneratedAudio()
```

OPTION B — Silent mode with visual-only feedback (always acceptable):
```tsx
// SoundToggle still works visually — bars animate, but no actual audio
// Add tooltip: "Sound disabled — visual feedback only"
```

The sound toggle from agency-patterns.md § SOUND-TOGGLE must ACTIVATE one of these
on click. Wire it to `audio.start()` and `audio.stop()`, not to a nonexistent file.

**Never ship a sound toggle that does nothing.**

---

## § LOTTIE — Framer Motion Recreation

**When .json Lottie files unavailable:**

### Logo reveal (letter draw-in)
```tsx
// components/ui/AnimatedLogo.tsx
'use client'
import { motion } from 'framer-motion'

export function AnimatedLogo({ text = 'BRAND' }: { text?: string }) {
  return (
    <motion.div className="flex">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="inline-block text-4xl font-light tracking-tight"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
```

### Loader (replaces .json spinner)
```tsx
// components/ui/AnimatedLoader.tsx
'use client'
import { motion } from 'framer-motion'

export function AnimatedLoader({ progress }: { progress?: number }) {
  if (progress !== undefined) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-48 h-px bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white"
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <span className="text-white/40 text-xs tracking-widest">{Math.round(progress)}%</span>
      </div>
    )
  }
  // Indeterminate
  return (
    <motion.div
      className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    />
  )
}
```

### Hamburger ↔ X (state morph)
```tsx
'use client'
import { motion } from 'framer-motion'

export function AnimatedHamburger({ open, onClick }: { open: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-10 h-10 flex flex-col items-center justify-center gap-1.5">
      <motion.span
        className="block w-6 h-px bg-white"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
      />
      <motion.span
        className="block w-6 h-px bg-white"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-6 h-px bg-white"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
      />
    </button>
  )
}
```

**Never ship a static SVG where the source has an animation.**

---

## § 3D MODELS (.glb / .gltf)

**See 3d-system.md § CORS-FALLBACK for the full protocol.**

For the specific cube.glb pattern:
```tsx
// Don't ship "FallbackBox" — ship a polished cube
function PolishedCube({ size = 2 }) {
  return (
    <mesh>
      <boxGeometry args={[size, size, size]} />
      <meshPhysicalMaterial
        metalness={0.9}
        roughness={0.05}
        color="#1a1a1a"
        envMapIntensity={3}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}
// This IS the production component. Rename "FallbackBox" → "InteractiveCube".
```

---

## § FONTS

System → Google Fonts mapping (use closest weight + style):
```
Helvetica Neue → Inter
Futura PT     → Outfit
Söhne         → Inter Tight or DM Sans
Brandon Grotesque → Plus Jakarta Sans
Garamond      → Lora or Libre Caslon Text
ABC Diatype   → Inter (300/400/500/700)
Maison Neue   → Plus Jakarta Sans
Suisse Int'l  → Inter Tight
GT America    → Inter Tight or Familjen Grotesk
Editorial New → Lora or Cormorant Garamond
NaN Tundra    → Outfit (heavy weights)
PP Neue Montreal → Plus Jakarta Sans or Inter Tight
```

```tsx
// app/layout.tsx
import { Inter, Lora } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','700'], variable: '--font-sans' })
const lora = Lora({ subsets: ['latin'], variable: '--font-serif' })
```

---

## § SIDE PANEL MENU (Numbered Nav with Draggable Cube)

For source patterns like Unseen's side panel with numbered nav + interactive 3D cube:

```tsx
// components/nav/SidePanel.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'

const NAV = [
  { num: '01', label: 'Index',    href: '/' },
  { num: '02', label: 'Projects', href: '/projects' },
  { num: '03', label: 'Contact',  href: '/contact' },
  { num: '04', label: 'World',    href: '/world' },
  { num: '05', label: 'Journal',  href: '/journal' },
]

function PolishedCube() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshPhysicalMaterial metalness={0.9} roughness={0.05} color="#1a1a1a"
          envMapIntensity={3} clearcoat={1} />
      </mesh>
    </Float>
  )
}

export function SidePanel({ open, onClose }: { open: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="fixed top-0 right-0 h-screen w-[480px] bg-[#0a0a0a] z-50 flex flex-col"
        >
          {/* Draggable cube — top half */}
          <div className="h-1/2 relative">
            <Canvas dpr={[1,2]} camera={{ position: [3,2,4], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5,5,5]} intensity={1.5} />
              <pointLight position={[-5,-5,5]} intensity={0.8} color="#ff6040" />
              <PolishedCube />
              <OrbitControls enableZoom={false} enablePan={false}
                enableDamping dampingFactor={0.05} />
            </Canvas>
            <p className="absolute bottom-4 left-6 text-xs text-white/40 tracking-widest uppercase">
              Drag to rotate
            </p>
          </div>

          {/* Numbered nav — bottom half */}
          <nav className="h-1/2 flex flex-col justify-center px-12 gap-6">
            {NAV.map((item, i) => (
              <motion.a
                key={item.num}
                href={item.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="group flex items-baseline gap-4 text-white"
              >
                <span className="text-xs opacity-40 group-hover:opacity-100 transition">{item.num}</span>
                <span className="text-3xl font-light tracking-tight group-hover:translate-x-2 transition">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </nav>

          <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white">
            Close
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
```

This is the production component. Not a stub. Not a fallback.

---

## § WARP/PAGE TRANSITION — Actually Fires on Click

**Common failure: transition wired but onClick navigates instantly without playing it.**

```tsx
// components/transitions/WarpLink.tsx
'use client'
import { useRouter } from 'next/navigation'
import { motion, useAnimationControls } from 'framer-motion'
import { useState } from 'react'

export function WarpLink({ href, children, className }: {
  href: string, children: React.ReactNode, className?: string
}) {
  const router = useRouter()
  const controls = useAnimationControls()
  const [warping, setWarping] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (warping) return
    setWarping(true)

    // ACTIVELY play the warp animation
    await controls.start({
      scale: [1, 1.05, 50],
      opacity: [1, 1, 0],
      transition: { duration: 0.7, ease: [0.4, 0, 1, 1] }
    })

    // THEN navigate
    router.push(href)
  }

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>{children}</a>
      <AnimatePresence>
        {warping && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={controls}
            className="fixed inset-0 z-[200] bg-white pointer-events-none origin-center"
          />
        )}
      </AnimatePresence>
    </>
  )
}
// Usage: <WarpLink href="/projects">View work</WarpLink>
// The warp ACTIVELY plays before navigation. Not a passive wire.
```

**Every transition trigger must visibly play. Test by clicking and watching.**

---

## § COMMIT MESSAGE PROTOCOL

When recreating instead of downloading, document in commit:
```bash
git commit -m "assets: autonomous recreation — zero user intervention

Recreated (no source asset available):
- cube.glb → R3F BoxGeometry + meshPhysicalMaterial dark chrome
- hero-loop.mp4 → CSS gradient animation, 8s loop
- triangle-overlay.mp4 → clip-path triangle + animated gradient
- logo-reveal.json → Framer Motion letter stagger
- loader.json → Framer Motion percentage bar
- hamburger.json → Framer Motion span morph
- ambient.mp3 → Web Audio API generated drone (55Hz + 82.4Hz)
- click.mp3 → Web Audio API generated tone burst

All effects match source visually/behaviorally. No placeholders remain."
```

---

## § FINAL AUTONOMY GATE — Before Declaring Done

```
PASSIVE WIRING CHECK (run these grep commands):
[ ] grep -r "TODO" components/ app/ — must return zero
[ ] grep -r "FIXME" components/ app/ — must return zero
[ ] grep -r "if user provides" — must return zero
[ ] grep -r "Fallback" components/ — every match must be PRODUCTION-NAMED
[ ] grep -r "placeholder" components/ — must return zero (except input placeholder=)
[ ] grep -r "console.warn" components/ — must return zero
[ ] grep -r "// not implemented" — must return zero

VISIBLE FIRE CHECK (Chrome MCP):
[ ] Click every button → visible action fires (not silent)
[ ] Toggle sound → visible bars animate AND audio context activates (or silent-mode tooltip)
[ ] Click warp/transition link → animation plays BEFORE navigation
[ ] Hover cube/3D model → it responds (rotation, scale, color)
[ ] Open side panel → numbered nav animates in, cube renders, drag works

COMPLETENESS CHECK:
[ ] Zero <FallbackBox /> or <FallbackXYZ /> components — all renamed to production
[ ] Zero empty refs that never play their target
[ ] Zero "coming soon" or "in progress" text
[ ] Every feature visible to user works end-to-end
```

If any line is unchecked → keep working. Do not declare done.

**The user pastes PROMPT. Walks away. Returns to a complete, autonomous, working clone.**