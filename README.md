# danielefedeli.github.io

Personal blog focused on backend engineering, scalability, and software architecture.

## Tech Stack

- **[Zola](https://www.getzola.org/)** - Fast static site generator written in Rust
- **GitHub Pages** - Hosting with automatic HTTPS
- **GitHub Actions** - CI/CD pipeline for automated deployments

## Features

- Dark theme optimized for readability
- Client-side search powered by ElasticLunr.js
- Typography using Inter font with modular scale
- Responsive design with semantic HTML
- RSS feed support
- Syntax highlighting for code blocks

## Local Development

### Prerequisites

Install Zola (v0.17+ recommended):

```bash
# macOS
brew install zola

# Linux
snap install zola

# Windows
choco install zola
```

### Running Locally

```bash
# Start development server
zola serve

# Build for production
zola build
```

Development server runs at `http://127.0.0.1:1111` with live reload enabled.

## Project Structure

```
.
├── content/           # Markdown content
│   ├── blog/         # Blog posts
│   └── _index.md     # Homepage content
├── templates/        # Tera templates
│   ├── base.html     # Base layout
│   ├── index.html    # Homepage
│   ├── blog.html     # Blog listing
│   └── blog-page.html # Individual post
├── static/           # Static assets
│   ├── css/          # Stylesheets
│   └── search.js     # Search functionality
├── config.toml       # Site configuration
└── .github/
    └── workflows/
        └── deploy.yml # Deployment automation
```

## Creating Content

### New Blog Post

Create a file in `content/blog/`:

```markdown
+++
title = "Post Title"
date = 2026-01-09
description = "Brief description for previews"
+++

Content goes here.
```

### Frontmatter Fields

- `title` (required) - Post title
- `date` (required) - Publication date
- `description` (optional) - Shown in blog listing and previews
- `draft` (optional) - Set to `true` to exclude from builds

## Deployment

Deployment is fully automated via GitHub Actions.

**Workflow:**
1. Push to `main` branch
2. GitHub Actions runs the workflow
3. Zola builds the site
4. Built site deploys to `gh-pages` branch
5. GitHub Pages serves the site at `https://danielefedeli.github.io`

Deployment typically completes in 30-60 seconds.

### Manual Deployment

Trigger manually from the Actions tab:
`https://github.com/DanieleFedeli/danielefedeli.github.io/actions`

## Configuration

Key settings in `config.toml`:

- `base_url` - Site URL (required for proper links)
- `compile_sass` - Enable Sass compilation
- `build_search_index` - Enable search functionality
- `highlight_code` - Enable syntax highlighting

## Typography

The site uses a modular scale (1.25x ratio) for consistent hierarchy:

- h1: 1.75rem
- h2: 1.5rem  
- h3: 1.25rem
- h4: 1.1rem
- Body: 1rem
- Meta: 0.78rem

Line height is set to 1.65 for comfortable reading with Inter font.

## Search

Search indexes blog posts only (excludes homepage and other pages). 

Configuration:
- Title boost: 3x (prioritizes title matches)
- Boolean mode: OR (flexible matching)
- Max results: 10

## License

Content is my own. Code is available for reference.
