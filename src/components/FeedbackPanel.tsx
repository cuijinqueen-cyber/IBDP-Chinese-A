import type { FeedbackReport } from '../types'
import { CRITERION_LABELS } from '../data/feedback'

interface FeedbackPanelProps {
  report: FeedbackReport
}

export function FeedbackPanel({ report }: FeedbackPanelProps) {
  return (
    <div className="panel" style={{ marginTop: '1rem' }}>
      <div className="topic-badge">系统反馈 · Band estimate</div>
      <h3 style={{ margin: '0 0 0.35rem', fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
        预估 {report.overall}
      </h3>
      <p className="tip">{report.summary}</p>

      <div className="feedback-grid" style={{ marginTop: '1rem' }}>
        {report.criteria.map((c) => (
          <div className="criterion" key={c.criterion}>
            <div className="criterion-top">
              <span>{CRITERION_LABELS[c.criterion]}</span>
              <strong>{c.score}</strong>
            </div>
            <p>{c.note}</p>
            <p>{c.tip}</p>
          </div>
        ))}
      </div>

      <h4 style={{ margin: '1.1rem 0 0.3rem' }}>6.5 → 7 升级点</h4>
      <ul className="upgrade-list">
        {report.upgrades.map((u) => (
          <li key={u}>{u}</li>
        ))}
      </ul>

      <h4 style={{ margin: '1.1rem 0 0.3rem' }}>搭配标注</h4>
      <ul className="phrase-list">
        {report.collocationsUsed.length > 0 && (
          <li>
            已使用：{' '}
            {report.collocationsUsed.map((p) => (
              <strong key={p} className="inline-highlight" style={{ marginRight: '0.4rem' }}>
                {p}
              </strong>
            ))}
          </li>
        )}
        {report.collocationsMissed.length > 0 && (
          <li>
            待强化：{' '}
            {report.collocationsMissed.map((p) => (
              <strong key={p} style={{ marginRight: '0.4rem' }}>
                {p}
              </strong>
            ))}
          </li>
        )}
      </ul>

      <h4 style={{ margin: '1.1rem 0 0.3rem' }}>反复练习清单</h4>
      <ul className="phrase-list">
        {report.practiceNext.map((p) => (
          <li key={p}>
            <strong>{p}</strong> — 造句后录音再说一遍
          </li>
        ))}
      </ul>
    </div>
  )
}
