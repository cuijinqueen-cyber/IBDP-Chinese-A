export type StageId = "read" | "techniques" | "write";

export type TechniqueDef = {
  id: string;
  nameZh: string;
  nameEn: string;
};

export type TextContent = {
  id: string;
  title: string;
  author: string;
  genre: string;
  guidingQuestion: string;
  paragraphs: string[];
  techniques: {
    id: string;
    paragraphIndex: number;
    quote: string;
    techniqueIds: string[];
    effect: string;
  }[];
  quiz: {
    id: string;
    paragraphIndex: number;
    prompt: string;
    options: string[];
    correctTechniqueIds: string[];
    effectAnswer: string;
  }[];
  writingPrompt: string;
  sentenceFrames: string[];
  checklist: string[];
};

export type Annotation = {
  id: string;
  paragraphIndex: number;
  quote: string;
  note: string;
  createdAt: number;
};

export type StageProgress = {
  status: "locked" | "available" | "in_progress" | "done";
  score?: number;
  completedAt?: number;
};

export type TextProgress = {
  textId: string;
  stages: Record<StageId, StageProgress>;
  annotations: Annotation[];
  quizAnswers: Record<string, string[]>;
  quizCorrect: Record<string, boolean>;
  writingDraft: string;
  checklistChecked: boolean[];
  updatedAt: number;
};

export const STAGES: {
  id: StageId;
  label: string;
  short: string;
  hint: string;
}[] = [
  {
    id: "read",
    label: "文本精读",
    short: "精读",
    hint: "划线批注，抓住关键词句",
  },
  {
    id: "techniques",
    label: "手法识别",
    short: "手法",
    hint: "命名手法，并说明效果",
  },
  {
    id: "write",
    label: "分析写作",
    short: "写作",
    hint: "用证据写成分析段",
  },
];

export const TECHNIQUE_MAP: Record<string, TechniqueDef> = {
  metaphor: { id: "metaphor", nameZh: "隐喻", nameEn: "metaphor" },
  simile: { id: "simile", nameZh: "明喻", nameEn: "simile" },
  imagery: { id: "imagery", nameZh: "意象", nameEn: "imagery" },
  hyperbole: { id: "hyperbole", nameZh: "夸张", nameEn: "hyperbole" },
  parallelism: { id: "parallelism", nameZh: "排比", nameEn: "parallelism" },
  repetition: { id: "repetition", nameZh: "反复", nameEn: "repetition" },
  "rhetorical-question": {
    id: "rhetorical-question",
    nameZh: "设问/反问",
    nameEn: "rhetorical question",
  },
  irony: { id: "irony", nameZh: "反讽", nameEn: "irony" },
  flashback: { id: "flashback", nameZh: "倒叙", nameEn: "flashback" },
  statistics: { id: "statistics", nameZh: "数据列举", nameEn: "statistics" },
};

export function techniqueLabel(id: string): string {
  return TECHNIQUE_MAP[id]?.nameZh ?? id;
}
