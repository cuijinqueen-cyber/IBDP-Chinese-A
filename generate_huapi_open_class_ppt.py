#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""《画皮》公开课课件 · 纸感墨色 · 按课堂顺序重设计"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree
import shutil

# —— 纸感墨色：低饱和，避免奶油+陶土 / 紫渐变 / 深色科幻感 ——
BG = RGBColor(0xF1, 0xF0, 0xEC)
PANEL = RGBColor(0xE8, 0xE6, 0xE0)
INK = RGBColor(0x22, 0x22, 0x20)
MUTED = RGBColor(0x6E, 0x6C, 0x66)
ACCENT = RGBColor(0x5C, 0x4A, 0x3E)      # 烟灰褐
ACCENT_SOFT = RGBColor(0x8A, 0x7A, 0x6C)
LINE = RGBColor(0xC8, 0xC4, 0xBC)
QUOTE_BG = RGBColor(0xEA, 0xE7, 0xE1)
RULE = RGBColor(0x5C, 0x4A, 0x3E)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
W, H = prs.slide_width, prs.slide_height
FONT = "Microsoft YaHei"


def set_run(run, size=18, bold=False, color=INK, font=FONT):
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
    spTree = slide.shapes._spTree
    sp = shape._element
    spTree.remove(sp)
    spTree.insert(2, sp)


