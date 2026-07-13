(function () {
  "use strict";

  const STORAGE = {
    progress: "wenmai-progress-v2",
    annotations: "wenmai-annotations-v2",
    thoughts: "wenmai-thoughts-v2",
    outline: "wenmai-outline-v2",
    essay: "wenmai-essay-v2",
    submissions: "wenmai-submissions-v2",
    student: "wenmai-student-v2"
  };

  const state = {
    layer: 0,
    done: { 1: false, 2: false, 3: false, 4: false, 5: false },
    activeTech: "metaphor",
    annotations: [],
    quoteCorrect: 0,
    presenceChecked: false,
    teacherAuthed: false,
    currentSubId: null
  };

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadJSON(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* ignore quota */
    }
  }

  function techById(id) {
    return window.TECH_PALETTE.find(function (t) {
      return t.id === id;
    });
  }

  function uid() {
    return "s_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 7);
  }

  function studentName() {
    return ($("#student-name").value || "").trim() || "匿名同学";
  }

  /* ---------- Navigation ---------- */
  function goLayer(n) {
    state.layer = Number(n);
    $all(".panel").forEach(function (p) {
      const id = Number(p.dataset.panel);
      const on = id === state.layer;
      p.hidden = !on;
      p.classList.toggle("active", on);
    });
    $all(".layer-nav-btn").forEach(function (btn) {
      btn.classList.toggle("active", Number(btn.dataset.layer) === state.layer);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function markDone(layer) {
    state.done[layer] = true;
    saveJSON(STORAGE.progress, state.done);
    updateProgressUI();
  }

  function updateProgressUI() {
    const total = 5;
    let done = 0;
    for (let i = 1; i <= 5; i++) {
      if (state.done[i]) {
        done += 1;
        const btn = $('.layer-nav-btn[data-layer="' + i + '"]');
        if (btn) btn.classList.add("done");
      }
    }
    $("#global-progress").style.width = (done / total) * 100 + "%";
    $("#global-progress-text").textContent = done + " / " + total + " 层";
  }

  /* ---------- Layer 0 text ---------- */
  function renderReadingText(targetId, interactive) {
    const root = $(targetId);
    root.innerHTML = window.TEXT_DATA.paragraphs
      .map(function (p) {
        return (
          '<div class="para" data-pid="' +
          p.id +
          '"><span class="para-num">' +
          p.num +
          "</span><p>" +
          (interactive ? escapeHtml(p.text) : escapeHtml(p.text)) +
          "</p></div>"
        );
      })
      .join("");
  }

  function initLayer0() {
    const d = window.TEXT_DATA;
    $("#work-title").textContent = d.title;
    $("#work-meta").textContent = d.author + " · " + d.source + " · " + d.examNote;
    renderReadingText("#text-body", false);
  }

  /* ---------- Layer 1 ---------- */
  function initLayer1() {
    $("#layer1-intro").textContent = window.LAYER1.intro;
    const grid = $("#tech-check-grid");
    const all = window.TECH_PALETTE.concat(window.LAYER1.distractors);
    grid.innerHTML = all
      .map(function (t) {
        const color = t.color || "#888";
        return (
          '<label class="tech-check" data-id="' +
          t.id +
          '"><input type="checkbox" value="' +
          t.id +
          '" /><span class="swatch" style="background:' +
          color +
          '"></span><span><strong>' +
          escapeHtml(t.name) +
          "</strong><br/><small>" +
          escapeHtml(t.desc || "") +
          "</small></span></label>"
        );
      })
      .join("");

    $("#check-tech-presence").onclick = function () {
      const selected = $all("#tech-check-grid input:checked").map(function (i) {
        return i.value;
      });
      const present = window.LAYER1.presentIds;
      const distractors = window.LAYER1.distractors.map(function (d) {
        return d.id;
      });

      $all("#tech-check-grid .tech-check").forEach(function (lab) {
        lab.classList.remove("hit", "miss");
        const id = lab.dataset.id;
        const checked = selected.indexOf(id) !== -1;
        if (present.indexOf(id) !== -1 && checked) lab.classList.add("hit");
        if (distractors.indexOf(id) !== -1 && checked) lab.classList.add("miss");
        if (present.indexOf(id) !== -1 && !checked) lab.classList.add("miss");
      });

      const correctSelected = selected.filter(function (id) {
        return present.indexOf(id) !== -1;
      }).length;
      const wrongSelected = selected.filter(function (id) {
        return distractors.indexOf(id) !== -1;
      }).length;
      const missed = present.length - correctSelected;

      state.presenceChecked = correctSelected >= 6 && wrongSelected === 0;
      $("#presence-feedback").textContent =
        "命中 " +
        correctSelected +
        "/" +
        present.length +
        " 种应选手法；误选干扰项 " +
        wrongSelected +
        "；漏选 " +
        missed +
        "。" +
        (state.presenceChecked ? " 清单识别达标。" : " 请对照原文再调整。");

      maybeFinishLayer1();
    };

    const tasks = $("#quote-tasks");
    tasks.innerHTML = "";
    state.quoteCorrect = 0;

    window.LAYER1.quoteTasks.forEach(function (task, idx) {
      const card = document.createElement("div");
      card.className = "quote-card";
      card.innerHTML =
        "<blockquote>" +
        escapeHtml(task.quote) +
        '</blockquote><div class="options"></div><p class="feedback" hidden></p>';
      const optionsEl = $(".options", card);
      const feedback = $(".feedback", card);

      window.TECH_PALETTE.forEach(function (tech) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option";
        btn.textContent = tech.name;
        btn.addEventListener("click", function () {
          if (card.dataset.locked === "1") return;
          card.dataset.locked = "1";
          $all(".option", card).forEach(function (b) {
            b.disabled = true;
            if (b.textContent === techById(task.answer).name) b.classList.add("is-answer");
          });
          const ok = tech.id === task.answer;
          if (!ok) btn.classList.add("is-miss");
          if (ok) state.quoteCorrect += 1;
          feedback.hidden = false;
          feedback.innerHTML =
            (ok ? "<strong>正确。</strong> " : "<strong>再看解析。</strong> ") +
            escapeHtml(task.explain);
          updateLayer1Result();
          maybeFinishLayer1();
        });
        optionsEl.appendChild(btn);
      });

      // number label
      const num = document.createElement("div");
      num.className = "focus";
      num.style.fontFamily = "var(--font-ui)";
      num.style.fontSize = "0.78rem";
      num.style.color = "var(--jade)";
      num.textContent = "句子 " + (idx + 1);
      card.insertBefore(num, card.firstChild);

      tasks.appendChild(card);
    });
  }

  function updateLayer1Result() {
    const total = window.LAYER1.quoteTasks.length;
    const answered = $all("#quote-tasks .quote-card[data-locked='1']").length;
    const box = $("#layer1-result");
    box.hidden = false;
    box.textContent =
      "句子辨识：" +
      state.quoteCorrect +
      "/" +
      total +
      " 次答对（已作答 " +
      answered +
      "）。";
  }

  function maybeFinishLayer1() {
    const answered = $all("#quote-tasks .quote-card[data-locked='1']").length;
    if (answered === window.LAYER1.quoteTasks.length && state.presenceChecked) {
      markDone(1);
    } else if (answered === window.LAYER1.quoteTasks.length && state.quoteCorrect >= 5) {
      markDone(1);
    }
  }

  /* ---------- Layer 2 annotation ---------- */
  function initLayer2() {
    renderReadingText("#annotate-body", true);
    const toolbar = $("#annotate-toolbar");
    toolbar.innerHTML = window.TECH_PALETTE.map(function (t) {
      return (
        '<button type="button" class="tech-chip" data-id="' +
        t.id +
        '"><span class="dot" style="background:' +
        t.color +
        '"></span>' +
        escapeHtml(t.name) +
        "</button>"
      );
    }).join("");

    state.annotations = loadJSON(STORAGE.annotations, []);
    if (state.annotations.length) {
      applyAnnotationsToDOM();
    }
    renderAnnList();
    setActiveTech(state.activeTech || "metaphor");

    $all(".tech-chip", toolbar).forEach(function (chip) {
      chip.addEventListener("click", function () {
        setActiveTech(chip.dataset.id);
      });
    });

    const body = $("#annotate-body");
    body.addEventListener("mouseup", function () {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !state.activeTech) return;
      if (!body.contains(sel.anchorNode)) return;
      const text = sel.toString().trim();
      if (text.length < 2 || text.length > 60) {
        $("#ann-feedback").textContent = "请选择 2–60 字的连续片段再标注。";
        return;
      }
      // Avoid nesting complexity: only annotate if selection is within a single paragraph text node path
      try {
        const range = sel.getRangeAt(0);
        if (!body.contains(range.commonAncestorContainer)) return;
        wrapSelection(range, state.activeTech, text);
        sel.removeAllRanges();
      } catch (e) {
        $("#ann-feedback").textContent = "该选区无法标注，请重新拖选纯文本。";
      }
    });

    $("#undo-ann").onclick = function () {
      if (!state.annotations.length) return;
      state.annotations.pop();
      saveJSON(STORAGE.annotations, state.annotations);
      rebuildAnnotateBody();
      renderAnnList();
    };

    $("#clear-ann").onclick = function () {
      if (!confirm("确定清空全部标注？")) return;
      state.annotations = [];
      saveJSON(STORAGE.annotations, state.annotations);
      rebuildAnnotateBody();
      renderAnnList();
      $("#ann-feedback").textContent = "已清空。";
    };

    $("#show-key-ann").onclick = function () {
      // merge reference keys as suggestions if not already present
      let added = 0;
      window.LAYER2_KEYS.forEach(function (k) {
        const exists = state.annotations.some(function (a) {
          return a.text === k.phrase;
        });
        if (!exists) {
          state.annotations.push({
            id: uid(),
            text: k.phrase,
            tech: k.tech,
            ref: true
          });
          added += 1;
        }
      });
      saveJSON(STORAGE.annotations, state.annotations);
      rebuildAnnotateBody();
      renderAnnList();
      $("#ann-feedback").textContent = "已叠加参考标注 " + added + " 处，请对照学习后可清空重标。";
    };

    $("#save-ann").onclick = function () {
      const techs = new Set(
        state.annotations.filter(function (a) {
          return !a.ref;
        }).map(function (a) {
          return a.tech;
        })
      );
      const count = state.annotations.filter(function (a) {
        return !a.ref;
      }).length;
      if (count >= 6 && techs.size >= 3) {
        markDone(2);
        $("#ann-feedback").textContent =
          "精读标注完成：自标 " + count + " 处，覆盖 " + techs.size + " 种手法。";
      } else {
        $("#ann-feedback").textContent =
          "还需努力：自标 " +
          count +
          "/6 处，手法种类 " +
          techs.size +
          "/3。可先看参考标注再独立重做。";
      }
    };
  }

  function setActiveTech(id) {
    state.activeTech = id;
    $all(".tech-chip").forEach(function (c) {
      c.classList.toggle("active", c.dataset.id === id);
    });
  }

  function wrapSelection(range, techId, text) {
    const tech = techById(techId);
    const mark = document.createElement("span");
    mark.className = "ann-mark";
    mark.dataset.tech = techId;
    mark.style.background = tech.bg;
    mark.style.boxShadow = "inset 0 -2px 0 " + tech.color;
    mark.title = tech.name + "：" + tech.desc;
    try {
      range.surroundContents(mark);
    } catch (e) {
      // fallback: extract and insert
      const frag = range.extractContents();
      mark.appendChild(frag);
      range.insertNode(mark);
    }
    state.annotations.push({ id: uid(), text: text, tech: techId, ref: false });
    saveJSON(STORAGE.annotations, state.annotations);
    renderAnnList();
    $("#ann-feedback").textContent = "已标注「" + text.slice(0, 18) + (text.length > 18 ? "…" : "") + "」为" + tech.name + "。";
  }

  function rebuildAnnotateBody() {
    renderReadingText("#annotate-body", true);
    applyAnnotationsToDOM();
  }

  function applyAnnotationsToDOM() {
    const sorted = state.annotations.slice().sort(function (a, b) {
      return b.text.length - a.text.length;
    });

    $all("#annotate-body .para p").forEach(function (p) {
      const original = window.TEXT_DATA.paragraphs.find(function (x) {
        return x.id === p.parentElement.dataset.pid;
      });
      if (!original) return;

      const inPara = sorted.filter(function (a) {
        return original.text.indexOf(a.text) !== -1;
      });
      if (!inPara.length) {
        p.textContent = original.text;
        return;
      }

      const used = [];
      const events = inPara
        .map(function (a) {
          const start = original.text.indexOf(a.text);
          return { start: start, end: start + a.text.length, ann: a };
        })
        .filter(function (e) {
          return e.start >= 0;
        })
        .sort(function (a, b) {
          return a.start - b.start || b.end - a.end;
        });

      let cursor = 0;
      let html = "";
      events.forEach(function (e) {
        if (e.start < cursor) return;
        const overlap = used.some(function (u) {
          return !(e.end <= u.start || e.start >= u.end);
        });
        if (overlap) return;
        html += escapeHtml(original.text.slice(cursor, e.start));
        const tech = techById(e.ann.tech);
        html +=
          '<span class="ann-mark" title="' +
          escapeHtml(tech.name + "：" + tech.desc) +
          '" style="background:' +
          tech.bg +
          ";box-shadow:inset 0 -2px 0 " +
          tech.color +
          '">' +
          escapeHtml(e.ann.text) +
          "</span>";
        used.push(e);
        cursor = e.end;
      });
      html += escapeHtml(original.text.slice(cursor));
      p.innerHTML = html;
    });
  }

  function renderAnnList() {
    const list = $("#ann-list");
    if (!state.annotations.length) {
      list.innerHTML = "<li class='hint'>尚未标注。选择色彩后拖选原文。</li>";
      return;
    }
    list.innerHTML = state.annotations
      .slice()
      .reverse()
      .map(function (a) {
        const tech = techById(a.tech);
        return (
          "<li><span class='tag' style='color:" +
          (tech ? tech.color : "#333") +
          "'>" +
          escapeHtml(tech ? tech.name : a.tech) +
          (a.ref ? " · 参考" : "") +
          "</span><span>" +
          escapeHtml(a.text) +
          "</span></li>"
        );
      })
      .join("");
  }

  /* ---------- Layer 3 ---------- */
  function initLayer3() {
    const saved = loadJSON(STORAGE.thoughts, {});
    const root = $("#think-list");
    root.innerHTML = "";

    window.LAYER3.forEach(function (q, idx) {
      const card = document.createElement("div");
      card.className = "think-card";
      card.innerHTML =
        '<div class="focus">' +
        escapeHtml(q.focus) +
        "</div><h3>" +
        (idx + 1) +
        ". " +
        escapeHtml(q.prompt) +
        '</h3><button type="button" class="hint-btn">展开思考提示</button><ul class="hints">' +
        q.hints.map(function (h) {
          return "<li>" + escapeHtml(h) + "</li>";
        }).join("") +
        '</ul><textarea placeholder="写下你的阐释（建议 80 字以上）……">' +
        escapeHtml(saved[q.id] || "") +
        "</textarea>";

      const hintBtn = $(".hint-btn", card);
      const hints = $(".hints", card);
      const ta = $("textarea", card);
      hintBtn.addEventListener("click", function () {
        hints.classList.toggle("open");
        hintBtn.textContent = hints.classList.contains("open") ? "收起提示" : "展开思考提示";
      });
      ta.addEventListener("input", function () {
        saved[q.id] = ta.value;
        saveJSON(STORAGE.thoughts, saved);
        checkLayer3(saved);
      });
      root.appendChild(card);
    });
    checkLayer3(saved);
  }

  function checkLayer3(saved) {
    const answered = window.LAYER3.filter(function (q) {
      return (saved[q.id] || "").trim().length >= 40;
    }).length;
    const box = $("#layer3-result");
    if (answered > 0) {
      box.hidden = false;
      box.textContent = "深入思考进度：" + answered + "/" + window.LAYER3.length + " 题已作答（每题至少约 40 字）。";
    }
    if (answered >= 3) markDone(3);
  }

  /* ---------- Layer 4 outline ---------- */
  function initLayer4() {
    const row = $("#criteria-row");
    row.innerHTML = window.IB_OUTLINE.criteria
      .map(function (c) {
        return (
          '<div class="criteria-card"><h3>' +
          escapeHtml(c.name) +
          "</h3><p>" +
          escapeHtml(c.guide) +
          "</p></div>"
        );
      })
      .join("");

    const select = $("#outline-prompt");
    const essaySelect = $("#essay-prompt");
    select.innerHTML = "";
    essaySelect.innerHTML = "";
    window.IB_OUTLINE.prompts.forEach(function (p, i) {
      const opt = new Option(p.title + " — " + p.question.slice(0, 18) + "…", p.id);
      select.add(opt);
      essaySelect.add(new Option(p.title, p.id));
    });

    const saved = loadJSON(STORAGE.outline, { promptId: "wp1", slots: {} });
    select.value = saved.promptId || "wp1";
    essaySelect.value = saved.promptId || "wp1";
    updatePromptPreview();

    select.addEventListener("change", function () {
      saved.promptId = select.value;
      essaySelect.value = select.value;
      saveJSON(STORAGE.outline, saved);
      updatePromptPreview();
    });

    const grid = $("#outline-grid");
    grid.innerHTML = "";
    window.IB_OUTLINE.outlineSlots.forEach(function (slot) {
      const wrap = document.createElement("div");
      wrap.className = "outline-slot";
      wrap.innerHTML =
        "<label for='slot-" +
        slot.id +
        "'>" +
        escapeHtml(slot.label) +
        "</label><textarea id='slot-" +
        slot.id +
        "' placeholder='" +
        escapeHtml(slot.placeholder) +
        "'>" +
        escapeHtml(saved.slots[slot.id] || "") +
        "</textarea>";
      $("textarea", wrap).addEventListener("input", function (e) {
        saved.slots[slot.id] = e.target.value;
        saveJSON(STORAGE.outline, saved);
      });
      grid.appendChild(wrap);
    });

    $("#save-outline").onclick = function () {
      const filled = window.IB_OUTLINE.outlineSlots.filter(function (s) {
        return (saved.slots[s.id] || "").trim().length >= 15;
      }).length;
      saveJSON(STORAGE.outline, saved);
      if (filled >= 3) {
        markDone(4);
        $("#outline-feedback").textContent =
          "大纲已保存（完成 " + filled + " 个槽位）。可进入第五层扩写成文。";
      } else {
        $("#outline-feedback").textContent =
          "请至少完成中心论点与两段主体分析（当前有效槽位 " + filled + "）。";
      }
    };
  }

  function updatePromptPreview() {
    const id = $("#outline-prompt").value;
    const p = window.IB_OUTLINE.prompts.find(function (x) {
      return x.id === id;
    });
    $("#prompt-preview").textContent = p ? p.question : "";
  }

  function currentPromptQuestion() {
    const id = $("#essay-prompt").value || $("#outline-prompt").value;
    const p = window.IB_OUTLINE.prompts.find(function (x) {
      return x.id === id;
    });
    return p ? p.question : "";
  }

  /* ---------- Layer 5 writing + submit ---------- */
  function initLayer5() {
    const savedEssay = loadJSON(STORAGE.essay, { promptId: "wp1", body: "", lastAi: null });
    $("#essay-prompt").value = savedEssay.promptId || "wp1";
    $("#essay-body").value = savedEssay.body || "";
    updateCharCount();
    if (savedEssay.lastAi) {
      $("#ai-report").classList.remove("empty");
      $("#ai-report").innerHTML = window.AIGrader.renderReport(savedEssay.lastAi);
    }

    $("#essay-body").addEventListener("input", function () {
      updateCharCount();
      savedEssay.body = $("#essay-body").value;
      savedEssay.promptId = $("#essay-prompt").value;
      saveJSON(STORAGE.essay, savedEssay);
    });
    $("#essay-prompt").addEventListener("change", function () {
      savedEssay.promptId = $("#essay-prompt").value;
      saveJSON(STORAGE.essay, savedEssay);
    });

    $("#load-outline-to-essay").onclick = function () {
      const outline = loadJSON(STORAGE.outline, { slots: {} });
      const parts = window.IB_OUTLINE.outlineSlots.map(function (s) {
        const v = (outline.slots[s.id] || "").trim();
        return v ? "【" + s.label + "】\n" + v : "";
      }).filter(Boolean);
      if (!parts.length) {
        alert("尚未保存大纲，请先完成第四层。");
        return;
      }
      $("#essay-body").value = parts.join("\n\n") + "\n\n";
      $("#essay-body").dispatchEvent(new Event("input"));
    };

    $("#ai-preview").onclick = function () {
      runAi(false);
    };
    $("#submit-essay").onclick = function () {
      runAi(true);
    };
  }

  function updateCharCount() {
    const n = ($("#essay-body").value || "").trim().length;
    $("#char-count").textContent = n + " 字";
  }

  async function runAi(submit) {
    const body = ($("#essay-body").value || "").trim();
    if (body.length < 80) {
      alert("请先写出更完整的评论（建议不少于 80 字）再预评/提交。");
      return;
    }
    if (submit && !($("#student-name").value || "").trim()) {
      alert("提交前请在左侧填写学习者姓名。");
      $("#student-name").focus();
      return;
    }

    const result = window.AIGrader.grade(body, currentPromptQuestion());
    $("#ai-report").classList.remove("empty");
    $("#ai-report").innerHTML = window.AIGrader.renderReport(result);

    const essayStore = loadJSON(STORAGE.essay, {});
    essayStore.body = body;
    essayStore.promptId = $("#essay-prompt").value;
    essayStore.lastAi = result;
    saveJSON(STORAGE.essay, essayStore);

    if (!submit) {
      $("#essay-status").textContent = "已预评（未提交）";
      return;
    }

    const prompt = window.IB_OUTLINE.prompts.find(function (p) {
      return p.id === $("#essay-prompt").value;
    });

    const submission = await window.WenmaiAPI.create({
      student: studentName(),
      promptId: $("#essay-prompt").value,
      promptTitle: prompt ? prompt.title : "",
      promptQuestion: prompt ? prompt.question : "",
      body: body,
      ai: result
    });

    markDone(5);
    $("#essay-status").textContent = "已提交，待教师复审";
    const receipt = $("#submission-receipt");
    receipt.hidden = false;
    receipt.innerHTML =
      "<strong>提交成功。</strong> 编号 " +
      escapeHtml(submission.id) +
      " · " +
      escapeHtml(submission.student) +
      "<br/>AI 初评：" +
      result.total +
      "/40（" +
      result.level +
      "）。请打开「老师点评端口」进行二次审核。<br/>" +
      '<a href="/teacher.html" target="_blank" rel="noopener">进入老师点评</a>　' +
      '<a href="http://localhost:8081/teacher.html" target="_blank" rel="noopener">本机 :8081</a>';
  }

  /* ---------- Teacher link (独立点评页，无需密码) ---------- */
  function initTeacher() {
    // 主入口：/teacher.html 与 :8081，无密码
  }

  function renderSubList() {}
  function showSubDetail() {}


  /* ---------- Boot ---------- */
  function bindNav() {
    $all(".layer-nav-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goLayer(btn.dataset.layer);
      });
    });
    $all("[data-go]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goLayer(btn.dataset.go);
      });
    });
    $("#brand-home").addEventListener("click", function (e) {
      e.preventDefault();
      goLayer(0);
    });
  }

  function init() {
    state.done = loadJSON(STORAGE.progress, state.done);
    const name = localStorage.getItem(STORAGE.student) || "";
    $("#student-name").value = name;
    $("#student-name").addEventListener("change", function () {
      localStorage.setItem(STORAGE.student, $("#student-name").value.trim());
    });

    bindNav();
    initLayer0();
    initLayer1();
    initLayer2();
    initLayer3();
    initLayer4();
    initLayer5();
    initTeacher();
    updateProgressUI();
    goLayer(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
