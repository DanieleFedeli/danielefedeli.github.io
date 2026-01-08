# Design: GitHub Pages Deployment

## Context
GitHub Pages is a free static site hosting service that integrates directly with GitHub repositories. Zola is a static site generator that produces HTML/CSS/JS output, making it perfect for GitHub Pages.

## Goals
- Automated deployment on every push to main
- Fast build times (Zola is very fast)
- Zero-maintenance hosting (no server management)
- HTTPS enabled by default

## Non-Goals
- Custom domain setup (can be added later)
- Preview deployments for pull requests (can be added later)
- Multi-environment deployments (staging/production)

## Decisions

### Decision: Use GitHub Actions for CI/CD
**Why**: Native GitHub integration, free for public repos, simple YAML configuration

**Alternatives considered**:
- **Netlify/Vercel**: More features but overkill for a simple blog, vendor lock-in
- **Manual deployment**: Error-prone, no automation
- **GitHub Pages + local build**: Requires committing build output to repo

### Decision: Deploy to gh-pages branch
**Why**: GitHub Pages standard, keeps source and build separate, clean history

**Alternatives considered**:
- **docs/ folder**: Clutters main branch with build artifacts
- **Separate repo**: Unnecessary complexity for single site

### Decision: Use shalzz/zola-deploy-action
**Why**: Maintained, popular, handles Zola + GitHub Pages deployment in one action

**Alternatives considered**:
- **Manual Zola install + deploy**: More steps, harder to maintain
- **Custom action**: Reinventing the wheel

## Workflow Steps
1. Trigger: Push to main branch
2. Checkout repository code
3. Install Zola (via action)
4. Build site (`zola build`)
5. Deploy `public/` folder to gh-pages branch
6. GitHub Pages serves from gh-pages branch

## Configuration Required

### config.toml
```toml
base_url = "https://{username}.github.io/{repo-name}/"
```

### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: shalzz/zola-deploy-action@v0.17.2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### GitHub Repository Settings
- Settings → Pages → Source: Deploy from branch → gh-pages → / (root)

## Trade-offs

### Chosen Approach: GitHub Actions + gh-pages
**Pros**:
- ✅ Free for public repos
- ✅ Automatic HTTPS
- ✅ Fast builds (Zola is <5 seconds)
- ✅ Version controlled workflow
- ✅ No external services needed

**Cons**:
- ❌ Requires GitHub (not portable)
- ❌ Public repos only (free tier)
- ❌ Limited to 1GB storage, 100GB bandwidth/month (plenty for blog)

### Rejected: Netlify/Vercel
**Why**: Overkill for static blog, adds external dependency, similar features but unnecessary complexity

### Rejected: Manual deployment
**Why**: Error-prone, no automation, requires local build and manual push

## Risks / Mitigation

**Risk**: Build fails due to content errors
**Mitigation**: Zola's strict mode catches errors early, workflow logs visible in GitHub Actions

**Risk**: base_url misconfiguration breaks links
**Mitigation**: All templates use `get_url()` helper, which respects base_url setting

**Risk**: Workflow permissions issues
**Mitigation**: Set `permissions: contents: write` in workflow, use GITHUB_TOKEN

## Migration Plan
1. Create workflow file
2. Update base_url with correct GitHub Pages URL
3. Push to GitHub
4. Enable GitHub Pages in repo settings
5. Verify deployment works
6. No rollback needed (existing local setup unchanged)

## Open Questions
- What is the GitHub username and repository name? (needed for base_url)
- Is the repository public? (required for free GitHub Pages)
