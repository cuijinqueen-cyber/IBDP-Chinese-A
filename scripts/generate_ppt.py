#!/usr/bin/env python3
"""Generate PYP Chinese lesson PPT for 竹节人."""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

INK = RGBColor(0x14, 0x26, 0x1C)
BAMBOO = RGBColor(0x1E, 0x4A, 0x36)
LEAF = RGBColor(0x2F, 0x6B, 0x4F)
SUN = RGBColor(0xC9, 0x92, 0x12)
MIST = RGBColor(0xE8, 0xF3, 0xEC)
PAPER = RGBColor(0xF4, 0xFA, 0xF6)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
SOFT = RGBColor(0x2A, 0x40, 0x33)

TOTAL = 14


def set_run(run, size=18, bold=False, color=INK, name="微软雅黑"):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = name
    rPr = run._r.get_or_add_rPr()
    ea = rPr.find(qn("a:ea"))
    if ea is None:
        from lxml import etree

        ea = etree.SubElement(rPr, qn("a:ea"))
    ea.set("typeface", name)


def add_bg(slide, color):
    shape = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), prs.slide_width, prs.slide_height
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    spTree = slide.shapes._spTree
    sp = shape._element
    spTree.remove(sp)
    spTree.insert(2, sp)


def add_bar(slide, left, top, width, height, color):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def add_text(
    slide,
    left,
    top,
    width,
    height,
    text,
    size=18,
    bold=False,
    color=INK,
    align=PP_ALIGN.LEFT,
    name="微软雅黑",
):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    set_run(run, size=size, bold=bold, color=color, name=name)
    return box


def add_paras(slide, left, top, width, height, lines, size=16, color=INK, bold_first=False):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = PP_ALIGN.LEFT
        p.space_after = Pt(4)
        run = p.add_run()
        run.text = line
        set_run(run, size=size, bold=(bold_first and i == 0), color=color)
    return box


def new_slide(bg=PAPER):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_bg(slide, bg)
    return slide


def footer(slide, page):
    add_text(
        slide,
        Inches(0.6),
        Inches(7.05),
        Inches(10),
        Inches(0.35),
        "PYP 中文 · 《竹节人》· 从阅读到写作",
        size=11,
        color=SOFT,
    )
    add_text(
        slide,
        Inches(11.5),
        Inches(7.05),
        Inches(1.3),
        Inches(0.35),
        f"{page}/{TOTAL}",
        size=11,
        color=SOFT,
        align=PP_ALIGN.RIGHT,
    )


# 1 Cover
s = new_slide(MIST)
add_bar(s, Inches(0), Inches(0), Inches(0.35), prs.slide_height, BAMBOO)
add_text(s, Inches(1.0), Inches(1.6), Inches(11), Inches(1.2), "竹节人", size=60, bold=True, color=BAMBOO)
add_text(s, Inches(1.0), Inches(2.9), Inches(11), Inches(0.7), "从阅读中，学会把「好玩」写出来", size=28, color=INK)
add_text(
    s,
    Inches(1.0),
    Inches(3.8),
    Inches(11),
    Inches(0.5),
    "六年级 PYP 中文 · 第一课教学课件（原文导读 + 教案）",
    size=18,
    color=SOFT,
)
add_text(
    s,
    Inches(1.0),
    Inches(5.2),
    Inches(11),
    Inches(0.8),
    "统编版六年级上册 · 范锡林\n课时：60 分钟 · 听说强 / 读写待提升",
    size=16,
    color=SOFT,
)
footer(s, 1)

# 2 Agenda
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.4), Inches(12), Inches(0.6), "目录", size=32, bold=True, color=BAMBOO)
add_paras(
    s,
    Inches(1.0),
    Inches(1.4),
    Inches(11),
    Inches(5),
    [
        "01  学习目标与 PYP 框架",
        "02  原文导读（三幕结构 + 教学节选）",
        "03  一分钟教案流程",
        "04  词语猎人与写作迁移",
        "05  评估、反思与课后行动",
    ],
    size=22,
)
add_text(
    s,
    Inches(0.7),
    Inches(6.3),
    Inches(12),
    Inches(0.5),
    "说明：全文请对照课本阅读；本课件提供结构导读与课堂节选，便于互动教学。",
    size=13,
    color=SOFT,
)
footer(s, 2)

