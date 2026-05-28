import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPLICATIONS, CHECKLIST_DEF, FIELD_DEF } from '../../data/demoScript'
import { StatusPill, Card } from '../ui'
import Icon from '../Icon'

const STATUS_ICONS = {
  pending: null,
  reading: 'Loader2',
  valid: 'Check',
  issue: 'TriangleAlert',
  review: 'Clock',
}

const STATUS_STYLES = {
  pending: { row: '', dot: 'bg-line', text: 'text-ink-600/40', label: 'Pending' },
  reading: { row: 'bg-brand-tint/40', dot: 'bg-brand animate-pulse', text: 'text-brand-dark', label: 'Reading…' },
  valid: { row: 'bg-brand-tint/30', dot: 'bg-brand', text: 'text-brand-dark font-semibold', label: 'Valid' },
  issue: { row: 'bg-warntint', dot: 'bg-warn', text: 'text-amber-700', label: 'Issue' },
  review: { row: 'bg-warntint', dot: 'bg-amber-400', text: 'text-amber-700', label: 'Review' },
}

function FlashField({ value }) {
  const [flash, setFlash] = useState(false)
  const prevRef = useRef(value)

  useEffect(() => {
    if (value && value !== prevRef.current) {
      setFlash(true)
      const id = setTimeout(() => setFlash(false), 800)
      prevRef.current = value
      return () => clearTimeout(id)
    }
  }, [value])

  return (
    <span className={`text-[12px] font-medium transition-colors duration-300 ${flash ? 'text-brand-dark' : value ? 'text-ink' : 'text-ink-600/30'}`}>
      {value || '—'}
    </span>
  )
}

export default function OfficerCRM({ state, onResolve }) {
  const { checklist, fields, flags, nudge, payoff, stats, status } = state

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-canvas shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-brand-light">
            <Icon name="LayoutDashboard" size={14} />
          </div>
          <span className="text-[13px] font-semibold text-ink">Loan Applications</span>
        </div>
        <span className="text-[11px] text-ink-600/60">4 active</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* App list */}
        <div className="border-b border-line">
          {APPLICATIONS.map(app => (
            <div
              key={app.id}
              className={`flex items-center gap-3 px-4 py-3 border-b border-line last:border-0 cursor-default
                ${app.interactive ? 'bg-brand-tint/30' : ''}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold
                ${app.interactive ? 'bg-ink text-brand-light' : 'bg-mist text-ink-600'}`}>
                {app.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-ink truncate">{app.name}</span>
                  {app.interactive && (
                    <span className="rounded-full bg-brand text-white text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wide shrink-0">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-ink-600 truncate">{app.loan} · {app.amount}</div>
              </div>
              <StatusPill status={app.interactive ? status : app.status} />
            </div>
          ))}
        </div>

        {/* Detail view for Rahul */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60">Rahul Sharma — Document Checklist</div>
          </div>

          {/* Checklist */}
          <div className="space-y-1 mb-4">
            {CHECKLIST_DEF.map(item => {
              const st = checklist[item.key] || 'pending'
              const style = STATUS_STYLES[st]
              const iconName = STATUS_ICONS[st]
              return (
                <AnimatePresence key={item.key} mode="wait">
                  <motion.div
                    layout
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${style.row}`}
                  >
                    <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${style.dot}`} />
                    <span className="flex-1 text-[12px] text-ink">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {st === 'reading' && (
                        <Icon name="Loader2" size={12} className="text-brand animate-spin" />
                      )}
                      {st === 'valid' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white"
                        >
                          <Icon name="Check" size={10} strokeWidth={3} />
                        </motion.div>
                      )}
                      {(st === 'issue' || st === 'review') && (
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full ${st === 'issue' ? 'bg-warn text-white' : 'bg-amber-200 text-amber-700'}`}>
                          <Icon name={st === 'issue' ? 'TriangleAlert' : 'Clock'} size={10} />
                        </div>
                      )}
                      <span className={`text-[11px] ${style.text}`}>{style.label}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )
            })}
          </div>

          {/* CRM Fields */}
          <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60 mb-2">Auto-filled CRM fields</div>
          <div className="rounded-xl border border-line overflow-hidden mb-4">
            {FIELD_DEF.map((f, i) => (
              <div key={f.key} className={`flex items-center gap-3 px-3 py-2.5 ${i < FIELD_DEF.length - 1 ? 'border-b border-line' : ''}`}>
                <span className="text-[11px] text-ink-600/60 w-24 shrink-0">{f.label}</span>
                <FlashField value={fields[f.key]} />
              </div>
            ))}
          </div>

          {/* Flag card */}
          <AnimatePresence>
            {flags.length > 0 && flags.map(flag => (
              <motion.div
                key={flag.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-2xl border-2 border-amber-300 bg-warntint p-4 mb-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warn text-white">
                    <Icon name="TriangleAlert" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-amber-800 mb-1">{flag.title}</div>
                    <p className="text-[12px] text-amber-700 leading-relaxed mb-3">{flag.body}</p>
                    {state.awaitingOfficer && (
                      <button
                        onClick={onResolve}
                        className="inline-flex items-center gap-2 rounded-lg bg-ink text-white px-3 py-2 text-[12px] font-semibold hover:bg-ink-700 transition-colors shadow-card"
                      >
                        <Icon name="Check" size={13} strokeWidth={3} />
                        Approve match — proceed
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Nudge bar */}
          <AnimatePresence>
            {nudge && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-ink text-white px-4 py-3 mb-4 flex items-start gap-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/20 text-brand-light mt-0.5">
                  <Icon name="Zap" size={14} />
                </div>
                <p className="text-[12px] text-white/90 leading-relaxed">{nudge}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Payoff card */}
          <AnimatePresence>
            {payoff && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border-2 border-brand bg-brand-tint p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
                    <Icon name="Sparkles" size={16} />
                  </div>
                  <div className="text-[13px] font-bold text-brand-dark">DocPilot delivered — file complete</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: 'Docs read by AI', value: stats.docsRead },
                    { label: 'CRM fields auto-filled', value: stats.fields },
                    { label: 'Customer chases sent', value: stats.chases },
                    { label: 'Escalations to officer', value: stats.escalations },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl bg-white p-3 shadow-card">
                      <div className="text-xl font-bold text-brand-dark">{s.value}</div>
                      <div className="text-[11px] text-ink-600">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-white p-3 shadow-card text-center">
                  <div className="text-[12px] font-bold text-ink">Manual typing by officer</div>
                  <div className="text-3xl font-bold text-danger mt-1">0</div>
                  <div className="text-[11px] text-ink-600 mt-1">Human only did: name review + OTP call</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
