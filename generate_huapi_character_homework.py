#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""《画皮》三人形象作业单：引原文描述 + 自画像空白框"""

from fpdf import FPDF
import shutil
import os

FONT = "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc"
OUT_PDF = "/workspace/画皮_三人形象作业.pdf"
OUT_ASCII = "/workspace/HuaPi_Character_Portrait_Homework.pdf"
ART_DIR = "/opt/cursor/artifacts"


class HomeworkPDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("CJK", "", 9)
        self.set_text_color(110, 108, 102)
        self.cell(0, 6, "《聊斋志异·画皮》三人形象作业", align="L")
        self.ln(8)

    def footer(self):
        self.set_y(-12)
        self.set_font("CJK", "", 8)
        self.set_text_color(140, 138, 132)
        self.cell(0, 8, f"— {self.page_no()} —", align="C")


def hline(pdf):
    x1 = pdf.l_margin
    x2 = pdf.w - pdf.r_margin
    y = pdf.get_y()
    pdf.set_draw_color(180, 176, 168)
    pdf.set_line_width(0.2)
    pdf.line(x1, y, x2, y)
    pdf.ln(3)


def section_title(pdf, text):
    pdf.set_font("CJK", "", 14)
    pdf.set_text_color(92, 74, 62)
    pdf.cell(0, 9, text)
    pdf.ln(8)


def body(pdf, text, size=10.5, color=(34, 34, 32), after=2):
    pdf.set_font("CJK", "", size)
    pdf.set_text_color(*color)
    pdf.multi_cell(0, 5.5, text)
    pdf.ln(after)


def quote_box(pdf, lines):
    pdf.set_fill_color(234, 231, 225)
    x, y = pdf.l_margin, pdf.get_y()
    w = pdf.w - pdf.l_margin - pdf.r_margin
    h = 5 + len(lines) * 6.2
    pdf.rect(x, y, w, h, style="F")
    pdf.set_fill_color(92, 74, 62)
    pdf.rect(x, y, 1.2, h, style="F")
    pdf.set_font("CJK", "", 9.5)
    pdf.set_text_color(34, 34, 32)
    pdf.set_xy(x + 4, y + 2.5)
    for line in lines:
        pdf.set_x(x + 4)
        pdf.multi_cell(w - 6, 5.8, line)
    pdf.set_y(y + h + 3)


def write_lines(pdf, n=4, gap=8):
    pdf.set_draw_color(190, 186, 178)
    pdf.set_line_width(0.25)
    x1 = pdf.l_margin
    x2 = pdf.w - pdf.r_margin
    for _ in range(n):
        y = pdf.get_y() + gap - 1
        pdf.line(x1, y, x2, y)
        pdf.ln(gap)


def portrait_frame(pdf, size=78):
    need = size + 18
    if pdf.get_y() + need > pdf.h - pdf.b_margin:
        pdf.add_page()
    pdf.set_font("CJK", "", 10)
    pdf.set_text_color(92, 74, 62)
    pdf.cell(0, 7, "【自画像框】")
    pdf.ln(2)
    x = pdf.l_margin
    y = pdf.get_y()
    w = pdf.w - pdf.l_margin - pdf.r_margin
    side = min(size, w * 0.58)
    fx = x + (w - side) / 2
    pdf.set_draw_color(92, 74, 62)
    pdf.set_line_width(0.6)
    pdf.rect(fx, y, side, side)
    pdf.set_draw_color(205, 201, 193)
    pdf.set_line_width(0.2)
    pdf.rect(fx + 4, y + 4, side - 8, side - 8)
    pdf.set_xy(fx, y + side / 2 - 3)
    pdf.set_font("CJK", "", 9)
    pdf.set_text_color(175, 171, 163)
    pdf.cell(side, 6, "根据原文在此画自画像", align="C")
    pdf.set_y(y + side + 3)
    pdf.set_font("CJK", "", 8.5)
    pdf.set_text_color(110, 108, 102)
    pdf.cell(0, 5, "可标注：服饰／神态／物件（皮、心、席、唾……）出自哪句原文", align="C")
    pdf.ln(8)


