# IBDP Chinese A · 文径

IBDP 中文语言与文学交互学习网站：**文本精读 → 手法识别 → 分析写作**，首页为学习进度 Tracker。

## 本地运行

```bash
cd web
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 页面

| 路径 | 功能 |
| --- | --- |
| `/` | 文径首页 + 三环进度 Tracker |
| `/texts/[id]/read` | 分段精读与批注 |
| `/texts/[id]/techniques` | 手法识别练习（含效果反馈） |
| `/texts/[id]/write` | 分析写作（证据库 / 句式 / 自评） |
| `/glossary` | 手法词表 |
| `/rubric` | 评估速查 |

示例文本：`web/src/content/sample-autumn-balcony.json`（可替换扩展）。
