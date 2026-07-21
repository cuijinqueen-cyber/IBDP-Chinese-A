import type { DailyMock, SentencePattern, VocabItem } from '../types'

export const VOCAB_BANK: VocabItem[] = [
  {
    id: 'v1',
    phrase: 'a steep learning curve',
    meaning: '陡峭的学习曲线；上手难但进步快',
    example: 'Teaching myself coding has been a steep learning curve.',
    topic: 'Education',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 a steep learning curve 写一句：你学某项技能起初很难。",
    speakCue: "Describe a skill that was hard at first. Use “a steep learning curve”.",
  },
  {
    id: 'v2',
    phrase: 'broaden my horizons',
    meaning: '开阔视野',
    example: 'Travelling abroad really broadened my horizons.',
    topic: 'Travel',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 broaden my/one’s horizons 写一句关于旅行或读书的句子。",
    speakCue: "How can travel help young people? Use “broaden my horizons”.",
  },
  {
    id: 'v3',
    phrase: 'play a pivotal role',
    meaning: '起关键作用',
    example: 'Technology plays a pivotal role in modern education.',
    topic: 'Technology',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 play a pivotal role 写科技或教育的作用。",
    speakCue: "What role does technology play in education? Use “play a pivotal role”.",
  },
  {
    id: 'v4',
    phrase: 'strike a balance between',
    meaning: '在…之间取得平衡',
    example: 'I try to strike a balance between work and leisure.',
    topic: 'Lifestyle',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 strike a balance between A and B 写工作与生活。",
    speakCue: "How do you manage busy days? Use “strike a balance between”.",
  },
  {
    id: 'v5',
    phrase: 'a double-edged sword',
    meaning: '双刃剑',
    example: 'Social media is a double-edged sword for teenagers.',
    topic: 'Society',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 a double-edged sword 写社交媒体或AI的利弊。",
    speakCue: "Is social media good for teenagers? Use “a double-edged sword”.",
  },
  {
    id: 'v6',
    phrase: 'take something for granted',
    meaning: '把…视为理所当然',
    example: 'We often take clean water for granted.',
    topic: 'Environment',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 take … for granted 写人们忽视某资源的句子。",
    speakCue: "What do people often ignore in daily life? Use “take … for granted”.",
  },
  {
    id: 'v7',
    phrase: 'shed light on',
    meaning: '阐明；揭示',
    example: 'This documentary sheds light on climate change.',
    topic: 'Media',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 shed light on 写一部纪录片或新闻的作用。",
    speakCue: "How can documentaries help us? Use “shed light on”.",
  },
  {
    id: 'v8',
    phrase: 'a sense of belonging',
    meaning: '归属感',
    example: 'Community events give people a sense of belonging.',
    topic: 'Community',
    level: 'band7',
    type: 'topic',
    writeCue: "用 a sense of belonging 写社区或学校的感受。",
    speakCue: "Why are community events important? Use “a sense of belonging”.",
  },
  {
    id: 'v9',
    phrase: 'hands-on experience',
    meaning: '实践经验',
    example: 'Internships provide valuable hands-on experience.',
    topic: 'Work',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 hands-on experience 写实习或实践的价值。",
    speakCue: "Are internships useful? Use “hands-on experience”.",
  },
  {
    id: 'v10',
    phrase: 'cultural immersion',
    meaning: '文化沉浸',
    example: 'Living with a host family offers true cultural immersion.',
    topic: 'Culture',
    level: 'band7',
    type: 'topic',
    writeCue: "用 cultural immersion 写留学或寄宿家庭。",
    speakCue: "What is the best way to learn a culture? Use “cultural immersion”.",
  },
  {
    id: 'v11',
    phrase: 'cut down on',
    meaning: '减少',
    example: 'I am trying to cut down on sugary drinks.',
    topic: 'Health',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 cut down on 写一个健康或环保习惯。",
    speakCue: "What healthy changes have you made? Use “cut down on”.",
  },
  {
    id: 'v12',
    phrase: 'food for thought',
    meaning: '发人深省的内容',
    example: 'Her speech really gave me food for thought.',
    topic: 'Ideas',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 food for thought 写一次演讲或文章给你的启发。",
    speakCue: "Tell me about an idea that made you think. Use “food for thought”.",
  },
  {
    id: 'v13',
    phrase: 'urban sprawl',
    meaning: '城市扩张 / 摊大饼',
    example: 'Urban sprawl has put pressure on public transport.',
    topic: 'Cities',
    level: 'band7',
    type: 'topic',
    writeCue: "用 urban sprawl 写城市扩张的影响。",
    speakCue: "How are cities changing? Use “urban sprawl”.",
  },
  {
    id: 'v14',
    phrase: 'keep abreast of',
    meaning: '紧跟；了解最新情况',
    example: 'I read tech blogs to keep abreast of new trends.',
    topic: 'Technology',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 keep abreast of 写跟上趋势/新闻。",
    speakCue: "How do you stay updated? Use “keep abreast of”.",
  },
  {
    id: 'v15',
    phrase: 'a tight-knit community',
    meaning: '紧密团结的社区',
    example: 'I grew up in a tight-knit community where neighbours helped each other.',
    topic: 'Community',
    level: 'band7',
    type: 'topic',
    writeCue: "用 a tight-knit community 写你的家乡或邻里。",
    speakCue: "Describe your neighbourhood. Use “a tight-knit community”.",
  },
  {
    id: 'v16',
    phrase: 'recharge my batteries',
    meaning: '恢复精力；充电',
    example: 'A quiet weekend helps me recharge my batteries.',
    topic: 'Lifestyle',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 recharge my batteries 写周末如何休息。",
    speakCue: "What do you do to relax? Use “recharge my batteries”.",
  },
  {
    id: 'v17',
    phrase: 'make ends meet',
    meaning: '勉强维持生计',
    example: 'Some graduates struggle to make ends meet in big cities.',
    topic: 'Work',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 make ends meet 写大城市生活成本。",
    speakCue: "Is it hard for graduates in big cities? Use “make ends meet”.",
  },
  {
    id: 'v18',
    phrase: 'environmental footprint',
    meaning: '环境足迹',
    example: 'Cycling reduces my environmental footprint.',
    topic: 'Environment',
    level: 'band7',
    type: 'topic',
    writeCue: "用 environmental footprint 写减少影响的做法。",
    speakCue: "How can individuals help the planet? Use “environmental footprint”.",
  },
  {
    id: 'v19',
    phrase: 'go the extra mile',
    meaning: '多付出努力；格外用心',
    example: 'Good teachers go the extra mile for their students.',
    topic: 'Education',
    level: 'band7',
    type: 'collocation',
    writeCue: "用 go the extra mile 写一位老师或同事。",
    speakCue: "Describe a helpful teacher. Use “go the extra mile”.",
  },
  {
    id: 'v20',
    phrase: 'a household name',
    meaning: '家喻户晓的名字',
    example: 'That brand has become a household name worldwide.',
    topic: 'Media',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 a household name 写一个品牌或名人。",
    speakCue: "Talk about a famous brand. Use “a household name”.",
  },
  {
    id: 'v21',
    phrase: 'quality time',
    meaning: '高质量陪伴时间',
    example: 'I cherish quality time with my family on weekends.',
    topic: 'Family',
    level: 'upgrade',
    type: 'topic',
    writeCue: "用 quality time 写和家人朋友相处。",
    speakCue: "How do you spend weekends with family? Use “quality time”.",
  },
  {
    id: 'v22',
    phrase: 'break the ice',
    meaning: '打破僵局；缓和气氛',
    example: 'A shared joke can break the ice in a new group.',
    topic: 'People',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 break the ice 写认识新朋友的场景。",
    speakCue: "How do you start conversations with strangers? Use “break the ice”.",
  },
  {
    id: 'v23',
    phrase: 'sustainable lifestyle',
    meaning: '可持续的生活方式',
    example: 'More young people are adopting a sustainable lifestyle.',
    topic: 'Environment',
    level: 'band7',
    type: 'topic',
    writeCue: "用 sustainable lifestyle 写年轻人的环保选择。",
    speakCue: "Are young people more eco-friendly now? Use “sustainable lifestyle”.",
  },
  {
    id: 'v24',
    phrase: 'think outside the box',
    meaning: '跳出思维定式',
    example: 'Creative jobs require you to think outside the box.',
    topic: 'Work',
    level: 'upgrade',
    type: 'collocation',
    writeCue: "用 think outside the box 写创意工作或解题。",
    speakCue: "What skills do creative jobs need? Use “think outside the box”.",
  },
]

