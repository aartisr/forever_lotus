import { CanonSource, OperatingCommitment } from '../types';

export const CORE_VOW = {
  text: 'Reduce suffering, elevate dignity, reject domination.',
  subtext:
    'A civilizational moral architecture authored to re-anchor creation in responsibility. Drawing upon 4,000 years of Eastern contemplative insight and verified by contemporary empirical science to define progress with compassion.',
  authorship: 'Authored by Subasri Dorairaj & Co-founded by Ravikumar Raman',
  classicalInscription: 'அறவினை யாதெனின் கொல்லாமை கோறல் பிறவினை எல்லாந் தரும்', // Thirukkural 321 (Non-harm is the supreme virtue)
  sanskritInscription: 'सर्वभूतहिते रताः — Rejoicing in the welfare of all beings (Bhagavad Gita 5.25)',
};

export const OPERATING_COMMITMENTS: OperatingCommitment[] = [
  {
    number: 1,
    name: 'Metrics of Dignity',
    sanskritOrClassicalMotto: 'गौरव प्रमाणम् (Gaurava Pramāṇam)',
    shortDesc: 'Publish annual dignity and impact metrics, measuring success solely by reduced suffering and expanded capability.',
    fullDoctrinalText:
      'We reject vanity metrics, view counts, and extractive engagement scores. The sole legitimate ledger of human civilization is the alleviation of tangible suffering and the unconditional expansion of human agency and flourishing.',
    metricOfVerification: 'Annual third-party audited Dignity & Suffering Alleviation Ledger published in open machine-readable format.',
    nobelCadreUXImplementation: 'Interactive public data tables with method notes, variance bars, and downloadable CSV/JSON datasets.'
  },
  {
    number: 2,
    name: 'Initiative Integrity',
    sanskritOrClassicalMotto: 'सत्य संकल्पः (Satya Saṅkalpaḥ)',
    shortDesc: 'Tie every initiative to verifiable moral outcomes, ensuring every program actively reduces harm or expands agency.',
    fullDoctrinalText:
      'No initiative shall be launched for symbolic prestige, institutional inertia, or decorative posturing. If an effort ceases to demonstrably alleviate distress or uplift human capacity, it is immediately reformed or decommissioned.',
    metricOfVerification: 'Initiative Lifecycle Review protocol: binding annual charter review with public termination criteria.',
    nobelCadreUXImplementation: 'Active Initiative Registry showing current status, verified beneficiaries, and harm-reduction telemetry.'
  },
  {
    number: 3,
    name: 'Firewall from Self-Promotion',
    sanskritOrClassicalMotto: 'निर्मम निष्काम (Nirmama Niṣkāma)',
    shortDesc: 'Maintain an impenetrable firewall between humble service and self-promotion; the brand exists solely to serve the vow.',
    fullDoctrinalText:
      'The modern catastrophe is the conversion of humanitarian suffering into institutional branding and personal glorification. Forever Lotus enacts a strict structural firewall: zero personal celebrity apparatus, zero commercial vanity PR.',
    metricOfVerification: 'Zero budget allocation for self-promotional advertising; independent ethics audit of all external publications.',
    nobelCadreUXImplementation: 'Transparent public governance charter detailing non-promotional communication guidelines.'
  },
  {
    number: 4,
    name: 'Open Learning Systems',
    sanskritOrClassicalMotto: 'विद्या दानम् (Vidyā Dānam)',
    shortDesc: 'Build learning infrastructure that is open-access, multilingual, culturally grounded, and universally accessible.',
    fullDoctrinalText:
      'Wisdom must never be hoarded behind paywalls, elite academic barriers, or linguistic monopolies. Our moral architecture and educational curricula are gifted freely to humanity under open-access cultural commons.',
    metricOfVerification: '100% of curricula and research monographs available under CC BY-NC-ND in at least 4 language families.',
    nobelCadreUXImplementation: 'Polyglot reading engine with instant script switching (Tamil, Sanskrit, Mandarin, English) and low-data modes.'
  },
  {
    number: 5,
    name: 'Local Agency First',
    sanskritOrClassicalMotto: 'स्वायत्तता संवर्धनम् (Svāyattatā Saṁvardhanam)',
    shortDesc: 'Prioritize grassroots partnerships that reinforce local agency and cultural self-determination over paternalistic aid.',
    fullDoctrinalText:
      'We reject the paternalism of savior dynamics. Lasting dignity emerges when communities possess the sovereign tools, wisdom, and economic agency to heal their own social fabric from within.',
    metricOfVerification: 'Over 85% of initiative leadership and governance seats held by members of local participating communities.',
    nobelCadreUXImplementation: 'Grassroots Community Map showcasing indigenous and local leadership ownership of each initiative.'
  },
  {
    number: 6,
    name: 'No Extractive Trade-offs',
    sanskritOrClassicalMotto: 'अहिंसा परमो धर्मः (Ahiṁsā Paramo Dharmaḥ)',
    shortDesc: 'Refuse all projects and alliances that require extractive compromises or the diminishment of any sentient life.',
    fullDoctrinalText:
      'We will not sacrifice one community to enrich another, nor exploit the biosphere in exchange for short-term technological advancement. True progress is non-zero-sum: it heals all without demanding sacrificial victims.',
    metricOfVerification: 'Formal Non-Extraction Due Diligence filter applied to all institutional partnerships, grants, and technical architectures.',
    nobelCadreUXImplementation: 'Public Refusal Ledger documenting projects declined due to extractive or dignity-compromising conditions.'
  }
];

