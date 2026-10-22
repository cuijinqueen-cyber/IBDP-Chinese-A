/* 文脉 · 《画皮》精读 tracker：手法色 + 效果色 */
window.APP = {
  brand: "文脉",
  course: "IBDP 中文 A · 文学",
  tagline: "精读 · 主题 · 诠释",
  workId: "huapi",
  workTitle: "画皮"
};

window.CONCEPTS = [
  {
    id: "identity",
    name: "身份",
    nameEn: "Identity",
    color: "#c45c26",
    bg: "rgba(196,92,38,0.18)",
    blurb: "美人皮相与厉鬼本相如何撕裂「所见即所得」？",
    focus: "披皮／揭皮：身份被写成可绘制、可替换的表层。"
  },
  {
    id: "culture",
    name: "文化",
    nameEn: "Culture",
    color: "#8a6d3b",
    bg: "rgba(138,109,59,0.18)",
    blurb: "志怪传统如何承载世情劝诫与识人文化？",
    focus: "狐鬼外壳下的「妍皮祸心」指向人间伪饰。"
  },
  {
    id: "creativity",
    name: "创造力",
    nameEn: "Creativity",
    color: "#2a8f74",
    bg: "rgba(42,143,116,0.18)",
    blurb: "绘皮细节、延宕结构与寓言收束如何组织全篇？",
    focus: "把抽象表里分裂写成可视、可怖的劳动过程。"
  },
  {
    id: "communication",
    name: "沟通",
    nameEn: "Communication",
    color: "#3d6ea8",
    bg: "rgba(61,110,168,0.18)",
    blurb: "道士预警为何说不通？欲望如何阻断沟通？",
    focus: "示警被拒＝信息在，接收意愿无。"
  },
  {
    id: "perspective",
    name: "视角",
    nameEn: "Perspective",
    color: "#b23a2f",
    bg: "rgba(178,58,47,0.16)",
    blurb: "窥视画皮的场景如何改变读者与王生的认知位置？",
    focus: "看见真相仍不改，视角变成讽刺。"
  },
  {
    id: "transformation",
    name: "转变",
    nameEn: "Transformation",
    color: "#1f6f5b",
    bg: "rgba(31,111,91,0.18)",
    blurb: "美人→厉鬼→破裤；王生死而复生，谁真正转变？",
    focus: "皮可变，贪欲若不变，死仍会来。"
  },
  {
    id: "representation",
    name: "再现",
    nameEn: "Representation",
    color: "#4a6670",
    bg: "rgba(74,102,112,0.18)",
    blurb: "文本如何再现伪饰、欲望与牺牲式救助？",
    focus: "由鬼及人：画皮者遍于世间。"
  }
];

window.EFFECT_TYPES = [
  { id: "character", name: "塑造人物", color: "#1e4d8c", bg: "rgba(30,77,140,0.2)", desc: "凸显性格、身份或心理状态" },
  { id: "emotion", name: "引发情感", color: "#9b2c2c", bg: "rgba(155,44,44,0.18)", desc: "调动同情、震撼、不安等读者反应" },
  { id: "atmosphere", name: "营造氛围", color: "#7a5c2e", bg: "rgba(122,92,46,0.2)", desc: "形成恐怖、诡异或劝诫气氛" },
  { id: "theme", name: "深化主题", color: "#0f5c4c", bg: "rgba(15,92,76,0.2)", desc: "把局部描写提升到主题层面" },
  { id: "irony_fx", name: "制造反讽", color: "#c2410c", bg: "rgba(194,65,12,0.18)", desc: "造成认知落差与批判张力" },
  { id: "echo", name: "结构呼应", color: "#475569", bg: "rgba(71,85,105,0.2)", desc: "与前后文形成对照或回环" },
  { id: "foreshadow", name: "铺垫暗示", color: "#a16207", bg: "rgba(161,98,7,0.2)", desc: "预示后续命运或转变" },
  { id: "survival", name: "揭示求生", color: "#6b3f6b", bg: "rgba(107,63,107,0.18)", desc: "暴露危机下的救助、牺牲与伦理" }
];

