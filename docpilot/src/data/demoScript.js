// Per-applicant demo scripts. Each has its own checklist, steps, and optional resolve.

export const FIELD_DEF = [
  { key: 'name',    label: 'Full name' },
  { key: 'pan',     label: 'PAN number' },
  { key: 'dob',     label: 'Date of birth' },
  { key: 'aadhaar', label: 'Aadhaar number' },
  { key: 'income',  label: 'Monthly income' },
  { key: 'address', label: 'Address' },
]

export const APPLICATIONS = [
  { id: 'rahul', name: 'Rahul Sharma',  loan: 'New Car · Maruti',    profile: 'Salaried',       amount: '₹8.4L',  defaultStatus: 'Collecting docs' },
  { id: 'priya', name: 'Priya Mehta',   loan: 'Used Car Loan',       profile: 'Salaried',       amount: '₹5.2L',  defaultStatus: 'Validating'      },
  { id: 'amit',  name: 'Amit Verma',    loan: 'New Car · Hyundai',   profile: 'Self-employed',  amount: '₹11.0L', defaultStatus: 'Validating'      },
  { id: 'sana',  name: 'Sana Khan',     loan: 'Used Car Loan',       profile: 'Salaried',       amount: '₹3.9L',  defaultStatus: 'Collecting docs' },
]

export function buildInitialState(script) {
  return {
    running: false,
    awaitingOfficer: false,
    status: 'Collecting docs',
    typing: false,
    chat: [],
    checklist: Object.fromEntries(script.checklist.map(c => [c.key, 'pending'])),
    fields: Object.fromEntries(FIELD_DEF.map(f => [f.key, null])),
    flags: [],
    nudge: null,
    payoff: false,
    stats: { docsRead: 0, fields: 0, chases: 0, escalations: 0 },
  }
}

// ─── RAHUL SHARMA — Salaried, New Car ─────────────────────────────────────────
// Scenario: Aadhaar name mismatch → officer escalation (human-in-the-loop)

