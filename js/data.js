/* 文脉 · IBDP 文学 · 七大概念 + 三层精读练习数据 */
window.APP = {
  brand: "文脉",
  course: "IBDP 中文 A · 文学",
  tagline: "精读 · 主题 · 诠释"
};

/* IB 语言A文学：七大概念（各有独立色标） */
window.CONCEPTS = [
  {
    id: "identity",
    name: "身份",
    nameEn: "Identity",
    color: "#c45c26",
    bg: "rgba(196,92,38,0.18)",
    blurb: "文本如何塑造人物/叙述者的自我认知与尊严？",
    focus: "少年“我”的自尊心被当众斩断，成年叙述者重新定义这段伤害。"
  },
  {
    id: "culture",
    name: "文化",
    nameEn: "Culture",
    color: "#8a6d3b",
    bg: "rgba(138,109,59,0.18)",
    blurb: "乡土教育、体罚、入团等习俗如何构成权力语境？",
    focus: "师生权力、号歌、挖薯与入团，折射特定年代的教育文化。"
  },
  {
    id: "creativity",
    name: "创造力",
    nameEn: "Creativity",
    color: "#2a8f74",
    bg: "rgba(42,143,116,0.18)",
    blurb: "作者如何创造性地编织意象链与情感节奏？",
    focus: "快刀—水草—芽—刀斫之痕：意象递进把羞辱写成创伤诗学。"
  },
  {
    id: "communication",
    name: "沟通",
    nameEn: "Communication",
    color: "#3d6ea8",
    bg: "rgba(61,110,168,0.18)",
    blurb: "耳光、辱骂、沉默与怜悯如何构成（失败的）沟通？",
    focus: "暴力与沉默代替对话；晚年偶遇仍无法开口，沟通始终断裂。"
  },
  {
    id: "perspective",
    name: "视角",
    nameEn: "Perspective",
    color: "#b23a2f",
    bg: "rgba(178,58,47,0.16)",
    blurb: "成年回顾的双重视角如何改写少年仇恨？",
    focus: "叙述者既贴近少年创伤，又以成熟声音评价、笑看与怜悯。"
  },
  {
    id: "transformation",
    name: "转变",
    nameEn: "Transformation",
    color: "#1f6f5b",
    bg: "rgba(31,111,91,0.18)",
    blurb: "从寻仇到发奋，再到怜悯，情感如何转变？",
    focus: "仇恨—发奋—一笑泯之—怜悯：成长即对伤害的重新理解。"
  },
  {
    id: "representation",
    name: "再现",
    nameEn: "Representation",
    color: "#4a6670",
    bg: "rgba(74,102,112,0.18)",
    blurb: "文本如何再现创伤记忆与权力关系？",
    focus: "细节、反差与象征共同再现“被忽视的柔弱心灵”。"
  }
];

/* 文学手法色板（与概念色标分开体系） */
window.TECHNIQUES = [
  { id: "metaphor", name: "比喻", color: "#0d7a5f", bg: "rgba(13,122,95,0.28)", desc: "以彼物喻此物，使抽象可感" },
  { id: "personify", name: "拟人", color: "#2f5f9a", bg: "rgba(47,95,154,0.28)", desc: "赋予物以人的情态动作" },
  { id: "contrast", name: "对比", color: "#a83228", bg: "rgba(168,50,40,0.25)", desc: "并置差异以突出矛盾或变化" },
  { id: "detail", name: "细节描写", color: "#9a7428", bg: "rgba(154,116,40,0.28)", desc: "细微动作与感官细节传情" },
  { id: "psycho", name: "心理描写", color: "#5a6b3a", bg: "rgba(90,107,58,0.28)", desc: "直接呈现内心活动与幻想" },
  { id: "irony", name: "反讽反差", color: "#d4632a", bg: "rgba(212,99,42,0.25)", desc: "表象与实质的错位" },
  { id: "symbol", name: "象征意象", color: "#176655", bg: "rgba(23,102,85,0.28)", desc: "意象贯穿并升华主题" },
  { id: "flashback", name: "插叙对照", color: "#556b78", bg: "rgba(85,107,120,0.28)", desc: "插入他事以对照或铺垫" }
];

