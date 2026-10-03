# Milestone E QA — v1.0.0 acceptance

Status: **V1.0.0 CANDIDATE — merge requires the complete current gate and production verification follows deployment**

Acceptance branch: `revamp/daily-progress-v1`

Target release: **1.0.0 — completed full-site revamp**

Earlier v1.0.0/v1.0.1 completion labels were premature. The user reserves v1.0.0 for the finished revamp. PR #15 closes gaps in actual lesson resume states, PDF exam tracking, CSS retirement, route-code loading, keyboard semantics, reflow and performance. Its evidence supersedes the earlier completion claim.

Milestone E is the final regression, accessibility, asset-integrity and release gate for the A–D full-site revamp.

## Full browser matrix

The Playwright/Chromium final regression audits the actual SPA rather than isolated screenshots.

Desktop coverage includes Home, Learn, all five course control rooms, a representative lesson from every live course, diagnostics, Practice, Test Centre, test detail, Exam Mode, Resources, Tools, Arcade, Progress, About, Search, Admin gate and the not-found route.

Additional coverage includes 390×844 mobile routes for all high-use destinations, 834×1194 tablet lesson/exam/progress checks, reduced-motion mode, a seeded progress state, and keyboard command-search navigation.

The historical initial gate was Actions run **37086841436**. PR #15 reruns and extends this coverage on its actual final commit:

- 5 live courses
- 285 lessons
- 1,126 practice questions
- 16 tests
- 23 resources
- 42 route/viewport states audited
- 27 catalogue PDF/thumbnail/resource paths checked
- **PASS — 0 browser problems**

The branch workflow reruns this same gate for release changes and must remain green before merge.

## Assertions

- visible semantic page heading on every tested route
- no horizontal overflow at target widths
- no duplicate DOM IDs
- no broken visible images
- no local 404 asset requests
- no retired floating `.brainy-companion`
- no computed generation-host hero dependencies
- no visible `null` / `undefined` assessment metadata
- form controls have an accessible name
- reduced-motion reveal elements remain visible
- route loader dismisses correctly
- representative local progress state renders
- `/` opens command search, search returns a result and keyboard selection navigates
- test/resource file references resolve successfully
- IDs and course relationships are internally consistent

## Static release audit

The final static audit also checks:

- production route modules and canonical revamp styles exist
- production JavaScript parses under Node syntax checking
- artwork is stored in web-appropriate formats and stays below the defined per-artwork budget
- the loaded production graph does not depend on expiring generation URLs
- all local test/resource/solution/thumbnail references exist
- assessment numeric metadata is valid when present
- five-course navigation remains intact
- the package, site, README and public update log use one consistent release version

The four legacy stylesheet layers are retired. Shared components and scoped route styles own production appearance. Signed prototype Home art URLs have been removed.

## Defects found and fixed by Milestone E

The final gate caught real issues rather than only recording screenshots:

1. Four assessment fallback SVGs contained raw ampersands in XML text such as `UNITS 1 & 2`. Browsers could not decode them, so Test Centre and Resources displayed broken fallback previews. The entities are now valid `&amp;` XML.
2. The Exact Trig Values angle selector had no accessible name. The Tools enhancement now supplies a descriptive `aria-label`.
3. The initial static dependency check was too broad and flagged unused historical prototype files. It now audits the production-loaded dependency graph while still verifying that all Home artwork references use repository assets directly.

## Responsive/accessibility gate

The browser suite explicitly includes desktop, tablet and mobile layouts, keyboard command search and `prefers-reduced-motion: reduce`. Existing route-specific QA from Milestones A–D remains in place for lesson mastery, Practice sessions, Exam Mode, Resources/Tools, Progress, Arcade and secondary routes.

## Brainy release rule

Brainy remains the canonical open-book character throughout production: cream/open pages, the established friendly face/proportions, navy clothing and red accent/backpack. Context may change pose or activity, not identity. No generic blue-brain replacement is accepted.

## Release state

PR #11 shipped the initial full-site implementation with a premature v1.0.0 label. PR #12 corrected Arcade control contrast/hidden states; PR #13 added four-choice Derivative Dash. PR #13's final gate, Actions run **37089729826**, passed all 42 route/viewport checks plus the D1/D2/D3 browser suites. The matching Pages deployment, run **37090045992**, succeeded; live answer scoring and pause were verified.

