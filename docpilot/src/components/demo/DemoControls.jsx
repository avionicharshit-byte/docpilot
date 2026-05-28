import { motion } from 'framer-motion'
import Icon from '../Icon'

export default function DemoControls({ stepIndex, steps = [], running, awaitingOfficer, onNext, onReset }) {
  const total = steps.length
  const isLast = stepIndex === total - 1
  const notStarted = stepIndex === -1
  const currentStep = stepIndex >= 0 ? steps[stepIndex] : null
  const nextStep = !isLast ? steps[stepIndex + 1] : null

  const nextDisabled = running || awaitingOfficer || isLast
  const isActionable = !nextDisabled

  return (
    <div className="border-t border-line bg-canvas px-5 py-4 shrink-0">
      {/* Progress dots */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < stepIndex  ? 'bg-brand w-4' :
                i === stepIndex ? 'bg-brand w-6' :
                'bg-line w-4'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-ink-600/60 font-medium">
          {notStarted ? 'Ready to start' : `Step ${stepIndex + 1} of ${total}`}
        </span>
      </div>

      {/* Current step label */}
      {currentStep && (
        <div className="text-[12px] text-ink font-medium mb-3 leading-snug">
          <span className="text-ink-600/50">Current: </span>{currentStep.label}
        </div>
      )}

      {/* Step note */}
      {currentStep?.note && (
        <div className="rounded-xl bg-brand-tint border border-brand/20 px-3 py-2.5 mb-3">
          <div className="flex items-start gap-2">
            <Icon name="Sparkles" size={14} className="text-brand-dark mt-0.5 shrink-0" />
            <p className="text-[11px] text-brand-dark leading-relaxed">{currentStep.note}</p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Reset */}
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 rounded-lg border border-line bg-mist px-3 py-2 text-[12px] font-medium text-ink-600 hover:bg-line transition-colors"
        >
          <Icon name="RotateCcw" size={13} />
          Reset
        </motion.button>

        {/* Primary action button */}
        <div className="relative flex-1">
          {/* Pulse-glow ring when idle and actionable */}
          {isActionable && !running && (
            <span className="absolute inset-0 rounded-xl bg-ink/20 animate-ping" style={{ animationDuration: '1.8s' }} />
          )}
          <motion.button
            onClick={onNext}
            disabled={nextDisabled}
            whileHover={isActionable ? { scale: 1.02, y: -1 } : {}}
            whileTap={isActionable ? { scale: 0.97 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`relative w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-colors
              ${nextDisabled
                ? 'bg-mist text-ink-600/40 cursor-not-allowed'
                : 'bg-ink text-white shadow-cardlg'
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
                <Icon name="Play" size={15} />
                Start Demo
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                >
                  <Icon name="ArrowRight" size={15} />
                </motion.span>
              </>
            ) : (
              <>
                <span className="truncate max-w-[160px]">
                  {nextStep?.label?.slice(0, 30)}{nextStep?.label?.length > 30 ? '…' : ''}
                </span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                  <Icon name="ArrowRight" size={14} />
                </motion.span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
