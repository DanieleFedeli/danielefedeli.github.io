# Proposal: Add GitHub Pages Deployment

## Why
The site is currently only buildable locally. To make it accessible on the web, we need automated deployment to GitHub Pages that builds and publishes the site on every push to main.

## What Changes
- Create GitHub Actions workflow (`.github/workflows/deploy.yml`) to build and deploy Zola site
- Update `config.toml` with correct `base_url` for GitHub Pages
- Configure workflow to use Zola, build the site, and deploy to `gh-pages` branch
- Add deployment documentation to project

## Impact
- Affected specs: deployment (new capability)
- Affected code: `.github/workflows/deploy.yml` (new), `config.toml` (base_url update)
- No breaking changes to existing functionality
- Site will be automatically deployed on every push to main branch
