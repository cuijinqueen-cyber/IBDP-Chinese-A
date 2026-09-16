#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""《一把青》精读教学课件生成脚本"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree

# —— 配色 ——
BG = RGBColor(0x1A, 0x1F, 0x2E)
CARD = RGBColor(0x24, 0x2B, 0x3D)
ACCENT = RGBColor(0xC9, 0xA2, 0x4B)  # 青绿金
ACCENT2 = RGBColor(0x5B, 0xA8, 0x8A)  # 一把青
TEXT = RGBColor(0xF2, 0xEE, 0xE6)
MUTED = RGBColor(0xA8, 0xB0, 0xC0)
QUOTE = RGBColor(0xE8, 0xD5, 0xA3)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
W = prs.slide_width
H = prs.slide_height


def set_run(run, size=18, bold=False, color=TEXT, font="Microsoft YaHei"):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font
    rPr = run._r.get_or_add_rPr()
    ea = rPr.find(qn("a:ea"))
    if ea is None:
        ea = etree.SubElement(rPr, qn("a:ea"))
    ea.set("typeface", font)


def add_bg(slide, color=BG):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, H)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    # 送到底层
    spTree = slide.shapes._spTree
    sp = shape._element
    spTree.remove(sp)
    spTree.insert(2, sp)
    return shape


def add_bar(slide, left, top, width, height, color=ACCENT):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def add_card(slide, left, top, width, height, color=CARD):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def add_textbox(slide, left, top, width, height, text, size=18, bold=False,
                color=TEXT, align=PP_ALIGN.LEFT, font="Microsoft YaHei"):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    set_run(run, size=size, bold=bold, color=color, font=font)
    return box


def add_paras(slide, left, top, width, height, lines, size=16, color=TEXT,
              spacing=1.15, bold_first=False):
    """lines: list of str or (str, dict)"""
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    for i, item in enumerate(lines):
        if isinstance(item, tuple):
            text, opts = item
        else:
            text, opts = item, {}
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = opts.get("align", PP_ALIGN.LEFT)
        p.space_after = Pt(opts.get("space_after", 6))
        run = p.add_run()
        run.text = text
        set_run(
            run,
            size=opts.get("size", size),
            bold=opts.get("bold", bold_first and i == 0),
            color=opts.get("color", color),
            font=opts.get("font", "Microsoft YaHei"),
        )
    return box


def section_header(slide, section_no, title, subtitle=""):
    add_bg(slide)
    add_bar(slide, Inches(0), Inches(0), Inches(0.18), H, ACCENT2)
    add_textbox(slide, Inches(0.6), Inches(0.35), Inches(10), Inches(0.4),
                f"《一把青》精读  ·  {section_no}", size=14, color=ACCENT2)
    add_textbox(slide, Inches(0.6), Inches(0.7), Inches(12), Inches(0.7),
                title, size=32, bold=True, color=WHITE)
    if subtitle:
        add_textbox(slide, Inches(0.6), Inches(1.35), Inches(12), Inches(0.4),
                    subtitle, size=15, color=MUTED)


def quote_block(slide, left, top, width, height, quote, note=""):
    add_card(slide, left, top, width, height)
    add_bar(slide, left, top, Inches(0.08), height, ACCENT)
    lines = [
        (f"「{quote}」", {"size": 15, "color": QUOTE, "bold": True, "space_after": 8}),
    ]
    if note:
        lines.append((note, {"size": 13, "color": MUTED, "space_after": 0}))
    add_paras(slide, left + Inches(0.25), top + Inches(0.15),
              width - Inches(0.4), height - Inches(0.25), lines)


# ==================== 封面 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_bar(slide, Inches(0), Inches(0), W, Inches(0.12), ACCENT2)
add_textbox(slide, Inches(0.8), Inches(1.8), Inches(11), Inches(0.5),
            "白先勇 · 《台北人》", size=18, color=ACCENT2)
add_textbox(slide, Inches(0.8), Inches(2.4), Inches(11), Inches(1),
            "《一把青》", size=54, bold=True, color=WHITE)
add_textbox(slide, Inches(0.8), Inches(3.5), Inches(11), Inches(0.5),
            "精读教学课件  ·  文本细节引证版", size=22, color=MUTED)
add_paras(slide, Inches(0.8), Inches(4.5), Inches(11), Inches(2), [
    ("目录顺序", {"size": 14, "color": ACCENT, "bold": True, "space_after": 10}),
    ("一、人物形象  →  二、艺术手法  →  三、叙事手法  →  四、情节结构  →  五、语言特色  →  六、主题",
     {"size": 15, "color": TEXT, "space_after": 0}),
])

# ==================== 目录 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "导读", "目录", "依教学逻辑展开：人 → 法 → 叙 → 事 → 语 → 意")
items = [
    ("01", "人物形象", "朱青的转变 · 郭轸 · 师娘 · 小顾"),
    ("02", "艺术手法", "对比 · 象征 · 反讽 · 比喻 · 细节 · 对话"),
    ("03", "叙事手法", "第一人称见证 · 双城对照 · 省略跳跃 · 母题反复"),
    ("04", "故事情节结构", "上下篇对照 · 仁爱东村 · 死亡轮回"),
    ("05", "语言特色", "服饰编码 · 声口 · 歌谣母题 · 拟声"),
    ("06", "主题", "创伤 · 求生 · 流亡 · 及时行乐"),
]
for i, (no, tit, sub) in enumerate(items):
    y = Inches(1.9) + Inches(i * 0.85)
    add_card(slide, Inches(0.6), y, Inches(12), Inches(0.75))
    add_textbox(slide, Inches(0.9), y + Inches(0.12), Inches(1), Inches(0.5),
                no, size=22, bold=True, color=ACCENT2)
    add_textbox(slide, Inches(2.2), y + Inches(0.08), Inches(9), Inches(0.32),
                tit, size=18, bold=True, color=WHITE)
    add_textbox(slide, Inches(2.2), y + Inches(0.4), Inches(9), Inches(0.28),
                sub, size=12, color=MUTED)