export const DAILY_MOCKS: DailyMock[] = [
  {
    id: 'm0',
    dayIndex: 0,
    topic: 'Hometown & Daily Life',
    topicZh: '家乡与日常生活',
    modelHighlights: [
      'a tight-knit community',
      'strike a balance between',
      'quality time',
      'recharge my batteries',
    ],
    parts: [
      {
        id: 'p1',
        label: 'Part 1',
        prompt:
          'Where is your hometown? What do you like most about living there? Has it changed much in recent years?',
        tips: '用具体细节回答，避免只说 “it’s nice”。尝试自然插入 1–2 个搭配。',
        speakSeconds: 90,
        focusVocabIds: ['v15', 'v4', 'v21'],
      },
      {
        id: 'p2',
        label: 'Part 2',
        prompt:
          'Describe a place in your hometown that you often visit.\nYou should say:\n• where it is\n• how often you go there\n• what you do there\nand explain why this place is special to you.',
        tips: '1 分钟准备，说满 1.5–2 分钟。结构：地点 → 频率 → 活动 → 情感原因。',
        prepSeconds: 60,
        speakSeconds: 120,
        focusVocabIds: ['v15', 'v16', 'v21'],
      },
      {
        id: 'p3',
        label: 'Part 3',
        prompt:
          'Do you think people today spend enough quality time with their neighbours? How can cities help build stronger communities?',
        tips: '先给立场，再举例对比过去/现在，最后给建议。目标词汇：a sense of belonging。',
        speakSeconds: 120,
        focusVocabIds: ['v8', 'v15', 'v13'],
      },
    ],
  },
  {
    id: 'm1',
    dayIndex: 1,
    topic: 'Education & Learning',
    topicZh: '教育与学习',
    modelHighlights: [
      'a steep learning curve',
      'hands-on experience',
      'go the extra mile',
      'play a pivotal role',
    ],
    parts: [
      {
        id: 'p1',
        label: 'Part 1',
        prompt:
          'What subjects did you enjoy at school? Do you prefer studying alone or in a group? How do you usually learn new skills?',
        tips: '用过去时谈学校经历，再用现在时谈习惯。插入 hands-on experience。',
        speakSeconds: 90,
        focusVocabIds: ['v1', 'v9', 'v19'],
      },
      {
        id: 'p2',
        label: 'Part 2',
        prompt:
          'Describe a skill you learned that was difficult at first.\nYou should say:\n• what the skill was\n• how you learned it\n• what challenges you faced\nand explain how you feel about this skill now.',
        tips: '强调过程与转折：困难 → 坚持 → 突破。推荐搭配：a steep learning curve。',
        prepSeconds: 60,
        speakSeconds: 120,
        focusVocabIds: ['v1', 'v9', 'v19'],
      },
      {
        id: 'p3',
        label: 'Part 3',
        prompt:
          'Should schools focus more on practical skills or academic knowledge? How is technology changing the way people learn?',
        tips: '两面讨论，避免极端。用 play a pivotal role / a double-edged sword。',
        speakSeconds: 120,
        focusVocabIds: ['v3', 'v5', 'v9'],
      },
    ],
  },
  {
    id: 'm2',
    dayIndex: 2,
    topic: 'Technology & Media',
    topicZh: '科技与媒体',
    modelHighlights: [
      'a double-edged sword',
      'keep abreast of',
      'shed light on',
      'a household name',
    ],
    parts: [
      {
        id: 'p1',
        label: 'Part 1',
        prompt:
          'How often do you use social media? Which apps are most popular among young people? Do you prefer reading news online or in print?',
        tips: '给出频率词 + 原因。避免堆砌 “convenient”。',
        speakSeconds: 90,
        focusVocabIds: ['v5', 'v14', 'v20'],
      },
      {
        id: 'p2',
        label: 'Part 2',
        prompt:
          'Describe a useful app or website you often use.\nYou should say:\n• what it is\n• how you use it\n• how often you use it\nand explain why you find it useful.',
        tips: '具体场景 > 抽象优点。可提 keep abreast of trends。',
        prepSeconds: 60,
        speakSeconds: 120,
        focusVocabIds: ['v14', 'v3', 'v20'],
      },
      {
        id: 'p3',
        label: 'Part 3',
        prompt:
          'Is technology making people more informed or more distracted? What responsibility do media companies have when reporting news?',
        tips: '先定义 “informed”，再谈利弊。用 shed light on / double-edged sword。',
        speakSeconds: 120,
        focusVocabIds: ['v5', 'v7', 'v14'],
      },
    ],
  },
  {
    id: 'm3',
    dayIndex: 3,
    topic: 'Environment & Lifestyle',
    topicZh: '环境与生活方式',
    modelHighlights: [
      'environmental footprint',
      'sustainable lifestyle',
      'cut down on',
      'take something for granted',
    ],
    parts: [
      {
        id: 'p1',
        label: 'Part 1',
        prompt:
          'Do you care about environmental issues? What do you do to protect the environment in daily life? Are people in your country environmentally conscious?',
        tips: '举 2 个具体行动（骑车、少用塑料）。用 cut down on。',
        speakSeconds: 90,
        focusVocabIds: ['v11', 'v18', 'v23'],
      },
      {
        id: 'p2',
        label: 'Part 2',
        prompt:
          'Describe an environmentally friendly habit you have.\nYou should say:\n• what the habit is\n• when you started it\n• how you keep it up\nand explain why it matters to you.',
        tips: '习惯的起源 + 坚持方法 + 意义。目标：sustainable lifestyle。',
        prepSeconds: 60,
        speakSeconds: 120,
        focusVocabIds: ['v23', 'v18', 'v11'],
      },
      {
        id: 'p3',
        label: 'Part 3',
        prompt:
          'Should governments or individuals take more responsibility for protecting the environment? How can cities reduce their environmental footprint?',
        tips: '政府 vs 个人分层回答。用 take … for granted 谈资源。',
        speakSeconds: 120,
        focusVocabIds: ['v6', 'v18', 'v13'],
      },
    ],
  },
  {
    id: 'm4',
    dayIndex: 4,
    topic: 'Work & Ambition',
    topicZh: '工作与志向',
    modelHighlights: [
      'hands-on experience',
      'think outside the box',
      'make ends meet',
      'go the extra mile',
    ],
    parts: [
      {
        id: 'p1',
        label: 'Part 1',
        prompt:
          'Do you work or are you a student? What kind of job would you like in the future? Is it important to enjoy your work?',
        tips: '未来志向用 would like / aspire to。补充一条现实考量。',
        speakSeconds: 90,
        focusVocabIds: ['v9', 'v24', 'v17'],
      },
      {
        id: 'p2',
        label: 'Part 2',
        prompt:
          'Describe a job you would like to try.\nYou should say:\n• what the job is\n• what skills it requires\n• how you would prepare for it\nand explain why this job appeals to you.',
        tips: '技能清单要具体。可用 think outside the box / go the extra mile。',
        prepSeconds: 60,
        speakSeconds: 120,
        focusVocabIds: ['v24', 'v19', 'v9'],
      },
      {
        id: 'p3',
        label: 'Part 3',
        prompt:
          'Is job satisfaction more important than a high salary? How has remote work changed people’s work-life balance?',
        tips: '明确比较维度，再举例。呼应 strike a balance between。',
        speakSeconds: 120,
        focusVocabIds: ['v4', 'v17', 'v16'],
      },
    ],
  },
  {
    id: 'm5',
    dayIndex: 5,
    topic: 'Travel & Culture',
    topicZh: '旅行与文化',
    modelHighlights: [
      'broaden my horizons',
      'cultural immersion',
      'break the ice',
      'food for thought',
    ],
    parts: [
      {
        id: 'p1',
        label: 'Part 1',
        prompt:
          'Do you like travelling? Where did you last go on holiday? Do you prefer travelling alone or with others?',
        tips: '用一次真实行程细节（交通、食物、感受）。',
        speakSeconds: 90,
        focusVocabIds: ['v2', 'v10', 'v22'],
      },
      {
        id: 'p2',
        label: 'Part 2',
        prompt:
          'Describe a trip that helped you learn about another culture.\nYou should say:\n• where you went\n• who you went with\n• what you learned\nand explain how the trip changed your views.',
        tips: '重点放在 “学到了什么”。推荐：cultural immersion / broaden my horizons。',
        prepSeconds: 60,
        speakSeconds: 120,
        focusVocabIds: ['v2', 'v10', 'v12'],
      },
      {
        id: 'p3',
        label: 'Part 3',
        prompt:
          'Why do people travel abroad? Can tourism harm local cultures? How can travellers show respect for local traditions?',
        tips: '利弊 + 建议三段。可用 food for thought 收尾。',
        speakSeconds: 120,
        focusVocabIds: ['v2', 'v10', 'v12'],
      },
    ],
  },
  {
    id: 'm6',
    dayIndex: 6,
    topic: 'People & Relationships',
    topicZh: '人物与人际关系',
    modelHighlights: [
      'break the ice',
      'a sense of belonging',
      'quality time',
      'go the extra mile',
    ],
    parts: [
      {
        id: 'p1',
        label: 'Part 1',
        prompt:
          'Who do you spend most of your free time with? Are you good at making new friends? What makes a good friend?',
        tips: '用具体品质替代空泛形容词（reliable / supportive）。',
        speakSeconds: 90,
        focusVocabIds: ['v22', 'v21', 'v8'],
      },
      {
        id: 'p2',
        label: 'Part 2',
        prompt:
          'Describe a person who has had a positive influence on you.\nYou should say:\n• who the person is\n• how you know them\n• what they did\nand explain how they influenced you.',
        tips: '影响要可观察：态度/习惯/选择的变化。',
        prepSeconds: 60,
        speakSeconds: 120,
        focusVocabIds: ['v19', 'v21', 'v8'],
      },
      {
        id: 'p3',
        label: 'Part 3',
        prompt:
          'Is it harder to maintain friendships today than in the past? How do social activities help people feel they belong?',
        tips: '对比线上/线下。目标词汇：a sense of belonging。',
        speakSeconds: 120,
        focusVocabIds: ['v8', 'v22', 'v5'],
      },
    ],
  },
]

