# Forever Lotus Manifesto Evaluation Engine

**Version:** 1.0.0  
**Status:** Production Ready  
**Last Updated:** April 2026  

---

## Overview

The Forever Lotus Manifesto Evaluation Engine is a **generic, extensible system** for assessing websites and organizations against the Forever Lotus Manifesto principles. It is designed to be:

- **Compassionate** - Growth-focused evaluation, not judgment-focused
- **Generic** - Works for any website, organization, or platform
- **Actionable** - Produces specific, encouraging feedback
- **Transparent** - Clear criteria, scoring, and methodology
- **Extensible** - Easy to customize criteria and add new principles

---

## Architecture

### Components

#### 1. **Core Evaluator** (`src/lib/manifesto-evaluator.ts`)

The foundation of the system. Defines:

- **Seven Core Principles**
  1. **Compassion & Non-Domination** - Non-extractive, kind creation
  2. **Kindness Without Expectation** - Authentic, transactional compassion
  3. **Earth Consciousness & Stewardship** - Ecological responsibility
  4. **Humanitarian Dignity** - Empowerment over dependency
  5. **Education & Liberation** - Knowledge produces agency
  6. **Peace & Inner Harmony** - Clarity and respect in communication
  7. **Transparency & Agency** - Honest ownership, clear practices

- **21+ Evaluation Criteria** - Specific, measurable attributes under each principle
- **Scoring System** - Grades (excellent/good/fair/needs-improvement) → 0-100 scores
- **Data Models** - TypeScript interfaces for pages, criteria, results

**Key Functions:**

```typescript
// Initialize a blank evaluation
createBlankEvaluation(name, url) → WebsiteEvaluationResult

// Calculate scores at multiple levels
calculatePrincipleScore(criteria, principle) → number (0-100)
calculateOverallComplianceScore(principleScores) → number (0-100)

// Map generic submission checklist to evaluation results
mapChecklistToEvaluation(pages, scores) → SubmissionChecklistResult[]

// Finalize evaluation with insights and recommendations
finalizeEvaluation(evaluation) → WebsiteEvaluationResult (complete)
```

#### 2. **Evaluation Service** (`src/services/manifesto-evaluation-service.ts`)

Orchestrates the evaluation workflow:

```typescript
// Evaluate a website (currently demo mode, integrates with real engines)
ManifestoEvaluationService.evaluateWebsite(url, name?) → WebsiteEvaluationResult

// Generate sample evaluation for testing/demo
ManifestoEvaluationService.generateSampleEvaluation(name, url, alignment_level)
```

#### 3. **Beautiful Dashboard** (`src/components/EvaluationDashboard.tsx`)

**Features:**

- **Score Gauges** - Circular progress indicators for each principle
- **Overall Grade Display** - Letter grades (A+, A, B+, etc.) based on compliance score
- **Principle Cards** - 7 cards showing score, grade, and progress for each principle
- **Strengths & Opportunities** - Highlighted growth areas in encouraging language
- **Critical Next Steps** - Prioritized actions for improvement
- **Submission Checklist** - Maps evaluation results directly to onboarding criteria
- **Confidence Metrics** - Shows evaluation completeness and limitations
- **Multilingual** - English/Spanish support
- **Dark Mode Compatible** - Uses Forever Lotus theme colors

**Accessibility:**

- WCAG AA compliant
- Clear visual hierarchy
- Color + text labels (not color alone)
- Semantic HTML structure
- Responsive design (mobile-first)

#### 4. **Evaluation Page** (`src/app/evaluate/page.tsx`)

Interactive interface for users to:

1. Submit a website URL
2. Receive evaluation results
3. See manifesto alignment visually
4. Access onboarding pathway

---

## The Seven Principles & 21 Criteria

### 1. Compassion & Non-Domination (weight: 10)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Non-Extractive Language | 9 | Avoids manipulative, fear-based, or extractive messaging |
| Accessibility First | 8 | WCAG compliance, alt text, captions, inclusive design |
| Inclusive Design | 7 | Marginalized voices welcomed and centered |

### 2. Kindness Without Expectation (weight: 10)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Authentic Purpose | 9 | Clear organizational purpose, not jargon-filled |
| No Dark Patterns | 8 | Avoids addiction tactics, deceptive UX flows |
| One-Way Value | 7 | Provides value without extracting data or attention |

