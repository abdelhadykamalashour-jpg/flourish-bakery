Read CLAUDE.md in full before doing anything.

You are now in MARKETPLACE LAUNCH MODE for this project.
Live URL is in CLAUDE.md. Brand name is in CLAUDE.md.
Execute all 6 phases below fully and automatically — do not stop, do not ask me anything.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 1 — SCREENSHOT SUITE (puppeteer MCP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use puppeteer MCP. Navigate to the live URL from CLAUDE.md.
Create folder: public/marketing/screenshots/
Capture and save ALL of these — wait for animations AND 3D scenes to finish
loading before each capture. For 3D scenes: wait for onLoad/onCreated
callback (minimum 3 seconds after navigation before capturing).

Desktop captures (viewport 1440x900):
01-hero.png          → Scroll to top, full hero above fold (with 3D scene fully loaded if present)
02-homepage-full.png → Full homepage scroll, all sections visible
03-shop-grid.png     → Shop/collection page, product grid at full width
04-pdp.png           → Product detail page — gallery, variants, add-to-cart all visible
05-cart-open.png     → Click cart icon, capture drawer open overlaying the page
06-about.png         → Full about page
07-journal.png       → Journal/blog index page
08-contact.png       → Contact page
09-footer.png        → Scroll to bottom, full footer section
10-404.png           → Navigate to /404 or a broken URL, capture custom error page

Mobile captures (viewport 390x844):
11-mobile-hero.png   → Homepage hero on mobile (confirm 3D fallback image shows, not blank)
12-mobile-menu.png   → Open mobile hamburger menu, capture nav overlay
13-mobile-pdp.png    → Product detail page on mobile
14-mobile-cart.png   → Cart drawer open on mobile

Specialty captures:
15-marquee.png       → Marquee/ticker section isolated, full width
16-typography.png    → Section with richest typography mix
17-color-system.png  → Any section showing the full brand color palette best

3D specialty captures (capture ONLY if 3D scenes exist in the project):
18-3d-hero.png       → Hero 3D scene at peak visual state — bloom, lighting, particles
                        fully visible. Wait 5 seconds after load before capturing.
19-3d-scroll.png     → 3D scroll-linked scene mid-scroll — capture at the most
                        cinematic camera position. Scroll to 40% of section height.
20-3d-mobile-fb.png  → Mobile viewport (390px) — confirm the mobile FALLBACK renders
                        (image/video, not blank canvas). Caption: "Mobile optimized fallback"
21-3d-postfx.png     → Closest-zoom screenshot of any 3D section showing post-processing
                        bloom, depth-of-field, or chromatic aberration most clearly.

After every capture confirm: "✓ [filename] saved"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 2 — PROJECT CLEANUP FOR MARKETPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Identify and REMOVE these files/folders (they must NOT be in the buyer's zip):
- .git/ folder
- .claude/ folder (hooks, config — internal only)
- .env.local and any .env* files
- node_modules/ folder
- .next/ build folder
- CLAUDE.md (internal orchestrator — not for buyers)
- AGENTS.md (internal — not for buyers)
- LAUNCH.md (this file)
- Any .claude-code-* temp folders
- nova-shop-theme.zip (old zip, will be recreated fresh)

Keep everything else. The buyer needs all source files including:
- /public/models/ (3D GLTF/GLB files — buyers need these)
- /public/environments/ (HDR environment maps)
- /public/lottie/ (Lottie JSON animation files)
- /components/3d/ (all 3D scene components)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 3 — DOCUMENTATION FOR BUYERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Create these files in the project root before zipping:

FILE 1: README.md (buyer-facing, replaces internal README)
Content must include:
- Product name and one-line description
- Live preview URL
- Tech stack table (include Three.js / R3F / Spline / Lottie if used)
- Quick start (npm install → npm run dev → npm run build)
- Project structure tree (include /public/models, /public/environments,
  /public/lottie, /components/3d if present)
- How to customize: colors, fonts, content
- How to customize 3D scenes: replacing Spline URLs, swapping GLTF models,
  adjusting post-processing intensity, particle count
- Environment variables guide (.env.example)
- Deployment to Vercel guide (3 steps)
- WebGL browser compatibility note (Chrome, Firefox, Safari 15+)
- Support contact

FILE 2: CHANGELOG.md
- v1.0.0 — Initial release. List all pages and features.
  If 3D present: list all 3D scenes and which tier each uses.

FILE 3: .env.example
- All environment variables with placeholder values and comments explaining each

FILE 4: documentation/index.html
Full HTML documentation file. Professional layout. Sections:
- Getting Started
- File Structure
- Design System (colors, fonts, spacing)
- Animation System (how Framer Motion variants work)
- 3D System (ONLY if project uses 3D):
    * Which tier each scene uses (CSS 3D / Spline / R3F)
    * How to replace Spline scene URL
    * How to swap GLTF model
    * How to adjust bloom intensity, particle count, camera position
    * Mobile fallback explanation
    * Performance tuning tips (DPR cap, frameloop, disposal)
- Cart System (how cart state works — e-commerce only)
- Customization Guide
- Deployment Guide
- Browser Compatibility
- Support

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 4 — CREATE THE MARKETPLACE ZIP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Create a clean zip of the entire project (excluding the removed folders from Phase 2).
Name it: [brand-name]-theme-v1.0.0.zip
Save it one level UP from the project: D:\Website\[brand-name]-theme-v1.0.0.zip

Verify zip contents — confirm these are INCLUDED:
✓ app/ folder
✓ components/ folder (including components/3d/ if present)
✓ public/ folder (including marketing/screenshots/, models/, environments/, lottie/)
✓ lib/ folder
✓ README.md
✓ CHANGELOG.md
✓ .env.example
✓ documentation/index.html
✓ package.json
✓ tailwind.config.*
✓ next.config.*
✓ tsconfig.json
✓ postcss.config.*

Confirm these are EXCLUDED:
✗ node_modules/
✗ .next/
✗ .git/
✗ .claude/
✗ .env.local
✗ CLAUDE.md
✗ AGENTS.md

Report final zip size.
Note: If 3D models are present, zip may be 50-200MB — this is expected.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 5 — MARKETING ASSETS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Save all to public/marketing/

FILE: themeforest-listing.md
Complete ThemeForest item submission. Include:
- Item name (exact ThemeForest title format)
- Tagline (one sentence, punchy)
- Full description (600-800 words, structured with headers)
- Feature list (25+ bullets, grouped by category)
  If 3D present: include a dedicated "3D & Immersive" feature group:
    * Cinematic WebGL hero scene with React Three Fiber
    * Real-time bloom, depth-of-field, chromatic aberration post-processing
    * Scroll-linked 3D camera animation via GSAP ScrollTrigger
    * Mouse parallax on all 3D objects
    * Particle system with [X] particles
    * Mobile-optimized fallback — no WebGL required on mobile
    * Spline integration for zero-code 3D scene swapping (if applicable)
    * DRACO-compressed models for fast load times
- Tech stack table
- What's included (pages list + global systems + 3D scenes list)
- Who it's for (3-4 buyer personas)
- Getting started code block
- Browser compatibility table (include WebGL support note)
- Support statement
- 15 tags (include: three.js, webgl, react-three-fiber, 3d if applicable)

FILE: gumroad-listing.md
Shorter punchy version for Gumroad/Lemon Squeezy.
- Hook headline (lead with 3D if present: "The only Next.js theme with cinematic WebGL")
- 150-word description
- 10 bullet features
- Price recommendation
- Tags

FILE: launch-tweets.md
5 tweet variants under 280 chars each. Mix of:
- Developer-targeted (technical features — mention R3F/Three.js if present)
- Designer-targeted (aesthetic/animation quality — lead with 3D visuals)
- Founder-targeted (time/money saved)
- Curiosity hook (no features mentioned, just visual intrigue)
- Direct sell (price + link)

FILE: reddit-post.md
Full Reddit post for r/nextjs, r/webdev, r/threejs (if 3D present).
Title options (3 variants).
Body: casual dev voice, show what you built, share live link, mention it's for sale.
If 3D: describe the technical implementation briefly — R3F, post-processing stack.
Devs in r/threejs appreciate technical depth.

FILE: producthunt-launch.md
- Tagline (60 chars max)
- Description (260 chars)
- First comment (longer story, personal voice — mention 3D implementation if present)
- Topics to select (add "Three.js" / "WebGL" if applicable)

FILE: video-script.md
45-second viral video script. Shot by shot with:
- Exact timestamp
- What page/section to show
- Mouse movement instruction
- Text overlay content
- Music cue note
If 3D present: open the video ON the 3D hero scene — that is your hook.
First 3 seconds must show the most visually striking 3D moment.
Script order: 3D hero → scroll animation → product/content → interactions → price card

FILE: pricing-strategy.md
Platform-by-platform pricing recommendation:
- ThemeForest: suggested price + reasoning (3D commands premium: +$10-20)
- Gumroad: suggested price
- Creative Market: suggested price
- Lemon Squeezy: suggested price
- Own site: suggested price
Include: competitor research summary, positioning rationale
If 3D present: note that WebGL/Three.js themes are rare on ThemeForest —
position as premium tier, price accordingly ($59-89 range)

FILE: seo-keywords.md
3-tier keyword list:
- Tier 1: high volume, high competition (target for listing title)
- Tier 2: medium volume, medium competition (use in description body)
- Tier 3: long-tail, low competition (use in tags)
If 3D present: include 3D-specific keywords:
  three.js website template, react three fiber nextjs, webgl nextjs template,
  3d animated website template, cinematic nextjs theme
Include: how each marketplace search algorithm works

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHASE 6 — FINAL REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When all phases are complete, output a single clean checklist:

LAUNCH READY REPORT — [Brand Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Screenshots:     [X/21 captured] (X/17 if no 3D)
3D Scenes:       [X scenes — tiers: CSS3D/Spline/R3F as applicable]
Zip file:        [filename] — [size]
Zip location:    [full path]
Documentation:   [pages created]
Marketing files: [files created]

SUBMIT IN THIS ORDER:
1. Gumroad → live in 10 minutes → share on Twitter/X today
2. Creative Market → live in 24 hours
3. ThemeForest → submit for review (7-14 day review period)
4. Lemon Squeezy → live same day
5. Product Hunt → schedule for Tuesday 12:01 AM PST

VIRAL LAUNCH SEQUENCE (day of launch):
→ Post tweet with 30sec screen recording (open on 3D scene if present)
→ Post on r/nextjs, r/webdev, r/reactjs
→ Post on r/threejs if 3D is present (highly technical audience — they will appreciate it)
→ Post on LinkedIn
→ Submit to Hacker News Show HN
→ Post in Next.js Discord
→ Post in Three.js Discord if 3D present
→ Submit to Awwwards

Do not declare done until all 6 phases are fully complete.
