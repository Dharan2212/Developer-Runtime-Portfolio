import { AnimatePresence, motion } from 'framer-motion'
import { runtimeModules } from './data/runtimeContent'
import { useRuntimeStore } from './store/runtimeStore'

const modes = ['Overview', 'Deep', 'Signal'] as const
const signals = ['foundational', 'validation', 'intelligence'] as const

function App() {
  const {
    mode,
    userState,
    activeModule,
    selectedSignal,
    inspectorOpen,
    failureVisible,
    invocations,
    movementLog,
    setMode,
    contextShift,
    drillDown,
    lateralShift,
    toggleInspector,
    toggleFailure,
    setSignal,
  } = useRuntimeStore()

  const active = runtimeModules.find((module) => module.key === activeModule) ?? runtimeModules[0]

  return (
    <div className="min-h-screen bg-[#05070b] text-slate-200">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-12 grid-rows-[3.5rem_1fr_4rem] gap-4 p-4">
        <header className="col-span-12 flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/80 px-4 text-sm">
          <div className="flex items-center gap-6 text-slate-400">
            <span className="font-medium text-slate-200">System Bar</span>
            <span>State: {userState}</span>
            <span>Mode: {mode}</span>
            <span>Runtime invocations: {invocations}</span>
          </div>
          <div className="flex gap-2">
            {modes.map((item) => (
              <button
                key={item}
                onClick={() => setMode(item)}
                className={`rounded border px-2 py-1 text-xs ${
                  mode === item ? 'border-slate-500 text-slate-100' : 'border-slate-800 text-slate-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </header>

        <aside className="col-span-2 rounded-md border border-slate-800 bg-slate-950/80 p-3">
          <p className="mb-3 text-xs uppercase tracking-widest text-slate-500">Context Pane</p>
          <div className="space-y-2">
            {runtimeModules.map((module) => (
              <button
                key={module.key}
                onClick={() => contextShift(module.key)}
                className={`w-full rounded border px-3 py-2 text-left text-sm ${
                  module.key === activeModule
                    ? 'border-slate-500 bg-slate-900 text-slate-100'
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                {module.title}
              </button>
            ))}
          </div>
        </aside>

        <main className="col-span-7 rounded-md border border-slate-800 bg-slate-950/80 p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500">Active Surface</p>
          <motion.div
            key={`${active.key}-${mode}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="mt-4 space-y-4"
          >
            <h1 className="text-2xl font-semibold text-slate-100">{active.title}</h1>
            <p className="max-w-3xl text-slate-300">{active.statement}</p>

            <section className="grid grid-cols-3 gap-3 text-sm">
              <TierCard title="Tier 1 · Immediate signals" items={active.tier1} />
              <TierCard title="Tier 2 · Discoverable depth" items={active.tier2} />
              <TierCard
                title="Tier 3 · Inspector-only"
                items={userState === 'Inspector' || userState === 'Evaluator' || userState === 'Connector' ? active.tier3 : ['Locked until inspector intent is signaled.']}
              />
            </section>
          </motion.div>

          <div className="mt-6 flex gap-3">
            <ActionButton label="Drill Down" onClick={drillDown} />
            <ActionButton label="Lateral Shift" onClick={lateralShift} />
            <ActionButton label={inspectorOpen ? 'Close Inspector' : 'Open Inspector'} onClick={toggleInspector} />
          </div>
        </main>

        <section className="col-span-3 rounded-md border border-slate-800 bg-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">Inspector Drawer</p>
          <AnimatePresence mode="wait">
            {inspectorOpen ? (
              <motion.div
                key="open"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mt-3 space-y-3 text-sm"
              >
                <p className="text-slate-200">Technical surface for tradeoffs, edge cases, and failures.</p>
                <p className="text-xs text-slate-400">Movement log: {movementLog.join(' → ') || 'No movement yet.'}</p>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Signal layer</p>
                  {signals.map((signal) => (
                    <button
                      key={signal}
                      onClick={() => setSignal(signal)}
                      className={`mr-2 rounded border px-2 py-1 text-xs ${
                        selectedSignal === signal ? 'border-slate-500 text-slate-100' : 'border-slate-800 text-slate-400'
                      }`}
                    >
                      {signal}
                    </button>
                  ))}
                </div>

                <button onClick={toggleFailure} className="rounded border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  {failureVisible ? 'Hide Failure Strategy' : 'Show Failure Strategy'}
                </button>

                {failureVisible && (
                  <div className="rounded border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-300">
                    <p className="mb-2 text-slate-200">Failure log (contextual, opt-in, unemotional)</p>
                    <ul className="list-disc space-y-1 pl-5">
                      {active.failures.map((failure) => (
                        <li key={failure}>{failure}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 text-sm text-slate-500">
                Inspector closed. Open to access tier-3 evidence and failure context.
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <footer className="col-span-12 flex items-center justify-between rounded-md border border-slate-800 bg-slate-950/80 px-4 text-xs text-slate-400">
          <span>Exit Surface · Quiet endpoint for technical connection</span>
          <a className="rounded border border-slate-700 px-3 py-1 text-slate-300" href="mailto:runtime@system.dev">
            Establish channel
          </a>
        </footer>
      </div>
    </div>
  )
}

function TierCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded border border-slate-800 bg-slate-900/50 p-3">
      <h2 className="mb-2 text-xs uppercase tracking-wide text-slate-400">{title}</h2>
      <ul className="space-y-1 text-slate-300">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </article>
  )
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded border border-slate-700 px-3 py-1 text-sm text-slate-200 hover:border-slate-500">
      {label}
    </button>
  )
}

export default App
