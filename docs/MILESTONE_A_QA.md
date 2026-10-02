# Milestone A QA — Revamp Foundation + Home

Status: **USER REVIEW**  
Branch: `revamp/milestone-a`  
Draft PR: #1  
Production: **not merged**

This checklist is intentionally strict. Milestone A is the visual/technical foundation that later pages will inherit, so it should not be merged merely because the new Home looks better.

## 1. Architecture

- [x] Revamp work isolated on a dedicated branch.
- [x] Production `main` left unchanged during review.
- [x] Canonical design tokens created in `src/styles/revamp/tokens.css`.
- [x] Revamp CSS split by responsibility: base, shell, Home, exam-season, artwork and overlays.
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
- [x] Secondary Home actions have readable contrast on the dark surface.

## 5. 2026 mock-exam season

- [x] Four Brainpower mock-exam cards retained.
- [x] Live countdown logic retained.
- [x] Countdown dates/times checked against the published 2026 VCAA timetable.
- [x] Mock section made compact so Home does not become the Test Centre.
- [x] Tablet layout collapses to two columns.
- [x] Mobile layout collapses to one column.

## 6. Responsive browser review

Automated Chromium screenshots are generated on every branch/PR revision. The current Milestone A build has been rendered successfully at:

- [x] 1920×1080 desktop.
- [x] 1440×900 laptop.
- [x] 1024×768 tablet/compact desktop.
- [x] 768×1024 tablet portrait.
- [x] 390×844 phone.
- [x] 360×800 narrow phone.
- [x] 1440×5200 tall capture for below-the-fold Home review.
- [x] Hero artwork uses `cover` and explicit focal positions rather than fixed-pixel placement.
- [x] Hero subject cards move from 3-column -> 2-row -> stacked.
- [x] Daily Brainpower becomes single-column on small displays.
- [x] Local compressed artwork preserves the approved visual treatment in browser captures.

Browser QA workflow: `.github/workflows/revamp-browser-qa.yml`.

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

## 9. Production artwork

- [x] Approved generation masters copied into Brainpower-controlled repository assets.
- [x] Hero stored at `public/art/home/hero-study-room.webp`.
- [x] Methods stored at `public/art/home/methods-gateway.webp`.
- [x] Specialist stored at `public/art/home/specialist-gateway.webp`.
- [x] Physics stored at `public/art/home/physics-gateway.webp`.
- [x] Assets compressed to WebP.
- [x] Current repository sizes are approximately 70 KB for the hero and 34–40 KB for each subject card.
- [x] Revamp artwork layer references the local files and retains solid-colour fallbacks.

The older signed generation URLs still exist in the staged `home.css` source underneath the artwork ownership layer, but are overridden by `art.css` and are not the production dependency. They should be removed entirely when the Home stylesheet is consolidated during legacy CSS retirement.

## 10. Automated integrity checks

- [x] Zero-dependency static smoke script added at `scripts/revamp-smoke.mjs`.
- [x] JavaScript syntax checks run in GitHub Actions.
- [x] Required revamp files are checked for existence.
- [x] Core Home markers and mobile-shell styles are checked.
- [x] Browser QA renders the real site in headless Chromium.
- [x] Rendered DOM is checked for Home hero, mock series, course section, Test Centre portal and absence of the retired Brainy companion.
- [x] Browser screenshots are uploaded as short-lived QA artifacts on each run.

## 11. User-review gate

Milestone A has now reached **USER REVIEW**. The branch is technically mergeable and automated checks are passing, but PR #1 remains a draft and production `main` remains untouched.

Before approval, the user should judge the actual visual direction — especially the Home hero crop, subject gateway treatment, information density, mobile first screen and overall hierarchy. Any requested changes should stay inside this milestone until approved.

Move from **USER REVIEW** to **APPROVED** only after explicit user approval. Do not merge PR #1 automatically.
