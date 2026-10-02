# Milestone B3 QA — Focused Lesson Experience

Status: **USER REVIEW**  
Branch: `revamp/milestone-b3-lessons`  
Production: **not merged**

Milestone B3 migrates Brainpower lesson routes into the Learning World design system while deliberately making lessons quieter than Home, Learn and course overview pages. The target is a serious digital textbook and practice workspace rather than another promotional dashboard.

## 1. Lesson architecture

- [x] existing lesson/course/question data remains authoritative
- [x] existing question checking remains authoritative
- [x] existing lesson-completion storage remains authoritative
- [x] existing KaTeX rendering remains intact
- [x] new lesson revamp is applied as a stable route enhancement rather than duplicating lesson content
- [x] all five live courses use the same lesson-experience architecture
- [x] Methods, Specialist and Physics retain their subject accent systems

The revamp intentionally preserves the existing educational lesson body and changes its presentation, navigation and live progress behaviour rather than replacing content with generated filler.

## 2. Lesson opening

Each lesson opens with a restrained subject-specific scene using the repository-owned B2 course artwork.

- [x] generated art supplies atmosphere only
- [x] lesson title, topic, course, duration, difficulty and XP remain live HTML
- [x] breadcrumb returns directly to the relevant course map
- [x] hero uses a strong dark overlay so artwork never competes with lesson text
- [x] runtime URLs are resolved from the document base, so GitHub Pages subpath deployment works correctly
- [x] no signed generation URL is used

No new generated artwork was added for B3 because the full lesson body is intentionally non-cinematic. Reusing the approved course scene for the short opening keeps the subject world coherent without making every content block decorative.

## 3. Persistent lesson ribbon

A compact sticky ribbon remains available while studying.

- [x] course and lesson position
- [x] live reading progress
- [x] live required-question progress
- [x] lesson-map control
- [x] focus-mode control
- [x] responsive simplification on tablet/mobile

The ribbon communicates progress without consuming a large amount of reading space.

## 4. Chapter navigation and lesson outline

The previous long whole-course side list has been replaced with a compact current-chapter study navigator.

- [x] current course shortcut
- [x] current chapter title
- [x] lesson position within the full course
- [x] lessons in the current chapter
- [x] completed/current lesson states
- [x] checkpoint labels where applicable
- [x] topic-practice shortcut
- [x] generated on-page outline based on the real lesson sections
- [x] current outline section updates while scrolling
- [x] mobile lesson map opens explicitly from a touch-friendly control
- [x] no hover-only mobile navigation

## 5. Reading surface

The content column is designed as a low-glare digital textbook.

- [x] focused central reading width
- [x] dark low-glare theory surfaces
- [x] consistent section hierarchy
- [x] learning-goal and prerequisite/mastery briefing
- [x] Big Picture treatment
- [x] Why the Method Works / derivation treatment
- [x] formula relation panel
- [x] worked-example cards
- [x] exam-lens / common-trap treatment
- [x] retrieval-check treatment
- [x] subject accent used sparingly rather than recolouring the entire page

The layout intentionally avoids constant animation, oversized artwork and excessive glow inside sustained reading areas.

## 6. Practice inside lessons

Required and optional practice remains interactive using the existing question engine.

- [x] question prompts remain live HTML/KaTeX
- [x] answer checking remains unchanged
- [x] choice questions remain functional
- [x] typed mathematical answers remain functional
- [x] maths keyboard remains functional
- [x] correct/incorrect feedback remains accessible and high-contrast
- [x] practice cards switch to a light paper surface for working clarity
- [x] optional depth questions remain visually separate from required mastery questions

## 7. Live mastery gate fix

B3 fixes an important interaction issue in the previous lesson route.

Previously, answering the final required question updated stored question progress, but the lesson-completion button could remain visually locked until the page rerendered.

B3 now reloads the real saved progress after question interactions and updates the lesson mastery state immediately.

Verified:

- [x] required-question counter updates from saved progress
- [x] mastery percentage updates live
- [x] the completion button unlocks when every required question is solved
- [x] the mastery-gate explanation changes to the ready state
- [x] existing `completeLesson` behaviour still awards completion through the original application code
- [x] incomplete lessons cannot be falsely marked mastered

## 8. Focus mode

Focus mode deliberately removes the broader Brainpower world while preserving the lesson itself.

- [x] top navigation hidden
- [x] course/lesson hero hidden
- [x] chapter sidebar hidden
- [x] footer hidden
- [x] lesson reader recentred
- [x] sticky progress ribbon retained
- [x] Exit focus control retained
- [x] Escape exits focus mode
- [x] route does not change

This makes Focus mode a genuine reading state rather than a cosmetic fullscreen button.

## 9. Responsive browser QA

A Playwright/Chromium pass was run against the actual B3 branch on a local static server.

Representative desktop lessons at 1440×900:

- [x] Methods 1/2 — Function notation & evaluation
- [x] Methods 3/4 — Reciprocal transformations
- [x] Specialist 1/2 — Logic and proof language
- [x] Specialist 3/4 — Rational function structure
- [x] Physics 1/2 — Waves and electromagnetic radiation

Additional states:

- [x] Methods 1/2 — 1024×768 tablet
- [x] Specialist 3/4 — 768×1024 tablet portrait
- [x] Methods 1/2 — 390×844 mobile
- [x] Physics 1/2 — 360×800 narrow mobile
- [x] Methods 1/2 — full-page capture
- [x] Methods 3/4 — Focus mode
- [x] Specialist 1/2 — open mobile lesson map
- [x] Methods 1/2 — ready-to-complete mastery state seeded with its real required question IDs

Automated assertions checked:

- [x] lesson H1 renders
- [x] B3 lesson ribbon renders
- [x] B3 chapter navigation renders
- [x] substantial lesson sections render
- [x] on-page outline renders
- [x] required practice questions render
- [x] computed hero artwork is repository-owned course art
- [x] no CloudFront / generation-host URL is used
- [x] no horizontal overflow at tested sizes
- [x] legacy whole-course lesson-nav list is removed
- [x] Focus mode hides shell/sidebar and preserves lesson route
- [x] mobile lesson map opens
- [x] mastery gate unlocks in a real saved-progress ready state
- [x] no page errors or failed asset requests

Final browser report: **PASS — 0 problems**.

## 10. QA finding corrected before review

The first visual passes exposed a real asset-resolution bug: a relative hero path stored inside a CSS custom property was being resolved relative to `src/styles/revamp/lesson.css`, producing requests such as `src/styles/revamp/public/art/courses/...`.

The lesson runtime now resolves the approved course artwork against `document.baseURI` before assigning the CSS custom property. The final browser pass confirms all five lesson hero images load with no 404s.

## 11. Static checks

- [x] existing revamp static-smoke workflow passes
- [x] B3 lesson browser QA passes
- [x] local production artwork loads correctly
- [x] no new generated-host dependency introduced
- [x] existing route transition remains active
- [x] reduced-motion rules retained
- [x] responsive touch controls retained
- [x] print rules added for a cleaner lesson printout

## 12. Review gate

B3 is ready for visual/user review but remains isolated from `main`.

Do not merge until the user approves the lesson direction. If approved, merge the B3 pull request into `main`, verify the GitHub Pages deployment, then proceed to the next revamp milestone.
