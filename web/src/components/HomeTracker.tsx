"use client";

import Link from "next/link";
import { ProgressTracker } from "@/components/ProgressTracker";
import { DEFAULT_TEXT_ID, getText } from "@/lib/content";
import { resetProgress } from "@/lib/progress";
import { useProgress } from "@/lib/use-progress";

export function HomeTracker() {
  const text = getText(DEFAULT_TEXT_ID)!;
  const { progress, update, hydrated } = useProgress(text.id);

  function handleReset() {
    const fresh = resetProgress(text.id);
    update(() => fresh);
  }

  const nextHref =
    progress.stages.write.status !== "locked"
      ? `/texts/${text.id}/write`
      : progress.stages.techniques.status !== "locked"
        ? `/texts/${text.id}/techniques`
        : `/texts/${text.id}/read`;

  const nextLabel =
    progress.stages.read.status === "available"
      ? "开始精读"
      : progress.stages.write.status === "done"
        ? "再次查看路径"
        : "继续学习";

  return (
    <main className="home">
      <div className="home__atmosphere" aria-hidden />
      <div className="home__inner">
        <header className="home__brand">
          <p className="brand-mark">文径</p>
          <h1 className="brand-line">把每一次细读，走成可追踪的路径</h1>
          <p className="brand-sub">
            IBDP 中文语言与文学交互练习：精读批注、手法识别、分析写作，进度自动记录。
          </p>
          <div className="home__cta">
            <Link className="btn btn-primary" href={nextHref}>
              {nextLabel}
            </Link>
            <Link className="btn btn-ghost" href={`/texts/${text.id}/read`}>
              打开《{text.title}》
            </Link>
          </div>
        </header>

        {hydrated ? (
          <ProgressTracker
            textId={text.id}
            title={text.title}
            progress={progress}
            onReset={handleReset}
          />
        ) : (
          <div className="tracker tracker--placeholder" />
        )}
      </div>
    </main>
  );
}
