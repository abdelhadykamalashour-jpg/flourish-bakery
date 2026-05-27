# 3D SYSTEM — PREMIUM IMPLEMENTATION ENGINE
# Save at: .claude/3d-system.md
# Read in full before touching any 3D component.
# Contains: tier detection, anti-downgrade, CORS fallback, premium materials,
# lighting, post-processing, all boilerplate, performance budget.

---

## § TIER DETECTION — Confirm What Source Uses First

Run in DevTools console on the TARGET site before selecting a tier:

```js
// Is Three.js / R3F present?
console.log('THREE:', !!window.THREE, window.THREE?.REVISION)
document.querySelectorAll('canvas').forEach((c,i)=>{
  const fiber = Object.keys(c).find(k=>k.startsWith('__reactFiber'))
  console.log(`Canvas[${i}]: R3F=${!!fiber} size=${c.width}x${c.height}`)
})
// Is Spline present?
console.log('Spline:', document.querySelector('[data-spline-canvas]') || 
  performance.getEntriesByType('resource').filter(r=>r.name.includes('spline')).length)
// Check Network tab filter: .glb .gltf .hdr .ktx2 → R3F assets
//                           spline.design          → Spline embed
//                           lottie                 → Lottie JSON
```

**Tier Decision Matrix:**
| Source has...                   | Tier to build |
|---------------------------------|---------------|
| window.THREE or hasFiber=true   | TIER 3 — R3F  |
| spline.design URL in Network    | TIER 2 — Spline |
| CSS perspective only, no canvas | TIER 1 — CSS 3D |
| Lottie JSON in Network          | TIER 4 — Lottie |

---

## § ANTI-DOWNGRADE — Non-Negotiable Rules

**The #1 failure: detecting R3F but building CSS 3D perspective.**

1. If source is TIER 3 confirmed → BUILD TIER 3. No exceptions.
2. CORS blocks a .glb → use § CORS-FALLBACK. NOT CSS 3D.
3. "It looks similar with CSS" is never acceptable. CSS ≠ WebGL.
4. "Hydration risk" is solved by dynamic import with ssr:false. Not an excuse.
5. When unsure which tier → DEFAULT UP, never down.
6. Every page where original has 3D → clone must have 3D.

---

## § CORS-FALLBACK — Recreating Blocked 3D Assets

When .glb/.gltf returns 403 or CORS error:

**STEP 1** Screenshot the 3D object: front, side, 45°, close detail.

**STEP 2** Identify geometry from screenshots:
```
Round/organic         → SphereGeometry, TorusKnotGeometry, IcosahedronGeometry
Sharp/architectural   → BoxGeometry, OctahedronGeometry, CylinderGeometry
Ring/donut            → TorusGeometry
Abstract flowing      → TorusKnotGeometry (args tune the shape)
Grid of objects       → InstancedMesh (see § INSTANCED-GRID)
Character/humanoid    → CapsuleGeometry stack or BoxGeometry parts
```

**STEP 3** Identify material from screenshots → pick from § PREMIUM-MATERIALS

**STEP 4** Build in R3F, compare against screenshot via Chrome MCP.

---

## § PREMIUM-MATERIALS

```
npm install @react-three/drei @react-three/postprocessing
```

### Glass — MeshTransmissionMaterial (drei)
```tsx
import { MeshTransmissionMaterial } from '@react-three/drei'

// Frosted glass
<MeshTransmissionMaterial backside samples={10} thickness={0.5}
  roughness={0.1} transmission={1} ior={1.5}
  chromaticAberration={0.06} distortion={0.4} distortionScale={0.3} />

// Crystal clear
<MeshTransmissionMaterial backside samples={16} thickness={0.2}
  roughness={0} transmission={1} ior={1.8} chromaticAberration={0.02} />
```

### Metal
```tsx
// Polished chrome
<meshPhysicalMaterial metalness={1} roughness={0.05} color="#c0c0c0" envMapIntensity={2} />
// Gold
<meshPhysicalMaterial metalness={1} roughness={0.15} color="#d4af37" envMapIntensity={1.5} />
// Dark chrome
<meshPhysicalMaterial metalness={1} roughness={0} color="#1a1a1a" envMapIntensity={3} />
```

