// Declarative script for the Live Demo. The LiveDemo reducer applies each
// step's timed `events`. All simulated — no backend, no real API calls.

export const CHECKLIST_DEF = [
  { key: 'photo', label: 'Customer photo' },
  { key: 'pan', label: 'PAN card' },
  { key: 'aadhaar', label: 'Aadhaar' },
  { key: 'salary', label: 'Salary slip (≤3 mo)' },
  { key: 'itr', label: 'Form 16 / ITR' },
  { key: 'address', label: 'Address proof (electricity bill)' },
]

export const FIELD_DEF = [
  { key: 'name', label: 'Full name' },
  { key: 'pan', label: 'PAN number' },
  { key: 'dob', label: 'Date of birth' },
  { key: 'aadhaar', label: 'Aadhaar number' },
  { key: 'income', label: 'Monthly income' },
  { key: 'address', label: 'Address' },
]

// Dashboard list — only "rahul" is interactive; the rest set context.
export const APPLICATIONS = [
  { id: 'rahul', name: 'Rahul Sharma', loan: 'New Car Loan · Maruti', profile: 'Salaried', amount: '₹8.4L', interactive: true },
  { id: 'priya', name: 'Priya Mehta', loan: 'Used Car Loan', profile: 'Salaried', amount: '₹5.2L', status: 'Ready for OTP' },
  { id: 'amit', name: 'Amit Verma', loan: 'New Car Loan · Hyundai', profile: 'Self-employed', amount: '₹11.0L', status: 'Validating' },
  { id: 'sana', name: 'Sana Khan', loan: 'Used Car Loan', profile: 'Salaried', amount: '₹3.9L', status: 'Collecting docs' },
]

const checklistAll = (status) =>
  Object.fromEntries(CHECKLIST_DEF.map((c) => [c.key, status]))

export const INITIAL_STATE = {
  stepIndex: -1, // -1 = not started
  running: false,
  awaitingOfficer: false,
  status: 'Collecting docs',
  typing: false,
  chat: [],
  checklist: checklistAll('pending'),
  fields: Object.fromEntries(FIELD_DEF.map((f) => [f.key, null])),
  flags: [],
  nudge: null,
  payoff: false,
  stats: { docsRead: 0, fields: 0, chases: 0, escalations: 0 },
}

// The interactive officer resolution (not a timed step).
export const RESOLVE_EVENT = {
  flag: 'mismatch',
  field: { key: 'aadhaar', value: 'XXXX XXXX 4321' },
  checklist: { key: 'aadhaar', status: 'valid' },
}

let t = 10 * 60 + 22 // 10:22 in minutes, just for display
const clock = () => {
  const m = t % 60
  const h = Math.floor(t / 60)
  t += 1
  return `${h}:${String(m).padStart(2, '0')}`
}

