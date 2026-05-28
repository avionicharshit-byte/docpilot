import { Card, SectionHeader, Callout, Eyebrow } from '../ui'
import Icon from '../Icon'
import { FIELD_WORKFLOW, FIELD_INSIGHTS } from '../../data/content'

const TONE_STYLES = {
  danger: { card: 'border-red-200 bg-red-50', icon: 'bg-red-100 text-red-500', title: 'text-red-700', body: 'text-red-600/80' },
  brand: { card: 'border-brand/30 bg-brand-tint', icon: 'bg-brand/10 text-brand-dark', title: 'text-brand-dark', body: 'text-brand-dark/70' },
  neutral: { card: 'border-line bg-canvas', icon: 'bg-mist text-ink-600', title: 'text-ink', body: 'text-ink-600' },
}

export default function FieldResearch() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <SectionHeader
        eyebrow="Voice of the User"
        title="Field Research — IDFC Bank Interview"
        lead="I interviewed a frontline vehicle-loan officer at IDFC Bank. This is his real workflow, in his words. What he asked for became DocPilot."
      />

      {/* Workflow diagram */}
      <div className="mb-8">
        <Eyebrow className="mb-4">Real workflow — as he described it</Eyebrow>
        <Card className="p-6">
          <div className="flex flex-col gap-3">
            {FIELD_WORKFLOW.map((node, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold
                    ${node.pain ? 'bg-danger text-white' : 'bg-mist text-ink-600'}`}>
                    {i + 1}
                  </div>
                  {i < FIELD_WORKFLOW.length - 1 && (
                    <div className={`w-px flex-1 mt-1 min-h-[16px] ${node.pain ? 'bg-red-200' : 'bg-line'}`} />
                  )}
                </div>
                <div className={`flex-1 rounded-xl p-3 mb-1 ${node.pain ? 'bg-red-50 border border-red-200' : 'bg-mist border border-transparent'}`}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[13px] font-semibold ${node.pain ? 'text-danger' : 'text-ink'}`}>
                      {node.step}
                    </span>
                    {node.pain && (
                      <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 uppercase tracking-wide">
                        <Icon name="TriangleAlert" size={10} />
                        Manual pain
                      </span>
                    )}
                  </div>
                  <p className={`text-[12px] leading-relaxed ${node.pain ? 'text-red-600/80' : 'text-ink-600'}`}>
                    {node.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <div>
        <Eyebrow className="mb-4">Key insights from the interview</Eyebrow>
        <div className="grid grid-cols-2 gap-4">
          {FIELD_INSIGHTS.map(insight => {
            const s = TONE_STYLES[insight.tone] || TONE_STYLES.neutral
            return (
              <div key={insight.title} className={`rounded-2xl border p-5 ${s.card}`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${s.icon}`}>
                    <Icon name={insight.icon} size={18} />
                  </div>
                  <div>
                    <div className={`text-[13px] font-semibold mb-1 ${s.title}`}>{insight.title}</div>
                    <p className={`text-[12px] leading-relaxed ${s.body}`}>{insight.body}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6">
        <Callout icon="Sparkles" tone="brand" title="The punchline">
          He told us exactly what would double his throughput: (1) automate doc upload, (2) auto-tell the customer what's wrong without human interaction. That is DocPilot, word for word.
        </Callout>
      </div>
    </div>
  )
}