# ==================== 一、人物形象 总览 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "一 / 人物形象", "人物关系总览",
               "核心人物：朱青（转变轴心）｜郭轸、师娘、小顾、眷村众太太")
cards = [
    ("朱青", "转变的轴心人物\n上：怯生生的女学生\n下：「赛白光」式风情\n证据链：服饰＋神态＋歌声"),
    ("郭轸", "「英气勃勃」的飞行员\n美式制服／痴恋／坠机\n爱情浪漫与命运反讽"),
    ("师娘（秦太太）", "叙述者＋过来人\n「狠起心肠」的导师\n对照朱青的另一条活法"),
    ("小顾等", "下部年轻空军\n「童子鸡」式轮替\n死亡重复，伦理改写"),
]
for i, (t, b) in enumerate(cards):
    x = Inches(0.5) + Inches(i * 3.15)
    add_card(slide, x, Inches(2.1), Inches(3.0), Inches(4.6))
    add_bar(slide, x, Inches(2.1), Inches(3.0), Inches(0.08), ACCENT if i == 0 else ACCENT2)
    add_textbox(slide, x + Inches(0.2), Inches(2.35), Inches(2.6), Inches(0.45),
                t, size=18, bold=True, color=ACCENT)
    add_paras(slide, x + Inches(0.2), Inches(2.95), Inches(2.6), Inches(3.5), [
        (line, {"size": 13, "color": TEXT if j == 0 else MUTED, "space_after": 6})
        for j, line in enumerate(b.split("\n"))
    ])

# ==================== 朱青 上部 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "一 / 人物形象", "朱青（上）：青涩的初始档案",
               "服饰细节＋神态细节＝身份基线，为后文剧变提供对照")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(6.0), Inches(2.3),
            "来做客还穿着一身半新旧直统子的蓝布长衫，襟上掖了一块白绸子手绢儿。"
            "头发也没有烫……脚上穿了一双带绊的黑皮鞋，一双白色的短统袜子倒是干干净净的。",
            "引证 · 服饰编码：布料朴素、颜色冷静、形制保守 → 黄花闺女／女学生身份标签")
quote_block(slide, Inches(6.8), Inches(2.0), Inches(6.0), Inches(2.3),
            "见了我一径半低着头，腼腼腆腆，很有一股教人疼怜的怯态。"
            "一顿饭下来，我怎么逗她，她都不大答得上腔来，一味含糊地应着。",
            "引证 · 神态／沟通：失语状态——还不会在男人世界里说话")
add_card(slide, Inches(0.5), Inches(4.55), Inches(12.3), Inches(2.4))
add_paras(slide, Inches(0.8), Inches(4.75), Inches(11.8), Inches(2.0), [
    ("精读要点", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("• 「蓝布长衫」是转变的基线档案：记住这些视觉细节，下部「透明紫纱洒金片的旗袍」才有冲击力。",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("• 「腼腼腆腆」不是害羞点缀，而是存在状态；与下部「说风话／哼歌」形成沟通方式的剧变。",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("• 眉眼间「水秀」暗示潜质——美质已在，只是尚未被时代与创伤改写。",
     {"size": 14, "color": TEXT, "space_after": 0}),
])

# ==================== 朱青 下部 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "一 / 人物形象", "朱青（下）：「赛白光」的社会重生",
               "服饰翻转＋唱腔浪荡＋外号命名＝新身份的生成现场")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(6.0), Inches(2.1),
            "她穿了一身透明紫纱洒金片的旗袍，一双高跟鞋足有三寸高，"
            "一扭，全身的金锁片便闪闪发光起来。",
            "引证 · 对比：素净→妖娆，遮蔽→暴露；每一修饰词都在改写「朱青是谁」")
quote_block(slide, Inches(6.8), Inches(2.0), Inches(6.0), Inches(2.1),
            "倒是难为那个女人却也唱得出白光那股懒洋洋的浪荡劲儿。"
            "……「师娘，我是朱青。」那个女人笑吟吟地望着我说道。",
            "引证 · 唱腔＝新人格；点名瞬间完成身份冲击")
quote_block(slide, Inches(0.5), Inches(4.3), Inches(6.0), Inches(2.5),
            "我们这里都管朱小姐叫「赛白光」呢。",
            "引证 · 绰号象征：个人被流行文化符号替换；命名权在社群，不再是「郭轸的朱青」")
quote_block(slide, Inches(6.8), Inches(4.3), Inches(6.0), Inches(2.5),
            "岁月在她的脸上好像刻不下痕迹来了似的。"
            "……可是我已经找不出什么话来可以开导她的了。",
            "引证 · 反讽：脸不老，人已换；师娘失语＝旧伦理失效")

# ==================== 朱青 涂蔻丹 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "一 / 人物形象", "朱青：小顾死后仍涂蔻丹",
               "细节反差——「狠起心肠」的视觉完成态")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(2.0),
            "却看见原来朱青正坐在窗台上，穿了一身粉红色的绸睡衣，"
            "捞起了裤管跷起脚，在脚趾甲上涂蔻丹，一头的发卷子也没有卸下来。",
            "引证 · 丧事与美容并置：小动作在大死亡旁＝创伤麻木与生存惯性")
