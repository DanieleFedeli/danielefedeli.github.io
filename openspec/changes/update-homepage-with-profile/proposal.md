## Why
The current homepage has generic placeholder content. We want to personalize it with the site owner's name (Daniele Fedeli) and provide icon-based links to professional profiles (LinkedIn and GitHub) to establish professional identity and provide clean, recognizable ways for visitors to connect.

## What Changes
- Replace generic "Personal blog" kicker and placeholder title with personalized content featuring "Daniele Fedeli"
- Add social profile links (LinkedIn and GitHub) in the hero section using icon-based buttons instead of text URLs
- Integrate icon assets (SVG or icon font) for LinkedIn and GitHub
- Enhance the visual design to make the personal branding prominent and attractive
- Keep the existing blog post preview section intact

## Impact
- Affected specs: `homepage` (new capability)
- Affected code:
  - `templates/index.html` - hero section content and structure, social icon links
  - `static/css/style.css` - styles for icon-based social links and enhanced hero styling
  - Icon assets - inline SVG icons or icon font reference for LinkedIn and GitHub
  - `content/_index.md` - may update metadata