const RAHUL_STEPS = [
  {
    id: 'request',
    label: 'DocPilot auto-sends the document request',
    events: [
      { at: 0,    type: 'TYPING', on: true },
      { at: 1000, type: 'CHAT', msg: { from: 'docpilot', kind: 'text', text: "Hi Rahul 👋 I'm DocPilot from Superleap, helping with your Maruti car loan. To get you approved fast, please share these on this chat (photos are fine):\n\n• Your photo\n• PAN card\n• Aadhaar\n• Latest salary slip (last 3 months)\n• Form 16 / ITR\n• Address proof (electricity bill ≤ 3 months)" } },
      { at: 1000, type: 'TYPING', on: false },
    ],
  },
  {
    id: 'pan',
    label: 'PAN card → auto-read → CRM auto-fills',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'PAN card', doc: 'pan' } },
      { at: 300,  type: 'CHECK', key: 'pan', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1600, type: 'CHECK', key: 'pan', status: 'valid' },
      { at: 1600, type: 'FIELD', key: 'name',  value: 'Rahul Sharma' },
      { at: 1600, type: 'FIELD', key: 'pan',   value: 'ABCDE1234F' },
      { at: 1600, type: 'FIELD', key: 'dob',   value: '01 Jan 1990' },
      { at: 1600, type: 'STAT',  docsRead: 1, fields: 3 },
      { at: 1600, type: 'TYPING', on: false },
      { at: 1850, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'Got your PAN, Rahul ✓ Verified and saved.' } },
    ],
  },
  {
    id: 'salary-old',
    label: 'Old salary slip → DocPilot chases the customer',
    note: 'Zero officer action — DocPilot detected the recency issue and chased the customer on WhatsApp itself.',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Salary slip — Dec 2025', doc: 'salary' } },
      { at: 300,  type: 'CHECK', key: 'salary', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1700, type: 'CHECK', key: 'salary', status: 'issue' },
      { at: 1700, type: 'STATUS', value: 'Validating' },
      { at: 1700, type: 'TYPING', on: false },
      { at: 1950, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'Thanks! This slip is from Dec 2025 — a bit old for income proof. Could you share one from the last 3 months (Feb–Apr 2026)?' } },
      { at: 2050, type: 'STAT',  chases: 1 },
    ],
  },
  {
    id: 'salary-new',
    label: 'Corrected salary slip → valid → income auto-fills',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Salary slip — Apr 2026', doc: 'salary' } },
      { at: 300,  type: 'CHECK', key: 'salary', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1500, type: 'CHECK', key: 'salary', status: 'valid' },
      { at: 1500, type: 'FIELD', key: 'income', value: '₹62,000 / mo' },
      { at: 1500, type: 'STAT',  docsRead: 1, fields: 1 },
      { at: 1500, type: 'TYPING', on: false },
      { at: 1750, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'Income verified ✓' } },
    ],
  },
  {
    id: 'aadhaar',
    label: 'Aadhaar name mismatch → DocPilot escalates to officer',
    note: 'Human-in-the-loop: a possible identity mismatch is a trust call, so DocPilot hands it to the officer instead of deciding.',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Aadhaar', doc: 'aadhaar' } },
      { at: 300,  type: 'CHECK', key: 'aadhaar', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1700, type: 'CHECK', key: 'aadhaar', status: 'review' },
      { at: 1700, type: 'TYPING', on: false },
      { at: 1750, type: 'FLAG',  flag: { id: 'mismatch', title: 'Name mismatch — needs review', body: 'Aadhaar reads "Rahul S. Sharma" · PAN reads "Rahul Sharma". A possible identity issue — DocPilot will not auto-decide.' } },
      { at: 1750, type: 'STAT',  docsRead: 1, escalations: 1 },
      { at: 2000, type: 'CHAT',  msg: { from: 'system', kind: 'note', text: 'DocPilot escalated this to the officer — it did NOT message the customer. AI never auto-rejects a person.' } },
      { at: 2050, type: 'AWAIT', on: true },
    ],
  },
  {
    id: 'batch',
    label: 'Remaining docs → read in one pass → all valid',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Photo · Electricity bill · Form 16', doc: 'batch' } },
      { at: 300,  type: 'CHECK', key: 'photo',   status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'address', status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'itr',     status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1300, type: 'CHECK', key: 'photo',   status: 'valid' },
      { at: 1600, type: 'CHECK', key: 'address', status: 'valid' },
      { at: 1600, type: 'FIELD', key: 'address', value: '14, MG Road, Pune 411001' },
      { at: 1900, type: 'CHECK', key: 'itr',     status: 'valid' },
      { at: 1900, type: 'STAT',  docsRead: 3, fields: 1 },
      { at: 1900, type: 'TYPING', on: false },
      { at: 2100, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'All documents received and verified ✓ Your file is complete.' } },
    ],
  },
  {
    id: 'ready',
    label: 'File clean → "Ready for OTP" + officer nudge',
    events: [
      { at: 0,    type: 'STATUS', value: 'Ready for OTP' },
      { at: 500,  type: 'NUDGE',  text: 'File ready — trigger the Anumati OTP. SBI server load is lowest 8–9am, best window for the call.' },
      { at: 1000, type: 'PAYOFF', on: true },
    ],
  },
]

// ─── PRIYA MEHTA — Salaried, Used Car ─────────────────────────────────────────
// Scenario: blurry photo → retake → then clean batch run (ideal flow)

