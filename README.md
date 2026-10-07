# 資工 / AI 研究所甄試口試訓練

用約一個月，透過作答、教授追問、白板推導與程式實作，補齊台灣資工 / AI 研究所甄試需要的 CS / AI fundamentals。目標是面試時能精確回答、解釋理由並處理條件變化；閱讀完成不等於掌握。

準備者為 CS undergraduate，具軟體工程、AI/ML、LLM、GPU inference、研究專案、論文投稿與研究助理經驗。這些背景只用來選擇情境，不作為能力評級的證據。

## 目前狀態

- 訓練系統已完成第二階段 coverage expansion；Diagnostic 已完成 **0 / 30** 題。
- 本次 expansion 已確認，Diagnostic 已恢復；第 1 題等待閉卷首答，尚未評分。
- 所有子題初始狀態均為 **Untested**，沒有預先判定的強弱項。
- 這裡是訓練入口，不收錄完整 Diagnostic 題庫或答案。

Syllabus 自 2026-10-06 起 freeze。只有 Diagnostic 實際暴露目前 coverage 未涵蓋的重要基礎缺口，才新增 technical topics 或擴充範圍；擴充須連到實際作答證據。

232 個 subtopics 是 knowledge / evidence index，不是 232 個獨立必考題。一題可測多個子題；不為了將全部子題標成 Tested 扭曲 adaptive diagnostic，未測部分維持 Untested。

## 訓練流程

**Diagnostic → Weakness Map → Targeted Study → Mock Interview → Review**

1. **Diagnostic**：30 題 adaptive interview，一次只問一題，先回答再評分；每題依回答逐次追問 1–3 層。
2. **Weakness Map**：依每題的原始回答與追問，只更新確實測到的子題；每完成 10 題保存 checkpoint snapshot，未測部分維持 Untested。
3. **Targeted Study**：優先補已證實的 Critical / Weak，再補影響後續推導的基礎。答錯時依「核心錯誤 → 直覺 → 正式定義 → 例子 → 必要數學」修正。
4. **Mock Interview**：混合 fundamentals 與研究 / 專案答辯，逐題記錄回答、追問及改善事項。
5. **Review**：閉卷重答、變形題與 spaced repetition；用新的實測證據更新狀態，再進入下一輪。

30 題以主題題計數，追問不另計；同題教學後的重答也不增加完成數。下一題難度由回答決定，不一次公開 30 題。完整規則見 [Diagnostic](diagnostic/README.md) 與 [評分規準](diagnostic/scoring-rubric.md)。

## 優先順序

| Tier | 主題 |
| --- | --- |
| S | Data Structures & Algorithms、Math for ML、Machine Learning、Deep Learning、Transformer / LLM、Statistics / Experimental Design、Research / Project Defense |
| A | Operating Systems、Computer Networks、Databases、C/C++、Computer Architecture、Software Engineering |

Tier 表示準備優先級，不代表個人能力或任一學校固定的出題率。[四週 Roadmap](ROADMAP.md) 會隨實測結果調整，不綁定每日題數。

Software Engineering 因本人 QA / SE 背景，在 defense / mock 中視同 Tier S；Computer Architecture 中的 CPU/GPU、memory hierarchy 因 inference / deployment 背景提高口試準備優先級。兩者都仍需實測，不預評能力。

Technical coverage 現為 12 個 topics，加 Research / Project Defense 共 13 個診斷領域。Coverage 以範圍與真實證據追蹤，掌握程度仍待診斷確認。

## Repository architecture

| 路徑 | 用途 |
| --- | --- |
| [ROADMAP.md](ROADMAP.md) | 四週目標、轉階段條件與調整規則 |
| [PROGRESS.md](PROGRESS.md) | Diagnostic 進度、評定數量、mock history 與下一步 |
| [WEAKNESS_MAP.md](WEAKNESS_MAP.md) | 逐子題等級、證據、實測日期與下次複習 |
| [INTERVIEW_STRATEGY.md](INTERVIEW_STRATEGY.md) | 口述、推導、coding、未知問題與教授追問策略 |
| [diagnostic/](diagnostic/README.md) | 診斷流程、A–D 規準與 [session 紀錄](diagnostic/sessions/README.md) |
| topics/ | 12 個 technical topics 的口試範圍、回答要求、常見追問與 self-check |
| [research-defense/](research-defense/README.md) | [真實 portfolio inventory](research-defense/portfolio-index.md)、專案 / 論文答辯與三種時間版本 |
| [mock-interviews/](mock-interviews/README.md) | 模擬口試流程及逐題紀錄模板 |
| [mistakes/](mistakes/README.md) | 核心錯誤、正確 mental model 與重測紀錄 |
| [review/](review/spaced-repetition.md) | 間隔複習規則與待複習 queue |
| [visual-learning/](visual-learning/README.md) | 首答保存後使用的互動 / 視覺理解輔助層；不計為 mastery evidence |
| [school-specific/](school-specific/README.md) | 一階通過 / 確定口試後才高強度使用的 [school template](school-specific/school-template.md) |