# 3 Objectives
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.55), "学习目标", size=30, bold=True, color=BAMBOO)
cols = [
    (
        Inches(0.5),
        "语言目标",
        [
            "流利朗读重点段",
            "理解：风靡、威风凛凛、悻悻然、津津有味、全神贯注等",
            "概括三件事：做→斗→老师也玩",
            "完成 80–120 字短写《我的童年小玩具》",
        ],
    ),
    (
        Inches(4.7),
        "探究目标",
        [
            "比较作者与自己的游戏乐趣",
            "发现：动作/声音词如何写出「好玩」",
            "提出 1 个可继续探究的问题",
        ],
    ),
    (
        Inches(8.9),
        "成功标准",
        [
            "能说出课文三件事",
            "找出 ≥5 个「好玩」词句",
            "短文有开头-经过-感受",
            "有 2–3 处具体动作",
        ],
    ),
]
for left, title, lines in cols:
    add_bar(s, left, Inches(1.15), Inches(3.7), Inches(0.5), LEAF)
    add_text(s, left + Inches(0.15), Inches(1.2), Inches(3.4), Inches(0.4), title, size=16, bold=True, color=WHITE)
    add_paras(s, left + Inches(0.1), Inches(1.85), Inches(3.5), Inches(4.5), ["· " + x for x in lines], size=14)
footer(s, 3)

# 4 PYP
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.55), "PYP 框架一览", size=30, bold=True, color=BAMBOO)
rows = [
    ("超学科主题", "我们是谁 / 我们如何表达自己"),
    ("中心思想", "童年的游戏与故事，能帮助我们认识自己、连接他人，并用文字留住快乐。"),
    ("关键概念", "联系 · 视角 · 形式"),
    ("探究线索", "① 竹节人怎样被做、被玩、被记住？  ② 故事如何写出「好玩」？  ③ 我的游戏怎样用文字讲清楚？"),
    ("学习者目标", "探究者 · 善于交流 · 反思者 · 心胸开阔"),
    ("ATL 技能", "沟通（读/说/写）· 思考（比较与推断）· 自我管理（专注完成任务）"),
]
y = 1.1
for label, val in rows:
    add_bar(s, Inches(0.6), Inches(y), Inches(2.2), Inches(0.72), MIST)
    add_text(s, Inches(0.7), Inches(y + 0.18), Inches(2.0), Inches(0.45), label, size=14, bold=True, color=BAMBOO)
    add_text(s, Inches(3.0), Inches(y + 0.12), Inches(9.6), Inches(0.6), val, size=15, color=INK)
    y += 0.85
footer(s, 4)

# 5 Structure
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.5), "原文导读 · 整体结构", size=30, bold=True, color=BAMBOO)
add_text(s, Inches(0.7), Inches(0.95), Inches(12), Inches(0.4), "作者：范锡林　｜　请打开课本对照全文阅读", size=14, color=SOFT)
stages = [
    ("第一幕", "做竹节人", "材料普通，亲手做成——乐趣自己长出来。", SUN),
    ("第二幕", "斗竹节人", "课桌裂缝上的战场：威风凛凛，跺脚拍手。", LEAF),
    ("第三幕", "老师也玩", "没收之后的反转：悻悻然化为心满意足。", BAMBOO),
]
for i, (k, t, d, c) in enumerate(stages):
    left = Inches(0.7 + i * 4.1)
    add_bar(s, left, Inches(1.7), Inches(3.8), Inches(4.2), MIST)
    add_bar(s, left, Inches(1.7), Inches(3.8), Inches(0.55), c)
    add_text(s, left + Inches(0.2), Inches(1.78), Inches(3.4), Inches(0.4), k, size=14, bold=True, color=WHITE)
    add_text(s, left + Inches(0.2), Inches(2.5), Inches(3.4), Inches(0.5), t, size=24, bold=True, color=BAMBOO)
    add_text(s, left + Inches(0.2), Inches(3.3), Inches(3.4), Inches(2.0), d, size=16, color=INK)
