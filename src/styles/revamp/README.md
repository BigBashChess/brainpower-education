# Brainpower revamp style layer

This directory is the canonical design-system layer for the staged Brainpower Education revamp.

## Current authority

- `tokens.css` — colour, spacing, radius, shadow, motion and width tokens.
- `base.css` — shared controls, focus behaviour, basic surfaces and boot state.
- `shell.css` — global navigation, responsive mobile dock and footer.
- `home.css` — migrated Home route only.
- `exam-season.css` — compact 2026 mock-exam countdown module used on Home.

## Migration rule

A route is migrated only when its new revamp stylesheet/component structure is complete enough to replace the old route-specific presentation. New revamp styles load after legacy CSS during the migration so migrated components can be authoritative without breaking unmigrated pages.

Do **not** solve new revamp bugs by creating arbitrary patch stylesheets. Fix the relevant token/component/page file.

## Legacy layers still temporarily loaded

The following remain because unmigrated routes still depend on them:

- `../main.css`
- `../pre1-overhaul.css`
- `../release-candidate.css`
- `../v1-final.css`

They should be retired route-by-route, not deleted all at once.

The old Brainy gallery/home artwork CSS and old global Brainy JS are no longer loaded. `pre1-overhaul.js` has been reduced to an Arcade compatibility bridge only; it should disappear when Arcade is rebuilt.

## Required end state

The end-state structure should converge toward:

```text
src/styles/
  revamp/
    tokens.css
    base.css
    shell.css
    components.css
    pages/
      home.css
      learn.css
      course.css
      lesson.css
      practice.css
      tests.css
      resources.css
      progress.css
      tools.css
      arcade.css
      about.css
```

The exact folder shape can change, but the principle cannot: shared rules live once, route rules stay scoped, and `!important` escalation is not the architecture.

## Artwork rule

Generated artwork creates atmosphere; HTML creates the product. Critical labels, dates, marks, navigation, course titles and progress data remain real DOM content. Production-approved art should ultimately live under `public/art/` in compressed responsive formats rather than depending on temporary hosted generation URLs.
