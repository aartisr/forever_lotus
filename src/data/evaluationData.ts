import { CategoryEvaluation, ImprovementDomain, RoadmapPhase } from '../types';

export const COMPOSITE_SCORES = {
  currentOverall: 5.66,
  targetOverall: 9.76,
  delta: 4.10,
  benchmark: 'NobelPrize.org & Carnegie Endowment Global Standard',
};

export const CATEGORY_EVALUATIONS: CategoryEvaluation[] = [
  {
    id: 'purpose',
    title: 'Completion of Purpose',
    subtitle: 'Manifestation of Moral Architecture, Vow Fidelity & Civilizational Weight',
    score: 6.2,
    targetScore: 9.8,
    benchmarkInstitution: 'Carnegie Endowment for International Peace & Nobel Peace Center',
    executiveSummary:
      'The philosophical foundation of Forever Lotus—bridging 4,000 years of Eastern wisdom with empirical prosocial science to anchor progress in human dignity—is of genuine Nobel cadre caliber. However, the digital realization currently operates as a declarative manifesto rather than a verifiable, operational institution. The stated vow to publish annual dignity metrics and build open learning systems must transition from intention to living proof.',
    currentStateAnalysis: [
      'The core philosophical premise is transcendent: shifting technological and civilizational progress from domination and extractive trade-offs to suffering reduction and dignity expansion.',
      'The 6 Operating Commitments articulate clear boundaries against vanity metrics and self-aggrandizement.',
      'The purpose currently terminates in static reading: there is no live evidence loop proving that initiatives are actively reducing suffering or expanding human agency.',
      'The 25+ peer-reviewed sources and Eastern canonical texts are referenced as an aggregate claim rather than an accessible, scholarly research apparatus.'
    ],
    nobelCadreGaps: [
      'Absence of an interactive "Dignity Observatory" with published, verifiable impact datasets.',
      'Lack of an open academic repository where scholars can peer-review the moral architecture.',
      'The firewall from self-promotion is stated, but the website lacks institutional governance disclosures (Advisory Council, Ethics Committee, Open Financials).'
    ],
    criticalVulnerabilities: [
      'Risk of being perceived by global grantmakers and academic bodies as philosophical idealism without empirical execution.',
      'Single-point narrative vulnerability: relies on textual assertions rather than third-party verified outcomes.'
    ],
    enduringStrengths: [
      'Profound originality in synthesizing Eastern non-transactional ethics with modern flourishing science.',
      'Uncompromising anti-vanity stance: rare refusal of commercial SaaS monetization and extractive attention capture.'
    ],
    subMetrics: [
      {
        id: 'p1',
        name: 'Moral & Doctrinal Clarity',
        currentScore: 8.5,
        targetScore: 10.0,
        currentObservations: 'The core vow (Reduce suffering, elevate dignity, reject domination) is crystalline and deeply inspiring.',
        nobelCadreBenchmark: 'Matches the clarity of the Universal Declaration of Human Rights and the Pugwash Conferences manifesto.',
        actionRequired: 'Preserve this unvarnished moral clarity as the anchor of every page header and institutional publication.'
      },
      {
        id: 'p2',
        name: 'Empirical Verification & Metrics',
        currentScore: 4.0,
        targetScore: 9.8,
        currentObservations: 'Commitment #1 pledges "Metrics of Dignity", but zero live metrics or verifiable indices currently exist on the site.',
        nobelCadreBenchmark: 'Stockholm International Peace Research Institute (SIPRI) and Pew Research open public data tables.',
        actionRequired: 'Launch the "Forever Lotus Dignity Index"—an open public dashboard tracking measurable suffering reduction across partner initiatives.'
      },
      {
        id: 'p3',
        name: 'Institutional Governance & Transparency',
        currentScore: 5.0,
        targetScore: 9.6,
        currentObservations: 'The firewall from self-promotion is stated, but organizational charters, advisory board bylaws, and funding sources are not transparently published.',
        nobelCadreBenchmark: 'Wellcome Trust and Nobel Foundation annual governance charters.',
        actionRequired: 'Introduce an open "Governance & Ethics Protocol" tab with clear institutional accountability structures.'
      }
    ],
    directActionItems: [
      'Build the "Global Dignity Observatory" as the primary proof-layer of the purpose.',
      'Provide downloadable, versioned Institutional Whitepapers with digital DOIs (Digital Object Identifiers).',
      'Create an Advisory Board & Academic Reviewer directory to establish peer-reviewed authority.'
    ]
  },
  {
    id: 'functionality',
    title: 'Functionality & Architecture',
    subtitle: 'Information Architecture, Citation Rigor, Search & Academic Utility',
    score: 5.4,
    targetScore: 9.6,
    benchmarkInstitution: 'Oxford Martin School & Stanford Encyclopedia of Philosophy (SEP)',
    executiveSummary:
      'The current site operates as a standard vertical-scroll brochure. A Nobel-cadre web institution requires a high-performance, academic-grade research engine: deep conceptual search, bidirectional cross-citation between Eastern texts and modern empirical research, downloadable structured citation metadata (BibTeX, RIS), and seamless offline scholarly utility.',
    currentStateAnalysis: [
      'Basic single-page layout with anchor navigation; lacks a scalable digital knowledge architecture.',
      'Zero search functionality: users cannot query specific concepts (e.g., "non-harm", "pratītyasamutpāda", "prosocial economics", "Tamil Sangam ethics").',
      'Citations are mentioned but not hyperlinked, bibliographically structured, or interactive.',
      'No structured API or open dataset for academic researchers and policy institutes.'
    ],
    nobelCadreGaps: [
      'No interactive canon graph linking the 4,000-year historical trajectory to modern studies.',
      'No persistent reading preferences (typography scaling, distraction-free reading, margin notes).',
      'Lacks offline-first PWA caching for researchers working in low-connectivity global regions.'
    ],
    criticalVulnerabilities: [
      'Scholars cannot cite specific paragraphs or doctrinal assertions with stable permalinks.',
      'Information is trapped in a linear feed rather than organized into thematic research dossiers.'
    ],
    enduringStrengths: [
      'Zero bloated third-party marketing trackers or intrusive advertising scripts.',
      'Fast initial paint time due to minimal code payload.'
    ],
    subMetrics: [
      {
        id: 'f1',
        name: 'Citation & Provenance Architecture',
        currentScore: 4.2,
        targetScore: 9.9,
        currentObservations: 'References to 25+ peer-reviewed papers are asserted in bulk without footnotes, DOI links, or margin citations.',
        nobelCadreBenchmark: 'Stanford Encyclopedia of Philosophy and Nature Reviews citation fidelity.',
        actionRequired: 'Implement academic margin notes (tufte-style footnotes) with interactive hover popovers and direct DOI resolution.'
      },
      {
        id: 'f2',
        name: 'Semantic Information Architecture',
        currentScore: 5.5,
        targetScore: 9.5,
        currentObservations: 'Content is grouped into general narrative blocks without clear classification, taxonomy, or breadcrumb hierarchy.',
        nobelCadreBenchmark: 'Max Planck Institute research taxonomy and Brookings Institution policy dossier organization.',
        actionRequired: 'Restructure into 3 core pillars: (1) The Moral Architecture, (2) The Scientific Canon, (3) The Living Observatory.'
      },
      {
        id: 'f3',
        name: 'Scholarly Search & Retrieval',
        currentScore: 3.0,
        targetScore: 9.4,
        currentObservations: 'Completely missing search, filtering by tradition, or semantic concept querying.',
        nobelCadreBenchmark: 'arXiv and JSTOR instant semantic keyword exploration.',
        actionRequired: 'Build an instant client-side semantic filter allowing instant exploration of concepts across traditions and papers.'
      }
    ],
    directActionItems: [
      'Implement an interactive Bidirectional Citation Engine linking Eastern aphorisms to empirical papers.',
      'Add stable fragment permalinks (`#vow-1`, `#commitment-integrity`) with one-click citation copying.',
      'Introduce an institutional search drawer with keyboard shortcuts (Cmd+K / Ctrl+K).'
    ]
  },
  {
    id: 'aesthetic',
    title: 'Aesthetic Design & Visual Nobility',
    subtitle: 'Typographic Hierarchy, Sacred Geometry, Gravitas & Anti-Slop Discipline',
    score: 5.8,
    targetScore: 9.9,
    benchmarkInstitution: 'NobelPrize.org & Museum of Modern Art (MoMA) Design Archives',
    executiveSummary:
      'The current visual aesthetic is respectable but generic, resembling contemporary boutique wellness or tech landing pages. A Nobel-cadre aesthetic demands profound visual restraint, architectural weight, mathematical typography scales (Major Third / Perfect Fourth), classical serifs paired with crisp monospaces, warm museum-grade neutrals, and sacred botanical geometry that transcends generic lotus clip-art.',
    currentStateAnalysis: [
      'Uses standard web sans-serif typography that lacks historical gravitas and academic authority.',
      'Color palette lacks the deep, warm, archival nuance of high-culture institutions (vellum, ink, vermilion, antique bronze).',
      'The visual motif of the lotus is at risk of cliché if not grounded in mathematical precision and biomimetic symbolism.',
      'Spacing is uniform and lacks dramatic editorial pacing (generous negative space alternating with dense scholarly tables).'
    ],
    nobelCadreGaps: [
      'Absence of an authoritative editorial typeface (such as Newsreader, Cinzel, or Feijoa) that confers civilizational weight.',
      'No deliberate typographic baseline grid or mathematical optical margins.',
      'Missing museum-quality visual artifacts (high-resolution manuscripts, architectural schematics, sacred geometry renders).'
    ],
    criticalVulnerabilities: [
      'Visual confusion: risks being mistaken for a commercial yoga/meditation studio or generic corporate ESG marketing page.',
      'Lacks the distinct graphic gravitas of a global prize-winning institution.'
    ],
    enduringStrengths: [
      'Clean baseline layout free of gaudy neon gradients, cheesy animations, or cheap stock photos.',
      'Inherent warmth and dignity in the thematic premise.'
    ],
    subMetrics: [
      {
        id: 'a1',
        name: 'Typographic Mastery & Hierarchy',
        currentScore: 5.2,
        targetScore: 9.9,
        currentObservations: 'Uniform sans-serif styling creates a modern tech feel rather than an intellectual treatise feel.',
        nobelCadreBenchmark: 'NobelPrize.org (custom serif display paired with rigorous grotesk/mono) and The Paris Review.',
        actionRequired: 'Adopt Newsreader 72pt optical display serifs for moral vows, Cinzel for institutional headings, and JetBrains Mono for metrics.'
      },
      {
        id: 'a2',
        name: 'Color Harmony & Material Nobility',
        currentScore: 6.0,
        targetScore: 9.8,
        currentObservations: 'Standard web neutrals lack tactile depth and warmth.',
        nobelCadreBenchmark: 'Fondation Cartier and Harvard Peabody Museum archival palettes.',
        actionRequired: 'Implement an archival palette: Vellum (#F9F8F5), Deep Sumi Ink (#1A1918), Antiquarian Bronze (#8C6D46), and Muted Saffron (#C97A2E).'
      },
      {
        id: 'a3',
        name: 'Symbolic & Sacred Geometry Execution',
        currentScore: 6.2,
        targetScore: 10.0,
        currentObservations: 'Lotus iconography must transcend decorative clip-art into profound sacred geometry and philosophical metaphor.',
        nobelCadreBenchmark: 'Ashoka Chakra precision, Leonardo da Vinci botanical proportion studies, and sacred Tibetan thangka geometry.',
        actionRequired: 'Commission or render a mathematically constructed vector lotus crest based on the Golden Ratio (phi) and 8-fold radial symmetry.'
      }
    ],
    directActionItems: [
      'Deploy the "Archival Vellum" design system with optical serif hierarchy and generous 80px+ editorial gutters.',
      'Replace all generic icon sets with bespoke, fine-line heraldic emblems for the Six Commitments.',
      'Implement a "Contemplative Reading Mode" with custom font sizing, line-height tuning, and sepia/e-paper toggles.'
    ]
  },
  {
    id: 'engagement',
    title: 'User Engagement & Intellectual Absorption',
    subtitle: 'Deep Contemplation, Scholarly Fellowship, Moral Agency & Non-Coercive UX',
    score: 5.0,
    targetScore: 9.5,
    benchmarkInstitution: 'Aeon / Psyche, Long Now Foundation & Pew Research Center',
    executiveSummary:
      'True Nobel-cadre engagement does not mean algorithmic "stickiness", popups, or gamified vanity badges. It means deep, quiet intellectual absorption, transformative moral reflection, and empowering scholars and practitioners to implement the framework. Currently, the site is purely monologue. It needs interactive moral contemplation pathways, open learning modules, and a global fellowship portal.',
    currentStateAnalysis: [
      'Single-direction communication: the visitor can only read, with no mechanism to reflect, query, or apply the commitments.',
      'Commitment #4 pledges "Open Learning Systems", but there are currently no downloadable curricula, syllabi, or audio treatises.',
      'No way for researchers, civil society leaders, or technologists to formally endorse or apply the "Firewall from Self-Promotion".',
      'Absence of an audio layer: Eastern philosophical traditions are fundamentally oral and contemplative.'
    ],
    nobelCadreGaps: [
      'No interactive "Moral Compass Simulator" or scenario evaluator demonstrating how Forever Lotus resolves modern ethical crises.',
      'No global practitioner network or scholar directory.',
      'Missing audio treatises (spoken word contemplation with resonant, dignified vocal cadence).'
    ],
    criticalVulnerabilities: [
      'High bounce rate among busy policymakers and scholars who need rapid interactive synthesis and practical policy toolkits.',
      'The "Kindness without transaction" vow risks remaining abstract without participatory case studies.'
    ],
    enduringStrengths: [
      'Respects user attention: zero aggressive cookie banners, newsletter exit-intent popups, or spammy chat widgets.',
      'High moral resonance that naturally commands respect from serious thinkers.'
    ],
    subMetrics: [
      {
        id: 'e1',
        name: 'Contemplative & Participatory Depth',
        currentScore: 4.8,
        targetScore: 9.6,
        currentObservations: 'Readers consume text passively without cognitive anchoring or active moral deliberation.',
        nobelCadreBenchmark: 'The Long Now Foundation Seminars and Harvard Justice with Michael Sandel interactive cases.',
        actionRequired: 'Build an interactive "Case Dilemma Explorer" showing how the 6 Commitments resolve AI ethics, environmental degradation, and resource extraction.'
      },
      {
        id: 'e2',
        name: 'Multimodal Contemplation (Audio & Visual)',
        currentScore: 4.0,
        targetScore: 9.4,
        currentObservations: 'Purely silent, text-heavy presentation without auditory or contemplative pacing.',
        nobelCadreBenchmark: 'Nobel Prize Conversations podcasts and On Being with Krista Tippett.',
        actionRequired: 'Embed an ambient, broadcast-quality audio player for the foundational treatise, narrated with contemplative dignity.'
      },
      {
        id: 'e3',
        name: 'Institutional Fellowship & Vow Accord',
        currentScore: 5.2,
        targetScore: 9.5,
        currentObservations: 'No formal pathway for scholars or organizations to adopt the "Firewall from Self-Promotion" or become research affiliates.',
        nobelCadreBenchmark: 'Club of Rome membership protocol and Pugwash Council accords.',
        actionRequired: 'Launch the "Forever Lotus Global Accord"—allowing ethical institutions to register their pledge to metrics of dignity.'
      }
    ],
    directActionItems: [
      'Introduce the "Open Learning Syllabus": downloadable course modules for universities and peace institutes.',
      'Add an interactive Moral Architecture Explorer mapping ancient concepts to modern ethical decisions.',
      'Launch the "Voice of Dignity" audio treatise with chapter bookmarks.'
    ]
  },
  {
    id: 'accessibility',
    title: 'Accessibility & Global Equity',
    subtitle: 'WCAG 2.2 AAA Compliance, Multi-Script Typography & Low-Bandwidth Parity',
    score: 5.9,
    targetScore: 10.0,
    benchmarkInstitution: 'W3C Web Accessibility Initiative & UK Government Digital Service (GDS)',
    executiveSummary:
      'Because Forever Lotus is a civilizational framework committed to "elevating dignity and reducing suffering", accessibility is not merely a technical compliance checkbox—it is a core moral imperative. To achieve Nobel-cadre status, the platform must achieve flawless WCAG 2.2 Level AAA compliance, seamless multi-script rendering (Tamil, Sanskrit, Mandarin, Arabic, Latin), and an ultra-lightweight mode for users in the Global South with constrained bandwidth.',
    currentStateAnalysis: [
      'Text contrast mostly meets baseline AA, but falls short of AAA 7:1 ratio on subtle secondary captions.',
      'Mono-lingual English interface, contradicting the stated commitment to "multilingual, culturally grounded learning systems".',
      'Eastern philosophical terms lack pronunciation guides, original script typography, and semantic ruby annotations.',
      'Missing dedicated keyboard accessibility focus rings and screen-reader landmark definitions.'
    ],
    nobelCadreGaps: [
      'Zero support for vernacular Eastern scripts (Devanagari, Tamil, Traditional Chinese) in which the 4,000-year wisdom was originally authored.',
      'No "Low-Bandwidth / Zero-Data Mode" enabling researchers in rural India, Africa, or Latin America to access the full canon on 2G connections.',
      'No native e-paper or high-contrast screen reader optimization.'
    ],
    criticalVulnerabilities: [
      'Moral dissonance: advocating universal dignity while excluding visually impaired and non-English speaking global populations.',
      'Risk of heavy bundle bloat degrading mobile performance in emerging economies.'
    ],
    enduringStrengths: [
      'Clean DOM tree with no obstructive third-party iframes or blocking scripts.',
      'Sensible font sizing that does not break upon 200% zoom.'
    ],
    subMetrics: [
      {
        id: 'acc1',
        name: 'WCAG 2.2 AAA Compliance',
        currentScore: 6.2,
        targetScore: 10.0,
        currentObservations: 'Meets most AA standards, but lacks strict 7:1 contrast on subdued text and lacks explicit focus management.',
        nobelCadreBenchmark: 'Gov.uk standard and W3C Web Accessibility Initiative showcase.',
        actionRequired: 'Enforce strict 7:1 minimum contrast across all states, custom visible focus rings, and skip-to-content links.'
      },
      {
        id: 'acc2',
        name: 'Polyglot & Multi-Script Typography',
        currentScore: 4.5,
        targetScore: 10.0,
        currentObservations: 'Entirely English-centric, despite drawing from 4,000 years of Asian civilizational thought.',
        nobelCadreBenchmark: 'UNESCO Digital Library and United Nations multi-language parity.',
        actionRequired: 'Implement native multi-script support: Sanskrit (Devanagari), Tamil (தமிழ்), Mandarin (漢字), and Arabic alongside English.'
      },
      {
        id: 'acc3',
        name: 'Bandwidth & Device Equity (Global South)',
        currentScore: 6.5,
        targetScore: 10.0,
        currentObservations: 'Modern web bundle is acceptable, but lacks an ultra-lightweight text-only fallback mode.',
        nobelCadreBenchmark: 'Wikipedia Zero and Project Gutenberg global low-latency footprint.',
        actionRequired: 'Provide a toggleable "Essential Reading / Ultra-Low Bandwidth" mode (<50KB payload) for rural and offline reading.'
      }
    ],
    directActionItems: [
      'Achieve certified WCAG 2.2 Level AAA compliance with comprehensive automated and manual screen-reader testing.',
      'Build a dynamic Script & Language Switcher with authentic Tamil, Sanskrit, and Chinese typographic rendering.',
      'Introduce an e-Ink / E-Paper high-contrast reading profile for neurodivergent and low-vision scholars.'
    ]
  }
];

