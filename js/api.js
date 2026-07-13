/* 文脉提交通道 API 客户端（同源优先，失败时回退 localStorage） */
window.WenmaiAPI = (function () {
  const STORAGE_KEY = "wenmai-submissions-v2";

  function loadLocal() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function saveLocal(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      /* ignore */
    }
  }

  async function request(path, options) {
    const res = await fetch(path, options);
    if (!res.ok) {
      const err = new Error("api_error_" + res.status);
      err.status = res.status;
      throw err;
    }
    return res.json();
  }

  return {
    storageKey: STORAGE_KEY,

    async health() {
      try {
        const data = await request("/api/health");
        return !!data.ok;
      } catch (e) {
        return false;
      }
    },

    async list(status) {
      try {
        const q = status ? "?status=" + encodeURIComponent(status) : "";
        const data = await request("/api/submissions" + q);
        saveLocal(data.items || []);
        return data.items || [];
      } catch (e) {
        let items = loadLocal();
        if (status) items = items.filter(function (x) { return x.status === status; });
        return items;
      }
    },

    async create(payload) {
      try {
        const data = await request("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const items = loadLocal();
        items.unshift(data.item);
        saveLocal(items);
        return data.item;
      } catch (e) {
        const item = Object.assign(
          {
            id: "s_local_" + Date.now().toString(36),
            status: "pending_teacher",
            createdAt: new Date().toISOString(),
            teacher: null
          },
          payload
        );
        const items = loadLocal();
        items.unshift(item);
        saveLocal(items);
        return item;
      }
    },

    async review(id, comment, score) {
      try {
        const data = await request("/api/submissions/" + encodeURIComponent(id), {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: comment, score: score })
        });
        const items = loadLocal();
        const idx = items.findIndex(function (x) { return x.id === id; });
        if (idx >= 0) items[idx] = data.item;
        saveLocal(items);
        return data.item;
      } catch (e) {
        const items = loadLocal();
        const idx = items.findIndex(function (x) { return x.id === id; });
        if (idx < 0) throw e;
        items[idx].status = "reviewed";
        items[idx].teacher = {
          comment: comment,
          score: score,
          reviewedAt: new Date().toISOString()
        };
        saveLocal(items);
        return items[idx];
      }
    }
  };
})();
