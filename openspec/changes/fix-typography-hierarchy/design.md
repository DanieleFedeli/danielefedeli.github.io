# Design: Typography Hierarchy System

## Design Principles

### Visual Weight Distribution
1. **Primary headings (h1)**: Most prominent, guide main page sections
2. **Secondary headings (h2)**: Sub-sections within content
3. **Tertiary headings (h3)**: Card titles and minor sections
4. **Body text**: Comfortable reading size (1rem base)
5. **Meta text**: Supportive info, de-emphasized (0.75-0.78rem)

### Spacing Philosophy
- **Proximity principle**: Related elements closer together
- **Breathing room**: Unrelated elements get more space
- **Rhythm**: Consistent spacing patterns create flow

## Typography Scale

### Size Ratios
Using a modular scale with ~1.25x ratio:
```
h1:       1.75rem  (28px @ 16px base)
h2:       1.5rem   (24px)
h3:       1.25rem  (20px)
h4:       1.1rem   (17.6px)
h5:       1rem     (16px)
h6:       0.95rem  (15.2px)
body:     1rem     (16px)
subtitle: 0.9rem   (14.4px)
meta:     0.78rem  (12.5px)
```

### Line Heights
- **Headings**: 1.2-1.3 (tighter for impact)
- **Body**: 1.5-1.6 (comfortable reading)
- **Meta**: 1.4 (compact but readable)

### Spacing Standards
```
Back link → Date:     1.5rem  (visual separation)
Date → Title:         0.75rem (related but distinct)
Title → Content:      1rem    (content begins)
Section heading → Subtitle: 0.5rem (tightly coupled)
Prose heading top:    1.5-2rem (breathing room)
Prose heading bottom: 0.75-1rem (lead into content)
```

## Implementation Notes

### Clamp Usage
Keep existing clamp() for responsive scaling:
- `.post-title`: Already has good clamp (1.9-2.4rem)
- `.hero-title`: Already has good clamp (2.1-2.6rem)
- Fixed sizes for smaller elements (less than 1.5rem)

### Dark Theme Considerations
- Headings use `--fg` (white/off-white) for maximum contrast
- Subtitles use `--muted` (gray) for hierarchy
- Meta text uses `--muted` with uppercase + letter-spacing

### Accessibility
- Clear hierarchy benefits screen readers (semantic h1-h6)
- Sufficient size differentiation (WCAG AAA: 18pt+ for large text)
- Line height ensures readability (1.5+ for body)

## Trade-offs

### Considered but Rejected
1. **Larger h1 (2.5rem+)**: Too aggressive for minimal design
2. **Tight spacing throughout (<0.5rem)**: Cramped, hard to scan
3. **Loose spacing throughout (>1rem)**: Disconnected, loses grouping
4. **Weight variations (300-900)**: Font only has 400/600, keep simple

### Chosen Approach
- **Moderate sizes**: Balance prominence with elegance
- **Contextual spacing**: Vary by relationship (0.5-1.5rem range)
- **Consistent patterns**: Same spacing for same relationships
- **Single font weight for headings**: Bold (600) for all, simple and clean
