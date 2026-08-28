# AI Speaking Score & Suggestion Protocol  
**Use after every student speaking turn** (class practice, homework recording, or mock test)

---

## 1. Workflow (standard)

```
Student speaks into mic (web tool)
        ↓
Live speech-to-text transcript
        ↓
Auto score 4 criteria on stop
        ↓
Top 3 suggestions + optional audio playback
        ↓
Student re-speaks the SAME question once
```

**Preferred tool:** [`html/ai-scoring.html`](./html/ai-scoring.html)  
Click **Speak** → student talks with **no time limit** → student presses **Stop** when finished → scores appear automatically.

**Time budget**
- Speaking length: controlled by the student (no auto cut-off)  
- Score appears only after Stop  
- Student re-speak: **1–2 minutes**  
- Do **not** over-correct every sentence.

**Browser note:** Voice input uses the Web Speech API (best on **Chrome / Edge**). Allow microphone access. Recognition restarts automatically if the browser pauses mid-answer, until the student presses Stop.
---

## 2. Scoring Scale (IELTS-aligned, 6.0–8.0)

Score each criterion in **0.5 steps**. Overall ≈ average of 4 (round sensibly).

| Band | Fluency & Coherence | Lexical Resource | Grammar | Pronunciation |
|---|---|---|---|---|
| **6.0** | Keeps going with effort; some repetition; linking limited | Adequate for familiar topics; paraphrase limited | Mix of forms; frequent errors | Generally understandable; limited control |
| **6.5** | Longer answers possible; hesitation on harder Qs | Enough range; some awkward word choice | Complex attempts with errors | Clear enough; stress/intonation uneven |
| **7.0** | Speaks at length with natural pauses; organised | Flexible vocab; some less common items | Frequent error-free sentences | Clear throughout; uses features to help meaning |
| **7.5** | Flexible, coherent, little strain | Precise paraphrase; collocations natural | Controlled complex structures | Sustained clarity; effective chunking |
| **8.0** | Fluent, well-structured development | Wide resource, natural precision | Rare errors | Easy to understand throughout |

---

## 3. Quick Score Card (fill after speaking)

**Task:** □ Part 1  □ Part 2  □ Part 3  
**Question / cue:** _________________________________

| Criterion | Score | Evidence (1 short note) |
|---|---|---|
| Fluency & Coherence | __ / 9 | |
| Lexical Resource | __ / 9 | |
| Grammatical Range & Accuracy | __ / 9 | |
| Pronunciation | __ / 9 | |
| **Overall** | **__ / 9** | |

**Top 3 suggestions (must be actionable)**
1. _________________________________
2. _________________________________
3. _________________________________

**Re-record focus for next attempt:** _________________

---

## 4. AI Prompt (copy-paste)

Use with ChatGPT / Claude / Cursor after the student speaks.  
Paste the **transcript** (or detailed notes) + task type.

```text
You are an IELTS Speaking examiner-coach.
Student target: Band 7.0–7.5 (current level around 6.5).

Task type: [Part 1 / Part 2 / Part 3]
Question: [paste question]
Student answer (transcript):
"""
[paste transcript]
"""

Do the following:
1) Score Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation (estimate Pronunciation from transcript clues + note uncertainty). Use 0.5 bands.
2) Give an overall band.
3) List Top 3 suggestions only, each with:
   - Issue
   - Why it caps the score
   - A better version (1–2 sentences the student can reuse)
4) Provide one upgraded model answer at Band 7 level (same length as required by the part).
5) Keep feedback concise and practical. No long theory.
```

### Optional audio note
If only audio is available and no transcript:
```text
Listen to / consider this speaking performance on IELTS [Part X].
Focus on pauses, repair, vocabulary flexibility, grammar accuracy, and clarity.
Then score and give Top 3 suggestions as specified above.
```

---

## 5. Suggestion Bank (by weakness)

### Fluency & Coherence
| Issue | Suggestion to give student |
|---|---|
| Answers too short | Use 3-beat: answer → reason → example |
| Long silent pauses | Use repair: *What I mean is… / Let me think for a second…* |
| Jumping / no structure (P3) | Use IDEA: Insight → Detail → Example → Alternative |
| Memorised script feel | Change one detail each time; speak from bullets only |
| Overuse *and / because* | Add *also / but / so / for example / looking back* |

