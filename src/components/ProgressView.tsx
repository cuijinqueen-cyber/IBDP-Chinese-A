import { useMemo } from 'react'
import type { AppStore } from '../hooks/useAppStore'
import { VOCAB_BANK } from '../data/content'

interface ProgressViewProps {
  store: AppStore
}

function recentDays(n: number): string[] {
  const days: string[] = []
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    )
  }
  return days
}

export function ProgressView({ store }: ProgressViewProps) {
  const { state, today, resetAll } = store
  const days = useMemo(() => recentDays(28), [])
  const checkMap = useMemo(
    () => Object.fromEntries(state.checkIns.map((c) => [c.date, c])),
    [state.checkIns],
  )

  const mastered = Object.values(state.vocabProgress).filter((v) => v.mastered).length
  const practiced = Object.values(state.vocabProgress).filter((v) => v.reps > 0).length
  const fullDays = state.checkIns.filter(
    (c) => c.recorded && c.mockDone && c.vocabDrilled && c.feedbackSeen,
  ).length

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h2>进度追踪</h2>
          <p>把每天打卡变成可见的 6.5→7 爬升路径</p>
        </div>
      </div>

      <div className="progress-stats">
        <div className="stat">
          <div className="num">{state.currentBand.toFixed(1)}</div>
          <div className="lbl">预估 Band</div>
        </div>
        <div className="stat">
          <div className="num">{state.streak}</div>
          <div className="lbl">连续天数</div>
        </div>
        <div className="stat">
          <div className="num">{fullDays}</div>
          <div className="lbl">完整打卡</div>
        </div>
        <div className="stat">
          <div className="num">
            {mastered}/{VOCAB_BANK.length}
          </div>
          <div className="lbl">掌握搭配</div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: '1rem' }}>
        <div className="topic-badge">近 28 天</div>
        <div className="calendar">
          {days.map((d) => {
            const c = checkMap[d]
            const full = c && c.recorded && c.mockDone && c.vocabDrilled && c.feedbackSeen
            const partial = c && !full && (c.recorded || c.mockDone || c.vocabDrilled)
            return (
              <div
                key={d}
                className={`day-cell ${full ? 'full' : partial ? 'partial' : ''} ${d === today ? 'today' : ''}`}
                title={d}
              >
                {Number(d.slice(-2))}
              </div>
            )
          })}
        </div>
        <p className="muted" style={{ marginTop: '0.8rem' }}>
          绿色=完整打卡 · 橙色=部分完成 · 描边=今天
        </p>
      </div>

      <div className="panel">
        <div className="topic-badge">训练摘要</div>
        <ul className="upgrade-list">
          <li>录音提交：{state.recordings.length} 条</li>
          <li>词汇练习覆盖：{practiced} / {VOCAB_BANK.length}</li>
          <li>最长连续：{state.longestStreak} 天</li>
          <li>
            冲刺建议：每天保证 Part 2 说满 90s+，并主动使用 2 个今日搭配。
          </li>
        </ul>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ marginTop: '0.8rem' }}
          onClick={() => {
            if (window.confirm('确定清空本地打卡数据？')) resetAll()
          }}
        >
          重置本地数据
        </button>
      </div>
    </section>
  )
}
