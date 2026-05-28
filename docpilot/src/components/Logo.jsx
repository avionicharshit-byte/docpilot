export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink">
        <span className="text-base font-bold text-brand-light">S</span>
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold tracking-tight text-ink">superleap</span>
            <span className="rounded-md bg-brand-tint px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-dark ring-1 ring-brand/20">
              DocPilot
            </span>
          </div>
          <div className="text-[10px] text-ink-600">AI document agent</div>
        </div>
      )}
    </div>
  )
}
