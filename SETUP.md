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
# Forever Lotus - Setup Guide

## Local Development

This project now runs as a root-level Next.js application.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open: `http://localhost:3000`

## Production Validation

Run the production build before deployment:

```bash
npm run build
```

To preview the production app locally:

```bash
npm run start
```

## Vercel Deployment

Recommended deployment path:

1. Import the public repository: `https://github.com/aartisr/forever_lotus`
2. Let Vercel detect the framework as `Next.js`
3. Use the repository root as the project root
4. Leave the default install/build behavior in place

Current expected commands:

- Install: `npm install`
- Build: `next build`
- Dev: `next dev`

Optional environment variable:

- `NEXT_PUBLIC_SITE_URL=https://your-domain`

## Project Structure

```text
forever_lotus/
├── docs/
├── src/
│   ├── app/
│   └── components/
├── web/
│   └── README.md
├── package.json
├── vercel.json
├── README.md
├── PROJECT_MIGRATION_SUMMARY.md
├── LICENSE
└── SETUP.md
```

## Content And Attribution

- Public website attribution: `Subasri Dorairaj`
- Developer / repository steward: `aartisr`
- Public repository: `https://github.com/aartisr/forever_lotus`

## Legacy Notes

The `web/` directory is retained only as historical context from the original static-site version. It is not the deployment target for Vercel.

## Troubleshooting

If Vercel deployment fails, check:

1. The project root is the repository root, not `web/`
2. The framework preset is `Next.js`
3. Dependencies install successfully with `npm install`
4. The app builds locally with `npm run build`
