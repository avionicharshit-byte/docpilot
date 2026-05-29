// All proposal copy lives here so sections stay scannable and data-driven.
// Source of truth: DocPilot_Build_Brief.md (§3–§11).

export const NAV = [
  { id: 'overview', label: 'Overview', group: 'Proposal' },
  { id: 'research', label: 'Research', group: 'Proposal' },
  { id: 'field', label: 'Field Research', group: 'Proposal' },
  { id: 'problem', label: 'Problem', group: 'Proposal' },
  { id: 'solution', label: 'Solution', group: 'Proposal' },
  { id: 'demo', label: 'Live Demo', group: 'Product' },
  { id: 'impact', label: 'Impact & GTM', group: 'Proposal' },
]

export const LOAN_LIFECYCLE = [
  { label: 'Dealer Lead', icon: 'Car' },
  { label: 'Eligibility Check', icon: 'ScanLine' },
  { label: 'Document Collection', icon: 'FileStack', chokepoint: true },
  { label: 'Verification (AA)', icon: 'ShieldCheck' },
  { label: 'Underwriting', icon: 'Calculator' },
  { label: 'Scheme Approval', icon: 'BadgeCheck' },
  { label: 'Disbursal', icon: 'Banknote' },
  { label: 'Repayment', icon: 'RefreshCw' },
]

export const VERIFIED_FACTS = [
  {
    title: 'Account Aggregator (AA)',
    body: 'RBI-regulated, consent-based. After an OTP consent, the AA fetches financial data (bank statements, etc.) and passes it to the lender, encrypted. The AA cannot store or read it — it only executes the consented transfer.',
    tag: 'Regulation',
  },
  {
    title: 'Anumati / Perfios',
    body: 'Anumati is the AA brand owned by Perfios (NBFC-AA, RBI-licensed since Sept 2021). Perfios also provides Indian KYC/doc-extraction (via Karza) — one vendor family for both doc-reading and the AA handoff.',
    tag: 'Vendor',
  },
  {
    title: 'Documents by profile',
    body: 'Salaried: PAN, Aadhaar, address proof, photo, 3-mo salary slips, Form 16/ITR, bank statements. Self-employed: + 2-yr ITR, business proof & GST. Asset-backed: vehicle RC + dealer proforma invoice.',
    tag: 'KYC + Income',
  },
  {
    title: 'Address & fraud controls',
    body: 'A utility/electricity bill (≤3 months old) is accepted as address proof and a fraud control — especially when physical verification is impractical (home 50–100+ km away).',
    tag: 'Compliance',
  },
  {
    title: 'CIBIL ~750+',
    body: 'The informal bar before credit-team review. Lenders also cross-check name consistency across documents — even "Ramesh Kumar" vs "R. Kumar" can be flagged.',
    tag: 'Credit',
  },
  {
    title: 'RBI 2025 + DPDP 2023',
    body: 'RBI Digital Lending Directions (2025) and the DPDP Act (2023): borrower data must be stored in India, collected on a consent-based, minimal basis.',
    tag: 'Data law',
  },
]

export const FIELD_WORKFLOW = [
  { step: 'Dealer sends lead', detail: 'Of ~20–30 walk-ins, the dealer passes ~5–10 with good CIBIL (name, phone, DOB, Aadhaar, PAN).', pain: false },
  { step: 'Officer calls customer', detail: 'Asks for photo, salary slip, ITR, GST over WhatsApp.', pain: false },
  { step: 'Docs arrive piecemeal', detail: 'Customer sends documents one by one across hours or days.', pain: true },
  { step: 'Wait · chase · download · type', detail: 'Officer waits, chases, manually downloads & types each doc into Salesforce, eyeballing for errors.', pain: true },
  { step: 'Anumati OTP call', detail: 'Officer calls for the OTP → Salesforce auto-builds the profile (Aadhaar, PAN, CIBIL, bounces, avg balance + Excel report).', pain: false },
  { step: 'Electricity bill check', detail: 'Sometimes asks for a utility bill to verify the house exists (esp. for far-away homes).', pain: true },
  { step: 'Credit team → scheme → disbursal', detail: 'If CIBIL is good → credit irregularity check → loan scheme doc → on approval, disbursal in 30 min–1 hr.', pain: false },
]

export const FIELD_INSIGHTS = [
  {
    icon: 'Gauge',
    title: 'Throughput is capped at ~4–5/day',
    body: 'He handles only 4–5 customers a day — the collect-chase-verify-enter loop is fragmented and manual.',
    tone: 'danger',
  },
  {
    icon: 'Sparkles',
    title: '"What would help me" = DocPilot',
    body: 'In his words: (1) make doc-upload faster/automated, (2) auto-tell the customer what is wrong or missing without human interaction. DocPilot is literally what he asked for.',
    tone: 'brand',
  },
  {
    icon: 'TrendingDown',
    title: 'Drop-off is at PRICING, not docs',
    body: '2–3 of 10 customers ghost after seeing the loan scheme (rate/EMI). So DocPilot targets officer TIME & speed — not pricing drop-off.',
    tone: 'neutral',
  },
  {
    icon: 'Clock',
    title: 'The OTP / SBI trick',
    body: 'Anumati OTP sometimes fails (esp. SBI, server load). His workaround: call customers 8–9am or 8–9pm when load is low.',
    tone: 'neutral',
  },
]

export const SCOPE = [
  {
    kind: 'owns',
    title: 'DocPilot OWNS',
    body: 'The KYC + income doc layer that is manual today — photo, PAN, Aadhaar, salary slip, ITR, GST, address proof — collected via WhatsApp and typed into the CRM by hand.',
  },
  {
    kind: 'not',
    title: 'Does NOT rebuild Anumati',
    body: 'The Account Aggregator already auto-pulls bank/financial data after the OTP. DocPilot sits upstream, prepares a clean file, then triggers the existing AA handoff.',
  },
  {
    kind: 'not',
    title: 'Does NOT touch pricing',
    body: 'Pricing/EMI is where drop-off happens, but it is out of scope — mentioned only as a future v2.',
  },
]

