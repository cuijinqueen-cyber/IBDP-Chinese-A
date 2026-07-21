import { useMemo, useState } from 'react'
import type { AppStore } from '../hooks/useAppStore'
import { VOCAB_BANK, getTodayVocab, shuffle } from '../data/content'
import type { GameKind, VocabItem } from '../types'

interface VocabGamesProps {
  store: AppStore
}

function speak(text: string) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-GB'
  u.rate = 0.92
  window.speechSynthesis.speak(u)
}

function MatchGame({ items, onScore }: { items: VocabItem[]; onScore: (id: string) => void }) {
  const pairs = useMemo(() => shuffle(items).slice(0, Math.min(4, items.length)), [items])
  const [left] = useState(() => shuffle(pairs))
  const [right] = useState(() => shuffle(pairs))
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<string[]>([])
  const [wrong, setWrong] = useState(false)
  const [moves, setMoves] = useState(0)

  const pick = (id: string, side: 'en' | 'zh') => {
    if (matched.includes(id)) return
    if (!selected) {
      setSelected(`${side}:${id}`)
      return
    }
    const [prevSide, prevId] = selected.split(':')
    if (prevSide === side) {
      setSelected(`${side}:${id}`)
      return
    }
    setMoves((m) => m + 1)
    if (prevId === id) {
      setMatched((m) => [...m, id])
      onScore(id)
      setSelected(null)
      setWrong(false)
    } else {
      setWrong(true)
      setTimeout(() => {
        setSelected(null)
        setWrong(false)
      }, 500)
    }
  }

  const done = matched.length === pairs.length && pairs.length > 0

  return (
    <div className="game-board">
      <div className="game-hud">
        <span>配对消消乐</span>
        <strong>
          {matched.length}/{pairs.length} · 步数 {moves}
        </strong>
      </div>
      {done ? (
        <div className="game-win">全部配对成功！搭配反应更快了。</div>
      ) : (
        <div className="match-grid">
          <div className="match-col">
            {left.map((v) => (
              <button
                key={`en-${v.id}`}
                type="button"
                className={`match-tile ${matched.includes(v.id) ? 'matched' : ''} ${selected === `en:${v.id}` ? 'picked' : ''} ${wrong && selected?.endsWith(v.id) ? 'shake' : ''}`}
                onClick={() => pick(v.id, 'en')}
                disabled={matched.includes(v.id)}
              >
                {v.phrase}
              </button>
            ))}
          </div>
          <div className="match-col">
            {right.map((v) => (
              <button
                key={`zh-${v.id}`}
                type="button"
                className={`match-tile zh ${matched.includes(v.id) ? 'matched' : ''} ${selected === `zh:${v.id}` ? 'picked' : ''}`}
                onClick={() => pick(v.id, 'zh')}
                disabled={matched.includes(v.id)}
              >
                {v.meaning}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ClozeGame({ items, onScore }: { items: VocabItem[]; onScore: (id: string) => void }) {
  const deck = useMemo(() => shuffle(items), [items])
  const [idx, setIdx] = useState(0)
  const [feedback, setFeedback] = useState<'ok' | 'bad' | null>(null)
  const [score, setScore] = useState(0)
  const item = deck[idx % deck.length]
  const blanked = item.example.replace(new RegExp(item.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '______')
  const options = useMemo(() => {
    const distractors = shuffle(VOCAB_BANK.filter((v) => v.id !== item.id)).slice(0, 3)
    return shuffle([item, ...distractors])
  }, [item])

  const choose = (id: string) => {
    if (feedback) return
    if (id === item.id) {
      setFeedback('ok')
      setScore((s) => s + 1)
      onScore(item.id)
    } else setFeedback('bad')
  }

  const next = () => {
    setFeedback(null)
    setIdx((i) => i + 1)
  }

  return (
    <div className="game-board">
      <div className="game-hud">
        <span>填空闯关</span>
        <strong>
          得分 {score} · 第 {idx + 1} 题
        </strong>
      </div>
      <p className="cloze-sentence">{blanked}</p>
      <div className="option-grid">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`option-btn ${feedback && o.id === item.id ? 'correct' : ''} ${feedback === 'bad' && o.id !== item.id ? '' : ''}`}
            onClick={() => choose(o.id)}
          >
            {o.phrase}
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`game-feedback ${feedback}`}>
          {feedback === 'ok' ? '正确！' : `再想想。答案是：${item.phrase}`}
          <button type="button" className="btn btn-primary" style={{ marginLeft: '0.75rem' }} onClick={next}>
            下一题
          </button>
        </div>
      )}
    </div>
  )
}

function QuizGame({ items, onScore }: { items: VocabItem[]; onScore: (id: string) => void }) {
  const deck = useMemo(() => shuffle(items), [items])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [feedback, setFeedback] = useState<'ok' | 'bad' | null>(null)
  const item = deck[idx % deck.length]
  const options = useMemo(() => {
    const distractors = shuffle(items.filter((v) => v.id !== item.id).concat(VOCAB_BANK)).filter(
      (v, i, arr) => v.id !== item.id && arr.findIndex((x) => x.id === v.id) === i,
    )
    return shuffle([item, ...distractors.slice(0, 3)])
  }, [item, items])

  const choose = (id: string) => {
    if (feedback) return
    if (id === item.id) {
      setFeedback('ok')
      setScore((s) => s + 10 + streak * 2)
      setStreak((s) => s + 1)
      onScore(item.id)
      speak(item.phrase)
    } else {
      setFeedback('bad')
      setStreak(0)
    }
  }

  return (
    <div className="game-board">
      <div className="game-hud">
        <span>极速选义</span>
        <strong>
          {score} 分 · 连对 {streak}
        </strong>
      </div>
      <p className="quiz-prompt">{item.meaning}</p>
      <p className="muted">选出对应的英文搭配 / 主题词</p>
      <div className="option-grid">
        {options.map((o) => (
          <button key={o.id} type="button" className="option-btn" onClick={() => choose(o.id)}>
            {o.phrase}
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`game-feedback ${feedback}`}>
          {feedback === 'ok' ? '漂亮！' : `答案：${item.phrase}`}
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginLeft: '0.75rem' }}
            onClick={() => {
              setFeedback(null)
              setIdx((i) => i + 1)
            }}
          >
            继续
          </button>
        </div>
      )}
    </div>
  )
}

export function VocabGames({ store }: VocabGamesProps) {
  const today = getTodayVocab(store.state.dayCursor)
  const pool = today.length >= 3 ? today : VOCAB_BANK.slice(0, 8)
  const [kind, setKind] = useState<GameKind>('match')
  const [seed, setSeed] = useState(0)

  const onScore = (id: string) => {
    store.practiceVocab(id)
    store.markVocabDrilled()
  }

  return (
    <div>
      <div className="mode-cards">
        {(
          [
            { id: 'match' as const, title: '配对消消乐', desc: '英文搭配 ↔ 中文意思' },
            { id: 'cloze' as const, title: '填空闯关', desc: '根据例句选对搭配' },
            { id: 'quiz' as const, title: '极速选义', desc: '看中文，抢答英文' },
          ] as const
        ).map((g) => (
          <button
            key={g.id}
            type="button"
            className={`mode-card ${kind === g.id ? 'active' : ''}`}
            onClick={() => {
              setKind(g.id)
              setSeed((s) => s + 1)
            }}
          >
            <strong>{g.title}</strong>
            <span>{g.desc}</span>
          </button>
        ))}
      </div>
      <div key={`${kind}-${seed}`}>
        {kind === 'match' && <MatchGame items={pool} onScore={onScore} />}
        {kind === 'cloze' && <ClozeGame items={pool} onScore={onScore} />}
        {kind === 'quiz' && <QuizGame items={pool} onScore={onScore} />}
      </div>
      <button type="button" className="btn btn-ghost" style={{ marginTop: '0.8rem' }} onClick={() => setSeed((s) => s + 1)}>
        换一局
      </button>
    </div>
  )
}
