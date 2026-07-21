import { formatTime, useRecorder } from '../hooks/useRecorder'

interface RecorderProps {
  targetSeconds?: number
  onComplete: (payload: { durationSec: number; audioUrl: string | null }) => void
}

export function Recorder({ targetSeconds = 90, onComplete }: RecorderProps) {
  const { status, durationSec, audioUrl, start, stop, reset } = useRecorder()

  const handleStop = () => {
    stop()
  }

  const handleSubmit = () => {
    onComplete({ durationSec, audioUrl })
  }

  return (
    <div className="recorder">
      <div className="recorder-status">
        <div className="timer">{formatTime(durationSec)}</div>
        <div>
          {status === 'recording' && (
            <span className="rec-indicator">
              <i /> 录音中 · 目标约 {targetSeconds}s
            </span>
          )}
          {status === 'idle' && <span className="muted">准备好后开始录音打卡</span>}
          {status === 'stopped' && <span className="muted">录音完成，可回听后提交反馈</span>}
          {status === 'denied' && (
            <span className="muted">麦克风权限被拒绝，请在浏览器设置中允许后重试</span>
          )}
          {status === 'unsupported' && (
            <span className="muted">当前环境不支持录音，仍可完成词汇练习与模考流程</span>
          )}
        </div>
      </div>

      {audioUrl && (
        <div className="audio-wrap">
          <audio controls src={audioUrl} />
        </div>
      )}

      <div className="recorder-actions">
        {status !== 'recording' && (
          <button type="button" className="btn btn-accent" onClick={() => void start()}>
            {status === 'stopped' ? '重新录制' : '开始录音'}
          </button>
        )}
        {status === 'recording' && (
          <button type="button" className="btn btn-primary" onClick={handleStop}>
            结束录音
          </button>
        )}
        {status === 'stopped' && (
          <>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              提交并获取反馈
            </button>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              清空
            </button>
          </>
        )}
        {(status === 'denied' || status === 'unsupported') && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onComplete({ durationSec: Math.max(durationSec, 45), audioUrl: null })}
          >
            跳过录音，生成练习反馈
          </button>
        )}
      </div>
    </div>
  )
}