window.TECHNIQUES = [
  { id: "symbol", name: "象征意象", color: "#176655", bg: "rgba(23,102,85,0.28)", desc: "意象贯穿并升华主题" },
  { id: "contrast", name: "对比", color: "#a83228", bg: "rgba(168,50,40,0.25)", desc: "并置差异以突出矛盾或变化" },
  { id: "detail", name: "细节描写", color: "#9a7428", bg: "rgba(154,116,40,0.28)", desc: "动作、器物、身体传神" },
  { id: "irony", name: "反讽", color: "#d4632a", bg: "rgba(212,99,42,0.25)", desc: "表象与实质错位，引发反思" },
  { id: "structure", name: "结构安排", color: "#5a6b3a", bg: "rgba(90,107,58,0.28)", desc: "延宕、节点、寓言收束" },
  { id: "dialogue", name: "对话声口", color: "#2f5f9a", bg: "rgba(47,95,154,0.28)", desc: "预警、哀告、劝诫的话语功能" },
  { id: "sideview", name: "侧面描写", color: "#556b78", bg: "rgba(85,107,120,0.28)", desc: "借道士、陈氏侧面烘托王生" },
  { id: "metaphor", name: "比喻", color: "#0d7a5f", bg: "rgba(13,122,95,0.28)", desc: "以彼物喻此物，使抽象可感" }
];

window.TEXT_DATA = {
  title: "画皮",
  author: "蒲松龄",
  source: "《聊斋志异》· 教学选段细读版",
  guidingQuestion: "作者如何通过「画皮」象征、对比与叙事延宕，揭示表里分裂与贪欲拒真，并指向人间伪饰？",
  paragraphs: [
    {
      id: "p1",
      num: "①",
      text: "太原王生，早行，遇一女郎，抱袱独奔，甚艰于步。急走趁之，乃二八姝丽。心相爱乐。问：「何凌晨独行？」女曰：「行道之人，不能解愁忧，何劳相问。」生曰：「将以解忧忧耳。卿何愁痛，使我知也？」女垂楚曰：「父母贪贿，鬻妾朱门。嫡妒甚，朝詈而夕楚辱之，所不忍言。将远遁耳。」问：「何之？」曰：「在亡之人，乌有定所。」生言：「敝庐不远，即烦枉顾，当得严扃，勿复忧。」女喜从之。生代携袱物，导与同归。女嘱生曰：「室迹人多，作为莫知。还君遮护。」生颔之。乃匿诸斋中。过数日而人不知也。生微告妻。妻陈，疑为大家媵妾，劝遣之，生不听。"
    },
    {
      id: "p2",
      num: "②",
      text: "偶适市，遇一道士，顾生而愕。问：「何所遇？」答言：「无之。」道士曰：「君身邪气萦绕，所遇必魅。」生以其言妄，拒之。道士曰：「惑哉！明明不能自知，尚不信也。」生回至斋，见室门扃闭，排之不得入。心疑之，越墙而入。则室门亦闭。蹑足近窗，窥之：一狞鬼，面翠色，齿巉巉如锯；铺人皮于榻上，执彩笔而绘之；已而掷笔，举皮如振衣状，披于身，遂化为女子。"
    },
    {
      id: "p3",
      num: "③",
      text: "睹此状，大惧，兽伏而出。急追道士，自诉其状，乞救。道士曰：「我有小术，可以却之。」乃以蝇拂授生，令悬寝门。既归，不敢入斋，乃寝厅上，心悸不宁。既昏，闻斋门内有履声甚厉。近抵厅门，则步声暂止。良久，始去。门上蝇拂，垂垂如梳。生喜，入斋，则女已亡矣。翌日，道士来，戒生曰：「魅迹已绝，然君心邪，当复有变。」生唯唯。道士去。夜半，女复至，骂曰：「道士何能为！我岂遽怕耶！」遂裂腹，掬心而去。妻闻声奔视，生已气绝。"
    },
    {
      id: "p4",
      num: "④",
      text: "道士闻之，怒曰：「此物必不远矣！」乃遍索，见一破裤，裹置道旁。道士指之曰：「此其物也。」叱曰：「老魅可还不复人形！」破裤蠕蠕然，化为厉鬼，伏地乞命。道士以木剑击之，化为烟，驱入瓶中，塞以木塞。"
    },
    {
      id: "p5",
      num: "⑤",
      text: "生既死，妻陈氏哀恸。道士曰：「心亡矣，何以生之？」指示曰：「市上有疯者，乞其痰唾，或可活。」陈氏强忍羞耻，往求疯丐。丐唾其面，令食之。陈氏呕秽，终强咽。归家，抱尸而哭。忽见王生心在喉间，咯咯作响，呕出，落于腔中。生渐苏，复生。"
    },
    {
      id: "p6",
      num: "⑥",
      text: "异史氏曰：「愚哉世人！明明妖也，而以为美。迷哉愚人！明知非人，而犹爱之。然爱之而不知其恶，犹可说也；既知之而不改，则愚而不可及矣。天下妍皮裹物者，固比比皆是也。」"
    }
  ]
};

