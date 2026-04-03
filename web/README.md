# Forever Lotus Web

Standalone website for Forever Lotus, built with zero dependencies.

## Run Locally

```bash
# Python 3
python -m http.server 8000 --directory .

# Then open: http://localhost:8000
```

Or open `index.html` directly in a browser.

## Files

- `index.html`: Full narrative page with 14 sections
- `assets/styles.css`: Complete visual system
- `assets/fonts.css` (if using custom fonts—currently using Google Fonts)

## Content

All 15 core Forever Lotus themes are represented:
1. Meaning of Forever Lotus
2. Lotus Across Civilization
3. Brahma and Conscious Creation
4. Kindness Without Expectation
5. Earth Consciousness
6. Humanitarian Dignity
7. Education as Liberation
8. Peace and Inner Harmony
9. A Brand That Serves Humanity
10. Invitation to Co-Create
11. Strategic Positioning and Global Credibility
12. Public Credibility and Moral Lineage
13. Founder's White Paper Position
14. Stewardship and Continuity
15. The Standard (closing vision)

## Design

- **Responsive**: Works on mobile, tablet, desktop
- **Accessible**: Semantic HTML, WCAG-friendly contrast
- **Performance**: Single HTML file + 1 CSS file, ~60KB total
- **Animation**: CSS + Intersection Observer for scroll reveals
- **Typography**: Google Fonts (Fraunces + Work Sans)

## Deployment

Deploy to any static hosting:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront
- Any web server

No build step or server required.
