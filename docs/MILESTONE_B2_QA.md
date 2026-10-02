# Milestone B2 QA — Five Course Control Rooms

Status: **USER REVIEW**  
Branch: `revamp/milestone-b2-courses`  
Production: **not merged**

Milestone B2 migrates all five individual Brainpower course overview pages into the new site-wide revamp system.

## 1. Course pages migrated

- [x] Mathematical Methods Units 1 & 2
- [x] Mathematical Methods Units 3 & 4
- [x] Specialist Mathematics Units 1 & 2
- [x] Specialist Mathematics Units 3 & 4
- [x] Physics Units 1 & 2

All five use one reusable course-overview architecture while retaining distinct subject/level identities.

## 2. Unique production artwork

Five separate 21:9 course hero environments were generated specifically for B2, compressed to WebP, and committed as repository-owned production assets:

| Course | Production asset | Size |
|---|---|---:|
| Methods 1/2 | `public/art/courses/methods-12-hero.webp` | 88,356 B |
| Methods 3/4 | `public/art/courses/methods-34-hero.webp` | 68,178 B |
| Specialist 1/2 | `public/art/courses/specialist-12-hero.webp` | 90,086 B |
| Specialist 3/4 | `public/art/courses/specialist-34-hero.webp` | 104,280 B |
| Physics 1/2 | `public/art/courses/physics-12-hero.webp` | 121,440 B |

- [x] No signed generation URL is required at runtime.
- [x] Methods uses cool cyan/blue mathematical imagery.
- [x] Specialist uses violet/indigo advanced mathematical imagery.
- [x] Physics uses a dark experimental laboratory with cool instrument light and warm practical lighting.
- [x] Hero copy remains live HTML rather than text baked into the images.
- [x] Mobile crops keep headings readable.

## 3. Course control-room behaviour

Each course page now derives its interface from live Brainpower data rather than hard-coded display statistics.

- [x] live lesson count
- [x] live completed-lesson count
- [x] live question-bank count
- [x] live solved-question count
- [x] live course mastery
- [x] live linked formal-test count
- [x] next incomplete lesson
- [x] current chapter
- [x] recent saved Exam Mode scores when available
- [x] chapter-level mastery
- [x] lowest-mastery chapter recommendations

The hero CTA is contextual. A fresh course says `Start <lesson>`, an active course says `Continue <lesson>`, and a fully completed course changes to a review action.

## 4. Course map

- [x] chapters rendered in course-defined sequence
- [x] chapter number and topic name shown clearly
- [x] chapter lesson totals are live
- [x] status can be Ready / Current chapter / In progress / Mastered
- [x] chapter mastery bar is live
- [x] native expandable chapter containers are used
- [x] current chapter opens by default
- [x] individual lesson rows show completion/current state
- [x] lesson duration and difficulty retained
- [x] lesson summaries retained
- [x] topic-practice links remain available
- [x] no artificial prerequisite locks were invented

## 5. Supporting course surfaces

- [x] Course Control Room aside
- [x] next-lesson card
- [x] lesson / practice / test mini-statistics
- [x] lowest chapter mastery list
- [x] recent course test results / honest empty state
- [x] formal course assessment cards
- [x] course resource cards / honest empty state
- [x] links back to Test Centre, Resources and Progress

An empty assessment or resource library is described honestly rather than padded with fake content.

## 6. Completed-course state

Automated browser QA seeds a real completion state using the actual Methods 1/2 lesson IDs.

Verified:

- [x] mastery ring becomes 100%
- [x] all lesson completion is reflected in statistics
- [x] hero changes to `Review mastered course`
- [x] current-chapter panel becomes `All chapters complete`
- [x] Course Control Room switches to a mastered-course message
- [x] no fake completion date is displayed because the current progress schema does not store one

## 7. Responsive browser QA

A Playwright/Chromium regression pass was run against the actual branch using a local static server.

Routes checked at 1440×900:

- [x] Methods 1/2
- [x] Methods 3/4
- [x] Specialist 1/2
- [x] Specialist 3/4
- [x] Physics 1/2

Additional responsive states:

- [x] Methods 1/2 — 1024×768
- [x] Specialist 3/4 — 768×1024
- [x] Methods 1/2 — 390×844
- [x] Physics 1/2 — 360×800
- [x] Methods 1/2 — full-page 1440 px capture
- [x] Methods 1/2 — complete-course state

Automated assertions checked:

- [x] course H1 renders
- [x] expected chapter structures render
- [x] a chapter opens by default
- [x] lesson rows render
- [x] both lower support sections render
- [x] computed hero artwork points to `/public/art/courses/`
- [x] computed hero artwork does not point to CloudFront / generation hosting
- [x] no horizontal overflow at tested viewport sizes
- [x] legacy course cards/status UI is absent
- [x] no browser console/page errors
- [x] completed-course state reaches 100%

Final browser report: **PASS — 0 problems**.

## 8. Visual QA findings and fixes

The initial browser pass identified two review-quality issues that were corrected before this USER REVIEW state:

1. Full-page captures were not reliably painting the lower assessment/resource sections because an optional `content-visibility` optimisation was too aggressive for this page. It was removed. The complete page now renders continuously with no artificial blank region.
2. The diagnostic action was visually too weak beside the primary Start/Continue CTA. It now uses an intentional glass secondary-button treatment on desktop and mobile.

The completed-course screenshot originally caught the global route loader mid-transition. The QA timing was corrected to wait until route transitions are fully hidden before visual evidence is captured.

## 9. Static checks

- [x] existing revamp static-smoke workflow passes
- [x] course browser QA workflow passes
- [x] local hero assets are present on the branch
- [x] generated signed URLs removed from course runtime code
- [x] one-time artwork import/polish workflows removed after use
- [x] route-change loading system remains active

## 10. Review gate

B2 is ready for visual/user review but remains isolated from `main`.

Do not merge until the user approves the course-page direction. If approved, merge the B2 pull request into `main`, wait for GitHub Pages deployment, and then proceed to the lesson-experience portion of the revamp.
