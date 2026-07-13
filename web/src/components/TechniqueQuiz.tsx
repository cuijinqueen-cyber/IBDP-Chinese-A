"use client";

import Link from "next/link";
import { useState } from "react";
import type { TextContent } from "@/lib/types";
import { techniqueLabel } from "@/lib/types";
import { markStage, useProgress } from "@/lib/use-progress";
import { ProgressTracker } from "./ProgressTracker";

type Props = { text: TextContent };

export function TechniqueQuiz({ text }: Props) {
  const { progress, update, hydrated } = useProgress(text.id);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const locked = progress.stages.techniques.status === "locked";
  const quiz = text.quiz[index];
  const total = text.quiz.length;

  function toggle(id: string) {
    if (revealed) return;
    setPicked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function submit() {
    if (!quiz || picked.length === 0) return;
    const correct =
      quiz.correctTechniqueIds.length === picked.length &&
      quiz.correctTechniqueIds.every((id) => picked.includes(id));

    update((p) => {
      let next = {
        ...p,
        quizAnswers: { ...p.quizAnswers, [quiz.id]: picked },
        quizCorrect: { ...p.quizCorrect, [quiz.id]: correct },
      };
      if (next.stages.techniques.status === "available") {
        next = markStage(next, "techniques", "in_progress");
      }
      return next;
    });
    setRevealed(true);
  }

  function nextQuestion() {
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setPicked([]);
      setRevealed(false);
      return;
    }
    const correctCount = Object.values({
      ...progress.quizCorrect,
      [quiz.id]:
        quiz.correctTechniqueIds.length === picked.length &&
        quiz.correctTechniqueIds.every((id) => picked.includes(id)),
    }).filter(Boolean).length;
    const score = Math.round((correctCount / total) * 100);
    update((p) =>
      markStage(p, "techniques", "done", {
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
          <h1>手法识别尚未解锁</h1>
          <p>请先完成精读批注，再进入手法练习。</p>
          <Link className="btn btn-primary" href={`/texts/${text.id}/read`}>
            回到精读
          </Link>
        </div>
      </div>
    );
  }

  const done = progress.stages.techniques.status === "done";

  return (
    <div className="workspace">
      <ProgressTracker
        textId={text.id}
        title={text.title}
        progress={progress}
        variant="compact"
      />

      <header className="workspace__intro">
        <p className="workspace__stage">手法</p>
        <h1>手法识别</h1>
        <p className="workspace__gq">
          题目 {index + 1} / {total} · 可多选 · 请同时思考效果
        </p>
      </header>

      {done && index === total - 1 && revealed ? (
        <div className="feedback-panel is-success">
          <h2>手法练习完成</h2>
          <p>
            得分 {progress.stages.techniques.score ?? "—"}%。接下来把证据写成分析段。
          </p>
          <Link className="btn btn-primary" href={`/texts/${text.id}/write`}>
            进入分析写作 →
          </Link>
        </div>
      ) : (
        <div className="quiz-layout">
          <blockquote className="quiz-passage">
            {text.paragraphs[quiz.paragraphIndex]}
          </blockquote>
          <p className="quiz-prompt">{quiz.prompt}</p>
          <div className="quiz-options">
            {quiz.options.map((id) => {
              const selected = picked.includes(id);
              const isCorrect = quiz.correctTechniqueIds.includes(id);
              let state = "";
              if (revealed) {
                if (isCorrect) state = "is-correct";
                else if (selected) state = "is-wrong";
              } else if (selected) state = "is-selected";
              return (
                <button
                  key={id}
                  type="button"
                  className={`quiz-option ${state}`}
                  onClick={() => toggle(id)}
                  aria-pressed={selected}
                >
                  <span>{techniqueLabel(id)}</span>
                  <small>{id}</small>
                </button>
              );
            })}
          </div>

          {!revealed ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={submit}
              disabled={picked.length === 0}
            >
              提交
            </button>
          ) : (
            <div className="feedback-panel">
              <p className="feedback-effect">
                <strong>效果：</strong>
                {quiz.effectAnswer}
              </p>
              <button type="button" className="btn btn-primary" onClick={nextQuestion}>
                {index < total - 1 ? "下一题" : "完成手法练习"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
