# AGENCY PATTERNS — Awwwards-Tier Signature Library
# Save at: .claude/agency-patterns.md
# Read in full when cloning ANY creative agency / portfolio / studio site.
# Referenced by CLAUDE.md when source has agency-tier interactions.

These are the patterns that separate "looks similar" from "feels identical."
Every Awwwards-tier agency site uses some combination of these.
If source has it, you build it. No skipping.

---

## § AGENCY-DETECTION — Is this an Awwwards-tier site?

If 3+ of these are present, treat as PREMIUM AGENCY tier (full pattern library applies):
- Letter-by-letter intro loader
- Audio entry prompt or sound toggle
- Click & Hold gate or trigger
- Draggable 3D world / orbital scene
- Numbered nav (01 Index, 02 Projects...)
- Hover labels next to nav text
- Custom cursor with text reveal
- Filter pills with morphing state
- Project grid that animates on filter change
- Awwwards badge or "Studio of the Year" mention
- Multi-office contact section
- Yearly "Wrapped" or anniversary page

When detected → execute every section below that applies. Never skip "because it's complex."

---

## § FULL-SITE-COVERAGE — Anti-Shell Mandate

THE #1 AGENCY-CLONE FAILURE: cloning the homepage and stubbing every other page.

Every URL in the nav is a FULL build, not a placeholder. Specifically:
- /projects → complete filterable grid with all source projects + hover states
- /world (or /lab, /experiments) → full WebGL exploration scene
- /contact → multi-office, full form with focus states, social links
- /about → team grid, founder portraits, credentials, awards
- /journal or /blog → full index + at least 3 article pages
- Any other linked page → built completely

**Coverage check before declaring done:**
```
Count interactive elements on EACH source page (links, buttons, hover targets)
Count on EACH clone page
Clone count must be ≥ 85% of source count per page
Below 85% = page is a shell, not a clone
```

---

## § LETTER-LOADER — Staggered Letter Intro

Source pattern: "U N S E N E" letters appear one by one, then settle into the wordmark.

```tsx
// components/intro/LetterLoader.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const LETTERS = ['B','L','O','O','M','W'] // brand-specific letters

export function LetterLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'letters'|'wordmark'|'done'>('letters')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('wordmark'), LETTERS.length * 200 + 400)
    const t2 = setTimeout(() => { setPhase('done'); onComplete() }, LETTERS.length * 200 + 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {phase === 'letters' && (
            <div className="flex flex-col items-center gap-8 text-white">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.2, duration: 0.6, ease: [0.22,1,0.36,1] }}
                  className="text-7xl font-light tracking-tight"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          )}
          {phase === 'wordmark' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-white text-3xl tracking-tight"
            >
              Bloom World Studio®
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

---

## § AUDIO-ENTRY-PROMPT — "Enter with/without audio"

Source pattern: After letter loader, user chooses audio on/off before entering site.

```tsx
// components/intro/AudioEntry.tsx
'use client'
import { motion } from 'framer-motion'