export const IMPROVEMENT_DOMAINS: ImprovementDomain[] = [
  {
    id: 'ui_ux',
    title: 'UI/UX Architecture & Institutional Nobility',
    badge: 'Visual Dignity & Craft',
    leadParagraph:
      'To stand alongside the Nobel Foundation, Max Planck Society, and the Carnegie Endowment, Forever Lotus must eliminate all traces of generic SaaS or commercial wellness tropes. The user interface must feel like an illuminated civilizational manuscript rendered through modern high-performance typography and mathematical layout precision.',
    principles: [
      {
        title: 'The Anti-Slop Principle: Rejection of Commercial Cliché',
        description:
          'Eliminate floating cards, purple gradients, glassmorphism, and cartoonish 3D elements. Embrace crisp typographical baselines, authentic negative space, and museum-grade archival contrast.',
        nobelExample: 'NobelPrize.org uses high-contrast typography, unadorned photography, and timeless editorial spacing.'
      },
      {
        title: 'Mathematical Layout Geometry & Golden Proportions',
        description:
          'Base all container paddings, gutters, and font scales on harmonic step ratios (Major Third 1.25x or Perfect Fourth 1.33x). Every visual element must be mathematically anchored.',
        nobelExample: 'Tufte CSS and Swiss International Typographic Style (Müller-Brockmann grid discipline).'
      },
      {
        title: 'Sacred Biomimicry: The Lotus Crest',
        description:
          'Re-engineer the lotus motif from a decorative graphic into an authentic geometric seal: eight petals representing the noble commitments, rooted in mud yet unsoiled, rendered with 0.75pt technical hair-lines.',
        nobelExample: 'The Royal Society coat of arms and Ashoka Pillar emblems: timeless, vector-crisp heraldry.'
      }
    ],
    specifications: [
      {
        area: 'Typography Hierarchy',
        currentLimitation: 'Standard system sans-serif without optical scaling or editorial presence.',
        nobelCadreStandard: 'Newsreader 72pt (Optical Display Serif) for vows; Cinzel (Classical Roman Capitals) for headers; Plus Jakarta Sans for UI controls; JetBrains Mono for data.',
        codeOrDesignSpec: `h1.vow { font-family: 'Newsreader', serif; font-optical-sizing: auto; font-weight: 400; line-height: 1.15; letter-spacing: -0.02em; }`
      },
      {
        area: 'Color Architecture',
        currentLimitation: 'Monotonous modern grays and sterile whites with no material resonance.',
        nobelCadreStandard: 'Archival Vellum (#FAF8F5) background, Sumi Mineral Ink (#1A1918) for primary text, Antique Bronze (#8C6D46) for accents, and Vermilion Lacquer (#A83232) for crucial vow anchors.',
        codeOrDesignSpec: `--bg-vellum: #FAF8F5; --text-sumi: #1A1918; --accent-bronze: #8C6D46; --border-subtle: #E6E2D8;`
      },
      {
        area: 'Reading Ergonomics',
        currentLimitation: 'Text lines stretch too wide on desktop screens, causing eye fatigue.',
        nobelCadreStandard: 'Strict 65–75 character measure (max-w-3xl or 68ch) with 1.65 line-height and generous 96px top/bottom section breathing room.',
        codeOrDesignSpec: `article.prose { max-width: 68ch; line-height: 1.7; font-size: 1.125rem; }`
      }
    ]
  },
  {
    id: 'content_strategy',
    title: 'Content Strategy & Canon Architecture',
    badge: 'Academic & Moral Rigor',
    leadParagraph:
      'A Nobel-cadre website is judged first and foremost by the depth, rigor, and verifiability of its thought. Forever Lotus must transform from a declarative one-page manifesto into an authoritative research institution housing the dual-canon: 4,000 years of Eastern philosophical heritage cross-validated with contemporary empirical flourishing science.',
    principles: [
      {
        title: 'The Dual-Canon Apparatus: Ancient Roots + Modern Evidence',
        description:
          'Every ethical claim must be anchored in both canonical Eastern literature (e.g. Thirukkural, Nagarjuna, Laozi, Ashokan Rock Edicts) and peer-reviewed 21st-century science (Stanford Prosocial Lab, Harvard Flourishing Program, Lancet).',
        nobelExample: 'The Institute for Advanced Study (IAS) and Gifford Lectures: deep historical provenance backed by rigorous empirical scrutiny.'
      },
      {
        title: 'Verifiable Vow in Substance: The Living Observatory',
        description:
          'Commitment #1 ("Metrics of Dignity") must not be a promise; it must be an open, downloadable dataset tracking annual impact metrics, suffering mitigation indexes, and agency-expansion indices.',
        nobelExample: 'Pew Research Center and SIPRI: open-source data tables, methodology notes, and raw CSV/JSON downloads.'
      },
      {
        title: 'Non-Extractive Editorial Voice & Firewall Enforcement',
        description:
          'Tone must remain solemn, restrained, clear, and universally dignified. Never use tech buzzwords, promotional hyperbole, or self-serving accolades. The brand exists solely in service of the vow.',
        nobelExample: 'The Nobel Foundation citations and the International Red Cross (ICRC) humanitarian bulletins.'
      }
    ],
    specifications: [
      {
        area: 'Interactive Research Dossiers',
        currentLimitation: 'General claims made without direct access to the 25+ underlying papers.',
        nobelCadreStandard: 'Interactive Dossier Matrix allowing visitors to inspect each research paper, author, journal, key methodology, and direct ethical implication.',
        codeOrDesignSpec: `Interface CanonDossier { doi: string; title: string; authors: string[]; journal: string; ancientParallel: string; policyOutcome: string; }`
      },
      {
        area: 'Six Operating Commitments Architecture',
        currentLimitation: 'Bullet points with brief summary sentences.',
        nobelCadreStandard: 'Comprehensive doctrinal monographs for each commitment: Doctrinal Thesis, Sanskrit/Classical Maxim, Operational Boundary, Negative Boundary (what we refuse), and Verification Metric.',
        codeOrDesignSpec: `Structure: [1. Thesis] -> [2. Historical Root] -> [3. Modern Counterpart] -> [4. Red Line/Boundary] -> [5. Audit Metric]`
      },
      {
        area: 'Curricular Syllabus & Open Learning',
        currentLimitation: 'No accessible educational modules or teaching assets.',
        nobelCadreStandard: 'Downloadable 12-week open syllabus on "Civilizational Moral Architecture & Prosocial Creation" available in open PDF/ePub format under Creative Commons BY-NC-ND.',
        codeOrDesignSpec: `Published as open-access PDF monographs with standard Zenodo DOIs and ISBN cataloging.`
      }
    ]
  },
  {
    id: 'mobile_responsiveness',
    title: 'Mobile Ergonomics & Global Low-Bandwidth Parity',
    badge: 'Global South Equity',
    leadParagraph:
      'Over 70% of the world’s population accesses civilizational and humanitarian knowledge through mid-range mobile devices on intermittent cellular networks. A true Nobel-cadre platform must deliver instant, tactile, distraction-free reading on screens ranging from 320px to 4K displays, with an offline-first low-bandwidth mode.',
    principles: [
      {
        title: 'Thumb-Zone Editorial Navigation',
        description:
          'Place all secondary reading controls (font size, chapter jumps, citation popups) within the bottom thumb reach zone (bottom 35% of the screen) to prevent hand strain during extended reading.',
        nobelExample: 'Apple Books and Wikipedia Mobile Reader navigation paradigms.'
      },
      {
        title: 'Sub-100ms Initial Visual Response (Zero Layout Shift)',
        description:
          'Inline critical typography styles and use zero heavy client-side hydration for reading text. Achieve perfect Cumulative Layout Shift (CLS: 0.000) on all viewport resizes.',
        nobelExample: 'Gov.uk and Bear Blog: near-instantaneous rendering regardless of CPU throttling.'
      },
      {
        title: 'Off-Grid & Low-Data Mode (<50KB Payload)',
        description:
          'Provide a one-tap toggle for rural scholars in South Asia, Africa, and Latin America that strips decorative assets, preserving high-contrast text, citations, and formulas.',
        nobelExample: 'NPR Text-Only site and Wikipedia Zero initiative.'
      }
    ],
    specifications: [
      {
        area: 'Touch Target Discipline',
        currentLimitation: 'Standard links and buttons may be tight or awkward on small touchscreens.',
        nobelCadreStandard: 'All interactive elements (commitments, footnotes, language pills) have a minimum 48x48px touch target with generous 12px visual separation.',
        codeOrDesignSpec: `button, a.action { min-height: 48px; min-width: 48px; display: inline-flex; align-items: center; justify-content: center; }`
      },
      {
        area: 'Fluid Fluid-Clamp Typography',
        currentLimitation: 'Fixed pixel sizing leads to broken wrapping on compact mobile devices.',
        nobelCadreStandard: 'CSS clamp() formulas for responsive typography that smoothly adapts between 320px and 1440px viewports without jumpy media query breaks.',
        codeOrDesignSpec: `font-size: clamp(1.75rem, 4vw + 1rem, 3.25rem); /* Flawless header scale across every phone */`
      },
      {
        area: 'Offline Service Worker Cache',
        currentLimitation: 'Requires continuous internet access; leaves users with a blank screen if offline.',
        nobelCadreStandard: 'Service worker precaches the core moral manifesto and 25 research summaries for offline reading during transit or field work.',
        codeOrDesignSpec: `Workbox CacheFirst strategy for /canon and /manifesto documents with local indexedDB state.`
      }
    ]
  }
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phaseNumber: 1,
    title: 'Phase I: Moral Architecture & Institutional Foundation',
    theme: 'Establishing Typographic Nobility & Doctrinal Authority',
    timeframe: 'Weeks 1 – 4',
    corePhilosophy:
      'Laying the non-negotiable bedrock: transitioning visual identity to museum-grade typography, codifying the 6 Commitments into formal doctrinal monographs, and achieving certified WCAG 2.2 AAA accessibility.',
    milestones: [
      {
        week: 'Week 1-2',
        title: 'The Archival Design System & Sacred Crest Execution',
        deliverables: [
          'Commission/render mathematical Golden Ratio 8-petal vector crest.',
          'Implement Newsreader / Cinzel / Plus Jakarta Sans typographic hierarchy.',
          'Deploy Archival Vellum color tokens and eradicate all generic SaaS styles.'
        ],
        nobelStandardAchieved: 'Visual parity with NobelPrize.org and Max Planck digital archives.',
        kpi: 'Design audit score reaches 9.5/10; zero generic UI clichés.'
      },
      {
        week: 'Week 3-4',
        title: 'Doctrinal Monographs & WCAG 2.2 AAA Certification',
        deliverables: [
          'Author 1,500-word doctrinal monographs for each of the Six Operating Commitments.',
          'Implement Tufte-style margin footnotes and stable permalinks.',
          'Enforce 7:1 color contrast and full keyboard navigation with visible focus indicators.'
        ],
        nobelStandardAchieved: 'Compliance with United Nations digital publishing standards.',
        kpi: '100% Lighthouse Accessibility score; certified WCAG 2.2 AAA.'
      }
    ]
  },
  {
    phaseNumber: 2,
    title: 'Phase II: The Dual-Canon & Scholarly Apparatus',
    theme: 'Anchoring 4,000 Years of Wisdom in 21st-Century Empirical Science',
    timeframe: 'Weeks 5 – 8',
    corePhilosophy:
      'Transforming static assertions into a verifiable research engine. Cataloging the 25+ peer-reviewed papers and classical Eastern texts with bidirectional cross-referencing and DOI indexing.',
    milestones: [
      {
        week: 'Week 5-6',
        title: 'The 25-Source Research Repository & Citation Engine',
        deliverables: [
          'Curate the complete peer-reviewed catalog (Stanford, Harvard, Oxford, Lancet).',
          'Build interactive citation popovers with abstracts, key findings, and DOI links.',
          'Add one-click citation exports (BibTeX, APA, Chicago, RIS formats).'
        ],
        nobelStandardAchieved: 'Scholarly utility matching Stanford Encyclopedia of Philosophy.',
        kpi: 'All 25 sources peer-reviewed, indexed, and downloadable.'
      },
      {
        week: 'Week 7-8',
        title: 'Interactive Canon Graph & Philosophical Taxonomy',
        deliverables: [
          'Develop an interactive conceptual map linking Sangam Tamil, Buddhist, Vedantic, and Daoist concepts to modern prosocial models.',
          'Build client-side search with instant concept and tradition filtering.',
          'Publish downloadable PDF research dossiers for university use.'
        ],
        nobelStandardAchieved: 'Intellectual depth rivaling the Gifford Lectures archive.',
        kpi: 'Average dwell time on research dossiers exceeds 6 minutes.'
      }
    ]
  },
  {
    phaseNumber: 3,
    title: 'Phase III: The Living Dignity Observatory & Open Data',
    theme: 'Fulfilling Commitment #1: Metrics of Dignity over Vanity Metrics',
    timeframe: 'Weeks 9 – 12',
    corePhilosophy:
      'Building the world’s first open public dashboard tracking measurable human dignity and suffering reduction, proving that Forever Lotus is a living operational force.',
    milestones: [
      {
        week: 'Week 9-10',
        title: 'The Forever Lotus Dignity Index Dashboard',
        deliverables: [
          'Design interactive visualization of primary indicators: Suffering Reduction, Local Agency Expansion, and Non-Extractive Resource Flow.',
          'Publish open methodology whitepaper detailing calculation protocols.',
          'Provide raw public data downloads in JSON and CSV formats.'
        ],
        nobelStandardAchieved: 'Data transparency equal to the Stockholm Peace Research Institute (SIPRI).',
        kpi: 'Quarterly dignity audit published with public methodology notes.'
      },
      {
        week: 'Week 11-12',
        title: 'Institutional Firewall Protocol & Governance Charter',
        deliverables: [
          'Publish formal Advisory Council bylaws and ethics review board proceedings.',
          'Establish open ledger of financial non-extraction (zero commercial monetization).',
          'Implement third-party verification protocol for partner initiatives.'
        ],
        nobelStandardAchieved: 'Governance transparency matching the Wellcome Trust.',
        kpi: 'Public verification by independent academic audit committee.'
      }
    ]
  },
  {
    phaseNumber: 4,
    title: 'Phase IV: Polyglot Publishing & Global Fellowship',
    theme: 'Universal Inclusivity, Multilingual Parity & Civilizational Accord',
    timeframe: 'Weeks 13 – 16',
    corePhilosophy:
      'Releasing the platform to the global stage: full multi-script typographic parity for Asian languages, broadcast-grade audio treatises, and the launch of the Global Dignity Accord.',
    milestones: [
      {
        week: 'Week 13-14',
        title: 'Polyglot Typography & Global South Low-Data Mode',
        deliverables: [
          'Complete translations in Sanskrit (Devanagari), Tamil (தமிழ்), and Mandarin (漢字).',
          'Deploy native typographic ligature support for Eastern scripts.',
          'Release the <50KB "Zero-Bandwidth Mode" for intermittent global networks.'
        ],
        nobelStandardAchieved: 'Universal multilingual accessibility mirroring the UN Digital Library.',
        kpi: 'Full editorial parity across 4 language families; <50KB payload in low-data mode.'
      },
      {
        week: 'Week 15-16',
        title: 'Voice of Dignity Treatise & Global Accord Launch',
        deliverables: [
          'Master and embed the 24-minute foundational audio treatise with chapter tracking.',
          'Launch the "Forever Lotus Global Accord" portal for institutional signatories.',
          'Host inaugural digital symposium on Moral Architecture in Technology.'
        ],
        nobelStandardAchieved: 'Global civilizational convening power of the Nobel Peace Prize.',
        kpi: '50+ academic, civil, and technological signatories committed to the Firewall.'
      }
    ]
  }
];
