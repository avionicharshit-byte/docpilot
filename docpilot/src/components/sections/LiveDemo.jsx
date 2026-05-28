import { useReducer, useState, useRef } from 'react'
import { INITIAL_STATE, STEPS, RESOLVE_EVENT } from '../../data/demoScript'
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
          docsRead: state.stats.docsRead + (action.docsRead || 0),
          fields: state.stats.fields + (action.fields || 0),
          chases: state.stats.chases + (action.chases || 0),
          escalations: state.stats.escalations + (action.escalations || 0),
        },
      }
    case 'RESOLVE':
      return {
        ...state,
        awaitingOfficer: false,
        flags: state.flags.filter(f => f.id !== RESOLVE_EVENT.flag),
        fields: { ...state.fields, [RESOLVE_EVENT.field.key]: RESOLVE_EVENT.field.value },
        checklist: { ...state.checklist, [RESOLVE_EVENT.checklist.key]: RESOLVE_EVENT.checklist.status },
      }
    case 'RESET':
      return { ...INITIAL_STATE, chat: [], checklist: { ...INITIAL_STATE.checklist }, fields: { ...INITIAL_STATE.fields }, flags: [], stats: { docsRead: 0, fields: 0, chases: 0, escalations: 0 } }
    default:
      return state
  }
}

export default function LiveDemo() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [stepIndex, setStepIndex] = useState(-1)
  const [running, setRunning] = useState(false)
  const timeoutsRef = useRef([])

  function advanceStep() {
    const nextIndex = stepIndex + 1
    if (running || state.awaitingOfficer || nextIndex >= STEPS.length) return

    setRunning(true)
    setStepIndex(nextIndex)

    const step = STEPS[nextIndex]
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
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setStepIndex(-1)
    setRunning(false)
    dispatch({ type: 'RESET' })
  }

  function resolveFlag() {
    dispatch({ type: 'RESOLVE' })
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top bar */}
      <div className="shrink-0 px-6 py-4 border-b border-line bg-canvas">
        <Eyebrow className="mb-0.5">Live Demo</Eyebrow>
        <div className="text-[15px] font-bold text-ink">DocPilot in action — walk through a real loan file</div>
        <p className="text-[12px] text-ink-600 mt-0.5">
          Left: officer's CRM view &nbsp;·&nbsp; Right: customer's WhatsApp &nbsp;·&nbsp; Use the controls to step through
        </p>
      </div>

      {/* Two-panel demo */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Officer CRM */}
        <div className="flex flex-col w-[42%] border-r border-line overflow-hidden bg-canvas">
          <div className="shrink-0 px-4 py-2.5 border-b border-line bg-mist flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-brand/70" />
            <span className="ml-2 text-[11px] text-ink-600/60 font-medium">Superleap CRM — Officer view</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <OfficerCRM state={state} onResolve={resolveFlag} />
          </div>
        </div>

        {/* Right: WhatsApp + Controls */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="shrink-0 px-4 py-2.5 border-b border-line bg-mist flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-warn/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-brand/70" />
            <span className="ml-2 text-[11px] text-ink-600/60 font-medium">Customer WhatsApp — Rahul Sharma</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <WhatsAppChat chat={state.chat} typing={state.typing} />
          </div>
          <DemoControls
            stepIndex={stepIndex}
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