footer(s, 5)

# 6 Excerpt 1
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.5), "原文节选① · 做竹节人", size=28, bold=True, color=BAMBOO)
add_bar(s, Inches(0.7), Inches(1.1), Inches(12), Inches(3.6), MIST)
add_paras(
    s,
    Inches(1.0),
    Inches(1.25),
    Inches(11.4),
    Inches(3.3),
    [
        "【教学节选】",
        "把毛笔杆锯成寸把长的一截，这就是竹节人的脑袋连同身躯了；",
        "在上面钻一对小眼，供装手臂用。再锯八截短的，分别当四肢。",
        "用一根纳鞋底的线把它们穿在一起，就成了。",
        "",
        "把穿着九个竹节的鞋线嵌入课桌裂缝里，在下面一拉紧，",
        "那立在裂缝上的竹节们就站成一个壮士模样——叉腿张胳膊，威风凛凛。",
    ],
    size=16,
    bold_first=True,
)
add_text(
    s,
    Inches(0.7),
    Inches(5.0),
    Inches(12),
    Inches(1.4),
    "想一想：为什么「自己做」会让玩具更有意思？\n写作迁移：写玩具时，也可以写「材料 → 步骤 → 做成后的样子」。",
    size=16,
    color=BAMBOO,
)
footer(s, 6)

# 7 Excerpt 2
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.5), "原文节选② · 斗竹节人", size=28, bold=True, color=BAMBOO)
add_bar(s, Inches(0.7), Inches(1.1), Inches(12), Inches(3.6), MIST)
add_paras(
    s,
    Inches(1.0),
    Inches(1.25),
    Inches(11.4),
    Inches(3.3),
    [
        "【教学节选】",
        "两个竹节人放在一起，那就是搏斗了，没头没脑地对打着，不知疲倦，也永不会倒下。",
        "",
        "下课时，教室里摆开场子，吸引了一圈黑脑袋，攒着观战，",
        "还跺脚拍手，咋咋呼呼，好不热闹。",
        "常要等老师进来，才知道已经上课，便一哄作鸟兽散。",
        "",
        "上课了，意兴依然不减，手痒痒的，将课本竖在面前当屏风，跟同桌在课桌上又搏将起来……",
    ],
    size=15,
    bold_first=True,
)
add_text(
    s,
    Inches(0.7),
    Inches(5.0),
    Inches(12),
    Inches(1.4),
    "想一想：哪一类描写最能写出「热闹」？→ 动作 + 声音\n写作迁移：不要只写「大家很开心」，要写出跺脚、拍手、咋咋呼呼。",
    size=16,
    color=BAMBOO,
)
footer(s, 7)

# 8 Excerpt 3
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.35), Inches(12), Inches(0.5), "原文节选③ · 老师也玩", size=28, bold=True, color=BAMBOO)
add_bar(s, Inches(0.7), Inches(1.1), Inches(12), Inches(3.4), MIST)
add_paras(
    s,
    Inches(1.0),
    Inches(1.25),
    Inches(11.4),
    Inches(3.1),
    [
        "【教学节选】",
        "竹节人被老师没收。孩子们又沮丧，又悻悻然。",
        "",
        "后来从老师办公室门前经过，却见老师全神贯注，津津有味地玩着竹节人。",
        "",
        "于是，先前的怨恨和沮丧化为乌有——原来大人也会被「好玩」抓住。",
    ],
    size=16,
    bold_first=True,
)
add_text(
    s,
    Inches(0.7),
    Inches(4.8),
    Inches(12),
    Inches(1.6),
    "想一想：这个结尾为什么有力？→ 心情转折 + 共同的人性\n心情线：怨恨 / 沮丧  →  全神贯注 / 津津有味  →  心满意足\n写作迁移：故事里可以设计一个「小反转」。",
    size=16,
    color=BAMBOO,
)
footer(s, 8)

