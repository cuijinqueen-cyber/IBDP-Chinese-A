import { useMemo, useState } from 'react'
import type { AppStore } from '../hooks/useAppStore'
import {
  SENTENCE_PATTERNS,
  containsTarget,
  getPatternsForDay,
  getTodayVocab,
} from '../data/content'
import type { SentencePattern, VocabItem } from '../types'

interface WritingPracticeProps {
  store: AppStore
}

type Target = { kind: 'vocab'; item: VocabItem } | { kind: 'pattern'; item: SentencePattern }

export function WritingPractice({ store }: WritingPracticeProps) {
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
  const [draft, setDraft] = useState('')
  const [result, setResult] = useState<'pass' | 'fail' | null>(null)
  const [showModel, setShowModel] = useState(false)

  const current = targets[index % Math.max(targets.length, 1)]
  if (!current) {
    return <div className="panel empty-hint">暂无练习内容</div>
  }

  const phrase = current.kind === 'vocab' ? current.item.phrase : current.item.pattern
  const cue = current.item.writeCue
  const model = current.item.example
  const checkKey = current.kind === 'vocab' ? current.item.phrase : current.item.frame.split('__')[0] || current.item.pattern

  const submit = () => {
    const ok =
      current.kind === 'vocab'
        ? containsTarget(draft, current.item.phrase)
        : containsTarget(draft, current.item.pattern.split('…')[0] || current.item.pattern) ||
          /although|one clear example|largely because|compared with|not only|if\s+.+,|what matters most|in the long run/i.test(
            draft,
          )
    setResult(ok ? 'pass' : 'fail')
    if (ok && current.kind === 'vocab') {
      store.practiceVocab(current.item.id)
      store.markVocabDrilled()
    } else if (ok) {
      store.markVocabDrilled()
    }
  }

  const next = () => {
    setIndex((i) => i + 1)
    setDraft('')
    setResult(null)
    setShowModel(false)
  }

  return (
    <div className="panel practice-panel">
      <div className="topic-badge">{current.kind === 'vocab' ? '重点词语 · 写作' : '重点句型 · 写作'}</div>
      <h3 className="practice-target">{phrase}</h3>
      {current.kind === 'pattern' && (
        <p className="frame-line">
          句型框架：<code>{current.item.frame}</code>
        </p>
      )}
      <p className="tip">{current.item.meaning}</p>
      <div className="prompt-box">{cue}</div>

      <label className="muted">写下你的英文句子（必须用上目标词/句型）</label>
      <textarea
        className="note-input"
        value={draft}
        onChange={(e) => {
          setDraft(e.target.value)
          setResult(null)
        }}
        placeholder={model}
      />

      <div className="hero-cta" style={{ marginTop: '0.9rem' }}>
        <button type="button" className="btn btn-primary" onClick={submit} disabled={!draft.trim()}>
          检查是否用上目标
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setShowModel(true)}>
          看范句
        </button>
        <button type="button" className="btn btn-ghost" onClick={next}>
          下一题
        </button>
      </div>

      {result === 'pass' && (
        <div className="game-feedback ok">合格：已用上目标表达。可再润色细节与语法。</div>
      )}
      {result === 'fail' && (
        <div className="game-feedback bad">
          未检测到目标表达（{checkKey}）。改写后再提交。
        </div>
      )}
      {showModel && (
        <div className="model-box">
          <strong>范句</strong>
          <p>{model}</p>
        </div>
      )}

      <div className="practice-progress muted">
        写作进度 { (index % targets.length) + 1 } / {targets.length} · 词 {vocab.length} · 句型{' '}
        {patterns.length}
      </div>
      <details className="bank-details">
        <summary>今日全部写作目标</summary>
        <ul className="phrase-list">
          {targets.map((t, i) => (
            <li key={t.kind + (t.kind === 'vocab' ? t.item.id : t.item.id)}>
              <button type="button" className="btn btn-ghost" onClick={() => { setIndex(i); setDraft(''); setResult(null); setShowModel(false) }}>
                {t.kind === 'vocab' ? t.item.phrase : t.item.pattern}
              </button>
            </li>
          ))}
        </ul>
      </details>
      <details className="bank-details">
        <summary>全部句型库（{SENTENCE_PATTERNS.length}）</summary>
        <ul className="phrase-list">
          {SENTENCE_PATTERNS.map((p) => (
            <li key={p.id}>
              <strong>{p.pattern}</strong> — {p.meaning}
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}
