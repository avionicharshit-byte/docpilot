import { STEPS } from '../../data/demoScript'
import Icon from '../Icon'

export default function DemoControls({ stepIndex, running, awaitingOfficer, onNext, onReset }) {
  const total = STEPS.length
  const isLast = stepIndex === total - 1
  const notStarted = stepIndex === -1
  const currentStep = stepIndex >= 0 ? STEPS[stepIndex] : null
  const nextStep = !isLast ? STEPS[stepIndex + 1] : null

  const nextDisabled = running || awaitingOfficer || isLast

  return (
    <div className="border-t border-line bg-canvas px-5 py-4">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < stepIndex ? 'bg-brand w-4' :
                i === stepIndex ? 'bg-brand w-6' :
                'bg-line w-4'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-ink-600/60 font-medium">
          {notStarted ? 'Not started' : `Step ${stepIndex + 1} of ${total}`}
        </span>
      </div>

      {/* Current step label */}
      {currentStep && (
        <div className="text-[12px] text-ink font-medium mb-3 leading-snug">
          <span className="text-ink-600/60">Current: </span>{currentStep.label}
        </div>
      )}

      {/* Note callout */}
      {currentStep?.note && (
        <div className="rounded-xl bg-brand-tint border border-brand/20 px-3 py-2.5 mb-3">
          <div className="flex items-start gap-2">
            <Icon name="Sparkles" size={14} className="text-brand-dark mt-0.5 shrink-0" />
            <p className="text-[11px] text-brand-dark leading-relaxed">{currentStep.note}</p>
          </div>
        </div>
      )}

      {/* Awaiting officer notice */}
      {awaitingOfficer && (
        <div className="rounded-xl bg-warntint border border-amber-200 px-3 py-2.5 mb-3">
          <div className="flex items-start gap-2">
            <Icon name="TriangleAlert" size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-[11px] text-amber-700 leading-relaxed font-medium">
              Officer action required — click "Approve match" in the flag card to continue.
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-lg border border-line bg-mist px-3 py-2 text-[12px] font-medium text-ink-600 hover:bg-line transition-colors"
        >
          <Icon name="RotateCcw" size={13} />
          Reset
        </button>
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all
            ${nextDisabled
              ? 'bg-mist text-ink-600/40 cursor-not-allowed'
              : 'bg-ink text-white hover:bg-ink-700 shadow-card'
            }`}
        >
          {running ? (
            <>
              <Icon name="Loader2" size={14} className="animate-spin" />
              Running…
            </>
          ) : isLast ? (
            <>
              <Icon name="Check" size={14} strokeWidth={3} />
              Complete ✓
            </>
          ) : notStarted ? (
            <>
              <Icon name="Play" size={14} />
              Start Demo
            </>
          ) : (
            <>
              {nextStep?.label?.slice(0, 32)}{nextStep?.label?.length > 32 ? '…' : ''}
              <Icon name="ArrowRight" size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