### Lexical Resource
| Issue | Suggestion |
|---|---|
| Repeats *nice / good / interesting* | Replace with precise adjectives (see Exercise A2) |
| Cannot paraphrase | Practise C5 ladder: important → significant / essential |
| Topic words missing | Pre-load 6 collocations before the mock |
| Awkward translation | Prefer short natural phrases over direct L1 transfer |

### Grammar
| Issue | Suggestion |
|---|---|
| *I very like / In my city have* | Drill D2 fixes daily; re-say corrected line aloud |
| Tense slips in Part 2 | Mark past forms before speaking; slow the story spine |
| No complex sentences | Add one *because / if / although* sentence per answer |
| Agreement errors (*it depend*) | End-check: he/she/it + verb |

### Pronunciation
| Issue | Suggestion |
|---|---|
| Flat delivery | Stress content words; fall at the end of ideas |
| Word endings cut (*asked / changed*) | Over-articulate endings in re-record |
| Too fast / mumbled | Chunk into sense groups (` / `) |
| Listener strain | Slow 10%; prioritise clarity over speed |

---

## 6. Part-specific scoring focus

### Part 1
- Length 2–4 sentences?  
- Direct answer first?  
- One reason + one detail?  
**Common 6.5 cap:** too short OR too memorised.

### Part 2
- Covers all bullets?  
- Speaks 1:40–2:00?  
- Clear ending / reflection?  
**Common 6.5 cap:** runs out of ideas at 1:00; sudden stop.

### Part 3
- Opinion clear?  
- Developed explanation (not one line)?  
- Example or comparison?  
**Common 6.5 cap:** freezes; gives Part-1-length answers.

---

## 7. Feedback script (teacher / AI voice)

Keep it short and fixed:

> “Overall around **X.X**.  
> Strength: _________.  
> Top 3 fixes:  
> 1) _________  
> 2) _________  
> 3) _________  
> Now re-record the same question focusing only on #1.”

---

## 8. Student reflection (30 seconds)

After hearing AI/teacher feedback:
- [ ] I understand my overall band  
- [ ] I know my Top 3 fixes  
- [ ] I re-recorded once  
- [ ] I copied 1 upgraded sentence into Upgrade Log  

---

## 9. Where this fits in the 8-lesson plan

| Lesson | AI scoring moment |
|---|---|
| 1 | Full diagnostic → full 4-criterion score card |
| 2 | After Part 1 mini-mock → FC + LR focus |
| 3–4 | After each Part 2 → timing + story coherence |
| 5 | After Part 3 set → IDEA development score |
| 6 | Grammar-focused scoring on weak topic |
| 7 | Pronunciation-focused scoring |
| 8 | Final mock → full score + 2-week plan |

**Homework rule:** every recording submitted must come back with **AI/teacher scores + Top 3 suggestions + one re-record**.

---

## 10. Sample scored feedback (model)

**Task:** Part 3 — *Has technology improved education?*  
**Student extract:** *Yes I think so. Technology is good. Students can learn online. But some students play phone. So it depend.*

| Criterion | Score | Note |
|---|---|---|
| FC | 6.0 | Short; limited development |
| LR | 6.0 | *good* repeated; thin topic lexis |
| GRA | 6.0 | *it depend* |
| Pron | 6.5 | (assume clear) |
| **Overall** | **6.0–6.5** | |

**Top 3 suggestions**
1. Extend with IDEA: opinion + why + example + balance.  
2. Replace *good* → *flexible / accessible*; add *digital distraction*.  
3. Fix *it depends*; add one *although* sentence.

**Upgraded model**
> To some extent, yes. Technology makes learning more flexible because students can review recorded lessons after class. For example, working students can catch up in the evening. Although phones can be distracting, overall technology helps if schools guide students to use it properly.

---

## Update — content-aware local scorer
- Scores now start near 6.5 and move with transcript evidence (length, reason/example markers, lexical diversity, grammar hits, topic overlap, speech rate).
- Top 3 tips quote the student’s own wording / metrics (not fixed templates only).
- Recognition: `maxAlternatives=3`, confidence average, alternative-chip corrections, default `en-GB`, noise-suppressed mic.
- Reminder: browser ASR is imperfect — edit Transcript before trusting the band.
