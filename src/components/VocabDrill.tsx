import { useMemo, useState, type ReactNode } from 'react'
import type { AppStore } from '../hooks/useAppStore'
import { VOCAB_BANK, getMockForDay, getVocabByIds, getVocabByPhrase } from '../data/content'

interface VocabDrillProps {
  store: AppStore
}

function highlightExample(example: string, phrase: string): ReactNode {
  const idx = example.toLowerCase().indexOf(phrase.toLowerCase())
  if (idx < 0) return example
  return (
    <>
      {example.slice(0, idx)}
      <mark>{example.slice(idx, idx + phrase.length)}</mark>
      {example.slice(idx + phrase.length)}
    </>
  )
}

export function VocabDrill({ store }: VocabDrillProps) {
  const mock = getMockForDay(store.state.dayCursor)
  const [filter, setFilter] = useState<'today' | 'all' | 'missed'>('today')

  const todayItems = useMemo(() => {
    const fromParts = mock.parts.flatMap((p) => getVocabByIds(p.focusVocabIds))
    const fromHighlights = mock.modelHighlights
      .map((p) => getVocabByPhrase(p))
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
    const map = new Map([...fromParts, ...fromHighlights].map((v) => [v.id, v]))
    return [...map.values()]
  }, [mock])

  const missedIds = new Set(
    (store.state.lastFeedback?.collocationsMissed ?? [])
      .map((p) => getVocabByPhrase(p)?.id)
      .filter(Boolean),
  )

  const list =
    filter === 'today'
      ? todayItems
      : filter === 'missed'
        ? VOCAB_BANK.filter((v) => missedIds.has(v.id))
        : VOCAB_BANK

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-GB'
    u.rate = 0.92
    window.speechSynthesis.speak(u)
  }

  const handlePractice = (id: string, mastered?: boolean) => {
    store.practiceVocab(id, mastered)
    store.markVocabDrilled()
  }

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>搭配与主题词</h2>
          <p>重点标注 · 跟读 · 反复练习到自动化</p>
        </div>
      </div>

      <div className="part-tabs">
        <button
          type="button"
          className={filter === 'today' ? 'active' : ''}
          onClick={() => setFilter('today')}
        >
          今日重点
        </button>
        <button
          type="button"
          className={filter === 'missed' ? 'active' : ''}
          onClick={() => setFilter('missed')}
        >
          反馈待强化
        </button>
        <button
          type="button"
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          全部词库
        </button>
      </div>

      {list.length === 0 ? (
        <div className="panel empty-hint">先完成一次模考反馈，系统会把待强化搭配放在这里。</div>
      ) : (
        <div className="vocab-grid">
          {list.map((v) => {
            const prog = store.state.vocabProgress[v.id]
            return (
              <article
                key={v.id}
                className={`vocab-card ${prog?.mastered ? 'mastered' : ''}`}
              >
                <p className="phrase">{v.phrase}</p>
                <p className="meaning">{v.meaning}</p>
                <p className="example">{highlightExample(v.example, v.phrase)}</p>
                <div className="vocab-meta">
                  <span className="mini-tag">{v.topic}</span>
                  <span className="mini-tag">
                    {v.type === 'collocation' ? '搭配' : '主题词'}
                  </span>
                  <span className="mini-tag">
                    {v.level === 'band7' ? 'Band 7' : '升级词'}
                  </span>
                  <span className="mini-tag">练过 {prog?.reps ?? 0} 次</span>
                  <div className="drill-actions">
                    <button type="button" onClick={() => speak(v.phrase)}>
                      跟读
                    </button>
                    <button type="button" onClick={() => speak(v.example)}>
                      范句
                    </button>
                    <button type="button" className="know" onClick={() => handlePractice(v.id, true)}>
                      已掌握
                    </button>
                    <button type="button" onClick={() => handlePractice(v.id)}>
                      +1 练习
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