export const SENTENCE_PATTERNS: SentencePattern[] = [
  {
    id: 'sp1',
    pattern: 'Although…, I still believe…',
    meaning: '让步 + 坚持观点（Part 3 高分结构）',
    frame: 'Although __, I still believe __.',
    example: 'Although online courses are flexible, I still believe classroom interaction matters.',
    writeCue: '用 Although…, I still believe… 写：虽然网购方便，但我仍认为实体店体验重要。',
    speakCue: 'Can technology replace teachers? Answer with “Although…, I still believe…”.',
    topic: 'Opinion',
  },
  {
    id: 'sp2',
    pattern: 'One clear example is…',
    meaning: '举例展开，避免空泛',
    frame: 'One clear example is __.',
    example: 'One clear example is students using apps to keep abreast of news.',
    writeCue: '用 One clear example is… 举例说明科技如何帮助学习。',
    speakCue: 'How does technology help learning? Start with “One clear example is…”.',
    topic: 'Example',
  },
  {
    id: 'sp3',
    pattern: 'This is largely because…',
    meaning: '解释原因，提升连贯',
    frame: 'This is largely because __.',
    example: 'This is largely because people want to strike a balance between work and rest.',
    writeCue: '用 This is largely because… 解释为什么年轻人重视工作生活平衡。',
    speakCue: 'Why do people value work-life balance? Use “This is largely because…”.',
    topic: 'Reason',
  },
  {
    id: 'sp4',
    pattern: 'Compared with the past,…',
    meaning: '古今对比',
    frame: 'Compared with the past, __.',
    example: 'Compared with the past, people spend less quality time with neighbours.',
    writeCue: '用 Compared with the past,… 对比现在与过去的社交方式。',
    speakCue: 'How have friendships changed? Use “Compared with the past,…”.',
    topic: 'Comparison',
  },
  {
    id: 'sp5',
    pattern: 'Not only… but also…',
    meaning: '递进强调两个好处/影响',
    frame: 'Not only __, but also __.',
    example: 'Travel not only broadens our horizons, but also builds confidence.',
    writeCue: '用 Not only… but also… 写旅行的两个好处。',
    speakCue: 'What are the benefits of travelling? Use “Not only… but also…”.',
    topic: 'Emphasis',
  },
  {
    id: 'sp6',
    pattern: 'If …, then …',
    meaning: '条件假设，适合给建议',
    frame: 'If __, then __.',
    example: 'If cities invest in green transport, then our environmental footprint will shrink.',
    writeCue: '用 If…, then… 给城市环保一条建议。',
    speakCue: 'How can cities become greener? Use “If…, then…”.',
    topic: 'Suggestion',
  },
  {
    id: 'sp7',
    pattern: 'What matters most is…',
    meaning: '突出最重要的一点',
    frame: 'What matters most is __.',
    example: 'What matters most is getting hands-on experience before graduation.',
    writeCue: '用 What matters most is… 写找工作时最重要的因素。',
    speakCue: 'What matters most when choosing a job? Use “What matters most is…”.',
    topic: 'Focus',
  },
  {
    id: 'sp8',
    pattern: 'In the long run,…',
    meaning: '谈长远影响',
    frame: 'In the long run, __.',
    example: 'In the long run, a sustainable lifestyle benefits both people and the planet.',
    writeCue: '用 In the long run,… 写坚持环保习惯的长远好处。',
    speakCue: 'Why should we care about the environment? Use “In the long run,…”.',
    topic: 'Future',
  },
]

