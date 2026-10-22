/* 文脉 · 《金大班的最后一夜》精读 tracker：手法色 + 效果色 */
window.APP = {
  brand: "文脉",
  course: "IBDP 中文 A · 文学",
  tagline: "精读 · 主题 · 诠释",
  workId: "jindaban",
  workTitle: "金大班的最后一夜"
};

window.CONCEPTS = [
  {
    id: "identity",
    name: "身份",
    nameEn: "Identity",
    color: "#c45c26",
    bg: "rgba(196,92,38,0.18)",
    blurb: "“玉观音／金大班／货腰娘”多重命名如何撕裂身份？",
    focus: "舞台硬壳与内心残存真情并置，身份始终在表演与本真之间。"
  },
  {
    id: "culture",
    name: "文化",
    nameEn: "Culture",
    color: "#8a6d3b",
    bg: "rgba(138,109,59,0.18)",
    blurb: "百乐门记忆如何在夜巴黎被降格再生产？",
    focus: "上海十里洋场 vs 台北舞厅：流亡者的文化落差与怀旧。"
  },
  {
    id: "creativity",
    name: "创造力",
    nameEn: "Creativity",
    color: "#2a8f74",
    bg: "rgba(42,143,116,0.18)",
    blurb: "一夜框、意识流与粗口喜剧如何组织全篇？",
    focus: "倒叙插叙、镜前闪回、开放结局构成精巧结构。"
  },
  {
    id: "communication",
    name: "沟通",
    nameEn: "Communication",
    color: "#3d6ea8",
    bg: "rgba(61,110,168,0.18)",
    blurb: "“娘个冬采”与骂中赠戒如何暴露沟通层次？",
    focus: "粗口硬壳裂开处，温情与创伤才得以传递。"
  },
  {
    id: "perspective",
    name: "视角",
    nameEn: "Perspective",
    color: "#b23a2f",
    bg: "rgba(178,58,47,0.16)",
    blurb: "全知外视与金大班意识如何切换？",
    focus: "叙述钻进内心独白，读者同时看见表演与盘算。"
  },
  {
    id: "transformation",
    name: "转变",
    nameEn: "Transformation",
    color: "#1f6f5b",
    bg: "rgba(31,111,91,0.18)",
    blurb: "从嘲“饿嫁”到下嫁陈发荣，转变如何被逼出？",
    focus: "月如真情 → 秦雄等不起 → 物质依附：道路被迫改写。"
  },
  {
    id: "representation",
    name: "再现",
    nameEn: "Representation",
    color: "#4a6670",
    bg: "rgba(74,102,112,0.18)",
    blurb: "文本如何再现货腰娘的物化、灵肉之争与时代挽歌？",
    focus: "以喜剧外壳写悲剧内核，个人收场映射迁徙世代。"
  }
];

window.EFFECT_TYPES = [
  { id: "character", name: "塑造人物", color: "#1e4d8c", bg: "rgba(30,77,140,0.2)", desc: "凸显性格、身份或心理状态" },
  { id: "emotion", name: "引发情感", color: "#9b2c2c", bg: "rgba(155,44,44,0.18)", desc: "调动同情、震撼、不安等读者反应" },
  { id: "atmosphere", name: "营造氛围", color: "#7a5c2e", bg: "rgba(122,92,46,0.2)", desc: "形成时代、空间或情绪气氛" },
  { id: "theme", name: "深化主题", color: "#0f5c4c", bg: "rgba(15,92,76,0.2)", desc: "把局部描写提升到主题层面" },
  { id: "irony_fx", name: "制造反讽", color: "#c2410c", bg: "rgba(194,65,12,0.18)", desc: "造成认知落差与批判张力" },
  { id: "echo", name: "结构呼应", color: "#475569", bg: "rgba(71,85,105,0.2)", desc: "与前后文形成对照或回环" },
  { id: "foreshadow", name: "铺垫暗示", color: "#a16207", bg: "rgba(161,98,7,0.2)", desc: "预示后续命运或转变" },
  { id: "survival", name: "揭示求生", color: "#6b3f6b", bg: "rgba(107,63,107,0.18)", desc: "暴露创伤下的生存策略与伦理" }
];

