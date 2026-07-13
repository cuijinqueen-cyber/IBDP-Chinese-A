"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { TextContent } from "@/lib/types";
import { markStage, useProgress } from "@/lib/use-progress";
import { ProgressTracker } from "./ProgressTracker";

type Props = { text: TextContent };

export function WritingStudio({ text }: Props) {
  const { progress, update, hydrated } = useProgress(text.id);
  const [localDraft, setLocalDraft] = useState<string | null>(null);
  const draft = localDraft ?? progress.writingDraft;

  const locked = progress.stages.write.status === "locked";

  const checklist = useMemo(() => {
    const checked = [...progress.checklistChecked];
    while (checked.length < text.checklist.length) checked.push(false);
    return checked.slice(0, text.checklist.length);
  }, [progress.checklistChecked, text.checklist.length]);

  function setDraft(value: string) {
    setLocalDraft(value);
    update((p) => {
      let next = { ...p, writingDraft: value };
      if (next.stages.write.status === "available" && value.trim()) {
        next = markStage(next, "write", "in_progress");
      }
      return next;
    });
  }

  function insertFrame(frame: string) {
    const spacer = draft && !draft.endsWith("\n") ? "\n" : "";
    setDraft(`${draft}${spacer}${frame}`);
  }

  function insertEvidence(quote: string) {
    const snippet = `「${quote}」`;
    setDraft(draft ? `${draft}${snippet}` : snippet);
  }

  function toggleCheck(i: number) {
    update((p) => {
      const nextChecks = [...checklist];
      nextChecks[i] = !nextChecks[i];
      return { ...p, checklistChecked: nextChecks };
    });
  }

  function completeWrite() {
    const doneCount = checklist.filter(Boolean).length;
    const score = Math.round((doneCount / checklist.length) * 100);
    update((p) =>
      markStage(p, "write", "done", {
        completedAt: Date.now(),
        score,
      }),
    );
  }

  if (!hydrated) return <div className="workspace-skeleton" />;

  if (locked) {
    return (
      <div className="workspace">
        <ProgressTracker
          textId={text.id}
          title={text.title}
          progress={progress}
          variant="compact"
        />
        <div className="locked-panel">
          <h1>分析写作尚未解锁</h1>
          <p>请先完成手法识别，再进入写作。</p>
          <Link className="btn btn-primary" href={`/texts/${text.id}/techniques`}>
            回到手法练习
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="workspace">
      <ProgressTracker
        textId={text.id}
        title={text.title}
        progress={progress}
        variant="compact"
      />

      <header className="workspace__intro">
        <p className="workspace__stage">写作</p>
        <h1>分析写作</h1>
        <p className="workspace__gq">{text.writingPrompt}</p>
        <p className="workspace__gq">引导问题：{text.guidingQuestion}</p>
      </header>

      <div className="write-layout">
        <aside className="write-side">
          <h2>证据库</h2>
          {progress.annotations.length === 0 ? (
            <p className="muted">精读批注会显示在这里，便于插入引文。</p>
          ) : (
            <ul className="evidence-list">
              {progress.annotations.map((a) => (
                <li key={a.id}>
                  <button type="button" onClick={() => insertEvidence(a.quote)}>
                    「{a.quote}」
                  </button>
                  <span>{a.note}</span>
                </li>
              ))}
            </ul>
          )}

          <h2>句式支架</h2>
          <ul className="frame-list">
            {text.sentenceFrames.map((frame) => (
              <li key={frame}>
                <button type="button" onClick={() => insertFrame(frame)}>
                  {frame}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="write-main">
          <label className="field">
            <span>你的分析段</span>
            <textarea
              rows={14}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="先写主张，再插入证据，最后点明手法与效果……"
            />
          </label>

          <h2>自评清单</h2>
          <ul className="checklist">
            {text.checklist.map((item, i) => (
              <li key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={checklist[i]}
                    onChange={() => toggleCheck(i)}
                  />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>

          <div className="workspace__actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={completeWrite}
              disabled={draft.trim().length < 40}
            >
              完成写作并更新 Tracker
            </button>
            {progress.stages.write.status === "done" ? (
              <Link className="btn btn-ghost" href="/">
                返回总览 · {progress.stages.write.score}% 自评完成度
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