## Technical topic index

| 順序 | 文件 |
| --- | --- |
| 01 | [Data Structures & Algorithms](topics/01-data-structures-algorithms.md) |
| 02 | [Math for ML](topics/02-math-for-ml.md) |
| 03 | [Machine Learning](topics/03-machine-learning.md) |
| 04 | [Deep Learning](topics/04-deep-learning.md) |
| 05 | [Transformer / LLM](topics/05-transformer-llm.md) |
| 06 | [Operating Systems](topics/06-operating-systems.md) |
| 07 | [Computer Networks](topics/07-computer-networks.md) |
| 08 | [Databases](topics/08-databases.md) |
| 09 | [C/C++ Fundamentals](topics/09-cpp.md) |
| 10 | [Computer Architecture](topics/10-computer-architecture.md) |
| 11 | [Statistics / Experimental Design](topics/11-statistics-experimental-design.md) |
| 12 | [Software Engineering](topics/12-software-engineering.md) |

## 如何紀錄進度

1. 從 [Diagnostic session template](diagnostic/sessions/session-template.md) 複製新檔；檔名使用實際的 `YYYY-MM-DD-session-NN.md`，日期採 Asia/Taipei。
2. 保留題目、首次原始回答、提示使用情形與逐層追問。提示後的回答另記，不覆蓋首次回答。
3. 用 A–D 規準評分；不適用的維度寫 N/A，未測的維度寫 Untested。
4. 每 10 題將已測子題的等級及證據連結寫入 Weakness Map，再同步 PROGRESS 與對應 topic 的 Review Status。
5. 錯誤寫入 [mistake log](mistakes/mistake-log.md)，需要重測的項目加入 [review queue](review/spaced-repetition.md)。
6. Mock 使用 [session template](mock-interviews/session-template.md)，結束後更新 history；完成複習後再更新等級與證據。

Session 是作答證據的原始來源，Weakness Map 是目前能力狀態的主表；其他摘要須與主表一致。模板空欄位只是填寫位置，不代表已發生的測驗或成果。

## 面試回答標準

- **概念題**：先下精確定義，再說機制 / 原因，用小例子說明，最後提出假設、限制與 trade-off。
- **演算法題**：確認輸入與邊界 → verbalize 思路 → 正確性 / invariant → time / space complexity → code → 手動驗證。分析 worst / average / amortized 時要說清楚適用條件。
- **ML / DL 題**：說明 intuition、objective、符號與 shape，能推導必要梯度，並解釋 failure cases、資料切分及評估設計。
- **研究答辯**：分清 Problem、My contribution、證據與 Limitations；成果數字必須有實際紀錄來源。
- **追問**：能回答「為什麼、條件改變、成本與替代方案」。只背名稱、公式或模糊地差不多對，不能評 A。

從 [目前 session](diagnostic/sessions/2026-10-06-session-01.md) 恢復第 1 題：先保留閉卷首答，再逐層追問；assisted answer 不覆蓋 baseline。

## Visual Learning / Interactive Learning

[Visual Learning](visual-learning/README.md) 是既有 syllabus 的理解輔助層；[Resource Map](visual-learning/RESOURCE_MAP.md) 讓 232 個 subtopics 都有資源決策，不增加 technical topics、Diagnostic 題數或 Tested coverage。可用 [本地 app](visual-learning/app/index.html) 操作 tiny examples。

Diagnostic blind attempt → evidence → targeted study → visual learning if useful → tiny exercise → closed-book explanation → delayed retest。Visual Learning 屬 Targeted Study 的選用工具，並非新 phase。

Closed-book 首答前禁止開啟對應 lesson、公式推導、完整解法或 answer-oriented external explanation，不自動推薦目前題目的資源。Session 保存原始首答後，只有 Review / Weak / Critical 或教練指定需建立 intuition 才使用。閱讀後立即重答只記 Assisted Improvement，不覆蓋 cold baseline、不改原 Diagnostic grade、不自動升 Strong / Mastered；仍需 delayed closed-book retest。