window.TEXT_DATA = {
  title: "英语老师",
  author: "谢宗玉",
  source: "选自《在往事中成长》· 教学示例文本",
  guidingQuestion: "作者如何通过语言手法与叙事视角，再现成长中的伤害，并引导读者重新理解师生权力与身份尊严？",
  paragraphs: [
    { id: "p1", num: "①", text: "早晨，阳光照进教室，照着一颗颗晃动的脑袋和一张张开合的嘴。我们在晨读，我们在大声晨读。别人读的是英语，我对英语不感兴趣，我在读语文。英语老师从后面走进教室，我没觉察。他冷不防从我手中把书抢了，反手就甩了我一个耳光。一教室沸扬的声音就这样被他突如其来的耳光给掀哑了，大家愣愣地看着我俩，早晨照进来的阳光这时也有些茫然无措的样子。" },
    { id: "p2", num: "②", text: "英语老师扭过头叫道：你们停下来干嘛！然后一教室芽一般的声音又怯怯冒出来，顷刻间又是一片灿烂。英语老师拍了一下手，没事般地走了。" },
    { id: "p3", num: "③", text: "他没事一般，我可不行，我在众目睽睽之下，俯下身把语文课本拾起。然后伏在课桌上，一动也不动，我能遏止自己的哭声，但止不住的泪水却从我的指缝里快速渗出来。虽然我知道错了，一三五的早晨该读英语。但我的过错难道就该由这记毫无商量余地的耳光来惩罚吗？想到这里，我的眼泪又流快了。我从没有被人打过耳光，更没有在这样的大庭广众下受过辱，我满脸火辣辣的，不是因为疼痛，而是因为羞耻！我感觉我那个叫自尊心的东西，在这个早晨，就像被一把无形的快刀给拦腰斩断了。" },
    { id: "p4", num: "④", text: "接下来的几天，我一直不声不响低着头进出教室。而在心中，仇恨的水草却疯了般昂扬生长。是的，我要报复，我要杀了他！我一定要杀了这个让我当众丢丑的家伙！我要用最直接的方法报复，我要痛快淋漓地拿刀捅了他！……我低着头，一声不响，就这样在自己的幻想中把内心捣鼓得壮怀激烈。那被拦腰斩断的自尊心在伤口处似乎又长出了细嫩的芽儿来。我最终还是失去了寻刀杀人的决心，英语老师就这样在懵懵懂懂中逃过一劫。我后来的想法是，我一定要发奋读书，将来超过他，再来羞辱他！" },
    { id: "p5", num: "⑤", text: "但很快就有一事，让我进入了两难境地。那天英语老师闯进教室，对教室里的三个同学说：下午帮我去挖薯吧。你，你，还有你，来，把书收起，我们这就走。" },
    { id: "p6", num: "⑥", text: "三个同学其中一个就是我，英语老师仿佛早就忘了两个月以前发生的事。但现在他既然点到我了，我不能让他知道我心中的仇恨。我只能敛着头，和另两个同学一起去了他家。我记得一进家门，他就像个妇人样叨叨唠唠地骂着他的妻子：日日死人，怎么不见你死？！这样骂人的话是我第一次听到，所以一下子就记住了，而且根深蒂固。挖薯时，我时不时就把红薯给挖断了。我应该不是故意这样的。挖薯是一项技术活，也是一项体力活，在家里，这常常是我爸的事。我还太小，力气也小，一锄下去，挖得不深，红薯往往就被拦腰截断了。我看见英语老师不时地皱着眉头，后来他说：宗玉啊，你书也读得不好，事也做得不好，以后就等着进棺材吧。我一脸怍羞，我年纪轻轻，没想到他竟把我与棺材联系上了。心中的恨意一下子又增加了，可手中的活儿并不能停下……" },
    { id: "p7", num: "⑦", text: "我现在算有些明白他那时为什么脱口就是棺材就是死了。那时他除了当老师，晚上常常替人唱号歌，哪里死了人，来请他。他一般不拒绝，十里八里也要赶去。他的号歌唱得不错。小时他在茶陵住过，一口的茶陵腔，用茶陵腔唱号歌，他的号歌就别具一格。有时在教室上课，他的声音也拉得好长，像唱号歌。有时夜里唱号歌唱得太晚，白天上课，他把作业布置下去，就趴在讲桌上睡着了。" },
    { id: "p8", num: "⑧", text: "挖薯回来后不久，碰上学校组织学生入团。那时入团是件非常时髦的事，我们班当时只有三个名额，英语老师就把帮他挖过薯的三个同学都推荐上去了。全班同学知道这事后，都议论纷纷。因为如果凭成绩，我们三个没有一个能上。后来，另两个同学就在那次入了团。而我没有。因为我拒绝写入团申请书。我这样做，一是对英语老师的软性对抗。用老甘的话说，就是非暴力不合作吧。二是在同学们的冷嘲热讽中，实在没什么脸面写入团申请书。" },
    { id: "p9", num: "⑨", text: "好在与英语老师总算有分开的一天。初中毕业，我怀揣着仇恨悄悄离开学校。我没有忘记自己的“使命”，我对自己说：有朝一日，我终是要回来的。" },
    { id: "p10", num: "⑩", text: "可到高中毕业的时候，我就为自己幼稚的想法感到好笑了。我看金庸那些侠骨豪情的武打书，江湖上的似海深仇，都可以一笑泯之。而我与英语老师之间的破事，算得了什么呢？他自己也许根本就没把这事记在心上，几年过后，我这个人就可能从他头脑中淡出了。" },
    { id: "p11", num: "⑪", text: "大学里有天晚上，我与一个同学在法律楼的天台上闲扯，说到中学的事，他居然也有类似的经历。不同的是，他依然把仇恨带在心上。他说：总有一天，我要跑回去指着他的鼻子骂一顿。我听后，不禁哑然失笑。唉，也许他还没参悟透吧……" },
    { id: "p12", num: "⑫", text: "不过，回头想想，也许并不完全是少年人的心胸太过狭窄……我们怀揣多深的仇恨上路，说明我们当时的伤害就有多深。随着时间的淘洗，仇恨也许可以忘记，但伤害之痛在事隔多年想起来，仍可以使心灵颤抖……那时的心灵是多么柔弱啊，可仿佛没有几个大人（包括老师家长和其他成年人）注意，所以成长的心灵，注定会遍布刀斫之痕……" },
    { id: "p13", num: "⑬", text: "英语老师后来教不了英语，就调到邻校一个中学敲钟守门。参加工作后有一次回家，我还真的碰上他了。我远远见到他，心里猛地颤了一下，然后想也没想，就逃也似的溜了……" },
    { id: "p14", num: "⑭", text: "走远了，我突然有种想哭的感觉，英语老师他真的很老了……老得让我有说不出的怜悯。" }
  ]
};

