# Milestone B1 QA — Learn Landing Page

Status: **USER REVIEW**  
Branch: `revamp/milestone-b1-learn`  
Draft PR: #2  
Production: **not merged**

Milestone B1 rebuilds the Learn landing page only. The five individual course pages are deliberately deferred to B2 so this visual/pathway system can be reviewed before it is repeated across the platform.

## 1. Design direction

- [x] Learn is visually part of the same Brainpower universe as Home.
- [x] Learn has its own purpose-built generated hero environment rather than reusing the Home hero.
- [x] Generated artwork is decorative; all important labels, buttons, progress and course information remain real HTML.
- [x] Brainy is integrated naturally into the generated scene rather than pasted around the interface.
- [x] Course selection is calmer and more information-dense than the Home landing experience.
- [x] Dark navy / blue / violet / amber subject language remains consistent with the master design system.

## 2. Production artwork

- [x] Generated Learn artwork stored as a Brainpower-owned repository asset.
- [x] Production file: `public/art/learn/learn-hero.webp`.
- [x] Asset compressed to roughly 120 KB.
- [x] No temporary signed generation URL is required at runtime.
- [x] Hero uses cover/focal-position behaviour rather than fixed pixel placement.
- [x] Left side retains a dark text-safe zone for actual HTML content.

## 3. Live platform data

- [x] Continue Learning resolves to the next incomplete lesson.
- [x] Learning snapshot uses real saved XP, streak, completed lessons and solved questions.
- [x] Overall mastery derives from the five live course mastery values.
- [x] Each course card shows actual completed/available lesson counts.
- [x] Each course card shows actual solved/available practice-question counts.
- [x] Each course card shows the number of registered formal tests.
- [x] Each course card links to the live course route.
- [x] Each course card surfaces the next incomplete lesson when available.

## 4. Course architecture represented

- [x] Mathematical Methods Units 1 & 2.
- [x] Mathematical Methods Units 3 & 4.
- [x] Specialist Mathematics Units 1 & 2.
- [x] Specialist Mathematics Units 3 & 4.
- [x] Physics Units 1 & 2.
- [x] Methods, Specialist and Physics are grouped into distinct subject families rather than presented as five unrelated cards.

## 5. Brainpower learning loop

- [x] Understand / Learn stage links into learning pathways.
- [x] Practise stage links to the question bank.
- [x] Test stage links to Test Centre.
- [x] Review stage links to Progress.
- [x] Language reinforces Learn → Practise → Test → Review rather than making Learn a dead-end catalogue.

## 6. Responsive browser QA

Headless Chromium captures completed successfully at:

- [x] 1920×1080 desktop.
- [x] 1440×900 laptop.
- [x] 1024×768 tablet landscape / small laptop.
- [x] 768×1024 tablet portrait.
- [x] 390×844 phone.
- [x] 360×800 narrow phone.
- [x] 1440×5200 full-page capture.

Responsive checks include hero cropping, navigation, next-step card, snapshot grid, course-family collapse, course-card actions, learning-loop collapse and mobile dock clearance.

## 7. Visual issue found and fixed during QA

The first desktop capture exposed legacy light-canvas bleed from the staged migration: the old global `main` max-width/background left pale gutters and translucent revamp surfaces blended against the legacy paper background. This made the desktop Learn experience appear grey and washed out even though mobile happened to look acceptable.

The fix is explicitly isolated in `src/styles/revamp/learn-route.css`:

- body is locked to the Brainpower dark canvas on the Learn route;
- `.shell` is locked to the same dark canvas;
- `main.bp-learn-page` becomes truly full width and no longer inherits the legacy 1380 px `main` cap;
- top navigation translucency now blends over a dark surface rather than the legacy white page;
- hero art contrast/saturation was tuned for the generated Learn artwork;
- key translucent lower-page surfaces now resolve against guaranteed dark backgrounds.

A second full browser QA pass was generated after the fix. Desktop now matches the intended dark Brainpower visual system while mobile retains the stronger dark treatment.

## 8. Accessibility / motion

- [x] Primary navigation/actions use semantic links.
- [x] Course pathways use semantic links rather than click-only divs.
- [x] Important text is not baked into generated artwork.
- [x] Hero pointer parallax is decorative only.
- [x] Parallax is disabled for `prefers-reduced-motion`.
- [x] Existing global focus-visible system remains active.
- [x] Existing mobile bottom navigation remains available.

## 9. Existing functionality protected

- [x] Existing router remains the source of truth.
- [x] Existing progress store remains unchanged.
- [x] Existing course, lesson, question and test data remain unchanged.
- [x] Home revamp remains untouched.
- [x] Page-transition loader remains active between routes.
- [x] Course routes still use their existing implementation until B2.

## 10. Automated checks

- [x] Revamp smoke workflow now runs on all `revamp/**` branches.
- [x] JavaScript syntax checks include Learn and route-transition modules.
- [x] Required Learn CSS/JS/art assets are checked.
- [x] Browser DOM checks confirm all five pathways render.
- [x] Browser DOM checks confirm the Brainpower learning loop renders.
- [x] Browser QA verifies the production Learn artwork file exists.

## 11. User-review gate

B1 is ready for visual review but should remain unmerged until the user approves the Learn direction. Approval of B1 means B2 can reuse this subject-family, progress and generated-environment language across the five individual course pages.
