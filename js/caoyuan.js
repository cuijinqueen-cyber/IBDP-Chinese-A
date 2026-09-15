(() => {
  const KEY = "caoyuan-myp-v2";
  const scenes = [
    {
      kicker: "第一幕 · 景",
      title: "一碧千里的草原",
      body: [
        "作者初入草原，先写天、空气、小丘、羊群与牛马。风光不是冷冰冰的说明书，而是带着心情的画面。",
        "读的时候想：哪些词让你“看见颜色/形状”，哪些词让你感到作者的愉快？"
      ],
      q: "这段最能建立“地方感”的是什么？",
      opts: [
        { t: "颜色与开阔（一碧千里、翠色欲流）", tip: "对。场景描写先把读者“放进”地方，后面的人情才有落点。" },
        { t: "只写“草原很美”", tip: "太抽象。美要靠具体可见的细节。" },
        { t: "直接写民族团结", tip: "还早。先立住地方，再写相遇。" }
      ]
    },
    {
      kicker: "第二幕 · 遇",
      title: "迎客与相见",
      body: [
        "远处群马疾驰、襟飘带舞，像彩虹飞来；主客相见，握手、欢笑，稍感拘束后又亲热起来。",
        "注意关系变化：从“有一点拘束”到自然亲近——联系是怎样开始的？"
      ],
      q: "哪一点最能体现“热情的联系”？",
      opts: [
        { t: "具体迎客动作与场面（疾驰、飞来、握手）", tip: "很好。友谊首先被行动看见，而不是被口号宣布。" },
        { t: "只说“他们很热情”", tip: "缺少证据。回到动作与场面。" },
        { t: "风景突然消失了", tip: "景仍在，但镜头转向人与关系。" }
      ]
    },
    {
      kicker: "第三幕 · 待",
      title: "款待与联欢",
      body: [
        "奶茶、手抓羊肉、敬酒、歌舞、摔跤……民俗场面写出主人的心意，也写出文化交流的温度。",
        "想一想：共同进餐、共同歌舞，为什么容易拉近人？"
      ],
      q: "款待场面在主题上起什么作用？",
      opts: [
        { t: "把“情深”落到可感的共享体验", tip: "正是。主题靠场面支撑，全球背景也因此具体起来。" },
        { t: "只是介绍菜单", tip: "不止介绍，更在建立关系。" },
        { t: "与开头风光无关", tip: "仍有联系：地方文化通过待客方式显现。" }
      ]
    },
    {
      kicker: "第四幕 · 别",
      title: "话别与诗意收束",
      body: [
        "夕阳下，主客依依不舍。结尾把景与情焊在一起：碧草斜阳，成为情感的容器。",
        "景不是装饰，而是关系的见证。"
      ],
      q: "结尾为何有力？",
      opts: [
        { t: "景情合一，点明跨民族情谊", tip: "准确。这也回应全球背景：身份不同，仍可建立深层联系。" },
        { t: "因为太阳落山了", tip: "时间有意，但核心是情与景的融合。" },
        { t: "因为要考试默写", tip: "默写是手段；理解联系才是目标。" }
      ]
    }
  ];

  const scaffolds = {
    basic: {
      tip: "基础三段：场合 → 经过 → 感受。",
      steps: ["在哪里遇到谁", "发生了什么（动作）", "我明白了什么"],
      insert: "在______，我遇到了______。\n起初我觉得______；后来因为______，我感到______。\n这次相遇让我明白：联系往往开始于______。"
    },
    change: {
      tip: "关系变化：把“拘束→亲近”写清楚。",
      steps: ["写出起初的距离感", "写出改变关系的一个行动", "写出之后的心情"],
      insert: "刚见面时，我有点______。\n直到他/她______（具体动作），我才觉得______。\n从那一刻起，______。"
    },
    link: {
      tip: "联系草原：借课文写法，写你的相遇。",
      steps: ["点出相似的“热情/接纳”", "写出不同之处", "收在自己的理解"],
      insert: "像《草原》里的相遇一样，我也曾感受到______。\n不同的是，我的故事发生在______：______。\n我因此懂得，真正的联系是______。"
    }
  };

  const panel = document.getElementById("panel");
  const tabs = [...document.querySelectorAll(".tab")];
  const essay = document.getElementById("essay");
  let bank = new Map();
  let scaf = "basic";

  document.querySelectorAll(".acc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.nextElementSibling.hidden = open;
    });
  });

  function render(i) {
    const s = scenes[i];
    tabs.forEach((t, idx) => t.classList.toggle("on", idx === i));
    panel.innerHTML = `
      <span class="kicker">${s.kicker}</span>
      <h3>${s.title}</h3>
      ${s.body.map((p) => `<p>${p}</p>`).join("")}
      <div class="think"><strong>想一想：</strong>${s.q}
        <div class="opts">${s.opts.map((o, n) => `<button type="button" class="opt" data-n="${n}">${o.t}</button>`).join("")}</div>
        <p class="tip" id="tip"></p>
      </div>`;
    panel.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        panel.querySelectorAll(".opt").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        document.getElementById("tip").textContent = s.opts[Number(btn.dataset.n)].tip;
      });
    });
  }
  tabs.forEach((t) => t.addEventListener("click", () => render(Number(t.dataset.i))));
  render(0);

  function refreshBank() {
    const list = [...bank.values()];
    document.getElementById("bankN").textContent = String(list.length);
    document.getElementById("bankHint").classList.toggle("hide", list.length > 0);
    document.getElementById("bank").innerHTML = list.map((x) => `<li><em>${x.tag}</em>${x.line}</li>`).join("");
    const chips = document.getElementById("chips");
    if (!list.length) chips.innerHTML = `<p class="hint">先去“品语言”收藏语句。</p>`;
    else {
      chips.innerHTML = list.map((x) => `<button type="button" data-t="${x.line}">${x.line.slice(0, 12)}…</button>`).join("");
      chips.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => insert(b.dataset.t)));
    }
  }

  document.querySelectorAll(".hot").forEach((btn) => {
    btn.addEventListener("click", () => {
      const line = btn.dataset.line;
      if (bank.has(line)) { bank.delete(line); btn.classList.remove("on"); }
      else { bank.set(line, { line, tag: btn.dataset.tag }); btn.classList.add("on"); }
      refreshBank();
    });
  });

  document.querySelectorAll(".side").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".side").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      const ev = document.getElementById("debate").value.trim();
      const msg = document.getElementById("debateMsg");
      if (!ev) { msg.textContent = "先选立场，再写一条课文证据，观点才站得住。"; return; }
      msg.textContent = btn.dataset.side === "no"
        ? "你强调行动与真诚。回看迎客、款待细节，它们正是跨文化联系的证据。"
        : "你强调共同背景的作用。也可追问：没有共同背景时，哪些行动仍能建立信任？";
    });
  });

  function renderScaf(key) {
    scaf = key;
    document.querySelectorAll(".scaf").forEach((b) => b.classList.toggle("on", b.dataset.s === key));
    const s = scaffolds[key];
    document.getElementById("tips").innerHTML = `<strong>${s.tip}</strong><ol>${s.steps.map((x) => `<li>${x}</li>`).join("")}</ol>`;
  }
  document.querySelectorAll(".scaf").forEach((b) => b.addEventListener("click", () => renderScaf(b.dataset.s)));
  renderScaf("basic");

  function insert(text) {
    const a = essay.selectionStart, b = essay.selectionEnd;
    essay.value = essay.value.slice(0, a) + text + essay.value.slice(b);
    essay.focus();
    essay.setSelectionRange(a + text.length, a + text.length);
    count();
  }
  function nchar(t) { return t.replace(/\s/g, "").length; }
  function count() {
    const n = nchar(essay.value);
    let tip = "目标 100–150 字";
    if (n >= 100 && n <= 150) tip = "篇幅合适，检查细节";
    else if (n > 150) tip = "可以精修句子";
    else if (n > 0) tip = "继续把动作写具体";
    document.getElementById("stat").textContent = `当前约 ${n} 字 · ${tip}`;
  }
  essay.addEventListener("input", count);

  document.getElementById("btnFrame").addEventListener("click", () => {
    const draft = scaffolds[scaf].insert;
    if (essay.value.trim()) {
      if (confirm("当前已有文字。要用句架替换吗？（取消则追加）")) essay.value = draft;
      else essay.value = `${essay.value.trim()}\n\n${draft}`;
    } else essay.value = draft;
    count(); essay.focus();
  });
  document.getElementById("btnCount").addEventListener("click", count);

  document.getElementById("btnCheck").addEventListener("click", () => {
    const text = essay.value.trim();
    const n = nchar(text);
    const checks = {
      place: /在|时候|学校|家|路上|旅行|社区|餐厅|教室|草原/.test(text),
      action: (text.match(/着|了|握手|笑|跑|迎|请|帮|送|坐|唱|跳|递|拉|走|问|答/g) || []).length >= 2,
      change: /起初|后来|开始|终于|才觉得|不再|变得|拘束|亲近|温暖/.test(text),
      len: n >= 100 && n <= 180,
      idea: /联系|理解|接纳|友谊|不同|尊重|温暖|桥梁|相遇/.test(text)
    };
    Object.entries(checks).forEach(([k, pass]) => {
      const li = document.querySelector(`.rubric li[data-k="${k}"]`);
      li.classList.toggle("pass", pass);
      li.classList.toggle("fail", !pass);
    });
    const score = Object.values(checks).filter(Boolean).length;
    const msg = document.getElementById("checkMsg");
    if (score === 5) msg.textContent = "很出色！你已经在用概念写作。大声读一遍，听听节奏。";
    else if (score >= 3) msg.textContent = `已达成 ${score}/5。对照未勾选项再改一版。`;
    else msg.textContent = `目前 ${score}/5。先插入句架，再补动作与“联系”感悟。`;
  });

  function gather() {
    return {
      a1: a1.value, a2: a2.value, a3: a3.value,
      colScene: colScene.value, colPeople: colPeople.value,
      debate: debate.value, essay: essay.value, scaf,
      bank: [...bank.values()],
      r1: r1.value, r2: r2.value, r3: r3.value, actionQ: actionQ.value
    };
  }
  function apply(d) {
    if (!d) return;
    a1.value = d.a1 || ""; a2.value = d.a2 || ""; a3.value = d.a3 || "";
    colScene.value = d.colScene || ""; colPeople.value = d.colPeople || "";
    debate.value = d.debate || ""; essay.value = d.essay || "";
    r1.value = d.r1 || ""; r2.value = d.r2 || ""; r3.value = d.r3 || ""; actionQ.value = d.actionQ || "";
    if (d.scaf) renderScaf(d.scaf);
    bank = new Map((d.bank || []).map((x) => [x.line, x]));
    document.querySelectorAll(".hot").forEach((b) => b.classList.toggle("on", bank.has(b.dataset.line)));
    count(); refreshBank();
  }

  btnSave.addEventListener("click", () => {
    localStorage.setItem(KEY, JSON.stringify(gather()));
    saveMsg.textContent = "已保存在本机浏览器，下次打开可继续。";
  });

  try { apply(JSON.parse(localStorage.getItem(KEY) || "null")); } catch {}
  count(); refreshBank();
})();