add_card(slide, Inches(0.5), Inches(4.3), Inches(12.3), Inches(2.6))
add_paras(slide, Inches(0.8), Inches(4.5), Inches(11.8), Inches(2.2), [
    ("人物解读（勿简化为「堕落」）", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("• 上部师娘预言：「你就得狠起心肠来，才担得住日后的风险」——下部涂蔻丹、哼歌可回读为完成态。",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("• 「小顾这里没有亲人……昨天下午，我才把他的骨灰运到碧潭公墓下了葬」——她并非无情，而是把痛改写成另一种活法。",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("• 人物弧线：怯态女学生 → 丧夫崩解 → 康乐场「赛白光」→ 以及时行乐消化反复死亡。",
     {"size": 14, "color": TEXT, "space_after": 0}),
])

# ==================== 郭轸 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "一 / 人物形象", "郭轸：英气与反讽",
               "细节堆叠塑造得意飞行员，亦为悲剧蓄势")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(6.0), Inches(2.2),
            "郭轸全身都是美式凡立丁的空军制服，上身罩了一件翻领镶毛的皮夹克，"
            "腰身勒得紧峭。……竟出挑得英气勃勃了。",
            "引证 · 物象定妆：年轻、得意、被时代选中；越英气，后文坠机越残酷")
quote_block(slide, Inches(6.8), Inches(2.0), Inches(6.0), Inches(2.2),
            "「不是我故意犯规，是朱青把我的心拿走了。……"
            "我在天上飞，我的心都在地上跟着她呢。」",
            "引证 · 比喻／空间对举：职业之天与恋人之地；浪漫修辞合理化违规")
quote_block(slide, Inches(0.5), Inches(4.5), Inches(12.3), Inches(2.4),
            "临走……一把攥住我手，嗓子嗄哑：「师娘，这次无论如何要拜托你老人家了——"
            "朱青还不大懂事……」……总部刚来通知，郭轸在徐州出了事，飞机和人都跌得粉碎。",
            "引证 · 托付→粉碎：私人誓约在战争中瞬间失效；人物功能＝爱情理想的载体与被历史粉碎的对象")

# ==================== 师娘 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "一 / 人物形象", "师娘：叙述者与过来人",
               "视角人物＋文化传递者；她的劝诫是上部主题句")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(2.0),
            "「飞将军的太太，不容易当。……他们就像那些铁鸟儿，忽而飞到东，忽而飞到西，"
            "你抓也抓不住。……你就得狠起心肠来，才担得住日后的风险呢。」",
            "引证 · 「铁鸟儿」喻＋「狠起心肠」：过来人冷知识，军眷生存说明书")
add_card(slide, Inches(0.5), Inches(4.3), Inches(6.0), Inches(2.6))
add_paras(slide, Inches(0.75), Inches(4.5), Inches(5.5), Inches(2.2), [
    ("人物功能", {"size": 15, "bold": True, "color": ACCENT, "space_after": 8}),
    ("• 第一人称「我」：见证朱青上下两世", {"size": 13, "color": TEXT, "space_after": 5}),
    ("• 伟成抛海「嘭」一下：自身亦是流亡创伤体", {"size": 13, "color": TEXT, "space_after": 5}),
    ("• 下部「找不出话来开导」：旧伦理在新朱青面前失效", {"size": 13, "color": TEXT, "space_after": 0}),
])
add_card(slide, Inches(6.8), Inches(4.3), Inches(6.0), Inches(2.6))
add_paras(slide, Inches(7.05), Inches(4.5), Inches(5.5), Inches(2.2), [
    ("对照意义", {"size": 15, "bold": True, "color": ACCENT, "space_after": 8}),
    ("• 师娘：硬心肠＋守常过日子", {"size": 13, "color": TEXT, "space_after": 5}),
    ("• 朱青：硬心肠＋及时行乐", {"size": 13, "color": TEXT, "space_after": 5}),
    ("• 同一条「求生」命题，两种完成形态", {"size": 13, "color": TEXT, "space_after": 0}),
])

# ==================== 二、艺术手法 总览 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "二 / 艺术手法", "主要手法一览",
               "手法服务人物转变与主题：每一种都有文本落点")
techniques = [
    ("对比", "蓝布长衫 ↔ 紫纱旗袍\n怯态 ↔ 浪荡劲儿\n嚎哭 ↔ 涂蔻丹"),
    ("象征", "《东山一把青》\n五彩鸳鸯\n「赛白光」外号"),
    ("反讽", "「白头偕老」喜匾\n死了却还有知觉\n脸刻不下痕迹"),
    ("比喻", "铁鸟儿／鱼肚皮\n瞎耗子惨叫\n天上飞／心在地"),
    ("细节", "服饰、丝巾、蔻丹\n「嘭」一下抛海\n筹码堆到鼻尖"),
    ("对话", "狠起心肠\n一个死了托一个\n童子鸡议论"),
]
for i, (t, b) in enumerate(techniques):
    col, row = i % 3, i // 3
    x = Inches(0.5) + Inches(col * 4.2)
    y = Inches(2.05) + Inches(row * 2.5)
    add_card(slide, x, y, Inches(4.0), Inches(2.3))
    add_textbox(slide, x + Inches(0.25), y + Inches(0.25), Inches(3.5), Inches(0.4),
                t, size=20, bold=True, color=ACCENT2)
    add_paras(slide, x + Inches(0.25), y + Inches(0.8), Inches(3.5), Inches(1.3), [
        (line, {"size": 13, "color": MUTED, "space_after": 4})
        for line in b.split("\n")
    ])

# ==================== 对比 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "二 / 艺术手法", "对比：服饰与身份的戏剧性翻转",
               "同一人物的视觉系统整体对翻＝转变最显眼的证据")
add_card(slide, Inches(0.5), Inches(2.0), Inches(6.0), Inches(4.8))
add_textbox(slide, Inches(0.75), Inches(2.2), Inches(5.5), Inches(0.4),
            "上部 · 初始身份", size=18, bold=True, color=ACCENT)
