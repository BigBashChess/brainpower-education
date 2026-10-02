# Milestone C1 QA — Test Centre, Test Detail and Exam Mode

Status: **READY TO MERGE**  
Branch: `revamp/milestone-c1-assessment`

Milestone C1 rebuilds Brainpower's assessment flow around a formal Test Centre, transparent source metadata and a restrained Exam Mode.

## 1. Test Centre

- [x] dedicated cinematic exam-hall/study-desk hero
- [x] permanent repository-owned WebP artwork at `public/art/assessment/test-centre-hero.webp`
- [x] hero artwork contains no generated UI or readable fake labels
- [x] live HTML title, copy, buttons and library statistics
- [x] assessment principles: sit properly, mark with evidence, review result
- [x] all existing assessment data remains authoritative
- [x] unknown source metadata is hidden rather than guessed
- [x] no visible `null` or `undefined` metadata
- [x] best recorded score appears only when a real saved attempt exists
- [x] Exam Mode action appears only when a paper and real writing-time metadata exist

## 2. Assessment discovery

Category navigation covers:

- [x] All assessments
- [x] 2026 mocks
- [x] Methods 1/2
- [x] Methods 3/4
- [x] Specialist 1/2
- [x] Specialist 3/4
- [x] Physics
- [x] Other

Filters cover:

- [x] search by title / topic / subject
- [x] technology conditions
- [x] marking-scheme availability
- [x] difficulty
- [x] transparent empty state

## 3. 2026 mock examination series

The four existing Brainpower mocks now share one central data source used by both Home and the Test Centre.

- [x] Methods Examination 1
- [x] Methods Examination 2
- [x] Specialist Examination 1
- [x] Specialist Examination 2
- [x] real published VCAA exam dates remain the countdown target
- [x] Melbourne-time label retained
- [x] existing Drive paper links retained
- [x] Home mock section reuses the same data instead of duplicating dates

## 4. Assessment cards and detail pages

- [x] paper cover/thumbnail region with robust fallback
- [x] title, subject/course and verified/partial metadata state
- [x] known reading/writing time, marks and question counts only
- [x] topic tags
- [x] View, Download and Exam Mode actions
- [x] marking scheme clearly available/unavailable
- [x] no fabricated scheme when one is absent
- [x] saved assessment/bookmark support retained
- [x] saved attempt history shown when present
- [x] topic links back into Practice

The detail page deliberately avoids the old tiny embedded PDF-with-scrollbars preview. It presents a clean paper image/cover and explicit Open / Download actions. The full PDF is embedded only inside Exam Mode, where it is actually useful.

## 5. Exam Mode

Exam Mode is intentionally much more restrained than the wider Learning World.

- [x] global website chrome removed while the attempt is active
- [x] assessment title and current phase remain visible
- [x] separate reading and writing phases
- [x] pause / resume
- [x] skip from reading to writing when appropriate
- [x] persistent session state in local storage
- [x] elapsed time reconciles after refresh or returning to the tab
- [x] reading time automatically hands into writing time
- [x] timer uses a semantic `role="timer"` and changing aria-label
- [x] no flashing timer treatment
- [x] finish confirmation includes remaining time
- [x] PDF limitations are explicit: unfinished and flagged questions show `Unknown` because Brainpower cannot inspect marks on a PDF
- [x] solutions stay hidden until after the attempt
- [x] manual score entry only when the source has a verified total mark
- [x] existing Progress score storage remains authoritative
- [x] no fake auto-marking of PDF papers
- [x] attempt can be reset deliberately

## 6. Artwork pipeline

A new 21:9 Test Centre environment was generated for C1 and then converted to a permanent local WebP asset. The temporary one-shot vendoring workflow was removed after the asset entered the repository.

Final production asset:

- `public/art/assessment/test-centre-hero.webp`
- approximately 41 KB

Production CSS does not depend on the temporary generation URL.

## 7. Browser QA

Automated Playwright/Chromium QA covers:

- [x] Test Centre — 1440×900
- [x] Test Centre — 1024×768
- [x] Test Centre — 390×844
- [x] full Test Centre page capture
- [x] Specialist category + marking-scheme filtering
- [x] dedicated mock-series category
- [x] verified test-detail state
- [x] partial-metadata test-detail state on mobile
- [x] no embedded PDF iframe on normal test-detail pages
- [x] Exam Mode restore from local session state
- [x] running timer survives reload with elapsed time accounted for
- [x] finish-confirmation disclosure
- [x] manual score save
- [x] mobile Exam Mode workspace
- [x] no horizontal overflow at tested breakpoints
- [x] permanent local hero artwork path
- [x] no failed local asset requests in tested routes

Final C1 browser workflow: **PASS**.  
Revamp static smoke: **PASS**.

## 8. QA finding corrected before merge

The first C1 browser run stopped because the partial-detail assertion used a broad `main` locator while the legacy page structure could temporarily expose more than one `main` element during enhancement. The assertion was scoped to the actual C1 detail-page root and the complete browser suite then passed.

## 9. Merge gate

Milestone C1 is ready to merge to `main`. After deployment, continue with Milestone C2: Resources + Tools.