window.CLOSE_READINGS = [
  {
    phrase: "心相爱乐",
    tech: "detail",
    effectType: "character",
    concepts: ["identity", "perspective"],
    ask: "开篇「心相爱乐」如何为后文执迷埋伏笔？",
    markers: ["二八姝丽", "代携袱物", "匿诸斋中"],
    techHow: "细节／心理点染：未见询问妥当，先起爱乐——欲望先于判断。",
    effect: "塑造色迷心窍的起点，使后文「不信」有性格依据。",
    effectDetail: "悲剧从心动开始，不是从遇鬼开始。",
    model: "「心相爱乐」以心理细节定下贪色基调，为知而不改蓄势。",
    lineParse: "划线是欲望开关。解析＝先情后理，识人已败。"
  },
  {
    phrase: "鬻妾朱门",
    tech: "dialogue",
    effectType: "foreshadow",
    concepts: ["communication", "representation"],
    ask: "女子自述受害，如何构成迷惑性叙述？",
    markers: ["嫡妒甚", "朝詈夕楚", "将远遁"],
    techHow: "对话声口：哀告受害者身份，调动同情，掩护本相。",
    effect: "铺垫「弱者叙事」可被利用；沟通本身成为伪装。",
    effectDetail: "读者与王生一同被声口说服，后文揭皮才更痛。",
    model: "「鬻妾朱门」的哀告以受害者话术制造信任，反衬画皮之伪。",
    lineParse: "划线是伪弱势话术。精读＝好听的苦情也是皮。"
  },
  {
    phrase: "君身邪气萦绕，所遇必魅",
    tech: "dialogue",
    effectType: "foreshadow",
    concepts: ["communication", "culture"],
    ask: "道士预警在结构上起什么作用？",
    markers: ["顾生而愕", "明明不能自知", "生以其言妄"],
    techHow: "对话＝权威示警；结构上给出第一个「可回头」节点。",
    effect: "预示危险，同时暴露王生拒听——沟通失败成主题。",
    effectDetail: "信息足够，意愿不足；个人口述可连「预警被拒」。",
    model: "道士「邪气／必魅」之语预示祸端，反衬王生拒信的执迷。",
    lineParse: "划线是明确判断句。解析重点＝王生如何把真话判成妄。"
  },
  {
    phrase: "执彩笔而绘之",
    tech: "symbol",
    effectType: "theme",
    concepts: ["creativity", "identity"],
    ask: "「绘皮」动作象征什么？",
    markers: ["铺人皮于榻", "掷笔", "举皮如振衣"],
    techHow: "象征：美被写成可制作的工艺；表里分裂可视化。",
    effect: "深化「妍皮」主题——美不是本质，是涂绘。",
    effectDetail: "篇名由此落地；由鬼及人的寓言枢纽。",
    model: "「执彩笔而绘之」以象征动作揭示美为可绘制假面。",
    lineParse: "划线是核心象征动作。绘＝伪饰劳动；越认真越假。"
  },
  {
    phrase: "披于身，遂化为女子",
    tech: "contrast",
    effectType: "irony_fx",
    concepts: ["transformation", "identity"],
    ask: "狞鬼与女子的瞬间对翻造成何种反讽？",
    markers: ["面翠色", "齿巉巉如锯", "化为女子"],
    techHow: "对比／变形：本相与扮相并置，披皮即完成反讽。",
    effect: "制造认知落差：刚才的弱女是披上的结果。",
    effectDetail: "身份可穿脱；「所见」彻底不可靠。",
    model: "披皮化女以对比完成反讽，揭穿皮相之美。",
    lineParse: "划线是变形句。对比力量在「披」字——美靠穿戴。"
  },
  {
    phrase: "生以其言妄，拒之",
    tech: "irony",
    effectType: "irony_fx",
    concepts: ["perspective", "communication"],
    ask: "把真话判为「妄」如何构成反讽？",
    markers: ["惑哉", "不能自知", "尚不信"],
    techHow: "反讽：清醒者被疑，执迷者自认清醒。",
    effect: "突出知行断裂的前奏：拒听＝自欺。",
    effectDetail: "与后文「亲见仍不彻底改」呼应。",
    model: "「言妄，拒之」以认知反讽写欲望屏蔽预警。",
    lineParse: "划线是误判动词组。妄在王生，不在道士。"
  },
  {
    phrase: "以蝇拂授生，令悬寝门",
    tech: "detail",
    effectType: "survival",
    concepts: ["culture", "communication"],
    ask: "蝇拂细节在救助线上起何作用？",
    markers: ["小术可以却之", "垂垂如梳", "女已亡矣"],
    techHow: "细节／器物：超自然救助被物化为可操作的门禁。",
    effect: "暂驱魅，却难改「心邪」——外物救不了内欲。",
    effectDetail: "为道士「君心邪，当复有变」铺垫。",
    model: "蝇拂细节写外力可暂却魅，难除心邪。",
    lineParse: "划线是救助道具。精读＝器可用，心若邪则复来。"
  },
  {
    phrase: "君心邪，当复有变",
    tech: "structure",
    effectType: "foreshadow",
    concepts: ["transformation", "theme"],
    ask: "此句如何预示复至与裂腹？",
    markers: ["魅迹已绝", "生唯唯", "夜半女复至"],
    techHow: "结构预告：外驱不等于内净；心邪是复变条件。",
    effect: "点明主题：问题在欲，不在临时驱邪。",
    effectDetail: "个人口述可连「表层解决 vs 根因未除」。",
    model: "「心邪当复有变」预示执迷未改则祸再临。",
    lineParse: "划线是主题预言句。心邪＝全文病根命名。"
  },
  {
    phrase: "遂裂腹，掬心而去",
    tech: "detail",
    effectType: "emotion",
    concepts: ["representation", "transformation"],
    ask: "裂腹掬心的细节如何完成劝诫？",
    markers: ["道士何能为", "气绝", "心亡"],
    techHow: "恐怖细节：把「丧心」写成字面动作。",
    effect: "强烈震撼；色欲代价可视化。",
    effectDetail: "象征与写实叠合：无心之人。",
    model: "「裂腹掬心」以残酷细节将丧心主题身体化。",
    lineParse: "划线是惩罚高潮。掬心＝贪欲逻辑的肉身句号。"
  },
  {
    phrase: "化为烟，驱入瓶中",
    tech: "symbol",
    effectType: "theme",
    concepts: ["culture", "representation"],
    ask: "瓶收厉鬼的收束象征什么？",
    markers: ["破裤蠕蠕", "伏地乞命", "木塞"],
    techHow: "象征：邪可被镇压收纳，秩序暂时恢复。",
    effect: "志怪驱邪完成；但人间「画皮者」仍在——留白给异史氏。",
    effectDetail: "外鬼可瓶装，世情伪饰难瓶装。",
    model: "瓶中驱鬼象征可镇压的邪魅，反衬人间画皮难尽除。",
    lineParse: "划线是收伏仪式。精读＝故事层结束，寓言层才开口。"
  },
  {
    phrase: "乞其痰唾",
    tech: "contrast",
    effectType: "survival",
    concepts: ["identity", "survival"],
    ask: "陈氏忍辱与王生贪色如何对照？",
    markers: ["强忍羞耻", "呕秽强咽", "精诚"],
    techHow: "对比：一求美色，一吞秽物；救助以女性忍辱为价。",
    effect: "写出至诚救夫，也写牺牲的性别化负担。",
    effectDetail: "复生靠他者，不靠王生自悟——主题更冷。",
    model: "「乞其痰唾」以屈辱细节对照色欲，写牺牲式救助。",
    lineParse: "划线是忍辱关键。对比王生：一迷美，一咽秽。"
  },
  {
    phrase: "呕出，落于腔中",
    tech: "structure",
    effectType: "echo",
    concepts: ["transformation", "creativity"],
    ask: "心归腔中如何与掬心呼应？",
    markers: ["心在喉间", "渐苏", "复生"],
    techHow: "结构呼应：失心／还心形成回环；复生依赖陈氏之诚。",
    effect: "叙事闭合，同时强调自赎之难。",
    effectDetail: "转变发生在救助者身上，多于迷者身上。",
    model: "心归腔中与裂腹掬心结构呼应，完成失而复得的闭环。",
    lineParse: "划线是还心句。回环＝主题上的「心」可失可还，却靠他者。"
  },
  {
    phrase: "明明妖也，而以为美",
    tech: "irony",
    effectType: "theme",
    concepts: ["perspective", "representation"],
    ask: "异史氏此句如何把志怪升为寓言？",
    markers: ["愚哉世人", "迷哉愚人", "知之而不改"],
    techHow: "议论反讽：点破认知错位；由鬼案上升世情。",
    effect: "明确主题：问题是误认与拒改。",
    effectDetail: "个人口述可直接作议题句的文本支撑。",
    model: "「明明妖也，而以为美」以反讽收束，定下识人主题。",
    lineParse: "划线是寓言判词。美／妖对举＝全文公式。"
  },
  {
    phrase: "既知之而不改",
    tech: "structure",
    effectType: "theme",
    concepts: ["transformation", "communication"],
    ask: "「知之而不改」如何总结王生弧线？",
    markers: ["犹可说也", "愚而不可及", "拒道士／见画皮"],
    techHow: "结构收束句：把多次节点的失败命名为知行断裂。",
    effect: "深化主题：真知无行动等于无知。",
    effectDetail: "比「不知」更可责——对准现代「预警已至仍不改」。",
    model: "「既知之而不改」总结执迷，点明知行断裂的劝诫核心。",
    lineParse: "划线是主题句。精读王生＝看见了，仍要骗自己。"
  },
  {
    phrase: "天下妍皮裹物者，固比比皆是也",
    tech: "symbol",
    effectType: "theme",
    concepts: ["culture", "representation"],
    ask: "「妍皮裹物」如何完成由鬼及人？",
    markers: ["异史氏曰", "比比皆是", "画皮"],
    techHow: "象征扩展：画皮从厉鬼技能变成社会普遍现象。",
    effect: "志怪变成世情批判；读者被要求审视人间。",
    effectDetail: "全球性议题接口：形象包装、伪善、人设。",
    model: "「妍皮裹物……比比皆是」将画皮象征推及人间伪饰。",
    lineParse: "划线是寓言升级句。比比皆是＝不止太原书生一案。"
  }
];

