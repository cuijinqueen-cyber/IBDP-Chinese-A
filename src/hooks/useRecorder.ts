import { useCallback, useEffect, useRef, useState } from 'react'

export type RecorderStatus = 'idle' | 'recording' | 'stopped' | 'unsupported' | 'denied'

export function useRecorder() {
  const [status, setStatus] = useState<RecorderStatus>('idle')
  const [durationSec, setDurationSec] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const mediaRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const clearTimer = () => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const stopTracks = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }

  const reset = useCallback(() => {
    clearTimer()
    stopTracks()
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setDurationSec(0)
    setStatus('idle')
    chunksRef.current = []
    mediaRef.current = null
  }, [audioUrl])

  useEffect(() => {
    return () => {
      clearTimer()
      stopTracks()
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setStatus('unsupported')
      return
    }
    try {
      if (audioUrl) URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
      chunksRef.current = []
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mime = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : MediaRecorder.isTypeSupported('audio/mp4')
          ? 'audio/mp4'
          : undefined
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined)
      mediaRef.current = recorder
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setStatus('stopped')
        stopTracks()
      }
      recorder.start(250)
      setDurationSec(0)
      setStatus('recording')
      clearTimer()
      timerRef.current = window.setInterval(() => {
        setDurationSec((s) => s + 1)
      }, 1000)
    } catch {
      setStatus('denied')
      stopTracks()
    }
  }, [audioUrl])

  const stop = useCallback(() => {
    clearTimer()
    const recorder = mediaRef.current
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop()
    } else {
      setStatus('stopped')
      stopTracks()
    }
  }, [])

  return { status, durationSec, audioUrl, start, stop, reset }
}

export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
