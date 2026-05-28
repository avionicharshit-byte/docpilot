import { useReducer, useState, useRef, useEffect } from 'react'
import { DEMO_SCRIPTS, APPLICATIONS, buildInitialState } from '../../data/demoScript'
import OfficerCRM from '../demo/OfficerCRM'
import WhatsAppChat from '../demo/WhatsAppChat'
import DemoControls from '../demo/DemoControls'
import { Eyebrow } from '../ui'

let msgId = 0
const nextId = () => ++msgId

function reducer(state, action) {
  switch (action.type) {
    case 'TYPING':
      return { ...state, typing: action.on }
    case 'CHAT':
      return { ...state, chat: [...state.chat, { ...action.msg, id: nextId() }] }
    case 'CHECK':
      return { ...state, checklist: { ...state.checklist, [action.key]: action.status } }
    case 'FIELD':
      return { ...state, fields: { ...state.fields, [action.key]: action.value } }
    case 'STATUS':
      return { ...state, status: action.value }
    case 'FLAG':
      return { ...state, flags: [...state.flags, action.flag] }
    case 'AWAIT':
      return { ...state, awaitingOfficer: action.on }
    case 'NUDGE':
      return { ...state, nudge: action.text }
    case 'PAYOFF':
      return { ...state, payoff: action.on }
    case 'STAT':
      return {
        ...state,
        stats: {
          docsRead:     state.stats.docsRead     + (action.docsRead     || 0),
          fields:       state.stats.fields       + (action.fields       || 0),
          chases:       state.stats.chases       + (action.chases       || 0),
          escalations:  state.stats.escalations  + (action.escalations  || 0),
        },
      }
    case 'RESOLVE': {
      const { resolve } = action
      return {
        ...state,
        awaitingOfficer: false,
        flags: state.flags.filter(f => f.id !== resolve.flag),
        fields: resolve.field
          ? { ...state.fields, [resolve.field.key]: resolve.field.value }
          : state.fields,
        checklist: { ...state.checklist, [resolve.checklist.key]: resolve.checklist.status },
      }
    }
    case 'RESET':
      return buildInitialState(action.script)
    case 'LOAD':
      return { ...action.state, running: false, awaitingOfficer: action.state.awaitingOfficer || false }
    default:
      return state
  }
}

export default function LiveDemo() {
  const [selectedId, setSelectedId] = useState('rahul')
  const script = DEMO_SCRIPTS[selectedId]

  const [state, dispatch] = useReducer(reducer, buildInitialState(script))
  const [stepIndex, setStepIndex] = useState(-1)
  const [running, setRunning] = useState(false)
  const timeoutsRef = useRef([])

  function clearAll() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setStepIndex(-1)
    setRunning(false)
  }

  // Load preloaded state (or fresh) when applicant changes
  useEffect(() => {
    clearAll()
    const s = DEMO_SCRIPTS[selectedId]
    if (s.preloadedState) {
      dispatch({ type: 'LOAD', state: s.preloadedState })
      setStepIndex(s.preloadedStepIndex)
    } else {
      dispatch({ type: 'RESET', script: s })
    }
  }, [selectedId])

  function advanceStep() {
    const nextIndex = stepIndex + 1
    if (running || state.awaitingOfficer || nextIndex >= script.steps.length) return

    setRunning(true)
    setStepIndex(nextIndex)

    const step = script.steps[nextIndex]
    let maxAt = 0

    step.events.forEach(event => {
      if (event.at > maxAt) maxAt = event.at
      const { at, ...action } = event
      const id = setTimeout(() => dispatch(action), at)
      timeoutsRef.current.push(id)
    })

    const finishId = setTimeout(() => setRunning(false), maxAt + 200)
    timeoutsRef.current.push(finishId)
  }

  function reset() {
    clearAll()
    dispatch({ type: 'RESET', script })
  }

  function resolveFlag() {
    if (!script.resolve) return
    dispatch({ type: 'RESOLVE', resolve: script.resolve })
  }

  const selectedApp = APPLICATIONS.find(a => a.id === selectedId)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top bar */}
      <div className="shrink-0 px-6 py-3 border-b border-line bg-canvas flex items-start justify-between">
        <div>
          <Eyebrow className="mb-0.5">Live Demo</Eyebrow>
          <div className="text-[15px] font-bold text-ink">DocPilot in action</div>
          <p className="text-[12px] text-ink-600 mt-0.5">
            Select any applicant · step through their scenario · Left = CRM · Right = WhatsApp
          </p>
        </div>
        {/* Scenario badge */}
        <div className="text-right">
          <div className="text-[11px] font-semibold text-ink">{selectedApp?.name}</div>
          <div className="text-[11px] text-ink-600">{selectedApp?.loan} · {selectedApp?.profile}</div>
          <div className="text-[11px] text-brand-dark font-medium mt-0.5">
            {script.steps.length} steps · {script.steps.some(s => s.events.some(e => e.type === 'AWAIT')) ? 'includes officer escalation' : 'fully automated'}
          </div>
        </div>
      </div>

      {/* Two-panel demo */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Officer CRM */}
        <div className="flex flex-col w-[44%] border-r border-line overflow-hidden bg-canvas">
          <div className="shrink-0 px-4 py-2 border-b border-line bg-mist flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-danger/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-warn/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-brand/60" />
            <span className="ml-2 text-[11px] text-ink-600/60 font-medium">Superleap CRM — Officer view</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <OfficerCRM
              state={state}
              script={script}
              selectedId={selectedId}
              onSelectApp={setSelectedId}
              onResolve={resolveFlag}
            />
          </div>
        </div>

        {/* Right: WhatsApp + Controls */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="shrink-0 px-4 py-2 border-b border-line bg-mist flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-danger/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-warn/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-brand/60" />
            <span className="ml-2 text-[11px] text-ink-600/60 font-medium">Customer WhatsApp — {script.customerName}</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <WhatsAppChat chat={state.chat} typing={state.typing} customerName={script.customerName} customerPhone={script.customerPhone} />
          </div>
          <DemoControls
            stepIndex={stepIndex}
            steps={script.steps}
            running={running}
            awaitingOfficer={state.awaitingOfficer}
            onNext={advanceStep}
            onReset={reset}
          />
        </div>
      </div>
    </div>
  )
}
