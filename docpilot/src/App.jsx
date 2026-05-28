import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Overview from './components/sections/Overview'
import Research from './components/sections/Research'
import FieldResearch from './components/sections/FieldResearch'
import Problem from './components/sections/Problem'
import Solution from './components/sections/Solution'
import LiveDemo from './components/sections/LiveDemo'
import ImpactGTM from './components/sections/ImpactGTM'

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

  return (
    <div className="flex h-screen overflow-hidden bg-canvas font-sans">
      <Sidebar active={active} setActive={setActive} />
      <main className="flex-1 overflow-y-auto bg-mist">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="min-h-full"
          >
            <Section setActiveSection={setActive} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
