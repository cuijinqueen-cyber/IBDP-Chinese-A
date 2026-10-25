#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""《画皮》人物形象分析公开课 · 手法立人 · 纸感墨色"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
from lxml import etree
import shutil

BG = RGBColor(0xF1, 0xF0, 0xEC)
PANEL = RGBColor(0xE8, 0xE6, 0xE0)
INK = RGBColor(0x22, 0x22, 0x20)
MUTED = RGBColor(0x6E, 0x6C, 0x66)
ACCENT = RGBColor(0x5C, 0x4A, 0x3E)
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


def add_rect(slide, left, top, width, height, color):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def thin_rule(slide, left, top, width, color=LINE, thick=1):
    add_rect(slide, left, top, width, Pt(thick), color)


def left_spine(slide, color=RULE):
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


def quote_band(slide, top, quote, height=Inches(1.2)):
    add_rect(slide, Inches(0.55), top, Inches(12.2), height, QUOTE_BG)
    add_rect(slide, Inches(0.55), top, Inches(0.08), height, ACCENT)
    add_textbox(slide, Inches(0.85), top + Inches(0.25), Inches(11.6),
                height - Inches(0.35), quote, size=15, bold=True, color=INK)


# ========== 1 封面 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(s)
left_spine(s, ACCENT)
add_rect(s, Inches(0.55), Inches(1.9), Inches(1.1), Pt(2), ACCENT)
add_textbox(s, Inches(0.55), Inches(2.15), Inches(12), Inches(0.35),
            "高二文学 · 公开课 · 人物形象精读", size=14, color=ACCENT_SOFT)
add_textbox(s, Inches(0.55), Inches(2.6), Inches(12), Inches(0.8),
            "三人立像", size=42, bold=True, color=INK)
add_textbox(s, Inches(0.55), Inches(3.45), Inches(12), Inches(0.45),
            "《聊斋志异·画皮》· 王生 · 女鬼 · 陈氏", size=20, color=MUTED)
thin_rule(s, Inches(0.55), Inches(4.15), Inches(3.2), ACCENT, 2)
add_textbox(s, Inches(0.55), Inches(4.45), Inches(11), Inches(0.9),
            "不贴标签，用手法把人写立体：对比、象征、侧面、延宕、论赞",
            size=15, color=MUTED)

# ========== 2 本课目标 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "课前", "这节课怎么读人", "形象不是形容词堆砌，是作者怎么写出来的")
add_textbox(s, Inches(0.55), Inches(1.7), Inches(12), Inches(0.4),
            "核心问题", size=13, color=ACCENT_SOFT)
add_textbox(s, Inches(0.55), Inches(2.1), Inches(12), Inches(0.55),
            "蒲松龄用哪些文学手法，把三个人物写得立得住、对得起？",
            size=22, bold=True, color=INK)
goals = [
    ("王生", "写「知而不改」：欲望如何压过理性"),
    ("女鬼", "写「皮相」：美如何被制作、被识破"),
    ("陈氏", "写「至诚代价」：复生靠谁、代价落谁"),
]
for i, (name, desc) in enumerate(goals):
    x = Inches(0.55) + Inches(i * 4.15)
    add_rect(s, x, Inches(3.1), Inches(3.95), Inches(2.8), PANEL)
    add_rect(s, x, Inches(3.1), Inches(3.95), Pt(3), ACCENT)
    add_textbox(s, x + Inches(0.25), Inches(3.4), Inches(3.4), Inches(0.45),
                name, size=20, bold=True, color=ACCENT)
    add_textbox(s, x + Inches(0.25), Inches(4.1), Inches(3.4), Inches(1.4),
                desc, size=15, color=INK)