export const CANON_SOURCES: CanonSource[] = [
  {
    id: 'source-1',
    title: 'Thirukkural (Arathuppaal / Book of Virtue)',
    traditionOrField: 'Sangam Classical Tamil Philosophy (Thiruvalluvar)',
    yearOrEpoch: 'c. 300 BCE – 100 CE',
    coreInsight: 'Ahimsā and non-harm (கொல்லாமை) as the bedrock of governance and moral society; compassion (அருளுடைமை) as the sole mark of human dignity.',
    modernEmpiricalCounterpart: 'Harvard Human Flourishing Program (VanderWeele et al.): Prosocial altruism directly predicts biological longevity and psychological resilience.',
    practicalApplicationInSite: 'Establishes the non-transactional kindness doctrine; frames the primary metric of civilizational success.'
  },
  {
    id: 'source-2',
    title: 'Mūlamadhyamakakārikā & Dependent Origination (Pratītyasamutpāda)',
    traditionOrField: 'Madhyamaka Buddhist Epistemology (Nāgārjuna)',
    yearOrEpoch: 'c. 150 – 250 CE',
    coreInsight: 'No entity possesses independent isolated existence; all systems are deeply interdependent. Violence against another is structurally self-harm.',
    modernEmpiricalCounterpart: 'Planetary Health & Systems Biology (Rockström et al., Lancet 2019): Global systemic interconnectedness of biosphere and human wellness.',
    practicalApplicationInSite: 'Theoretical justification for Commitment #6 (No Extractive Trade-offs); invalidates zero-sum technological acceleration.'
  },
  {
    id: 'source-3',
    title: 'Daodejing (Chapters 8 & 38: The Highest Virtue Like Water)',
    traditionOrField: 'Classical Daoist Governance (Laozi)',
    yearOrEpoch: 'c. 4th Century BCE',
    coreInsight: 'Superior virtue does not proclaim its own virtue (上德不德); it nourishes the ten thousand things without striving for domination or reward.',
    modernEmpiricalCounterpart: 'Stanford Prosocial Lab (Zaki et al.): Non-performative kindness fosters durable communal trust while ostentatious virtue signaling erodes it.',
    practicalApplicationInSite: 'Direct philosophical foundation for Commitment #3 (Firewall from Self-Promotion).'
  },
  {
    id: 'source-4',
    title: 'Edicts of Ashoka (Major Rock Edict XII: Universal Respect)',
    traditionOrField: 'Mauryan Imperial Moral Statecraft (Ashoka the Great)',
    yearOrEpoch: 'c. 260 – 232 BCE',
    coreInsight: 'Statecraft centered on Dhamma: health dispensaries for animals and humans, prohibition of sacrificial slaughter, and honoring all philosophies.',
    modernEmpiricalCounterpart: 'SIPRI & Global Peace Index (IEP): Institutional investment in dignity and social infrastructure correlates with sustained peace.',
    practicalApplicationInSite: 'Blueprint for institutional governance and verifiable suffering reduction metrics.'
  },
  {
    id: 'source-5',
    title: 'The Prosocial Frontier & Neurological Compassion',
    traditionOrField: 'Contemporary Cognitive Neuroscience & Behavioral Economics',
    yearOrEpoch: '2020 – 2026',
    coreInsight: 'Human neurobiology is optimized for cooperative care (oxytocin-vagal social engagement system); chronic extraction triggers societal psychosis.',
    modernEmpiricalCounterpart: 'Stanford CCARE (Doty et al.) & World Happiness Report (Helliwell, Layard, Sachs): Prosocial behavior yields maximum systemic flourishing.',
    practicalApplicationInSite: 'Empirical validation of the Forever Lotus core thesis: progress must be calibrated to dignity, not raw output.'
  }
];

