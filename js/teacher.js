(function () {
  "use strict";

  let filter = "all";
  let currentId = null;
  let cache = [];

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  async function refresh() {
    const status = filter === "all" ? null : filter;
    cache = await window.WenmaiAPI.list(status);
    renderQueue();
    if (currentId) {
      const still = cache.find(function (x) {
        return x.id === currentId;
      });
      if (still) renderDetail(still);
      else {
        currentId = null;
        $("#review-pane").innerHTML =
          '<p class="hint empty-hint">从左侧选择一份作业开始点评。</p>';
      }
    }
  }

  function renderQueue() {
    const ul = $("#queue-list");
    const empty = $("#queue-empty");
    if (!cache.length) {
      ul.innerHTML = "";
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    ul.innerHTML = cache
      .map(function (s) {
        const tag =
          s.status === "reviewed"
            ? '<span class="status-tag reviewed">已复审</span>'
            : '<span class="status-tag">待复审</span>';
        const active = s.id === currentId ? " active" : "";
        return (
          '<li><button type="button" class="queue-item' +
          active +
          '" data-id="' +
          escapeHtml(s.id) +
          '"><div class="qi-top"><strong>' +
          escapeHtml(s.student) +
          "</strong>" +
          tag +
          '</div><div class="qi-title">' +
          escapeHtml(s.promptTitle || "未命题") +
          '</div><div class="qi-meta">' +
          new Date(s.createdAt).toLocaleString() +
          " · AI " +
          (s.ai ? s.ai.total + "/40" : "—") +
          (s.teacher && s.teacher.score != null
            ? " · 师评 " + s.teacher.score + "/40"
            : "") +
          "</div></button></li>"
        );
      })
      .join("");

    $all(".queue-item", ul).forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentId = btn.dataset.id;
        const item = cache.find(function (x) {
          return x.id === currentId;
        });
        renderQueue();
        if (item) renderDetail(item);
      });
    });
  }

  function renderDetail(s) {
    const pane = $("#review-pane");
    const aiHtml = s.ai
      ? window.AIGrader.renderReport(s.ai)
      : "<p class='hint'>无 AI 初评数据。</p>";
    const teacherScore =
      s.teacher && s.teacher.score != null
        ? s.teacher.score
        : s.ai
          ? s.ai.total
          : 0;
    const teacherComment = (s.teacher && s.teacher.comment) || "";

    pane.innerHTML =
      '<header class="review-head">' +
      "<div><p class='eyebrow'>学生作文</p><h2>" +
      escapeHtml(s.student) +
      " · " +
      escapeHtml(s.promptTitle || "") +
      "</h2><p class='lead'>" +
      escapeHtml(s.promptQuestion || "") +
      "</p></div>" +
      '<span class="status-tag' +
      (s.status === "reviewed" ? " reviewed" : "") +
      '">' +
      (s.status === "reviewed" ? "已复审" : "待复审") +
      "</span></header>" +
      '<article class="essay-view"><pre>' +
      escapeHtml(s.body) +
      "</pre></article>" +
      '<section class="ai-box"><h3>AI 初评</h3><div class="ai-report">' +
      aiHtml +
      "</div></section>" +
      '<section class="teacher-form-card">' +
      "<h3>教师二次审核</h3>" +
      '<label class="field-label" for="t-comment">复审评语</label>' +
      '<textarea id="t-comment" placeholder="补充、纠正或认可 AI 初评；指出论证亮点与修改方向……">' +
      escapeHtml(teacherComment) +
      "</textarea>" +
      '<label class="field-label" for="t-score">确认总分（/40）</label>' +
      '<input id="t-score" type="number" min="0" max="40" value="' +
      teacherScore +
      '" />' +
      '<div class="review-actions">' +
      '<button class="btn btn-primary" id="save-review" type="button">保存点评</button>' +
      '<p class="feedback" id="save-feedback"></p>' +
      "</div></section>";

    $("#save-review").onclick = async function () {
      const comment = $("#t-comment").value.trim();
      const score = Number($("#t-score").value);
      try {
        const updated = await window.WenmaiAPI.review(s.id, comment, score);
        $("#save-feedback").textContent =
          "已保存点评 · " +
          new Date(updated.teacher.reviewedAt).toLocaleString();
        await refresh();
        currentId = updated.id;
        renderDetail(updated);
      } catch (e) {
        $("#save-feedback").textContent = "保存失败，请检查服务是否启动。";
      }
    };
  }

  function bind() {
    $("#refresh-btn").onclick = refresh;
    $("#export-btn").onclick = async function () {
      const items = await window.WenmaiAPI.list();
      const blob = new Blob([JSON.stringify(items, null, 2)], {
        type: "application/json"
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "wenmai-teacher-reviews.json";
      a.click();
    };
    $all(".filter").forEach(function (btn) {
      btn.addEventListener("click", function () {
        filter = btn.dataset.filter;
        $all(".filter").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        refresh();
      });
    });
  }

  function init() {
    bind();
    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