# ========== 3 流程 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "流程", "四十分钟怎么走", "三人各一组证据；汇报必须：原文半句＋手法名＋人物效果")
steps = [
    ("01", "总览", "5′", "三人关系图：谁诱惑、谁迷、谁救"),
    ("02", "立王生", "8′", "拒警—见皮—丧心：延宕如何塑人"),
    ("03", "立女鬼", "8′", "姝丽／绘皮／裂腹：象征与对比"),
    ("04", "立陈氏", "8′", "劝遣／忍辱／还心：侧面与对照"),
    ("05", "对照收束", "11′", "三角关系＋一句人物主题句"),
]
for i, (num, name, mins, desc) in enumerate(steps):
    y = Inches(1.7) + Inches(i * 1.0)
    add_rect(s, Inches(0.55), y, Inches(12.2), Inches(0.88), PANEL)
    add_rect(s, Inches(0.55), y, Inches(0.08), Inches(0.88), ACCENT)
    add_textbox(s, Inches(0.85), y + Inches(0.18), Inches(0.7), Inches(0.5),
                num, size=18, bold=True, color=ACCENT)
    add_textbox(s, Inches(1.7), y + Inches(0.15), Inches(2.0), Inches(0.35),
                name, size=17, bold=True, color=INK)
    add_textbox(s, Inches(3.7), y + Inches(0.18), Inches(1.0), Inches(0.35),
                mins, size=14, color=ACCENT_SOFT)
    add_textbox(s, Inches(4.9), y + Inches(0.2), Inches(7.5), Inches(0.5),
                desc, size=14, color=MUTED)

# ========== 4 三人关系总览 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节一 · 总览", "先看三人怎么缠在一起", "关系清楚了，再谈各人怎么被写成")
tri = [
    ("女鬼", "造皮 · 惑 · 取心", "象征：皮相可披可卸"),
    ("王生", "匿 · 拒 · 丧心", "延宕：机会给足仍不改"),
    ("陈氏", "劝 · 忍 · 还心", "对照：至诚托起复生"),
]
for i, (name, arc, tech) in enumerate(tri):
    x = Inches(0.55) + Inches(i * 4.15)
    add_rect(s, x, Inches(1.8), Inches(3.95), Inches(3.6), PANEL)
    add_textbox(s, x + Inches(0.25), Inches(2.1), Inches(3.4), Inches(0.45),
                name, size=22, bold=True, color=INK)
    add_textbox(s, x + Inches(0.25), Inches(2.75), Inches(3.4), Inches(0.8),
                arc, size=16, color=ACCENT)
    add_textbox(s, x + Inches(0.25), Inches(3.7), Inches(3.4), Inches(1.2),
                tech, size=14, color=MUTED)
add_textbox(s, Inches(0.55), Inches(5.7), Inches(12.2), Inches(0.9),
            "读法提示：女鬼不只是「坏人」，王生不只是「傻瓜」，陈氏不只是「贤妻」——每人至少找两处能互相打架的证据。",
            size=14, color=MUTED)

# ========== 5 王生：弧线 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 王生", "从「心相爱乐」到「裂腹掬心」", "手法：延宕、对比、侧面烘托")
beats = [
    ("遇美", "急走趁之，乃二八姝丽。心相爱乐。", "欲望起笔，几乎无心理挣扎"),
    ("拒警", "道士曰「所遇必魅」。生以其言妄，拒之。", "把真话判成妄——执迷成形"),
    ("见皮", "窥之：狞鬼……执彩笔而绘之……", "看见了，恐惧有，醒悟不够"),
    ("丧心", "夜半女复至……裂腹，掬心而去。", "「心邪」落到身体：丧心具象"),
]
for i, (t, q, e) in enumerate(beats):
    y = Inches(1.65) + Inches(i * 1.25)
    add_rect(s, Inches(0.55), y, Inches(1.3), Inches(1.05), PANEL)
    add_textbox(s, Inches(0.7), y + Inches(0.3), Inches(1.05), Inches(0.45),
                t, size=16, bold=True, color=ACCENT, align=PP_ALIGN.CENTER)
    add_textbox(s, Inches(2.05), y + Inches(0.12), Inches(10.5), Inches(0.4),
                q, size=14, bold=True, color=INK)
    add_textbox(s, Inches(2.05), y + Inches(0.55), Inches(10.5), Inches(0.4),
                e, size=13, color=MUTED)

