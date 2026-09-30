// Static GitHub Pages admin gate.
// IMPORTANT: This is a convenience gate, not server-grade authentication.
// Anyone who can inspect the public source can see the username and password hash.
// The studio cannot alter GitHub directly; it exports a publish pack for you to upload.
export const ADMIN_USERNAME = 'brainpower-admin';
export const ADMIN_PASSWORD_SHA256 = '60cff1559b3728ab3d85bdea1a1e93ca0da47dca0a937bfa253d65e018aed9dc';
export const ADMIN_SESSION_KEY = 'bp-admin-session-v5';
export const ADMIN_DRAFT_KEY = 'bp-admin-drafts-v5';