# 9 Timeline
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.5), "教案流程 · 60 分钟", size=28, bold=True, color=BAMBOO)
timeline = [
    ("0–8′", "Tuning in", "玩具时光机：分享童年游戏；抛出探究问题"),
    ("8–20′", "Finding out", "三幕速读 +「先…再…最后…」口头复述"),
    ("20–35′", "Sorting out", "词语猎人；站立 vs 搏斗对比朗读；心情翻转"),
    ("35–52′", "Going further", "短写《我的童年小玩具》句架 + 词库迁移"),
    ("52–60′", "Reflection", "分享朗读、反思三问、课后采访行动"),
]
y = 1.0
for t, phase, desc in timeline:
    add_bar(s, Inches(0.6), Inches(y), Inches(1.6), Inches(0.85), LEAF)
    add_text(s, Inches(0.7), Inches(y + 0.25), Inches(1.4), Inches(0.4), t, size=16, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    add_text(s, Inches(2.4), Inches(y + 0.1), Inches(3.0), Inches(0.35), phase, size=16, bold=True, color=BAMBOO)
    add_text(s, Inches(2.4), Inches(y + 0.45), Inches(10), Inches(0.4), desc, size=15, color=INK)
    y += 1.0
footer(s, 9)

# 10 Detail A
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.5), "教案细案（上）导入 + 阅读", size=28, bold=True, color=BAMBOO)
add_paras(
    s,
    Inches(0.7),
    Inches(1.0),
    Inches(5.8),
    Inches(5.5),
    [
        "【0–8′ 导入】",
        "1. 出示竹节人图：这是什么？怎么玩？",
        "2. 学生分享：最迷的玩具/游戏",
        "3. 探究问：为什么有些玩具多年后还想讲？",
        "4. 揭示本课：读《竹节人》→ 学写「好玩」",
        "",
        "【形成性评估】",
        "口头完整度、用词、兴趣点（摸底）",
    ],
    size=15,
)
add_paras(
    s,
    Inches(6.9),
    Inches(1.0),
    Inches(5.8),
    Inches(5.5),
    [
        "【8–20′ 初读】",
        "1. 范读开头，营造语感",
        "2. 默读全文，填结构表：",
        "   做 / 斗 / 老师｜事件｜心情",
        "3. 口头复述：先…再…最后…",
        "4. 快过影响理解的字词：",
        "   风靡、嵌、悻悻然、鏖战…",
        "",
        "支架：读速慢则分段完成",
    ],
    size=15,
)
footer(s, 10)

# 11 Detail B
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.5), "教案细案（下）语言 + 写作 + 反思", size=28, bold=True, color=BAMBOO)
cols3 = [
    (
        Inches(0.5),
        [
            "【20–35′ 精读】",
            "核心问：哪些词让我们「看见」热闹？",
            "",
            "· 找词猎手：动作/声音/样子/心情",
            "· 对比朗读：威风 vs 呆傻热闹",
            "· 情节翻转：心情如何变？",
            "",
            "产出：找词表 + 口头释词",
        ],
    ),
    (
        Inches(4.7),
        [
            "【35–52′ 写作】",
            "题目：《我的童年小玩具》",
            "80–120 字",
            "",
            "句架：",
            "1 开头：我小时候最迷…",
            "2 经过：外形 + ≥2 动作",
            "3 感受：玩时/回想…",
            "",
            "先口述 1′ → 再限时写",
        ],
    ),
    (
        Inches(8.9),
        [
            "【52–60′ 反思】",
            "1. 朗读短文，给 1 条建议",
            "2. 反思三问：",
            "   读懂了什么？",
            "   哪步最难？",
            "   下周练哪一点？",
            "3. 行动：采访家人童年玩具",
            "   记下 3 个关键词",
        ],
    ),
]
for left, lines in cols3:
    add_bar(s, left, Inches(1.0), Inches(3.9), Inches(5.4), MIST)
    add_paras(s, left + Inches(0.15), Inches(1.15), Inches(3.6), Inches(5.1), lines, size=14)
footer(s, 11)

