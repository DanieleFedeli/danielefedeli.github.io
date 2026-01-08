# typography Specification

## Purpose
TBD - created by archiving change fix-typography-hierarchy. Update Purpose after archive.
## Requirements
### Requirement: Heading hierarchy must be visually clear and semantic
All page headings MUST follow a consistent size hierarchy that matches their semantic importance (h1 > h2 > h3 > h4 > h5 > h6), with sufficient size differentiation for users to quickly understand content structure.

#### Scenario: User scans blog listing page
- **Given** the blog listing page is loaded
- **When** the user scans the page structure
- **Then** the "List of blog posts" heading (h1, `.section-heading`) is the most prominent text element at 1.75rem
- **And** the subtitle appears secondary at 0.9rem
- **And** blog card titles (h3, `.blog-card-title`) are clearly visible at 1.25rem
- **And** dates/meta text are de-emphasized at 0.78rem

#### Scenario: User reads blog post with multiple heading levels
- **Given** a blog post with h1, h2, h3, and h4 headings in its content
- **When** the user scrolls through the article
- **Then** each heading level is visually distinct with decreasing sizes (h1: 1.75rem, h2: 1.5rem, h3: 1.25rem, h4: 1.1rem)
- **And** all headings use bold weight (600)
- **And** headings have proper margins (top: 1.5-2rem, bottom: 0.75-1rem) for breathing room

### Requirement: Related elements must be spatially grouped
Spacing between elements MUST reflect their relationship: tightly related items have less space, while distinct sections have more separation.

#### Scenario: User views blog post header
- **Given** a blog post page is loaded
- **When** the user looks at the post header
- **Then** the "Back to Blog" link has 1.5rem bottom margin (isolated)
- **And** the date has 0.75rem bottom margin (near title but distinct)
- **And** the title appears clearly grouped with the date above it
- **And** the content begins 1rem below the title

#### Scenario: User views section with heading and subtitle
- **Given** any page section with a heading and subtitle (e.g., homepage "Latest post")
- **When** the user scans the section
- **Then** the heading and subtitle appear tightly coupled with 0.5rem spacing
- **And** the subtitle is visually subordinate (0.9rem, muted color)

### Requirement: Typography MUST be responsive and accessible
All typography MUST follow the modular scale (1.75rem → 0.78rem) with proper line heights (1.2-1.3 for headings, 1.5+ for body) and MUST maintain WCAG AAA contrast ratios.

#### Scenario: User resizes browser window
- **Given** any page is loaded at desktop size
- **When** the user resizes to mobile viewport
- **Then** headings with clamp() scale smoothly (e.g., `.post-title` from 1.9-2.4rem)
- **And** fixed-size elements remain readable (minimum 0.78rem for meta text)
- **And** line heights maintain comfortable reading (1.5+ for body, 1.2-1.3 for headings)

