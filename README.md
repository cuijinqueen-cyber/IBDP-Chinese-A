# 文脉 · IBDP 文学精读工坊

面向 **IBDP 中文 A · 文学** 的交互精读站：培养学生精读、主题理解与诠释能力，贯穿七大概念，并以手法带读 + 三层练习推进。

## 启动

```bash
python3 -m http.server 8080
```

- 《一把青》：http://localhost:8080/?work=yibaqing  
- 《永远的尹雪艳》：http://localhost:8080/?work=yinxueyan  

## 精读设计

### 手法带读（文本细读）
点击彩色划线后显示：
1. **划线部分解析**（句段解析 + 表达效果）
2. 四步带读：观察 → 辨认手法 → 拆解标记 → 阐释效果

### 三层练习
识别手法 → 分析效果 → 撰写诠释

### 七大概念色标
身份 · 文化 · 创造力 · 沟通 · 视角 · 转变 · 再现

## 文件
- `js/data-yibaqing.js` / `js/data-yinxueyan.js` — 各篇文本与练习
- `js/app.js` — 交互
- `css/styles.css` — 样式