window.TECHNIQUES = [
  { id: "metaphor", name: "比喻", color: "#0d7a5f", bg: "rgba(13,122,95,0.28)", desc: "以彼物喻此物，使抽象可感" },
  { id: "symbol", name: "象征意象", color: "#176655", bg: "rgba(23,102,85,0.28)", desc: "意象贯穿并升华主题" },
  { id: "contrast", name: "对比", color: "#a83228", bg: "rgba(168,50,40,0.25)", desc: "并置差异以突出矛盾或变化" },
  { id: "detail", name: "细节描写", color: "#9a7428", bg: "rgba(154,116,40,0.28)", desc: "服饰、动作、器物传神" },
  { id: "irony", name: "反讽", color: "#d4632a", bg: "rgba(212,99,42,0.25)", desc: "表象与实质错位，引发反思" },
  { id: "dialogue", name: "对话声口", color: "#2f5f9a", bg: "rgba(47,95,154,0.28)", desc: "俚俗口语塑造人物与关系" },
  { id: "sideview", name: "侧面描写", color: "#556b78", bg: "rgba(85,107,120,0.28)", desc: "借他人／镜像人物侧面烘托" },
  { id: "structure", name: "结构安排", color: "#5a6b3a", bg: "rgba(90,107,58,0.28)", desc: "时间框、倒叙插叙、意识流动" }
];

window.TEXT_DATA = {
  title: "金大班的最后一夜",
  author: "白先勇",
  source: "教学示例文本（教师提供）· 选段细读版",
  guidingQuestion: "作者如何通过一夜框结构、粗口喜剧、今昔对照与意识流闪回，塑造金兆丽矛盾立体的形象，并再现货腰娘的灵肉之争与时代落差？",
  paragraphs: [
    {
      id: "p1",
      num: "①",
      text: "娘个冬采！金大班走进化妆室把手包豁啷一声摔到了化妆台上，一屁股便坐在一面大化妆镜前，狠狠地啐了一口。左一个夜巴黎，右一个夜巴黎。说起来不好听，百乐门里那间厕所只怕比夜巴黎的舞池还宽敞些呢，童得怀那副脸嘴在百乐门掏粪坑未必有他的份。夜巴黎不靠了我玉观音金兆丽这块老牌子，就撑得起今天这个场面了？"
    },
    {
      id: "p2",
      num: "②",
      text: "金大班凑近了那面大化妆镜，把嘴巴使劲一咧，她那张涂得浓脂艳粉的脸蛋儿，眼角子上突然便现出了几把鱼尾巴来。四十岁的女人，还由得你理论别人的年纪吗？这个把月来，在宜香美容院就不知花了多少冤枉钱。拉面皮、扯眉毛——脸上就没剩下一块肉没受过罪。每次和陈老头儿出去的时候，竟像是披枷带锁，上法场似的，勒肚子束腰，假屁股假奶，大七月里，绑得那一身的家私，发得她一肚皮成饼成饼的热痱子。"
    },
    {
      id: "p3",
      num: "③",
      text: "她私自估了一下，陈发荣那边三四百万的家当总还少不了。阳明山庄那幢八十万的别墅，一买下来，就过到了她金兆丽的名下。她曾对姐妹们夸下海口：“我才没有你们那样饿嫁，个个去捧块棺材板。”可如今她到底还是决定下嫁这个六十大几的土财主。要一个像任黛黛那样的绸缎庄，当然要比她的那个大一倍，并且要开在富春楼的对面。"
    },
    {
      id: "p4",
      num: "④",
      text: "任黛黛下嫁棉纱大王的时候，她犀利地说过：“我们细丁香的好本事，钓到一头大千年金龟。”她妒忌地想：筱红美是一个头等难缠的刁妇，心黑手辣，耍了这些年就没见过她栽过跟头。那起小娼妇哪里见过从前那种日子？那种架势？当年在上海，拜倒她玉观音裙下，像陈发荣那点根基的人，扳起脚趾头来还数不完呢！"
    },
    {
      id: "p5",
      num: "⑤",
      text: "朱凤因为得罪客人，童得怀要将她赶出去，金大班挺身救了她，教她十八般武艺，一再警戒：玩是玩，耍是耍，货腰娘第一大忌是让人家睡大肚皮。如今朱凤却为了一个香港侨生怀了身孕，哭哭啼啼来求她。金大班怨其不争，臭骂一顿之后，又甩给她价值五百美金的一克拉半的大钻石戒指，安排她以后的生活。"
    },
    {
      id: "p6",
      num: "⑥",
      text: "看见朱凤，她便想起自己。那晚月如第一次到百乐门去，羞得连头都不抬起来，纯洁得像白纸一样。她深深爱上了他，想为他生一个孩子——对舞女而言无疑是自掘坟墓。姆妈把她肚里已成型的男胎打下时，她甚至想过死。二十多年过去，月如早已远去，可那份刻骨的爱，仍埋在心里最圣洁的地方。"
    },
    {
      id: "p7",
      num: "⑦",
      text: "秦雄待她真心实意，拿出可怜巴巴的七万元存折，说再积攒五年就能买房子讨她做老婆。金兆丽却无动于衷。女人到了四十岁，便没有功夫谈恋爱；只要衣食无忧，甚至连真正的男人都可以不要。下嫁陈发荣的头一天晚上，她连信都没给秦雄去一封。多走了二十年的远路后，她已明白自己需要的是什么，而不再去奢求自己想要的。"
    },
    {
      id: "p8",
      num: "⑧",
      text: "耳坠、项链、手串、发针，金碧辉煌地挂了一身。可当她在舞池里看见那个周身都露着怯态、没有招呼人伴舞的年轻男人时，心中忽然一软。她走过去，轻轻柔柔地数着拍子：一、二、三——仿佛卸下了浓脂艳粉的面具。曲终人散，这是金大班的最后一夜，前路茫茫，孤寂与悲凉却像夜巴黎的灯光一样，明明灭灭，不肯散尽。"
    }
  ]
};

