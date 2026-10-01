# Brainpower pre-1.0 review build

This branch is intentionally **not** branded 1.0. It is the approval candidate.

## Product changes
- New Brainy mascot asset and persistent mascot companion, now keyboard-accessible and reduced-motion aware.
- Branded startup/loading sequence on full page load.
- Stronger typography, spacing, page headers, navigation, course cards, assessment cards, filters, dark sections and responsive behaviour.
- Homepage reduced to three latest assessments and three latest updates.
- Full update log opens in a modal.
- Five course pathways: Methods 1/2, Methods 3/4, Specialist 1/2, Specialist 3/4 and Physics 1/2.
- **Major final course expansion:** Methods 1/2 gained 30 authored deep-dive lessons; Methods 3/4 gained 31; Specialist 1/2 gained 30; Specialist 3/4 gained 32.
- Every new mathematics lesson includes expanded theory, objectives, worked method, an explicit exam trap and a five-question mastery set spanning Core/VCAA/Advanced reasoning. This adds 123 lessons and 615 lesson-linked questions before 1.0.
- Physics 1/2 includes four core AOS pathways with 16 lessons each: Light & Heat, Nuclear Physics, Electricity and Motion.
- All 64 Physics lessons now receive a deeper teaching layer: physical model, equation conditions, VCE response method, units/assumptions, six-step worked reasoning, misconceptions and interpretation guidance.
- Physics mastery has been expanded from two to four multiple-choice questions per lesson, retaining reliable browser marking while adding reasoning and transfer checks.
- Arcade rebuilt into timed/combo Derivative Dash and canvas-based Brainpower Bird.
- Brainpower Bird includes Chill, Standard and Chaos modes, lives, score, best score, pausing and responsive canvas presentation.
- Four-paper 2026 Brainpower Mock Exam Series on the homepage with live countdowns to the corresponding VCAA exams.
- Mock countdown lifecycle now stops away from Home / while hidden and safely remounts on return.
- Legacy V4–V8 root changelogs consolidated into `docs/LEGACY_CHANGELOG.md`.
- Repository/package documentation now follows the public 0.x release line; old V7/V8 product branding and README credentials have been removed.

## Assessment metadata audit
Verified in this pass:
- Differential Calculus — Spider-Man: 5 min reading, 50 min writing, 32 marks, 3 questions.
- Circular Functions — The Backrooms: 5 min reading, 45 min writing, 31 marks, 6 questions.
- Kinematics — Felix's Party Quiz Showdown: 5 + 50 min, 25 marks, 5 questions.
- Number & Proof — Blackburn Lip Sync Scandal: 5 + 50 min, 31 marks, 7 questions.
- Matrices: 5 + 50 min, 40 marks, 6 questions.
- Further Trigonometry: 5 + 50 min, 33 marks, 6 questions.
- Complex Numbers: 5 + 50 min, 30 marks, 4 questions.

Audited values are now present in the base test data where known. Unverified/null metadata is not printed as `null` and Exam Mode remains locked where essential metadata is incomplete.

## Final approval QA
Before renaming the public release to 1.0, manually check:
1. **Home:** loader completes once, Brainy appears, mock series appears only on Home, countdowns update, only 3 recent tests and updates are visible.
2. **Update log:** opens/closes with button, backdrop and Escape.
3. **Navigation:** every public route renders in light and dark mode; browser Back/Forward works.
4. **Learn:** all five course cards open, topic counts make sense and no course has an empty path. Confirm the four maths courses visibly contain the new 30+ lesson expansion.
5. **Lessons:** new mathematics theory, worked content, five-question mastery sets and MathPad/MCQ interactions render; completion/mastery persists after refresh.
6. **Physics:** all 64 lessons open with the deep teaching layer; all four required MCQs exist; every AOS contains 16 lessons; equations, units, calculation distractors and explanations render correctly.
7. **Practice:** filters, maths input, choice questions, checking, explanations and XP work; solved state persists; new expansion questions appear under the correct course/topic.
8. **Tests:** filters work; no `null`/`undefined` metadata; PDF links resolve; marking-scheme links only appear where valid.
9. **Exam Mode:** reading/writing timers, rules, score entry and saved score work for fully specified assessments; incomplete assessments cannot enter fake Exam Mode.
10. **Mock exams:** all four Drive links open the intended papers and displayed exam dates/times match the intended 2026 timetable.
11. **Resources:** search/filter/bookmark/open/download work; assessment and solution resources point to valid files.
12. **Tools:** calculators, trig values, random question, timer and vector visualiser work with keyboard and pointer input.
13. **Arcade:** both games restart cleanly; Bird works by pointer and Space; pause works; high scores persist locally.
14. **Progress:** existing local progress remains readable; expanded course/Physics progress does not corrupt earlier progress.
15. **Admin:** hidden route still opens, authoring/export flow works and no private tokens/secrets are embedded in exported or public files.
16. **Mobile:** nav, filters, cards, lesson content, MathPad, mock countdowns and arcade remain usable at narrow widths without horizontal overflow.
17. **Accessibility:** keyboard focus is visible, Brainy can be activated by keyboard, semantic buttons/links work, images have useful alt text and dialogs are operable.
18. **Reduced motion:** loader/mascot/game UI does not force decorative animation when the OS/browser requests reduced motion.
19. **Console:** normal navigation produces no uncaught exceptions, failed module imports or repeated observer/timer errors.
20. **Release metadata:** package/readme/changelog/site update log all agree on the version being released.

Only after this checklist and user review pass should the public version be changed to **1.0**.
