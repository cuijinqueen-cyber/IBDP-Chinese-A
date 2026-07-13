# 文脉 · IBDP 中文 A 互动学习平台

基于谢宗玉《英语老师》的五层互动练习平台，面向 IBDP 中文 A 语言与文学。

## 启动

```bash
python3 server.py
```

| 端口 | 用途 | 地址 |
|------|------|------|
| **8080** | 学生练习端 | http://localhost:8080/ |
| **8081** | **老师点评端口** | http://localhost:8081/teacher.html |

两端共享同一提交通道 API（`/api/submissions`），数据保存在 `data/submissions.json`。

## 五层路径（学生端）

1. 识别文学手法
2. 彩色精读标注
3. 深入思考
4. 写作大纲（Paper 1 标准 A–D）
5. 写作提交 → AI 初评 → 进入老师点评队列

## 老师点评端口

1. 打开 http://localhost:8081/teacher.html（无需密码，直接进入复审台）
2. 筛选待复审 / 已复审，撰写评语并确认分数（/40）
3. 可导出 JSON

## 说明

- 无后端时仍可打开静态文件；提交会回退到浏览器 localStorage
- 推荐使用 `server.py`，以便师生在不同设备/端口间共享作业
