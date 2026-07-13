"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TextContent } from "@/lib/types";
import {
  addAnnotation,
  markStage,
  useProgress,
} from "@/lib/use-progress";
import { ProgressTracker } from "./ProgressTracker";

type Props = { text: TextContent };

export function CloseReading({ text }: Props) {
  const { progress, update, hydrated } = useProgress(text.id);
  const [activePara, setActivePara] = useState(0);
  const [note, setNote] = useState("");
  const [selectedQuote, setSelectedQuote] = useState("");

  const paraAnnotations = useMemo(
    () => progress.annotations.filter((a) => a.paragraphIndex === activePara),
    [progress.annotations, activePara],
  );

  function captureSelection() {
    const sel = window.getSelection()?.toString().trim();
    if (sel) setSelectedQuote(sel);
  }

  function saveNote() {
    if (!selectedQuote && !note.trim()) return;
    update((p) => {
      let next = addAnnotation(p, {
        paragraphIndex: activePara,
        quote: selectedQuote || text.paragraphs[activePara].slice(0, 24) + "…",
        note: note.trim() || "标记重点",
      });
      if (next.stages.read.status === "available") {
        next = markStage(next, "read", "in_progress");
      }
      return next;
    });
    setNote("");
    setSelectedQuote("");
  }

  function completeRead() {
    update((p) =>
      markStage(p, "read", "done", {
        completedAt: Date.now(),
        score: Math.min(100, 40 + p.annotations.length * 20),
      }),
    );
  }

  if (!hydrated) return <div className="workspace-skeleton" />;

  return (
    <div className="workspace">
      <ProgressTracker
        textId={text.id}
        title={text.title}
        progress={progress}
        variant="compact"
      />

      <header className="workspace__intro">
        <p className="workspace__stage">精读</p>
        <h1>{text.title}</h1>
        <p className="workspace__gq">引导问题：{text.guidingQuestion}</p>
      </header>

      <div className="read-layout">
        <article className="read-text">
          <div className="para-tabs" role="tablist">
            {text.paragraphs.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={activePara === i}
                className={activePara === i ? "is-active" : undefined}
                onClick={() => setActivePara(i)}
              >
                第 {i + 1} 段
              </button>
            ))}
          </div>
          <p
            className="read-passage"
            onMouseUp={captureSelection}
            onTouchEnd={captureSelection}
          >
            {text.paragraphs[activePara]}
          </p>
          <p className="read-tip">选中句子后可写入批注；亦可直接记录观察。</p>
        </article>

        <aside className="read-tools">
          <label className="field">
            <span>选中引文</span>
            <textarea
              rows={2}
              value={selectedQuote}
              onChange={(e) => setSelectedQuote(e.target.value)}
              placeholder="在左侧划选，或在此粘贴"
            />
          </label>
          <label className="field">
            <span>批注（观察 / 疑问 / 效果）</span>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例如：墨与渗放慢了时间感……"
            />
          </label>
          <button type="button" className="btn btn-primary" onClick={saveNote}>
            保存批注
          </button>

          <div className="annotation-list">
            <h2>本段批注 · {paraAnnotations.length}</h2>
            {paraAnnotations.length === 0 ? (
              <p className="muted">尚无批注</p>
            ) : (
              <ul>
                {paraAnnotations.map((a) => (
                  <li key={a.id}>
                    <blockquote>「{a.quote}」</blockquote>
                    <p>{a.note}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="workspace__actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={completeRead}
              disabled={progress.annotations.length === 0}
            >
              完成精读，解锁手法
            </button>
            {progress.stages.read.status === "done" ? (
              <Link className="btn btn-ghost" href={`/texts/${text.id}/techniques`}>
                进入手法识别 →
              </Link>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}
