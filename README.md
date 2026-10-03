# Brainpower Education — v1.0.1

Brainpower Education is a free, static VCE learning platform for Mathematical Methods, Specialist Mathematics and Physics. It combines structured courses, practice banks, formal assessments, resources, study tools, progress tracking and an optional arcade in one GitHub Pages site.

The **Brainpower Learning World** full-site revamp covers Home, all five course pathways, lessons, Practice, assessments, resources, tools, Progress, Arcade and secondary routes. Final acceptance includes actual lesson resume states, saved Exam Mode tracking, consolidated styles, deferred route code, accessibility, responsive layouts and stable motion.

## Current learning platform

- 5 live courses with 285 lessons/checkpoints
- 1,126 runtime practice questions plus Daily Brainpower challenges
- 17 assessments and 24 resources
- Mathematical Methods Units 1 & 2 and Units 3 & 4
- Specialist Mathematics Units 1 & 2 and Units 3 & 4
- Physics Units 1 & 2 content
- Course diagnostics and mastery tracking
- 100% required-question lesson mastery and 90%+ checkpoint standard
- MathPad input with live mathematical formatting
- Formal Brainpower assessment library and Exam Mode where metadata is verified
- 2026 Brainpower Mock Exam Series for Methods and Specialist
- Searchable resource Vault
- Progress dashboard and local score history
- Daily answer drafts/results restored after refresh or navigation
- Recent-question dates, deliberate retries and one XP award per solved question
- Study tools and Brainpower Arcade
- Responsive light/dark interface and reduced-motion support

## Architecture

The site deliberately remains build-step-free. It uses native ES modules, HTML/CSS/JavaScript, KaTeX and math.js and can be served directly by GitHub Pages. Student progress is stored locally in the browser; there is no required account, database or AI service.

Detailed lesson teaching content lives separately from sequencing and question-bank data, making it possible to expand lessons without rewriting the course engine.

## Admin Studio

A hidden client-side Admin Studio exists for authoring and exporting publish packs. It is a convenience gate only, **not secure authentication**. Credentials are intentionally not documented here. Never store GitHub tokens, API keys or other secrets in the frontend.

## Hosting

GitHub Pages can serve the repository directly from the `main` branch and repository root. For local preview, run `python -m http.server 8000` from the repository and open `http://localhost:8000`.

## Release process

Use a `revamp/` branch and a pull request for changes. Run `node scripts/revamp-smoke.mjs` and `node scripts/e-static-audit.mjs`, then the relevant browser QA and full-site regression before merging completed work to `main`. Verify the matching GitHub Pages deployment after merge.

The full-site quality gate evidence is documented in [docs/MILESTONE_E_QA.md](docs/MILESTONE_E_QA.md). [docs/PRE_1_0_REVIEW.md](docs/PRE_1_0_REVIEW.md) is an archived checklist from before the revamp. Keep the package version, `SITE.version` and this README aligned for each release. Small patch releases may retain the latest update-log entry from the same major/minor release.
