# Milestone A QA — Revamp Foundation + Home

Status: **BUILDING / STATIC QA**  
Branch: `revamp/milestone-a`  
Draft PR: #1  
Production: **not merged**

This checklist is intentionally strict. Milestone A is the visual/technical foundation that later pages will inherit, so it should not be merged merely because the new Home looks better.

## 1. Architecture

- [x] Revamp work isolated on a dedicated branch.
- [x] Production `main` left unchanged during review.
- [x] Canonical design tokens created in `src/styles/revamp/tokens.css`.
- [x] Revamp CSS split by responsibility: base, shell, Home, exam-season, overlays.
- [x] Old page CSS remains only as staged-migration compatibility for routes not yet rebuilt.
- [x] New revamp files load after legacy files and are authoritative for migrated surfaces.
- [x] Old global Brainy scatter/companion and duplicate Home patch systems are no longer loaded.
- [x] Old pre-1.0 overhaul reduced to the temporary Arcade compatibility bridge only.
- [ ] Legacy CSS can be deleted only after the corresponding later routes have migrated.

## 2. Global shell

- [x] Sticky translucent navigation implemented.
- [x] Active-route state retained.
- [x] Search and theme controls retained.
- [x] Medium-width navigation has a More menu for hidden secondary routes.
- [x] Mobile bottom dock provides Home / Learn / Practice / Tests / Progress.
- [x] Mobile More sheet provides secondary routes.
- [x] Footer rebuilt into the same design system.
- [x] Keyboard focus uses a high-contrast visible outline.
- [x] Header gains a stronger surface/shadow after scrolling.

## 3. Loading experience

- [x] Loading screen is present in initial HTML, so it can render before application JavaScript.
- [x] No artificial timeout blocks the actual app render.
- [x] Loading motion respects `prefers-reduced-motion`.
- [x] Brand mark, platform name and study-language are visible while loading.

## 4. Home composition

- [x] Home uses the approved generated study-room artwork rather than CSS-drawn scenery.
- [x] Hero text remains real HTML and stays selectable/accessibile.
- [x] Generated art has intentional text-safe space on the left.
- [x] Methods, Specialist and Physics gateways use dedicated generated artwork.
- [x] Subject gateway content remains real HTML.
- [x] Continue Learning uses saved progress rather than a fake destination.
- [x] Quick Access links to real platform destinations.
- [x] Pick-up card uses the next incomplete lesson and real course progress.
- [x] All five learning pathways are represented below the fold.
- [x] Course progress cards use real lesson/mastery data.
- [x] Daily Brainpower retains the existing question/checking engine.
- [x] Home no longer duplicates a catalogue of individual tests.
- [x] Test Centre is represented by one intentional portal.
- [x] Home displays only the latest three release notes.
- [x] Full update history is available in a dedicated accessible overlay.
- [x] Community links remain available without dominating the page.

## 5. 2026 mock-exam season

- [x] Four Brainpower mock-exam cards retained.
- [x] Live countdown logic retained.
- [x] Countdown dates/times checked against the published 2026 VCAA timetable.
- [x] Mock section made compact so Home does not become the Test Centre.
- [x] Tablet layout collapses to two columns.
- [x] Mobile layout collapses to one column.

## 6. Responsive static review

CSS breakpoints reviewed for:

- [x] Large desktop / ultrawide.
- [x] Standard desktop.
- [x] <=1180 px layout compression.
- [x] <=900 px tablet layout.
- [x] <=760 px mobile shell / bottom dock.
- [x] <=650 px Home single-column composition.
- [x] <=420 px narrow-phone Quick Access.
- [x] Hero artwork uses `cover` and explicit focal positions rather than fixed-pixel placement.
- [x] Hero subject cards move from 3-column -> 2-row -> stacked.
- [x] Daily Brainpower becomes single-column on small displays.

## 7. Accessibility static review

- [x] Semantic links/buttons used for actions.
- [x] Main navigation has an accessible label.
- [x] Mobile navigation has an accessible label.
- [x] Menu button exposes `aria-controls` and `aria-expanded`.
- [x] Update log uses `role="dialog"` + `aria-modal="true"`.
- [x] Update log restores focus to its trigger when closed.
- [x] Update log can close with Escape, backdrop click or explicit close controls.
- [x] Update log traps keyboard focus while open.
- [x] Background shell becomes inert while the modal is open.
- [x] Continuous decorative motion is suppressed when reduced motion is requested.
- [x] Focus-visible styling is not removed.

## 8. Existing functionality protected

- [x] Main route renderer remains the source of truth.
- [x] Saved progress storage is unchanged.
- [x] Question checking is unchanged.
- [x] Test metadata safety layer is still loaded.
- [x] Exam-mode metadata gating is still loaded.
- [x] Physics lesson registration is still loaded.
- [x] KaTeX / math.js / JSZip dependencies remain loaded.
- [x] Current Arcade remains playable through a temporary compatibility bridge until its dedicated milestone.

## 9. Known release blockers

### BLOCKER A — generated artwork must become production-owned assets

The current Home branch still references the approved generated images through signed hosted URLs. Those URLs are appropriate for design review but are **not acceptable production dependencies**. Before merging Milestone A into `main`, the four approved images must be copied into a permanent Brainpower-controlled asset location (preferably `public/art/home/`), compressed to web-friendly formats, and referenced locally.

Target structure:

```text
public/art/home/
  hero-study-room.webp
  methods-gateway.webp
  specialist-gateway.webp
  physics-gateway.webp
```

Desired production treatment:

- desktop hero: WebP/AVIF where browser-safe, quality visually checked;
- subject gateways: WebP/AVIF;
- sensible dimensions rather than full generation-master dimensions everywhere;
- no critical text baked into the images;
- CSS background fallback colours retained;
- mobile crop checked before final merge.

### BLOCKER B — real browser preview / screenshot QA

The connected Vercel integration is not currently exposing a team/project, so this branch cannot yet be inspected through the intended Vercel preview workflow. Static code review is not a substitute for a real browser pass.

Before production merge, inspect at minimum:

- 1920×1080 desktop;
- 1440×900 laptop;
- ~1024 px tablet;
- ~768 px tablet portrait;
- ~390 px phone;
- narrow ~360 px phone.

Check actual generated-art cropping, text overlap, sticky nav behaviour, mobile dock safe-area behaviour, modal scrolling, Daily Brainpower question states, and every Home link.

### BLOCKER C — no automated CI currently attached

There are currently no branch workflow checks attached to this static site. For this milestone, review therefore relies on code/static QA plus manual browser QA. A lightweight later CI pass should at least validate syntax and detect broken local references.

## 10. User-review gate

Milestone A should move from **BUILDING / QA** to **USER REVIEW** only after Blocker A and a real browser QA pass are complete enough that the user can judge the intended final appearance.

It should move from **USER REVIEW** to **APPROVED** only after the user explicitly approves it. Do not merge PR #1 simply because it is technically mergeable.