export function AudioEntry({ onEnter }: { onEnter: (audio: boolean) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="fixed inset-0 z-[99] bg-[#0a0a0a] flex flex-col items-center justify-center gap-12 text-white"
    >
      <div className="text-center max-w-xl px-6">
        <h1 className="text-5xl font-light tracking-tight mb-6">Brand Name®</h1>
        <p className="text-white/60 text-lg leading-relaxed">
          A creative studio crafting refreshingly unexpected ideas and striking
          visuals that help bold brands cut through the noise.
        </p>
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => onEnter(true)}
          className="px-8 py-3 border border-white/30 hover:bg-white hover:text-black transition-all duration-500 tracking-wide"
        >
          Enter
        </button>
        <button
          onClick={() => onEnter(false)}
          className="px-8 py-3 border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-all duration-500 tracking-wide"
        >
          Enter without audio
        </button>
      </div>
    </motion.div>
  )
}
```

---

## § SOUND-TOGGLE — Persistent Audio State

```tsx
// components/ui/SoundToggle.tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export function SoundToggle({ initialOn = false, src = '/audio/ambient.mp3' }) {
  const [on, setOn] = useState(initialOn)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }
    on ? audioRef.current.play().catch(()=>{}) : audioRef.current.pause()
  }, [on, src])

  return (
    <button
      onClick={() => setOn(!on)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 hover:text-white"
    >
      <span>Sound</span>
      <div className="flex items-end gap-0.5 h-3">
        {[0,1,2,3].map(i => (
          <motion.div
            key={i}
            className="w-0.5 bg-white"
            animate={on
              ? { height: ['30%','100%','60%','100%','30%'] }
              : { height: '30%' }
            }
            transition={{
              repeat: on ? Infinity : 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </button>
  )
}
```

---

## § CLICK-AND-HOLD-GATE — Progress Bar Hold Interaction

Source pattern: Hold mouse down, progress bar fills, triggers navigation/action.

```tsx
// components/ui/ClickAndHold.tsx
'use client'
import { useState, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

export function ClickAndHold({
  duration = 1200,
  onComplete,
  label = 'Click & Hold'
}: { duration?: number, onComplete: () => void, label?: string }) {
  const progress = useMotionValue(0)
  const animRef = useRef<any>(null)

  const start = () => {
    animRef.current = animate(progress, 1, {
      duration: duration / 1000,
      ease: 'linear',
      onComplete: () => { onComplete(); progress.set(0) }
    })
  }
  const end = () => { animRef.current?.stop(); animate(progress, 0, { duration: 0.3 }) }

  return (
    <button
      onMouseDown={start} onMouseUp={end} onMouseLeave={end}
      onTouchStart={start} onTouchEnd={end}
      className="relative px-10 py-4 border border-white/30 text-white tracking-widest uppercase text-sm overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-white origin-left"
        style={{ scaleX: progress }}
      />
      <motion.span className="relative mix-blend-difference">{label}</motion.span>
    </button>
  )
}
```

---

## § NUMBERED-NAV — 01/02/03 with Hover Labels

```tsx
// components/nav/NumberedNav.tsx
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ITEMS = [
  { num: '01', label: 'Index', href: '/' },
  { num: '02', label: 'Projects', href: '/projects' },
  { num: '03', label: 'Contact', href: '/contact' },
  { num: '04', label: 'World', href: '/world' },
]

export function NumberedNav() {
  return (
    <nav className="fixed top-6 right-6 z-40 flex flex-col gap-3">
      {ITEMS.map(item => (
        <Link key={item.num} href={item.href} className="group flex items-center gap-2 text-white">
          <span className="text-xs opacity-50 group-hover:opacity-100 transition">{item.num}</span>
          <span className="text-sm tracking-wide">{item.label}</span>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-xs opacity-0 group-hover:opacity-60"
          >
            {item.label}
          </motion.span>
        </Link>
      ))}
    </nav>
  )
}
```

---

## § ARROW-LINKS — ⮡ Custom Arrow Style

Source pattern: every link prefixed with ⮡ (or ↗, →, ↘) — signature touch.

```tsx
// components/ui/ArrowLink.tsx
import { motion } from 'framer-motion'

export function ArrowLink({ href, children, arrow = '⮡' }: { href: string, children: React.ReactNode, arrow?: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white transition">
      <motion.span
        className="inline-block"
        whileHover={{ x: 3, y: -3 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >{arrow}</motion.span>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
    </a>
  )
}
// Usage: <ArrowLink href="mailto:hello@brand.co">hello@brand.co</ArrowLink>
```

---

## § FILTER-PILLS — Morphing Filter State

```tsx
// components/projects/FilterPills.tsx
'use client'
import { useState } from 'react'
import { motion, LayoutGroup } from 'framer-motion'

const FILTERS = ['All','Branding','Digital','Motion','Experiment']

export function FilterPills({ onChange }: { onChange: (f: string) => void }) {
  const [active, setActive] = useState('All')

  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 backdrop-blur rounded-full">
      <LayoutGroup>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => { setActive(f); onChange(f) }}
            className="relative px-5 py-2 text-sm tracking-wide"
          >
            {active === f && (
              <motion.div
                layoutId="filter-pill"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative ${active === f ? 'text-black' : 'text-white/70'}`}>{f}</span>
          </button>
        ))}
      </LayoutGroup>
    </div>
  )
}
```

---

## § CUSTOM-CURSOR-WITH-TEXT — Reveal on Hover

```tsx
// components/cursor/Cursor.tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 40 })
  const sy = useSpring(y, { stiffness: 400, damping: 40 })
  const [variant, setVariant] = useState<'default'|'hover'|'drag'>('default')
  const [label, setLabel] = useState('')

  useEffect(() => {
    document.documentElement.style.cursor = 'none'
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const hover = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const cursorText = t.closest('[data-cursor]')?.getAttribute('data-cursor')
      if (cursorText) { setVariant('hover'); setLabel(cursorText) }
      else { setVariant('default'); setLabel('') }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', hover)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', hover)
      document.documentElement.style.cursor = ''
    }
  }, [x, y])

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-difference"
    >
      <motion.div
        animate={variant === 'hover' ? { scale: 4 } : { scale: 1 }}
        className="w-3 h-3 -ml-1.5 -mt-1.5 bg-white rounded-full flex items-center justify-center"
      >
        {label && (
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[8px] text-black font-medium tracking-wider uppercase whitespace-nowrap"
          >{label}</motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
// Usage on any element: <div data-cursor="VIEW">...</div>
// Cursor scales 4x and shows "VIEW" text on hover
```

---

## § DRAGGABLE-3D-WORLD — Orbital Explorable Scene

Source pattern: "Drag to explore our world" — full WebGL scene with drag controls.

```tsx
// components/world/World3D.tsx
'use client'
import dynamic from 'next/dynamic'
const WorldCanvas = dynamic(() => import('./WorldCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#050505]" />
})
export function World3D() { return <div className="w-screen h-screen"><WorldCanvas /></div> }

// WorldCanvas.tsx
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sparkles, Float, Environment, useGLTF } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'

function WorldObjects() {
  // Replace with actual extracted project assets / branded shapes
  return (
    <>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[2,1,0]}>
          <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
          <meshPhysicalMaterial metalness={1} roughness={0.1} color="#d4af37" envMapIntensity={2} />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2,-1,1]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#000" emissive="#ff4040" emissiveIntensity={2} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0,2,-1]}>
          <sphereGeometry args={[0.7, 64, 64]} />
          <meshPhysicalMaterial metalness={0.3} roughness={0} transmission={1} thickness={0.5}
            ior={1.5} clearcoat={1} />
        </mesh>
      </Float>
      <Sparkles count={300} scale={12} size={2} speed={0.3} opacity={0.6} color="#ffffff" />
    </>
  )
}

export default function WorldCanvas() {
  return (
    <Canvas dpr={[1,2]} camera={{ position: [0,0,8], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5,5,5]} intensity={1.5} />
        <pointLight position={[-5,-5,5]} intensity={1} color="#ff6040" />
        <Environment preset="night" />
        <WorldObjects />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={14}
          enableDamping
          dampingFactor={0.05}
          autoRotate
          autoRotateSpeed={0.4}
        />
        <EffectComposer>
          <Bloom luminanceThreshold={0.6} intensity={1.8} mipmapBlur />
          <ChromaticAberration offset={[0.002, 0.002]} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

// Add to /world page: <World3D />
// "Drag to explore" label sits above canvas with motion fade-out on first drag
```

---

## § PROJECT-GRID-WITH-FILTER — Full Filterable Work Display

```tsx
// components/projects/ProjectGrid.tsx
'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FilterPills } from './FilterPills'

interface Project {
  slug: string; title: string; client: string; year: string
  tags: string[]; image: string; href: string
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(() =>
    filter === 'All' ? projects : projects.filter(p => p.tags.includes(filter))
  , [projects, filter])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-5xl font-light tracking-tight">Selected Projects</h2>
        <FilterPills onChange={setFilter} />
      </div>
      <motion.div layout className="grid grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.a
              key={p.slug}
              href={p.href}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.04, ease: [0.22,1,0.36,1] }}
              className="group relative overflow-hidden aspect-[4/3]"
              data-cursor="VIEW"
            >
              <motion.img
                src={p.image} alt={p.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute bottom-0 left-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-xs tracking-widest uppercase opacity-60">{p.client} — {p.year}</p>
                <h3 className="text-2xl font-light mt-1">{p.title}</h3>
                <div className="flex gap-2 mt-2">
                  {p.tags.map(t => <span key={t} className="text-xs opacity-60">{t}</span>)}
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
```

---

## § MULTI-OFFICE-CONTACT — Studio Locations Block

```tsx
// components/contact/MultiOffice.tsx
const OFFICES = [
  { city: 'Bristol', address: ['35a Colston Avenue', 'Bristol, BS1 4TT'] },
  { city: 'London',  address: ['90 Paul Street',     'London, EC2A 4NE'] },
]

export function MultiOffice() {
  return (
    <div className="grid grid-cols-2 gap-12">
      {OFFICES.map(o => (
        <div key={o.city}>
          <p className="text-xs tracking-widest uppercase opacity-50 mb-3">{o.city}</p>
          {o.address.map(line => <p key={line} className="text-lg font-light">{line}</p>)}
        </div>
      ))}
    </div>
  )
}
```

---

## § YEAR-WRAPPED-CARD — Anniversary / Yearly Promo

```tsx
export function YearWrappedCard({ year, href }: { year: string, href: string }) {
  return (
    <a href={href} className="group relative block aspect-square overflow-hidden bg-gradient-to-br from-orange-500 to-pink-600">
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-white"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-8xl font-bold tracking-tight">{year}</span>
        <span className="text-sm tracking-widest uppercase mt-2">Wrapped ↗</span>
      </motion.div>
    </a>
  )
}
```

---

## § PREMIUM-AGENCY-CHECKLIST — Run Before Declaring Done

For premium agency clones, EVERY YES below must be present in clone if it's in source:

```
INTRO/LOADER
[ ] Letter-by-letter staggered intro animation
[ ] Audio entry prompt (Enter / Enter without audio)
[ ] Persistent sound toggle (bottom corner)
[ ] Click & Hold gate if source has one

NAVIGATION
[ ] Numbered nav (01 / 02 / 03 ...) if source has it
[ ] Hover labels next to nav items
[ ] Custom cursor with text reveal on hover
[ ] ⮡ or ↗ or ↘ arrows on every link

CONTENT PAGES (all must be fully built — not stubbed)
[ ] /projects with FilterPills + full project grid + hover overlays
[ ] /world (or /lab) with draggable 3D scene
[ ] /contact with multi-office block + form with focus states
[ ] /about with team, founders, awards (if in source)
[ ] /journal or /blog with index + article pages (if in source)

INTERACTIONS
[ ] Every hover state from source replicated
[ ] Every drag/scroll/click interaction replicated
[ ] Every form focus/loading/success state
[ ] Every gate/lock/reveal pattern

PRESENCE
[ ] Awwwards-style copyright (©YEAR placement matches source)
[ ] Year promo card if source has one ("2025 Wrapped")
[ ] Social link block matches source exactly
[ ] Multi-office addresses if applicable

COVERAGE METRIC
[ ] Interactive element count per page ≥ 85% of source page count
[ ] Zero "stub" or "coming soon" pages
[ ] Every nav link routes to a fully built page
```

If ANY box is unchecked → keep building. Do not declare done.