window.ANNOTATIONS = window.CLOSE_READINGS.map(function (c) {
  return {
    phrase: c.phrase,
    tech: c.tech,
    effectType: c.effectType,
    concepts: c.concepts,
    effect: c.effect
  };
});

window.READING_NOTES = window.CLOSE_READINGS.reduce(function (acc, c) {
  acc[c.phrase] = c.techHow;
  return acc;
}, {});

window.LAYER1 = {
  intro: "通读选段后，为关键句选择最准确的手法。原文划线同时标出手法类型与效果类型。",
  presentIds: ["symbol", "contrast", "detail", "irony", "structure", "dialogue", "sideview", "metaphor"],
  distractors: [
    { id: "parallel", name: "排比", desc: "三项以上结构相似的并列" },
    { id: "pun", name: "双关", desc: "一词多义的巧妙利用" },
    { id: "hyperbole", name: "夸张", desc: "夸大其词以加强语气" }
  ],
  quoteTasks: [
    {
      id: "q1",
      quote: "铺人皮于榻上，执彩笔而绘之",
      answer: "symbol",
      explain: "象征：绘皮把美写成可制作的假面。"
    },
    {
      id: "q2",
      quote: "一狞鬼……披于身，遂化为女子",
      answer: "contrast",
      explain: "对比：本相与扮相对翻，完成惊变。"
    },
    {
      id: "q3",
      quote: "君身邪气萦绕，所遇必魅。／生以其言妄，拒之",
      answer: "irony",
      explain: "反讽：真话被判妄，执迷者拒听预警。"
    },
    {
      id: "q4",
      quote: "遂裂腹，掬心而去",
      answer: "detail",
      explain: "细节：丧心被写成字面动作，冲击强。"
    },
    {
      id: "q5",
      quote: "君心邪，当复有变",
      answer: "structure",
      explain: "结构预告：外驱难除内欲，复祸将至。"
    },
    {
      id: "q6",
      quote: "父母贪贿，鬻妾朱门……将远遁耳",
      answer: "dialogue",
      explain: "对话：受害者哀告构成迷惑性声口。"
    },
    {
      id: "q7",
      quote: "明明妖也，而以为美……既知之而不改",
      answer: "irony",
      explain: "议论反讽：点破误认与拒改。"
    },
    {
      id: "q8",
      quote: "天下妍皮裹物者，固比比皆是也",
      answer: "symbol",
      explain: "象征扩展：由鬼及人，伪饰普遍化。"
    }
  ]
};

