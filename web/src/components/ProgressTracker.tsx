"use client";

import Link from "next/link";
import { STAGES, type StageId, type TextProgress } from "@/lib/types";
import { overallPercent } from "@/lib/progress";

const STATUS_LABEL: Record<TextProgress["stages"][StageId]["status"], string> =
  {
    locked: "未解锁",
    available: "待开始",
    in_progress: "进行中",
    done: "已完成",
  };

type Props = {
  textId: string;
  title: string;
  progress: TextProgress;
  variant?: "hero" | "compact";
  onReset?: () => void;
};

function stageHref(textId: string, stageId: StageId) {
  const base = `/texts/${textId}`;
  if (stageId === "read") return `${base}/read`;
  if (stageId === "techniques") return `${base}/techniques`;
  return `${base}/write`;
}

export function ProgressTracker({
  textId,
  title,
  progress,
  variant = "hero",
  onReset,
}: Props) {
  const percent = overallPercent(progress);

  if (variant === "compact") {
    return (
      <nav className="stage-rail" aria-label="学习进度">
        <div className="stage-rail__meter" aria-hidden>
          <span style={{ width: `${percent}%` }} />
        </div>
        <ol className="stage-rail__list">
          {STAGES.map((stage, i) => {
            const status = progress.stages[stage.id].status;
            const locked = status === "locked";
            return (
              <li key={stage.id} data-status={status}>
                {locked ? (
                  <span className="stage-rail__item is-locked">
                    <em>{i + 1}</em>
                    {stage.short}
                  </span>
                ) : (
                  <Link className="stage-rail__item" href={stageHref(textId, stage.id)}>
                    <em>{i + 1}</em>
                    {stage.short}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <section className="tracker" aria-labelledby="tracker-title">
      <div className="tracker__head">
        <p className="tracker__eyebrow">学习路径 · Tracker</p>
        <h2 id="tracker-title" className="tracker__title">
          {title}
        </h2>
        <p className="tracker__percent">
          完成度 <strong>{percent}%</strong>
        </p>
      </div>

      <div className="tracker__path" role="list">
        <div className="tracker__line" aria-hidden>
          <span style={{ width: `${percent}%` }} />
        </div>
        {STAGES.map((stage, i) => {
          const status = progress.stages[stage.id].status;
          const locked = status === "locked";
          const className = "tracker__node";
          const body = (
            <>
              <span className="tracker__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="tracker__label">{stage.label}</span>
              <span className="tracker__hint">{stage.hint}</span>
              <span className="tracker__status">{STATUS_LABEL[status]}</span>
            </>
          );

          if (locked) {
            return (
              <div
                key={stage.id}
                className={className}
                data-status={status}
                role="listitem"
              >
                {body}
              </div>
            );
          }

          return (
            <Link
              key={stage.id}
              className={className}
              data-status={status}
              role="listitem"
              href={stageHref(textId, stage.id)}
            >
              {body}
            </Link>
          );
        })}
      </div>

      {onReset ? (
        <button type="button" className="tracker__reset" onClick={onReset}>
          重置进度
        </button>
      ) : null}
    </section>
  );
}