add_paras(slide, Inches(0.75), Inches(2.8), Inches(5.5), Inches(3.7), [
    ("「半新旧直统子的蓝布长衫」", {"size": 14, "color": QUOTE, "bold": True, "space_after": 6}),
    ("「白绸子手绢儿」「未烫的头发」", {"size": 14, "color": QUOTE, "space_after": 6}),
    ("「带绊的黑皮鞋」「白色的短统袜子」", {"size": 14, "color": QUOTE, "space_after": 10}),
    ("效果：确立青涩纯真的女学生档案；规训、怯生、未充分社会化。",
     {"size": 13, "color": MUTED, "space_after": 0}),
])
add_card(slide, Inches(6.8), Inches(2.0), Inches(6.0), Inches(4.8))
add_textbox(slide, Inches(7.05), Inches(2.2), Inches(5.5), Inches(0.4),
            "下部 · 社会重生", size=18, bold=True, color=ACCENT2)
add_paras(slide, Inches(7.05), Inches(2.8), Inches(5.5), Inches(3.7), [
    ("「透明紫纱洒金片的旗袍」", {"size": 14, "color": QUOTE, "bold": True, "space_after": 6}),
    ("「三寸高」高跟鞋、「金锁片」闪光", {"size": 14, "color": QUOTE, "space_after": 6}),
    ("「懒洋洋的浪荡劲儿」「赛白光」", {"size": 14, "color": QUOTE, "space_after": 10}),
    ("效果：视觉完成身份重生；风情是康乐文化中的生存资本，不宜只读成道德堕落。",
     {"size": 13, "color": MUTED, "space_after": 0}),
])

# ==================== 象征 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "二 / 艺术手法", "象征：歌谣母题与婚恋器物",
               "《东山一把青》＝篇名＝人物自我解释的口号")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(1.7),
            "东山哪，一把青。西山哪，一把青。郎有心来姊有心，郎呀，咱俩儿好成亲哪——",
            "引证 · 母题初现：求成亲的欲望与青春（「一把青」＝一把转瞬青春）")
quote_block(slide, Inches(0.5), Inches(3.9), Inches(6.0), Inches(2.9),
            "一床绣满五彩鸳鸯的丝被面教她搓得全是皱纹。"
            "在她脸旁被面上，却浸着一块碗大的湿印子。",
            "象征反讽：鸳鸯＝双飞理想；皱纹与泪印＝理想被揉皱")
quote_block(slide, Inches(6.8), Inches(3.9), Inches(6.0), Inches(2.9),
            "嘴里翻来滚去嚷着她常爱唱的那首《东山一把青》。"
            "……嗳呀嗳嗳呀，郎呀，采花儿要趁早哪——",
            "象征收束：歌词从「好成亲」滑到「采花趁早」＝及时行乐宣言")

# ==================== 反讽 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "二 / 艺术手法", "反讽：承诺、知觉与无痕之脸",
               "祝福语、悖论句、外貌描写——皆可作「反面预言」精读")
items = [
    ("器物反讽", "「白头偕老」",
     "墙上……乌木烫金的喜匾……写着「白头偕老」。",
     "新婚未度蜜月、战事将起；越庄重，后文「粉身碎骨」越残酷。"),
    ("悖论反讽", "「死了却还有知觉」",
     "「他也死了……轰地一下便没了——我也死了，可是我却还有知觉呢。」",
     "活着的惩罚是继续感受；解释下部何以必须改换活法。"),
    ("外貌反讽", "「刻不下痕迹」",
     "岁月在她的脸上好像刻不下痕迹来了似的。",
     "外表无痕 vs 层层死亡；青春感成了创伤后的面具。"),
]
for i, (tag, tit, q, note) in enumerate(items):
    y = Inches(1.95) + Inches(i * 1.7)
    add_card(slide, Inches(0.5), y, Inches(12.3), Inches(1.55))
    add_textbox(slide, Inches(0.75), y + Inches(0.15), Inches(2.2), Inches(0.35),
                tag, size=13, bold=True, color=ACCENT2)
    add_textbox(slide, Inches(3.0), y + Inches(0.15), Inches(9), Inches(0.35),
                tit, size=16, bold=True, color=ACCENT)
    add_textbox(slide, Inches(0.75), y + Inches(0.55), Inches(11.8), Inches(0.4),
                f"「{q}」", size=13, color=QUOTE)
    add_textbox(slide, Inches(0.75), y + Inches(1.0), Inches(11.8), Inches(0.35),
                note, size=12, color=MUTED)

# ==================== 比喻 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "二 / 艺术手法", "比喻：冷硬、血腥与非人化",
               "喻体选择本身即主题——人被物化、痛苦被降格为噪声")
quotes = [
    ("铁鸟儿", "「他们就像那些铁鸟儿……你抓也抓不住。」",
     "「铁」冷硬，「鸟」残留自由幻觉；军眷等待＝结构性命运。"),
    ("鱼肚皮", "「她的一张脸像是划破了的鱼肚皮，一块白、一块红，血汗斑斑。」",
     "面部创伤写成被剖开的鱼腹；美与尊严被战争碾成可怖视觉。"),
    ("瞎耗子", "「喉头不断发出……好像一只瞎耗子被人踩得发出吱吱的惨叫。」",
     "悲恸降格为被践踏小动物声；与后文浪荡歌声对照＝声音史即转变史。"),
]
for i, (t, q, n) in enumerate(quotes):
    x = Inches(0.5) + Inches(i * 4.2)
    add_card(slide, x, Inches(2.05), Inches(4.0), Inches(4.8))
    add_textbox(slide, x + Inches(0.25), Inches(2.25), Inches(3.5), Inches(0.4),
                t, size=18, bold=True, color=ACCENT)
    add_paras(slide, x + Inches(0.25), Inches(2.85), Inches(3.5), Inches(3.7), [
        (q, {"size": 13, "color": QUOTE, "bold": True, "space_after": 12}),
        (n, {"size": 13, "color": MUTED, "space_after": 0}),
    ])

