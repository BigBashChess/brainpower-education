# Milestone D2 — About, Search and Secondary Routes QA

Status: **PASS**

Milestone D2 rebuilds Brainpower's About page, command-centre search and deliberate secondary/error states so the remaining non-core routes belong to the same Brainpower Learning World.

## Production implementation

- Dedicated route enhancement module: `src/revamp/secondary.js`
- Dedicated scoped stylesheet: `src/styles/revamp/secondary.css`
- Local About hero artwork: `public/art/about/hero-about.webp`
- About hero size: **113,548 bytes**
- Canonical open-book Brainy is used in the About story and error state.
- Search indexes live courses, topics, lessons, tests, resources and tools.
- Search supports lightweight abbreviation/fuzzy matching such as `spesh vectors`, `diff calc`, `prob`, `phys` and `kin`.
- Update-log HTML escaping was corrected while validating the About release panel.

## About

Verified:

- cinematic local hero artwork with live HTML copy
- live pathway / lesson / practice counts
- five current course pathways
- local mastered-course and lesson progress
- learning-loop explanation
- VCAA independence / no-endorsement disclaimer
- Brainy role and identity statement
- current release/update-log access
- Instagram and Discord links
- responsive desktop, tablet and mobile layouts

## Search command centre

Verified:

- live search across courses, topics, lessons, tests, resources and tools
- category filtering for All / Learn / Tests / Resources / Tools
- ranked and abbreviation-aware results
- keyboard navigation with Up / Down / Enter / Escape
- `/` keyboard shortcut
- quick commands for continuing study, Practice, Test Centre and Progress
- deliberate no-results state with suggested searches
- responsive mobile presentation
- decorative search glow is clipped at the route boundary so it cannot create horizontal page overflow

## Secondary states

Verified:

- deliberate 404 / unknown-route state
- clear recovery actions
- canonical Brainy treatment
- visible keyboard focus
- reduced-motion handling

## Automated coverage

Automated Chromium QA covers About, Search, populated search results, no-results search state, keyboard navigation, mobile Search, and unknown-route recovery across desktop/tablet/mobile captures.

Checks include:

- no horizontal overflow
- local About artwork successfully loaded
- dedicated secondary stylesheet loaded
- search destinations open correctly
- no page errors / failed local assets in the tested routes
- mobile command centre remains within the viewport

## Automated runs

- **D2 secondary routes browser QA** — SUCCESS — run `37081543797`
- **Revamp static smoke** at the D2 fix head — SUCCESS — run `37081543648`

Milestone D2 is ready to merge after these checks.