# Milestone E QA — v1.0 Quality Gate

Status: **RELEASE CANDIDATE — merge only with green final-quality workflow**  
Branch: `revamp/milestone-e-final-qa`  
Target release: **Brainpower Education v1.0.0 — Brainpower Learning World**

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

The branch workflow reruns this same gate after every release-candidate change and must remain green before merge.

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
- v1.0 version/release markers are present

Historical CSS remains in the repository during staged migration. It is not treated as production truth when a later authoritative revamp ownership layer overrides it. In particular, `art.css` owns the computed Home artwork using local repository WebPs.

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

`SITE.version` is set to `1.0.0`, the update log includes **1.0.0: Brainpower Learning World**, and the global footer surfaces the release version. The final branch-head quality workflow must pass after these release changes; only then should the pull request be squash-merged to `main` and the matching GitHub Pages deployment verified.