def character_page(pdf, name, role, quotes, prompts):
    pdf.add_page()
    section_title(pdf, f"「{name}」自画像作业")
    body(pdf, role, size=10, color=(110, 108, 102), after=4)

    body(pdf, "一、阅读下列原文，圈出与外貌、言行、心理相关的词语。", size=10.5, after=3)
    quote_box(pdf, quotes)

    body(
        pdf,
        "二、引用原文，用自己的话完成形象描述（至少两处引用，用「」标出）。",
        size=10.5,
        after=2,
    )
    for p in prompts:
        pdf.set_font("CJK", "", 10)
        pdf.set_text_color(34, 34, 32)
        pdf.multi_cell(0, 5.5, p)
        pdf.ln(1)
        write_lines(pdf, n=2, gap=7)
        pdf.ln(1)

    body(
        pdf,
        f"三、根据你引用的原文，为「{name}」画一幅自画像"
        f"（不是现代空泛人像，要能看出文本信息）。",
        size=10.5,
        after=2,
    )
    portrait_frame(pdf, size=78)

    body(
        pdf,
        "四、一句话说明：画里最关键的一笔，对应哪句原文？为什么这样画？",
        size=10.5,
        after=2,
    )
    write_lines(pdf, n=3, gap=7)


def main():
    pdf = HomeworkPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=14)
    pdf.add_font("CJK", "", FONT)
    pdf.set_margins(16, 14, 16)

    # 封面
    pdf.add_page()
    pdf.set_font("CJK", "", 11)
    pdf.set_text_color(138, 122, 108)
    pdf.cell(0, 8, "高二文学 · 《聊斋志异·画皮》")
    pdf.ln(10)
    pdf.set_font("CJK", "", 22)
    pdf.set_text_color(34, 34, 32)
    pdf.cell(0, 12, "三人形象作业")
    pdf.ln(8)
    pdf.set_font("CJK", "", 12)
    pdf.set_text_color(110, 108, 102)
    pdf.cell(0, 8, "王生 · 女鬼 · 陈氏｜引用原文描述＋自画像")
    pdf.ln(10)
    hline(pdf)

    body(pdf, "作业说明", size=12, color=(92, 74, 62), after=3)
    body(
        pdf,
        "1. 完成三张人物页：先读原文 → 引用原文写描述 → 在空白框画「自画像」。\n"
        "2. 「自画像」：依据文本想象该人物会如何画自己（神态、服饰、手上物件、背景均可），"
        "禁止只画一张无文本依据的空泛脸。\n"
        "3. 描述至少两处原文引用，用「」标出；画下须注明对应句子。\n"
        "4. 建议用时 40–50 分钟。独立完成。",
        size=10.5,
        after=4,
    )

    body(pdf, "评分关注", size=12, color=(92, 74, 62), after=3)
    body(
        pdf,
        "· 引用是否准确、是否服务形象判断\n"
        "· 描述是否避免空洞标签（只写「善良／邪恶」）\n"
        "· 自画像是否能看出原文痕迹（皮、心、席、痰唾等）\n"
        "· 图文是否对得上：关键一笔能否指回句子",
        size=10.5,
        after=6,
    )

    y = pdf.get_y()
    pdf.set_fill_color(232, 230, 224)
    pdf.rect(pdf.l_margin, y, pdf.w - 32, 32, style="F")
    pdf.set_xy(pdf.l_margin + 3, y + 5)
    body(
        pdf,
        "姓名：____________    班级：____________    日期：____________\n\n"
        "我最想画的人物是：□王生  □女鬼  □陈氏\n"
        "理由（一句）：______________________________________________",
        size=10,
        after=0,
    )

    character_page(
        pdf,
        "王生",
        "书生；欲望主体。重点：遇美、拒警、见皮、丧心。",
        [
            "「急走趁之，乃二八姝丽。心相爱乐。」",
            "「道士曰：『君身邪气萦绕，所遇必魅。』生以其言妄，拒之。」",
            "「蹑足近窗，窥之：一狞鬼……执彩笔而绘之……披于身，遂化为女子。」",
            "「道士曰：『……君心邪，当复有变。』……女复至……裂腹，掬心而去。」",
        ],
        [
            "1. 外貌／举止（第一印象？引原文）：",
            "2. 性格关键（为何丧心？引「拒之」「心邪」等）：",
            "3. 若王生画自画像，他想画成什么样？你要画出哪一点「自欺」？",
        ],
    )

    character_page(
        pdf,
        "女鬼",
        "无名无姓；表里分裂的「皮相」。重点：姝丽声口与绘皮、取心。",
        [
            "「乃二八姝丽。……女曰：『父母贪贿，鬻妾朱门。嫡妒甚……将远遁耳。』」",
            "「见一狞鬼，面翠色，齿巉巉如锯；铺人皮于榻上，执彩笔而绘之。」",
            "「已而掷笔，举皮如振衣状，披于身，遂化为女子。」",
            "「骂曰：『道士何能为！』……裂腹，掬生心而去。」",
        ],
        [
            "1. 「外」（如何让人相信？引哀告／姝丽）：",
            "2. 「内」（绘皮细节如何写出「美是做成的」）：",
            "3. 自画像画「披皮前」还是「披皮后」？对应哪句原文？",
        ],
    )

    character_page(
        pdf,
        "陈氏",
        "王生之妻；复生的行动者。重点：劝遣、奔告、忍辱、还心。",
        [
            "「生微告妻。妻陈，疑为大家媵妾，劝遣之，生不听。」",
            "「妻闻声奔视，生已气绝。……陈骇涕不敢声。」",
            "「陈膝行而前。……杖击陈，陈忍痛受之。……『食之！』……遂强啖焉。」",
            "「觉鬲中结物，突奔而出……已落腔中。……天明竟活。」",
        ],
        [
            "1. 与王生最鲜明的对照？（引「劝遣」或「强啖」）",
            "2. 哪些细节让「至诚」具体、甚至难堪？",
            "3. 自画像中画她手上／眼前什么物件？对应哪句原文？",
        ],
    )

    # 综合
    pdf.add_page()
    section_title(pdf, "综合（选做）")
    body(
        pdf,
        "把三人自画像并排放在一起看：你画的「对照」落在哪里？"
        "用 80–120 字写总评，须再引一处原文。",
        size=10.5,
        after=3,
    )
    write_lines(pdf, n=6, gap=8)
    pdf.ln(4)
    body(pdf, "三幅画并置示意区（可贴缩略或简笔）：", size=10, color=(92, 74, 62), after=2)
    y = pdf.get_y()
    box_w = (pdf.w - pdf.l_margin - pdf.r_margin - 8) / 3
    box_h = 44
    labels = ["王生", "女鬼", "陈氏"]
    pdf.set_draw_color(92, 74, 62)
    pdf.set_line_width(0.5)
    for i, lab in enumerate(labels):
        x = pdf.l_margin + i * (box_w + 4)
        pdf.rect(x, y, box_w, box_h)
        pdf.set_xy(x, y + box_h + 1)
        pdf.set_font("CJK", "", 9)
        pdf.set_text_color(110, 108, 102)
        pdf.cell(box_w, 5, lab, align="C")
    pdf.set_y(y + box_h + 14)
    body(
        pdf,
        "教师回收关注：图文是否互证；是否出现「皮／心／唾／席」等文本物件；"
        "有无把女鬼只画成现代美女、把陈氏只画成符号化贤妻（若无原文支撑则弱）。",
        size=9,
        color=(140, 138, 132),
        after=0,
    )

    pdf.output(OUT_PDF)
    shutil.copy(OUT_PDF, OUT_ASCII)
    os.makedirs(ART_DIR, exist_ok=True)
    shutil.copy(OUT_PDF, f"{ART_DIR}/画皮_三人形象作业.pdf")
    shutil.copy(OUT_PDF, f"{ART_DIR}/HuaPi_Character_Portrait_Homework.pdf")
    print("OK", OUT_PDF, "pages", pdf.page_no(), "bytes", os.path.getsize(OUT_PDF))


if __name__ == "__main__":
    main()