export const BEFORE_STEPS = [
  'Officer calls, requests docs on WhatsApp',
  'Customer sends piecemeal — over hours/days',
  'Officer waits & chases',
  'Manually downloads & types each into CRM',
  'Eyeballs every doc for errors',
  'Triggers Anumati OTP → AA profile → CIBIL → credit',
]

export const AFTER_STEPS = [
  { t: 'Lead lands', d: 'Superleap auto-creates the application; DocPilot builds the exact checklist (loan type + salaried/self-employed).' },
  { t: 'Auto-request', d: 'DocPilot sends a personalized WhatsApp asking for the precise docs.' },
  { t: 'Ingest piecemeal', d: 'Customer replies on WhatsApp; DocPilot ingests each doc as it arrives.' },
  { t: 'Auto-read + auto-fill', d: 'Reads each doc and populates the CRM fields automatically — no manual typing.' },
  { t: 'Instant validation', d: 'Right type? legible? expired? name/DOB consistent? If not, DocPilot replies to the customer itself — zero officer involvement.' },
  { t: 'Handoff when clean', d: '"File ready — trigger Anumati OTP. SBI load lowest 8–9am." The human makes the OTP call.' },
]

export const PRIVACY = [
  { icon: 'Lock', title: 'No-training / zero-retention LLMs', body: 'Enterprise LLM APIs that contractually do not store or train on customer data. Data passes through, is processed, never retained.' },
  { icon: 'MapPin', title: 'Data stays in India', body: 'Processing + storage on India-resident infra (RBI 2025 Directions + DPDP Act 2023).' },
  { icon: 'CheckCircle2', title: 'Consent-first', body: 'Customer explicitly consents to AI processing — mirrors how Anumati works.' },
  { icon: 'Minimize2', title: 'Data minimization', body: 'Extract only the fields the loan actually needs.' },
  { icon: 'UserCheck', title: 'Human-in-the-loop', body: 'AI never auto-rejects. Risky items (name mismatch, suspected tampering) are flagged to the officer.' },
  { icon: 'ScrollText', title: 'Full audit trail', body: 'Every read, message, and field-write is logged.' },
]

export const TECH_STACK = [
  { name: 'WhatsApp Business API (Meta)', role: 'Customer channel.' },
  { name: 'Vision LLM + OCR', role: 'Reads Indian KYC/income docs (GPT-4o / Claude / Gemini, or Document AI / Textract / Signzy / HyperVerge / IDfy / Perfios-Karza).' },
  { name: 'LLM agent layer (tool-calling)', role: 'Checklist logic, customer conversation, CRM updates, escalation.' },
  { name: 'Rules engine', role: 'Cross-document name/DOB matching, expiry/recency checks (salary slip ≤3 months).' },
  { name: 'Superleap CRM integration', role: 'Writes extracted fields; triggers the Anumati AA handoff (does not replace it).' },
  { name: 'India-resident encrypted store', role: 'RBI/DPDP compliant, full audit logging.' },
]

export const METRICS = {
  northStar: {
    label: 'North star — files processed per officer per day',
    before: '4–5',
    after: '8–10',
    delta: '≈2×',
  },
  supporting: [
    { label: 'Document-completion rate', hint: '% of files that reach a clean, complete state' },
    { label: 'Turnaround time', hint: 'Lead → ready-for-OTP' },
    { label: 'Officer admin-minutes / file', hint: 'Manual typing & chasing removed' },
    { label: '% files auto-completed', hint: 'No officer touch at all' },
  ],
  tooling: 'Measured via product analytics (e.g. Mixpanel) / BI dashboards (e.g. Metabase). Plumbing, not the feature.',
}

export const COST_ROWS = [
  { item: 'Vision / OCR tokens', cost: '₹2–4', note: '~6 docs read per file' },
  { item: 'LLM agent tokens', cost: '₹2–3', note: 'Checklist, validation, chat replies' },
  { item: 'WhatsApp message fees', cost: '₹1–2', note: 'Request + chases' },
]
export const COST_SUMMARY = {
  perFile: '≈ ₹5–9',
  timeSaved: '30–45 min',
  timeValue: '≈ ₹150–250',
  net: 'Strongly accretive — and that ignores the ~2× throughput gain.',
}

export const GTM = [
  { icon: 'Target', title: 'Beachhead', body: 'Digital-first NBFCs / fintech lenders where WhatsApp collection already works — not legacy PSU banks. Superleap already serves Loans24 in this space; DocPilot is the natural next product for that account and a wedge into other NBFC/fintech lenders.' },
  { icon: 'Crosshair', title: 'Wedge', body: 'Land on the single sharpest pain (doc collection), prove 2× throughput + faster TAT in a pilot, then expand across the loan lifecycle. Superleap already markets a Lending CRM vertical — DocPilot is the AI feature that makes it defensible against horizontal CRMs, not a one-off add-on.' },
  { icon: 'Tag', title: 'Pricing', body: 'Per-seat add-on or per-file usage pricing on top of the Superleap CRM.' },
  { icon: 'HeartHandshake', title: 'Adoption hook', body: 'Officers feel relief on day one (no manual typing/chasing); managers get throughput + TAT dashboards.' },
  { icon: 'Zap', title: 'SuperAgent fit', body: 'Superleap already brands its agentic AI layer as "SuperAgents." DocPilot slots in as the first SuperAgent for lending — no new naming needed, instant fit with their existing platform story.' },
]