const PRIYA_STEPS = [
  {
    id: 'request',
    label: 'DocPilot sends the doc request (includes Vehicle RC)',
    events: [
      { at: 0,    type: 'TYPING', on: true },
      { at: 1000, type: 'CHAT', msg: { from: 'docpilot', kind: 'text', text: "Hi Priya 👋 I'm DocPilot from Superleap, helping with your used car loan. Please share these on this chat:\n\n• Your photo\n• PAN card\n• Aadhaar\n• Latest salary slip (last 3 months)\n• Form 16 / ITR\n• Address proof (electricity bill ≤ 3 months)\n• Vehicle RC of the car being purchased" } },
      { at: 1000, type: 'TYPING', on: false },
    ],
  },
  {
    id: 'pan',
    label: 'PAN card → valid → name/PAN/DOB auto-fills',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'PAN card', doc: 'pan' } },
      { at: 300,  type: 'CHECK', key: 'pan', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1500, type: 'CHECK', key: 'pan', status: 'valid' },
      { at: 1500, type: 'FIELD', key: 'name',  value: 'Priya Mehta' },
      { at: 1500, type: 'FIELD', key: 'pan',   value: 'FGHIJ5678K' },
      { at: 1500, type: 'FIELD', key: 'dob',   value: '15 Mar 1992' },
      { at: 1500, type: 'STAT',  docsRead: 1, fields: 3 },
      { at: 1500, type: 'TYPING', on: false },
      { at: 1750, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'PAN verified ✓' } },
    ],
  },
  {
    id: 'photo-blurry',
    label: 'Blurry photo → DocPilot detects low quality → asks for retake',
    note: 'Photo quality check is automated — DocPilot catches this without the officer ever seeing the file.',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'My photo', doc: 'photo' } },
      { at: 300,  type: 'CHECK', key: 'photo', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1500, type: 'CHECK', key: 'photo', status: 'issue' },
      { at: 1500, type: 'STATUS', value: 'Validating' },
      { at: 1500, type: 'TYPING', on: false },
      { at: 1750, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: "The photo is a bit blurry — I need a clear, well-lit image for the KYC check. Could you retake it in good light?" } },
      { at: 1900, type: 'STAT',  chases: 1 },
    ],
  },
  {
    id: 'photo-ok',
    label: 'Clear retake → photo valid',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Retake — clearer photo', doc: 'photo' } },
      { at: 300,  type: 'CHECK', key: 'photo', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1300, type: 'CHECK', key: 'photo', status: 'valid' },
      { at: 1300, type: 'STAT',  docsRead: 1 },
      { at: 1300, type: 'TYPING', on: false },
      { at: 1500, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'Photo verified ✓ Clear and legible.' } },
    ],
  },
  {
    id: 'batch',
    label: 'Remaining docs + Vehicle RC → all valid in one pass',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Aadhaar · Salary slip · ITR · Electricity bill · Vehicle RC', doc: 'batch' } },
      { at: 300,  type: 'CHECK', key: 'aadhaar',    status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'salary',     status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'itr',        status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'address',    status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'vehicle_rc', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1100, type: 'CHECK', key: 'aadhaar',    status: 'valid' },
      { at: 1100, type: 'FIELD', key: 'aadhaar',    value: 'XXXX XXXX 9876' },
      { at: 1400, type: 'CHECK', key: 'salary',     status: 'valid' },
      { at: 1400, type: 'FIELD', key: 'income',     value: '₹48,000 / mo' },
      { at: 1600, type: 'CHECK', key: 'itr',        status: 'valid' },
      { at: 1800, type: 'CHECK', key: 'address',    status: 'valid' },
      { at: 1800, type: 'FIELD', key: 'address',    value: '22, Bandra West, Mumbai 400050' },
      { at: 2100, type: 'CHECK', key: 'vehicle_rc', status: 'valid' },
      { at: 2100, type: 'STAT',  docsRead: 5, fields: 3 },
      { at: 2100, type: 'TYPING', on: false },
      { at: 2300, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'All documents verified ✓ Vehicle RC confirmed — owner name matches. File complete.' } },
    ],
  },
  {
    id: 'ready',
    label: 'File clean → Ready for OTP',
    events: [
      { at: 0,   type: 'STATUS', value: 'Ready for OTP' },
      { at: 500, type: 'NUDGE',  text: 'File ready — trigger the Anumati OTP. All docs clean, no issues flagged.' },
      { at: 900, type: 'PAYOFF', on: true },
    ],
  },
]