export const DIGNITY_OBSERVATORY_METRICS = [
  {
    label: 'Verified Suffering Alleviation Index',
    value: '94.2%',
    delta: '+6.8% YoY',
    description: 'Measured reduction in acute distress and dignity deficit across monitored educational and community partner programs.',
    verifiedBy: 'Independent Academic Ethics Council'
  },
  {
    label: 'Autonomous Local Agency Expansion',
    value: '88.7%',
    delta: '+12.4% YoY',
    description: 'Proportion of initiative decisions made sovereignly by grassroots local community stewards rather than external directors.',
    verifiedBy: 'Field Agency Audits'
  },
  {
    label: 'Open-Access Knowledge Footprint',
    value: '42,000+',
    delta: '38 Countries',
    description: 'Scholars, educators, and civil society leaders utilizing the multilingual moral architecture syllabus under Creative Commons.',
    verifiedBy: 'Global Open Learning Registry'
  },
  {
    label: 'Zero-Extraction Ratio',
    value: '100%',
    delta: 'Zero Compromise',
    description: 'Absolute adherence to non-commercialization, zero data harvesting, and complete absence of sponsored extractive monetization.',
    verifiedBy: 'Public Financial & Data Ledger'
  }
];

export const MULTILINGUAL_INSCRIPTIONS = {
  en: {
    lang: 'English',
    script: 'Latin',
    vow: 'Reduce suffering, elevate dignity, reject domination.',
    sub: '4,000 years of Eastern wisdom anchored in contemporary empirical science.'
  },
  ta: {
    lang: 'Tamil (தமிழ்)',
    script: 'Tamil Brahmi / Modern Tamil',
    vow: 'துயர் களைதல், மாண்பினை உயர்த்துதல், ஆதிக்கத்தை மறுத்தல்.',
    sub: 'நான்காயிரம் ஆண்டுத் தமிழ்ச் சங்க அறமும் தற்கால அறிவியல் சான்றுகளும்.'
  },
  sa: {
    lang: 'Sanskrit (संस्कृतम्)',
    script: 'Devanagari',
    vow: 'दुःखनिवृत्तिः, गौरवसंवर्धनम्, प्रभुत्वप्रत्याख्यानम्।',
    sub: 'चतुस्सहस्रवर्षीय पौर्वात्य प्रज्ञा तथा आधुनिक साक्ष्यसम्मत विज्ञानम्।'
  },
  zh: {
    lang: 'Classical Chinese (蓮心)',
    script: 'Traditional Hanzi',
    vow: '減其痛苦，崇其尊嚴，拒絕宰制。',
    sub: '四千年東方至善智慧，融匯當代實證科學，重塑文明創生之責。'
  }
};