# ==================== 三、叙事手法 总览 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "三 / 叙事手法", "叙事手法总览",
               "第一人称见证＋上下对照结构；靠衣、声、歌、物推动转变，少直抒胸臆")
narr = [
    ("第一人称见证", "师娘「我」讲述\n过来人＋旁观者\n非全知上帝视角"),
    ("双城对照结构", "南京／台北\n同名仁爱东村\n名字可复制，人生不可复原"),
    ("时间省略跳跃", "热恋坠机写细\n南迁来台压缩\n重逢猛然接上"),
    ("细节器物叙事", "服饰／喜匾／蔻丹\n少心理独白\n以物推进弧线"),
    ("母题反复", "《东山一把青》\n成亲→采花趁早\n歌词变奏＝哲学变奏"),
    ("死亡轮回", "郭轸→伟成→小顾\n重复修辞\n悲剧写成常态"),
    ("对话侧面叙事", "狠起心肠\n童子鸡／风话\n社群声口补全人物"),
]
# 7 cards in 2 rows: 4 + 3
for i, (t, b) in enumerate(narr):
    if i < 4:
        x = Inches(0.4) + Inches(i * 3.2)
        y = Inches(2.0)
        w = Inches(3.05)
    else:
        x = Inches(1.0) + Inches((i - 4) * 3.7)
        y = Inches(4.55)
        w = Inches(3.5)
    add_card(slide, x, y, w, Inches(2.3) if i < 4 else Inches(2.35))
    add_textbox(slide, x + Inches(0.15), y + Inches(0.2), w - Inches(0.3), Inches(0.4),
                t, size=15, bold=True, color=ACCENT2)
    add_paras(slide, x + Inches(0.15), y + Inches(0.7), w - Inches(0.3), Inches(1.5), [
        (line, {"size": 12, "color": MUTED, "space_after": 3})
        for line in b.split("\n")
    ])

# ==================== 叙事：第一人称 + 双城 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "三 / 叙事手法", "① 第一人称见证  ② 上下篇双城对照",
               "叙述者功能与结构叙事——结构本身在讲流亡断裂")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(6.0), Inches(2.5),
            "我觉得虽然我比朱青还大了一大把年纪，可是我已经找不出什么话来可以开导她的了。",
            "引证 · 第一人称：转变靠「我看见／我听见」；下部叙述者失语＝旧伦理失效")
quote_block(slide, Inches(6.8), Inches(2.0), Inches(6.0), Inches(2.5),
            "我们这个眷属区碰巧又叫做仁爱东村，可是和我在南京住的那个却毫不相干。",
            "引证 · 结构叙事：同名反复、「碰巧」拆穿连续性幻觉")
add_card(slide, Inches(0.5), Inches(4.75), Inches(12.3), Inches(2.15))
add_paras(slide, Inches(0.8), Inches(4.95), Inches(11.8), Inches(1.8), [
    ("精读要点", {"size": 15, "bold": True, "color": ACCENT, "space_after": 8}),
    ("• 师娘不是全知上帝，而是过来人＋旁观者；朱青内心少直接剖白，多由见证场面呈现。",
     {"size": 13, "color": TEXT, "space_after": 5}),
    ("• 南京→台北同名村子：结构本身说出主题——迁徙之后，记忆无法原样安置。",
     {"size": 13, "color": TEXT, "space_after": 0}),
])

# ==================== 叙事：省略 + 细节器物 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "三 / 叙事手法", "③ 时间省略跳跃  ④ 细节／器物推进叙事",
               "空白逼读者补全变身；少心理分析，多可感证据")
add_card(slide, Inches(0.5), Inches(2.0), Inches(6.0), Inches(4.8))
add_paras(slide, Inches(0.75), Inches(2.2), Inches(5.5), Inches(4.4), [
    ("时间跨度＋省略", {"size": 17, "bold": True, "color": ACCENT, "space_after": 10}),
    ("上部：热恋、新婚、坠机——写细", {"size": 14, "color": TEXT, "space_after": 6}),
    ("中间：南迁、来台多年——压缩", {"size": 14, "color": TEXT, "space_after": 6}),
    ("下部：新生社重逢——猛然接上", {"size": 14, "color": TEXT, "space_after": 12}),
    ("效果：中间「空白」逼读者用重逢场面补全朱青如何变成「赛白光」。",
     {"size": 13, "color": MUTED, "space_after": 12}),
    ("引证：「师娘，我是朱青。」那个女人笑吟吟地望着我说道。",
     {"size": 13, "color": QUOTE, "bold": True, "space_after": 0}),
])
add_card(slide, Inches(6.8), Inches(2.0), Inches(6.0), Inches(4.8))
add_paras(slide, Inches(7.05), Inches(2.2), Inches(5.5), Inches(4.4), [
    ("以细节／器物叙事", {"size": 17, "bold": True, "color": ACCENT2, "space_after": 10}),
    ("蓝布长衫 → 紫纱旗袍", {"size": 14, "color": TEXT, "space_after": 6}),
    ("喜匾「白头偕老」／鸳鸯被面", {"size": 14, "color": TEXT, "space_after": 6}),
    ("涂蔻丹／「嘭」一下抛海", {"size": 14, "color": TEXT, "space_after": 12}),
    ("效果：几乎不用长篇内心独白；衣、声、歌、物带动情节与人物弧线。",
     {"size": 13, "color": MUTED, "space_after": 12}),
    ("答题提示：先引「看得见／听得见」的证据，再上推主题。",
     {"size": 13, "color": QUOTE, "space_after": 0}),
])