### Emissive Glow (pair with Bloom)
```tsx
// Neon — set emissiveIntensity high so Bloom picks it up
<meshStandardMaterial color="#000" emissive="#00ffff" emissiveIntensity={4} />
// Warm ember
<meshStandardMaterial color="#1a0a00" emissive="#ff6600" emissiveIntensity={2} />
// Gold glow
<meshStandardMaterial color="#3d2a00" emissive="#d4af37" emissiveIntensity={3} />
```

### Holographic / Distortion (drei)
```tsx
import { MeshDistortMaterial } from '@react-three/drei'
<MeshDistortMaterial color="#ffffff" distort={0.3} speed={2} roughness={0} metalness={0.8} />
```

### Wireframe
```tsx
<meshStandardMaterial color="#ffffff" wireframe opacity={0.25} transparent />
```

---

## § PREMIUM-LIGHTING

### Dark Cinematic (Agency / Portfolio / Web3)
```tsx
<ambientLight intensity={0.08} />
<directionalLight position={[-5,5,5]} intensity={1.2} color="#4080ff" />
<pointLight position={[5,-3,2]} intensity={2.5} color="#ff4000" />
<pointLight position={[-3,3,-5]} intensity={0.6} color="#0040ff" />
<Environment preset="night" />
```

### Luxury / Gold / Warm (Hotel, Spa, Restaurant)
```tsx
<ambientLight intensity={0.3} color="#fff8e7" />
<directionalLight position={[5,10,5]} intensity={2} color="#ffd700" castShadow />
<pointLight position={[-5,3,3]} intensity={1.2} color="#ff9500" />
<Environment preset="sunset" />
```

### Clean Tech / SaaS
```tsx
<ambientLight intensity={0.5} />
<directionalLight position={[0,10,0]} intensity={1.5} color="#ffffff" />
<pointLight position={[5,5,5]} intensity={0.8} color="#a0c4ff" />
<Environment preset="studio" />
```

### Holographic / Crypto / Futuristic
```tsx
<ambientLight intensity={0.05} />
<pointLight position={[0,0,5]} intensity={4} color="#00ffff" />
<pointLight position={[5,5,-5]} intensity={2.5} color="#ff00ff" />
<pointLight position={[-5,-5,0]} intensity={2} color="#0000ff" />
<Environment preset="warehouse" environmentIntensity={0.2} />
```

---

## § POST-PROCESSING — Full Presets

```tsx
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration,
         Vignette, Noise, ToneMapping, SMAA } from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'
```

### Dark Cinematic / Sci-fi / Agency
```tsx
<EffectComposer multisampling={0}>
  <SMAA />
  <Bloom luminanceThreshold={0.5} intensity={2.5} mipmapBlur levels={9} />
  <DepthOfField focusDistance={0.01} focalLength={0.05} bokehScale={5} />
  <ChromaticAberration offset={[0.003, 0.003]} />
  <Vignette eskil={false} offset={0.1} darkness={1.2} />
  <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.3} />
  <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
</EffectComposer>
```

### Luxury / Gold / Premium
```tsx
<EffectComposer multisampling={4}>
  <Bloom luminanceThreshold={0.85} intensity={1.0} mipmapBlur />
  <Vignette eskil={false} offset={0.15} darkness={0.9} />
  <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
</EffectComposer>
```

### Clean / Minimal / SaaS
```tsx
<EffectComposer multisampling={8}>
  <SMAA />
  <Bloom luminanceThreshold={0.9} intensity={0.5} mipmapBlur />
  <DepthOfField focusDistance={0} focalLength={0.025} bokehScale={2} />
</EffectComposer>
```

### Holographic / Crypto
```tsx
<EffectComposer multisampling={0}>
  <Bloom luminanceThreshold={0.4} intensity={4.0} mipmapBlur levels={9} />
  <ChromaticAberration offset={[0.008, 0.008]} />
  <Noise premultiply blendFunction={BlendFunction.SCREEN} opacity={0.5} />
  <Vignette eskil={false} offset={0.05} darkness={1.5} />
</EffectComposer>
```

---

## § TIER 1 — CSS 3D (only when source confirmed NO WebGL canvas)

```tsx
// Framer Motion 3D card
<motion.div style={{ perspective: 1200 }}
  whileHover={{ rotateY: 15, rotateX: -8 }}
  transition={{ type:"spring", stiffness:300, damping:20 }}>
  {children}
</motion.div>

// GSAP ScrollTrigger depth layers
// Parent: style={{ perspective:1000, transformStyle:'preserve-3d', WebkitTransformStyle:'preserve-3d' }}
gsap.to(".far",  { z:-300, ease:"none", scrollTrigger:{ scrub:true }})
gsap.to(".mid",  { z:   0, ease:"none", scrollTrigger:{ scrub:true }})
gsap.to(".near", { z: 300, ease:"none", scrollTrigger:{ scrub:true }})
```

