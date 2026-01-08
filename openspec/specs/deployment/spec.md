# deployment Specification

## Purpose
TBD - created by archiving change add-github-pages-deployment. Update Purpose after archive.
## Requirements
### Requirement: Site MUST be automatically deployed to GitHub Pages on every push to main
The repository MUST have a GitHub Actions workflow that automatically builds the Zola site and deploys it to GitHub Pages whenever changes are pushed to the main branch.

#### Scenario: Developer pushes changes to main branch
- **Given** a developer has made changes to content or templates
- **When** the changes are pushed to the main branch
- **Then** GitHub Actions workflow triggers automatically
- **And** Zola builds the site successfully
- **And** the built site is deployed to the gh-pages branch
- **And** GitHub Pages serves the updated site within 1-2 minutes

#### Scenario: Build fails due to content error
- **Given** a developer pushes changes with invalid frontmatter or broken links
- **When** the GitHub Actions workflow runs
- **Then** the Zola build step fails with clear error messages
- **And** the workflow marks the run as failed
- **And** the previous working version remains deployed
- **And** the developer can see error logs in GitHub Actions UI

### Requirement: Site MUST use correct base URL for GitHub Pages
The `config.toml` MUST specify the correct `base_url` matching the GitHub Pages URL format so that all internal links, assets, and navigation work correctly on the deployed site.

#### Scenario: User navigates between pages on deployed site
- **Given** the site is deployed to GitHub Pages at `https://username.github.io/repo-name/`
- **When** a user clicks internal navigation links
- **Then** all links resolve correctly using the base_url
- **And** assets (CSS, JS, images) load from the correct path
- **And** the search functionality works with correct URLs

#### Scenario: Developer tests site locally
- **Given** `base_url` is set to GitHub Pages URL
- **When** developer runs `zola serve` locally
- **Then** local development still works (Zola handles localhost override)
- **And** all features function correctly in local environment

### Requirement: Deployment workflow MUST have appropriate permissions
The GitHub Actions workflow MUST be configured with necessary permissions to write to the repository (deploy to gh-pages branch) and MUST use secure token authentication.

#### Scenario: Workflow attempts to deploy to gh-pages branch
- **Given** the GitHub Actions workflow has built the site
- **When** the deployment step attempts to push to gh-pages branch
- **Then** the workflow has `contents: write` permission
- **And** uses GITHUB_TOKEN for authentication
- **And** successfully creates or updates the gh-pages branch

