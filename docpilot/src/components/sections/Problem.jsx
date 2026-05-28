import { Card, SectionHeader, Callout } from '../ui'
import Icon from '../Icon'
import { BEFORE_STEPS } from '../../data/content'

export default function Problem() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <SectionHeader
        eyebrow="Problem"
        title="The manual document loop caps throughput"
        lead="It's not one big block of wasted time — it's death by fragmentation. The collect-chase-verify-enter loop happens for every file, every doc, every day."
      />

      {/* Problem statement card */}
      <Card className="p-6 mb-6 border-l-4 border-l-danger border-red-100 bg-red-50/30">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-danger text-white">
            <Icon name="TriangleAlert" size={22} />
          </div>
          <div>
            <div className="text-[13px] font-bold text-ink mb-2 uppercase tracking-wide">Problem Statement</div>
            <p className="text-[15px] text-ink leading-relaxed font-medium">
              A vehicle-loan officer's biggest time-sink isn't selling — it's the manual document-collection loop. Requesting docs, waiting for piecemeal WhatsApp uploads, chasing, manually typing each into the CRM, and eyeballing them for errors.
            </p>
            <p className="text-[14px] text-ink-600 mt-2 leading-relaxed">
              This fragmented babysitting caps throughput at ~4–5 files/day and stretches turnaround time. The customer already wants the loan — the friction is purely operational.
            </p>
          </div>
        </div>
      </Card>

      {/* Before state */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60 mb-3">What the officer does today</div>
          <div className="space-y-2">
            {BEFORE_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger text-white mt-0.5">
                  <Icon name="X" size={12} strokeWidth={3} />
                </div>
                <span className="text-[13px] text-red-700 leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60 mb-2">Throughput cap</div>
            <div className="text-4xl font-bold text-danger">4–5</div>
            <div className="text-sm text-ink-600 mt-1">files per officer per day</div>
            <div className="text-xs text-ink-600/60 mt-2 leading-relaxed">Each file requires the same fragmented loop. The more files, the more chasing.</div>
          </Card>
          <Card className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60 mb-2">Time lost per file</div>
            <div className="text-4xl font-bold text-warn">30–45</div>
            <div className="text-sm text-ink-600 mt-1">minutes of admin per application</div>
            <div className="text-xs text-ink-600/60 mt-2 leading-relaxed">Not one block — scattered across waiting, chasing, typing, re-checking.</div>
          </Card>
          <Card className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60 mb-2">Root cause</div>
            <div className="text-sm font-semibold text-ink mt-1">Fragmentation, not volume</div>
            <div className="text-xs text-ink-600/60 mt-2 leading-relaxed">Docs arrive piecemeal. Each one needs a human to download, read, type, and check. Remove the loop → double the output.</div>
          </Card>
        </div>
      </div>

      <Callout icon="Gauge" tone="warn" title="The opportunity">
        Remove the collect-chase-verify-enter loop and the officer goes from ~4–5 to ~8–10 files/day — roughly 2× throughput — with faster TAT. Same team, same leads, more revenue.
      </Callout>
    </div>
  )
}
