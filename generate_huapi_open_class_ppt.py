#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""《画皮》公开课课件 · 低调纸感 · 按课堂顺序"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree
import shutil

# 低饱和纸感：冷灰底 + 墨色 + 一点沉青灰（避免过暖、过艳）
BG = RGBColor(0xF3, 0xF3, 0xF0)
INK = RGBColor(0x2C, 0x2D, 0x2B)
MUTED = RGBColor(0x6A, 0x6E, 0x68)
ACCENT = RGBColor(0x4A, 0x5C, 0x56)   # 沉青灰，勿过艳
LINE = RGBColor(0xC9, 0xCB, 0xC4)
CARD = RGBColor(0xFA, 0xFA, 0xF8)
QUOTE = RGBColor(0x45, 0x48, 0x44)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
W, H = prs.slide_width, prs.slide_height


def set_run(run, size=18, bold=False, color=INK, font="Microsoft YaHei"):
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = font
    rPr = run._r.get_or_add_rPr()
    ea = rPr.find(qn("a:ea"))
    if ea is None:
        ea = etree.SubElement(rPr, qn("a:ea"))
    ea.set("typeface", font)


def add_bg(slide):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, W, H)
    shape.fill.solid()
    shape.fill.fore_color.rgb = BG
    shape.line.fill.background()
    spTree = slide.shapes._spTree
    sp = shape._element
    spTree.remove(sp)
    spTree.insert(2, sp)


def thin_line(slide, left, top, width):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, Pt(1))
    shape.fill.solid()
    shape.fill.fore_color.rgb = LINE
    shape.line.fill.background()


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
    add_textbox(slide, Inches(0.7), Inches(0.35), Inches(11), Inches(0.3),
                step, size=12, color=ACCENT)
    add_textbox(slide, Inches(0.7), Inches(0.65), Inches(12), Inches(0.5),
                title, size=26, bold=True, color=INK)
    thin_line(slide, Inches(0.7), Inches(1.25), Inches(11.9))
    if sub:
        add_textbox(slide, Inches(0.7), Inches(1.35), Inches(12), Inches(0.35),
                    sub, size=13, color=MUTED)


# ========== 1 封面 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(s)
add_textbox(s, Inches(0.9), Inches(2.1), Inches(11), Inches(0.4),
            "高二文学 · 公开课", size=14, color=ACCENT)
add_textbox(s, Inches(0.9), Inches(2.6), Inches(11), Inches(0.8),
            "识破「妍皮」", size=40, bold=True, color=INK)
add_textbox(s, Inches(0.9), Inches(3.5), Inches(11), Inches(0.45),
            "《聊斋志异·画皮》精读课", size=20, color=MUTED)
thin_line(s, Inches(0.9), Inches(4.15), Inches(4))
add_textbox(s, Inches(0.9), Inches(4.4), Inches(11), Inches(0.8),
            "40分钟 · 5人小班\n先找证据，再争看法，最后自己写出结论", size=14, color=MUTED)

# ========== 2 本课要解决什么 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "课前说明", "这节课要弄清什么", "教师少讲情节，学生多找原文")
add_paras(s, Inches(0.9), Inches(1.9), Inches(11.5), Inches(4.8), [
    ("核心问题", {"size": 16, "bold": True, "color": ACCENT, "space_after": 10}),
    ("王生是不知道，还是知道了仍不改？", {"size": 22, "bold": True, "space_after": 18}),
    ("课堂上大家要能做到：", {"size": 15, "bold": True, "space_after": 10}),
    ("1. 自己划出至少三处关键原文", {"size": 15, "space_after": 8}),
    ("2. 给手法起名字，并说清它起什么作用", {"size": 15, "space_after": 8}),
    ("3. 小组争论后，共同写出一句站得住的主题句", {"size": 15, "space_after": 8}),
    ("4. 试着把故事连到一个具体的全球性议题（为个人口述做准备）", {"size": 15, "space_after": 0}),
])

# ========== 3 课堂顺序 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "流程", "四十分钟怎么走", "每人抽一张任务卡：证据／手法／效果／异议／书记")
steps = [
    ("01  点火  4分钟", "看一句判词，先猜它在说什么"),
    ("02  勘探  10分钟", "默读划线，五人分工找证据、定手法"),
    ("03  庭辩  12分钟", "二选一辩题，发言必须带原文"),
    ("04  收束  8分钟", "共写主题句，试挂全球性议题"),
    ("05  出门  6分钟", "每人说改口或坚持的一点，交出门条"),
]
for i, (t, b) in enumerate(steps):
    y = Inches(1.7) + Inches(i * 0.95)
    add_textbox(s, Inches(0.9), y, Inches(11.5), Inches(0.35), t, size=16, bold=True, color=INK)
    add_textbox(s, Inches(0.9), y + Inches(0.35), Inches(11.5), Inches(0.35), b, size=14, color=MUTED)