export function getMockForDay(dayCursor: number): DailyMock {
  return DAILY_MOCKS[dayCursor % DAILY_MOCKS.length]
}

export function getVocabByIds(ids: string[]): VocabItem[] {
  return ids
    .map((id) => VOCAB_BANK.find((v) => v.id === id))
    .filter((v): v is VocabItem => Boolean(v))
}

export function getVocabByPhrase(phrase: string): VocabItem | undefined {
  const lower = phrase.toLowerCase()
  return VOCAB_BANK.find((v) => v.phrase.toLowerCase() === lower)
}

export function getTodayVocab(dayCursor: number): VocabItem[] {
  const mock = getMockForDay(dayCursor)
  const fromParts = mock.parts.flatMap((p) => getVocabByIds(p.focusVocabIds))
  const fromHighlights = mock.modelHighlights
    .map((p) => getVocabByPhrase(p))
    .filter((v): v is VocabItem => Boolean(v))
  const map = new Map([...fromParts, ...fromHighlights].map((v) => [v.id, v]))
  return [...map.values()]
}

export function getPatternsForDay(dayCursor: number): SentencePattern[] {
  const start = dayCursor % SENTENCE_PATTERNS.length
  return [0, 1, 2].map((i) => SENTENCE_PATTERNS[(start + i) % SENTENCE_PATTERNS.length])
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function containsTarget(text: string, target: string): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim()
  const t = norm(text)
  const key = norm(target)
  if (t.includes(key)) return true
  // allow flexible "take X for granted"
  if (key.includes('…') || key.includes('...')) {
    const parts = key.split(/…|\.\.\./).map((p) => p.trim()).filter(Boolean)
    return parts.every((p) => t.includes(p))
  }
  if (key.includes('something')) {
    return t.includes(key.replace('something', '').trim()) || /take .+ for granted/.test(t)
  }
  return false
}

