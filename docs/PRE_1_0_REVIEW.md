# Brainpower pre-1.0 review build

This branch is intentionally **not** branded 1.0. It is the approval candidate.

## Product changes
- New Brainy mascot asset and persistent mascot companion.
- Branded startup/loading sequence on full page load.
- New visual system: stronger typography, spacing, page headers, navigation, course cards, assessment cards, filters, dark sections and responsive behaviour.
- Homepage reduced to three latest assessments and three latest updates.
- Full update log opens in a modal.
- Arcade rebuilt at runtime into two immersive game surfaces: timed/combo Derivative Dash and canvas-based Brainpower Bird.
- Brainpower Bird includes Chill, Standard and Chaos modes, lives, score, best score, pausing and responsive canvas presentation.
- Legacy V4–V8 root changelogs consolidated into `docs/LEGACY_CHANGELOG.md`.

## Assessment metadata audit
Verified in this pass:
- Differential Calculus — Spider-Man: 5 min reading, 50 min writing, 32 marks, 3 questions.
- Circular Functions — The Backrooms: 5 min reading, 45 min writing, 31 marks, 6 questions.
- Kinematics — Felix's Party Quiz Showdown: 5 + 50 min, 25 marks, 5 questions.
- Number & Proof — Blackburn Lip Sync Scandal: 5 + 50 min, 31 marks, 7 questions.
- Matrices: 5 + 50 min, 40 marks, 6 questions.
- Further Trigonometry: 5 + 50 min, 33 marks, 6 questions.
- Complex Numbers: 5 + 50 min, 30 marks, 4 questions.

Unverified/null metadata is no longer printed as `null` on assessment cards. It remains deliberately unset until checked against its source paper.

## Approval QA
Before merging to `main` and renaming the public release to 1.0:
1. Home: loader completes, Brainy appears, only 3 recent tests and updates are visible.
2. Update log modal opens/closes with button, backdrop and Escape.
3. Navigation: every public route renders in light and dark mode.
4. Learn/course/lesson: no missing content, mastery controls still work.
5. Practice: filters, maths input, checking and XP still work.
6. Tests: filters work; no `null` metadata; PDF links resolve; marking-scheme links only appear where valid.
7. Exam Mode: reading/writing timers and score save work for fully specified assessments.
8. Resources: search/filter/bookmark/open/download work.
9. Tools: calculators, trig values, random question, timer and vector visualiser work.
10. Arcade: both games restart cleanly; Bird controls work by pointer and Space; high scores persist locally.
11. Progress: existing local progress remains readable.
12. Mobile: nav, filters, cards, lesson content and arcade remain usable at narrow widths.
13. Reduced motion: animations are suppressed when requested by the OS/browser.

Only after this checklist and user review pass should the version be changed to **1.0**.