---

## § TIER 2 — Spline Embed

```tsx
// components/3d/SplineScene.tsx
'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
const Spline = dynamic(()=>import('@splinetool/react-spline'),{
  ssr:false, loading:()=><div className="w-full h-full bg-black/20 animate-pulse"/>
})
export function SplineScene({url,interactive=false}:{url:string,interactive?:boolean}){
  return(
    <Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse"/>}>
      <Spline scene={url} style={{width:'100%',height:'100%',
        pointerEvents:interactive?'auto':'none'}}/>
    </Suspense>
  )
}
// URL always sourced from Phase 4 Network tab — never hard-coded
```

---

## § TIER 3 — React Three Fiber Full Scene

### Scene.tsx (SSR-safe wrapper — always use this pattern)
```tsx
'use client'
import dynamic from 'next/dynamic'
const SceneCanvas = dynamic(()=>import('./SceneCanvas'),{
  ssr:false, loading:()=><div className="w-full h-full bg-[#0a0a0a]"/>
})
export function Scene({className}:{className?:string}){
  return <div className={className??"relative w-full h-screen"}><SceneCanvas/></div>
}
```

### SceneCanvas.tsx (actual WebGL canvas — dynamically imported above)
```tsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, Preload } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function SceneCanvas(){
  return(
    <Canvas
      dpr={[1,Math.min(typeof window!=='undefined'?window.devicePixelRatio:1,2)]}
      camera={{position:[0,0,5],fov:45}}
      frameloop="always"
      gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}
    >
      <Suspense fallback={null}>
        {/* LIGHTING — pick preset from § PREMIUM-LIGHTING */}
        <ambientLight intensity={0.08}/>
        <directionalLight position={[-5,5,5]} intensity={1.2} color="#4080ff"/>
        <Environment preset="night"/>
        {/* SCENE OBJECTS HERE */}
        {/* POST-PROCESSING — pick preset from § POST-PROCESSING */}
        <EffectComposer><Bloom luminanceThreshold={0.5} intensity={2.5} mipmapBlur/></EffectComposer>
        <Preload all/>
      </Suspense>
    </Canvas>
  )
}
```

### Mobile fallback (always wrap R3F — never render canvas below 768px)
```tsx
export function SceneWithFallback({fallbackSrc}:{fallbackSrc:string}){
  return(<>
    <div className="hidden md:block w-full h-full"><Scene/></div>
    <div className="block md:hidden w-full h-full">
      <img src={fallbackSrc} alt="" className="w-full h-full object-cover"/>
    </div>
  </>)
}
```

### Resource disposal (add to every R3F component)
```tsx
useEffect(()=>()=>{
  scene.traverse((o:any)=>{
    o.geometry?.dispose()
    if(o.material) Array.isArray(o.material)?o.material.forEach((m:any)=>m.dispose()):o.material.dispose()
  })
},[])
```

---

## § INSTANCED-GRID — Perspective Project Grid (phantom.land style)

When source has a WebGL perspective grid (confirmed R3F, hasFiber=true):

```tsx
// components/3d/ProjectGrid3D.tsx — full R3F grid, not CSS perspective
'use client'
import dynamic from 'next/dynamic'
const Grid3DCanvas = dynamic(()=>import('./Grid3DCanvas'),{ssr:false,
  loading:()=><div className="w-full h-full bg-[#080808]"/>})
export function ProjectGrid3D({projects}:{projects:any[]}){
  return <div className="relative w-full h-screen"><Grid3DCanvas projects={projects}/></div>
}

// Grid3DCanvas.tsx
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const COLS=8, ROWS=5, GAP_X=1.8, GAP_Y=1.2

function GridCard({position,url}:{position:[number,number,number],url:string}){
  return <group position={position}><Image url={url} scale={[1.6,1.0]} transparent/></group>
}

function Grid({projects}:{projects:any[]}){
  const ref = useRef<THREE.Group>(null)
  const {mouse} = useThree()
  useFrame(()=>{
    if(!ref.current) return
    ref.current.rotation.y += (mouse.x*0.08 - ref.current.rotation.y)*0.05
    ref.current.rotation.x += (-mouse.y*0.04 - ref.current.rotation.x)*0.05
  })
  const cards = useMemo(()=>projects.map((p,i)=>({
    ...p, position:[(i%COLS-COLS/2)*GAP_X,-(Math.floor(i/COLS)-ROWS/2)*GAP_Y,0] as [number,number,number]
  })),[projects])
  return <group ref={ref}>{cards.map((p,i)=><GridCard key={i} position={p.position} url={p.image}/>)}</group>
}

export default function Grid3DCanvas({projects}:{projects:any[]}){
  return(
    <Canvas dpr={[1,2]} camera={{position:[0,2,12],fov:60}} gl={{antialias:true,alpha:true}}>
      <Grid projects={projects}/>
    </Canvas>
  )
}
```

