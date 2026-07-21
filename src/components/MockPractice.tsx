import { useEffect, useMemo, useState } from 'react'
import type { AppStore } from '../hooks/useAppStore'
import { getMockForDay, getVocabByIds } from '../data/content'
import { generateFeedback } from '../data/feedback'
import type { FeedbackReport } from '../types'
import { Recorder } from './Recorder'
import { FeedbackPanel } from './FeedbackPanel'

interface MockPracticeProps {
  store: AppStore
  onGoVocab: () => void
}

export function MockPractice({ store, onGoVocab }: MockPracticeProps) {
  const mock = useMemo(() => getMockForDay(store.state.dayCursor), [store.state.dayCursor])
  const [partIndex, setPartIndex] = useState(0)
  const [doneParts, setDoneParts] = useState<string[]>([])
  const [prepLeft, setPrepLeft] = useState<number | null>(null)
  const [noted, setNoted] = useState('')
  const [report, setReport] = useState<FeedbackReport | null>(
    store.state.lastFeedbackDate === store.today ? store.state.lastFeedback : null,
  )

  const part = mock.parts[partIndex]
  const focusVocab = getVocabByIds(part.focusVocabIds)

  useEffect(() => {
    setPartIndex(0)
    setDoneParts([])
    setNoted('')
    setPrepLeft(null)
    setReport(store.state.lastFeedbackDate === store.today ? store.state.lastFeedback : null)
  }, [mock.id, store.state.lastFeedback, store.state.lastFeedbackDate, store.today])

  useEffect(() => {
    if (prepLeft == null) return
    if (prepLeft <= 0) {
      setPrepLeft(null)
      return
    }
    const t = window.setTimeout(() => setPrepLeft((s) => (s == null ? null : s - 1)), 1000)
    return () => window.clearTimeout(t)
  }, [prepLeft])

  const startPrep = () => {
    if (part.prepSeconds) setPrepLeft(part.prepSeconds)
  }

  const handleRecordingComplete = (payload: {
    durationSec: number
    audioUrl: string | null
  }) => {
    const phrases = noted
      .split(/[,，、\n]/)
      .map((s) => s.trim())
      .filter(Boolean)

    store.addRecording({
      mockId: mock.id,
      partId: part.id,
      durationSec: payload.durationSec,
      blobUrl: payload.audioUrl ?? undefined,
      note: noted || undefined,
    })

    const fb = generateFeedback({
      durationSec: payload.durationSec,
      focusVocab,
      notedPhrases: phrases,
      partLabel: part.label,
    })

    setReport(fb)
    store.saveFeedback(fb)
    setDoneParts((prev) => (prev.includes(part.id) ? prev : [...prev, part.id]))
  }

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>今日口语模考</h2>
          <p>
            {mock.topicZh} · {mock.topic}
          </p>
        </div>
      </div>

      <div className="panel">
        <div className="topic-badge">Day theme · 重点搭配</div>
        <div className="focus-vocab" style={{ marginTop: 0 }}>
          {mock.modelHighlights.map((h) => (
            <span className="vocab-tag collocation" key={h}>
              <span className="mark">搭配</span>
              {h}
            </span>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="part-tabs">
          {mock.parts.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`${i === partIndex ? 'active' : ''} ${doneParts.includes(p.id) ? 'done' : ''}`}
              onClick={() => {
                setPartIndex(i)
                setPrepLeft(null)
                setNoted('')
              }}
            >
              {p.label}
              {doneParts.includes(p.id) ? ' ✓' : ''}
            </button>
          ))}
        </div>

        {prepLeft != null && (
          <div className="prep-banner">
            <span>Part 2 准备时间</span>
            <strong>{prepLeft}s</strong>
          </div>
        )}

        <div className="topic-badge">{part.label}</div>
        <div className="prompt-box">{part.prompt}</div>
        {part.tips && <p className="tip">{part.tips}</p>}

        <div className="focus-vocab">
          {focusVocab.map((v) => (
            <span
              key={v.id}
              className={`vocab-tag ${v.type === 'collocation' ? 'collocation' : ''}`}
              title={v.meaning}
            >
              <span className="mark">{v.type === 'collocation' ? '搭配' : '主题词'}</span>
              {v.phrase}
            </span>
          ))}
        </div>

        {part.prepSeconds && prepLeft == null && (
          <div style={{ marginTop: '0.9rem' }}>
            <button type="button" className="btn btn-secondary" onClick={startPrep}>
              开始 {part.prepSeconds}s 准备
            </button>
          </div>
        )}

        <label className="muted" style={{ display: 'block', marginTop: '1.1rem' }}>
          录音时用到的搭配 / 主题词（可选，逗号分隔）— 用于重点标注反馈
        </label>
        <textarea
          className="note-input"
          style={{ marginTop: '0.45rem' }}
          placeholder={focusVocab.map((v) => v.phrase).join(', ')}
          value={noted}
          onChange={(e) => setNoted(e.target.value)}
        />

        <Recorder
          key={`${mock.id}-${part.id}`}
          targetSeconds={part.speakSeconds}
          onComplete={handleRecordingComplete}
        />
      </div>

      {report && (
        <>
          <FeedbackPanel report={report} />
          <div className="hero-cta" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn-accent" onClick={onGoVocab}>
              去反复练习重点词汇
            </button>
            {partIndex < mock.parts.length - 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setPartIndex((i) => i + 1)
                  setPrepLeft(null)
                  setNoted('')
                }}
              >
                下一部分
              </button>
            )}
          </div>
        </>
      )}
    </section>
  )
}