// ─── AMIT VERMA — Self-employed, New Car ──────────────────────────────────────
// Scenario: expired GST cert → updated; ITR only 1 year → DocPilot chases for 2nd year

const AMIT_STEPS = [
  {
    id: 'request',
    label: 'DocPilot sends self-employed checklist',
    events: [
      { at: 0,    type: 'TYPING', on: true },
      { at: 1000, type: 'CHAT', msg: { from: 'docpilot', kind: 'text', text: "Hi Amit 👋 I'm DocPilot from Superleap, helping with your Hyundai car loan. Since you're self-employed, I'll need a few extra documents:\n\n• Your photo\n• PAN card\n• Aadhaar\n• GST registration certificate\n• ITR for last 2 financial years (FY 2024–25 + FY 2023–24)\n• Business proof (GST invoice or registration letter)\n• Address proof (electricity bill ≤ 3 months)" } },
      { at: 1000, type: 'TYPING', on: false },
    ],
  },
  {
    id: 'pan',
    label: 'PAN card → valid → CRM auto-fills',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'PAN card', doc: 'pan' } },
      { at: 300,  type: 'CHECK', key: 'pan', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1500, type: 'CHECK', key: 'pan', status: 'valid' },
      { at: 1500, type: 'FIELD', key: 'name', value: 'Amit Verma' },
      { at: 1500, type: 'FIELD', key: 'pan',  value: 'KLMNO9012P' },
      { at: 1500, type: 'FIELD', key: 'dob',  value: '03 Jun 1985' },
      { at: 1500, type: 'STAT',  docsRead: 1, fields: 3 },
      { at: 1500, type: 'TYPING', on: false },
      { at: 1750, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'PAN verified ✓' } },
    ],
  },
  {
    id: 'gst-expired',
    label: 'GST certificate expired → DocPilot flags it',
    note: 'Expiry check is automatic — DocPilot cross-checks the certificate date against today and catches it before the officer ever sees the file.',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'GST certificate', doc: 'gst' } },
      { at: 300,  type: 'CHECK', key: 'gst', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1600, type: 'CHECK', key: 'gst', status: 'issue' },
      { at: 1600, type: 'STATUS', value: 'Validating' },
      { at: 1600, type: 'TYPING', on: false },
      { at: 1850, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'Your GST certificate expired in Oct 2025 — lenders require a valid, unexpired one. Could you share the renewed certificate?' } },
      { at: 2000, type: 'STAT',  chases: 1 },
    ],
  },
  {
    id: 'gst-new',
    label: 'Updated GST certificate → valid',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'GST certificate — renewed Jan 2026', doc: 'gst' } },
      { at: 300,  type: 'CHECK', key: 'gst', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1400, type: 'CHECK', key: 'gst', status: 'valid' },
      { at: 1400, type: 'STAT',  docsRead: 1 },
      { at: 1400, type: 'TYPING', on: false },
      { at: 1600, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'GST certificate verified ✓ Valid through Jan 2028.' } },
    ],
  },
  {
    id: 'itr-one-year',
    label: 'ITR for only 1 year → DocPilot asks for the 2nd year',
    note: 'Self-employed applicants need 2 years of ITR. DocPilot knows this from the profile and chases automatically.',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'ITR — FY 2024–25', doc: 'itr' } },
      { at: 300,  type: 'CHECK', key: 'itr', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1600, type: 'CHECK', key: 'itr', status: 'issue' },
      { at: 1600, type: 'TYPING', on: false },
      { at: 1850, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: "Got FY 2024–25 ✓ — for self-employed profiles, lenders require 2 years. Could you also share FY 2023–24?" } },
      { at: 2000, type: 'STAT',  chases: 1 },
    ],
  },
  {
    id: 'itr-both',
    label: 'Both ITR years + remaining docs → all valid',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'ITR FY 2023–24 · Photo · Aadhaar · Address · Business proof', doc: 'batch' } },
      { at: 300,  type: 'CHECK', key: 'itr',            status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'photo',          status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'aadhaar',        status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'address',        status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'business_proof', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1100, type: 'CHECK', key: 'itr',            status: 'valid' },
      { at: 1300, type: 'CHECK', key: 'photo',          status: 'valid' },
      { at: 1500, type: 'CHECK', key: 'aadhaar',        status: 'valid' },
      { at: 1500, type: 'FIELD', key: 'aadhaar',        value: 'XXXX XXXX 5544' },
      { at: 1700, type: 'CHECK', key: 'address',        status: 'valid' },
      { at: 1700, type: 'FIELD', key: 'address',        value: '7, Koramangala 5th Block, Bengaluru 560034' },
      { at: 1900, type: 'CHECK', key: 'business_proof', status: 'valid' },
      { at: 1900, type: 'FIELD', key: 'income',         value: '₹1,85,000 / mo (net)' },
      { at: 1900, type: 'STAT',  docsRead: 5, fields: 3 },
      { at: 1900, type: 'TYPING', on: false },
      { at: 2100, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'Both ITR years verified ✓ All remaining documents clear. File complete.' } },
    ],
  },
  {
    id: 'ready',
    label: 'File clean → Ready for OTP',
    events: [
      { at: 0,   type: 'STATUS', value: 'Ready for OTP' },
      { at: 500, type: 'NUDGE',  text: 'File ready — trigger the Anumati OTP. SBI server load is lowest 8–9am, best window for the call.' },
      { at: 900, type: 'PAYOFF', on: true },
    ],
  },
]

