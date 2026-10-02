# Milestone B4 QA — Practice Centre + Daily Brainpower alignment

Status: **READY TO MERGE — final portion of Milestone B**  
Branch: `revamp/milestone-b4-practice`

B4 turns Practice into a deliberate training room while preserving the existing real question bank, answer checking, KaTeX rendering and local progress model. Daily Brainpower remains the compact one-question challenge on Home and continues to use the same underlying question engine and progress system established earlier in the revamp.

## Practice hub

- [x] cinematic but restrained training-room hero using repository-owned course artwork
- [x] real question-bank mastery status in the hero
- [x] Build Session and Browse Bank tabs
- [x] course, topic, difficulty, question-count, source and timing controls
- [x] query-string course/topic presets continue to work from lesson/course links
- [x] live availability count and clear empty-filter guidance
- [x] full bank browsing remains available rather than being replaced by the session builder
- [x] existing bank search and filters remain functional

## Smart starts

- [x] Quick 5 mixed warm-up
- [x] unresolved/missed-question review
- [x] Separator preset for hardest available questions
- [x] unavailable presets disable cleanly rather than creating empty sessions
- [x] training snapshot uses actual saved progress and explicitly avoids pretending bank coverage is a VCE score

## Active practice session

- [x] session view isolates the working area from the global site shell
- [x] question number, progress, live first-try score and timer remain visible
- [x] timed and untimed sessions supported
- [x] active timer receives a low-time state without flashing/panic behaviour
- [x] existing question-card/KaTeX/answer-checking logic reused
- [x] wrong answers allow an explicit retry before moving on
- [x] solved-question progress continues to write through the existing progress store
- [x] skip behaviour retained
- [x] session completion produces a dedicated review view

## Review screen

- [x] first-try result summary
- [x] resolved-question summary
- [x] topic breakdown
- [x] route back to builder for another targeted set
- [x] review remains within the focused session shell until the user leaves

## Responsive browser QA

The final Playwright/Chromium branch pass checked:

- [x] Practice hub at 1440×900
- [x] Practice hub at 1024×768
- [x] Practice hub at 390×844
- [x] full-page Practice layout with Specialist 3/4 course preset
- [x] query-preset course selection
- [x] Browse Bank tab with a real `integration` search filter
- [x] timed five-question session start
- [x] isolated session shell with global header and builder hidden
- [x] a wrong-answer → retry → correct-answer interaction using the real active question data
- [x] progression to the session review screen
- [x] mobile Quick 5 session at 390×844
- [x] no horizontal overflow in tested hub/session states
- [x] no browser page errors
- [x] no failed asset requests
- [x] practice hero uses repository-owned course artwork rather than generation-host URLs

Final `B4 practice browser QA`: **PASS**.  
Final `Revamp static smoke`: **PASS**.

## Milestone B completion

Milestone B consists of the complete learning loop revamp through Practice:

- B1 — Learn hub
- B2 — five course control rooms
- B3 — individual lesson experience
- B4 — Practice Centre + Daily Brainpower alignment

Once this branch is merged, **Milestone B is complete** and production can move to Milestone C: Test Centre / Exam Mode, Resources / Tools and Progress.
