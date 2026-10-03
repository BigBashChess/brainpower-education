# Milestone E QA — pre-1.0 acceptance

Status: **FINALISATION REOPENED — PR #11 was an initial gate, not full acceptance**

Launch branch: `revamp/milestone-e-final-qa`

Public version: **0.9.2 — pre-1.0 finalisation**

Earlier v1.0.0/v1.0.1 completion labels were premature. The user reserves v1.0.0 for the finished revamp. PR #15 closes gaps in actual lesson resume states, PDF exam tracking, CSS retirement, route-code loading, keyboard semantics, reflow and performance. Its evidence supersedes the earlier completion claim.

Milestone E is the final regression, accessibility, asset-integrity and release gate for the A–D full-site revamp.

## Full browser matrix

The Playwright/Chromium final regression audits the actual SPA rather than isolated screenshots.

Desktop coverage includes Home, Learn, all five course control rooms, a representative lesson from every live course, diagnostics, Practice, Test Centre, test detail, Exam Mode, Resources, Tools, Arcade, Progress, About, Search, Admin gate and the not-found route.

Additional coverage includes 390×844 mobile routes for all high-use destinations, 834×1194 tablet lesson/exam/progress checks, reduced-motion mode, a seeded progress state, and keyboard command-search navigation.

A fully green reference run before the release-label commit was GitHub Actions run **37086841436**:

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
- the pre-1.0 version and public update log are consistent

The four legacy stylesheet layers are retired. Shared components and scoped route styles own production appearance. Signed prototype Home art URLs have been removed.

## Defects found and fixed by Milestone E

The final gate caught real issues rather than only recording screenshots:

1. Four assessment fallback SVGs contained raw ampersands in XML text such as `UNITS 1 & 2`. Browsers could not decode them, so Test Centre and Resources displayed broken fallback previews. The entities are now valid `&amp;` XML.
2. The Exact Trig Values angle selector had no accessible name. The Tools enhancement now supplies a descriptive `aria-label`.
3. The initial static dependency check was too broad and flagged unused historical prototype files. It now audits the production-loaded dependency graph while still verifying that Home's later local-art ownership layer overrides the old inert prototype declarations.

## Responsive/accessibility gate

The browser suite explicitly includes desktop, tablet and mobile layouts, keyboard command search and `prefers-reduced-motion: reduce`. Existing route-specific QA from Milestones A–D remains in place for lesson mastery, Practice sessions, Exam Mode, Resources/Tools, Progress, Arcade and secondary routes.

## Brainy release rule

Brainy remains the canonical open-book character throughout production: cream/open pages, the established friendly face/proportions, navy clothing and red accent/backpack. Context may change pose or activity, not identity. No generic blue-brain replacement is accepted.

## Release state

PR #11 shipped the initial full-site implementation with a premature v1.0.0 label. PR #12 corrected Arcade control contrast/hidden states; PR #13 added four-choice Derivative Dash. PR #13's final gate, Actions run **37089729826**, passed all 42 route/viewport checks plus the D1/D2/D3 browser suites. The matching Pages deployment, run **37090045992**, succeeded; live answer scoring and pause were verified.

PR #14 (prematurely labelled v1.0.1) fixes page entrance replay on countdown/score mutations, retires the overlapping legacy entrance animation and reserves scrollbar space during overlays. Motion regression measures real Home countdown and mobile Dash timer updates for page movement, and checks layout width during loading. It also aligns the package, site, README and newest update-log entry. The smoke check now enforces release consistency instead of pinning every future release to 1.0.0. Full-site regression checks the visible footer version and update-log entry on desktop/mobile, including layout width, Escape and returned keyboard focus. Each release still requires green branch QA and verification of its matching Pages deployment.
