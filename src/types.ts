export type ViewId = 'today' | 'mock' | 'vocab' | 'progress'

export type Criterion = 'fluency' | 'lexical' | 'grammar' | 'pronunciation'

export interface VocabItem {
  id: string
  phrase: string
  meaning: string
  example: string
  topic: string
  level: 'band7' | 'upgrade'
  type: 'collocation' | 'topic'
}

export interface MockPart {
  id: string
  label: string
  prompt: string
  tips?: string
  prepSeconds?: number
  speakSeconds: number
  focusVocabIds: string[]
}

export interface DailyMock {
  id: string
  dayIndex: number
  topic: string
  topicZh: string
  parts: MockPart[]
  modelHighlights: string[]
}

export interface CriterionScore {
  criterion: Criterion
  score: number
  note: string
  tip: string
}

export interface FeedbackReport {
  overall: number
  summary: string
  criteria: CriterionScore[]
  upgrades: string[]
  collocationsUsed: string[]
  collocationsMissed: string[]
  practiceNext: string[]
}

export interface RecordingEntry {
  id: string
  date: string
  mockId: string
  partId: string
  durationSec: number
  blobUrl?: string
  note?: string
}

export interface CheckIn {
  date: string
  recorded: boolean
  mockDone: boolean
  vocabDrilled: boolean
  feedbackSeen: boolean
  overallScore?: number
}

export interface VocabProgress {
  id: string
  reps: number
  lastPracticed: string | null
  mastered: boolean
}

export interface AppState {
  currentBand: number
  targetBand: number
  streak: number
  longestStreak: number
  checkIns: CheckIn[]
  recordings: RecordingEntry[]
  vocabProgress: Record<string, VocabProgress>
  lastFeedback: FeedbackReport | null
  lastFeedbackDate: string | null
  dayCursor: number
}
