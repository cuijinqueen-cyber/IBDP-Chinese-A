(function () {
  "use strict";

  const state = {
    closeCorrect: 0,
    techCorrect: 0,
    matchDone: false,
    writingSaved: false,
    writingChecks: {},
    selectedChip: null,
    matches: {},
    currentPrompt: 0,
    drafts: {}
  };

  const HIGHLIGHTS = [
    {
      phrase: "茫然无措的样子",
      note: "拟人：景物分担尴尬，放大公开受辱的气氛。"
    },
    {
      phrase: "芽一般的声音又怯怯冒出来",
      note: "比喻：声音如芽，写出暴力后秩序的脆弱恢复。"
    },
    {
      phrase: "被一把无形的快刀给拦腰斩断了",
      note: "核心意象：自尊心的精神创伤被具象化。"
    },
    {
      phrase: "仇恨的水草却疯了般昂扬生长",
      note: "比喻：仇恨潮湿蔓延，难以铲除。"
    },
    {
      phrase: "细嫩的芽儿来",
      note: "与前文“斩断”呼应，暗示尊严与报复欲的再生。"
    },
    {
      phrase: "像唱号歌",
      note: "把课堂与死亡礼仪并置，暗示老师的乡土生存状态。"
    },
    {
      phrase: "非暴力不合作",
      note: "软性对抗：拒绝入团，把仇恨转化为隐忍姿态。"
    },
    {
      phrase: "一笑泯之",
      note: "时间淡化仇恨，叙事视角转向成年回望。"
    },
    {
      phrase: "遍布刀斫之痕",
      note: "主旨升华：个人伤痛扩展为成长创伤的普遍书写。"
    },
    {
      phrase: "说不出的怜悯",
      note: "情感反转：仇恨让位于对衰老与底层人生的悲悯。"
    }
  ];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlightText(text) {
    let result = escapeHtml(text);
    HIGHLIGHTS.forEach(function (h) {
      const safe = escapeHtml(h.phrase);
      result = result.replace(
        safe,
        '<mark title="' +
          escapeHtml(h.note) +
          '" data-note="' +
          escapeHtml(h.note) +
          '">' +
          safe +
          "</mark>"
      );
    });
    return result;
  }

  function renderText() {
    const data = window.TEXT_DATA;
    $("#work-title").textContent = data.title;
    $("#work-author").textContent = data.author;
    $("#work-source").textContent = data.source;
    $("#work-exam").textContent = data.examNote;

    const tips = $("#ib-tips");
    tips.innerHTML = window.IB_TIPS.paper1
      .map(function (t) {
        return "<li>" + escapeHtml(t) + "</li>";
      })
      .join("");

    const body = $("#text-body");
    body.innerHTML = data.paragraphs
      .map(function (p) {
        return (
          '<div class="para reveal" id="' +
          p.id +
          '"><span class="para-num">' +
          p.num +
          "</span><p>" +
          highlightText(p.text) +
          "</p></div>"
        );
      })
      .join("");

    $all("mark", body).forEach(function (m) {
      m.addEventListener("click", function () {
        $all("mark.active", body).forEach(function (x) {
          x.classList.remove("active");
        });
        m.classList.add("active");
      });
    });
  }

  function arraysEqualAsSet(a, b) {
    if (a.length !== b.length) return false;
    const sa = a.slice().sort().join(",");
    const sb = b.slice().sort().join(",");
    return sa === sb;
  }

  function renderCloseReading() {
    const root = $("#close-reading-quiz");
    root.innerHTML = "";

    window.CLOSE_READING.forEach(function (q, idx) {
      const card = document.createElement("div");
      card.className = "card reveal";
      card.dataset.id = q.id;

      const multi = q.type === "multi";
      card.innerHTML =
        '<div class="card-tag">' +
        escapeHtml(q.layer) +
        "</div><h3>" +
        (idx + 1) +
        ". " +
        escapeHtml(q.prompt) +
        '</h3><div class="options"></div><p class="feedback" hidden></p>';

      const optionsEl = $(".options", card);
      const feedback = $(".feedback", card);
      const selected = new Set();

      q.options.forEach(function (opt, i) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option";
        btn.textContent = (multi ? "□ " : "") + opt;
        btn.addEventListener("click", function () {
          if (card.dataset.locked === "1") return;

          if (multi) {
            if (selected.has(i)) {
              selected.delete(i);
              btn.classList.remove("selected");
              btn.textContent = "□ " + opt;
            } else {
              selected.add(i);
              btn.classList.add("selected");
              btn.textContent = "☑ " + opt;
            }
          } else {
            lockSingle(card, q, i, feedback);
          }
        });
        optionsEl.appendChild(btn);
      });

      if (multi) {
        const submit = document.createElement("button");
        submit.type = "button";
        submit.className = "btn btn-secondary";
        submit.textContent = "提交本题";
        submit.addEventListener("click", function () {
          if (card.dataset.locked === "1") return;
          if (selected.size === 0) {
            feedback.hidden = false;
            feedback.textContent = "请至少选择一项后再提交。";
            return;
          }
          lockMulti(card, q, Array.from(selected), feedback);
          submit.disabled = true;
        });
        card.appendChild(submit);
      }

      root.appendChild(card);
    });
  }

  function lockSingle(card, q, chosen, feedback) {
    card.dataset.locked = "1";
    const buttons = $all(".option", card);
    buttons.forEach(function (b, i) {
      b.disabled = true;
      if (i === q.answer) b.classList.add("is-answer");
      if (i === chosen && chosen !== q.answer) b.classList.add("is-miss");
    });

    const ok = chosen === q.answer;
    if (ok) {
      state.closeCorrect += 1;
      card.classList.add("correct");
      feedback.innerHTML = "<strong>正确。</strong> " + escapeHtml(q.tip);
    } else {
      card.classList.add("wrong");
      feedback.innerHTML = "<strong>再想一想。</strong> " + escapeHtml(q.tip);
    }
    feedback.hidden = false;
    updateLayer1();
  }

  function lockMulti(card, q, chosen, feedback) {
    card.dataset.locked = "1";
    const buttons = $all(".option", card);
    buttons.forEach(function (b, i) {
      b.disabled = true;
      if (q.answer.indexOf(i) !== -1) b.classList.add("is-answer");
      if (chosen.indexOf(i) !== -1 && q.answer.indexOf(i) === -1) {
        b.classList.add("is-miss");
      }
    });

    const ok = arraysEqualAsSet(chosen, q.answer);
    if (ok) {
      state.closeCorrect += 1;
      card.classList.add("correct");
      feedback.innerHTML = "<strong>正确。</strong> " + escapeHtml(q.tip);
    } else {
      card.classList.add("wrong");
      feedback.innerHTML = "<strong>部分或全部有误。</strong> " + escapeHtml(q.tip);
    }
    feedback.hidden = false;
    updateLayer1();
  }

  function updateLayer1() {
    const total = window.CLOSE_READING.length;
    const result = $("#layer1-result");
    if (state.closeCorrect === 0 && $all("#close-reading-quiz .card[data-locked='1']").length === 0) {
      return;
    }
    const answered = $all("#close-reading-quiz .card[data-locked='1']").length;
    result.hidden = false;
    result.textContent =
      "精读进度：" +
      answered +
      "/" +
      total +
      " 题已作答；其中 " +
      state.closeCorrect +
      " 题一次答对。建议错题回到原文对应段落再读。";
    updateProgress();
  }

  function renderTechniques() {
    const root = $("#tech-quiz");
    root.innerHTML = "";

    window.TECHNIQUES.forEach(function (item, idx) {
      const card = document.createElement("div");
      card.className = "card reveal";
      card.innerHTML =
        '<div class="card-tag">手法识别</div><h3>' +
        (idx + 1) +
        ". 「" +
        escapeHtml(item.quote) +
        '」</h3><div class="options"></div><p class="feedback" hidden></p>';

      const optionsEl = $(".options", card);
      const feedback = $(".feedback", card);

      item.options.forEach(function (opt, i) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option";
        btn.textContent = opt;
        btn.addEventListener("click", function () {
          if (card.dataset.locked === "1") return;
          card.dataset.locked = "1";
          $all(".option", card).forEach(function (b, j) {
            b.disabled = true;
            if (j === item.answer) b.classList.add("is-answer");
            if (j === i && i !== item.answer) b.classList.add("is-miss");
          });
          const ok = i === item.answer;
          if (ok) {
            state.techCorrect += 1;
            card.classList.add("correct");
            feedback.innerHTML = "<strong>正确。</strong> " + escapeHtml(item.explain);
          } else {
            card.classList.add("wrong");
            feedback.innerHTML =
              "<strong>答案是「" +
              escapeHtml(item.options[item.answer]) +
              "」。</strong> " +
              escapeHtml(item.explain);
          }
          feedback.hidden = false;
          updateLayer2();
        });
        optionsEl.appendChild(btn);
      });

      root.appendChild(card);
    });
  }

  function renderMatch() {
    const techRoot = $("#match-techniques");
    const exRoot = $("#match-examples");
    techRoot.innerHTML = "";
    exRoot.innerHTML = "";
    state.matches = {};
    state.selectedChip = null;

    const techniques = shuffle(window.MATCH_PAIRS);
    const examples = shuffle(window.MATCH_PAIRS);

    techniques.forEach(function (p) {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.draggable = true;
      chip.dataset.id = p.id;
      chip.textContent = p.technique;
      chip.tabIndex = 0;

      chip.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", p.id);
        chip.classList.add("dragging");
      });
      chip.addEventListener("dragend", function () {
        chip.classList.remove("dragging");
      });
      chip.addEventListener("click", function () {
        $all(".chip.selected-chip").forEach(function (c) {
          c.classList.remove("selected-chip");
        });
        if (chip.classList.contains("used")) return;
        chip.classList.add("selected-chip");
        state.selectedChip = p.id;
      });

      techRoot.appendChild(chip);
    });

    examples.forEach(function (p) {
      const drop = document.createElement("div");
      drop.className = "drop";
      drop.dataset.id = p.id;
      drop.innerHTML =
        '<span class="drop-label">' +
        escapeHtml(p.example) +
        '</span><span class="drop-slot">放置手法</span>';

      drop.addEventListener("dragover", function (e) {
        e.preventDefault();
      });
      drop.addEventListener("drop", function (e) {
        e.preventDefault();
        placeMatch(e.dataTransfer.getData("text/plain"), drop);
      });
      drop.addEventListener("click", function () {
        if (!state.selectedChip) return;
        placeMatch(state.selectedChip, drop);
        state.selectedChip = null;
        $all(".chip.selected-chip").forEach(function (c) {
          c.classList.remove("selected-chip");
        });
      });

      exRoot.appendChild(drop);
    });

    $("#check-match").onclick = checkMatch;
  }

  function placeMatch(techId, drop) {
    if (!techId) return;

    // clear previous placement of this chip
    Object.keys(state.matches).forEach(function (dropId) {
      if (state.matches[dropId] === techId) {
        delete state.matches[dropId];
        const prev = $('.drop[data-id="' + dropId + '"]');
        if (prev) {
          prev.classList.remove("filled", "ok", "bad");
          $(".drop-slot", prev).textContent = "放置手法";
        }
      }
    });

    // free chip previously in this drop
    const old = state.matches[drop.dataset.id];
    if (old) {
      const oldChip = $('.chip[data-id="' + old + '"]');
      if (oldChip) oldChip.classList.remove("used");
    }

    const pair = window.MATCH_PAIRS.find(function (x) {
      return x.id === techId;
    });
    state.matches[drop.dataset.id] = techId;
    drop.classList.add("filled");
    drop.classList.remove("ok", "bad");
    $(".drop-slot", drop).textContent = pair ? pair.technique : techId;

    const chip = $('.chip[data-id="' + techId + '"]');
    if (chip) chip.classList.add("used");
  }

  function checkMatch() {
    const feedback = $("#match-feedback");
    const pairs = window.MATCH_PAIRS;
    let correct = 0;

    pairs.forEach(function (p) {
      const drop = $('.drop[data-id="' + p.id + '"]');
      if (!drop) return;
      drop.classList.remove("ok", "bad");
      if (state.matches[p.id] === p.id) {
        drop.classList.add("ok");
        correct += 1;
      } else if (state.matches[p.id]) {
        drop.classList.add("bad");
      }
    });

    state.matchDone = correct === pairs.length;
    feedback.textContent =
      "配对结果：" +
      correct +
      "/" +
      pairs.length +
      (state.matchDone ? "。全部正确，手法网络已建立。" : "。可调整后再检查。");
    updateLayer2();
    updateProgress();
  }

  function updateLayer2() {
    const total = window.TECHNIQUES.length;
    const answered = $all("#tech-quiz .card[data-locked='1']").length;
    const result = $("#layer2-result");
    if (answered === 0 && !state.matchDone) return;
    result.hidden = false;
    result.textContent =
      "辨法进度：选择题 " +
      state.techCorrect +
      "/" +
      total +
      " 次答对；配对 " +
      (state.matchDone ? "已完成" : "未完成") +
      "。写评论时请把手法名称落到具体词句效果上。";
    updateProgress();
  }

  function renderWriting() {
    const tabs = $("#prompt-tabs");
    tabs.innerHTML = "";

    window.WRITING_PROMPTS.forEach(function (p, i) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tab" + (i === 0 ? " active" : "");
      btn.setAttribute("role", "tab");
      btn.textContent = p.title;
      btn.addEventListener("click", function () {
        // save current draft
        state.drafts[state.currentPrompt] = $("#essay-input").value;
        state.currentPrompt = i;
        $all(".tab", tabs).forEach(function (t) {
          t.classList.remove("active");
        });
        btn.classList.add("active");
        showPrompt(i);
      });
      tabs.appendChild(btn);
    });

    $("#show-sample").onclick = function () {
      const box = $("#sample-box");
      const p = window.WRITING_PROMPTS[state.currentPrompt];
      box.hidden = !box.hidden;
      box.textContent = p.sampleStart;
    };

    $("#save-draft").onclick = function () {
      state.drafts[state.currentPrompt] = $("#essay-input").value;
      try {
        localStorage.setItem(
          "wenmai-drafts",
          JSON.stringify(state.drafts)
        );
      } catch (e) {
        /* ignore */
      }
      state.writingSaved = Object.values(state.drafts).some(function (v) {
        return v && v.trim().length > 40;
      });
      const result = $("#layer3-result");
      result.hidden = false;
      result.textContent = state.writingSaved
        ? "草稿已保存。请用右侧自评清单检查论证是否完整，再对照原文修订。"
        : "请至少写出约 40 字以上的分析段落后再保存。";
      updateProgress();
    };

    $("#essay-input").addEventListener("input", function () {
      state.drafts[state.currentPrompt] = $("#essay-input").value;
    });

    try {
      const saved = JSON.parse(localStorage.getItem("wenmai-drafts") || "{}");
      state.drafts = saved;
    } catch (e) {
      state.drafts = {};
    }

    showPrompt(0);
  }

  function showPrompt(index) {
    const p = window.WRITING_PROMPTS[index];
    const scaffold = $("#scaffold");
    scaffold.innerHTML =
      "<h3>" +
      escapeHtml(p.title) +
      '</h3><p class="scaffold-q">' +
      escapeHtml(p.question) +
      "</p><dl>" +
      "<dt>论点 Claim</dt><dd>" +
      escapeHtml(p.scaffold.claim) +
      "</dd>" +
      "<dt>证据 Evidence</dt><dd>" +
      escapeHtml(p.scaffold.evidence) +
      "</dd>" +
      "<dt>分析 Analysis</dt><dd>" +
      escapeHtml(p.scaffold.analysis) +
      "</dd>" +
      "<dt>回扣 Link</dt><dd>" +
      escapeHtml(p.scaffold.link) +
      "</dd></dl>";

    $("#essay-input").value = state.drafts[index] || "";
    $("#sample-box").hidden = true;

    const criteria = $("#criteria");
    const key = "w" + index;
    if (!state.writingChecks[key]) state.writingChecks[key] = {};

    criteria.innerHTML =
      "<h4>自评要点</h4>" +
      p.criteria
        .map(function (c, i) {
          const id = key + "-" + i;
          const checked = state.writingChecks[key][i] ? " checked" : "";
          return (
            '<label><input type="checkbox" data-key="' +
            key +
            '" data-i="' +
            i +
            '" id="' +
            id +
            '"' +
            checked +
            " /> <span>" +
            escapeHtml(c) +
            "</span></label>"
          );
        })
        .join("");

    $all('input[type="checkbox"]', criteria).forEach(function (input) {
      input.addEventListener("change", function () {
        const k = input.dataset.key;
        const i = Number(input.dataset.i);
        state.writingChecks[k][i] = input.checked;
        const allChecked = Object.values(state.writingChecks).some(function (group) {
          return Object.values(group).filter(Boolean).length >= 2;
        });
        if (allChecked && ($("#essay-input").value || "").trim().length > 40) {
          state.writingSaved = true;
          const result = $("#layer3-result");
          result.hidden = false;
          result.textContent =
            "你已完成草稿与部分自评。可切换其他题目继续练习，或回到原文核对引文准确性。";
          updateProgress();
        }
      });
    });
  }

  function layer1Done() {
    return (
      $all("#close-reading-quiz .card[data-locked='1']").length ===
      window.CLOSE_READING.length
    );
  }

  function layer2Done() {
    return (
      $all("#tech-quiz .card[data-locked='1']").length ===
        window.TECHNIQUES.length && state.matchDone
    );
  }

  function layer3Done() {
    return state.writingSaved;
  }

  function updateProgress() {
    let done = 0;
    if (layer1Done()) done += 1;
    if (layer2Done()) done += 1;
    if (layer3Done()) done += 1;
    const pct = (done / 3) * 100;
    $("#global-progress").style.width = pct + "%";
    $("#global-progress-text").textContent = done + " / 3 层完成";
  }

  function observeReveal() {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $all(".reveal").forEach(function (el) {
      io.observe(el);
    });
  }

  function init() {
    renderText();
    renderCloseReading();
    renderTechniques();
    renderMatch();
    renderWriting();
    updateProgress();
    observeReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
