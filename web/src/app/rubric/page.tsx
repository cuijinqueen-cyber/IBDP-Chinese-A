const DIMENSIONS = [
  {
    title: "理解与洞察",
    body: "是否抓住文本态度、矛盾或关键张力？是否回应引导问题？",
  },
  {
    title: "证据",
    body: "是否引用具体词句？引文是否真正支撑观点？",
  },
  {
    title: "手法与效果",
    body: "是否准确命名手法？是否分析对读者或意义的作用，而非只贴标签？",
  },
  {
    title: "表达组织",
    body: "段落是否有观点句？分析是否连贯，少复述情节？",
  },
];

const CHECKLIST = [
  "首句回应引导问题或提出明确主张",
  "至少一处带引号的文本证据",
  "点名至少一种手法（或文体特征）",
  "说明该手法的效果（非仅定义）",
  "结尾将局部分析连回文本整体目的/态度",
  "少复述，多分析；句子通顺",
];

export default function RubricPage() {
  return (
    <main className="doc-page">
      <header className="doc-page__intro">
        <p className="workspace__stage">评估</p>
        <h1>评估速查</h1>
        <p>
          课堂练习用简化标准，帮助自评与互评。标注为练习反馈，非正式 IB 预测分。
        </p>
      </header>

      <section className="doc-section">
        <h2>四维速查</h2>
        <ol className="rubric-dims">
          {DIMENSIONS.map((d, i) => (
            <li key={d.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="doc-section">
        <h2>写作自评清单</h2>
        <ul className="rubric-checks">
          {CHECKLIST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="doc-section">
        <h2>常见改进提示</h2>
        <ul className="rubric-tips">
          <li>
            <strong>缺证据：</strong>先插入一句原文，再解释。
          </li>
          <li>
            <strong>有证据无效果：</strong>读者读到这里会有什么感受或判断上的变化？
          </li>
          <li>
            <strong>情节复述：</strong>把「发生了什么」改成「作者如何让我们感受到……」。
          </li>
        </ul>
      </section>
    </main>
  );
}