# 12 Word bank
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.5), "词语猎人 · 写作词库", size=28, bold=True, color=BAMBOO)
groups = [
    ("动作", ["叉腿张胳膊", "没头没脑", "跺脚拍手", "一哄作鸟兽散", "手痒痒"]),
    ("声音", ["咋咋呼呼"]),
    ("样子", ["威风凛凛", "壮士模样", "呆头呆脑"]),
    ("心情", ["不知疲倦", "悻悻然", "全神贯注", "津津有味", "心满意足"]),
]
y = 1.1
for title, words in groups:
    add_text(s, Inches(0.7), Inches(y), Inches(1.8), Inches(0.4), title, size=18, bold=True, color=SUN)
    add_text(s, Inches(2.6), Inches(y), Inches(10), Inches(0.4), "　｜　".join(words), size=17, color=INK)
    y += 0.85
add_text(
    s,
    Inches(0.7),
    Inches(5.0),
    Inches(12),
    Inches(1.4),
    "课堂任务：给每个词贴标签 → 收入词库 → 写作时调用\n金句提醒：好句子 = 具体动作 + 声音/样子 + 真实心情",
    size=16,
    color=BAMBOO,
)
footer(s, 12)

# 13 Rubric
s = new_slide()
add_bar(s, Inches(0), Inches(0), prs.slide_width, Inches(0.15), BAMBOO)
add_text(s, Inches(0.7), Inches(0.3), Inches(12), Inches(0.5), "写作任务与评价量规", size=28, bold=True, color=BAMBOO)
add_text(s, Inches(0.7), Inches(1.0), Inches(12), Inches(0.4), "《我的童年小玩具》　目标 80–120 字", size=18, bold=True, color=LEAF)
headers = ["维度", "达标", "良好", "优秀"]
rows_r = [
    ["结构", "有开头与结尾", "开头-经过-感受完整", "过渡自然，重点突出"],
    ["细节", "1 处动作", "2–3 处具体动作/样子", "动作+声音/心情结合"],
    ["语言", "句子基本通顺", "正确使用 ≥2 个生动词语", "有课文迁移且表达自然"],
]
xs = [0.7, 2.5, 5.5, 9.2]
widths = [1.6, 2.8, 3.5, 3.5]
for i, h in enumerate(headers):
    add_bar(s, Inches(xs[i]), Inches(1.6), Inches(widths[i]), Inches(0.5), BAMBOO)
    add_text(s, Inches(xs[i] + 0.1), Inches(1.68), Inches(widths[i] - 0.15), Inches(0.35), h, size=14, bold=True, color=WHITE)
y = 2.2
for r in rows_r:
    for i, cell in enumerate(r):
        add_bar(s, Inches(xs[i]), Inches(y), Inches(widths[i]), Inches(0.85), MIST if i == 0 else PAPER)
        add_text(s, Inches(xs[i] + 0.1), Inches(y + 0.25), Inches(widths[i] - 0.15), Inches(0.5), cell, size=13, color=INK)
    y += 0.9
add_text(
    s,
    Inches(0.7),
    Inches(5.2),
    Inches(12),
    Inches(1.2),
    "差异化：写得慢 → 先写 3 句完整句；写得快 → 加一句「和竹节人比，我的玩具……」\n配套网页：词语收集 / 句架插入 / 成功标准自检（打开 index.html）",
    size=14,
    color=SOFT,
)
footer(s, 13)

# 14 Close
s = new_slide(MIST)
add_bar(s, Inches(0), Inches(0), Inches(0.35), prs.slide_height, BAMBOO)
add_text(s, Inches(1.0), Inches(1.8), Inches(11), Inches(0.7), "课后行动", size=32, bold=True, color=BAMBOO)
add_paras(
    s,
    Inches(1.0),
    Inches(2.8),
    Inches(11),
    Inches(2.5),
    [
        "1. 把短文誊清或打字一版（练书写规范）",
        "2. 采访家人：他们小时候玩什么？记下 3 个关键词",
        "3. 选抄课文中自己最喜欢的一句，并造句",
        "",
        "下一课预告：把短文扩写，或继续探究「传统玩具为什么渐渐少了？」",
    ],
    size=18,
)
add_text(s, Inches(1.0), Inches(5.8), Inches(11), Inches(0.5), "竹节人课堂 · 从阅读到写作", size=16, color=SOFT)
footer(s, 14)

out = "/workspace/ppt/竹节人_原文与教案.pptx"
prs.save(out)
print("saved", out, "slides", len(prs.slides))