/* 精读锚点：原文短语 → 手法 + 概念（用于彩色标注与对照） */
window.ANNOTATIONS = [
  { phrase: "阳光这时也有些茫然无措的样子", tech: "personify", concepts: ["creativity", "perspective"], effect: "景物拟人分担尴尬，放大当众受辱的窒息感。" },
  { phrase: "芽一般的声音又怯怯冒出来", tech: "metaphor", concepts: ["creativity", "culture"], effect: "以怯怯冒出的芽喻压抑后的顺从，暗示权力下的恐惧。" },
  { phrase: "没事般地走了", tech: "irony", concepts: ["communication", "identity"], effect: "施暴者轻描淡写，与受害者无法平静形成伦理反差。" },
  { phrase: "他没事一般，我可不行", tech: "contrast", concepts: ["identity", "perspective"], effect: "并置双方反应，凸显权力不对等与尊严受损。" },
  { phrase: "泪水却从我的指缝里快速渗出来", tech: "detail", concepts: ["identity", "representation"], effect: "动作细节写出强忍却失控的羞耻。" },
  { phrase: "被一把无形的快刀给拦腰斩断了", tech: "metaphor", concepts: ["identity", "creativity"], effect: "把抽象自尊心具象为可被斩断之物，强化精神创伤。" },
  { phrase: "仇恨的水草却疯了般昂扬生长", tech: "metaphor", concepts: ["transformation", "creativity"], effect: "潮湿蔓延的水草写仇恨难以铲除，预示情感失控。" },
  { phrase: "我要报复，我要杀了他", tech: "psycho", concepts: ["identity", "transformation"], effect: "内心独白暴露少年创伤的极端反应。" },
  { phrase: "细嫩的芽儿来", tech: "metaphor", concepts: ["transformation", "creativity"], effect: "伤口生芽暗示尊严/仇恨的再生与转化可能。" },
  { phrase: "像唱号歌", tech: "metaphor", concepts: ["culture", "representation"], effect: "把课堂声音与丧葬号歌相连，暗示死亡语汇渗入日常。" },
  { phrase: "非暴力不合作", tech: "irony", concepts: ["communication", "culture"], effect: "借政治语汇命名拒绝入团，软性对抗权力。" },
  { phrase: "一笑泯之", tech: "contrast", concepts: ["transformation", "perspective"], effect: "以武侠宽解对照私人恩怨，标记叙述者成熟。" },
  { phrase: "他依然把仇恨带在心上", tech: "flashback", concepts: ["perspective", "transformation"], effect: "插入同学经历作对照，凸显“我”已参悟。" },
  { phrase: "遍布刀斫之痕", tech: "symbol", concepts: ["representation", "identity", "creativity"], effect: "呼应快刀意象，将个人羞辱普遍化为成长创伤。" },
  { phrase: "说不出的怜悯", tech: "contrast", concepts: ["transformation", "communication"], effect: "仇恨转为怜悯，完成情感转变，却仍无法真正沟通。" }
];