// ─── SANA KHAN — Salaried, Used Car ───────────────────────────────────────────
// Scenario: Vehicle RC in father's name → escalate → officer approves (common used car edge case)

const SANA_STEPS = [
  {
    id: 'request',
    label: 'DocPilot sends doc request (includes Vehicle RC)',
    events: [
      { at: 0,    type: 'TYPING', on: true },
      { at: 1000, type: 'CHAT', msg: { from: 'docpilot', kind: 'text', text: "Hi Sana 👋 I'm DocPilot from Superleap, helping with your used car loan. Please share these on this chat:\n\n• Your photo\n• PAN card\n• Aadhaar\n• Latest salary slip (last 3 months)\n• Form 16 / ITR\n• Address proof (electricity bill ≤ 3 months)\n• Vehicle RC of the car" } },
      { at: 1000, type: 'TYPING', on: false },
    ],
  },
  {
    id: 'pan-aadhaar',
    label: 'PAN + Aadhaar sent together → both valid in one pass',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'PAN card + Aadhaar', doc: 'batch' } },
      { at: 300,  type: 'CHECK', key: 'pan',    status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'aadhaar',status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1300, type: 'CHECK', key: 'pan',    status: 'valid' },
      { at: 1300, type: 'FIELD', key: 'name',   value: 'Sana Khan' },
      { at: 1300, type: 'FIELD', key: 'pan',    value: 'QRSTU3456V' },
      { at: 1300, type: 'FIELD', key: 'dob',    value: '28 Sep 1995' },
      { at: 1600, type: 'CHECK', key: 'aadhaar',status: 'valid' },
      { at: 1600, type: 'FIELD', key: 'aadhaar',value: 'XXXX XXXX 7713' },
      { at: 1600, type: 'STAT',  docsRead: 2, fields: 4 },
      { at: 1600, type: 'TYPING', on: false },
      { at: 1850, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'PAN ✓ and Aadhaar ✓ — both verified. Names match across documents.' } },
    ],
  },
  {
    id: 'salary-old',
    label: 'Salary slip too old → DocPilot chases for recent one',
    note: 'Recency check is automatic — DocPilot knows the 3-month rule and chases without the officer touching the file.',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Salary slip — Nov 2025', doc: 'salary' } },
      { at: 300,  type: 'CHECK', key: 'salary', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1600, type: 'CHECK', key: 'salary', status: 'issue' },
      { at: 1600, type: 'STATUS', value: 'Validating' },
      { at: 1600, type: 'TYPING', on: false },
      { at: 1850, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: "This slip is from Nov 2025 — it needs to be from the last 3 months. Could you share one from Feb–Apr 2026?" } },
      { at: 2000, type: 'STAT',  chases: 1 },
    ],
  },
  {
    id: 'salary-new',
    label: 'Updated salary slip → valid → income fills',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Salary slip — Mar 2026', doc: 'salary' } },
      { at: 300,  type: 'CHECK', key: 'salary', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1400, type: 'CHECK', key: 'salary', status: 'valid' },
      { at: 1400, type: 'FIELD', key: 'income', value: '₹41,500 / mo' },
      { at: 1400, type: 'STAT',  docsRead: 1, fields: 1 },
      { at: 1400, type: 'TYPING', on: false },
      { at: 1600, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'Income verified ✓' } },
    ],
  },
  {
    id: 'rc-mismatch',
    label: 'Vehicle RC owner name mismatch → escalate to officer',
    note: "RC is in father's name — a common used car scenario. DocPilot does not auto-decide; it escalates to the officer who can verify the family relationship and approve.",
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Vehicle RC', doc: 'vehicle_rc' } },
      { at: 300,  type: 'CHECK', key: 'vehicle_rc', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1700, type: 'CHECK', key: 'vehicle_rc', status: 'review' },
      { at: 1700, type: 'TYPING', on: false },
      { at: 1800, type: 'FLAG',  flag: { id: 'rc-owner', title: 'Vehicle RC owner mismatch — review needed', body: 'RC registered to "Mohammad Khan" · Applicant is "Sana Khan". Possibly a family vehicle — DocPilot will not auto-decide.' } },
      { at: 1800, type: 'STAT',  docsRead: 1, escalations: 1 },
      { at: 2000, type: 'CHAT',  msg: { from: 'system', kind: 'note', text: "DocPilot escalated this to the officer. Common for used family cars — officer needs to verify the relationship and approve." } },
      { at: 2100, type: 'AWAIT', on: true },
    ],
  },
  {
    id: 'batch',
    label: 'Remaining docs → photo, ITR, address → all valid',
    events: [
      { at: 0,    type: 'CHAT',  msg: { from: 'customer', kind: 'image', caption: 'Photo · ITR · Electricity bill', doc: 'batch' } },
      { at: 300,  type: 'CHECK', key: 'photo',   status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'itr',     status: 'reading' },
      { at: 300,  type: 'CHECK', key: 'address', status: 'reading' },
      { at: 300,  type: 'TYPING', on: true },
      { at: 1200, type: 'CHECK', key: 'photo',   status: 'valid' },
      { at: 1500, type: 'CHECK', key: 'itr',     status: 'valid' },
      { at: 1800, type: 'CHECK', key: 'address', status: 'valid' },
      { at: 1800, type: 'FIELD', key: 'address', value: '3A, Lajpat Nagar II, New Delhi 110024' },
      { at: 1800, type: 'STAT',  docsRead: 3, fields: 1 },
      { at: 1800, type: 'TYPING', on: false },
      { at: 2000, type: 'CHAT',  msg: { from: 'docpilot', kind: 'text', text: 'All documents received and verified ✓ File complete.' } },
    ],
  },
  {
    id: 'ready',
    label: 'File clean → Ready for OTP',
    events: [
      { at: 0,   type: 'STATUS', value: 'Ready for OTP' },
      { at: 500, type: 'NUDGE',  text: 'File ready — trigger the Anumati OTP. All docs clean, RC ownership approved.' },
      { at: 900, type: 'PAYOFF', on: true },
    ],
  },
]

