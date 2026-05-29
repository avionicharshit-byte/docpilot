# DocPilot

**Live demo → [superleap-docpilot.netlify.app](https://superleap-docpilot.netlify.app/)**

DocPilot is an AI document agent built into Superleap CRM for frontline vehicle-loan officers at NBFCs and fintechs. It automates the end-to-end document collection loop that officers currently handle manually over WhatsApp — from requesting docs and reading them via OCR, to auto-filling the CRM, chasing customers for missing or invalid files, escalating edge cases, and handing off to the officer only when a human decision is needed.

---

## How it works

1. **DocPilot sends the document request** over WhatsApp on the officer's behalf
2. **Customer replies with photos** — PAN, Aadhaar, salary slips, ITR, address proof, vehicle RC
3. **AI reads each document** via OCR and validates it in real time
4. **CRM fields auto-fill** — name, PAN, DOB, Aadhaar, income, address — as docs come in
5. **Issues trigger automated chases** — blurry photo, expired doc, wrong period — DocPilot asks the customer to resend
6. **Edge cases escalate to the officer** — name mismatches, ownership anomalies — with one-click approve/reject
7. **File complete** — officer is nudged to trigger the OTP call; no manual data entry done

---

## What's inside

The prototype is a full interactive walkthrough — research, problem framing, solution design, and a live step-through demo with four real applicant scenarios:

| Applicant | Scenario |
|---|---|
| Rahul Sharma | Aadhaar name mismatch → officer escalation |
| Priya Mehta | Blurry photo → retake → clean run |
| Amit Verma | Expired GST + short ITR → two customer chases |
| Sana Khan | Vehicle RC in father's name → officer approval |

---

## Tech stack

- Vite + React 19
- Tailwind CSS v3
- Framer Motion 12
- lucide-react

## Run locally

```bash
npm install
npm run dev
```
