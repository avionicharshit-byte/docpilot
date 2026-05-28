import Logo from './Logo'
import { NAV } from '../data/content'

export default function Sidebar({ active, setActive }) {
  const groups = NAV.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  return (
    <aside className="w-56 shrink-0 flex flex-col h-full border-r border-line bg-canvas overflow-y-auto">
      <div className="px-4 py-4 border-b border-line">
        <Logo />
      </div>
      <nav className="flex-1 px-2 py-4 space-y-5">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <div className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-ink-600/40">
              {group}
            </div>
            <ul className="space-y-0.5">
              {items.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setActive(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150
                      ${active === item.id
                        ? 'bg-brand-tint text-brand-dark shadow-[inset_2px_0_0_#10B981]'
                        : 'text-ink-600 hover:bg-mist hover:text-ink'
                      }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-line">
        <div className="text-[11px] text-ink-600/50 leading-relaxed">
          PM Assignment · Superleap<br />BFSI · Vehicle Lending
        </div>
      </div>
    </aside>
  )
}