# ========== 4 导入 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节一 · 点火", "先看这句，别急着讲故事")
add_textbox(s, Inches(0.9), Inches(2.3), Inches(11.5), Inches(1.2),
            "「明明妖也，而以为美。」", size=32, bold=True, color=INK, align=PP_ALIGN.CENTER)
add_textbox(s, Inches(0.9), Inches(3.7), Inches(11.5), Inches(0.4),
            "——异史氏曰", size=14, color=MUTED, align=PP_ALIGN.CENTER)
add_paras(s, Inches(1.5), Inches(4.6), Inches(10), Inches(2), [
    ("任务（20秒独立写，再轮流说）：", {"size": 14, "bold": True, "color": ACCENT, "space_after": 8}),
    ("你觉得这句话在批评哪种人？先别翻书。", {"size": 15, "space_after": 8}),
    ("后面用原文检验：这句判词到底站不站得住。", {"size": 15, "color": MUTED, "space_after": 0}),
])

# ========== 5 故事从哪来（合并原型，精简）==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "备读一笔", "故事从哪来", "公开课点到即可，不必展开考证")
add_paras(s, Inches(0.9), Inches(1.8), Inches(11.5), Inches(5), [
    ("《聊斋》多采里巷传闻、友人邮寄，也仿历代志传笔法。", {"size": 15, "space_after": 12}),
    ("《画皮》能看到更早的影子：", {"size": 15, "space_after": 10}),
    ("· 译经与唐人小说：美妇实为啖人鬼，夜出脱饰现恶相（《修行地道经》《宣室志》一类）。",
     {"size": 14, "color": MUTED, "space_after": 8}),
    ("· 民间传说：虎皮、兽皮可穿可脱，人兽互变（《集异记·崔韬》等）。",
     {"size": 14, "color": MUTED, "space_after": 8}),
    ("· 蒲松龄的推进：写成「铺皮—彩笔细描—披上」的过程，收束到「妍皮裹物，比比皆是」。",
     {"size": 15, "space_after": 14}),
    ("这堂课重点不在出处，而在：他怎样写，为什么这样写。", {"size": 15, "bold": True, "space_after": 0}),
])

# ========== 6 情节骨架（合并原文长段）==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探前", "先把情节骨架钉住", "五人小组可以对照选段，但汇报时不要复述全文")
add_paras(s, Inches(0.9), Inches(1.8), Inches(11.5), Inches(5), [
    ("遇美藏匿 → 道士示警，王生不信", {"size": 16, "bold": True, "space_after": 6}),
    ("窥见绘皮、披皮化女 → 求道士，悬蝇拂，鬼暂退", {"size": 16, "bold": True, "space_after": 6}),
    ("道士点破「心邪，当复有变」→ 鬼复至，裂腹掬心", {"size": 16, "bold": True, "space_after": 6}),
    ("道士收妖 → 陈氏忍辱求痰唾 → 心归腔中，王生复生", {"size": 16, "bold": True, "space_after": 16}),
    ("划线时优先盯这四处：", {"size": 14, "color": ACCENT, "space_after": 8}),
    ("「执彩笔而绘之」　「以其言妄，拒之」　「裂腹，掬生心」　「明明妖也，而以为美」",
     {"size": 14, "space_after": 0}),
])