/* —— 第一层：识别文本手法 —— */
window.LAYER1 = {
  intro: "通读选段后，先判断文中出现了哪些文学手法，再为关键句选择最准确的手法名称。目标：练“看见”——能定位、能命名。",
  presentIds: ["metaphor", "personify", "contrast", "detail", "psycho", "irony", "symbol", "flashback"],
  distractors: [
    { id: "parallel", name: "排比", desc: "三项以上结构相似的并列" },
    { id: "pun", name: "双关", desc: "一词多义的巧妙利用" },
    { id: "allusion", name: "用典", desc: "引用典故或成句" }
  ],
  quoteTasks: [
    {
      id: "q1",
      quote: "早晨照进来的阳光这时也有些茫然无措的样子。",
      answer: "personify",
      explain: "拟人：阳光“茫然无措”，景物分担尴尬，放大公开受辱的气氛。"
    },
    {
      id: "q2",
      quote: "仇恨的水草却疯了般昂扬生长。",
      answer: "metaphor",
      explain: "比喻：以水草写仇恨的潮湿、蔓延与难以铲除。"
    },
    {
      id: "q3",
      quote: "自尊心……就像被一把无形的快刀给拦腰斩断了。",
      answer: "metaphor",
      explain: "比喻：把抽象尊严具象为可被斩断之物，强化精神创伤的剧烈感。"
    },
    {
      id: "q4",
      quote: "他没事一般，我可不行……",
      answer: "contrast",
      explain: "对比：施害者若无其事与受害者无法平静，凸显权力不对等。"
    },
    {
      id: "q5",
      quote: "俯下身把语文课本拾起。然后伏在课桌上……泪水却从我的指缝里快速渗出来。",
      answer: "detail",
      explain: "细节描写：俯、拾、伏与泪自指缝渗出，写出无力与屈辱。"
    },
    {
      id: "q6",
      quote: "大学同学仍怀恨在心，而“我”已哑然失笑。",
      answer: "flashback",
      explain: "插叙对照：插入同学经历，对照不同成长路径，铺垫主题。"
    },
    {
      id: "q7",
      quote: "成长的心灵，注定会遍布刀斫之痕……",
      answer: "symbol",
      explain: "象征：呼应前文“快刀”，将个人伤痛普遍化为成长创伤。"
    },
    {
      id: "q8",
      quote: "英语老师拍了一下手，没事般地走了。 / 后来“我”却逃也似的溜了，终觉怜悯。",
      answer: "irony",
      explain: "反讽反差：老师的轻描淡写与“我”长久的精神余震形成错位。"
    }
  ]
};

