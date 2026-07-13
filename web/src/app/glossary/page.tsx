import { TECHNIQUE_LIST } from "@/lib/types";

export default function GlossaryPage() {
  return (
    <main className="doc-page">
      <header className="doc-page__intro">
        <p className="workspace__stage">词表</p>
        <h1>手法词表</h1>
        <p>
          识别只是第一步；分析时请同时写出它对读者、语气或主题的<strong>效果</strong>。
        </p>
      </header>

      <ul className="glossary-list">
        {TECHNIQUE_LIST.map((t) => (
          <li key={t.id} id={t.id}>
            <div className="glossary-list__name">
              <h2>{t.nameZh}</h2>
              <span>{t.nameEn}</span>
            </div>
            <p>{t.definition}</p>
            <p className="glossary-list__effects">
              效果提示：{t.effectHints.join("；")}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