window.LAYER2 = {
  intro: "识别之后追问效果：塑造人物、引发情感、深化主题、制造反讽、揭示救助伦理等。",
  tasks: [
    {
      id: "e1",
      quote: "执彩笔而绘之……披于身，遂化为女子",
      tech: "symbol",
      effectType: "theme",
      concept: "identity",
      prompt: "绘皮／披皮的主要效果是？",
      options: [
        { id: "a", text: "介绍古代化妆步骤", correct: false },
        { id: "b", text: "把美写成可制作假面，深化表里分裂主题", correct: true },
        { id: "c", text: "赞美女子心灵手巧", correct: false },
        { id: "d", text: "说明王生喜欢画画", correct: false }
      ],
      explain: "象征让「妍皮」可视化，主题从志怪升到识人。"
    },
    {
      id: "e2",
      quote: "道士示警，生以其言妄，拒之",
      tech: "irony",
      effectType: "irony_fx",
      concept: "communication",
      prompt: "拒听预警最可能产生的效果是？",
      options: [
        { id: "a", text: "证明道士一定在骗钱", correct: false },
        { id: "b", text: "反讽欲望屏蔽真相，沟通失败", correct: true },
        { id: "c", text: "说明太原没有道教", correct: false },
        { id: "d", text: "只为增加对话字数", correct: false }
      ],
      explain: "信息在、意愿无；知行断裂由此开始。"
    },
    {
      id: "e3",
      quote: "裂腹，掬心而去",
      tech: "detail",
      effectType: "emotion",
      concept: "representation",
      prompt: "此细节的主要阅读效果是？",
      options: [
        { id: "a", text: "科普古代医学", correct: false },
        { id: "b", text: "以恐怖视觉完成劝诫，使「丧心」可感", correct: true },
        { id: "c", text: "赞美厉鬼武力", correct: false },
        { id: "d", text: "暗示陈氏也会遇害", correct: false }
      ],
      explain: "残酷细节把抽象贪欲代价钉入身体。"
    },
    {
      id: "e4",
      quote: "君心邪，当复有变／女复至",
      tech: "structure",
      effectType: "foreshadow",
      concept: "transformation",
      prompt: "预告与复至的结构作用是？",
      options: [
        { id: "a", text: "证明驱邪完全成功", correct: false },
        { id: "b", text: "强调外物暂驱，内欲未改则祸再临", correct: true },
        { id: "c", text: "说明蝇拂质量不好", correct: false },
        { id: "d", text: "只为延长篇幅", correct: false }
      ],
      explain: "结构点明病根在心邪，不在临时法器。"
    },
    {
      id: "e5",
      quote: "陈氏乞痰唾……王生复生",
      tech: "contrast",
      effectType: "survival",
      concept: "survival",
      prompt: "这一对照线主要揭示什么？",
      options: [
        { id: "a", text: "太原市集小吃丰富", correct: false },
        { id: "b", text: "迷者难自赎，复生靠至诚牺牲；欲与诚对照", correct: true },
        { id: "c", text: "疯丐医术高明", correct: false },
        { id: "d", text: "陈氏贪图遗产", correct: false }
      ],
      explain: "救助伦理与性别化代价由此显出。"
    },
    {
      id: "e6",
      quote: "天下妍皮裹物者，固比比皆是也",
      tech: "symbol",
      effectType: "theme",
      concept: "representation",
      prompt: "异史氏收束的效果是？",
      options: [
        { id: "a", text: "宣布妖鬼已经绝迹", correct: false },
        { id: "b", text: "由鬼及人，把画皮推成社会伪饰寓言", correct: true },
        { id: "c", text: "号召人人学习绘画", correct: false },
        { id: "d", text: "只总结太原风俗", correct: false }
      ],
      explain: "象征扩展完成志怪到世情的跃迁。"
    }
  ]
};

