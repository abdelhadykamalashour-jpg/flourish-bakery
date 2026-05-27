Read CLAUDE.md, .claude/3d-system.md, .claude/agency-patterns.md, and .claude/asset-fallback.md in full first.

LIVE QA MODE. Live URL is in CLAUDE.md PROJECT block.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 0 — DEEP DOM SNIFFING & ARCHITECTURE (MANDATORY FIRST STEP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ THIS RUNS BEFORE PHASE 1. IT DETERMINES THE ENTIRE SCAFFOLD.
Getting this wrong = wrong architecture = broken clone. No exceptions.

Open Chrome MCP. Navigate to the Target URL.
Run ALL of the following in DevTools console:

STEP 1 — Navigation type test:
Click every nav link. Watch the browser URL bar.
Record what happens to determine TYPE A, TYPE B, or TYPE C architecture.

STEP 2 — Document structure test:
  document.querySelectorAll('section, [data-section], [data-page], [data-panel], [data-slide]').length

STEP 3 — Visual Media & WebGL Sniffing (MANDATORY):
  // 1. Force a 4-second delay for shaders, 3D, and background videos to load
  await new Promise(r => setTimeout(r, 4000));
  
  // 2. Detect ANY WebGL context, not just Three.js
  document.querySelectorAll('canvas').forEach((c, i) => {
    const gl = c.getContext('webgl') || c.getContext('webgl2');
    const fiber = Object.keys(c).find(k => k.startsWith('__reactFiber'));
    console.log(`Canvas[${i}]: Size=${c.width}x${c.height}, WebGL=${!!gl}, R3F=${!!fiber}`);
  });

  // 3. Detect hidden or background videos
  document.querySelectorAll('video').forEach((v, i) => {
    console.log(`Video[${i}]: src=${v.currentSrc || 'blob/stream'}, autoPlay=${v.autoplay}, loop=${v.loop}, zIndex=${window.getComputedStyle(v).zIndex}`);
  });

STEP 4 — Scroll library detection:
  console.log('FullPage.js:', !!window.fullpage_api)
  console.log('Locomotive:', !!window.locomotiveScroll)
  console.log('GSAP ST:', typeof gsap !== 'undefined' && !!gsap.ScrollTrigger)
  console.log('Lenis:', !!window.lenis)

DECLARE THE ARCHITECTURE TYPE BEFORE PROCEEDING (TYPE A, B, or C).

JIT CONTEXT LOADING:
- If Step 3 detects WebGL or React Fiber canvases, you MUST read `.claude/3d-system.md` in full right now.
- If the site is TYPE B or has heavy custom cursors/loaders, you MUST read `.claude/agency-patterns.md` in full right now.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — FULL SITE DISCOVERY & VISUAL ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Chrome MCP. Navigate to Target URL. 

1. Wait exactly 4 seconds for all 3D and video assets to render.
2. Screenshot every page/section.
3. MANDATORY VISUAL DESCRIPTION: Before moving to Phase 2, output a written description of the screenshot. Explicitly state:
   - Is there a background video playing?
   - Are there 3D objects, particles, or complex gradients visible?
   - What is the exact typography hierarchy?
4. LIST EVERY SECTION/URL. This is the BUILD CONTRACT. Document section order, every nav link, footer, decorative SVGs, loader behavior, navbar, mobile menu, ALL inline interactions.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — INTERACTION AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Click every nav link, every CTA, every link in footer
- Open cart drawer if present
- Open mobile menu
- Confirm zero dead links

TYPE B additional:
[ ] Click each nav item → page scrolls to correct section (not router.push)
[ ] Scroll progress indicator updates as sections scroll into view
[ ] Nav active state updates to reflect current section
[ ] All work/project items within the work section have hover states
[ ] Any project detail expand/modal opens from within the work section

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — ANIMATION AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Page loader fires on every route change (TYPE A/C) or on entry (TYPE B)
- Hero/intro animations on every page/section (initial/animate)
- Scroll reveals trigger correctly
- Lenis active

TYPE B — SCROLL PIPELINE AUDIT:
[ ] Scrolling from top to bottom travels through ALL sections in correct order
[ ] No sections are skipped or unreachable by scroll
[ ] GSAP ScrollTrigger pins working — sections hold during their scroll duration
[ ] Section-to-section transitions fire (clip-path / opacity / scale)
[ ] Scroll progress indicator moves smoothly through entire journey
[ ] Camera/3D scene responds to scroll position within pinned sections
[ ] Content reveals within each section animate on section entry

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — BUILD AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
npm run build → report pass/fail

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — BRAND AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
bash .claude/hooks/pre-done.sh
bash .claude/hooks/check-content.sh
Report leaks/placeholders

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6 — 3D SCENE AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For EVERY section/page with 3D in source:

TIER VERIFICATION:
- Implemented tier matches source tier (no CSS 3D where R3F was confirmed)
- DevTools: !!window.THREE on clone = true if source uses R3F

CANVAS:
- Renders without WebGL errors
- Zero hydration mismatches
- SceneLoader percentage bar shows then fades

VISUAL:
- Post-processing matches source (bloom/DoF/CA/vignette)
- Materials correct: glass/metal/emissive identified
- Lighting mood matches
- Mouse parallax responds smoothly

PERFORMANCE:
- Avg FPS 55+ (Chrome DevTools Performance, 5s record)
- GPU memory under 200MB
- Navigate away + back → no duplicate canvas

MOBILE:
- Canvas hidden below 768px, fallback shows
- Zero Three.js errors on mobile

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6.5 — VISUAL PARITY BLINK TEST (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You must visually verify the clone using Chrome MCP. Do not rely solely on DOM properties.

1. CAPTURE ORIGINAL: Use Chrome MCP to navigate to the original source URL. Wait 4 seconds, then capture a screenshot of the Hero section.
2. CAPTURE CLONE: Use Chrome MCP to navigate to the local clone. Wait 4 seconds, then capture a screenshot of the clone's Hero section.
3. VISUAL COMPARISON: Analyze both screenshots side-by-side. 
   [ ] Does the clone have the exact same background texture, video, or 3D element?
   [ ] Is the original dynamic (particles, video) while the clone is static or a flat color?
   [ ] Are the premium typography weights and kerning identical?

FAIL immediately if the clone is missing a background video, image, or WebGL canvas present in the original. If FAIL, you must return to the execution phase, fix the missing visual assets, and re-run this Blink Test.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6.6 — CONTENT SUBSTITUTION & COPYRIGHT AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verify that the clone does NOT contain the original website's proprietary text or media.

1. Check 3 major headings (H1/H2). Are they completely different from the original text while maintaining the same line-wrapping and styling?
2. Check the paragraph text. Is it rewritten or high-quality placeholder?
3. Check `<img>` and `<video>` tags. Are the sources entirely different from the original target's CDNs/URLs?

FAIL immediately if the original text strings, branding, or source images were copy-pasted into the clone. If FAIL, use the Chrome MCP to read the current DOM, rewrite the offending text strings, swap the images, and re-run this audit.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 7 — LIGHTHOUSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Desktop Lighthouse on live URL:
- Performance: flag if <70
- LCP: flag if >3.5s
- CLS: must be 0
- TBT: flag if >300ms

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 8 — COVERAGE & DEPTH AUDIT (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Compare clone against original section by section / page by page.

For each section/URL in the Phase 1 site map, report:
  Section/URL: [name/path]
  Source interactive count: [N]  (count of links/buttons/hovers/drags)
  Clone interactive count:  [M]
  Coverage: M/N = [X%]
  Status: [✅ ≥85%] or [❌ <85% — SHELL DETECTED]

TYPE A/C — pages to specifically verify exist AND are fully built:
[ ] /projects with full grid + filter + hover overlays + every project linked
[ ] /world or /lab with full WebGL exploration (if source has it)
[ ] /contact with multi-office + form + social links + all states
[ ] /about with team + founders + awards (if source has them)
[ ] /journal or /blog with index + actual article pages (if source has them)
[ ] Every individual project detail page from /projects (if source has them)

TYPE B — sections to verify within the single page:
[ ] Hero/intro section — full-screen, all animations, scroll prompt
[ ] Work/projects section — full project list, hover states, item interactions
[ ] About section — team, bio, credentials, all text content
[ ] Contact section — form, offices, social links, all states
[ ] Any additional sections (awards, process, lab, etc.)
[ ] Sections appear in correct ORDER matching source
[ ] NO content is accessible only via a separate route that doesn't exist in source

If ANY section/page is <85% coverage → REBUILD before passing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 9 — MICRO-INTERACTIONS AUDIT (if agency-tier)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run § PREMIUM-AGENCY-CHECKLIST from agency-patterns.md.
Verify every YES item from source is implemented:

INTRO:
[ ] Letter-by-letter staggered intro
[ ] Audio entry prompt (Enter / Enter without audio)
[ ] Persistent sound toggle in corner
[ ] Click & Hold gate if source has one

NAV:
[ ] Numbered nav (01/02/03)
[ ] Hover labels on nav items
[ ] Custom cursor with text reveal (data-cursor attributes used)
[ ] ⮡ or ↗ arrows on links
[ ] TYPE B: Nav items scroll to section refs (not router.push)
[ ] TYPE B: Nav active state updates based on scroll position

GRID/CONTENT:
[ ] Filter pills morph between states
[ ] Project grid hover overlays match source
[ ] Cursor changes on grid hover ("VIEW")

CONTACT:
[ ] Multi-office block if source has multiple cities
[ ] Form focus states + loading + success transitions

PRESENCE:
[ ] Year-wrapped card if source has one
[ ] Awwwards / awards mentions if applicable
[ ] Copyright placement matches source

For each unchecked box → IMPLEMENT before declaring ready.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 10 — AUTONOMY & ACTIVATION AUDIT (MANDATORY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Detects passive wiring and waiting-for-user patterns.

GREP CHECKS (run from project root):
[ ] grep -rn "TODO" components/ app/ lib/ — must return zero
[ ] grep -rn "FIXME" components/ app/ lib/ — must return zero
[ ] grep -rn "user provides\|user will" components/ app/ — must return zero
[ ] grep -rn "not implemented\|coming soon" components/ app/ — must return zero
[ ] grep -rn "console.warn" components/ app/ — must return zero
[ ] grep -rn "Fallback" components/ — every match must be renamed to production
[ ] grep -rn 'placeholder' components/ app/ | grep -v 'placeholder=' — must return zero

VISIBLE-FIRE CHECKS (Chrome MCP — click and watch):
[ ] Click sound toggle → bars animate AND (audio plays OR silent-mode tooltip shows)
[ ] Click warp/transition link → animation plays BEFORE route changes (TYPE C)
[ ] Click hamburger → SidePanel slides in, cube renders, nav animates
[ ] Hover 3D cube/model → it visibly responds (rotation/scale/material change)
[ ] Drag 3D scene → OrbitControls actually orbit
[ ] Click & Hold gate → progress bar fills AND triggers action at 100%
[ ] Click filter pill → grid items reflow with morph animation
[ ] Hover project card → cursor text changes ("VIEW") AND overlay fades in
[ ] Click any nav link → correct section reached (TYPE B) or page changes (TYPE A/C)

RECREATION VERIFICATION:
[ ] If source has video → clone has video OR equivalent animated gradient
[ ] If source has audio → clone has audio (file or Web Audio) OR silent-mode toggle
[ ] If source has Lottie → clone has Framer Motion recreation
[ ] If source has .glb model → clone has model OR R3F primitive equivalent
[ ] git log shows commit message listing what was recreated

PASSIVE WIRE DETECTION (this is the critical one):
For every onClick/onMouseDown/onHover handler in the codebase:
- Trace what visibly happens in the UI
- If "nothing visible" → FAIL, must add visible effect or remove handler

Any unchecked box → REBUILD before passing. Zero exceptions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 11 — SCROLL PIPELINE INTEGRITY (MANDATORY for TYPE B)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Skip this phase if source is TYPE A or TYPE C.
Run this phase if source architecture is TYPE B (full-scroll SPA).

SECTION REACHABILITY TEST:
Open Chrome MCP on the clone. Start at the very top of the page.
Scroll continuously from top to bottom. For each section in Phase 1 list:
[ ] Section appears in correct order
[ ] Section is fully visible (not clipped, not offset, not blank)
[ ] Section content animates in on entry
[ ] Section height is full-viewport or matches source proportion
[ ] All interactive elements in section are reachable by mouse

NAV JUMP TEST:
[ ] Click each nav item → page scrolls smoothly to that exact section
[ ] After jump, scroll position correctly resumes from that section
[ ] Back-scroll from any point is smooth and continuous (no jump/stutter)
[ ] No nav item routes to a separate URL (router.push = FAIL on TYPE B)

SCROLL PROGRESS TEST:
[ ] Scroll progress indicator (line, counter, dots) moves as you scroll
[ ] Indicator correctly shows position within full scroll journey
[ ] Indicator is visible throughout all sections, not only the first

PINNING TEST:
[ ] GSAP ScrollTrigger pins are working — sections hold during their duration
[ ] Content within pinned sections reveals/animates as intended
[ ] Scrolling past a pinned section correctly unpins and advances
[ ] No sections that should be pinned are scrolling too fast (un-pinned)

ISOLATION FAILURE CHECK:
Run this grep ONCE. Any result = ARCHITECTURE FAILURE, requires rebuild:
  grep -rn "router.push\|router.replace\|useRouter" components/sections/ app/sections/
  → ANY match on a TYPE B site = section is routing instead of scrolling = FAIL
  grep -rn "page.tsx" app/ | grep -v "app/page.tsx" | grep -v "layout" | grep -v "error"
  → Any sub-pages listed = TYPE B built as TYPE A = CRITICAL FAILURE, must rebuild

FULL JOURNEY RECORD:
Take a Chrome MCP screen recording of the entire scroll journey,
top to bottom, no skipping. Confirm:
  [ ] Total section count in clone = total section count in source
  [ ] All sections reachable
  [ ] No blank/empty sections
  [ ] Visual quality matches source per section (screenshot comparison)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARCHITECTURE:  [TYPE A/B/C — source matches clone: yes/no]
PAGES/SECTIONS:[X/X passing]
INTERACTIONS:  [X/X working]
ANIMATIONS:    [X/X confirmed]
BUILD:         [pass/fail]
BRAND:         [clean/issues]
3D SCENES:     [X/X correct tier — avg FPS — all sections: yes/no]
LIGHTHOUSE:    [Perf — LCP — CLS]
COVERAGE:      [X/X sections ≥85% — shells: list]
MICRO-FX:      [X/X agency patterns implemented]
AUTONOMY:      [grep clean — X passive wires found — X Fallback names]
ACTIVATION:    [X/X visible-fire checks passed]
SCROLL PIPE:   [TYPE B only — all sections reachable: yes/no — nav jumps: yes/no]
READY:         [yes/no]

NO YES UNTIL EVERY ROW IS GREEN.