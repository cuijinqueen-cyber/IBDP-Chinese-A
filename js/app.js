(function () {
  "use strict";

  const STORAGE = {
    progress: "wenmai-lit-progress-v1",
    student: "wenmai-lit-student-v1",
    analysis: "wenmai-lit-analysis-v1",
    layer1: "wenmai-lit-layer1-v1",
    layer2: "wenmai-lit-layer2-v1"
  };

  const state = {
    layer: 0,
    done: { 1: false, 2: false, 3: false },
    colorMode: "tech", // tech | concept | off
    conceptFilter: null,
    legendMode: "tech",
    layer1QuoteCorrect: 0,
    layer2Correct: 0,
    activeAnn: -1,
    tourIndex: -1
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
      /* ignore */
    }
  }

  function techById(id) {
    return window.TECHNIQUES.find(function (t) {
      return t.id === id;
    });
  }

  function conceptById(id) {
    return window.CONCEPTS.find(function (c) {
      return c.id === id;
    });
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
    const app = $("#app");
    if (app) app.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function markDone(layer) {
    state.done[layer] = true;
    saveJSON(STORAGE.progress, state.done);
    updateProgressUI();
  }

  function updateProgressUI() {
    let done = 0;
    for (let i = 1; i <= 3; i++) {
      if (state.done[i]) {
        done += 1;
        const btn = $('.layer-nav-btn[data-layer="' + i + '"]');
        if (btn) btn.classList.add("done");
      }
    }
    const bar = $("#global-progress");
    if (bar) bar.style.width = (done / 3) * 100 + "%";
    const text = $("#global-progress-text");
    if (text) text.textContent = done + " / 3 层完成";
  }

  /* ---------- Legend ---------- */
  function renderLegend() {
    const list = $("#legend-list");
    if (!list) return;
    const items =
      state.legendMode === "concept" ? window.CONCEPTS : window.TECHNIQUES;
    list.innerHTML = items
      .map(function (item) {
        return (
          '<li><span class="swatch" style="background:' +
          item.color +
          '"></span><span>' +
          escapeHtml(item.name) +
          (item.nameEn ? " · " + escapeHtml(item.nameEn) : "") +
          "</span></li>"
        );
      })
      .join("");
  }

  /* ---------- Concepts band ---------- */
  function renderConcepts() {
    const grid = $("#concept-grid");
    if (!grid) return;
    grid.innerHTML = window.CONCEPTS.map(function (c) {
      return (
        '<button type="button" class="concept-card" data-concept="' +
        c.id +
        '" style="--c:' +
        c.color +
        '">' +
        '<span class="cn">' +
        escapeHtml(c.name) +
        "</span>" +
        '<span class="en">' +
        escapeHtml(c.nameEn) +
        "</span>" +
        '<p class="blurb">' +
        escapeHtml(c.blurb) +
        "</p></button>"
      );
    }).join("");

    grid.addEventListener("click", function (e) {
      const card = e.target.closest(".concept-card");
      if (!card) return;
      const id = card.dataset.concept;
      const same = state.conceptFilter === id;
      state.conceptFilter = same ? null : id;
      $all(".concept-card").forEach(function (el) {
        el.classList.toggle("active", el.dataset.concept === state.conceptFilter);
      });
      if (state.conceptFilter) {
        state.colorMode = "concept";
        $all(".seg-btn").forEach(function (b) {
          b.classList.toggle("active", b.dataset.mode === "concept");
        });
      }
      renderText();
      goLayer(0);
    });
  }

  /* ---------- Text with colored marks ---------- */
  function applyMarks(text, mode, filterConcept) {
    if (mode === "off") return escapeHtml(text);

    const anns = window.ANNOTATIONS.slice().sort(function (a, b) {
      return b.phrase.length - a.phrase.length;
    });

    const ranges = [];
    anns.forEach(function (ann) {
      const annIndex = window.ANNOTATIONS.indexOf(ann);
      let from = 0;
      while (from < text.length) {
        const idx = text.indexOf(ann.phrase, from);
        if (idx === -1) break;
        ranges.push({
          start: idx,
          end: idx + ann.phrase.length,
          ann: ann,
          annIndex: annIndex
        });
        from = idx + ann.phrase.length;
      }
    });

    if (!ranges.length) return escapeHtml(text);

    ranges.sort(function (a, b) {
      return a.start - b.start || b.end - a.end;
    });

    const picked = [];
    let cursor = 0;
    ranges.forEach(function (r) {
      if (r.start >= cursor) {
        picked.push(r);
        cursor = r.end;
      }
    });

    let html = "";
    let pos = 0;
    picked.forEach(function (r) {
      html += escapeHtml(text.slice(pos, r.start));
      const tech = techById(r.ann.tech);
      const primaryConcept = conceptById(r.ann.concepts[0]);
      let color, bg, dim;

      if (mode === "tech") {
        color = tech ? tech.color : "#666";
        bg = tech ? tech.bg : "rgba(0,0,0,0.08)";
        dim = false;
      } else {
        let c = primaryConcept;
        if (filterConcept) {
          const matchId = r.ann.concepts.find(function (cid) {
            return cid === filterConcept;
          });
          c = matchId ? conceptById(matchId) : primaryConcept;
          dim = !matchId;
        } else {
          dim = false;
        }
        color = c ? c.color : "#666";
        bg = c ? c.bg : "rgba(0,0,0,0.08)";
      }

      const active = state.activeAnn === r.annIndex ? " active" : "";
      html +=
        '<mark class="mark' +
        (dim ? " dim" : "") +
        active +
        '" tabindex="0" role="button" style="background:' +
        bg +
        "; box-shadow: inset 0 -2px 0 " +
        color +
        '" data-ann-index="' +
        r.annIndex +
        '" data-tech="' +
        r.ann.tech +
        '" data-concepts="' +
        r.ann.concepts.join(",") +
        '" aria-label="查看精读讲解：' +
        escapeHtml(r.ann.phrase) +
        '">' +
        escapeHtml(text.slice(r.start, r.end)) +
        "</mark>";
      pos = r.end;
    });
    html += escapeHtml(text.slice(pos));
    return html;
  }

  function renderText() {
    const body = $("#text-body");
    if (!body) return;
    body.innerHTML = window.TEXT_DATA.paragraphs
      .map(function (p) {
        return (
          '<div class="para" id="' +
          p.id +
          '"><span class="para-num">' +
          escapeHtml(p.num) +
          "</span><p>" +
          applyMarks(p.text, state.colorMode, state.conceptFilter) +
          "</p></div>"
        );
      })
      .join("");
  }

  function showExplanation(annIndex) {
    const ann = window.ANNOTATIONS[annIndex];
    if (!ann) return;
    state.activeAnn = annIndex;
    state.tourIndex = annIndex;

    const tech = techById(ann.tech);
    const empty = $("#explain-empty");
    const content = $("#explain-content");
    if (empty) empty.hidden = true;
    if (content) content.hidden = false;

    $("#explain-quote").textContent = "「" + ann.phrase + "」";

    const tags = $("#explain-tags");
    let tagHtml = "";
    if (tech) {
      tagHtml +=
        '<span class="concept-chip" style="--c:' +
        tech.color +
        ";--cbg:" +
        tech.bg +
        '"><span class="dot"></span>手法 · ' +
        escapeHtml(tech.name) +
        "</span>";
    }
    ann.concepts.forEach(function (cid) {
      const c = conceptById(cid);
      if (!c) return;
      tagHtml +=
        '<span class="concept-chip" style="--c:' +
        c.color +
        ";--cbg:" +
        c.bg +
        '"><span class="dot"></span>' +
        escapeHtml(c.name) +
        " · " +
        escapeHtml(c.nameEn) +
        "</span>";
    });
    tags.innerHTML = tagHtml;

    $("#explain-tech").textContent = tech
      ? tech.name + "：" + tech.desc
      : ann.tech;
    $("#explain-effect").textContent = ann.effect;

    const conceptsBox = $("#explain-concepts");
    conceptsBox.innerHTML = ann.concepts
      .map(function (cid) {
        const c = conceptById(cid);
        if (!c) return "";
        return (
          '<div class="concept-explain" style="--c:' +
          c.color +
          '"><strong>' +
          escapeHtml(c.name) +
          "</strong><span>" +
          escapeHtml(c.nameEn) +
          "</span><p>" +
          escapeHtml(c.focus || c.blurb) +
          "</p></div>"
        );
      })
      .join("");

    const note =
      (window.READING_NOTES && window.READING_NOTES[ann.phrase]) ||
      "把引文、手法与效果连成一句分析，再问它如何回应引导问题。";
    $("#explain-note").textContent = note;

    const pos = $("#tour-pos");
    if (pos) {
      pos.textContent =
        "精读 " + (annIndex + 1) + " / " + window.ANNOTATIONS.length;
    }

    // highlight active marks without full re-render if possible
    $all(".mark").forEach(function (m) {
      m.classList.toggle("active", Number(m.dataset.annIndex) === annIndex);
    });

    const activeMark = $('.mark[data-ann-index="' + annIndex + '"]');
    if (activeMark) {
      activeMark.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function tourStep(delta) {
    if (state.colorMode === "off") {
      state.colorMode = "tech";
      $all(".seg-btn").forEach(function (b) {
        b.classList.toggle("active", b.dataset.mode === "tech");
      });
      renderText();
    }
    let next = state.tourIndex + delta;
    if (state.tourIndex < 0) next = 0;
    if (next < 0) next = window.ANNOTATIONS.length - 1;
    if (next >= window.ANNOTATIONS.length) next = 0;
    showExplanation(next);
  }

  function bindTextClicks() {
    const body = $("#text-body");
    if (!body || body.dataset.bound) return;
    body.dataset.bound = "1";
    body.addEventListener("click", function (e) {
      const mark = e.target.closest(".mark");
      if (!mark) return;
      const idx = Number(mark.dataset.annIndex);
      if (!Number.isNaN(idx)) showExplanation(idx);
    });
    body.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      const mark = e.target.closest(".mark");
      if (!mark) return;
      e.preventDefault();
      showExplanation(Number(mark.dataset.annIndex));
    });
  }

  function renderReadingMeta() {
    $("#work-title").textContent = window.TEXT_DATA.title;
    $("#work-meta").textContent =
      window.TEXT_DATA.author + " · " + window.TEXT_DATA.source;
    $("#guiding-q").textContent =
      "引导问题：" + window.TEXT_DATA.guidingQuestion;
  }

  /* ---------- Layer 1 ---------- */
  function renderLayer1() {
    $("#layer1-intro").textContent = window.LAYER1.intro;

    const options = window.TECHNIQUES.concat(window.LAYER1.distractors);
    const grid = $("#tech-check-grid");
    grid.innerHTML = options
      .map(function (t) {
        const color = t.color || "#999";
        return (
          '<label class="tech-check" style="--tc:' +
          color +
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

    const box = $("#quote-tasks");
    box.innerHTML = window.LAYER1.quoteTasks
      .map(function (task, i) {
        const ans = techById(task.answer);
        const opts = window.TECHNIQUES.map(function (t) {
          return (
            '<label class="opt"><input type="radio" name="' +
            task.id +
            '" value="' +
            t.id +
            '" /><span><span class="swatch" style="display:inline-block;background:' +
            t.color +
            ';margin-right:0.35rem;vertical-align:middle"></span>' +
            escapeHtml(t.name) +
            "</span></label>"
          );
        }).join("");
        return (
          '<div class="quote-card" data-qid="' +
          task.id +
          '" style="--tc:' +
          (ans ? ans.color : "var(--jade)") +
          '">' +
          "<blockquote>" +
          (i + 1) +
          ". 「" +
          escapeHtml(task.quote) +
          "」</blockquote>" +
          '<div class="opt-row">' +
          opts +
          "</div>" +
          '<p class="explain" hidden data-explain></p></div>'
        );
      })
      .join("");

    box.addEventListener("change", onQuoteChange);
  }

  function onQuoteChange(e) {
    const input = e.target;
    if (!input.matches('input[type="radio"]')) return;
    const card = input.closest(".quote-card");
    const task = window.LAYER1.quoteTasks.find(function (t) {
      return t.id === card.dataset.qid;
    });
    if (!task) return;

    $all(".opt", card).forEach(function (o) {
      o.classList.remove("correct", "wrong");
    });
    const label = input.closest(".opt");
    const explain = $("[data-explain]", card);
    if (input.value === task.answer) {
      label.classList.add("correct");
      explain.hidden = false;
      explain.textContent = "✓ " + task.explain;
    } else {
      label.classList.add("wrong");
      explain.hidden = false;
      const right = techById(task.answer);
      explain.textContent =
        "再想想。参考答案是「" +
        (right ? right.name : task.answer) +
        "」。" +
        task.explain;
    }
    updateLayer1Score();
  }

  function updateLayer1Score() {
    let correct = 0;
    window.LAYER1.quoteTasks.forEach(function (task) {
      const checked = $('input[name="' + task.id + '"]:checked');
      if (checked && checked.value === task.answer) correct += 1;
    });
    state.layer1QuoteCorrect = correct;
    const total = window.LAYER1.quoteTasks.length;
    const result = $("#layer1-result");
    if (correct >= Math.ceil(total * 0.6)) {
      result.hidden = false;
      result.textContent =
        "第一层进度：句子识别 " +
        correct +
        "/" +
        total +
        "。可进入第二层，继续追问手法的效果。";
      if (correct === total) markDone(1);
    }
  }

  function checkPresence() {
    const present = new Set(window.LAYER1.presentIds);
    const checked = $all('#tech-check-grid input[type="checkbox"]:checked').map(
      function (el) {
        return el.value;
      }
    );
    const checkedSet = new Set(checked);
    let hit = 0;
    let miss = 0;
    $all(".tech-check").forEach(function (label) {
      const id = $("input", label).value;
      label.classList.remove("hit", "miss");
      const isPresent = present.has(id);
      const isChecked = checkedSet.has(id);
      if (isChecked && isPresent) {
        label.classList.add("hit");
        hit += 1;
      } else if (isChecked && !isPresent) {
        label.classList.add("miss");
        miss += 1;
      } else if (!isChecked && isPresent) {
        label.classList.add("miss");
      }
    });
    const fb = $("#presence-feedback");
    const total = present.size;
    fb.className = "feedback " + (hit === total && miss === 0 ? "ok" : "bad");
    fb.textContent =
      "命中 " +
      hit +
      "/" +
      total +
      " 种真实出现的手法" +
      (miss ? "；有 " + miss + " 处误选或漏选" : "。全部正确！") +
      " 色条对应各手法色标。";
    if (hit === total && miss === 0 && state.layer1QuoteCorrect >= 5) {
      markDone(1);
    }
  }

  /* ---------- Layer 2 ---------- */
  function renderLayer2() {
    $("#layer2-intro").textContent = window.LAYER2.intro;
    const box = $("#effect-tasks");
    box.innerHTML = window.LAYER2.tasks
      .map(function (task, i) {
        const tech = techById(task.tech);
        const concept = conceptById(task.concept);
        const opts = task.options
          .map(function (o) {
            return (
              '<label class="opt"><input type="radio" name="' +
              task.id +
              '" value="' +
              o.id +
              '" /><span>' +
              escapeHtml(o.text) +
              "</span></label>"
            );
          })
          .join("");
        return (
          '<div class="effect-card" data-eid="' +
          task.id +
          '" style="--tc:' +
          (tech ? tech.color : "var(--jade)") +
          '">' +
          (concept
            ? '<span class="concept-chip" style="--c:' +
              concept.color +
              ";--cbg:" +
              concept.bg +
              '"><span class="dot"></span>' +
              escapeHtml(concept.name) +
              " · " +
              escapeHtml(concept.nameEn) +
              "</span>"
            : "") +
          (tech
            ? '<span class="concept-chip" style="--c:' +
              tech.color +
              ";--cbg:" +
              tech.bg +
              '"><span class="dot"></span>手法：' +
              escapeHtml(tech.name) +
              "</span>"
            : "") +
          "<blockquote>" +
          (i + 1) +
          ". 「" +
          escapeHtml(task.quote) +
          "」</blockquote>" +
          "<p><strong>" +
          escapeHtml(task.prompt) +
          "</strong></p>" +
          '<div class="opt-row">' +
          opts +
          "</div>" +
          '<p class="explain" hidden data-explain></p></div>'
        );
      })
      .join("");

    box.addEventListener("change", onEffectChange);
  }

  function onEffectChange(e) {
    const input = e.target;
    if (!input.matches('input[type="radio"]')) return;
    const card = input.closest(".effect-card");
    const task = window.LAYER2.tasks.find(function (t) {
      return t.id === card.dataset.eid;
    });
    if (!task) return;

    const correctOpt = task.options.find(function (o) {
      return o.correct;
    });
    $all(".opt", card).forEach(function (o) {
      o.classList.remove("correct", "wrong");
    });
    const label = input.closest(".opt");
    const explain = $("[data-explain]", card);
    if (correctOpt && input.value === correctOpt.id) {
      label.classList.add("correct");
      explain.hidden = false;
      explain.textContent = "✓ " + task.explain;
    } else {
      label.classList.add("wrong");
      explain.hidden = false;
      explain.textContent = "尚未切中效果。提示：" + task.explain;
      // reveal correct
      $all("input", card).forEach(function (inp) {
        if (correctOpt && inp.value === correctOpt.id) {
          inp.closest(".opt").classList.add("correct");
        }
      });
    }
    updateLayer2Score();
  }

  function updateLayer2Score() {
    let correct = 0;
    window.LAYER2.tasks.forEach(function (task) {
      const correctOpt = task.options.find(function (o) {
        return o.correct;
      });
      const checked = $('input[name="' + task.id + '"]:checked');
      if (checked && correctOpt && checked.value === correctOpt.id) correct += 1;
    });
    state.layer2Correct = correct;
    const total = window.LAYER2.tasks.length;
    const result = $("#layer2-result");
    result.hidden = false;
    result.textContent =
      "第二层：效果分析 " +
      correct +
      "/" +
      total +
      "。注意色标——左边条是手法色，概念芯片是七大概念色。";
    if (correct >= Math.ceil(total * 0.7)) markDone(2);
  }

  /* ---------- Layer 3 ---------- */
  function renderLayer3() {
    $("#layer3-intro").textContent = window.LAYER3.intro;

    const sel = $("#write-prompt");
    sel.innerHTML = window.LAYER3.prompts
      .map(function (p) {
        return (
          '<option value="' + p.id + '">' + escapeHtml(p.title) + "</option>"
        );
      })
      .join("");

    sel.addEventListener("change", syncWritePrompt);
    syncWritePrompt();

    const frames = $("#frame-btns");
    frames.innerHTML = window.LAYER3.frames
      .map(function (f, i) {
        return (
          '<button type="button" class="frame-btn" data-frame="' +
          i +
          '">' +
          escapeHtml(f) +
          "</button>"
        );
      })
      .join("");

    frames.addEventListener("click", function (e) {
      const btn = e.target.closest(".frame-btn");
      if (!btn) return;
      insertAtCursor($("#analysis-body"), window.LAYER3.frames[Number(btn.dataset.frame)] + "\n");
    });

    const rubric = $("#rubric-list");
    rubric.innerHTML = window.LAYER3.rubric
      .map(function (r) {
        return (
          '<label class="rubric-item"><input type="checkbox" data-rubric="' +
          r.id +
          '" /><span><strong>' +
          escapeHtml(r.label) +
          "</strong><small>" +
          escapeHtml(r.tip) +
          "</small></span></label>"
        );
      })
      .join("");

    rubric.addEventListener("change", function (e) {
      const item = e.target.closest(".rubric-item");
      if (item) item.classList.toggle("checked", e.target.checked);
    });

    const ev = $("#evidence-list");
    ev.innerHTML = window.ANNOTATIONS.slice(0, 10)
      .map(function (a) {
        const tech = techById(a.tech);
        return (
          '<li><button type="button" class="ev-btn" style="--tc:' +
          (tech ? tech.color : "var(--jade)") +
          '" data-quote="' +
          escapeHtml(a.phrase) +
          '">「' +
          escapeHtml(a.phrase) +
          "」 · " +
          escapeHtml(tech ? tech.name : "") +
          "</button></li>"
        );
      })
      .join("");

    ev.addEventListener("click", function (e) {
      const btn = e.target.closest(".ev-btn");
      if (!btn) return;
      insertAtCursor($("#analysis-body"), "「" + btn.dataset.quote + "」");
      updateCharCount();
    });

    const saved = loadJSON(STORAGE.analysis, null);
    if (saved && saved.body) {
      $("#analysis-body").value = saved.body;
      if (saved.promptId) sel.value = saved.promptId;
      syncWritePrompt();
      updateCharCount();
    }

    $("#analysis-body").addEventListener("input", function () {
      updateCharCount();
      saveJSON(STORAGE.analysis, {
        body: $("#analysis-body").value,
        promptId: $("#write-prompt").value
      });
    });
  }

  function syncWritePrompt() {
    const id = $("#write-prompt").value;
    const prompt = window.LAYER3.prompts.find(function (p) {
      return p.id === id;
    });
    if (!prompt) return;
    const concept = conceptById(prompt.concept);
    $("#write-prompt-preview").innerHTML =
      escapeHtml(prompt.question) +
      (concept
        ? ' <span class="concept-chip" style="--c:' +
          concept.color +
          ";--cbg:" +
          concept.bg +
          '"><span class="dot"></span>' +
          escapeHtml(concept.name) +
          "</span>"
        : "");
    $("#write-hints").innerHTML = prompt.hints
      .map(function (h) {
        return (
          '<button type="button" class="hint-chip" data-hint="' +
          escapeHtml(h) +
          '">' +
          escapeHtml(h) +
          "</button>"
        );
      })
      .join("");
  }

  function insertAtCursor(textarea, text) {
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;
    textarea.value = val.slice(0, start) + text + val.slice(end);
    textarea.focus();
    const pos = start + text.length;
    textarea.setSelectionRange(pos, pos);
    saveJSON(STORAGE.analysis, {
      body: textarea.value,
      promptId: $("#write-prompt").value
    });
  }

  function updateCharCount() {
    const n = ($("#analysis-body").value || "").trim().length;
    $("#char-count").textContent = n + " 字";
  }

  function selfCheck() {
    const body = ($("#analysis-body").value || "").trim();
    const fb = $("#write-feedback");
    const checks = $all("#rubric-list input:checked").length;
    const total = window.LAYER3.rubric.length;
    const hasQuote = /「|」|"|“|”/.test(body) || body.length > 80;
    const techHit = window.TECHNIQUES.some(function (t) {
      return body.indexOf(t.name) !== -1;
    });
    const conceptHit = window.CONCEPTS.some(function (c) {
      return body.indexOf(c.name) !== -1;
    });
    const effectWords = ["使", "让", "突出", "强化", "暗示", "表现", "揭示", "感受", "效果"];
    const hasEffect = effectWords.some(function (w) {
      return body.indexOf(w) !== -1;
    });

    const tips = [];
    if (body.length < 120) tips.push("篇幅偏短，建议写到 120 字以上。");
    if (!hasQuote) tips.push("尽量嵌入具体引文作为证据。");
    if (!techHit) tips.push("请明确命名至少一种文学手法。");
    if (!hasEffect) tips.push("补充手法对读者/意义的作用（效果）。");
    if (!conceptHit) tips.push("尝试连接到一个 IB 概念（如身份、视角、转变）。");
    if (checks < total) tips.push("量规还有未勾选项，请逐条自检。");

    if (!tips.length && checks === total) {
      fb.className = "feedback ok";
      fb.textContent = "自评良好：证据、手法、效果与概念均有体现。可完成本层。";
      $("#write-status").textContent = "自评通过";
      markDone(3);
    } else {
      fb.className = "feedback bad";
      fb.textContent = tips.join(" ") || "请继续完善分析段。";
      $("#write-status").textContent = "需修订";
    }
  }

  function showSample() {
    const box = $("#sample-box");
    box.hidden = !box.hidden;
    if (!box.hidden) {
      box.innerHTML = "<strong>范文参考（勿照抄）</strong><p>" + escapeHtml(window.LAYER3.sample) + "</p>";
    }
  }

  function finishLayer3() {
    const body = ($("#analysis-body").value || "").trim();
    if (body.length < 100) {
      $("#write-feedback").className = "feedback bad";
      $("#write-feedback").textContent = "请先完成至少约 100 字的分析段，再标记完成。";
      return;
    }
    selfCheck();
    if (state.done[3]) {
      $("#write-feedback").className = "feedback ok";
      $("#write-feedback").textContent =
        "第三层已完成。建议回到精读区，用概念色标再通读一遍，巩固主题诠释。";
    }
  }

  /* ---------- Bindings ---------- */
  function bindUI() {
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

    $("#enter-workshop").addEventListener("click", function () {
      $("#app").scrollIntoView({ behavior: "smooth" });
      goLayer(0);
    });

    $("#scroll-concepts").addEventListener("click", function () {
      $("#concepts").scrollIntoView({ behavior: "smooth" });
    });

    $all(".seg-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.colorMode = btn.dataset.mode;
        $all(".seg-btn").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        renderText();
        if (state.activeAnn >= 0 && state.colorMode !== "off") {
          showExplanation(state.activeAnn);
        }
      });
    });

    $("#clear-concept-filter").addEventListener("click", function () {
      state.conceptFilter = null;
      $all(".concept-card").forEach(function (el) {
        el.classList.remove("active");
      });
      renderText();
    });

    const tourPrev = $("#tour-prev");
    const tourNext = $("#tour-next");
    if (tourPrev) tourPrev.addEventListener("click", function () { tourStep(-1); });
    if (tourNext) tourNext.addEventListener("click", function () { tourStep(1); });

    bindTextClicks();

    $all(".legend-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        state.legendMode = tab.dataset.legend;
        $all(".legend-tab").forEach(function (t) {
          t.classList.toggle("active", t === tab);
        });
        renderLegend();
      });
    });

    $("#check-tech-presence").addEventListener("click", checkPresence);
    $("#self-check").addEventListener("click", selfCheck);
    $("#show-sample").addEventListener("click", showSample);
    $("#finish-layer3").addEventListener("click", finishLayer3);

    const hints = $("#write-hints");
    if (hints) {
      hints.addEventListener("click", function (e) {
        const chip = e.target.closest(".hint-chip");
        if (!chip) return;
        insertAtCursor($("#analysis-body"), chip.dataset.hint);
        updateCharCount();
      });
    }

    const nameInput = $("#student-name");
    nameInput.value = loadJSON(STORAGE.student, "") || "";
    nameInput.addEventListener("change", function () {
      saveJSON(STORAGE.student, nameInput.value.trim());
    });
  }

  function init() {
    const savedProgress = loadJSON(STORAGE.progress, null);
    if (savedProgress) state.done = Object.assign(state.done, savedProgress);

    renderConcepts();
    renderLegend();
    renderReadingMeta();
    renderText();
    renderLayer1();
    renderLayer2();
    renderLayer3();
    bindUI();
    updateProgressUI();
    goLayer(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
