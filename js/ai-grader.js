/* 基于 IB Paper 1 量规的本地 AI 初评引擎（规则+启发，非云端大模型） */
window.AIGrader = {
  grade: function (essay, promptQuestion) {
    const text = (essay || "").trim();
    const rub = window.AI_RUBRIC;
    const chars = text.length;
    const feedback = [];
    const scores = {};

    // A 理解与阐释
    let a = 2;
    const quoteHits = rub.quoteSnippets.filter(function (q) {
      return text.indexOf(q) !== -1;
    });
    const themeHits = rub.themeTerms.filter(function (t) {
      return text.indexOf(t) !== -1;
    });
    if (quoteHits.length >= 1) a += 2;
    if (quoteHits.length >= 3) a += 2;
    if (themeHits.length >= 2) a += 2;
    if (themeHits.length >= 4) a += 1;
    if (promptQuestion && this._touchesPrompt(text, promptQuestion)) a += 1;
    a = Math.min(10, a);
    scores.A = a;
    if (quoteHits.length < 2) {
      feedback.push("标准 A：请嵌入更多直接引文或关键词句，避免只概括情节。");
    } else {
      feedback.push("标准 A：已见到文本证据（命中 " + quoteHits.length + " 处关键片段），阐释方向正确。");
    }

    // B 分析与评价
    let b = 2;
    const techHits = rub.techTerms.filter(function (t) {
      return text.indexOf(t) !== -1;
    });
    const effectWords = ["效果", "作用", "突出", "强化", "暗示", "映衬", "呼应", "制造", "呈现", "引发"];
    const effectHits = effectWords.filter(function (w) {
      return text.indexOf(w) !== -1;
    });
    if (techHits.length >= 1) b += 2;
    if (techHits.length >= 3) b += 2;
    if (effectHits.length >= 1) b += 2;
    if (effectHits.length >= 3) b += 1;
    if (/通过.{0,12}(比喻|拟人|对比|细节|心理|象征|插叙)/.test(text)) b += 1;
    b = Math.min(10, b);
    scores.B = b;
    if (techHits.length < 2) {
      feedback.push("标准 B：请明确点出文学手法名称，并说明其如何作用于读者/主题。");
    } else if (effectHits.length < 1) {
      feedback.push("标准 B：已点名手法，请补上“效果/作用”分析，完成手法→意义链条。");
    } else {
      feedback.push("标准 B：手法识别与效果分析有结合（手法词 " + techHits.length + "，效果词 " + effectHits.length + "）。");
    }

    // C 连贯与组织
    let c = 3;
    const hasIntro = rub.structureSignals.intro.some(function (s) {
      return text.slice(0, Math.min(120, text.length)).indexOf(s) !== -1;
    });
    const hasBody = rub.structureSignals.body.some(function (s) {
      return text.indexOf(s) !== -1;
    });
    const tail = text.slice(Math.max(0, text.length - 120));
    const hasConc = rub.structureSignals.conclusion.some(function (s) {
      return tail.indexOf(s) !== -1 || text.indexOf(s) !== -1;
    });
    const paras = text.split(/\n+/).filter(function (p) {
      return p.trim().length > 20;
    });
    if (hasIntro) c += 2;
    if (hasBody) c += 2;
    if (hasConc) c += 2;
    if (paras.length >= 3) c += 1;
    c = Math.min(10, c);
    scores.C = c;
    if (paras.length < 3 || !hasConc) {
      feedback.push("标准 C：建议形成清晰段落推进（开篇论点—主体分析—结尾回扣）。");
    } else {
      feedback.push("标准 C：结构信号较完整，段落层次可读。");
    }

    // D 语言
    let d = 4;
    if (chars >= rub.minChars) d += 2;
    if (chars >= rub.targetChars) d += 2;
    if (techHits.length >= 2) d += 1;
    if (/[。！？]/.test(text) && text.split(/[。！？]/).length > 6) d += 1;
    d = Math.min(10, d);
    scores.D = d;
    if (chars < rub.minChars) {
      feedback.push("标准 D：篇幅偏短（现 " + chars + " 字），建议充实到 " + rub.minChars + " 字以上。");
    } else {
      feedback.push("标准 D：篇幅与用语基本达到练习要求（" + chars + " 字）。");
    }

    const total = scores.A + scores.B + scores.C + scores.D;
    const level = this._band(total);

    return {
      chars: chars,
      scores: scores,
      total: total,
      max: 40,
      level: level,
      quoteHits: quoteHits,
      techHits: techHits,
      themeHits: themeHits,
      feedback: feedback,
      summary:
        "AI 初评总分 " +
        total +
        "/40（" +
        level +
        "）。此结果仅供修改参考，最终以教师复审为准。"
    };
  },

  _touchesPrompt: function (text, prompt) {
    const keys = ["形象", "师生", "手法", "结尾", "启示", "作用", "特色"];
    return keys.some(function (k) {
      return prompt.indexOf(k) !== -1 && text.indexOf(k) !== -1;
    });
  },

  _band: function (total) {
    if (total >= 34) return "优秀区间";
    if (total >= 28) return "良好区间";
    if (total >= 20) return "及格区间";
    return "需大幅修改";
  },

  renderReport: function (result) {
    if (!result) return "<p class='hint'>尚未生成评价。</p>";
    const s = result.scores;
    return (
      "<p><strong>" +
      result.summary +
      "</strong></p>" +
      "<div class='score-row'>" +
      "<div class='score-pill'><strong>A 理解阐释</strong>" +
      s.A +
      "/10</div>" +
      "<div class='score-pill'><strong>B 分析评价</strong>" +
      s.B +
      "/10</div>" +
      "<div class='score-pill'><strong>C 连贯组织</strong>" +
      s.C +
      "/10</div>" +
      "<div class='score-pill'><strong>D 语言</strong>" +
      s.D +
      "/10</div>" +
      "</div>" +
      "<ul>" +
      result.feedback
        .map(function (f) {
          return "<li>" + f + "</li>";
        })
        .join("") +
      "</ul>" +
      "<p class='hint'>命中引文片段：" +
      (result.quoteHits.join("、") || "无") +
      "<br/>命中手法术语：" +
      (result.techHits.join("、") || "无") +
      "</p>"
    );
  }
};