def add_rect(slide, left, top, width, height, color, line=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        shape.line.width = Pt(1)
    return shape


def thin_rule(slide, left, top, width, color=LINE, thick=1):
    add_rect(slide, left, top, width, Pt(thick), color)


def left_spine(slide, color=RULE):
    """左侧细脊线，统一版式锚点"""
    add_rect(slide, Inches(0), Inches(0), Inches(0.12), H, color)


def add_textbox(slide, left, top, width, height, text, size=18, bold=False,
                color=INK, align=PP_ALIGN.LEFT):
    box = slide.shapes.add_textbox(left, top, width, height)
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    set_run(run, size=size, bold=bold, color=color)
    return box


def add_paras(slide, left, top, width, height, lines, size=15):
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
        p.space_after = Pt(opts.get("space_after", 8))
        run = p.add_run()
        run.text = text
        set_run(
            run,
            size=opts.get("size", size),
            bold=opts.get("bold", False),
            color=opts.get("color", INK),
        )
    return box


def page_head(slide, step, title, sub=""):
    add_bg(slide)
    left_spine(slide)
    add_textbox(slide, Inches(0.55), Inches(0.32), Inches(12), Inches(0.28),
                step, size=12, color=ACCENT_SOFT)
    add_textbox(slide, Inches(0.55), Inches(0.58), Inches(12), Inches(0.48),
                title, size=26, bold=True, color=INK)
    thin_rule(slide, Inches(0.55), Inches(1.18), Inches(12.2), LINE, 1)
    if sub:
        add_textbox(slide, Inches(0.55), Inches(1.28), Inches(12), Inches(0.32),
                    sub, size=13, color=MUTED)
    return 1.7 if sub else 1.45


def quote_band(slide, top, quote, source="", height=Inches(1.55)):
    """通栏引文带，不用圆角卡"""
    add_rect(slide, Inches(0.55), top, Inches(12.2), height, QUOTE_BG)
    add_rect(slide, Inches(0.55), top, Inches(0.08), height, ACCENT)
    y = top + Inches(0.22)
    add_textbox(slide, Inches(0.85), y, Inches(11.6), height - Inches(0.35),
                quote, size=16, bold=True, color=INK)
    if source:
        add_textbox(slide, Inches(0.85), top + height - Inches(0.38),
                    Inches(11.6), Inches(0.3), source, size=12, color=MUTED)


# ========== 1 封面 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(s)
left_spine(s, ACCENT)
add_rect(s, Inches(0.55), Inches(1.85), Inches(1.1), Pt(2), ACCENT)
add_textbox(s, Inches(0.55), Inches(2.1), Inches(11), Inches(0.35),
            "高二文学 · 公开课 · 40分钟 · 5人小班", size=14, color=ACCENT_SOFT)
add_textbox(s, Inches(0.55), Inches(2.55), Inches(12), Inches(0.85),
            "识破「妍皮」", size=44, bold=True, color=INK)
add_textbox(s, Inches(0.55), Inches(3.45), Inches(12), Inches(0.45),
            "《聊斋志异·画皮》精读", size=22, color=MUTED)
thin_rule(s, Inches(0.55), Inches(4.15), Inches(3.2), ACCENT, 2)
add_textbox(s, Inches(0.55), Inches(4.45), Inches(11), Inches(0.9),
            "先找证据，再争看法，最后自己写出结论", size=15, color=MUTED)

# ========== 2 本课问题 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
y0 = page_head(s, "课前", "这节课要弄清什么", "教师少讲情节，学生多找原文")
add_textbox(s, Inches(0.55), Inches(y0), Inches(12), Inches(0.35),
            "核心问题", size=13, color=ACCENT_SOFT)
add_textbox(s, Inches(0.55), Inches(y0 + 0.35), Inches(12), Inches(0.55),
            "王生是不知道，还是知道了仍不改？", size=24, bold=True, color=INK)
thin_rule(s, Inches(0.55), Inches(y0 + 1.05), Inches(12.2))
goals = [
    ("01", "自己划出至少三处关键原文"),
    ("02", "给手法起名字，说清它起什么作用"),
    ("03", "争论后，共同写出一句站得住的主题句"),
    ("04", "试挂一个具体的全球性议题（IO 预备）"),
]
for i, (num, text) in enumerate(goals):
    x = Inches(0.55) + Inches(i * 3.1)
    add_rect(s, x, Inches(4.0), Inches(2.9), Inches(2.4), PANEL)
    add_textbox(s, x + Inches(0.2), Inches(4.25), Inches(2.5), Inches(0.4),
                num, size=20, bold=True, color=ACCENT)
    add_textbox(s, x + Inches(0.2), Inches(4.85), Inches(2.5), Inches(1.3),
                text, size=14, color=INK)

# ========== 3 流程 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "流程", "四十分钟怎么走", "每人抽一张任务卡：证据／手法／效果／异议／书记")
steps = [
    ("01", "点火", "4′", "看一句判词，先猜它在说什么"),
    ("02", "勘探", "10′", "默读划线，五人分工找证据、定手法"),
    ("03", "庭辩", "12′", "二选一辩题，发言必须带原文"),
    ("04", "收束", "8′", "共写主题句，试挂全球性议题"),
    ("05", "出门", "6′", "说改口或坚持的一点，交出门条"),
]
for i, (num, name, mins, desc) in enumerate(steps):
    y = Inches(1.75) + Inches(i * 1.0)
    add_rect(s, Inches(0.55), y, Inches(12.2), Inches(0.88), PANEL)
    add_rect(s, Inches(0.55), y, Inches(0.08), Inches(0.88), ACCENT)
    add_textbox(s, Inches(0.85), y + Inches(0.18), Inches(0.7), Inches(0.5),
                num, size=20, bold=True, color=ACCENT)
    add_textbox(s, Inches(1.7), y + Inches(0.15), Inches(2.2), Inches(0.35),
                name, size=18, bold=True, color=INK)
    add_textbox(s, Inches(3.8), y + Inches(0.18), Inches(1.0), Inches(0.35),
                mins, size=14, color=ACCENT_SOFT)
    add_textbox(s, Inches(5.0), y + Inches(0.2), Inches(7.4), Inches(0.5),
                desc, size=14, color=MUTED)

# ========== 4 点火 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(s)
left_spine(s)
add_textbox(s, Inches(0.55), Inches(0.4), Inches(12), Inches(0.3),
            "环节一 · 点火", size=13, color=ACCENT_SOFT)
add_textbox(s, Inches(0.55), Inches(0.75), Inches(12), Inches(0.45),
            "先看这句，别急着讲故事", size=22, bold=True, color=INK)
# 大引文居中区
add_rect(s, Inches(1.2), Inches(2.0), Inches(10.9), Inches(2.4), QUOTE_BG)
add_rect(s, Inches(1.2), Inches(2.0), Inches(0.1), Inches(2.4), ACCENT)
add_textbox(s, Inches(1.6), Inches(2.45), Inches(10.2), Inches(1.0),
            "「明明妖也，而以为美。」", size=34, bold=True, color=INK,
            align=PP_ALIGN.CENTER)
add_textbox(s, Inches(1.6), Inches(3.55), Inches(10.2), Inches(0.4),
            "——异史氏曰", size=14, color=MUTED, align=PP_ALIGN.CENTER)
add_paras(s, Inches(1.2), Inches(4.8), Inches(10.9), Inches(1.8), [
    ("任务（20秒独立写，再轮流说）", {"size": 13, "bold": True, "color": ACCENT, "space_after": 8}),
    ("你觉得这句话在批评哪种人？先别翻书。", {"size": 16, "space_after": 8}),
    ("后面用原文检验：这句判词到底站不站得住。", {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 5 备读＋骨架（合并）==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探前", "先把情节骨架钉住", "出处点到即可；汇报时不要复述全文")
add_paras(s, Inches(0.55), Inches(1.7), Inches(12.2), Inches(0.7), [
    ("备读：译经／唐人小说已有「美妇实鬼」；蒲松龄推进在「铺皮—彩笔细描—披上」，收束到「妍皮裹物，比比皆是」。",
     {"size": 13, "color": MUTED, "space_after": 0}),
])
beats = [
    ("一", "遇美藏匿 → 道士示警，王生不信"),
    ("二", "窥见绘皮、披皮化女 → 求道士，悬蝇拂"),
    ("三", "「心邪，当复有变」→ 鬼复至，裂腹掬心"),
    ("四", "道士收妖 → 陈氏忍辱 → 心归腔中，复生"),
]
for i, (n, t) in enumerate(beats):
    y = Inches(2.5) + Inches(i * 0.72)
    add_textbox(s, Inches(0.55), y, Inches(0.55), Inches(0.45), n, size=18, bold=True, color=ACCENT)
    add_textbox(s, Inches(1.2), y + Inches(0.05), Inches(11.3), Inches(0.45), t, size=16, color=INK)
thin_rule(s, Inches(0.55), Inches(5.5), Inches(12.2))
add_textbox(s, Inches(0.55), Inches(5.7), Inches(12.2), Inches(0.9),
            "划线优先盯四处：「执彩笔而绘之」　「以其言妄，拒之」　「裂腹，掬生心」　「明明妖也，而以为美」",
            size=13, color=ACCENT)

# ========== 6 绘皮 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "最硬的一处：绘皮", "手法：象征＋细节")
quote_band(
    s, Inches(1.7),
    "「见一狞鬼……铺人皮于榻上，执彩笔而绘之。已而掷笔，举皮如振衣状，披于身，遂化为女子。」",
    height=Inches(1.35),
)
add_paras(s, Inches(0.55), Inches(3.3), Inches(12.2), Inches(3.5), [
    ("可以怎么读", {"size": 14, "bold": True, "color": ACCENT, "space_after": 10}),
    ("美不是天生贴在身上的，是画上去、披上去的。越画得细，越说明这层「好看」靠不住。",
     {"size": 16, "space_after": 12}),
    ("和前面「二八姝丽」「心相爱乐」一对照：王生爱上的，其实是那张皮。",
     {"size": 15, "space_after": 14}),
    ("小组追问：若直接写「此乃女鬼」，少了绘皮这一笔，劝诫力量会弱在哪里？",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 7 知而不改 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "不是不知，是不改", "手法：对比、延宕、反讽")
# 三次机会横向
ops = [
    ("拒言", "「以其言妄，拒之」"),
    ("见皮", "亲眼看见，仍心存侥幸"),
    ("得拂", "鬼暂退，却「心邪」复变"),
]
for i, (t, d) in enumerate(ops):
    x = Inches(0.55) + Inches(i * 4.15)
    add_rect(s, x, Inches(1.75), Inches(3.95), Inches(1.9), PANEL)
    add_rect(s, x, Inches(1.75), Inches(3.95), Pt(3), ACCENT)
    add_textbox(s, x + Inches(0.25), Inches(2.05), Inches(3.4), Inches(0.4),
                t, size=18, bold=True, color=INK)
    add_textbox(s, x + Inches(0.25), Inches(2.55), Inches(3.4), Inches(0.8),
                d, size=14, color=MUTED)
add_paras(s, Inches(0.55), Inches(4.0), Inches(12.2), Inches(2.8), [
    ("结构上的意思很清楚：机会给足了。他不是信息不够，是心里那点贪还在。",
     {"size": 16, "bold": True, "space_after": 12}),
    ("夜半鬼复至，径裂腹掬心。异史氏后来说得更直：「既知之而不改，则愚而不可及矣。」",
     {"size": 15, "space_after": 0}),
])

# ========== 8 手法 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "手法先起名，再说作用", "五人卡：证据／手法／效果——给书记员对照")
techs = [
    ("象征", "绘皮、裂腹掬心——「美」和「心」都被写成可拆、可换的物件。"),
    ("对比", "二八姝丽 ↔ 狞鬼；道士示警 ↔ 王生拒之；陈氏忍辱 ↔ 王生贪色。"),
    ("延宕／反复", "拒言 → 见皮 → 得拂 → 心邪复变。机会给足了，才显「不改」。"),
    ("反讽与论赞", "情节已够劝惩；异史氏再点「明明妖也，而以为美」，矛头从鬼推到世人。"),
]
for i, (name, desc) in enumerate(techs):
    row, col = divmod(i, 2)
    x = Inches(0.55) + Inches(col * 6.35)
    y = Inches(1.75) + Inches(row * 2.4)
    add_rect(s, x, y, Inches(6.15), Inches(2.15), PANEL)
    add_rect(s, x, y, Inches(0.08), Inches(2.15), ACCENT)
    add_textbox(s, x + Inches(0.3), y + Inches(0.3), Inches(5.6), Inches(0.4),
                name, size=18, bold=True, color=ACCENT)
    add_textbox(s, x + Inches(0.3), y + Inches(0.85), Inches(5.6), Inches(1.05),
                desc, size=14, color=INK)

# ========== 9 人物 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "两个人物，对照着看", "女鬼与陈氏——先找原文，再谈评价")
# 左
add_rect(s, Inches(0.55), Inches(1.75), Inches(5.95), Inches(5.0), PANEL)
add_rect(s, Inches(0.55), Inches(1.75), Inches(5.95), Pt(3), ACCENT)
add_paras(s, Inches(0.85), Inches(2.05), Inches(5.4), Inches(4.5), [
    ("画皮女鬼", {"size": 18, "bold": True, "color": ACCENT, "space_after": 12}),
    ("外表：二八姝丽，哀告被鬻、受虐，求庇护。", {"size": 14, "space_after": 8}),
    ("内里：翠面锯齿，绘皮，裂腹取心。", {"size": 14, "space_after": 8}),
    ("无名无姓，来历含糊——更像「皮相」的符号。", {"size": 14, "space_after": 14}),
    ("注意：文本写「惑」，不等于把所有女性写成祸水。争论留到庭辩。",
     {"size": 13, "color": MUTED, "space_after": 0}),
])
# 右
add_rect(s, Inches(6.8), Inches(1.75), Inches(5.95), Inches(5.0), PANEL)
add_rect(s, Inches(6.8), Inches(1.75), Inches(5.95), Pt(3), ACCENT)
add_paras(s, Inches(7.1), Inches(2.05), Inches(5.4), Inches(4.5), [
    ("陈氏", {"size": 18, "bold": True, "color": ACCENT, "space_after": 12}),
    ("劝遣媵妾，有分寸；夫死骇涕，仍奔告道士。", {"size": 14, "space_after": 8}),
    ("膝行求丐，受杖受辱，强啖痰唾。", {"size": 14, "space_after": 8}),
    ("救回来的是她的忍与诚，不是王生自己醒悟。", {"size": 14, "space_after": 14}),
    ("可问：复生写得很用力，代价是否过多压在妻子身上？",
     {"size": 13, "color": MUTED, "space_after": 0}),
])

# ========== 10 庭辩 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节三 · 庭辩", "二选一，发言先带原文半句",
          "正方反方各二人；异议官可加盟或追问；每人不超过四十秒")
add_rect(s, Inches(0.55), Inches(1.85), Inches(12.2), Inches(2.0), PANEL)
add_textbox(s, Inches(0.85), Inches(2.05), Inches(11.6), Inches(0.35),
            "辩题甲", size=13, color=ACCENT_SOFT)
add_textbox(s, Inches(0.85), Inches(2.5), Inches(11.6), Inches(0.9),
            "王生的悲剧，主因是「不知」，还是「知之而不改」？",
            size=20, bold=True, color=INK)
add_rect(s, Inches(0.55), Inches(4.15), Inches(12.2), Inches(2.0), PANEL)
add_textbox(s, Inches(0.85), Inches(4.35), Inches(11.6), Inches(0.35),
            "辩题乙", size=13, color=ACCENT_SOFT)
add_textbox(s, Inches(0.85), Inches(4.8), Inches(11.6), Inches(0.9),
            "「画皮」主要在骂鬼，还是在骂人间那些「妍皮裹物」的人？",
            size=20, bold=True, color=INK)
add_textbox(s, Inches(0.55), Inches(6.45), Inches(12.2), Inches(0.4),
            "最后六十秒允许改口。改口要说清：是哪一句原文把你说动的。",
            size=13, color=MUTED)

# ========== 11 主题 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节四 · 收束", "一起写出一句主题句", "尽量写进：表里、欲望、知行——至少两点")
quote_band(
    s, Inches(1.7),
    "「愚哉世人！明明妖也，而以为美。……既知之而不改……天下妍皮裹物者，固比比皆是也。」",
    height=Inches(1.25),
)
add_paras(s, Inches(0.55), Inches(3.2), Inches(12.2), Inches(3.6), [
    ("可落成这样的意思（学生自己改，不要照抄）",
     {"size": 13, "bold": True, "color": ACCENT, "space_after": 8}),
    ("《画皮》借绘皮和多次拒警，写出人因贪欲看不清，甚至看清了仍不改，终致丧心；也提醒：披着好看外壳害人的，世间并不少见。",
     {"size": 15, "space_after": 14}),
    ("还有一层可以提出来，不必强行统一",
     {"size": 13, "bold": True, "color": ACCENT, "space_after": 8}),
    ("陈氏忍辱救夫写得很用力；作者夸「食人之唾而甘之」，是否也带出那个时代对妻子的要求？骂伪饰是显层，男权痕迹是潜层——可以争议。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 12 IO ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节四 · 延伸", "若做个人口述，议题怎么挂", "一个议题就够；大半时间仍贴着《画皮》原文")
add_textbox(s, Inches(0.55), Inches(1.75), Inches(12.2), Inches(0.35),
            "比较好用的说法", size=13, color=ACCENT_SOFT)
add_textbox(s, Inches(0.55), Inches(2.15), Inches(12.2), Inches(0.7),
            "人们怎样被精致的外表和欲望牵着走，预警来了也选择自欺？",
            size=20, bold=True, color=INK)
# 三列证据
cols = [
    ("绘皮", "包装可以人造"),
    ("拒警", "不是看不见，是不愿改"),
    ("陈氏", "修复往往要别人付代价"),
]
for i, (t, d) in enumerate(cols):
    x = Inches(0.55) + Inches(i * 4.15)
    add_rect(s, x, Inches(3.15), Inches(3.95), Inches(1.7), PANEL)
    add_textbox(s, x + Inches(0.25), Inches(3.4), Inches(3.4), Inches(0.4),
                t, size=16, bold=True, color=ACCENT)
    add_textbox(s, x + Inches(0.25), Inches(3.95), Inches(3.4), Inches(0.6),
                d, size=14, color=INK)
add_textbox(s, Inches(0.55), Inches(5.2), Inches(12.2), Inches(1.4),
            "若比《台北人》，可用《金大班的最后一夜》或《永远的尹雪艳》：同写「表层」，一个是妖伪，一个是舞台硬壳或魅惑；识破之后，判断并不一样。",
            size=14, color=MUTED)

# ========== 13 出门 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节五 · 出门", "下课前完成", "公开课要让人看见过程，不是背标准答案")
add_textbox(s, Inches(0.55), Inches(1.9), Inches(12.2), Inches(0.5),
            "每人十五秒：今天我改口或坚持的一点是……", size=18, color=INK)
add_rect(s, Inches(0.55), Inches(2.7), Inches(12.2), Inches(3.2), PANEL)
add_rect(s, Inches(0.55), Inches(2.7), Inches(0.1), Inches(3.2), ACCENT)
add_textbox(s, Inches(0.95), Inches(3.0), Inches(11.4), Inches(0.4),
            "出门条（写下来交）", size=14, color=ACCENT_SOFT)
add_textbox(s, Inches(0.95), Inches(3.55), Inches(11.4), Inches(0.55),
            "一处证据　＋　一个手法　＋　一句效果", size=24, bold=True, color=INK)
add_textbox(s, Inches(0.95), Inches(4.4), Inches(11.4), Inches(1.1),
            "例：证据「执彩笔而绘之」；手法：象征；效果：美被写成画上去的假面，读者开始怀疑「好看」。",
            size=14, color=MUTED)

# ========== 14 尾页 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(s)
left_spine(s, ACCENT)
add_textbox(s, Inches(0.55), Inches(2.7), Inches(12.2), Inches(0.7),
            "识破的不是鬼，是那层「妍皮」。", size=28, bold=True, color=INK,
            align=PP_ALIGN.CENTER)
thin_rule(s, Inches(5.4), Inches(3.6), Inches(2.5), ACCENT, 2)
add_textbox(s, Inches(0.55), Inches(3.9), Inches(12.2), Inches(0.45),
            "《画皮》· 高二文学公开课", size=14, color=MUTED, align=PP_ALIGN.CENTER)

# —— 输出 ——
out1 = "/workspace/画皮_公开课课件.pptx"
out2 = "/workspace/HuaPi_OpenClass_PPT.pptx"
out3 = "/workspace/HuaPi_OpenClass.pptx"
prs.save(out1)
for p in (out2, out3,
          "/opt/cursor/artifacts/HuaPi_OpenClass_PPT.pptx",
          "/opt/cursor/artifacts/HuaPi_OpenClass.pptx",
          "/opt/cursor/artifacts/画皮_公开课课件.pptx"):
    shutil.copy(out1, p)
print("OK", len(prs.slides), out1)