// ─── Script registry ──────────────────────────────────────────────────────────

export const DEMO_SCRIPTS = {
  rahul: {
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    checklist: [
      { key: 'photo',   label: 'Customer photo' },
      { key: 'pan',     label: 'PAN card' },
      { key: 'aadhaar', label: 'Aadhaar' },
      { key: 'salary',  label: 'Salary slip (≤ 3 mo)' },
      { key: 'itr',     label: 'Form 16 / ITR' },
      { key: 'address', label: 'Address proof (electricity bill)' },
    ],
    steps: RAHUL_STEPS,
    resolve: {
      flag: 'mismatch',
      field: { key: 'aadhaar', value: 'XXXX XXXX 4321' },
      checklist: { key: 'aadhaar', status: 'valid' },
      nudgeText: 'Aadhaar approved by officer. Continuing file validation.',
    },
  },

  priya: {
    customerName: 'Priya Mehta',
    customerPhone: '+91 91234 56789',
    checklist: [
      { key: 'photo',      label: 'Customer photo' },
      { key: 'pan',        label: 'PAN card' },
      { key: 'aadhaar',    label: 'Aadhaar' },
      { key: 'salary',     label: 'Salary slip (≤ 3 mo)' },
      { key: 'itr',        label: 'Form 16 / ITR' },
      { key: 'address',    label: 'Address proof (electricity bill)' },
      { key: 'vehicle_rc', label: 'Vehicle RC' },
    ],
    steps: PRIYA_STEPS,
    resolve: null,
    // Preloaded: PAN done, photo came in blurry — DocPilot already chased for retake
    preloadedStepIndex: 2,
    preloadedState: {
      status: 'Validating',
      typing: false,
      awaitingOfficer: false,
      checklist: { photo: 'issue', pan: 'valid', aadhaar: 'pending', salary: 'pending', itr: 'pending', address: 'pending', vehicle_rc: 'pending' },
      fields: { name: 'Priya Mehta', pan: 'FGHIJ5678K', dob: '15 Mar 1992', aadhaar: null, income: null, address: null },
      flags: [],
      nudge: null,
      payoff: false,
      stats: { docsRead: 1, fields: 3, chases: 1, escalations: 0 },
      chat: [
        { id: 'p1', from: 'docpilot', kind: 'text', text: "Hi Priya 👋 I'm DocPilot from Superleap, helping with your used car loan. Please share these on this chat:\n\n• Your photo\n• PAN card\n• Aadhaar\n• Latest salary slip (last 3 months)\n• Form 16 / ITR\n• Address proof (electricity bill ≤ 3 months)\n• Vehicle RC of the car being purchased" },
        { id: 'p2', from: 'customer', kind: 'image', caption: 'PAN card', doc: 'pan' },
        { id: 'p3', from: 'docpilot', kind: 'text', text: 'PAN verified ✓' },
        { id: 'p4', from: 'customer', kind: 'image', caption: 'My photo', doc: 'photo' },
        { id: 'p5', from: 'docpilot', kind: 'text', text: "The photo is a bit blurry — I need a clear, well-lit image for the KYC check. Could you retake it in good light?" },
      ],
    },
  },

  amit: {
    customerName: 'Amit Verma',
    customerPhone: '+91 99887 76655',
    checklist: [
      { key: 'photo',          label: 'Customer photo' },
      { key: 'pan',            label: 'PAN card' },
      { key: 'aadhaar',        label: 'Aadhaar' },
      { key: 'gst',            label: 'GST registration certificate' },
      { key: 'itr',            label: 'ITR — 2 financial years' },
      { key: 'business_proof', label: 'Business proof' },
      { key: 'address',        label: 'Address proof (electricity bill)' },
    ],
    steps: AMIT_STEPS,
    resolve: null,
    // Preloaded: PAN done, GST came back expired — DocPilot already flagged & chased
    preloadedStepIndex: 2,
    preloadedState: {
      status: 'Validating',
      typing: false,
      awaitingOfficer: false,
      checklist: { photo: 'pending', pan: 'valid', aadhaar: 'pending', gst: 'issue', itr: 'pending', business_proof: 'pending', address: 'pending' },
      fields: { name: 'Amit Verma', pan: 'KLMNO9012P', dob: '03 Jun 1985', aadhaar: null, income: null, address: null },
      flags: [],
      nudge: null,
      payoff: false,
      stats: { docsRead: 1, fields: 3, chases: 1, escalations: 0 },
      chat: [
        { id: 'a1', from: 'docpilot', kind: 'text', text: "Hi Amit 👋 I'm DocPilot from Superleap, helping with your Hyundai car loan. Since you're self-employed, I'll need a few extra documents:\n\n• Your photo\n• PAN card\n• Aadhaar\n• GST registration certificate\n• ITR for last 2 financial years (FY 2024–25 + FY 2023–24)\n• Business proof (GST invoice or registration letter)\n• Address proof (electricity bill ≤ 3 months)" },
        { id: 'a2', from: 'customer', kind: 'image', caption: 'PAN card', doc: 'pan' },
        { id: 'a3', from: 'docpilot', kind: 'text', text: 'PAN verified ✓' },
        { id: 'a4', from: 'customer', kind: 'image', caption: 'GST certificate', doc: 'gst' },
        { id: 'a5', from: 'docpilot', kind: 'text', text: 'Your GST certificate expired in Oct 2025 — lenders require a valid, unexpired one. Could you share the renewed certificate?' },
      ],
    },
  },

  sana: {
    customerName: 'Sana Khan',
    customerPhone: '+91 87654 32109',
    checklist: [
      { key: 'photo',      label: 'Customer photo' },
      { key: 'pan',        label: 'PAN card' },
      { key: 'aadhaar',    label: 'Aadhaar' },
      { key: 'salary',     label: 'Salary slip (≤ 3 mo)' },
      { key: 'itr',        label: 'Form 16 / ITR' },
      { key: 'address',    label: 'Address proof (electricity bill)' },
      { key: 'vehicle_rc', label: 'Vehicle RC' },
    ],
    steps: SANA_STEPS,
    resolve: {
      flag: 'rc-owner',
      field: null,
      checklist: { key: 'vehicle_rc', status: 'valid' },
      nudgeText: 'Vehicle RC ownership approved — family vehicle confirmed by officer.',
    },
    // Preloaded: PAN + Aadhaar already done in one shot
    preloadedStepIndex: 1,
    preloadedState: {
      status: 'Collecting docs',
      typing: false,
      awaitingOfficer: false,
      checklist: { photo: 'pending', pan: 'valid', aadhaar: 'valid', salary: 'pending', itr: 'pending', address: 'pending', vehicle_rc: 'pending' },
      fields: { name: 'Sana Khan', pan: 'QRSTU3456V', dob: '28 Sep 1995', aadhaar: 'XXXX XXXX 7713', income: null, address: null },
      flags: [],
      nudge: null,
      payoff: false,
      stats: { docsRead: 2, fields: 4, chases: 0, escalations: 0 },
      chat: [
        { id: 's1', from: 'docpilot', kind: 'text', text: "Hi Sana 👋 I'm DocPilot from Superleap, helping with your used car loan. Please share these on this chat:\n\n• Your photo\n• PAN card\n• Aadhaar\n• Latest salary slip (last 3 months)\n• Form 16 / ITR\n• Address proof (electricity bill ≤ 3 months)\n• Vehicle RC of the car" },
        { id: 's2', from: 'customer', kind: 'image', caption: 'PAN card + Aadhaar', doc: 'batch' },
        { id: 's3', from: 'docpilot', kind: 'text', text: 'PAN ✓ and Aadhaar ✓ — both verified. Names match across documents.' },
      ],
    },
  },
}
