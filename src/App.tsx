import { useState } from 'react'
import type { ViewId } from './types'
import { useAppStore } from './hooks/useAppStore'
import { TodayView } from './components/TodayView'
import { MockPractice } from './components/MockPractice'
import { VocabDrill } from './components/VocabDrill'
import { ProgressView } from './components/ProgressView'

const NAV: { id: ViewId; label: string }[] = [
  { id: 'today', label: '今日' },
  { id: 'mock', label: '模考' },
  { id: 'vocab', label: '练习' },
  { id: 'progress', label: '进度' },
]

export default function App() {
  const store = useAppStore()
  const [view, setView] = useState<ViewId>('today')

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#today" onClick={() => setView('today')}>
          <span className="brand-mark">口升</span>
          <span className="brand-sub">SpeakRise</span>
        </a>
        <div className="band-chip">
          <span>6.5 → 7.0</span>
          <strong>{store.state.currentBand.toFixed(1)}</strong>
        </div>
        <nav className="nav" aria-label="主导航">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={view === item.id ? 'active' : ''}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {view === 'today' && <TodayView store={store} onNavigate={setView} />}
        {view === 'mock' && (
          <MockPractice store={store} onGoVocab={() => setView('vocab')} />
        )}
        {view === 'vocab' && <VocabDrill store={store} />}
        {view === 'progress' && <ProgressView store={store} />}
      </main>
    </div>
  )
}
