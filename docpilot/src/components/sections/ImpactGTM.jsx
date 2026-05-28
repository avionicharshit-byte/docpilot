import { Card, SectionHeader, Eyebrow, FeatureIcon } from '../ui'
import Icon from '../Icon'
import { METRICS, COST_ROWS, COST_SUMMARY, GTM } from '../../data/content'

export default function ImpactGTM() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <SectionHeader
        eyebrow="Impact & GTM"
        title="Metrics, cost model, and go-to-market"
        lead="A clear north star, a defensible cost structure, and a beachhead strategy built around the lenders who will feel the pain the most."
      />

      {/* North star */}
      <div className="mb-8">
        <Eyebrow className="mb-4">North star metric</Eyebrow>
        <Card className="p-6">
          <div className="text-[12px] font-semibold text-ink-600 mb-4">{METRICS.northStar.label}</div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-danger">{METRICS.northStar.before}</div>
              <div className="text-[11px] text-ink-600 mt-1 uppercase tracking-wide">Before</div>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <div className="h-px flex-1 bg-line" />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-glow">
                <Icon name="ArrowRight" size={18} />
              </div>
              <div className="h-px flex-1 bg-line" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-dark">{METRICS.northStar.after}</div>
              <div className="text-[11px] text-ink-600 mt-1 uppercase tracking-wide">After</div>
            </div>
            <div className="text-center ml-4 pl-6 border-l border-line">
              <div className="text-4xl font-bold text-ink">{METRICS.northStar.delta}</div>
              <div className="text-[11px] text-ink-600 mt-1 uppercase tracking-wide">Throughput gain</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Supporting metrics */}
      <div className="mb-8">
        <Eyebrow className="mb-4">Supporting metrics</Eyebrow>
        <div className="grid grid-cols-2 gap-3">
          {METRICS.supporting.map((m, i) => (
            <Card key={i} className="p-4 flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-tint text-brand-dark">
                <Icon name="BarChart3" size={15} />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-ink">{m.label}</div>
                <div className="text-[12px] text-ink-600 mt-0.5">{m.hint}</div>
              </div>
            </Card>
          ))}
        </div>
        <p className="text-[11px] text-ink-600/60 mt-3 px-1">{METRICS.tooling}</p>
      </div>

      {/* Cost model */}
      <div className="mb-8">
        <Eyebrow className="mb-4">Cost model — per file</Eyebrow>
        <Card className="overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-line bg-mist">
                <th className="text-left px-5 py-3 font-semibold text-ink-600">Component</th>
                <th className="text-right px-5 py-3 font-semibold text-ink-600">Cost / file</th>
                <th className="text-left px-5 py-3 font-semibold text-ink-600">Note</th>
              </tr>
            </thead>
            <tbody>
              {COST_ROWS.map((row, i) => (
                <tr key={i} className="border-b border-line">
                  <td className="px-5 py-3 font-medium text-ink">{row.item}</td>
                  <td className="px-5 py-3 text-right font-semibold text-ink">{row.cost}</td>
                  <td className="px-5 py-3 text-ink-600">{row.note}</td>
                </tr>
              ))}
              <tr className="bg-brand-tint">
                <td className="px-5 py-3 font-bold text-brand-dark">Total per file</td>
                <td className="px-5 py-3 text-right font-bold text-brand-dark">{COST_SUMMARY.perFile}</td>
                <td className="px-5 py-3 text-brand-dark/70">vs. {COST_SUMMARY.timeSaved} officer time saved ≈ {COST_SUMMARY.timeValue}</td>
              </tr>
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-brand/20 bg-brand/5">
            <p className="text-[12px] font-semibold text-brand-dark">{COST_SUMMARY.net}</p>
          </div>
        </Card>
      </div>

      {/* GTM */}
      <div>
        <Eyebrow className="mb-4">Go-to-market</Eyebrow>
        <div className="grid grid-cols-2 gap-4">
          {GTM.map(g => (
            <Card key={g.title} className="p-5 flex gap-4">
              <FeatureIcon name={g.icon} tone="brand" />
              <div>
                <div className="text-[13px] font-semibold text-ink mb-1">{g.title}</div>
                <p className="text-[12px] text-ink-600 leading-relaxed">{g.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