window.LAYER3 = {
  intro: "综合细读：证据→手法→效果→概念／主题。写120–220字。亦可为个人口述全球性议题蓄力。",
  prompts: [
    {
      id: "w1",
      title: "画皮象征",
      concept: "identity",
      question: "作者如何通过「绘皮／披皮」细节，把表里分裂写成可视象征？效果如何通向识人主题？",
      hints: ["执彩笔而绘之", "披于身化为女子", "妍皮裹物"]
    },
    {
      id: "w2",
      title: "知而不改",
      concept: "perspective",
      question: "从道士示警到亲见画皮，王生如何体现「知之而不改」？结构延宕起何作用？",
      hints: ["言妄拒之", "蝇拂", "心邪当复有变", "裂腹掬心"]
    },
    {
      id: "w3",
      title: "欲与诚／全球性议题",
      concept: "representation",
      question: "比较王生贪色与陈氏忍辱：文本如何再现欲望、伪饰与牺牲式救助？可连结一则全球性议题。",
      hints: ["心相爱乐", "乞其痰唾", "异史氏曰"]
    }
  ],
  frames: [
    "作者运用……手法，将「……」描写为……，使读者感受到……。",
    "这一写法不仅塑造了……，更揭示了……（概念／主题／全球性议题）。",
    "与后文／前文「……」形成对照，强化了……的表达效果。"
  ],
  rubric: [
    { id: "evidence", label: "文本证据", tip: "含具体引文或明确指涉句段" },
    { id: "technique", label: "手法命名", tip: "准确使用文学术语" },
    { id: "effect", label: "效果阐释", tip: "说明对读者／意义的作用，而非只贴标签" },
    { id: "concept", label: "概念／主题", tip: "连接到身份、再现、转变等，或具体全球性议题" },
    { id: "cohesion", label: "连贯表达", tip: "句间有推进，避免情节复述堆砌" }
  ],
  sample:
    "作者以「执彩笔而绘之」「披于身，遂化为女子」的细节，将美写成可制作、可穿戴的假面，象征表里分裂；道士示警而王生「以其言妄，拒之」，又经「心邪，当复有变」的结构预告，突出知而不改。裂腹掬心把丧心主题身体化，陈氏乞痰唾则对照出至诚与牺牲。异史氏所谓「妍皮裹物……比比皆是」，终将志怪推向人间伪饰的劝诫与全球性议题：人们如何被精致表层迷惑而拒绝真相。"
};