export const STEPS = [
  {
    id: 'request',
    label: 'DocPilot auto-sends the document request',
    events: [
      { at: 0, type: 'TYPING', on: true },
      {
        at: 1000,
        type: 'CHAT',
        msg: {
          from: 'docpilot',
          kind: 'text',
          text: "Hi Rahul 👋 I'm DocPilot from Superleap, helping with your Maruti car loan. To get you approved fast, please share these on this chat (photos are fine):\n\n• Your photo\n• PAN card\n• Aadhaar\n• Latest salary slip (last 3 months)\n• Form 16 / ITR\n• Address proof (electricity bill ≤ 3 months)",
        },
      },
      { at: 1000, type: 'TYPING', on: false },
    ],
  },
  {
    id: 'pan',
    label: 'Customer sends PAN → auto-read → CRM auto-fills',
    events: [
      { at: 0, type: 'CHAT', msg: { from: 'customer', kind: 'image', caption: 'PAN card', doc: 'pan' } },
      { at: 300, type: 'CHECK', key: 'pan', status: 'reading' },
      { at: 300, type: 'TYPING', on: true },
      { at: 1600, type: 'CHECK', key: 'pan', status: 'valid' },
      { at: 1600, type: 'FIELD', key: 'name', value: 'Rahul Sharma' },
      { at: 1600, type: 'FIELD', key: 'pan', value: 'ABCDE1234F' },
      { at: 1600, type: 'FIELD', key: 'dob', value: '01 Jan 1990' },
      { at: 1600, type: 'STAT', docsRead: 1, fields: 3 },
      { at: 1600, type: 'TYPING', on: false },
      { at: 1850, type: 'CHAT', msg: { from: 'docpilot', kind: 'text', text: 'Got your PAN, Rahul ✓ Verified and saved.' } },
    ],
  },
  {
    id: 'salary-old',
    label: 'Old salary slip → flagged → DocPilot chases the customer itself',
    events: [
      { at: 0, type: 'CHAT', msg: { from: 'customer', kind: 'image', caption: 'Salary slip — Dec 2025', doc: 'salary' } },
      { at: 300, type: 'CHECK', key: 'salary', status: 'reading' },
      { at: 300, type: 'TYPING', on: true },
      { at: 1700, type: 'CHECK', key: 'salary', status: 'issue' },
      { at: 1700, type: 'STATUS', value: 'Validating' },
      { at: 1700, type: 'TYPING', on: false },
      {
        at: 1950,
        type: 'CHAT',
        msg: {
          from: 'docpilot',
          kind: 'text',
          text: 'Thanks! This slip is from Dec 2025 — a bit old for income proof. Could you share one from the last 3 months (Feb–Apr 2026)?',
        },
      },
      { at: 2050, type: 'STAT', chases: 1 },
    ],
    note: 'Zero officer action — DocPilot detected the recency issue and chased the customer on WhatsApp itself.',
  },
  {
    id: 'salary-new',
    label: 'Corrected salary slip → valid → income auto-fills',
    events: [
      { at: 0, type: 'CHAT', msg: { from: 'customer', kind: 'image', caption: 'Salary slip — Apr 2026', doc: 'salary' } },
      { at: 300, type: 'CHECK', key: 'salary', status: 'reading' },
      { at: 300, type: 'TYPING', on: true },
      { at: 1500, type: 'CHECK', key: 'salary', status: 'valid' },
      { at: 1500, type: 'FIELD', key: 'income', value: '₹62,000 / mo' },
      { at: 1500, type: 'STAT', docsRead: 1, fields: 1 },
      { at: 1500, type: 'TYPING', on: false },
      { at: 1750, type: 'CHAT', msg: { from: 'docpilot', kind: 'text', text: 'Perfect — income verified ✓' } },
    ],
  },
  {
    id: 'aadhaar',
    label: 'Aadhaar name mismatch → DocPilot escalates (never auto-rejects)',
    events: [
      { at: 0, type: 'CHAT', msg: { from: 'customer', kind: 'image', caption: 'Aadhaar', doc: 'aadhaar' } },
      { at: 300, type: 'CHECK', key: 'aadhaar', status: 'reading' },
      { at: 300, type: 'TYPING', on: true },
      { at: 1700, type: 'CHECK', key: 'aadhaar', status: 'review' },
      { at: 1700, type: 'TYPING', on: false },
      {
        at: 1750,
        type: 'FLAG',
        flag: {
          id: 'mismatch',
          title: 'Name mismatch — needs review',
          body: "Aadhaar reads “Rahul S. Sharma” · PAN reads “Rahul Sharma”. A possible identity issue — DocPilot will not auto-decide.",
        },
      },
      { at: 1750, type: 'STAT', docsRead: 1, escalations: 1 },
      {
        at: 2000,
        type: 'CHAT',
        msg: {
          from: 'system',
          kind: 'note',
          text: 'DocPilot escalated this to the officer — it did NOT message the customer. AI never auto-rejects a person.',
        },
      },
      { at: 2050, type: 'AWAIT', on: true },
    ],
    note: 'Human-in-the-loop: a possible identity mismatch is a trust call, so DocPilot hands it to the officer instead of deciding.',
  },
  {
    id: 'batch',
    label: 'Remaining docs arrive → read in one pass → all valid',
    events: [
      { at: 0, type: 'CHAT', msg: { from: 'customer', kind: 'image', caption: 'Photo · Electricity bill · Form 16', doc: 'batch' } },
      { at: 300, type: 'CHECK', key: 'photo', status: 'reading' },
      { at: 300, type: 'CHECK', key: 'address', status: 'reading' },
      { at: 300, type: 'CHECK', key: 'itr', status: 'reading' },
      { at: 300, type: 'TYPING', on: true },
      { at: 1300, type: 'CHECK', key: 'photo', status: 'valid' },
      { at: 1600, type: 'CHECK', key: 'address', status: 'valid' },
      { at: 1600, type: 'FIELD', key: 'address', value: '14, MG Road, Pune 411001' },
      { at: 1900, type: 'CHECK', key: 'itr', status: 'valid' },
      { at: 1900, type: 'STAT', docsRead: 3, fields: 1 },
      { at: 1900, type: 'TYPING', on: false },
      { at: 2100, type: 'CHAT', msg: { from: 'docpilot', kind: 'text', text: 'All documents received and verified ✓ Your file is complete.' } },
    ],
  },
  {
    id: 'ready',
    label: 'File clean → status flips to “Ready for OTP” + officer nudge',
    events: [
      { at: 0, type: 'STATUS', value: 'Ready for OTP' },
      {
        at: 500,
        type: 'NUDGE',
        text: 'File ready — trigger the Anumati OTP. SBI server load is lowest 8–9am, best window for the call.',
      },
      { at: 1000, type: 'PAYOFF', on: true },
    ],
  },
]

export const clockSeed = clock // exported in case a fresh timeline is needed