/* —— 第二层：分析手法的作用与效果 —— */
window.LAYER2 = {
  intro: "识别之后，进一步追问：这一手法如何作用于读者感受、人物形象与主题？每题选出最贴切的效果说明，并思考它通向哪一概念。",
  tasks: [
    {
      id: "e1",
      quote: "阳光这时也有些茫然无措的样子",
      tech: "personify",
      concept: "perspective",
      prompt: "此处拟人的主要效果是？",
      options: [
        { id: "a", text: "说明当天天气突变，预示情节转折", correct: false },
        { id: "b", text: "让景物分担尴尬，放大公开受辱的窒息气氛", correct: true },
        { id: "c", text: "赞美晨光美好，冲淡暴力场面", correct: false },
        { id: "d", text: "暗示英语老师内心也感到愧疚", correct: false }
      ],
      explain: "景物拟人把教室里的尴尬外化，读者与“大家”一起愣住，强化当众羞辱的压迫感；同时以旁观式视角烘托事件冲击。"
    },
    {
      id: "e2",
      quote: "自尊心……被一把无形的快刀给拦腰斩断了",
      tech: "metaphor",
      concept: "identity",
      prompt: "“快刀”这一比喻如何服务于主题？",
      options: [
        { id: "a", text: "强调耳光造成的身体疼痛", correct: false },
        { id: "b", text: "把抽象尊严具象化，凸显精神创伤的剧烈与不可逆", correct: true },
        { id: "c", text: "暗示叙述者日后真的会持刀报复", correct: false },
        { id: "d", text: "表现英语老师武功高强", correct: false }
      ],
      explain: "尊严被写成可斩断之物，使“身份”受损变得可感；后文“刀斫之痕”与之呼应，形成意象链。"
    },
    {
      id: "e3",
      quote: "他没事一般，我可不行",
      tech: "contrast",
      concept: "communication",
      prompt: "这一对比最能揭示什么？",
      options: [
        { id: "a", text: "师生性格一冷一热的差异", correct: false },
        { id: "b", text: "权力不对等下沟通断裂：施暴者可抽身，受害者无法平静", correct: true },
        { id: "c", text: "“我”小题大做，老师并无恶意", correct: false },
        { id: "d", text: "教室纪律很快恢复正常", correct: false }
      ],
      explain: "对比不是简单性格描写，而是呈现沟通失败与伦理失衡：暴力取代对话，一方“没事”，一方创伤长留。"
    },
    {
      id: "e4",
      quote: "仇恨的水草却疯了般昂扬生长",
      tech: "metaphor",
      concept: "transformation",
      prompt: "用水草写仇恨，对情感转变线有何作用？",
      options: [
        { id: "a", text: "表现“我”热爱植物与自然", correct: false },
        { id: "b", text: "写出仇恨潮湿、蔓延、难以铲除，为后文从寻仇到转化蓄势", correct: true },
        { id: "c", text: "说明教室环境潮湿阴暗", correct: false },
        { id: "d", text: "讽刺同学的冷漠围观", correct: false }
      ],
      explain: "水草意象让仇恨可视化、有生命力；后文“芽儿”“一笑泯之”“怜悯”构成转变轨迹的对照。"
    },
    {
      id: "e5",
      quote: "他依然把仇恨带在心上……我……哑然失笑",
      tech: "flashback",
      concept: "perspective",
      prompt: "插入同学经历的主要效果是？",
      options: [
        { id: "a", text: "证明所有学生都曾被体罚", correct: false },
        { id: "b", text: "以对照凸显成年叙述者视角的转变与“参悟”", correct: true },
        { id: "c", text: "引出法律楼天台的风景描写", correct: false },
        { id: "d", text: "批评同学胆小不敢报复", correct: false }
      ],
      explain: "插叙提供平行个案，让读者看见两种回应创伤的路径；“失笑”标记视角成熟，而非简单原谅。"
    },
    {
      id: "e6",
      quote: "成长的心灵，注定会遍布刀斫之痕",
      tech: "symbol",
      concept: "representation",
      prompt: "“刀斫之痕”作为象征，如何完成主题升华？",
      options: [
        { id: "a", text: "仅回顾耳光的物理伤痕", correct: false },
        { id: "b", text: "呼应“快刀”意象，把个人羞辱再现为普遍的成长创伤", correct: true },
        { id: "c", text: "暗示成年人故意伤害儿童", correct: false },
        { id: "d", text: "呼吁废除所有学校教育", correct: false }
      ],
      explain: "象征把私密记忆写成可共享的创伤再现；同时回扣身份、文化权力与被忽视的柔弱心灵。"
    }
  ]
};

