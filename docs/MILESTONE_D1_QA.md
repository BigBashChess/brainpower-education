# Milestone D1 — Arcade QA

Status: **PASS**

Milestone D1 rebuilds Arcade as the Brainpower neon break room while keeping game scores separate from academic mastery and XP.

## Production implementation

- Dedicated route module: `src/revamp/arcade.js`
- Dedicated scoped stylesheet: `src/styles/revamp/arcade.css`
- Local production hero: `public/art/arcade/hero-arcade.webp`
- Hero size: **114,320 bytes**
- The old `src/pre1-overhaul.js` Arcade compatibility script is no longer loaded by `index.html`.
- Canonical open-book Brainy is used in the generated hero and directly in Brainpower Bird through `public/brand/brainy.svg`.
- Arcade personal bests use the existing `brainpower-progress-v3` progress store through `saveArcade()`.
- Arcade does **not** award course XP or mastery.

## Derivative Dash

Verified:

- 60-second run start state
- larger derivative bank covering power, trig, exponential/log, chain, product, quotient and reciprocal differentiation
- equivalent-answer handling, with exact-normalised matching and browser maths evaluation when available
- score increment after a correct answer
- combo multiplier
- wrong-answer time penalty
- pause/resume
- restart after run completion
- local personal best persistence
- optional sound toggle
- keyboard submission with Enter

## Brainpower Bird

Verified:

- responsive 1080 × 540 canvas playfield
- canonical Brainy player rendering
- Chill / Standard / Chaos tuning
- different lives, gaps and speeds by difficulty
- tuned collision and short invincibility after a lost life
- score and local personal best
- start / game-over / restart states
- pause/resume by button and `P`
- Space, click and tap flap controls
- dedicated mobile FLAP control
- academic obstacles including SAC, EXAM, CAS ERROR and DOMAIN ERROR

## Responsive coverage

Automated Chromium screenshots/checks ran at:

- Desktop — 1440 × 900
- Tablet — 1024 × 768
- Mobile — 390 × 844
- Desktop full-page capture
- Active Derivative Dash state
- Active Brainpower Bird desktop state
- Active Brainpower Bird mobile state

Checks include:

- no horizontal overflow
- local hero artwork successfully loaded
- dedicated Arcade stylesheet loaded
- exactly two game cabinets / machines
- legacy Arcade bridge not loaded
- mobile flap visible on mobile and hidden on desktop
- no captured 404s or page errors

## Automated runs

- **D1 Arcade browser QA** — SUCCESS — run `37077720063`
- **Revamp static smoke** at the D1 QA implementation head — SUCCESS — run `37077720016`
- QA artifact: `milestone-d1-arcade-qa` — artifact ID `11257027796`

The one-shot generated-art vendoring workflow was removed after the compressed hero was committed, so production has no dependency on the temporary generation URL.
