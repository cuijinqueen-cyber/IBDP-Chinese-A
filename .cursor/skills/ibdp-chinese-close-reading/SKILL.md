---
name: ibdp-chinese-close-reading
description: Build and extend an IBDP Chinese A (Language and Literature) interactive site for text close reading, literary technique identification, and analytical writing practice. Use when the user mentions IBDP/IB 中文、文本精读、手法识别、分析写作、Paper 1、文学分析、close reading, or asks to create lessons, annotations, technique drills, or essay scaffolds for Chinese Language and Literature.
---

# IBDP 中文语言与文学 · 精读与分析写作站点

指导 agent 搭建与迭代一个面向 IBDP Chinese A（Language and Literature）的交互学习网站。核心学习闭环：**精读 → 手法识别 → 分析写作**。

## When to Use

- 用户要创建或扩展本仓库的 IBDP 中文教学站点
- 涉及文本标注、手法识别练习、分析段落/作文支架、Paper 1 风格训练
- 需要按 IB 评估语言设计反馈、rubric、示例答案或课程内容结构

## Product Pillars（不可偏离）

1. **文本精读**：学生可对原文选段做划线、批注、提问；支持分段/逐句聚焦，而非整篇淹没式阅读。
2. **手法识别**：从文段中识别修辞与文学手法，说明「手法是什么 → 在哪里 → 产生什么效果」。
3. **分析写作**：把精读证据写成分析句/段/短文；提供句式支架、PEEL/TEEL 类结构与可对照范文。

每个功能模块必须能回答：学生此刻在练哪一环？如何立刻得到可行动的反馈？

## Default Stack（无指定时采用）

- Next.js（App Router）+ TypeScript + Tailwind CSS
- 中文 UI 为主；术语可附简明英文对照（服务双语教师）
- 内容以本地 JSON/MD 为主，便于教师编辑；不要默认接付费 API
- 优先单页流畅交互，避免臃肿后台；教师编辑可后置

若仓库已有技术栈，**跟随现有栈**，不要重写。

## Build Workflow

1. **澄清范围（有默认则直接做）**
   - 默认 MVP：一篇示例文本 + 精读标注 + 手法选择题/标注题 + 一段分析写作练习与自评 rubric
   - 体裁默认：文学选段（小说/散文/诗歌择一）+ 可选非文学短文入口预留
2. **信息架构**
   - `/` 课程/文本入口
   - `/texts/[id]` 精读工作台（原文 + 批注）
   - `/texts/[id]/techniques` 手法练习
   - `/texts/[id]/write` 分析写作
   - `/rubric` 或侧栏：评估标准速查
3. **实现顺序**
   - 内容模型 → 精读 UI → 手法练习与即时反馈 → 写作支架与 rubric → 教师内容扩展说明
4. **验收**
   - 桌面与手机均可完成「读一段 → 标一处手法 → 写三到五句分析」
   - 无障碍关键路径（键盘可选中文本工具可降级为句级选择）

## Pedagogy Rules（教学内容设计）

读 `references/ibdp-pedagogy.md` 与 `references/technique-taxonomy.md` 后再写文案或练习数据。

- 反馈必须指向 **效果（effect）**，禁止只标「比喻」「排比」等标签而不解释作用
- 分析句默认结构：`文本证据 + 手法命名 + 效果/读者反应 +（可选）与主题/目的的联系`
- 难度分层：识别 → 解释效果 → 比较/评价；UI 上可逐步解锁
- 用语贴近 IB：audience、purpose、context、stylistic features、guiding question 等概念用准确中文表述（见参考文档）
- 不编造官方考试真题；示例文本用公版/原创教学文本，并标注「教学示例」

## UX Rules（交互）

- 精读区：原文为主视觉；工具条精简（划线、批注、手法标记）；不要仪表盘化
- 手法练习：先给文段，再选/标手法；提交后显示「正确手法 + 效果说明 + 可改进处」
- 写作区：左侧证据库（学生已标注的句子），右侧编辑器；提供可插入的分析句式，而非代写全文
- 中文排版：合适行高与段距；长文避免单栏过宽；移动端原文与工具可切换 tab
- 设计遵循用户前端规则：有明确视觉方向与氛围，品牌/产品名在首屏有存在感；教学工具页以「文本工作台」为第一构图，不要堆卡片墙

## Content Model（建议）

```ts
// 概念示意——实现时可调整，但字段语义保持
type Text = {
  id: string
  title: string
  author?: string
  genre: 'fiction' | 'poetry' | 'prose' | 'nonfiction'
  body: string // 或 paragraphs: string[]
  guidingQuestion?: string
  techniques: TechniqueAnnotation[] // 教师预置的标准答案锚点
}

type TechniqueAnnotation = {
  id: string
  start: number // 或 paragraphIndex + quote
  end: number
  techniqueIds: string[]
  effect: string
  sampleAnalysis?: string
}

type Technique = {
  id: string
  nameZh: string
  nameEn?: string
  category: string
  definition: string
  effectHints: string[]
}
```

手法词表以 `references/technique-taxonomy.md` 为准；练习与标准答案引用同一 `id`。

## Writing Scaffolds

写作模块至少提供：

1. **证据提取**：从精读批注一键插入引文
2. **句式菜单**：3–6 条可点选插入的分析句骨架（见 `assets/analysis-sentence-frames.md`）
3. **自评清单**：对照 Paper 1 风格标准的简化 checklist（见 `references/assessment-language.md`）
4. **范文对照**：同题「合格 / 优秀」两段短范文，可折叠，强调结构而非背诵

禁止：一键生成完整学生作文并鼓励直接提交；AI 辅助若存在，只能给提示性问题或指出缺证据/缺效果分析。

## Do / Don't

**Do**

- 保持教师可编辑内容路径清晰（JSON/MD + README 说明）
- 每个练习带即时、具体、可改进的反馈
- 术语与 `references/` 一致

**Don't**

- 做成通用「语文题库」而丢失 IB 导向（目的、读者、语境、文体特征）
- 首屏堆砌统计、课表、多入口营销块
- 引入重型 CMS/鉴权，除非用户明确要求

## Implementation Checklist

复制并逐项完成：

- [ ] 示例文本与 guiding question
- [ ] 精读：划线/批注（至少一种持久化：localStorage）
- [ ] 手法词表接入 + 至少 5 道识别/效果题
- [ ] 写作页：证据插入 + 句式支架 + 自评 rubric
- [ ] 移动端可用的读/练/写流程
- [ ] README：教师如何替换文本与答案

## References

| 需要时再读 | 文件 |
| --- | --- |
| 教学法与学习目标 | `references/ibdp-pedagogy.md` |
| 手法分类词表 | `references/technique-taxonomy.md` |
| 评估用语与反馈话术 | `references/assessment-language.md` |
| 分析句式模板 | `assets/analysis-sentence-frames.md` |
| 示例内容种子 | `assets/sample-text-seed.json` |