---

## § SCROLL-LINKED — Spring Physics Camera (premium feel)

```tsx
// components/3d/SpringCameraRig.tsx — inside Canvas
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

export function SpringCameraRig(){
  const {camera} = useThree()
  const scroll = useScroll()
  const t = useRef({z:5,y:0})
  useFrame(()=>{
    const s = scroll.offset
    t.current.z = 5 - s*3
    t.current.y = s*1.5
    camera.position.z += (t.current.z - camera.position.z)*0.05
    camera.position.y += (t.current.y - camera.position.y)*0.05
    camera.lookAt(0,0,0)
  })
  return null
}
// Wrap scene in ScrollControls from drei:
// <ScrollControls pages={3} damping={0.3}>
//   <SpringCameraRig/>
//   {/* scene objects */}
// </ScrollControls>
```

---

## § MOUSE-PARALLAX — Hook

```tsx
// hooks/useMouseParallax.ts
import { useEffect, useRef } from 'react'
export function useMouseParallax(strength=0.05){
  const ref = useRef({x:0,y:0})
  useEffect(()=>{
    const h=(e:MouseEvent)=>{
      ref.current.x=(e.clientX/window.innerWidth-0.5)*strength
      ref.current.y=(e.clientY/window.innerHeight-0.5)*strength
    }
    window.addEventListener('mousemove',h)
    return()=>window.removeEventListener('mousemove',h)
  },[strength])
  return ref
}
// In useFrame: ref.current.rotation.y += (mouse.current.x - ref.current.rotation.y)*0.05
//              ref.current.rotation.x += (mouse.current.y - ref.current.rotation.x)*0.05
```

---

## § FLOAT-COMPONENT — Levitation (drei)

```tsx
import { Float } from '@react-three/drei'
<Float speed={2} rotationIntensity={0.4} floatIntensity={0.8} floatingRange={[-0.1,0.1]}>
  <mesh>
    <torusKnotGeometry args={[1,0.3,128,32]}/>
    <MeshTransmissionMaterial backside samples={10} thickness={0.5} roughness={0} transmission={1}/>
  </mesh>
</Float>
```

---

## § PARTICLES — Premium Patterns

### Sparkles — zero config, premium look (drei)
```tsx
import { Sparkles } from '@react-three/drei'
<Sparkles count={200} scale={6} size={2} speed={0.4} opacity={0.6} color="#ffffff"/>
// Gold: color="#d4af37" size={1.5}
// Holographic: color={['#ff00ff','#00ffff','#ffff00']} size={3}
```

### Custom particles
```tsx
export function Particles({count=2000,color='#ffffff',size=0.015,spread=10,speed=0.03}){
  const mesh = useRef<THREE.Points>(null)
  const pos = useMemo(()=>{
    const p=new Float32Array(count*3)
    for(let i=0;i<count;i++){p[i*3]=(Math.random()-.5)*spread;p[i*3+1]=(Math.random()-.5)*spread;p[i*3+2]=(Math.random()-.5)*spread}
    return p
  },[count,spread])
  useFrame((_,d)=>{if(mesh.current)mesh.current.rotation.y+=d*speed})
  return(<points ref={mesh}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[pos,3]}/></bufferGeometry>
    <pointsMaterial size={size} color={color} transparent opacity={0.6} sizeAttenuation depthWrite={false}/>
  </points>)
}
```

---

## § LOADING-SEQUENCE — Premium Entry

