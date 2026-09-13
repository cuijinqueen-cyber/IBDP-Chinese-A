/* 竹节人互动课逻辑 */
(() => {
  const STORAGE_KEY = "zhujieren-lesson-v1";

  const stages = [
    {
      kicker: "第一幕 · 做",
      title: "把毛笔杆变成小人",
      body: [
        "把毛笔杆锯成寸把长的一截，这就是竹节人的脑袋连同身躯了；再锯八截短的，分别当四肢；用线穿在一起，就成了。",
        "材料很普通，乐趣却自己长出来——亲手做成的玩具，往往更叫人着迷。",
      ],
      question: "为什么“自己做”会让玩具更有意思？",
      choices: [
        { label: "因为花了心思，有成就感", tip: "对，参与感会加深情感连接——写作时也可以写“我怎样做成它”。" },
        { label: "因为竹子很贵", tip: "不完全是价钱。想想：动手过程本身就是故事的一部分。" },
        { label: "因为老师让做的", tip: "课文里是孩子们自发着迷。再读读“迷上了”的语气。" },
      ],
    },
    {
      kicker: "第二幕 · 斗",
      title: "课桌上的小小战场",
      body: [
        "把线嵌入课桌裂缝，一拉紧，竹节人便叉腿张胳膊，威风凛凛。两个放一起，就没头没脑地对打，不知疲倦。",
        "下课时教室里跺脚拍手、咋咋呼呼；上课了还手痒痒，把课本竖起来当屏风继续搏。",
      ],
      question: "这段最能写出“热闹”的，是哪一类描写？",
      choices: [
        { label: "动作与声音（跺脚拍手、咋咋呼呼）", tip: "很好！动作+声音能让读者“看见又听见”。写作时优先练这一招。" },
        { label: "只写“大家都很开心”", tip: "太抽象。读者需要具体画面，而不是结论。" },
        { label: "写竹节人的价钱", tip: "价钱不是这一幕重点。回到“怎么玩、怎么闹”。" },
      ],
    },
    {
      kicker: "第三幕 · 反转",
      title: "老师也在玩",
      body: [
        "竹节人被没收，大家又沮丧又悻悻然。可路过办公室，却见老师全神贯注、津津有味地玩着竹节人。",
        "怨恨一下子没了——原来大人也会被“好玩”抓住。",
      ],
      question: "这个结尾为什么有力？",
      choices: [
        { label: "写出了心情转折，也写出了共同的人性", tip: "正是如此：好故事常有“意外却合理”的转折。你可以在作文里也试一次小反转。" },
        { label: "因为老师被批评了", tip: "课文没有批评老师，反而让孩子们释然。再品“津津有味”。" },
        { label: "因为竹节人坏了", tip: "重点不是坏不坏，而是谁在玩、心情如何变。" },
      ],
    },
  ];

  const scaffolds = {
    basic: {
      tip: "基础三段：先亮出玩具，再写怎么玩，最后写感受。",
      steps: ["开头：我小时候最迷……", "经过：它……；我常常……", "感受：玩的时候，我觉得……"],
      insert: "我小时候最迷______。\n它长得______，玩的时候我会______，还会______。\n每次玩到______，心里都______。",
    },
    detail: {
      tip: "动作放大：把一个瞬间拆成连续动作，像慢镜头。",
      steps: ["选定一个精彩瞬间", "连续写出 3 个动作", "补上声音或样子"],
      insert: "最精彩的一次是______。\n我先______，再______，接着______。\n耳边只听见______，那个样子真是______。",
    },
    compare: {
      tip: "与竹节人比较：借课文词语，写出你的独特之处。",
      steps: ["点出相似的“迷”", "写出不同的玩法", "收在自己的感受上"],
      insert: "像课文里的竹节人一样，我也曾______。\n不同的是，我的______是这样玩的：______。\n如今回想，依然______。",
    },
  };

  const moodLines = [
    { max: 25, text: "竹节人被没收了……心里酸酸的，又怨又沮丧。" },
    { max: 50, text: "路过办公室，心里还在嘀咕：老师太不近人情了吧？" },
    { max: 75, text: "咦？老师怎会也……全神贯注地盯着竹节人？" },
    { max: 100, text: "原来老师也爱玩！悻悻然一扫而光，心里竟有点得意。" },
  ];

  // Elements
  const stagePanel = document.getElementById("stagePanel");
  const stageTabs = [...document.querySelectorAll(".stage-tab")];
  const bankList = document.getElementById("bankList");
  const bankEmpty = document.getElementById("bankEmpty");
  const insertBank = document.getElementById("insertBank");
  const wordCount = document.getElementById("wordCount");
  const essay = document.getElementById("essay");
  const scaffoldTips = document.getElementById("scaffoldTips");
  let collected = new Map();
  let currentScaffold = "basic";
  let currentStage = 0;

  /* ----- Prompt accordions ----- */
  document.querySelectorAll(".prompt-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });

  /* ----- Story stages ----- */
  function renderStage(index) {
    currentStage = index;
    const stage = stages[index];
    stageTabs.forEach((tab, i) => {
      tab.classList.toggle("is-active", i === index);
      tab.setAttribute("aria-selected", String(i === index));
    });

    stagePanel.innerHTML = `
      <span class="stage-kicker">${stage.kicker}</span>
      <h3>${stage.title}</h3>
      ${stage.body.map((p) => `<p>${p}</p>`).join("")}
      <div class="think-prompt">
        <strong>想一想：</strong>${stage.question}
        <div class="choice-row">
          ${stage.choices
            .map(
              (c, i) =>
                `<button type="button" class="choice-btn" data-choice="${i}">${c.label}</button>`
            )
            .join("")}
        </div>
        <p class="choice-feedback" id="choiceFeedback"></p>
      </div>
    `;

    stagePanel.querySelectorAll(".choice-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.choice);
        stagePanel.querySelectorAll(".choice-btn").forEach((b) => b.classList.remove("is-picked"));
        btn.classList.add("is-picked");
        const fb = document.getElementById("choiceFeedback");
        fb.textContent = stage.choices[i].tip;
      });
    });
  }

  stageTabs.forEach((tab) => {
    tab.addEventListener("click", () => renderStage(Number(tab.dataset.stage)));
  });

  renderStage(0);

  /* ----- Retell check ----- */
  document.getElementById("checkRetell").addEventListener("click", () => {
    const text = document.getElementById("retell").value.trim();
    const fb = document.getElementById("retellFeedback");
    if (!text) {
      fb.textContent = "先试着写一句完整的复述吧。";
      fb.className = "inline-feedback is-warn";
      return;
    }
    const hasFlow =
      (text.includes("先") && text.includes("再") && text.includes("最后")) ||
      (text.includes("首先") && (text.includes("然后") || text.includes("接着")));
    const mentions = ["做", "斗", "玩", "老师"].filter((k) => text.includes(k)).length;
    if (hasFlow && mentions >= 2) {
      fb.textContent = "结构清楚！你已经能把故事线讲明白——写作时也用这条线。";
      fb.className = "inline-feedback is-ok";
    } else if (hasFlow) {
      fb.textContent = "顺序词用得不错。试着把“做 / 斗 / 老师”三件事都点到。";
      fb.className = "inline-feedback is-warn";
    } else {
      fb.textContent = "试试用“先……再……最后……”把三幕串起来。";
      fb.className = "inline-feedback is-warn";
    }
  });

  /* ----- Word hunt ----- */
  function refreshBankUI() {
    const words = [...collected.values()];
    wordCount.textContent = String(words.length);
    bankEmpty.classList.toggle("is-hidden", words.length > 0);

    bankList.innerHTML = words
      .map((w) => `<li data-tag="${w.tag}">${w.word}</li>`)
      .join("");

    if (!words.length) {
      insertBank.innerHTML = `<p class="empty-note">去“词语猎人”收集生动词语吧。</p>`;
    } else {
      insertBank.innerHTML = words
        .map(
          (w) =>
            `<button type="button" data-tag="${w.tag}" data-insert="${w.word}">${w.word}</button>`
        )
        .join("");
      insertBank.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => insertAtCursor(btn.dataset.insert));
      });
    }

    const floatList = document.getElementById("floatBankList");
    if (floatList) {
      floatList.innerHTML = words.map((w) => `<li>${w.word}</li>`).join("") || "<li>暂无</li>";
    }
  }

  document.querySelectorAll(".word-hot").forEach((btn) => {
    btn.addEventListener("click", () => {
      const word = btn.dataset.word;
      const tag = btn.dataset.tag;
      if (collected.has(word)) {
        collected.delete(word);
        btn.classList.remove("is-collected");
      } else {
        collected.set(word, { word, tag });
        btn.classList.add("is-collected");
        btn.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.08)" },
            { transform: "scale(1)" },
          ],
          { duration: 280, easing: "ease-out" }
        );
      }
      refreshBankUI();
    });
  });

  function insertAtCursor(text) {
    const start = essay.selectionStart;
    const end = essay.selectionEnd;
    const value = essay.value;
    const spacer = start > 0 && !/\s$/.test(value.slice(0, start)) ? "" : "";
    essay.value = value.slice(0, start) + spacer + text + value.slice(end);
    const pos = start + spacer.length + text.length;
    essay.focus();
    essay.setSelectionRange(pos, pos);
    updateWordStat();
  }

  /* ----- Mood slider ----- */
  const moodSlider = document.getElementById("moodSlider");
  const moodCaption = document.getElementById("moodCaption");

  function updateMood() {
    const v = Number(moodSlider.value);
    const line = moodLines.find((m) => v <= m.max) || moodLines.at(-1);
    moodCaption.style.opacity = "0";
    requestAnimationFrame(() => {
      moodCaption.textContent = line.text;
      moodCaption.style.opacity = "1";
    });
  }

  moodSlider.addEventListener("input", updateMood);

  /* ----- Writing scaffolds ----- */
  function renderScaffold(key) {
    currentScaffold = key;
    document.querySelectorAll(".scaffold-btn").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.scaffold === key);
    });
    const s = scaffolds[key];
    scaffoldTips.innerHTML = `
      <strong>${s.tip}</strong>
      <ol>${s.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    `;
  }

  document.querySelectorAll(".scaffold-btn").forEach((btn) => {
    btn.addEventListener("click", () => renderScaffold(btn.dataset.scaffold));
  });

  document.getElementById("insertScaffold").addEventListener("click", () => {
    const draft = scaffolds[currentScaffold].insert;
    if (essay.value.trim()) {
      const ok = confirm("当前已有文字。要用句架替换吗？（取消则追加在末尾）");
      if (ok) essay.value = draft;
      else essay.value = `${essay.value.trim()}\n\n${draft}`;
    } else {
      essay.value = draft;
    }
    essay.focus();
    updateWordStat();
  });

  function countChineseChars(text) {
    return text.replace(/\s/g, "").length;
  }

  function updateWordStat() {
    const n = countChineseChars(essay.value);
    const el = document.getElementById("wordStat");
    let hint = "可以再写具体一点";
    if (n >= 80 && n <= 120) hint = "篇幅刚好，检查细节吧";
    else if (n > 120) hint = "已经够长，可以精修句子";
    else if (n === 0) hint = "目标 80–120 字";
    el.textContent = `当前约 ${n} 字 · ${hint}`;
  }

  essay.addEventListener("input", updateWordStat);
  document.getElementById("countWords").addEventListener("click", updateWordStat);

  document.getElementById("runChecklist").addEventListener("click", () => {
    const text = essay.value.trim();
    const n = countChineseChars(text);
    const checks = {
      structure:
        /开头|小时候|最迷|感受|觉得|开心|快乐|难忘/.test(text) ||
        (text.includes("。") && text.split("。").filter(Boolean).length >= 3),
      action: (text.match(/着|了|起来|跑|跳|抓|扔|转|追|拍|打|拉|推|拼|搭|滚|飞|喊|冲/g) || []).length >= 2,
      feeling: /觉得|开心|快乐|兴奋|着迷|喜欢|难忘|心里|高兴|有趣|过瘾|满足/.test(text),
      length: n >= 80 && n <= 150,
      vivid: [...collected.keys()].some((w) => text.includes(w)) || /威风|津津|全神|不知疲倦|跺脚|咋咋/.test(text),
    };

    Object.entries(checks).forEach(([key, pass]) => {
      const li = document.querySelector(`.checklist li[data-key="${key}"]`);
      li.classList.toggle("is-pass", pass);
      li.classList.toggle("is-fail", !pass);
    });

    const passed = Object.values(checks).filter(Boolean).length;
    const msg = document.getElementById("checklistMsg");
    if (passed === 5) {
      msg.textContent = "太棒了！你已经在用阅读里的方法写作。大声朗读一遍，听听节奏。";
    } else if (passed >= 3) {
      msg.textContent = `已达成 ${passed}/5 项。对照未勾选项，再改一版会更精彩。`;
    } else {
      msg.textContent = `目前 ${passed}/5 项。先插入句架，再从词库点 2–3 个词进去试试。`;
    }
  });

  /* ----- Floating bank ----- */
  const floatBank = document.getElementById("floatBank");
  document.getElementById("wordbankChip").addEventListener("click", () => {
    floatBank.hidden = !floatBank.hidden;
  });
  document.getElementById("closeBank").addEventListener("click", () => {
    floatBank.hidden = true;
  });

  /* ----- Save / restore ----- */
  function gatherState() {
    return {
      ans1: document.getElementById("ans1").value,
      ans2: document.getElementById("ans2").value,
      ans3: document.getElementById("ans3").value,
      retell: document.getElementById("retell").value,
      mood: moodSlider.value,
      moodWrite: document.getElementById("moodWrite").value,
      essay: essay.value,
      scaffold: currentScaffold,
      stage: currentStage,
      words: [...collected.values()],
      refRead: document.getElementById("refRead").value,
      refHard: document.getElementById("refHard").value,
      refNext: document.getElementById("refNext").value,
      inquiryQ: document.getElementById("inquiryQ").value,
    };
  }

  function applyState(data) {
    if (!data) return;
    document.getElementById("ans1").value = data.ans1 || "";
    document.getElementById("ans2").value = data.ans2 || "";
    document.getElementById("ans3").value = data.ans3 || "";
    document.getElementById("retell").value = data.retell || "";
    moodSlider.value = data.mood || 15;
    document.getElementById("moodWrite").value = data.moodWrite || "";
    essay.value = data.essay || "";
    document.getElementById("refRead").value = data.refRead || "";
    document.getElementById("refHard").value = data.refHard || "";
    document.getElementById("refNext").value = data.refNext || "";
    document.getElementById("inquiryQ").value = data.inquiryQ || "";
    if (data.scaffold) renderScaffold(data.scaffold);
    if (typeof data.stage === "number") renderStage(data.stage);
    collected = new Map((data.words || []).map((w) => [w.word, w]));
    document.querySelectorAll(".word-hot").forEach((btn) => {
      btn.classList.toggle("is-collected", collected.has(btn.dataset.word));
    });
    updateMood();
    updateWordStat();
    refreshBankUI();
  }

  document.getElementById("saveProgress").addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gatherState()));
    const status = document.getElementById("saveStatus");
    status.textContent = "已保存在本机浏览器。下次打开还能继续。";
  });

  /* ----- Scroll reveal ----- */
  const revealEls = document.querySelectorAll(
    ".section-inner > h2, .section-lead, .prompt-stack, .story-stages, .hunt-layout, .write-layout, .reflect-grid, .mood-lab, .retell-box, .action-block"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* init */
  try {
    applyState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"));
  } catch {
    /* ignore */
  }
  renderScaffold(currentScaffold);
  updateMood();
  updateWordStat();
  refreshBankUI();
})();
