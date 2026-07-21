import type { CriterionScore, FeedbackReport, VocabItem } from '../types'
import { getVocabByIds } from './content'

const CRITERION_TIPS: Record<string, { tip: string; upgrade: string }> = {
  fluency: {
    tip: '减少重复自我修正；用连接词把观点串成更长意群（however / for instance / that said）。',
    upgrade: '刻意练习 20–30 秒连续输出，不回头改已说完的句子。',
  },
  lexical: {
    tip: '用精准搭配替换通用词（good → rewarding / valuable；important → pivotal）。',
    upgrade: '每个答案至少自然嵌入 1 个今日重点搭配，不要生硬堆砌。',
  },
  grammar: {
    tip: '混合简单句与复杂句；条件句、定语从句、现在完成时是 7 分常见加分点。',
    upgrade: 'Part 3 用 “Although…, I still believe…” 结构组织对比观点。',
  },
  pronunciation: {
    tip: '注意重音与意群停顿；词尾辅音（-ed / -s）要发清楚，语速宁可稳一点。',
    upgrade: '跟读示范句，标记重音，再录音对比节奏。',
  },
}

function clampBand(n: number): number {
  return Math.round(Math.min(7.5, Math.max(6, n)) * 2) / 2
}

function pickBase(durationSec: number, focusCount: number, usedCount: number): number {
  let score = 6.5
  if (durationSec >= 45) score += 0.1
  if (durationSec >= 80) score += 0.1
  if (durationSec < 25) score -= 0.3
  if (usedCount >= Math.min(2, focusCount)) score += 0.2
  else if (usedCount === 0 && focusCount > 0) score -= 0.15
  return clampBand(score)
}

export function generateFeedback(input: {
  durationSec: number
  focusVocab: VocabItem[]
  notedPhrases: string[]
  partLabel: string
}): FeedbackReport {
  const { durationSec, focusVocab, notedPhrases, partLabel } = input
  const notedLower = notedPhrases.map((p) => p.toLowerCase())
  const used = focusVocab.filter((v) =>
    notedLower.some((n) => n.includes(v.phrase.toLowerCase()) || v.phrase.toLowerCase().includes(n)),
  )
  const missed = focusVocab.filter((v) => !used.includes(v))
  const base = pickBase(durationSec, focusVocab.length, used.length)

  const criteria: CriterionScore[] = [
    {
      criterion: 'fluency',
      score: clampBand(base + (durationSec >= 60 ? 0.1 : -0.1)),
      note:
        durationSec >= 60
          ? `${partLabel} 时长充足，流畅度接近 7 分区间。`
          : `${partLabel} 回答偏短，扩展细节可抬升流畅与连贯。`,
      tip: CRITERION_TIPS.fluency.tip,
    },
    {
      criterion: 'lexical',
      score: clampBand(base + (used.length >= 1 ? 0.2 : -0.15)),
      note:
        used.length > 0
          ? `已尝试使用：${used.map((u) => u.phrase).join('、')}。继续追求自然嵌入。`
          : '词汇仍偏安全。今天重点搭配几乎未出现，这是 6.5→7 的关键差距。',
      tip: CRITERION_TIPS.lexical.tip,
    },
    {
      criterion: 'grammar',
      score: clampBand(base),
      note: '维持多样句型；Part 2/3 至少各用一次从句或条件结构。',
      tip: CRITERION_TIPS.grammar.tip,
    },
    {
      criterion: 'pronunciation',
      score: clampBand(base),
      note: '录音后回听：标出含糊的词尾与不自然停顿，明天跟读纠正。',
      tip: CRITERION_TIPS.pronunciation.tip,
    },
  ]

  const overall =
    Math.round((criteria.reduce((s, c) => s + c.score, 0) / criteria.length) * 2) / 2

  const upgrades = [
    CRITERION_TIPS.fluency.upgrade,
    CRITERION_TIPS.lexical.upgrade,
    missed[0]
      ? `下次优先练：${missed[0].phrase} — ${missed[0].example}`
      : '把已用搭配再说一遍，换一个场景复述，加深自动化。',
  ]

  const practiceNext = [
    ...missed.slice(0, 2).map((m) => m.phrase),
    ...used.slice(0, 1).map((u) => u.phrase),
  ].filter((v, i, arr) => arr.indexOf(v) === i)

  return {
    overall,
    summary:
      overall >= 7
        ? '今天已触及 7 分表现区间：内容充分且开始出现精准搭配。继续稳定输出。'
        : '当前仍在 6.5 附近。拉开差距的关键是：更长连贯输出 + 精准主题搭配的自然使用。',
    criteria,
    upgrades,
    collocationsUsed: used.map((u) => u.phrase),
    collocationsMissed: missed.map((m) => m.phrase),
    practiceNext: practiceNext.length
      ? practiceNext
      : getVocabByIds(focusVocab.map((f) => f.id))
          .slice(0, 3)
          .map((v) => v.phrase),
  }
}

export const CRITERION_LABELS: Record<string, string> = {
  fluency: '流利连贯',
  lexical: '词汇资源',
  grammar: '语法多样性',
  pronunciation: '发音',
}
