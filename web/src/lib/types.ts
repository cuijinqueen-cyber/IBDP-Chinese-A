export type StageId = "read" | "techniques" | "write";

export type TechniqueDef = {
  id: string;
  nameZh: string;
  nameEn: string;
  definition: string;
  effectHints: string[];
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
  sampleResponses?: {
    developing: string;
    strong: string;
  };
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
  metaphor: {
    id: "metaphor",
    nameZh: "隐喻",
    nameEn: "metaphor",
    definition: "不出现「像/如」等比较词，直接把一事物当作另一事物来写。",
    effectHints: ["建立形象联想", "使抽象情感具体可感"],
  },
  simile: {
    id: "simile",
    nameZh: "明喻",
    nameEn: "simile",
    definition: "用「像、如、仿佛」等词作显式比较。",
    effectHints: ["突出相似点", "让意象更清晰可感"],
  },
  imagery: {
    id: "imagery",
    nameZh: "意象",
    nameEn: "imagery",
    definition: "调动视觉、听觉等感官，形成可感画面或氛围。",
    effectHints: ["营造氛围", "支撑象征与情感"],
  },
  hyperbole: {
    id: "hyperbole",
    nameZh: "夸张",
    nameEn: "hyperbole",
    definition: "故意夸大或缩小，以强化感受或态度。",
    effectHints: ["放大情绪", "制造张力或讽刺"],
  },
  parallelism: {
    id: "parallelism",
    nameZh: "排比",
    nameEn: "parallelism",
    definition: "结构相近的短语或句子并列推进。",
    effectHints: ["增强气势与节奏", "强调并列观念"],
  },
  repetition: {
    id: "repetition",
    nameZh: "反复",
    nameEn: "repetition",
    definition: "关键词句重复出现。",
    effectHints: ["突出关键词", "形成节奏或执念感"],
  },
  "rhetorical-question": {
    id: "rhetorical-question",
    nameZh: "设问/反问",
    nameEn: "rhetorical question",
    definition: "以问句形式推进，未必期待实际回答。",
    effectHints: ["引导思考", "强化语气"],
  },
  irony: {
    id: "irony",
    nameZh: "反讽",
    nameEn: "irony",
    definition: "字面意思与实际意味形成反差。",
    effectHints: ["制造认知落差", "促使读者反思"],
  },
  flashback: {
    id: "flashback",
    nameZh: "倒叙",
    nameEn: "flashback",
    definition: "回溯过去事件，打断当前时间线。",
    effectHints: ["补充动机与背景", "改变信息揭示节奏"],
  },
  statistics: {
    id: "statistics",
    nameZh: "数据列举",
    nameEn: "statistics",
    definition: "援引数字或事实以支持判断。",
    effectHints: ["增强客观感与可信度"],
  },
  personification: {
    id: "personification",
    nameZh: "拟人",
    nameEn: "personification",
    definition: "把非人对象写成具有人的动作或情感。",
    effectHints: ["增强生动性", "引发移情"],
  },
  contrast: {
    id: "contrast",
    nameZh: "对比",
    nameEn: "contrast",
    definition: "并置差异鲜明的形象、语气或观念。",
    effectHints: ["凸显差异", "清晰化态度或主题"],
  },
};

export const TECHNIQUE_LIST = Object.values(TECHNIQUE_MAP);

export function techniqueLabel(id: string): string {
  return TECHNIQUE_MAP[id]?.nameZh ?? id;
}