```tsx
// components/3d/SceneLoader.tsx — use inside Suspense fallback
'use client'
import { useProgress, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
export function SceneLoader(){
  const {progress,active}=useProgress()
  return(<Html center><AnimatePresence>{active&&(
    <motion.div initial={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}}
      className="flex flex-col items-center gap-3">
      <div className="w-48 h-px bg-white/20 relative overflow-hidden">
        <motion.div className="absolute inset-y-0 left-0 bg-white"
          animate={{width:`${progress}%`}} transition={{ease:'easeOut'}}/>
      </div>
      <span className="text-white/40 text-xs tracking-widest">{Math.round(progress)}%</span>
    </motion.div>
  )}</AnimatePresence></Html>)
}
// Usage: <Suspense fallback={<SceneLoader/>}> inside Canvas
```

---

## § TIER 4 — Lottie

```tsx
'use client'
import dynamic from 'next/dynamic'
const Lottie = dynamic(()=>import('lottie-react'),{ssr:false,
  loading:()=><div className="w-full h-full animate-pulse bg-transparent"/>})
export function LottiePlayer({src,loop=true,autoplay=true,className}:{src:object,loop?:boolean,autoplay?:boolean,className?:string}){
  return <Lottie animationData={src} loop={loop} autoplay={autoplay} className={className??'w-full h-full'}/>
}
```

---

## § ALL-PAGES-3D-AUDIT — Run Before Declaring Done

For every page in the site:
```
[ ] Does original page have 3D? (canvas / particle / Spline / parallax)
[ ] Is it implemented in the clone — at correct tier (not downgraded)?
[ ] Does post-processing preset match source mood?
[ ] Does mouse parallax respond on desktop?
[ ] Mobile fallback in place (no canvas below 768px)?
[ ] Zero WebGL errors in DevTools console?
[ ] FPS 55+ in Chrome DevTools Performance?
[ ] Scene loads with SceneLoader, not just a pulsing div?
```
Fail on any page → fix before running hooks.

---

## § PERFORMANCE BUDGET

| Metric              | Target  | Fix                              |
|---------------------|---------|----------------------------------|
| Canvas DPR          | max 2   | dpr={[1,2]}                      |
| Particles           | max 5k  | InstancedMesh above 1000         |
| GLB size            | max 1MB | DRACO compress                   |
| FPS                 | 55+     | Cut particles, disable shadows   |
| Bloom intensity     | 0.5–4.0 | Reduce if blown out              |
| ChromaticAberration | ≤ 0.004 | Reduce if edge artifacts         |
| Mobile canvas       | NEVER   | Fallback always below 768px      |
| SceneCanvas import  | dynamic ssr:false | Always, zero exceptions|

---

## § IMAGE-KEYWORDS

Hotel: luxury hotel interior, grand lobby, suite bedroom, pool twilight
Restaurant: fine dining table, plated dish, candlelit restaurant, chef kitchen
Gym: athlete training, modern gym, fitness lifestyle, weights
Clinic: modern medical, doctor consultation, clean clinic interior
Car Agency: luxury car showroom, sports car detail, auto dealership
Nursery: children learning, bright classroom, kids outdoor, nursery room
Real Estate: luxury property, modern architecture, open plan living
SaaS: clean workspace, minimal desk, tech office, developer coding
Spa: spa interior, massage candles, wellness pool, serene stones
Web Agency: dark creative studio, code screen, team collaboration, brand mockup
Portfolio: design mockup dark, creative workspace, abstract gradient, typographic poster
E-Commerce: product flat lay, lifestyle fashion, luxury packaging, clean product photography

---

## § EYEBROW-EXAMPLES

Hotel: "WHERE LUXURY MEETS COMFORT" / "YOUR PRIVATE SANCTUARY"
Restaurant: "A TABLE WORTH REMEMBERING" / "THE ART OF DINING"
Gym: "BUILT FOR CHAMPIONS" / "FORGE YOUR BEST SELF"
Clinic: "CARE BEYOND THE ORDINARY" / "YOUR HEALTH, PERFECTED"
Agency: "BUILT FOR THE BOLD" / "WHERE CODE MEETS CRAFT"
SaaS: "SHIP FASTER" / "BUILT FOR SCALE" / "ZERO COMPROMISE"
Spa: "STILLNESS RESTORED" / "RITUAL OVER ROUTINE"
Real Estate: "SPACES THAT ENDURE" / "LIVE BEAUTIFULLY"
Shop: "CURATED FOR YOU" / "CRAFTED WITH INTENTION"
Portfolio: "SELECTED WORKS" / "BUILT WITH PURPOSE"
Nursery: "WHERE WONDER BEGINS" / "LEARNING THROUGH PLAY"