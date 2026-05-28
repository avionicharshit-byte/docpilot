import { useEffect, useRef } from 'react'
import Icon from '../Icon'

const DOC_COLORS = {
  pan: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', label: 'PAN Card' },
  aadhaar: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-500', label: 'Aadhaar' },
  salary: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', label: 'Salary Slip' },
  itr: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-500', label: 'Form 16 / ITR' },
  address: { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'text-teal-500', label: 'Address Proof' },
  batch: { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-500', label: 'Multiple docs' },
  photo: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-500', label: 'Photo' },
}

function DocCard({ doc, caption }) {
  const c = DOC_COLORS[doc] || DOC_COLORS.pan
  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-3 flex items-center gap-3 min-w-[180px]`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-card ${c.icon}`}>
        <Icon name="FileText" size={18} />
      </div>
      <div>
        <div className="text-[12px] font-semibold text-ink">{c.label}</div>
        <div className="text-[11px] text-ink-600">{caption}</div>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-end mb-2 mr-2">
      <div className="bg-[#DCF8C6] rounded-2xl rounded-tr-sm px-4 py-2.5 shadow-card">
        <div className="flex items-center gap-1 h-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-2 w-2 rounded-full bg-[#075E54]/40 animate-pulseDot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function WhatsAppChat({ chat, typing }) {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.length, typing])

  return (
    <div className="flex flex-col h-full bg-[#ECE5DD]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
          <Icon name="User" size={18} />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-white">Rahul Sharma</div>
          <div className="text-[11px] text-white/60">+91 98765 43210</div>
        </div>
        <div className="ml-auto">
          <Icon name="Phone" size={18} className="text-white/60" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
        {chat.length === 0 && (
          <div className="flex justify-center mt-6">
            <div className="rounded-full bg-black/10 px-3 py-1.5 text-[11px] text-[#075E54]/80 text-center max-w-[240px]">
              Messages are end-to-end encrypted. DocPilot processes documents securely — no data retained.
            </div>
          </div>
        )}

        {chat.map((msg) => {
          if (msg.kind === 'note') {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <div className="rounded-full bg-black/10 px-3 py-1.5 text-[11px] text-[#075E54]/80 text-center max-w-[280px]">
                  {msg.text}
                </div>
              </div>
            )
          }

          const isDocpilot = msg.from === 'docpilot'

          return (
            <div key={msg.id} className={`flex ${isDocpilot ? 'justify-end' : 'justify-start'} mb-1`}>
              {!isDocpilot && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#128C7E] text-white mr-1.5 mt-1 self-end">
                  <Icon name="User" size={13} />
                </div>
              )}
              <div className={`max-w-[78%] ${isDocpilot ? 'items-end' : 'items-start'} flex flex-col`}>
                {msg.kind === 'image' ? (
                  <div className={`rounded-2xl ${isDocpilot ? 'rounded-tr-sm' : 'rounded-tl-sm'} bg-white p-2 shadow-card`}>
                    <DocCard doc={msg.doc} caption={msg.caption} />
                    <div className="flex justify-end mt-1">
                      <span className="text-[10px] text-ink-600/40">
                        {isDocpilot && <Icon name="CheckCheck" size={12} className="inline text-[#34B7F1] mr-0.5" />}
                        just now
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`rounded-2xl px-3.5 py-2.5 shadow-card
                    ${isDocpilot
                      ? 'bg-[#DCF8C6] rounded-tr-sm'
                      : 'bg-white rounded-tl-sm'
                    }`}
                  >
                    <p className="text-[13px] text-[#111] leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <div className="flex justify-end items-center gap-1 mt-0.5">
                      <span className="text-[10px] text-ink-600/40">just now</span>
                      {isDocpilot && <Icon name="CheckCheck" size={12} className="text-[#34B7F1]" />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {typing && <TypingIndicator />}
        <div ref={endRef} />
      </div>

      {/* Input bar (decorative) */}
      <div className="flex items-center gap-2 bg-[#F0F0F0] px-3 py-2.5 shrink-0 border-t border-black/10">
        <div className="flex-1 rounded-full bg-white px-4 py-2 text-[12px] text-ink-600/40 shadow-card">
          Message
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#075E54] text-white">
          <Icon name="Send" size={15} />
        </div>
      </div>
    </div>
  )
}
