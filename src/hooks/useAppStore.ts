import { useCallback, useEffect, useState } from 'react'
import type { AppState, CheckIn, FeedbackReport, RecordingEntry, VocabProgress } from '../types'
import { VOCAB_BANK } from '../data/content'

const STORAGE_KEY = 'speakrise-state-v1'

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function emptyVocabProgress(): Record<string, VocabProgress> {
  return Object.fromEntries(
    VOCAB_BANK.map((v) => [
      v.id,
      { id: v.id, reps: 0, lastPracticed: null, mastered: false } satisfies VocabProgress,
    ]),
  )
}

function defaultState(): AppState {
  return {
    currentBand: 6.5,
    targetBand: 7,
    streak: 0,
    longestStreak: 0,
    checkIns: [],
    recordings: [],
    vocabProgress: emptyVocabProgress(),
    lastFeedback: null,
    lastFeedbackDate: null,
    dayCursor: 0,
  }
}

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as AppState
    return {
      ...defaultState(),
      ...parsed,
      vocabProgress: { ...emptyVocabProgress(), ...parsed.vocabProgress },
    }
  } catch {
    return defaultState()
  }
}

function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function isComplete(c: CheckIn): boolean {
  return c.recorded && c.mockDone && c.vocabDrilled && c.feedbackSeen
}

export function useAppStore() {
  const [state, setState] = useState<AppState>(() =>
    typeof window === 'undefined' ? defaultState() : loadState(),
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const today = todayKey()

  const todayCheckIn: CheckIn =
    state.checkIns.find((c) => c.date === today) ?? {
      date: today,
      recorded: false,
      mockDone: false,
      vocabDrilled: false,
      feedbackSeen: false,
    }

  const upsertCheckIn = useCallback((patch: Partial<CheckIn>) => {
    setState((prev) => {
      const existing = prev.checkIns.find((c) => c.date === today)
      const next: CheckIn = {
        date: today,
        recorded: false,
        mockDone: false,
        vocabDrilled: false,
        feedbackSeen: false,
        ...existing,
        ...patch,
      }
      const others = prev.checkIns.filter((c) => c.date !== today)
      let streak = prev.streak
      let longest = prev.longestStreak

      if (isComplete(next) && (!existing || !isComplete(existing))) {
        const y = yesterdayKey()
        const hadYesterday = prev.checkIns.some((c) => c.date === y && isComplete(c))
        streak = hadYesterday || prev.streak === 0 ? (hadYesterday ? prev.streak + 1 : 1) : 1
        if (prev.streak > 0 && !hadYesterday) streak = 1
        longest = Math.max(longest, streak)
      }

      const completedDays = [...others, next].filter(isComplete).length
      const estimatedBand = Math.min(
        7,
        Math.round((6.5 + Math.min(completedDays, 20) * 0.025) * 2) / 2,
      )

      return {
        ...prev,
        checkIns: [...others, next].sort((a, b) => a.date.localeCompare(b.date)),
        streak,
        longestStreak: longest,
        currentBand: estimatedBand,
        dayCursor: isComplete(next) && (!existing || !isComplete(existing))
          ? prev.dayCursor + 1
          : prev.dayCursor,
      }
    })
  }, [today])

  const addRecording = useCallback(
    (entry: Omit<RecordingEntry, 'id' | 'date'> & { date?: string }) => {
      const recording: RecordingEntry = {
        id: `r-${Date.now()}`,
        date: entry.date ?? today,
        mockId: entry.mockId,
        partId: entry.partId,
        durationSec: entry.durationSec,
        blobUrl: entry.blobUrl,
        note: entry.note,
      }
      setState((prev) => ({
        ...prev,
        recordings: [...prev.recordings, recording].slice(-40),
      }))
      upsertCheckIn({ recorded: true })
      return recording
    },
    [today, upsertCheckIn],
  )

  const saveFeedback = useCallback(
    (report: FeedbackReport) => {
      setState((prev) => ({
        ...prev,
        lastFeedback: report,
        lastFeedbackDate: today,
      }))
      upsertCheckIn({
        feedbackSeen: true,
        mockDone: true,
        overallScore: report.overall,
      })
    },
    [today, upsertCheckIn],
  )

  const markVocabDrilled = useCallback(() => {
    upsertCheckIn({ vocabDrilled: true })
  }, [upsertCheckIn])

  const practiceVocab = useCallback((id: string, mastered?: boolean) => {
    setState((prev) => {
      const cur = prev.vocabProgress[id] ?? {
        id,
        reps: 0,
        lastPracticed: null,
        mastered: false,
      }
      return {
        ...prev,
        vocabProgress: {
          ...prev.vocabProgress,
          [id]: {
            ...cur,
            reps: cur.reps + 1,
            lastPracticed: today,
            mastered:
              mastered !== undefined
                ? mastered
                : cur.mastered || cur.reps + 1 >= 5,
          },
        },
      }
    })
  }, [today])

  const resetAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(defaultState())
  }, [])

  return {
    state,
    today,
    todayCheckIn,
    upsertCheckIn,
    addRecording,
    saveFeedback,
    markVocabDrilled,
    practiceVocab,
    resetAll,
  }
}

export type AppStore = ReturnType<typeof useAppStore>