### 3. Earth Consciousness & Stewardship (weight: 8)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Environmental Statement | 8 | Acknowledges environmental responsibility |
| Sustainable Practices | 7 | Carbon-aware hosting, minimal tech bloat |
| Supply Chain Transparency | 6 | Communicates sourcing and supply chain ethics |

### 4. Humanitarian Dignity (weight: 10)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Empowerment, Not Dependency | 9 | Empowers users; avoids relief theater |
| Respect & Autonomy | 8 | Respects choice; clear opt-outs, no forced signup |
| Voice & Representation | 8 | Beneficiaries have voice in narrative and decisions |

### 5. Education & Liberation (weight: 8)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Knowledge Liberation | 9 | Expands agency; not just credential gatekeeping |
| Accessible Learning | 8 | Free/low-cost; multilingual where possible |
| Skill & Agency Growth | 8 | Produces skills and agency, not just information |

### 6. Peace & Inner Harmony (weight: 8)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Conflict-Aware Communication | 7 | Reduces polarization; acknowledges nuance |
| Transparency & Trust | 8 | Clear data practices, decision-making processes |
| Inner Practice | 6 | Calm, clear, unhurried communication tone |

### 7. Transparency & Agency (weight: 10)

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Clear Ownership | 9 | Leadership, ownership, and purpose clearly stated |
| Privacy & Data Policy | 9 | Clear policy; minimal collection; no deceptive tracking |
| Impact Metrics | 7 | Shares measurable impact, not vanity metrics |

---

## Scoring System

### Grade Conversion

| Grade | Score | Interpretation |
|-------|-------|-----------------|
| Excellent | 95 | Exemplary alignment; model for others |
| Good | 80 | Strong alignment; clear manifesto integration |
| Fair | 60 | Partial alignment; growth opportunities |
| Needs Improvement | 30 | Significant misalignment; concrete actions needed |
| Not Assessed | 0 | Insufficient data |

### Overall Compliance Status