window.CLOSE_READINGS = [
  {
    phrase: "娘个冬采",
    tech: "dialogue",
    effectType: "character",
    concepts: ["identity", "communication"],
    ask: "开篇口头禅如何立刻立住人物？",
    markers: ["上海弄堂粗口", "恼怒／不屑语气", "与后文温情落差"],
    techHow: "对话声口：以习惯性粗口给人物贴标签。精读时把它当“硬壳”——职业面具的声音形式。",
    effect: "瞬间塑造泼辣、市井、喜剧外壳的金大班形象。",
    effectDetail: "读者先被声口抓住，才进入沧桑；粗口越响，后文心软处越有冲击。",
    model: "开篇“娘个冬采”以俚俗声口塑造金大班泼辣形象，奠定喜剧外壳与后文沧桑的张力。",
    lineParse: "划线是口头禅，不是信息句。解析重点＝声口即性格：欢场大班的硬、冲、日常化骂语。"
  },
  {
    phrase: "百乐门里那间厕所只怕比夜巴黎的舞池还宽敞些呢",
    tech: "contrast",
    effectType: "theme",
    concepts: ["culture", "transformation"],
    ask: "用厕所对比舞池，空间落差说明什么？",
    markers: ["百乐门 vs 夜巴黎", "羞辱式夸张", "今昔落差"],
    techHow: "对比：以前厅最秽处压过今日主场，把“盛世难再”写到极致。",
    effect: "以微观空间对比深化流亡后的文化降格与今昔主题。",
    effectDetail: "不只嫌舞厅小，更否定台北场面配不上她的上海身价。",
    model: "厕所／舞池的夸张对比，将个人牢骚提升为百乐门时代对夜巴黎的整体贬抑。",
    lineParse: "划线是空间对比句。精读＝用最不堪的“厕所”压过“舞池”，落差即主题。"
  },
  {
    phrase: "玉观音金兆丽这块老牌子",
    tech: "irony",
    effectType: "irony_fx",
    concepts: ["identity", "representation"],
    ask: "圣洁名号与“老牌子”并置，反讽何在？",
    markers: ["玉观音", "老牌子＝商品品牌", "撑场面"],
    techHow: "反讽：宗教／圣洁称谓被改写成市场品牌，身份商品化。",
    effect: "揭示货腰生涯中，美名也是可消费的资本。",
    effectDetail: "她靠往昔神话吃饭，名号越响，物化越深。",
    model: "“玉观音……老牌子”以圣俗错位反讽，写出身份被品牌化的生存现实。",
    lineParse: "划线关键在“老牌子”：把人名／圣号降成货架标签。反讽由此生成。"
  },
  {
    phrase: "眼角子上突然便现出了几把鱼尾巴来",
    tech: "detail",
    effectType: "character",
    concepts: ["identity", "transformation"],
    ask: "镜前鱼尾纹细节的功能是什么？",
    markers: ["化妆镜", "浓脂艳粉", "突然现出"],
    techHow: "细节描写：镜子拆穿妆容神话，衰老成为不可否认的视觉事实。",
    effect: "塑造年华将尽的真实身体，为下嫁选择提供生理依据。",
    effectDetail: "与“总也不老”的尹雪艳对读时，金大班更落地、更悲剧。",
    model: "鱼尾纹细节以镜面真实击穿浓妆表演，写出身份认同的撕裂。",
    lineParse: "划线是身体细节。“突然”强调妆也遮不住；镜子＝审判者。"
  },
  {
    phrase: "假屁股假奶",
    tech: "detail",
    effectType: "survival",
    concepts: ["identity", "representation"],
    ask: "身体改造细节如何揭示求生？",
    markers: ["勒肚子束腰", "上法场似的", "宜香美容院"],
    techHow: "细节把求偶／嫁人写成刑罚式身体工程，物化被写到皮肉。",
    effect: "揭示为换取物质保障，必须以身体继续作商品。",
    effectDetail: "喜剧夸张下是求生伦理：不改造身体，就嫁不出去。",
    model: "“假屁股假奶”等细节揭示婚前身体改造是货腰娘的求生策略。",
    lineParse: "划线堆叠假体词。解析＝身体被零件化，生存压过尊严。"
  },
  {
    phrase: "我才没有你们那样饿嫁，个个去捧块棺材板",
    tech: "dialogue",
    effectType: "irony_fx",
    concepts: ["transformation", "identity"],
    ask: "这句豪言与后文下嫁如何构成反讽？",
    markers: ["饿嫁", "棺材板", "孤傲宣言"],
    techHow: "对话立下孤傲立场；后文情节反噬，形成结构反讽。",
    effect: "预先树立“不服”，使最终屈降更痛、更真实。",
    effectDetail: "读者记住这句，才能感到道路矛盾的重量。",
    model: "“饿嫁／棺材板”的豪语与最终下嫁陈发荣构成人物反讽弧线。",
    lineParse: "划线是自我神话句。精读要存档：后文每一处屈降都在打脸这句话。"
  },
  {
    phrase: "要一个像任黛黛那样的绸缎庄，当然要比她的那个大一倍",
    tech: "sideview",
    effectType: "character",
    concepts: ["transformation", "communication"],
    ask: "以任黛黛为尺度，暴露金兆丽什么心理？",
    markers: ["绸缎庄", "大一倍", "富春楼对面"],
    techHow: "侧面／镜像：把人生目标写成对她人的妒羡竞赛。",
    effect: "塑造既屈降又好胜的复杂内心：物质自慰＋不服输。",
    effectDetail: "屈降不是心服，而是换赛道继续争。",
    model: "绸缎庄“大一倍”的心思侧面写出妒羡驱动的物质目标。",
    lineParse: "划线核心是比较级。目标不是幸福，是压过任黛黛。"
  },
  {
    phrase: "心黑手辣，耍了这些年就没见过她栽过跟头",
    tech: "sideview",
    effectType: "survival",
    concepts: ["perspective", "representation"],
    ask: "对筱红美的评语传递何种欢场法则？",
    markers: ["刁妇", "不栽跟头", "不动真情"],
    techHow: "侧面描写：借对后辈的评判，说出“真情是毒药”的生存教材。",
    effect: "揭示功利主义被推崇为成功伦理。",
    effectDetail: "与朱凤、月如线对照：栽跟头的都是动了情的人。",
    model: "对筱红美“不栽跟头”的侧面评语，道出欢场以无情为求生法则。",
    lineParse: "划线是职业鉴定书。成功＝心黑＋不栽；失败＝动情。"
  },
  {
    phrase: "货腰娘第一大忌是让人家睡大肚皮",
    tech: "dialogue",
    effectType: "theme",
    concepts: ["representation", "communication"],
    ask: "这句规训如何连接创伤与主题？",
    markers: ["货腰娘", "大忌", "教朱凤"],
    techHow: "对话把个人堕胎创伤编码成行业戒律，规训即自我防卫。",
    effect: "深化物化主题：子宫／爱情被列为职业禁忌。",
    effectDetail: "骂朱凤其实在骂当年的自己；主题从道德滑向创伤复现。",
    model: "“货腰娘第一大忌……”以行业规训复现堕胎创伤，深化灵肉冲突主题。",
    lineParse: "划线是戒律句。“货腰娘”三字把人钉进物化身份。"
  },
  {
    phrase: "一克拉半的大钻石戒指",
    tech: "symbol",
    effectType: "emotion",
    concepts: ["identity", "communication"],
    ask: "骂后甩钻戒，象征什么？",
    markers: ["五百美金", "臭骂之后", "安排生活"],
    techHow: "象征：温情仍用物质语言完成；救赎可感却有限。",
    effect: "引发复杂情感——既敬其善，又叹其只能以金钱表达爱。",
    effectDetail: "不能自救却救助别人；人物因此立体可悯。",
    model: "钻戒象征以物质完成的补偿式救赎，使泼辣面具裂开露出善。",
    lineParse: "划线是物象。解析路径：骂＝硬壳，戒＝软核，二者同场才见层次。"
  },
  {
    phrase: "纯洁得像白纸一样",
    tech: "metaphor",
    effectType: "emotion",
    concepts: ["creativity", "transformation"],
    ask: "白纸之喻如何定位月如与金的情？",
    markers: ["羞得连头都不抬", "百乐门初遇", "对照货腰世界"],
    techHow: "比喻把月如写成未被污染的对照物，激活金心中圣洁区。",
    effect: "唤起对真情的向往，反衬欢场油腻。",
    effectDetail: "白纸终被现实撕毁（堕胎），喻体越净，代价越痛。",
    model: "“像白纸”之喻将月如纯情对照欢场，为真情记忆奠基。",
    lineParse: "划线喻体＝空白／未写。精读＝他是她世界里稀缺的“未商品化”。"
  },
  {
    phrase: "自掘坟墓",
    tech: "metaphor",
    effectType: "theme",
    concepts: ["transformation", "representation"],
    ask: "为何为月如生子等于自掘坟墓？",
    markers: ["舞女职业", "成型男胎", "想过死"],
    techHow: "比喻将恋爱生育写成职业自杀，点明灵与肉的结构性冲突。",
    effect: "深化主题：真情在货腰逻辑里具有毁灭性。",
    effectDetail: "解释后文为何把爱情视为奢侈品。",
    model: "“自掘坟墓”之喻揭示真情与舞女谋生的致命冲突。",
    lineParse: "划线把爱写成死。职业伦理不允许完整女人身份。"
  },
  {
    phrase: "可怜巴巴的七万元存折",
    tech: "detail",
    effectType: "irony_fx",
    concepts: ["transformation", "perspective"],
    ask: "存折细节如何决定她放弃秦雄？",
    markers: ["真心实意", "再等五年", "无动于衷"],
    techHow: "细节把真心量化成不够的数字，爱情败给算术。",
    effect: "以冷酷反讽写四十岁女人的时间经济学。",
    effectDetail: "读者可同情秦雄，也能理解她的算计——复杂由此产生。",
    model: "七万元存折细节让真心败给物质算术，完成爱情背弃的转折。",
    lineParse: "划线是数额＋“可怜巴巴”。真心被写成不够用的存款。"
  },
  {
    phrase: "需要的是什么，而不再去奢求自己想要的",
    tech: "structure",
    effectType: "theme",
    concepts: ["transformation", "perspective"],
    ask: "这句如何收束二十年道路？",
    markers: ["需要 vs 想要", "二十年远路", "意识总结"],
    techHow: "结构／心理收束：以金的自我总结句完成转变逻辑。",
    effect: "点明主题：理想屈服于生存需要。",
    effectDetail: "一夜框中的“思想转变说明书”。",
    model: "“需要／想要”的对举收束人物转变，将下嫁写成清醒后的屈降。",
    lineParse: "划线是主题句。需要＝陈发荣；想要＝月如／秦雄式爱情。"
  },
  {
    phrase: "金碧辉煌地挂了一身",
    tech: "symbol",
    effectType: "character",
    concepts: ["identity", "culture"],
    ask: "金饰堆叠象征什么身份表演？",
    markers: ["耳坠项链手串发针", "金兆丽之名", "物欲"],
    techHow: "象征：把“金”字写在身体上，物欲与舞台身份外化。",
    effect: "强化商品化自我的视觉形象。",
    effectDetail: "后文卸下节奏、轻轻数拍时，金饰象征被暂时悬置。",
    model: "金碧首饰象征物欲化的舞台身份，与本名“金”互文。",
    lineParse: "划线写满载。人被饰品覆盖＝身份被物欲覆盖。"
  },
  {
    phrase: "周身都露着怯态",
    tech: "detail",
    effectType: "echo",
    concepts: ["creativity", "transformation"],
    ask: "怯态少年如何结构呼应月如？",
    markers: ["没有招呼人伴舞", "年轻男人", "心中一软"],
    techHow: "细节呼应初遇月如的羞怯；结构上重启真情记忆。",
    effect: "以结构回环唤起未完成的情感，收束前再裂一道口子。",
    effectDetail: "开放结局的触发器：过去借相似身体回来。",
    model: "“怯态”细节结构呼应月如，使最后一夜再度撞上真情残影。",
    lineParse: "划线是触发细节。怯＝月如基因；结构功能＝召回记忆。"
  },
  {
    phrase: "一、二、三",
    tech: "symbol",
    effectType: "theme",
    concepts: ["creativity", "identity"],
    ask: "轻轻数拍如何象征告别？",
    markers: ["卸下面具", "舞步节奏", "倒计时"],
    techHow: "象征：拍子既是舞，也是对人生的倒计时式反思与告别仪式。",
    effect: "以极简声音收束全篇，余味孤寂。",
    effectDetail: "浓脂艳粉世界忽然只剩数拍——本真短暂闪现。",
    model: "“一、二、三”将舞步象征为告别仪式，开放式留下苍凉余韵。",
    lineParse: "划线是节奏符号。解析＝告别／审判／倒计时三重可能。"
  },
  {
    phrase: "最后一夜",
    tech: "structure",
    effectType: "echo",
    concepts: ["creativity", "representation"],
    ask: "以“最后一夜”命名与收束，结构意义何在？",
    markers: ["时间框", "曲终人散", "前路茫茫"],
    techHow: "结构安排：一夜框住二十年；标题即时间装置。",
    effect: "让结账、回忆、屈降与残存真情挤在同一舞台。",
    effectDetail: "读者感到紧迫：不是漫长堕落史，而是收场夜的浓缩审判。",
    model: "“最后一夜”作为结构枢纽，将二十年欢场浓缩为结账时刻。",
    lineParse: "划线是篇名回响。结构功能＝限时舞台，逼出一生矛盾。"
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
  intro: "通读选段后，判断出现了哪些手法，并为关键句选择手法。注意：原文划线同时标出手法类型与效果类型。",
  presentIds: ["metaphor", "symbol", "contrast", "detail", "irony", "dialogue", "sideview", "structure"],
  distractors: [
    { id: "parallel", name: "排比", desc: "三项以上结构相似的并列" },
    { id: "pun", name: "双关", desc: "一词多义的巧妙利用" },
    { id: "hyperbole", name: "夸张", desc: "夸大其词以加强语气（可与对比并存，本题取更准者）" }
  ],
  quoteTasks: [
    {
      id: "q1",
      quote: "娘个冬采！……把手包豁啷摔到化妆台上",
      answer: "dialogue",
      explain: "对话声口：粗口口头禅瞬间塑造泼辣人物。"
    },
    {
      id: "q2",
      quote: "百乐门里那间厕所只怕比夜巴黎的舞池还宽敞些呢",
      answer: "contrast",
      explain: "对比：以上海百乐门贬抑台北夜巴黎，写今昔落差。"
    },
    {
      id: "q3",
      quote: "玉观音金兆丽这块老牌子",
      answer: "irony",
      explain: "反讽：圣洁名号被说成市场品牌，身份商品化。"
    },
    {
      id: "q4",
      quote: "眼角子上突然便现出了几把鱼尾巴来",
      answer: "detail",
      explain: "细节描写：镜前衰老细节拆穿浓妆神话。"
    },
    {
      id: "q5",
      quote: "我才没有你们那样饿嫁，个个去捧块棺材板",
      answer: "dialogue",
      explain: "对话立孤傲；与后文下嫁形成反讽弧线。"
    },
    {
      id: "q6",
      quote: "货腰娘第一大忌是让人家睡大肚皮",
      answer: "dialogue",
      explain: "对话规训：行业戒律复现个人创伤。"
    },
    {
      id: "q7",
      quote: "纯洁得像白纸一样",
      answer: "metaphor",
      explain: "比喻：月如纯情对照欢场污染。"
    },
    {
      id: "q8",
      quote: "一克拉半的大钻石戒指",
      answer: "symbol",
      explain: "象征：以物质完成补偿式温情与有限救赎。"
    }
  ]
};

window.LAYER2 = {
  intro: "识别之后追问效果类型：塑造人物、引发情感、深化主题、制造反讽、揭示求生等。",
  tasks: [
    {
      id: "e1",
      quote: "百乐门里那间厕所只怕比夜巴黎的舞池还宽敞些呢",
      tech: "contrast",
      effectType: "theme",
      concept: "culture",
      prompt: "这一对比的主要效果是？",
      options: [
        { id: "a", text: "客观介绍两家舞厅装修面积", correct: false },
        { id: "b", text: "以空间落差深化今昔／流亡后的文化降格", correct: true },
        { id: "c", text: "赞美夜巴黎卫生条件更好", correct: false },
        { id: "d", text: "说明金大班喜欢逛厕所", correct: false }
      ],
      explain: "夸张对比服务主题：大上海繁华不可复得，台北场面寒酸。"
    },
    {
      id: "e2",
      quote: "玉观音……老牌子",
      tech: "irony",
      effectType: "irony_fx",
      concept: "identity",
      prompt: "名号与“老牌子”并置制造何种效果？",
      options: [
        { id: "a", text: "确认她信奉佛教", correct: false },
        { id: "b", text: "圣俗错位反讽，揭示美名亦是可消费资本", correct: true },
        { id: "c", text: "说明夜巴黎在卖玉器", correct: false },
        { id: "d", text: "赞美童得怀会打广告", correct: false }
      ],
      explain: "身份被品牌化，反讽货腰世界的商品逻辑。"
    },
    {
      id: "e3",
      quote: "假屁股假奶……上法场似的",
      tech: "detail",
      effectType: "survival",
      concept: "representation",
      prompt: "身体改造细节主要揭示什么？",
      options: [
        { id: "a", text: "台北夏天太热", correct: false },
        { id: "b", text: "为物质婚姻继续出卖／改造身体的求生策略", correct: true },
        { id: "c", text: "她喜欢前卫时尚", correct: false },
        { id: "d", text: "美容院技术高超", correct: false }
      ],
      explain: "细节把嫁人写成身体刑罚，求生压过尊严。"
    },
    {
      id: "e4",
      quote: "臭骂一顿之后，又甩给她……大钻石戒指",
      tech: "symbol",
      effectType: "emotion",
      concept: "identity",
      prompt: "骂＋戒的组合最可能让读者感到？",
      options: [
        { id: "a", text: "她只是炫耀财富", correct: false },
        { id: "b", text: "硬壳裂开：怨其不争却仍补偿救助，人物立体可悯", correct: true },
        { id: "c", text: "钻戒不值钱", correct: false },
        { id: "d", text: "她要拉朱凤入伙开店", correct: false }
      ],
      explain: "善恶同场：不能自救却救别人，情感效果复杂。"
    },
    {
      id: "e5",
      quote: "我才没有你们那样饿嫁……（后文却下嫁陈发荣）",
      tech: "irony",
      effectType: "irony_fx",
      concept: "transformation",
      prompt: "豪言与结局的落差主要效果是？",
      options: [
        { id: "a", text: "证明她从未说过这句话", correct: false },
        { id: "b", text: "以人物反讽突出道路屈降的无奈与真实", correct: true },
        { id: "c", text: "赞美棺材板婚姻幸福", correct: false },
        { id: "d", text: "说明陈发荣很年轻", correct: false }
      ],
      explain: "孤傲宣言被情节打脸，转变因此沉重。"
    },
    {
      id: "e6",
      quote: "轻轻柔柔地数着拍子：一、二、三",
      tech: "symbol",
      effectType: "theme",
      concept: "creativity",
      prompt: "数拍收束如何作用于主题？",
      options: [
        { id: "a", text: "教青年学舞的教学手册", correct: false },
        { id: "b", text: "以告别仪式象征卸下面具与人生倒计时，余味苍凉", correct: true },
        { id: "c", text: "暗示她要改行当乐师", correct: false },
        { id: "d", text: "只为凑字数结尾", correct: false }
      ],
      explain: "极简象征收束：真情残影一闪，开放结局留下孤寂。"
    }
  ]
};

window.LAYER3 = {
  intro: "综合细读：证据→手法（色）→效果类型（色）→概念。写120–220字。",
  prompts: [
    {
      id: "w1",
      title: "矛盾人物",
      concept: "identity",
      question: "作者如何通过声口、细节与镜像人物，塑造金兆丽既善又恶、既傲又屈的复杂形象？",
      hints: ["娘个冬采", "饿嫁／棺材板", "骂后赠戒", "任黛黛绸缎庄"]
    },
    {
      id: "w2",
      title: "今昔与环境",
      concept: "culture",
      question: "百乐门／夜巴黎的对比如何把个人牢骚写成时代落差？请点明手法与效果。",
      hints: ["厕所比舞池宽敞", "玉观音老牌子", "拜倒裙下数不完"]
    },
    {
      id: "w3",
      title: "结构与收束",
      concept: "creativity",
      question: "“最后一夜”的时间框、意识闪回与“一二三”收束如何组织灵肉之争？",
      hints: ["一夜框二十年", "朱凤触发月如", "怯态少年", "一、二、三"]
    }
  ],
  frames: [
    "作者运用……手法，将“……”描写为……，使读者感受到……。",
    "这一写法不仅塑造了……，更揭示了……（概念／主题）。",
    "与后文／前文“……”形成对照，强化了……的表达效果。"
  ],
  rubric: [
    { id: "evidence", label: "文本证据", tip: "含具体引文或明确指涉句段" },
    { id: "technique", label: "手法命名", tip: "准确使用文学术语" },
    { id: "effect", label: "效果阐释", tip: "说明对读者／意义的作用，而非只贴标签" },
    { id: "concept", label: "概念／主题", tip: "连接到身份、文化、转变、再现等概念之一" },
    { id: "cohesion", label: "连贯表达", tip: "句间有推进，避免情节复述堆砌" }
  ],
  sample:
    "开篇“娘个冬采”与摔手包的动作，以粗口声口迅速立起泼辣的金大班；“玉观音……老牌子”却把圣洁名号改写成商品品牌，反讽身份的物化。百乐门厕所压过夜巴黎舞池的对比，将个人牢骚提升为流亡后的文化降格。骂朱凤后又甩出“一克拉半”钻戒，硬壳裂开露出有限救赎。结尾对怯态少年轻轻数“一、二、三”，以一夜框住的结构让真情残影回光，喜剧外壳下的苍凉因而余音不散。"
};