# ==================== 叙事：母题 + 轮回 + 对话 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "三 / 叙事手法", "⑤ 母题反复  ⑥ 死亡轮回  ⑦ 对话侧面叙事",
               "歌词变奏、情节重复、社群声口——三者合力完成转变叙事")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(1.55),
            "东山哪，一把青……咱俩儿好成亲哪——  →  嗳呀嗳嗳呀，郎呀，采花儿要趁早哪——",
            "母题反复：歌词从求成亲滑到采花趁早＝人物哲学变奏，兼作全篇收束句")
quote_block(slide, Inches(0.5), Inches(3.75), Inches(6.0), Inches(3.1),
            "「一个死了托一个，这么轮下来的。」……「不笑难道叫她们哭不成？」"
            "／郭轸坠机 → 伟成抛海 → 小顾再死",
            "死亡轮回：情节重复＝命运结构；私人悲剧被写成眷村常态")
quote_block(slide, Inches(6.8), Inches(3.75), Inches(6.0), Inches(3.1),
            "「你就得狠起心肠来」／「爱吃童子鸡」／「两个小挨刀的，……还吃起大姊的豆腐来！」",
            "对话／转述侧面叙事：用社群声口补全朱青，避免单一视角说教")

# ==================== 叙事手法 一句话收束 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "三 / 叙事手法", "叙事手法 · 一句话收束",
               "答题可用总括句——先点手法，再挂证据")
add_card(slide, Inches(0.5), Inches(2.1), Inches(12.3), Inches(4.7))
add_paras(slide, Inches(0.85), Inches(2.4), Inches(11.6), Inches(4.2), [
    ("总括", {"size": 16, "bold": True, "color": ACCENT, "space_after": 12}),
    ("第一人称见证＋上下对照结构，靠服饰／歌声／死亡重复推动转变，"
     "少直抒胸臆，多让读者从「看得见、听得见」的证据里读出创伤与求生。",
     {"size": 16, "color": TEXT, "space_after": 18}),
    ("七条叙事手法速记", {"size": 15, "bold": True, "color": ACCENT2, "space_after": 10}),
    ("1. 第一人称见证　2. 双城对照结构　3. 时间省略跳跃　4. 细节器物叙事",
     {"size": 14, "color": TEXT, "space_after": 8}),
    ("5. 《东山一把青》母题反复　6. 死亡轮回的重复修辞　7. 对话／转述侧面叙事",
     {"size": 14, "color": TEXT, "space_after": 18}),
    ("与「艺术手法」区分：叙事手法偏视角／结构／推进方式；艺术手法偏修辞与表现手段（对比、象征、反讽、比喻等）。",
     {"size": 13, "color": MUTED, "space_after": 0}),
])

# ==================== 四、情节结构 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "四 / 故事情节结构", "上下篇双城对照结构",
               "南京仁爱东村 → 台北「碰巧又叫做」仁爱东村：同名反复，人生不可复原")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(1.5),
            "来到台北这些年……我们这个眷属区碰巧又叫做仁爱东村，"
            "可是和我在南京住的那个却毫不相干。",
            "结构枢纽：名字可复制，记忆与人生不可复原；「碰巧」拆穿连续性幻觉")
add_card(slide, Inches(0.5), Inches(3.75), Inches(6.0), Inches(3.1))
add_paras(slide, Inches(0.75), Inches(3.95), Inches(5.5), Inches(2.7), [
    ("上部 · 南京", {"size": 17, "bold": True, "color": ACCENT, "space_after": 8}),
    ("还都繁华 → 热恋结婚 → 出征托付", {"size": 13, "color": TEXT, "space_after": 5}),
    ("→ 坠机丧夫 → 创伤崩解 → 被娘拖走", {"size": 13, "color": TEXT, "space_after": 10}),
    ("功能：建立理想与粉碎；完成「狠心肠」的预言与第一次死亡冲击。",
     {"size": 12, "color": MUTED, "space_after": 0}),
])
add_card(slide, Inches(6.8), Inches(3.75), Inches(6.0), Inches(3.1))
add_paras(slide, Inches(7.05), Inches(3.95), Inches(5.5), Inches(2.7), [
    ("下部 · 台北", {"size": 17, "bold": True, "color": ACCENT2, "space_after": 8}),
    ("重逢「赛白光」→ 康乐／麻将生活", {"size": 13, "color": TEXT, "space_after": 5}),
    ("→ 小顾再死 → 涂蔻丹／采花趁早", {"size": 13, "color": TEXT, "space_after": 10}),
    ("功能：死亡轮回；把上部预言写成完成态；主题收束于及时行乐。",
     {"size": 12, "color": MUTED, "space_after": 0}),
])

# ==================== 情节节点 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "四 / 故事情节结构", "关键情节节点与结构功能",
               "每一步都在推进「转变」与「求生」")
nodes = [
    ("① 亮相", "郭轸「英气勃勃」；朱青蓝布长衫初见——建立对照基线"),
    ("② 痴恋越界", "飞到金陵女中上空；「心都在地上跟着她」——浪漫与违规"),
    ("③ 婚而未欢", "喜匾「白头偕老」；鸳鸯被面泪印——承诺已遭分离撕裂"),
    ("④ 第一次死", "徐州坠机；鱼肚皮／瞎耗子——创伤峰值"),
    ("⑤ 流亡错位", "同名仁爱东村「毫不相干」；伟成「嘭」一下抛海"),
    ("⑥ 重逢变身", "《东山一把青》舞台；「师娘，我是朱青」——结构惊变"),
    ("⑦ 轮回再死", "小顾出事；「童子鸡」议论——死亡重复为常态"),
    ("⑧ 冷酷收束", "涂蔻丹＋「采花儿要趁早」——生存哲学公开化"),
]
for i, (t, b) in enumerate(nodes):
    col, row = i % 2, i // 2
    x = Inches(0.5) + Inches(col * 6.4)
    y = Inches(1.95) + Inches(row * 1.25)
    add_card(slide, x, y, Inches(6.2), Inches(1.1))
    add_textbox(slide, x + Inches(0.2), y + Inches(0.15), Inches(1.5), Inches(0.35),
                t, size=14, bold=True, color=ACCENT2)
    add_textbox(slide, x + Inches(1.8), y + Inches(0.15), Inches(4.2), Inches(0.8),
                b, size=13, color=TEXT)

