import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Logo from './components/Logo'
import Overview from './components/sections/Overview'
import Research from './components/sections/Research'
import FieldResearch from './components/sections/FieldResearch'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import LiveDemo from './components/sections/LiveDemo'
import ImpactGTM from './components/sections/ImpactGTM'
import { NAV } from './data/content'

const SECTIONS = {
  overview: Overview,
  research: Research,
  field: FieldResearch,
  problem: Problem,
  solution: Solution,
  demo: LiveDemo,
  impact: ImpactGTM,
}

export default function App() {
  const [active, setActive] = useState('overview')
  const Section = SECTIONS[active] || Overview
  const mainRef = useRef(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [active])

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-canvas font-sans">
      {/* Mobile top nav */}
      <header className="md:hidden shrink-0 bg-canvas border-b border-line">
        <div className="px-4 py-3 border-b border-line">
          <Logo compact />
        </div>
        <nav className="flex overflow-x-auto gap-1 px-3 py-2">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap transition-colors
                ${active === item.id ? 'bg-brand-tint text-brand-dark' : 'text-ink-600 hover:bg-mist'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <Sidebar active={active} setActive={setActive} />
      <main ref={mainRef} className="flex-1 overflow-y-auto bg-mist">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={active === 'demo' ? 'h-full' : 'min-h-full'}
          >
            <Section setActiveSection={setActive} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
