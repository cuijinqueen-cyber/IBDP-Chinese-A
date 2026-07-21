import { useMemo, useState } from 'react'
import type { AppStore } from '../hooks/useAppStore'
import { getPatternsForDay, getTodayVocab } from '../data/content'
import type { SentencePattern, VocabItem } from '../types'
import { Recorder } from './Recorder'

interface SpeakingPracticeProps {
  store: AppStore
}

type Target = { kind: 'vocab'; item: VocabItem } | { kind: 'pattern'; item: SentencePattern }

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-GB'
  u.rate = 0.9
  window.speechSynthesis.speak(u)
}

export function SpeakingPractice({ store }: SpeakingPracticeProps) {
  const vocab = getTodayVocab(store.state.dayCursor)
  const patterns = getPatternsForDay(store.state.dayCursor)
  const targets = useMemo<Target[]>(
    () => [
      ...vocab.map((item) => ({ kind: 'vocab' as const, item })),
      ...patterns.map((item) => ({ kind: 'pattern' as const, item })),
    ],
    [vocab, patterns],
  )
  const [index, setIndex] = useState(0)
  const [used, setUsed] = useState(false)
  const [clear, setClear] = useState(false)
  const [done, setDone] = useState(false)
  const [recKey, setRecKey] = useState(0)

  const current = targets[index % Math.max(targets.length, 1)]
  if (!current) return <div className="panel empty-hint">暂无练习内容</div>

  const phrase = current.kind === 'vocab' ? current.item.phrase : current.item.pattern
  const cue = current.item.speakCue
  const model = current.item.example

  const finish = (durationSec: number) => {
    store.addRecording({
      mockId: 'speak-drill',
      partId: current.kind === 'vocab' ? current.item.id : current.item.id,
      durationSec,
    })
    if (current.kind === 'vocab') store.practiceVocab(current.item.id)
    store.markVocabDrilled()
    setDone(true)
  }

  const next = () => {
    setIndex((i) => i + 1)
    setUsed(false)
    setClear(false)
    setDone(false)
    setRecKey((k) => k + 1)
  }

  return (
    <div className="panel practice-panel">
      <div className="topic-badge">{current.kind === 'vocab' ? '重点词语 · 口语' : '重点句型 · 口语'}</div>
      <h3 className="practice-target">{phrase}</h3>
      <p className="tip">{current.item.meaning}</p>
      <div className="prompt-box">{cue}</div>

      <div className="hero-cta">
        <button type="button" className="btn btn-secondary" onClick={() => speak(phrase)}>
          听目标表达
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => speak(model)}>
          听范句跟读
        </button>
      </div>

      <div className="model-box" style={{ marginTop: '0.9rem' }}>
        <strong>范句</strong>
        <p>{model}</p>
      </div>

      <p className="muted" style={{ marginTop: '1rem' }}>
        录音作答（建议 30–60 秒），说完后自我勾选：
      </p>
      <Recorder key={recKey} targetSeconds={45} onComplete={({ durationSec }) => finish(durationSec)} />

      <div className="self-check">
        <label>
          <input type="checkbox" checked={used} onChange={(e) => setUsed(e.target.checked)} />
          我用上了目标词/句型
        </label>
        <label>
          <input type="checkbox" checked={clear} onChange={(e) => setClear(e.target.checked)} />
          发音与停顿比较清楚
        </label>
      </div>

      {done && used && clear && (
        <div className="game-feedback ok">本轮口语练习完成。继续下一目标！</div>
      )}
      {done && (!used || !clear) && (
        <div className="game-feedback bad">再录一次，确保用上目标表达并注意清晰度。</div>
      )}

      <div className="hero-cta" style={{ marginTop: '0.8rem' }}>
        <button type="button" className="btn btn-primary" onClick={next}>
          下一题
        </button>
      </div>

      <div className="practice-progress muted">
        口语进度 {(index % targets.length) + 1} / {targets.length}
      </div>
      <details className="bank-details">
        <summary>今日口语目标列表</summary>
        <ul className="phrase-list">
          {targets.map((t, i) => (
            <li key={t.kind + t.item.id}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setIndex(i)
                  setUsed(false)
                  setClear(false)
                  setDone(false)
                  setRecKey((k) => k + 1)
                }}
              >
                {t.kind === 'vocab' ? t.item.phrase : t.item.pattern}
              </button>
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}
