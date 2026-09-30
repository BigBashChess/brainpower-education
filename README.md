# Brainpower Education V7 — Deep Lesson Experience

V7 keeps Brainpower Education static, free to host on GitHub Pages and independent of AI/database services, while substantially upgrading the quality and depth of the interactive courses.

## Courses

- Mathematical Methods Units 1 & 2 — 22 lessons/checkpoints, 65 practice questions
- Mathematical Methods Units 3 & 4 — 19 lessons/checkpoints, 57 practice questions
- Specialist Mathematics Units 1 & 2 — 22 lessons/checkpoints, 59 practice questions
- Specialist Mathematics Units 3 & 4 — 35 lessons/checkpoints, 74 practice questions

Total: **98 interactive lessons/checkpoints**, **255 practice-bank questions**, plus **14 Daily Brainpower** challenges.

## V7 lesson model

Lessons are no longer short explanations followed immediately by questions. Each lesson now follows a deeper mastery sequence:

1. Learning goals
2. Big-picture intuition
3. Key conceptual lens
4. Why the method works / derivation
5. Core relation or formula in context
6. Worked-method skeleton
7. Full worked example where available
8. Common exam traps
9. Strong-solution strategy
10. Required guided practice
11. Optional transfer practice
12. Retrieval check
13. Mastery gate

Specialist Mathematics 3/4 is the flagship course and receives extensive lesson-specific deep dives and worked examples across functions, complex numbers, vectors, calculus, differential equations, probability/statistics and mechanics.

## Content architecture

V7 adds:

```text
src/data/lesson-depth-v7.js
```

This content layer keeps detailed teaching material separate from sequencing and question-bank data. It makes future lesson expansion much easier without rewriting the course engine.

## Existing systems retained

- Course diagnostics
- 100% required-question lesson mastery
- Specialist topic checkpoints
- MathPad answer input and live rendering
- Algebraic-equivalence checking where supported
- Hidden Brainpower Admin Studio at `#admin`
- Test library + Exam Mode
- The Vault
- Progress dashboard
- Tools
- Brainpower Arcade
- Brainpower Bird Chill / Standard / Chaos modes
- Instagram + Discord links
- Dark mode and responsive layout

## Admin Studio

Route: `#admin`

Current development credentials:

- Username: `brainpower-admin`
- Password: `BrainpowerV5!`

This remains a static-client authoring gate rather than server-grade authentication. Never put GitHub write tokens or other private credentials in the frontend.

## Hosting

The project remains build-step-free and works directly on GitHub Pages.

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main`
4. Folder: `/ (root)`

## Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