PR #14 (prematurely labelled v1.0.1) fixes page entrance replay on countdown/score mutations, retires the overlapping legacy entrance animation and reserves scrollbar space during overlays. Motion regression measures real Home countdown and mobile Dash timer updates for page movement, and checks layout width during loading. It also aligns the package, site, README and newest update-log entry. The smoke check now enforces release consistency instead of pinning every future release to 1.0.0. Full-site regression checks the visible footer version and update-log entry on desktop/mobile, including layout width, Escape and returned keyboard focus. Each release still requires green branch QA and verification of its matching Pages deployment.


## PR #15 final acceptance scope

The current gate adds the missing behaviors to the original route matrix:

- Home, Learn, course control rooms and Progress share one actual last-visited lesson policy. A visit does not grant XP or completion. Fresh, partial, legacy, completed-course and all-complete states are tested.
- PDF Exam Mode persists a manual question navigator, answered states, review flags and question notes. Refresh, shortcuts, finish/cancel counts, blank-score rejection and an explicit zero score are tested. Unknown question counts and marks remain unknown; the PDF is never treated as an automatically inspectable answer sheet.
- Four legacy style layers and two global DOM-polish scripts are removed from production. 423 obsolete shared selectors are retired. Normal route styles do not use `!important`; the exceptions are accessibility and native hidden-state rules.
- Route features load on first use. Cold Home/Learn requests must not fetch Arcade, the Derivative Dash bank or the Admin ZIP vendor.
- Every major route, all five courses, representative lessons and missing-ID routes receive WCAG A/AA checks with color contrast enabled. Reflow is checked at 640 CSS pixels, representing a 1280-pixel window at 200% zoom.
- A constrained-network/CPU Home check records paint, long tasks and cumulative layout shift. Countdown and game-timer checks separately verify stable scroll position, no repeated page entrance, and constant page width during overlays.
- All B2/B3/B4/C1/C2/C3/D1/D2/D3 functional suites run against the consolidated styles. Their failures are collected independently, so one failure cannot hide another route's result.
- The delayed whole-page KaTeX repaint is removed: formulas use the deferred library and an interactive dialog or answer input is not replaced 250 ms after startup.
- Progress uses the directly rendered canonical `brainy.svg`. The old SVG wrapper rendered confetti without its external character reference in Chromium.

PR #15 passed the complete expanded gate on head **4e884f7f9eb2cc9ae0b9db701ab1d9a8999189ec**, Actions run **37095335865**. The matching production merge **c0ca1a868aa780defd24c4ba7e006e5679a72ca8** deployed successfully in Pages run **37095696493** at v0.9.2. Measured Home CLS was 0.0000 under CPU/network constraints.


## PR #16 Daily saving and v1 release

The user requested saved Daily answers, a recent-question indicator, full functional verification and then v1.0.0. Question drafts, submitted answers, correctness, attempt dates and last-correct timestamps persist in the existing progress store. Refresh and route navigation restore both numeric/text answers and selected choices. An explicit retry clears the working answer while retaining history; repeated correct answers do not duplicate XP or claim new XP. Blank inputs do not count as attempts. Existing solved records without timestamps say “Solved previously”. Fresh practice sessions retain empty, enabled controls and their first-try score policy. Daily rotation, activity streaks and the Progress calendar use the local calendar day.

Browser checks cover all 14 rotating Daily problems on a mobile viewport, missed/correct results, refresh/navigation, retries, XP, local-day dates, legacy progress, choice restoration and fresh sessions. On **afa73b3c7849caf02832b19b5d1716689d04b6ad**, Actions run **37120467262**, these Daily checks and all nine B/C/D functional suites passed. Its accessibility gate found the new status paragraph inherited light reader text on light lesson paper; the owning lesson stylesheet now scopes its contrast. The final release commit must pass every gate before merge.

The production browser workflow runs on main pushes, waits for the expected deployed version, and checks live lesson resume, canonical Brainy, four-choice Dash, page motion, Daily answer restoration and mobile reflow. Final passing commit/run, deployment and production-browser evidence are recorded on PR #16 and in the master plan after completion.
