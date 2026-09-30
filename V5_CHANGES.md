# Brainpower Education V5

## Major changes

### Question bank expansion
- Expanded from the small V4 starter bank to **107 pre-built practice questions** plus **14 Daily Brainpower challenges**.
- Broader coverage across all four courses and almost every course topic.
- Core, VCAA, Advanced and Separator questions remain tagged and filterable.

### Maths answer input
- Added a Brainpower maths pad to numeric/algebraic questions.
- Live formatted preview using KaTeX + Math.js where available.
- Quick buttons for roots, powers, pi, fractions/division, trig, logarithms, absolute value and complex `i`.
- Improved deterministic answer checking for numeric expressions and many algebraically equivalent forms.

### Hidden Admin Studio
- New hidden route: `#admin` (not linked in public navigation).
- Username/password gate using a SHA-256 password hash.
- Add test metadata, resource metadata and question-bank entries from a visual form.
- Attach PDFs / solution PDFs / thumbnails.
- Export a GitHub-ready ZIP publish pack containing `src/data/admin-content.js` and attached files in the correct folders.
- No GitHub token or API secret is stored in the site.

### Brainpower Bird
- Default **Chill** mode is substantially easier.
- Wider gaps, lower speed, gentler gravity and 3 lives.
- Standard and Chaos modes remain available.
- Collision radius is more forgiving and temporary invulnerability follows a lost life.

## Static-site limitation
The Admin Studio is an authoring tool, not a secure server backend. Because GitHub Pages is static, it cannot safely write directly to the repository. The studio exports a publish ZIP that the admin uploads to GitHub. The hidden admin password is a deterrent/convenience gate, not server-grade security.