# ========== 6 王生：手法如何立人 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节二 · 王生", "他不是「蠢」，是「不改」", "把形象从标签拉回原文")
add_paras(s, Inches(0.55), Inches(1.7), Inches(6.0), Inches(5.2), [
    ("延宕／反复", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("示警不止一次：拒言 → 见皮 → 得拂 →「心邪，当复有变」。机会给足，才显贪欲压过理性。",
     {"size": 14, "space_after": 14}),
    ("侧面描写", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("道士「惑哉」、陈氏劝遣不听——别人越清醒，越衬出他迷。",
     {"size": 14, "space_after": 14}),
    ("反讽", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("早会藏匿、会求道士，不是无能；偏偏在「改」上停住。",
     {"size": 14, "space_after": 0}),
])
add_rect(s, Inches(6.9), Inches(1.7), Inches(5.85), Inches(5.0), PANEL)
add_paras(s, Inches(7.2), Inches(2.0), Inches(5.3), Inches(4.5), [
    ("人物一句（可改）", {"size": 14, "bold": True, "color": ACCENT_SOFT, "space_after": 10}),
    ("王生的形象，立在「看得见真相仍选择自欺」上：欲望让他拒听、侥幸、终致丧心。",
     {"size": 15, "space_after": 16}),
    ("追问", {"size": 14, "bold": True, "color": ACCENT, "space_after": 8}),
    ("若删掉「君心邪，当复有变」这一笔，他的性格会扁平在哪里？",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 7 女鬼：表里 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节三 · 女鬼", "一张皮，两副面目", "手法：对比、象征、细节")
add_rect(s, Inches(0.55), Inches(1.7), Inches(5.95), Inches(4.9), PANEL)
add_rect(s, Inches(0.55), Inches(1.7), Inches(5.95), Pt(3), ACCENT)
add_paras(s, Inches(0.85), Inches(2.0), Inches(5.4), Inches(4.4), [
    ("外 · 姝丽声口", {"size": 17, "bold": True, "color": ACCENT, "space_after": 10}),
    ("二八姝丽；父母贪贿、嫡妒楚辱——哀告求庇护。", {"size": 14, "space_after": 8}),
    ("声口柔软，善用「弱」来换「藏」。", {"size": 14, "space_after": 12}),
    ("作用", {"size": 13, "bold": True, "color": ACCENT_SOFT, "space_after": 6}),
    ("先让读者与王生一同被说服，后文揭皮才更痛。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])
add_rect(s, Inches(6.8), Inches(1.7), Inches(5.95), Inches(4.9), PANEL)
add_rect(s, Inches(6.8), Inches(1.7), Inches(5.95), Pt(3), ACCENT)
add_paras(s, Inches(7.1), Inches(2.0), Inches(5.4), Inches(4.4), [
    ("内 · 绘皮取心", {"size": 17, "bold": True, "color": ACCENT, "space_after": 10}),
    ("面翠色，齿如锯；铺皮、彩笔细描、振衣披上。", {"size": 14, "space_after": 8}),
    ("裂腹掬心——美与害都落到「可操作」的物件上。", {"size": 14, "space_after": 12}),
    ("作用", {"size": 13, "bold": True, "color": ACCENT_SOFT, "space_after": 6}),
    ("她更像「皮相」的符号：无名无姓，来历含糊。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 8 女鬼：艺术特色 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节三 · 女鬼", "「画皮」这一笔，把人写成符号，也写成过程", "艺术特色：过程化、物化、寓言化")
quote_band(s, Inches(1.65),
           "「铺人皮于榻上，执彩笔而绘之。……举皮如振衣状，披于身，遂化为女子。」")
add_paras(s, Inches(0.55), Inches(3.15), Inches(12.2), Inches(3.8), [
    ("过程化", {"size": 16, "bold": True, "color": ACCENT, "space_after": 6}),
    ("不是一句「变身」，而是铺、绘、掷、披——美被写成工序，假面才可怕。",
     {"size": 15, "space_after": 12}),
    ("物化与象征", {"size": 16, "bold": True, "color": ACCENT, "space_after": 6}),
    ("皮可卷如画轴；心可掬可还。「人」的关键件成了物件，主题才落到「妍皮裹物」。",
     {"size": 15, "space_after": 12}),
    ("读时留心", {"size": 16, "bold": True, "color": ACCENT, "space_after": 6}),
    ("文本写「惑」，不等于把所有女性写成祸水。女鬼是欲望的镜子，也是人间伪饰的寓言。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 9 陈氏 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节四 · 陈氏", "救回来的，不是王生自己醒悟", "手法：对照、细节、伦理张力")
cols = [
    ("知礼", "疑为大家媵妾，劝遣之。", "有分寸：不是无知附和"),
    ("镇定", "生已死……陈骇涕不敢声。使弟奔告道士。", "惊而不乱，能行动"),
    ("忍辱", "膝行求丐；杖击；强啖痰唾。", "细节写透「至诚」的脏与难"),
    ("还心", "心落腔中……生复生。", "结构回环：失心／还心"),
]
for i, (t, q, e) in enumerate(cols):
    x = Inches(0.55) + Inches((i % 2) * 6.35)
    y = Inches(1.7) + Inches((i // 2) * 2.5)
    add_rect(s, x, y, Inches(6.15), Inches(2.25), PANEL)
    add_rect(s, x, y, Inches(0.08), Inches(2.25), ACCENT)
    add_textbox(s, x + Inches(0.3), y + Inches(0.25), Inches(5.6), Inches(0.35),
                t, size=17, bold=True, color=ACCENT)
    add_textbox(s, x + Inches(0.3), y + Inches(0.75), Inches(5.6), Inches(0.55),
                q, size=13, bold=True, color=INK)
    add_textbox(s, x + Inches(0.3), y + Inches(1.4), Inches(5.6), Inches(0.55),
                e, size=13, color=MUTED)

# ========== 10 陈氏：立体处 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节四 · 陈氏", "贤德之外，还有一层可争议的", "形象丰满＝留出讨论空间，不封成「完美妻子」")
add_paras(s, Inches(0.55), Inches(1.75), Inches(12.2), Inches(5.2), [
    ("对照立人", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("王生迷「美」，陈氏咽「秽」。一边是贪色藏匿，一边是忍辱求生——对照越狠，两人形象越清楚。",
     {"size": 15, "space_after": 14}),
    ("结构功能", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("复生不靠王生顿悟，靠陈氏行动。主题更冷：迷者丧心，醒者付代价。",
     {"size": 15, "space_after": 14}),
    ("可争议的一层", {"size": 16, "bold": True, "color": ACCENT, "space_after": 8}),
    ("异史氏夸「食人之唾而甘之」。显层是至诚感人；潜层是否也写出那个时代对妻子的要求？课堂上可以争，不必统一。",
     {"size": 15, "color": MUTED, "space_after": 0}),
])

# ========== 11 三角对照 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "环节五 · 对照", "三人并置，看艺术特色如何成网", "对比是主轴；象征与延宕把人织进主题")
rows = [
    ("欲望", "贪色、藏匿、拒改", "以美为饵、取心", "劝遣、忍辱、还心"),
    ("认知", "见皮仍侥幸", "会绘、会变、会骂", "知礼、能决断"),
    ("结局", "丧心→复生（被动）", "被收、皮卷如轴", "付代价成就回环"),
    ("手法", "延宕＋反讽", "象征＋过程细节", "对照＋身体细节"),
]
# header
headers = ["", "王生", "女鬼", "陈氏"]
xs = [0.55, 2.4, 5.7, 9.0]
add_rect(s, Inches(0.55), Inches(1.65), Inches(12.2), Inches(0.55), PANEL)
for j, h in enumerate(headers):
    add_textbox(s, Inches(xs[j]), Inches(1.75), Inches(3.0), Inches(0.4),
                h, size=14, bold=True, color=ACCENT)
for i, row in enumerate(rows):
    y = Inches(2.35) + Inches(i * 1.05)
    if i % 2 == 0:
        add_rect(s, Inches(0.55), y, Inches(12.2), Inches(0.95), QUOTE_BG)
    for j, cell in enumerate(row):
        add_textbox(s, Inches(xs[j]), y + Inches(0.25), Inches(3.1 if j else 1.7),
                    Inches(0.55), cell, size=13 if j else 14,
                    bold=(j == 0), color=INK if j else ACCENT)

# ========== 12 手法总表 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "收束 · 手法", "文学手法如何让形象「立体」", "汇报模板：证据 → 手法 → 人物效果")
techs = [
    ("对比", "姝丽↔狞鬼；拒警↔忍辱；取心↔还心", "性格边界一下子清楚"),
    ("象征", "绘皮、裂腹掬心、卷皮如轴", "人变成可拆的「皮／心」"),
    ("延宕", "多次示警仍不改", "王生从偶发错误变成性格"),
    ("侧面", "道士断语、陈氏劝遣", "用清醒者托出执迷者"),
    ("细节", "彩笔、痰唾、破席呻吟", "抽象道德落到可感场面"),
    ("论赞", "「明明妖也，而以为美」", "把人物个案推到世人"),
]
for i, (name, how, effect) in enumerate(techs):
    col = i % 3
    row = i // 3
    x = Inches(0.55) + Inches(col * 4.15)
    y = Inches(1.7) + Inches(row * 2.55)
    add_rect(s, x, y, Inches(3.95), Inches(2.35), PANEL)
    add_textbox(s, x + Inches(0.2), y + Inches(0.25), Inches(3.5), Inches(0.4),
                name, size=17, bold=True, color=ACCENT)
    add_textbox(s, x + Inches(0.2), y + Inches(0.8), Inches(3.5), Inches(0.7),
                how, size=13, color=INK)
    add_textbox(s, x + Inches(0.2), y + Inches(1.55), Inches(3.5), Inches(0.55),
                effect, size=13, color=MUTED)

# ========== 13 活动／主题句 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "收束 · 活动", "三人各写一句「立得住」的人物句", "句中须出现：一个手法名＋一句原文痕迹")
add_paras(s, Inches(0.55), Inches(1.75), Inches(12.2), Inches(2.2), [
    ("示例（请学生改，勿照抄）", {"size": 13, "bold": True, "color": ACCENT_SOFT, "space_after": 10}),
    ("王生：借多次拒警的延宕，写成「知之而不改」的自欺者——「以其言妄，拒之」是性格的钥匙。",
     {"size": 15, "space_after": 10}),
    ("女鬼：借绘皮的过程细节，把美写成可披卸的假面，形象落在「皮相」而非某个具体女人。",
     {"size": 15, "space_after": 10}),
    ("陈氏：借忍辱细节与王生对照，写成付代价的至诚者；复生回环显出救助伦理的冷。",
     {"size": 15, "space_after": 0}),
])
add_rect(s, Inches(0.55), Inches(5.0), Inches(12.2), Inches(1.7), PANEL)
add_textbox(s, Inches(0.85), Inches(5.25), Inches(11.6), Inches(0.35),
            "可选辩题（40秒／人，先带原文）", size=13, color=ACCENT_SOFT)
add_textbox(s, Inches(0.85), Inches(5.7), Inches(11.6), Inches(0.7),
            "三人之中，谁最「立体」？你的标准是性格复杂，还是主题功能完整？",
            size=16, bold=True, color=INK)

# ========== 14 出门条 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
page_head(s, "出门", "下课前交", "公开课要看见读法，不是背「某某是怎样的人」")
add_rect(s, Inches(0.55), Inches(1.9), Inches(12.2), Inches(4.4), PANEL)
add_rect(s, Inches(0.55), Inches(1.9), Inches(0.1), Inches(4.4), ACCENT)
add_paras(s, Inches(0.95), Inches(2.25), Inches(11.4), Inches(3.8), [
    ("出门条", {"size": 14, "bold": True, "color": ACCENT_SOFT, "space_after": 12}),
    ("选一个人物　＋　一处证据　＋　一个手法　＋　一句形象效果",
     {"size": 20, "bold": True, "space_after": 18}),
    ("例：人物陈氏；证据「强啖痰唾」；手法：对照；效果：用极难堪的细节写出至诚，并反衬王生丧心后的被动复生。",
     {"size": 14, "color": MUTED, "space_after": 0}),
])

# ========== 15 尾页 ==========
s = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(s)
left_spine(s, ACCENT)
add_textbox(s, Inches(0.55), Inches(2.5), Inches(12.2), Inches(0.7),
            "人立住了，皮相才站不住。", size=28, bold=True, color=INK,
            align=PP_ALIGN.CENTER)
thin_rule(s, Inches(5.4), Inches(3.4), Inches(2.5), ACCENT, 2)
add_textbox(s, Inches(0.55), Inches(3.7), Inches(12.2), Inches(0.45),
            "《画皮》人物形象分析 · 公开课", size=14, color=MUTED,
            align=PP_ALIGN.CENTER)

# —— 输出 ——
outs = [
    "/workspace/画皮_人物形象公开课.pptx",
    "/workspace/HuaPi_Characters_PPT.pptx",
    "/opt/cursor/artifacts/画皮_人物形象公开课.pptx",
    "/opt/cursor/artifacts/HuaPi_Characters_PPT.pptx",
]
prs.save(outs[0])
for p in outs[1:]:
    shutil.copy(outs[0], p)
print("OK", len(prs.slides), outs[0])
