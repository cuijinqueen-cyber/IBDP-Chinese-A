import type { AppStore } from '../hooks/useAppStore'
import type { ViewId } from '../types'
import { getMockForDay } from '../data/content'

interface TodayViewProps {
  store: AppStore
  onNavigate: (view: ViewId) => void
}

export function TodayView({ store, onNavigate }: TodayViewProps) {
  const { todayCheckIn, state } = store
  const mock = getMockForDay(state.dayCursor)
  const doneCount = [
    todayCheckIn.recorded,
    todayCheckIn.mockDone,
    todayCheckIn.vocabDrilled,
    todayCheckIn.feedbackSeen,
  ].filter(Boolean).length

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="topic-badge">每日口语日课</div>
          <h1>口升</h1>
          <p>
            从 6.5 稳到 7.0：每天一套模考录音，拿到即时反馈，并把高分搭配反复练到脱口而出。
          </p>
          <div className="hero-cta">
            <button type="button" className="btn btn-primary" onClick={() => onNavigate('mock')}>
              开始今日模考
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => onNavigate('vocab')}>
              练今日搭配
            </button>
          </div>
        </div>

        <div className="hero-panel">
          <div className="label">当前预估分数</div>
          <div className="score">{state.currentBand.toFixed(1)}</div>
          <div className="meta">目标 Band {state.targetBand.toFixed(1)} · 今日完成 {doneCount}/4</div>
          <div className="streak-row">
            <div className="streak-item">
              <strong>{state.streak}</strong>
              <span>连续打卡</span>
            </div>
            <div className="streak-item">
              <strong>{state.longestStreak}</strong>
              <span>最长纪录</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>今日清单</h2>
            <p>
              主题：{mock.topicZh}（{mock.topic}）
            </p>
          </div>
        </div>
        <div className="checklist">
          <button
            type="button"
            className={`check-item ${todayCheckIn.mockDone ? 'done' : ''}`}
            onClick={() => onNavigate('mock')}
            style={{ textAlign: 'left', width: '100%' }}
          >
            <span className="check-dot">✓</span>
            <div>
              <h3>口语模考 Part 1–3</h3>
              <p>按考试节奏录音作答，覆盖今天主题。</p>
            </div>
          </button>
          <button
            type="button"
            className={`check-item ${todayCheckIn.recorded ? 'done' : ''}`}
            onClick={() => onNavigate('mock')}
            style={{ textAlign: 'left', width: '100%' }}
          >
            <span className="check-dot">✓</span>
            <div>
              <h3>打卡录音</h3>
              <p>至少完成一个 Part 的完整录音提交。</p>
            </div>
          </button>
          <button
            type="button"
            className={`check-item ${todayCheckIn.feedbackSeen ? 'done' : ''}`}
            onClick={() => onNavigate('mock')}
            style={{ textAlign: 'left', width: '100%' }}
          >
            <span className="check-dot">✓</span>
            <div>
              <h3>查看系统反馈</h3>
              <p>四项评分 + 6.5→7 升级点 + 搭配标注。</p>
            </div>
          </button>
          <button
            type="button"
            className={`check-item ${todayCheckIn.vocabDrilled ? 'done' : ''}`}
            onClick={() => onNavigate('vocab')}
            style={{ textAlign: 'left', width: '100%' }}
          >
            <span className="check-dot">✓</span>
            <div>
              <h3>重点词汇反复练</h3>
              <p>游戏巩固 + 写作落地 + 口语出口。</p>
            </div>
          </button>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>今日必练搭配</h2>
            <p>先看懂意思，模考时自然嵌入 1–2 个。</p>
          </div>
        </div>
        <div className="focus-vocab">
          {mock.modelHighlights.map((h) => (
            <span className="vocab-tag collocation" key={h}>
              <span className="mark">Band 7</span>
              {h}
            </span>
          ))}
        </div>
      </section>

      {store.state.lastFeedback && store.state.lastFeedbackDate === store.today && (
        <section className="section">
          <div className="panel">
            <div className="topic-badge">今日最新反馈</div>
            <h3 style={{ margin: '0.2rem 0', fontFamily: 'var(--font-display)', fontSize: '1.7rem' }}>
              预估 {store.state.lastFeedback.overall}
            </h3>
            <p className="tip">{store.state.lastFeedback.summary}</p>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ marginTop: '0.5rem' }}
              onClick={() => onNavigate('mock')}
            >
              查看完整反馈 →
            </button>
          </div>
        </section>
      )}
    </>
  )
}
