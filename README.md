# Brainpower Education — 1.0 Release Candidate

Brainpower Education is a free, static VCE learning platform for Mathematical Methods, Specialist Mathematics and Physics. It combines structured courses, practice banks, formal assessments, resources, study tools, progress tracking and an optional arcade in one GitHub Pages site.

This repository is currently the **pre-1.0 release candidate**. The public version should not be labelled 1.0 until the final QA pass is complete.

## Current learning platform

- 98 interactive mathematics lessons/checkpoints
- 255 practice-bank questions plus Daily Brainpower challenges
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

The final release checklist lives in `docs/PRE_1_0_REVIEW.md`. Version 1.0 should only be declared after route, content, assessment, mobile, accessibility and regression checks pass.
