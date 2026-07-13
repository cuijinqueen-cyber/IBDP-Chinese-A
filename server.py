#!/usr/bin/env python3
"""文脉平台本地服务：静态页面 + 提交通道 API（师生共享）。"""
from __future__ import annotations

import json
import re
import threading
import uuid
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse, parse_qs

ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "data"
SUBMISSIONS_FILE = DATA_DIR / "submissions.json"
LOCK = threading.Lock()

PORT = 8080
TEACHER_PORT = 8081


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def ensure_store() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not SUBMISSIONS_FILE.exists():
        SUBMISSIONS_FILE.write_text("[]", encoding="utf-8")


def read_submissions() -> list:
    ensure_store()
    with LOCK:
        try:
            return json.loads(SUBMISSIONS_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return []


def write_submissions(items: list) -> None:
    ensure_store()
    with LOCK:
        SUBMISSIONS_FILE.write_text(
            json.dumps(items, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def _json(self, code: int, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length) if length else b"{}"
        return json.loads(raw.decode("utf-8") or "{}")

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            return self._json(200, {"ok": True, "service": "wenmai"})
        if parsed.path == "/api/submissions":
            qs = parse_qs(parsed.query)
            status = (qs.get("status") or [None])[0]
            items = read_submissions()
            if status:
                items = [x for x in items if x.get("status") == status]
            return self._json(200, {"items": items, "count": len(items)})
        if parsed.path == "/teacher" or parsed.path == "/teacher/":
            self.path = "/teacher.html"
        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/submissions":
            return self._json(404, {"error": "not_found"})
        data = self._read_json()
        body = (data.get("body") or "").strip()
        student = (data.get("student") or "").strip() or "匿名同学"
        if len(body) < 40:
            return self._json(400, {"error": "body_too_short"})
        item = {
            "id": "s_" + uuid.uuid4().hex[:10],
            "student": student,
            "promptId": data.get("promptId") or "",
            "promptTitle": data.get("promptTitle") or "",
            "promptQuestion": data.get("promptQuestion") or "",
            "body": body,
            "ai": data.get("ai"),
            "status": "pending_teacher",
            "createdAt": now_iso(),
            "teacher": None,
        }
        items = read_submissions()
        items.insert(0, item)
        write_submissions(items)
        return self._json(201, {"item": item})

    def do_PATCH(self):
        parsed = urlparse(self.path)
        m = re.fullmatch(r"/api/submissions/([^/]+)", parsed.path)
        if not m:
            return self._json(404, {"error": "not_found"})
        sid = m.group(1)
        data = self._read_json()
        items = read_submissions()
        for i, item in enumerate(items):
            if item.get("id") != sid:
                continue
            comment = (data.get("comment") or "").strip()
            score = data.get("score")
            try:
                score_num = int(score)
            except (TypeError, ValueError):
                score_num = None
            if score_num is not None:
                score_num = max(0, min(40, score_num))
            items[i]["status"] = "reviewed"
            items[i]["teacher"] = {
                "comment": comment,
                "score": score_num,
                "reviewedAt": now_iso(),
            }
            write_submissions(items)
            return self._json(200, {"item": items[i]})
        return self._json(404, {"error": "submission_not_found"})

    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))


def run_server(port: int, label: str):
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print("%s listening on http://0.0.0.0:%s" % (label, port))
    server.serve_forever()


def main():
    ensure_store()
    # 学生端 8080，老师点评端口 8081（同一套 API，数据互通）
    t = threading.Thread(
        target=run_server, args=(TEACHER_PORT, "Teacher portal"), daemon=True
    )
    t.start()
    run_server(PORT, "Student portal")


if __name__ == "__main__":
    main()