# ==================== 死亡轮回结构 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "四 / 故事情节结构", "死亡轮回：结构即主题",
               "私人悲剧被写成社区常态；情节重复＝命运结构")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(1.6),
            "「像你后头那个周太太吧，她已经嫁了四次了。一个死了托一个，这么轮下来的。」"
            "「可是她们看着还有说有笑的。」……「不笑难道叫她们哭不成？」",
            "引证 · 对话写出眷村法则：再嫁轮替消化死亡；为朱青转变提供社会样本")
add_card(slide, Inches(0.5), Inches(3.9), Inches(12.3), Inches(3.0))
add_paras(slide, Inches(0.8), Inches(4.15), Inches(11.8), Inches(2.5), [
    ("结构读法", {"size": 16, "bold": True, "color": ACCENT, "space_after": 10}),
    ("郭轸之死（上部峰值） → 伟成抛海（叙述者创伤） → 小顾之死（下部回声）",
     {"size": 15, "color": TEXT, "space_after": 8}),
    ("三次死亡不是偶然叠加，而是情节结构的「重复修辞」：军眷世界里，坠落与消失会一再发生。",
     {"size": 14, "color": MUTED, "space_after": 8}),
    ("朱青从嚎哭到涂蔻丹，不是情节断裂，而是结构逼出的伦理改写：在轮回中学会「狠心肠」。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ==================== 四、语言特色 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "五 / 语言特色", "语言如何「做事」",
               "服饰语汇、声口对话、歌谣穿插、拟声压缩——皆为人物与主题服务")
langs = [
    ("服饰编码语言", "衣着词汇密集、可档案化",
     "「蓝布长衫」「紫纱洒金片」「粉红绸睡衣」「涂蔻丹」——以物写人，几乎不用抽象形容词定论。"),
    ("叙述声口", "过来人闲话体＋冷知识",
     "「我的姑娘」「莫怪我讲句老实话」——师娘语气习以为常，把集体创伤说得家常。"),
    ("市井俚语", "侧面描写的消费式闲话",
     "「爱吃童子鸡」「吃起大姊的豆腐」「两个小挨刀的」——口语活力与物化目光并存。"),
    ("歌谣穿插", "流行歌词成为主题句",
     "从「咱俩儿好成亲」到「采花儿要趁早」——歌词演变＝人物哲学演变。"),
]
for i, (t, s, b) in enumerate(langs):
    y = Inches(1.95) + Inches(i * 1.25)
    add_card(slide, Inches(0.5), y, Inches(12.3), Inches(1.1))
    add_textbox(slide, Inches(0.75), y + Inches(0.15), Inches(3.0), Inches(0.35),
                t, size=15, bold=True, color=ACCENT)
    add_textbox(slide, Inches(3.9), y + Inches(0.15), Inches(8.5), Inches(0.3),
                s, size=12, color=ACCENT2)
    add_textbox(slide, Inches(0.75), y + Inches(0.55), Inches(11.8), Inches(0.4),
                b, size=13, color=TEXT)

# ==================== 语言 拟声与节奏 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "五 / 语言特色", "拟声、节奏与「瞬间消失」",
               "复杂人生被收成单音节——语言本身再现流亡中的潦草与无助")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(6.0), Inches(2.4),
            "他一断气，船上水手便把他用麻包袋套起来……"
            "我只听得「嘭」一下，人便没了。",
            "拟声细节：死亡压缩成一声闷响；与郭轸「轰地一下便没了」呼应")
quote_block(slide, Inches(6.8), Inches(2.0), Inches(6.0), Inches(2.4),
            "朱青不停地笑着，嘴里翻来滚去嚷着……"
            "隔不了一会儿，她便哼出两句：……采花儿要趁早哪——",
            "节奏：麻将笑声＋反复哼歌＝结尾的冷酷轻快，与上部嚎哭形成声部对位")
add_card(slide, Inches(0.5), Inches(4.7), Inches(12.3), Inches(2.2))
add_paras(slide, Inches(0.8), Inches(4.9), Inches(11.8), Inches(1.8), [
    ("语言特色小结", {"size": 15, "bold": True, "color": ACCENT, "space_after": 8}),
    ("白先勇不以长篇心理分析写朱青，而以可感的衣、声、歌、物推进转变；"
     "精读时应抓住「看得见／听得见」的证据，再上推到主题。",
     {"size": 14, "color": TEXT, "space_after": 0}),
])

# ==================== 五、主题 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "六 / 主题", "主题总览",
               "战争年代军眷女性的创伤、求生与伦理改写")
themes = [
    ("创伤与知觉", "「我也死了，可是我却还有知觉呢」\n未亡人比死者更残酷：活着即持续受刑。"),
    ("求生与狠心肠", "「你就得狠起心肠来」\n情感硬化不是道德失败，而是职业配偶的生存训练。"),
    ("流亡与错位", "同名「仁爱东村」却「毫不相干」\n迁徙之后，记忆无法原样安置。"),
    ("及时行乐", "「采花儿要趁早哪」\n朝不保夕处，抓住眼前欢愉成了逻辑。"),
]
for i, (t, b) in enumerate(themes):
    col, row = i % 2, i // 2
    x = Inches(0.5) + Inches(col * 6.4)
    y = Inches(2.05) + Inches(row * 2.5)
    add_card(slide, x, y, Inches(6.2), Inches(2.3))
    add_textbox(slide, x + Inches(0.25), y + Inches(0.25), Inches(5.7), Inches(0.4),
                t, size=18, bold=True, color=ACCENT)
    lines = b.split("\n")
    add_paras(slide, x + Inches(0.25), y + Inches(0.85), Inches(5.7), Inches(1.2), [
        (lines[0], {"size": 13, "color": QUOTE, "bold": True, "space_after": 8}),
        (lines[1], {"size": 13, "color": MUTED, "space_after": 0}),
    ])