| Score | Status | Color |
|-------|--------|-------|
| 80+ | Compliant | Green (#10b981) |
| 60-79 | Mostly Compliant | Blue (#3b82f6) |
| 1-59 | Needs Work | Amber (#f59e0b) |
| 0 | Not Assessed | Gray (#9ca3af) |

### Letter Grades (A+ to D)

Used for quick visual communication:

```
90+  = A+
85+  = A
80+  = B+
75+  = B
70+  = C+
60+  = C
<60  = D
```

---

## Data Model

### WebsiteEvaluationResult

```typescript
interface WebsiteEvaluationResult {
  website_name: string;                    // Organization/site name
  website_url: string;                     // Full URL evaluated
  evaluation_date: string;                 // ISO 8601 timestamp
  overall_compliance_score: number;        // 0-100, weighted average
  total_pages_evaluated: number;           // Number of pages assessed
  pages: PageEvaluation[];                 // Array of page-level results
  principle_scores: Record<...>;           // Score for each of 7 principles
  summary: {
    strengths: string[];                   // Top 2-3 alignment areas
    opportunities: string[];               // Top 2-3 growth areas
    critical_actions: string[];            // Prioritized next steps
    compliance_status: string;             // compliant/mostly/needs-work/not-assessed
  };
  submission_checklist_mapping: SubmissionChecklistResult[]; // Maps to onboarding criteria
  evaluation_metadata: {
    evaluator_version: string;
    methodology: string;
    confidence_level: number;              // 0-100
    limitations: string[];                 // What wasn't assessed
  };
}
```

### PageEvaluation

```typescript
interface PageEvaluation {
  url: string;
  title: string;
  pageType: 'homepage' | 'content' | 'resources' | 'contact' | 'other';
  timestamp: string;
  overall_score: number;                   // 0-100
  criteria: CriteriaMeasurement[];        // 21+ scored criteria
  passed_criteria: number;
  total_criteria: number;
  impact_summary: string;
  next_steps: string[];
  links: {
    total: number;
    internal: number;
    external: number;
    broken: number;
  };
}
```

### SubmissionChecklistResult

```typescript
interface SubmissionChecklistResult {
  field: string;                      // Checklist field (from onboarding)
  status: 'met' | 'partial' | 'unmet' | 'not-applicable';
  evidence: string;                   // What evaluation found
  recommendations: string[];          // How to improve
}
```

---

## Integration Guide

### Step 1: Extend Criteria (Optional)

Add domain-specific criteria:

```typescript
// In MANIFESTO_CRITERIA
'healthcare': [
  {
    id: 'health-001',
    principle: 'humanitarian-dignity',
    name: 'Patient Agency',
    description: 'Patients have voice in treatment decisions',
    grade: 'not-assessed',
    score: 0,
    evidence: [],
    recommendations: [],
    weight: 9,
  },
  // ... more healthcare-specific criteria
]
```

### Step 2: Implement Real Assessment Engine

Replace the demo `generateSampleEvaluation` with real content analysis:

```typescript
// src/services/manifesto-evaluation-service.ts

static async evaluateWebsite(website_url: string): Promise<WebsiteEvaluationResult> {
  // 1. Fetch and parse website content
  const pages = await crawlWebsite(website_url);
  
  // 2. Analyze each page against criteria
  const evaluations = await Promise.all(
    pages.map(page => assessPage(page))
  );
  
  // 3. Aggregate results
  const result = createBlankEvaluation(...);
  result.pages = evaluations;
  
  // 4. Finalize scoring and recommendations
  return finalizeEvaluation(result);
}
```

### Step 3: Connect to Dashboard

The dashboard automatically renders any valid `WebsiteEvaluationResult`:

```typescript
// In any page
import EvaluationDashboard from '@/components/EvaluationDashboard';

export default function Page() {
  const result = await getEvaluation();
  return <EvaluationDashboard evaluation={result} locale="en" />;
}
```

---

## Usage Examples

### Example 1: Evaluate a Website

```typescript
import { ManifestoEvaluationService } from '@/services/manifesto-evaluation-service';

const result = await ManifestoEvaluationService.evaluateWebsite(
  'https://example.org',
  'Example Organization'
);

console.log(result.overall_compliance_score); // 78
console.log(result.summary.compliance_status); // 'mostly-compliant'
```

### Example 2: Get Submission Checklist Status

```typescript
const result = await ManifestoEvaluationService.evaluateWebsite(url);

// Automatically generated in finalizeEvaluation()
result.submission_checklist_mapping.forEach(item => {
  console.log(`${item.field}: ${item.status}`);
  if (item.recommendations.length) {
    console.log('  Recommendations:', item.recommendations);
  }
});
```

### Example 3: Render Dashboard

```typescript
import EvaluationDashboard from '@/components/EvaluationDashboard';

<EvaluationDashboard 
  evaluation={result} 
  locale="en"
/>

// Automatically includes:
// - Score gauges
// - Principle cards
// - Strengths & opportunities
// - Next steps
// - Checklist mapping
// - Metadata
```

---

## Customization

### Change a Principle Weight

Principle weights affect overall score. Higher weight = more important:

```typescript
// In calculateOverallComplianceScore()
const principleWeights: Record<ManifestoPrinciple, number> = {
  compassion: 10,              // Most important
  kindness: 10,
  transparency: 10,
  'humanitarian-dignity': 10,
  'earth-consciousness': 8,    // Less weight
  education: 8,
  'peace-harmony': 8,
};
```

### Add New Criteria

```typescript
MANIFESTO_CRITERIA['transparency'].push({
  id: 'trans-004',
  principle: 'transparency',
  name: 'Open Source Code',
  description: 'Source code is publicly available for review',
  grade: 'not-assessed',
  score: 0,
  evidence: [],
  recommendations: [],
  weight: 7,
});
```

### Customize Dashboard Appearance

Edit [EvaluationDashboard.tsx](src/components/EvaluationDashboard.tsx):

```typescript
// Change colors
const getScoreColor = (score: number) => {
  if (score >= 85) return '#your-color';
  // ...
};

// Modify layout
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  {/* Change column count */}
</div>
```

---

## API Reference

### `createBlankEvaluation(website_name, website_url)`

**Returns:** `WebsiteEvaluationResult` with all fields initialized to 0/empty

### `calculatePrincipleScore(criteria, principle)`

**Parameters:**
- `criteria: CriteriaMeasurement[]` - All evaluated criteria
- `principle: ManifestoPrinciple` - Which principle to score

**Returns:** `number` (0-100), weighted average of matching criteria

### `calculateOverallComplianceScore(principleScores)`

**Parameters:**
- `principleScores: Record<ManifestoPrinciple, number>` - Scores for each principle

**Returns:** `number` (0-100), weighted average of all principles

### `mapChecklistToEvaluation(pages, principleScores)`

**Returns:** `SubmissionChecklistResult[]` - Maps evaluation to onboarding criteria

### `finalizeEvaluation(evaluation)`

**Returns:** `WebsiteEvaluationResult` (complete) with all scores, insights, and recommendations

### `getComplianceStatus(score)`

**Returns:** `'compliant' | 'mostly-compliant' | 'needs-work' | 'not-assessed'`

---

## Philosophy

### Why 7 Principles?

The seven principles directly derive from the Forever Lotus Manifesto:

1. **Compassion** - Core operating principle
2. **Kindness** - Transactional authenticity
3. **Earth Consciousness** - Stewardship commitment
4. **Dignity** - Humanitarian core
5. **Education** - Liberation through knowledge
6. **Peace** - Interior and exterior harmony
7. **Transparency** - Agency and trust

### Why 21 Criteria?

3 measurable criteria per principle = 21 total. This provides:

- **Breadth** - Multiple dimensions of each principle
- **Specificity** - Concrete, observable behaviors
- **Clarity** - Not Too many (overwhelming assessment), not too few (loses nuance)

### Scoring Philosophy

- **Weighted** - Important criteria weighted more heavily
- **Encouraging** - "Needs Improvement" focuses on next steps, not failure
- **Transparent** - Every score has evidence and recommendations
- **Adaptive** - Confidence level reflects assessment completeness

---

## Deployment

### On Vercel

The evaluation system is fully compatible with Vercel:

```bash
# Works out of the box
vercel deploy
```

Rendering modes:
- `/evaluate` - Static pre-rendered form + client-side results
- Dashboard - Client-side rendering from evaluation data

### Self-Hosted

Standard Next.js deployment:

```bash
npm run build
NODE_ENV=production npm start
```

---

## Limitations & Future Enhancements

### Current Limitations

1. **Demo Mode** - `ManifestoEvaluationService` generates sample data
2. **No Real Crawling** - Doesn't actually fetch and parse websites yet
3. **English/Spanish Only** - Can extend to more languages
4. **No Historical Tracking** - Doesn't save evaluation history
5. **Manual Entry** - Requires user to submit URL

### Planned Enhancements

1. **Real Assessment Engine** - Integrate with content analysis APIs
2. **Automated Crawling** - Fetch and analyze all pages on website
3. **Historical Tracking** - Store evaluations, show progress over time
4. **Org Dashboard** - Organizations claim and track their own evaluations
5. **Batch Evaluation** - Evaluate multiple websites at once
6. **API Endpoint** - `POST /api/evaluate` for programmatic access
7. **Custom Criteria** - Orgs create domain-specific criteria
8. **Peer Review** - Community review and feedback integration
9. **Certification** - "Forever Lotus Certified" badge program
10. **Multi-Language** - Full localization for global use

---

## Support & Contribution

### Questions?

- See [Forever Lotus Manifesto](docs/MANIFESTO.md)
- Review [Onboarding Criteria](src/app/onboarding-websites/page.tsx)
- Check [Evaluation Examples](src/services/manifesto-evaluation-service.ts)

### Want to Extend?

1. Fork the repository
2. Add new criteria or principles
3. Customize dashboard appearance
4. Integrate real assessment engine
5. Submit PR with tests and docs

---

## Technical Stack

- **Language:** TypeScript
- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, Tailwind CSS
- **Dates:** ISO 8601
- **Deployment:** Vercel-ready
- **License:** Forever Lotus terms

---

## Changelog

### v1.0.0 (April 2026)

- Initial release
- 7 principles, 21 criteria
- Beautiful dashboard component
- Evaluation service (demo mode)
- Submission checklist mapping
- Multilingual support (EN/ES)
- Full documentation

---

**Forever Lotus Manifesto Evaluation Engine**  
_Compassionate assessment for conscious creation._