/* —— 第三层：写一段文本分析 —— */
window.LAYER3 = {
  intro: "综合前两层：选定证据 → 命名手法 → 阐释效果 → 连接概念/主题。完成一段 120–220 字的分析文字。",
  prompts: [
    {
      id: "w1",
      title: "身份与尊严",
      concept: "identity",
      question: "作者如何通过比喻与细节描写，表现少年“我”的身份尊严如何被当众摧毁？",
      hints: ["快刀 / 拦腰斩断", "指缝渗泪、俯身拾书", "效果 → 主题：精神创伤"]
    },
    {
      id: "w2",
      title: "视角与转变",
      concept: "perspective",
      question: "成年叙述者的回顾视角，如何改写少年仇恨并完成情感转变？请结合插叙或对比手法分析。",
      hints: ["一笑泯之 / 同学对照", "双重视角", "从寻仇到怜悯"]
    },
    {
      id: "w3",
      title: "意象与再现",
      concept: "representation",
      question: "从“快刀”“水草”“芽”到“刀斫之痕”，意象链如何再现成长创伤这一主题？",
      hints: ["意象递进", "个人→普遍", "创造力与再现"]
    }
  ],
  frames: [
    "作者运用……手法，将“……”描写为……，使读者感受到……。",
    "这一写法不仅……，更进一步揭示了……（概念/主题）。",
    "与后文“……”形成呼应/对照，强化了……的表达效果。"
  ],
  rubric: [
    { id: "evidence", label: "文本证据", tip: "含具体引文或明确指涉句段" },
    { id: "technique", label: "手法命名", tip: "准确使用文学术语" },
    { id: "effect", label: "效果阐释", tip: "说明对读者/意义的作用，而非只贴标签" },
    { id: "concept", label: "概念/主题", tip: "连接到身份、视角、转变、再现等概念之一" },
    { id: "cohesion", label: "连贯表达", tip: "句间有推进，避免情节复述堆砌" }
  ],
  sample: "作者以“无形的快刀……拦腰斩断”为喻，将抽象的自尊心具象为可被斩断之物，使当众受辱的精神创伤变得剧烈可感。配合“泪水……从指缝里……渗出来”的细节，羞耻被写成身体化的失控。这一写法紧扣“身份”概念：少年的自我尊严在权力暴力下瞬间崩塌，并为后文“刀斫之痕”的象征升华埋下意象伏笔。"
};