# ==================== 主题深化 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "六 / 主题", "主题深化：勿止步于「堕落」评判",
               "若只谴责朱青「变坏」，则未完成精读——应看见制度性死亡逼出的伦理")
add_card(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(4.8))
add_paras(slide, Inches(0.85), Inches(2.25), Inches(11.6), Inches(4.3), [
    ("核心命题", {"size": 16, "bold": True, "color": ACCENT, "space_after": 10}),
    ("作者如何通过上下结构、服饰细节与《东山一把青》母题，细读朱青的转变，"
     "并再现战争年代军眷女性的创伤与求生？",
     {"size": 15, "color": TEXT, "space_after": 14}),
    ("文本证据链（答题可用）", {"size": 15, "bold": True, "color": ACCENT2, "space_after": 8}),
    ("1. 结构：南京／台北「仁爱东村」同名反讽 → 流亡断裂",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("2. 人物：蓝布长衫 → 紫纱旗袍；嚎哭 → 涂蔻丹 → 采花趁早",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("3. 手法：对比＋象征母题＋反讽喜匾＋「铁鸟儿」之喻",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("4. 主题落点：私人誓约脆弱；社群以轮替消化死亡；及时行乐是被迫形成的生存哲学。",
     {"size": 14, "color": TEXT, "space_after": 0}),
])

# ==================== 主题 一把青 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "六 / 主题", "何以题为「一把青」？",
               "歌名即篇名：青春、欲望、时限——三者叠合")
quote_block(slide, Inches(0.5), Inches(2.0), Inches(12.3), Inches(1.8),
            "东山哪，一把青。……嗳呀嗳嗳呀，郎呀，采花儿要趁早哪——",
            "「一把青」＝一把转瞬即逝的青春；与飞行员朝不保夕的生命互文")
add_card(slide, Inches(0.5), Inches(4.1), Inches(12.3), Inches(2.8))
add_paras(slide, Inches(0.85), Inches(4.35), Inches(11.6), Inches(2.4), [
    ("三重含义", {"size": 15, "bold": True, "color": ACCENT, "space_after": 8}),
    ("• 物象层：一把青葱／青春颜色——鲜嫩而短促",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("• 人物层：朱青之名与「青」呼应；她的美与变，都在「趁早」逻辑里",
     {"size": 14, "color": TEXT, "space_after": 6}),
    ("• 主题层：在随时可能「轰地一下／嘭一下」的世界，抓住眼前欢愉成为唯一可抓住的「一把」",
     {"size": 14, "color": TEXT, "space_after": 0}),
])

# ==================== 收束 答题框架 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
section_header(slide, "综合", "课堂收束：证据 → 手法 → 效果 → 主题",
               "IB 式精读路径：先引句，再命名手法，再说效果，最后上推主题")
steps = [
    ("① 证据", "先引关键词句\n例：「蓝布长衫」\n「采花儿要趁早」"),
    ("② 手法", "命名艺术手段\n对比／象征／反讽\n比喻／细节／对话"),
    ("③ 效果", "对读者／人物的作用\n塑造、情感、预示\n求生、反讽冲击"),
    ("④ 主题", "上推到作品命题\n创伤、流亡、轮回\n及时行乐的伦理"),
]
for i, (t, b) in enumerate(steps):
    x = Inches(0.5) + Inches(i * 3.2)
    add_card(slide, x, Inches(2.1), Inches(3.05), Inches(4.6))
    add_bar(slide, x, Inches(2.1), Inches(3.05), Inches(0.08), ACCENT2)
    add_textbox(slide, x + Inches(0.2), Inches(2.4), Inches(2.65), Inches(0.45),
                t, size=18, bold=True, color=ACCENT)
    add_paras(slide, x + Inches(0.2), Inches(3.1), Inches(2.65), Inches(3.3), [
        (line, {"size": 13, "color": TEXT if j == 0 else MUTED, "space_after": 6})
        for j, line in enumerate(b.split("\n"))
    ])

# ==================== 尾页 ====================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide)
add_bar(slide, Inches(0), Inches(0), W, Inches(0.12), ACCENT2)
add_textbox(slide, Inches(0.8), Inches(2.5), Inches(11.5), Inches(0.8),
            "《一把青》", size=40, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
add_textbox(slide, Inches(0.8), Inches(3.4), Inches(11.5), Inches(0.5),
            "人物 · 手法 · 叙事 · 结构 · 语言 · 主题", size=20, color=ACCENT2, align=PP_ALIGN.CENTER)
add_textbox(slide, Inches(0.8), Inches(4.3), Inches(11.5), Inches(0.4),
            "精读须有文本细节引证 —— 看得见的衣，听得见的歌，抓不住的铁鸟儿",
            size=15, color=MUTED, align=PP_ALIGN.CENTER)
add_textbox(slide, Inches(0.8), Inches(5.2), Inches(11.5), Inches(0.4),
            "白先勇  ·  文脉精读教学", size=14, color=MUTED, align=PP_ALIGN.CENTER)

out = "/workspace/一把青_精读教学课件.pptx"
prs.save(out)
print(f"OK: {out}")
print(f"slides: {len(prs.slides)}")
