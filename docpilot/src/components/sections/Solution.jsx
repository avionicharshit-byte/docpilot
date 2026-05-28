import { Card, SectionHeader, Callout, Eyebrow, FeatureIcon } from '../ui'
import Icon from '../Icon'
import { SCOPE, BEFORE_STEPS, AFTER_STEPS, PRIVACY, TECH_STACK } from '../../data/content'

const SCOPE_STYLES = {
  owns: { border: 'border-brand/30 bg-brand-tint', badge: 'bg-brand text-white', icon: 'Check' },
  not: { border: 'border-line bg-mist', badge: 'bg-ink text-white', icon: 'X' },
}

export default function Solution() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <SectionHeader
        eyebrow="Solution"
        title="DocPilot — Your AI document agent"
        lead="DocPilot automates the entire document-collection loop — from requesting docs on WhatsApp to auto-filling the CRM — handing the file back to the human only when it's complete and clean."
      />

      {/* Scope */}
      <div className="mb-8">
        <Eyebrow className="mb-4">What DocPilot owns</Eyebrow>
        <div className="grid grid-cols-3 gap-4">
          {SCOPE.map(s => {
            const style = SCOPE_STYLES[s.kind]
            return (
              <div key={s.title} className={`rounded-2xl border p-5 ${style.border}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${style.badge}`}>
                    <Icon name={style.icon} size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[12px] font-bold text-ink uppercase tracking-wide">{s.title}</span>
                </div>
                <p className="text-[12px] text-ink-600 leading-relaxed">{s.body}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Before → After */}
      <div className="mb-8">
        <Eyebrow className="mb-4">Before → After</Eyebrow>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="text-[11px] font-bold uppercase tracking-widest text-danger mb-3">Before</div>
            <div className="space-y-2">
              {BEFORE_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-danger mt-0.5">
                    <Icon name="X" size={10} strokeWidth={3} />
                  </div>
                  <span className="text-[12px] text-ink-600 leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-5 border-brand/20">
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-3">After DocPilot</div>
            <div className="space-y-2.5">
              {AFTER_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-dark mt-0.5">
                    <Icon name="Check" size={10} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="text-[12px] font-semibold text-ink">{step.t} — </span>
                    <span className="text-[12px] text-ink-600 leading-snug">{step.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Tech explainer */}
      <div className="mb-8">
        <Eyebrow className="mb-4">How it works — Eyes + Brain</Eyebrow>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <FeatureIcon name="Eye" tone="brand" />
              <div>
                <div className="text-[13px] font-bold text-ink">Vision LLM / OCR</div>
                <div className="text-[11px] text-ink-600">The eyes</div>
              </div>
            </div>
            <p className="text-[12px] text-ink-600 leading-relaxed mb-3">
              Reads each document image and turns it into structured data — doc type, fields, quality. A PAN photo becomes <code className="bg-mist px-1 rounded text-[11px]">&#123;type: PAN, number: ABCDE1234F, name: RAHUL SHARMA&#125;</code>. This auto-fills the CRM.
            </p>
            <div className="text-[11px] text-ink-600/70">GPT-4o / Claude / Gemini vision · or Signzy / HyperVerge / Perfios-Karza</div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <FeatureIcon name="Brain" tone="ink" />
              <div>
                <div className="text-[13px] font-bold text-ink">LLM Agent Layer</div>
                <div className="text-[11px] text-ink-600">The brain + hands</div>
              </div>
            </div>
            <p className="text-[12px] text-ink-600 leading-relaxed mb-3">
              Holds the checklist, decides what's still needed, writes the WhatsApp replies, updates the CRM, and decides when to chase vs. escalate to the officer. Uses tool-calling: send WhatsApp / update CRM field / flag for officer.
            </p>
            <div className="text-[11px] text-ink-600/70">Rules engine for name/DOB cross-matching + expiry checks</div>
          </Card>
        </div>
        <div className="rounded-xl bg-ink/5 border border-line p-4">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60 mb-2">Full tech stack</div>
          <div className="grid grid-cols-2 gap-2">
            {TECH_STACK.map(t => (
              <div key={t.name} className="flex items-start gap-2">
                <Icon name="ChevronRight" size={12} className="text-brand mt-0.5 shrink-0" />
                <div>
                  <span className="text-[12px] font-semibold text-ink">{t.name}</span>
                  <span className="text-[12px] text-ink-600"> — {t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="mb-8">
        <Eyebrow className="mb-4">Privacy & compliance — a selling point</Eyebrow>
        <div className="grid grid-cols-3 gap-3">
          {PRIVACY.map(p => (
            <Card key={p.title} className="p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-tint text-brand-dark mb-3">
                <Icon name={p.icon} size={16} />
              </div>
              <div className="text-[12px] font-semibold text-ink mb-1">{p.title}</div>
              <p className="text-[11px] text-ink-600 leading-relaxed">{p.body}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* OTP callout */}
      <div className="rounded-2xl bg-ink p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-brand-light">
            <Icon name="ShieldCheck" size={22} />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-brand-light/70 mb-1">Design principle</div>
            <div className="text-[15px] font-bold text-white mb-2">The human owns the OTP / consent moment</div>
            <p className="text-[13px] text-white/70 leading-relaxed">
              DocPilot automates the grunt work; the human owns the trust moments. The Anumati OTP is the consent action — RBI-regulated, fraud-sensitive, trust-critical. DocPilot does not automate it. It prepares a clean file and hands off to the rep with a "ready + best-time" nudge. The rep makes the human call.
            </p>
            <div className="mt-3 text-[12px] text-brand-light font-medium">
              Knowing where not to apply AI is a deliberate product decision.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
