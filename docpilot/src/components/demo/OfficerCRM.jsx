import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { APPLICATIONS, FIELD_DEF } from '../../data/demoScript'
import { StatusPill } from '../ui'
import Icon from '../Icon'

const STATUS_STYLES = {
  pending: { row: '', dot: 'bg-line', text: 'text-ink-600/40', label: 'Pending' },
  reading: { row: 'bg-brand-tint/40', dot: 'bg-brand animate-pulse', text: 'text-brand-dark', label: 'Reading…' },
  valid:   { row: 'bg-brand-tint/30', dot: 'bg-brand', text: 'text-brand-dark font-semibold', label: 'Valid' },
  issue:   { row: 'bg-warntint', dot: 'bg-warn', text: 'text-amber-700', label: 'Issue' },
  review:  { row: 'bg-warntint', dot: 'bg-amber-400', text: 'text-amber-700', label: 'Review' },
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

export default function OfficerCRM({ state, script, selectedId, onSelectApp, onResolve }) {
  const { checklist, fields, flags, nudge, payoff, stats, status, awaitingOfficer } = state

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
        <span className="text-[11px] text-ink-600/60">4 active · click to switch</span>
      </div>

      {/* Sticky approve-match banner */}
      <AnimatePresence>
        {awaitingOfficer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="shrink-0 overflow-hidden"
          >
            <div className="flex items-center gap-3 bg-amber-500 px-4 py-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                <Icon name="TriangleAlert" size={15} />
              </div>
              <p className="flex-1 text-[12px] font-semibold text-white leading-snug">
                Officer action required — your decision needed
              </p>
              <button
                onClick={onResolve}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-white text-amber-700 px-3 py-1.5 text-[12px] font-bold shadow hover:bg-amber-50 transition-colors"
              >
                <Icon name="Check" size={13} strokeWidth={3} />
                Approve &amp; proceed
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto">
        {/* App list — all clickable */}
        <div className="border-b border-line">
          {APPLICATIONS.map(app => (
            <button
              key={app.id}
              onClick={() => onSelectApp(app.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 border-b border-line last:border-0 text-left transition-colors
                ${selectedId === app.id ? 'bg-brand-tint/40' : 'hover:bg-mist'}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold
                ${selectedId === app.id ? 'bg-ink text-brand-light' : 'bg-mist text-ink-600'}`}>
                {app.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-semibold text-ink truncate">{app.name}</span>
                  {selectedId === app.id && (
                    <span className="rounded-full bg-brand text-white text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wide shrink-0">Active</span>
                  )}
                </div>
                <div className="text-[11px] text-ink-600 truncate">{app.loan} · {app.amount} · {app.profile}</div>
              </div>
              <StatusPill status={selectedId === app.id ? status : app.defaultStatus} />
            </button>
          ))}
        </div>

        {/* Detail view — live state for selected applicant */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-600/60">
              {script.customerName} — Checklist
            </div>
            <div className="text-[10px] text-ink-600/50">{script.checklist.length} items</div>
          </div>

          {/* Checklist */}
          <div className="space-y-1 mb-4">
            {script.checklist.map(item => {
              const st = checklist[item.key] || 'pending'
              const style = STATUS_STYLES[st]
              return (
                <motion.div
                  key={item.key}
                  layout
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${style.row}`}
                >
                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${style.dot}`} />
                  <span className="flex-1 text-[12px] text-ink">{item.label}</span>
                  <div className="flex items-center gap-1">
                    {st === 'reading' && <Icon name="Loader2" size={12} className="text-brand animate-spin" />}
                    {st === 'valid' && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
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
            {flags.map(flag => (
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
                  <div>
                    <div className="text-[13px] font-bold text-amber-800 mb-1">{flag.title}</div>
                    <p className="text-[12px] text-amber-700 leading-relaxed">{flag.body}</p>
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
                    { label: 'Docs read by AI',       value: stats.docsRead },
                    { label: 'CRM fields auto-filled', value: stats.fields },
                    { label: 'Customer chases sent',   value: stats.chases },
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
                  <div className="text-[11px] text-ink-600 mt-1">
                    {stats.escalations > 0 ? 'Human only did: review + OTP call' : 'Human only did: OTP call'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
