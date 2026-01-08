# Implementation Tasks

## Phase 1: Setup GitHub Actions Workflow
- [ ] Create `.github/workflows/` directory
- [ ] Create `deploy.yml` workflow file with Zola build and GitHub Pages deployment steps
- [ ] Configure workflow to trigger on push to main branch
- [ ] Set up permissions for GitHub Pages deployment

## Phase 2: Configure Base URL
- [ ] Determine GitHub Pages URL format (username.github.io/repo-name)
- [ ] Update `base_url` in `config.toml` to match GitHub Pages URL
- [ ] Verify all internal links use `get_url()` helper (already done)

## Phase 3: Repository Setup
- [ ] Document GitHub Pages setup instructions (Settings → Pages → Source: gh-pages branch)
- [ ] Add deployment status badge to README (optional)

## Phase 4: Testing
- [ ] Commit and push workflow to GitHub
- [ ] Verify GitHub Actions workflow runs successfully
- [ ] Verify site is accessible at GitHub Pages URL
- [ ] Test navigation, search, and all features on deployed site

## Phase 5: Documentation
- [ ] Update project.md with deployment information
- [ ] Document how to trigger manual deployments if needed
