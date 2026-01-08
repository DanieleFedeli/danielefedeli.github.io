# Proposal: Fix Typography Hierarchy

## Why
The site's typography hierarchy has inconsistencies that hurt readability: section headings are too small (barely larger than body text), blog card titles don't stand out, spacing between related elements is inconsistent, and blog post content lacks proper h1-h6 styling.

## What Changes
- Increase `.section-heading` (h1) from 1.15rem to 1.75rem for clear prominence
- Increase `.blog-card-title` (h3) from 1.02rem to 1.25rem
- Improve `.section-subtitle` from 0.85rem to 0.9rem for better hierarchy
- Fix spacing: date-to-title 0.75rem, section heading-to-subtitle 0.5rem
- Add `.prose h1` through `.prose h6` styles with proper sizing (1.75rem → 0.95rem) and margins
- Establish modular scale (1.25x ratio) across all typography

## Impact
- Affected specs: typography (new capability)
- Affected code: `static/css/style.css` only
- No template changes required
- No breaking changes
- Manual testing required on homepage, blog listing, and blog post pages
