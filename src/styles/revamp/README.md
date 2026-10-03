# Brainpower design system

`tokens.css` owns the palette, sizing, spacing and motion values. `base.css` owns the reset, native controls, focus and loading surfaces. `components.css` owns shared questions, mathematical inputs, calculators, diagnostics and admin forms. `shell.css` owns navigation and the footer. Each major route has a scoped stylesheet here; route-only feature modules load through `route-modules.js`.

The former `main.css`, `pre1-overhaul.css`, `release-candidate.css` and `v1-final.css` are retired and do not load. They remain in Git history/source for migration reference. Do not reintroduce them or solve bugs with a new patch layer. Fix the owning component or route instead.

Normal component rules use scope and order rather than `!important`. The remaining priority rules enforce native hidden states and accessibility/reduced-motion preferences.

Production artwork lives in `public/art/` as compressed WebP assets. Critical labels and progress remain real HTML. Brainy uses the canonical cream open-book, navy hoodie and red backpack reference in `public/brand/brainy.svg`.

The public version remains pre-1.0 until all revamp acceptance requirements are met.
