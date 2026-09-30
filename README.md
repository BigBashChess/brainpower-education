# Brainpower Education V4

Precision quality pass focused on the core learning experience: Learn, Practice, Tests, The Vault and Progress.


Brainpower Education is a static VCE Mathematics learning platform for:

- Mathematical Methods Units 1 & 2
- Mathematical Methods Units 3 & 4
- Specialist Mathematics Units 1 & 2
- Specialist Mathematics Units 3 & 4

This build deliberately uses **no AI**, **no database**, and **no paid API**. It is designed to work directly on GitHub Pages.

## Included in this build

- Brainpower-branded responsive homepage
- Four course hubs and visual topic pathways
- 16 interactive lesson previews
- Pre-built question bank with Core / VCAA / Advanced / Separator difficulty
- Local XP, levels, streaks, mastery and achievements
- Practice Test Centre
- The supplied Specialist 1/2 Kinematics test
- PDF preview, download and marking-scheme link
- Exam Mode with reading time, writing time and score tracking
- The Vault resource library
- Global search across courses, lessons, questions, tests and resources
- Percentage calculator, target-score calculator, exact trig reference, study timer, vector visualiser and random practice
- Daily Brainpower challenge
- Derivative Dash
- Brainpower Bird
- Dark mode
- Instagram and Discord links
- Mobile layout

## How it works

The project is intentionally build-step-free. `index.html` loads ES modules from `src/` directly, so GitHub Pages can host the repository from the root without Vite, npm or a server build.

Progress is stored in browser `localStorage` under `brainpower-progress-v4`.

## Preview locally

Opening `index.html` directly may work in some browsers, but ES modules are most reliable through a tiny local web server.

If Python is installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

Repository settings:

1. **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**
4. Folder: **/ (root)**

No build command is required.

## Project structure

```text
brainpower-education/
├── index.html
├── 404.html
├── public/
│   ├── brand/
│   ├── thumbnails/
│   └── resources/
│       ├── methods-12/
│       ├── methods-34/
│       ├── specialist-12/
│       └── specialist-34/
└── src/
    ├── data/
    │   ├── site.js
    │   ├── courses.js
    │   ├── lessons.js
    │   ├── questions.js
    │   ├── tests.js
    │   └── resources.js
    ├── progress/
    │   └── store.js
    ├── styles/
    │   └── main.css
    ├── components.js
    ├── pages.js
    ├── utils.js
    └── main.js
```

See `ADDING_RESOURCES.md` before adding new PDFs.
