# Forever Lotus — Project Setup

Author: Subasri Dorairaj

## Quick Start

1. **View the Website**
   ```bash
   cd web
   python -m http.server 8000
   # Open http://localhost:8000
   ```

2. **Read the Docs**
   - Start: `docs/MANIFESTO.md`
   - Research: `docs/RESEARCH_DOSSIER.md`
   - Strategic: `docs/BENCHMARK.md`
   - References: `docs/EASTERN_REFERENCES.md`

## Project Contents

- **`docs/`** — Research, manifesto, benchmarks, and citations
- **`web/`** — Standalone website (HTML + CSS, no dependencies)
- **`package.json`** — Project metadata
- **`README.md`** — Full documentation

## Key Files

| File | Purpose |
|------|---------|
| docs/MANIFESTO.md | 15-section philosophical framework |
| docs/RESEARCH_DOSSIER.md | 25+ peer-reviewed sources, authenticity guardrails |
| docs/BENCHMARK.md | 25 comparable websites, learning points |
| docs/EASTERN_REFERENCES.md | Eastern universities, primary texts, citation protocol |
| web/index.html | Interactive 14-section website |
| web/assets/styles.css | Complete visual system |

## Deployment

### Static Hosting (Recommended)
```bash
# Vercel
vercel deploy

# Netlify
netlify deploy --prod --dir web

# GitHub Pages
git push origin main  # (if set up)
```

### Local Development
```bash
cd web
python -m http.server 8000
# Visit http://localhost:8000
```

## Visual Identity

- **Color**: Warm palette (#f4efe6, #1f2a2a, #0f766e, #b45309)
- **Typography**: Fraunces (serif headings) + Work Sans (body)
- **Motion**: Scroll-triggered card reveals (Intersection Observer)
- **Aesthetic**: Calm authority, contemplative, premium

## Author & Attribution

**Subasri Dorairaj** — Concept, research, and all content.

All sources are peer-reviewed (DOI-indexed) or university-hosted. See `RESEARCH_DOSSIER.md` for full citations.

## About Forever Lotus

Forever Lotus is a call to conscious creation in an age of unprecedented power and fragility. It draws from:
- Buddhist philosophy (lotus symbolism, compassion)
- Hindu cosmology (Brahma, creation as responsibility)
- Humanitarian practice (dignity, agency, stewardship)
- Contemporary wellbeing science (peace, flourishing, prosocial behavior)
- Ancient wisdom integrated with modern moral clarity

**Operating principle:** Kindness, rigor, and respect for life.

---

*Rooted. Rising. Untainted.*
