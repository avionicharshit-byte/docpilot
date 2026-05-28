import Icon from './Icon.jsx'

export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-canvas shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-dark ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeader({ eyebrow, title, lead }) {
  return (
    <header className="mb-8 max-w-3xl">
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <h1 className="text-balance text-3xl font-bold tracking-tight text-ink sm:text-[34px] sm:leading-[1.1]">
        {title}
      </h1>
      {lead && <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{lead}</p>}
    </header>
  )
}

const PILL_TONES = {
  brand: 'bg-brand-tint text-brand-dark ring-1 ring-brand/20',
  neutral: 'bg-mist text-ink-600 ring-1 ring-line',
  warn: 'bg-warntint text-amber-700 ring-1 ring-amber-200',
  danger: 'bg-red-50 text-red-600 ring-1 ring-red-200',
  ink: 'bg-ink text-white',
}

export function Pill({ tone = 'neutral', children, className = '', dot = false }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${PILL_TONES[tone]} ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

const STATUS_TONES = {
  'Collecting docs': 'neutral',
  Validating: 'warn',
  'Ready for OTP': 'brand',
}
export function StatusPill({ status }) {
  return (
    <Pill tone={STATUS_TONES[status] || 'neutral'} dot>
      {status}
    </Pill>
  )
}

const CALLOUT_TONES = {
  brand: { wrap: 'border-brand/30 bg-brand-tint', icon: 'text-brand-dark', title: 'text-brand-dark' },
  warn: { wrap: 'border-amber-200 bg-warntint', icon: 'text-amber-600', title: 'text-amber-800' },
  ink: { wrap: 'border-ink-600/20 bg-ink text-white', icon: 'text-brand-light', title: 'text-white' },
}
export function Callout({ tone = 'brand', icon = 'Sparkles', title, children }) {
  const t = CALLOUT_TONES[tone] || CALLOUT_TONES.brand
  return (
    <div className={`rounded-2xl border p-5 ${t.wrap}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 shrink-0 ${t.icon}`}>
          <Icon name={icon} size={20} strokeWidth={2} />
        </div>
        <div>
          {title && <div className={`text-sm font-semibold ${t.title}`}>{title}</div>}
          <div className={`text-sm leading-relaxed ${tone === 'ink' ? 'text-white/80' : 'text-ink-600'} ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export function StatCard({ label, value, sub, accent = false }) {
  return (
    <Card className={`p-5 ${accent ? 'bg-ink text-white border-ink' : ''}`}>
      <div className={`text-3xl font-bold tracking-tight ${accent ? 'text-brand-light' : 'text-ink'}`}>
        {value}
      </div>
      <div className={`mt-1 text-sm font-medium ${accent ? 'text-white' : 'text-ink'}`}>{label}</div>
      {sub && <div className={`mt-1 text-xs ${accent ? 'text-white/60' : 'text-ink-600'}`}>{sub}</div>}
    </Card>
  )
}

export function FeatureIcon({ name, tone = 'brand', size = 'md' }) {
  const tones = {
    brand: 'bg-brand-tint text-brand-dark',
    warn: 'bg-warntint text-amber-600',
    danger: 'bg-red-50 text-red-500',
    ink: 'bg-ink text-brand-light',
    neutral: 'bg-mist text-ink-600',
  }
  const box = size === 'lg' ? 'h-12 w-12 rounded-xl' : 'h-10 w-10 rounded-xl'
  return (
    <div className={`flex shrink-0 items-center justify-center ${box} ${tones[tone]}`}>
      <Icon name={name} size={size === 'lg' ? 24 : 20} strokeWidth={2} />
    </div>
  )
}
