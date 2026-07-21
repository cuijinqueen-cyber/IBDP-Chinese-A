import { useState } from 'react'
import type { AppStore } from '../hooks/useAppStore'
import type { PracticeMode } from '../types'
import { VocabGames } from './VocabGames'
import { WritingPractice } from './WritingPractice'
import { SpeakingPractice } from './SpeakingPractice'

interface VocabDrillProps {
  store: AppStore
}

const MODES: { id: PracticeMode; label: string; desc: string }[] = [
  { id: 'games', label: '词汇游戏', desc: '配对 · 填空 · 极速选义' },
  { id: 'writing', label: '写作练习', desc: '重点词 + 重点句型' },
  { id: 'speaking', label: '口语练习', desc: '跟读录音 + 目标表达' },
]

export function VocabDrill({ store }: VocabDrillProps) {
  const [mode, setMode] = useState<PracticeMode>('games')

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>重点练</h2>
          <p>词语与句型：游戏巩固 · 写作落地 · 口语出口</p>
        </div>
      </div>

      <div className="mode-cards hub">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={`mode-card ${mode === m.id ? 'active' : ''}`}
            onClick={() => setMode(m.id)}
          >
            <strong>{m.label}</strong>
            <span>{m.desc}</span>
          </button>
        ))}
      </div>

      {mode === 'games' && <VocabGames store={store} />}
      {mode === 'writing' && <WritingPractice store={store} />}
      {mode === 'speaking' && <SpeakingPractice store={store} />}
    </section>
  )
}
