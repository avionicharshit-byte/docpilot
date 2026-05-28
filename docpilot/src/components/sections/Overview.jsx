import { Card, Callout } from '../ui'
import Icon from '../Icon'

export default function Overview({ setActiveSection }) {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {/* Hero */}
      <div className="rounded-2xl bg-ink text-white px-8 py-10 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-light mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Superleap · BFSI · Vehicle Lending
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-tint shrink-0 mt-1">
              <Icon name="Workflow" size={22} className="text-brand-dark" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight leading-tight">DocPilot</h1>
              <p className="text-white/60 text-base mt-1">by Superleap</p>
            </div>
          </div>
          <p className="text-2xl font-semibold text-white/90 mb-2 max-w-xl">
            Paperwork, on autopilot.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed max-w-2xl">
            An AI document agent inside Superleap that runs the entire WhatsApp doc-collection loop for vehicle-loan officers — requesting, reading, validating, and chasing — handing the file back only when it's complete and clean.
          </p>
        </div>
      </div>

      {/* Headline metric */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-6 col-span-1">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60 mb-3">Before DocPilot</div>
          <div className="text-4xl font-bold text-danger">4–5</div>
          <div className="text-sm text-ink-600 mt-1">files / officer / day</div>
          <div className="text-xs text-ink-600/60 mt-1">Manual collect · chase · type · verify</div>
        </Card>
        <Card className="p-6 col-span-1 bg-ink border-ink text-white">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-brand-light/70 mb-3">After DocPilot</div>
          <div className="text-4xl font-bold text-brand-light">8–10</div>
          <div className="text-sm text-white mt-1">files / officer / day</div>
          <div className="text-xs text-white/50 mt-1">AI owns the grunt work</div>
        </Card>
        <Card className="p-6 col-span-1 border-brand/30 bg-brand-tint">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-brand-dark/60 mb-3">Throughput gain</div>
          <div className="text-4xl font-bold text-brand-dark">≈2×</div>
          <div className="text-sm text-brand-dark mt-1">more files per officer</div>
          <div className="text-xs text-brand-dark/60 mt-1">Same team · faster TAT</div>
        </Card>
      </div>

      {/* What it does */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { icon: 'Send', title: 'Auto-requests docs', body: 'Sends a personalized WhatsApp to the customer with the exact checklist for their loan profile.' },
          { icon: 'Eye', title: 'Reads every document', body: 'Vision LLM reads each doc image, extracts fields, and populates the CRM automatically — zero manual typing.' },
          { icon: 'CheckCircle2', title: 'Validates & chases', body: 'Checks doc type, legibility, expiry, name/DOB consistency. Catches issues and asks the customer directly on WhatsApp.' },
          { icon: 'UserCheck', title: 'Escalates when needed', body: 'Risky items (name mismatch, suspected tampering) are flagged to the officer. AI never auto-rejects a person.' },
        ].map(f => (
          <Card key={f.title} className="p-5 flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand-dark">
              <Icon name={f.icon} size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">{f.title}</div>
              <div className="text-[13px] text-ink-600 mt-0.5 leading-relaxed">{f.body}</div>
            </div>
          </Card>
        ))}
      </div>

      <Callout icon="Zap" tone="brand" title="Give time back">
        The customer already wants the loan. The friction is purely operational — a fragmented, manual collect-chase-verify-enter loop. DocPilot eliminates it so the officer focuses on the conversations that matter.
      </Callout>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setActiveSection('demo')}
          className="inline-flex items-center gap-2 rounded-xl bg-ink text-white px-6 py-3 text-sm font-semibold shadow-cardlg hover:bg-ink-700 transition-colors"
        >
          <Icon name="PlayCircle" size={18} />
          See the Live Demo
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  )
}
