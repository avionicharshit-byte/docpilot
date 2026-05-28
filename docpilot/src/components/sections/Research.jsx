import { Card, SectionHeader, Pill, Eyebrow } from '../ui'
import Icon from '../Icon'
import { LOAN_LIFECYCLE, VERIFIED_FACTS } from '../../data/content'

export default function Research() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <SectionHeader
        eyebrow="Research"
        title="Digital Vehicle Lending in India"
        lead="India's digital lending market was projected near $1.3 trillion in disbursements by 2025. Vehicle loans — new and used — are a major slice. We focused on the frontline CRM operation: who does the work, and where time bleeds."
      />

      {/* Loan lifecycle */}
      <div className="mb-8">
        <Eyebrow className="mb-4">The loan lifecycle</Eyebrow>
        <Card className="p-6">
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {LOAN_LIFECYCLE.map((node, i) => (
              <div key={node.label} className="flex items-center shrink-0">
                <div className={`flex flex-col items-center gap-2 w-[100px] ${node.chokepoint ? '' : ''}`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-card
                    ${node.chokepoint ? 'bg-danger text-white ring-2 ring-red-400/30' : 'bg-mist text-ink-600'}`}>
                    <Icon name={node.icon} size={20} />
                  </div>
                  <div className={`text-center text-[11px] font-medium leading-tight px-1
                    ${node.chokepoint ? 'text-danger font-bold' : 'text-ink-600'}`}>
                    {node.label}
                    {node.chokepoint && (
                      <div className="mt-1">
                        <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-bold text-red-600 uppercase tracking-wide">
                          Chokepoint
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {i < LOAN_LIFECYCLE.length - 1 && (
                  <div className={`h-px w-4 shrink-0 ${node.chokepoint ? 'bg-danger/40' : 'bg-line'}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-[12px] text-ink-600/70 mt-4 border-t border-line pt-3">
            Document Collection is the chokepoint — most human time burned, most silent customer drop-off. Every other stage is faster or automated; this one is still manual.
          </p>
        </Card>
      </div>

      {/* Verified facts */}
      <div className="mb-8">
        <Eyebrow className="mb-4">Verified industry facts</Eyebrow>
        <div className="grid grid-cols-2 gap-4">
          {VERIFIED_FACTS.map(fact => (
            <Card key={fact.title} className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-[13px] font-semibold text-ink">{fact.title}</div>
                <Pill tone="neutral" className="shrink-0 text-[10px]">{fact.tag}</Pill>
              </div>
              <p className="text-[13px] text-ink-600 leading-relaxed">{fact.body}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* The User */}
      <div>
        <Eyebrow className="mb-4">The user</Eyebrow>
        <Card className="p-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink text-brand-light">
              <Icon name="User" size={26} />
            </div>
            <div className="flex-1">
              <div className="text-base font-bold text-ink mb-0.5">Frontline Loan Officer</div>
              <div className="text-[13px] text-ink-600 mb-4">Also called: tele-sales officer · credit officer · relationship manager</div>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-mist p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-600/60 mb-1">Tools today</div>
                  <div className="text-[12px] text-ink font-medium">Salesforce + Excel + WhatsApp</div>
                </div>
                <div className="rounded-xl bg-mist p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-600/60 mb-1">Responsibility</div>
                  <div className="text-[12px] text-ink font-medium">Owns each lead from application through disbursal</div>
                </div>
                <div className="rounded-xl bg-mist p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-600/60 mb-1">Pain point</div>
                  <div className="text-[12px] text-ink font-medium">Juggles many files at different doc stages simultaneously</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