# ========== 7 核心象征 画皮 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "最硬的一处：绘皮", "手法：象征＋细节")
add_paras(s, Inches(0.9), Inches(1.75), Inches(11.5), Inches(5.2), [
    ("「见一狞鬼……铺人皮于榻上，执彩笔而绘之。已而掷笔，举皮如振衣状，披于身，遂化为女子。」",
     {"size": 15, "bold": True, "color": QUOTE, "space_after": 14}),
    ("可以怎么读：", {"size": 15, "bold": True, "color": ACCENT, "space_after": 8}),
    ("美不是天生贴在身上的，是画上去、披上去的。越画得细，越说明这层「好看」靠不住。",
     {"size": 15, "space_after": 10}),
    ("和前面「二八姝丽」「心相爱乐」一对照：王生爱上的，其实是那张皮。",
     {"size": 15, "space_after": 10}),
    ("小组追问：如果作者直接写「此乃女鬼」，少了绘皮这一笔，劝诫力量会弱在哪里？",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 8 知而不改 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "第二次打击：不是不知，是不改", "手法：对比、延宕、反讽")
add_paras(s, Inches(0.9), Inches(1.75), Inches(11.5), Inches(5.2), [
    ("道士说「身有邪气，所遇必魅」，王生「以其言妄，拒之」。", {"size": 15, "space_after": 8}),
    ("后来他亲眼看见画皮，仍心存侥幸；得了蝇拂，鬼暂退，道士又说「君心邪，当复有变」。",
     {"size": 15, "space_after": 8}),
    ("夜半鬼复至，骂「道士何能为」，径裂腹掬心。", {"size": 15, "space_after": 14}),
    ("结构上的意思很清楚：", {"size": 15, "bold": True, "color": ACCENT, "space_after": 8}),
    ("故事给了他好几次回头的机会。他不是信息不够，是心里那点贪还在。",
     {"size": 15, "space_after": 10}),
    ("异史氏后来说得更直：「既知之而不改，则愚而不可及矣。」",
     {"size": 15, "space_after": 0}),
])

# ========== 9 手法清单（合并此前提问：艺术手法）==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "手法先起名，再说作用", "五人卡：证据／手法／效果——这一页给书记员对照")
add_paras(s, Inches(0.9), Inches(1.75), Inches(11.5), Inches(5.2), [
    ("象征", {"size": 16, "bold": True, "color": ACCENT, "space_after": 4}),
    ("绘皮、裂腹掬心——「美」和「心」都被写成可拆、可换的物件。", {"size": 14, "space_after": 10}),
    ("对比", {"size": 16, "bold": True, "color": ACCENT, "space_after": 4}),
    ("二八姝丽 ↔ 狞鬼；道士示警 ↔ 王生拒之；陈氏忍辱 ↔ 王生贪色。", {"size": 14, "space_after": 10}),
    ("延宕／反复", {"size": 16, "bold": True, "color": ACCENT, "space_after": 4}),
    ("示警不止一次：拒言 → 见皮 → 得拂 → 心邪复变。机会给足了，才显「不改」。",
     {"size": 14, "space_after": 10}),
    ("反讽与论赞", {"size": 16, "bold": True, "color": ACCENT, "space_after": 4}),
    ("情节已够劝惩，异史氏再点一句「明明妖也，而以为美」，把矛头从鬼推到世人。",
     {"size": 14, "space_after": 0}),
])

# ========== 10 两个女子（合并课件人物，语气改稳）==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 勘探", "两个人物，对照着看", "女鬼与陈氏——先找原文，再谈评价")
add_paras(s, Inches(0.9), Inches(1.7), Inches(5.8), Inches(5), [
    ("画皮女鬼", {"size": 17, "bold": True, "color": ACCENT, "space_after": 10}),
    ("外表：二八姝丽，哀告被鬻、受虐，求庇护。", {"size": 14, "space_after": 8}),
    ("内里：翠面锯齿，绘皮，裂腹取心。", {"size": 14, "space_after": 8}),
    ("无名无姓，来历含糊——更像「皮相」的符号，不只是某个具体女人。",
     {"size": 14, "space_after": 12}),
    ("注意：文本写「惑」，不等于把所有女性写成祸水。争论留到庭辩。",
     {"size": 13, "color": MUTED, "space_after": 0}),
])
add_paras(s, Inches(7.0), Inches(1.7), Inches(5.5), Inches(5), [
    ("陈氏", {"size": 17, "bold": True, "color": ACCENT, "space_after": 10}),
    ("劝遣媵妾，有分寸；夫死骇涕，仍奔告道士。", {"size": 14, "space_after": 8}),
    ("膝行求丐，受杖受辱，强啖痰唾。", {"size": 14, "space_after": 8}),
    ("心归腔中，王生复生——救回来的是她的忍与诚，不是王生自己醒悟。",
     {"size": 14, "space_after": 12}),
    ("可问：复生写得很用力，代价是否过多压在妻子身上？",
     {"size": 13, "color": MUTED, "space_after": 0}),
])

# ========== 11 庭辩 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节三 · 庭辩", "二选一，发言先带原文半句", "正方反方各二人；异议官可加盟或追问；每人不超过四十秒")
add_paras(s, Inches(0.9), Inches(1.9), Inches(11.5), Inches(4.8), [
    ("辩题甲", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("王生的悲剧，主因是「不知」，还是「知之而不改」？", {"size": 18, "bold": True, "space_after": 18}),
    ("辩题乙", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("「画皮」主要在骂鬼，还是在骂人间那些「妍皮裹物」的人？", {"size": 18, "bold": True, "space_after": 18}),
    ("最后六十秒允许改口。改口要说清：是哪一句原文把你说动的。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 12 主题收束（合并寓言；保留争议，去掉过满腔调）==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节四 · 收束", "一起写出一句主题句", "尽量写进：表里、欲望、知行——至少两点")
add_paras(s, Inches(0.9), Inches(1.75), Inches(11.5), Inches(5.2), [
    ("课文自己点得很明：", {"size": 15, "space_after": 10}),
    ("「愚哉世人！明明妖也，而以为美。……既知之而不改……天下妍皮裹物者，固比比皆是也。」",
     {"size": 14, "bold": True, "color": QUOTE, "space_after": 14}),
    ("可落成这样的意思（学生自己改，不要照抄）：", {"size": 15, "space_after": 8}),
    ("《画皮》借绘皮和多次拒警，写出人因贪欲看不清，甚至看清了仍不改，终致丧心；也提醒：披着好看外壳害人的，世间并不少见。",
     {"size": 15, "space_after": 14}),
    ("还有一层可以提出来，不必强行统一：", {"size": 14, "color": ACCENT, "space_after": 8}),
    ("陈氏忍辱救夫写得很用力；作者夸「食人之唾而甘之」，是否也带出那个时代对妻子的要求？骂伪饰是显层，男权痕迹是潜层——可以争议。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 13 全球性议题 / IO ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节四 · 延伸", "若做个人口述，议题怎么挂", "一个议题就够；大半时间仍贴着《画皮》原文")
add_paras(s, Inches(0.9), Inches(1.75), Inches(11.5), Inches(5.2), [
    ("比较好用的说法：", {"size": 15, "bold": True, "color": ACCENT, "space_after": 10}),
    ("人们怎样被精致的外表和欲望牵着走，预警来了也选择自欺？", {"size": 16, "space_after": 14}),
    ("文本支撑可以很具体：", {"size": 15, "space_after": 8}),
    ("绘皮——包装可以人造；拒道士、见皮仍犹豫——不是看不见，是不愿改；陈氏一线——修复往往要别人付代价。",
     {"size": 14, "color": MUTED, "space_after": 14}),
    ("若比《台北人》，可用《金大班的最后一夜》或《永远的尹雪艳》：同写「表层」，一个是妖伪，一个是舞台硬壳或魅惑；识破之后，判断并不一样。",
     {"size": 14, "space_after": 0}),
])

# ========== 14 出门条 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节五 · 出门", "下课前完成", "公开课要让人看见过程，不是背标准答案")
add_paras(s, Inches(0.9), Inches(1.9), Inches(11.5), Inches(4.8), [
    ("每人十五秒：今天我改口或坚持的一点是……", {"size": 16, "space_after": 14}),
    ("出门条（写下来交）：", {"size": 15, "bold": True, "color": ACCENT, "space_after": 10}),
    ("一处证据　＋　一个手法　＋　一句效果", {"size": 18, "bold": True, "space_after": 18}),
    ("例：证据「执彩笔而绘之」；手法：象征；效果：美被写成画上去的假面，读者开始怀疑「好看」。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 15 尾页 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(s)
add_textbox(s, Inches(0.9), Inches(2.8), Inches(11.5), Inches(0.6),
            "识破的不是鬼，是那层「妍皮」。", size=24, bold=True, color=INK, align=PP_ALIGN.CENTER)
thin_line(s, Inches(5.2), Inches(3.6), Inches(3))
add_textbox(s, Inches(0.9), Inches(3.9), Inches(11.5), Inches(0.5),
            "《画皮》· 高二文学公开课", size=14, color=MUTED, align=PP_ALIGN.CENTER)

out1 = "/workspace/画皮_公开课课件.pptx"
out2 = "/workspace/HuaPi_OpenClass_PPT.pptx"
prs.save(out1)
shutil.copy(out1, out2)
shutil.copy(out1, "/opt/cursor/artifacts/HuaPi_OpenClass_PPT.pptx")
shutil.copy(out1, "/opt/cursor/artifacts/画皮_公开课课件.pptx")
print("OK", len(prs.slides), out1)
