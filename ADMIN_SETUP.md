# Brainpower Admin Studio (V5)

The Admin Studio is intentionally hidden from normal navigation.

Open it by visiting:

`#admin`

For the current V5 development build:

- Username: `brainpower-admin`
- Password: `BrainpowerV5!`

## What it can do

The studio can prepare:

- Practice tests
- Solution PDFs
- Notes / worksheets / revision resources
- New practice questions

It creates a **GitHub-ready publish ZIP**. Unzip the pack and upload its contents over the root of the existing `brainpower-education` GitHub repository. GitHub Pages will then redeploy the new content.

## Why publishing is not one click

GitHub Pages is a static host. Putting a GitHub write token inside the public website would be unsafe because visitors could inspect and steal it. V5 therefore never stores a GitHub token and never writes directly to the repository.

The username/password screen is a convenience/privacy gate, not server-grade authentication. The public source contains the username and a password hash. If you later want secure one-click publishing, use a small server-side service such as a Cloudflare Worker or another protected backend.

## Published admin data

Admin-created metadata lives in:

`src/data/admin-content.js`

Do not delete this file when adding future site updates if it contains published content.
