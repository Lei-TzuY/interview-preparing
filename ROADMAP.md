# Adaptive Roadmap：四週口試準備

時間約四週，起算於確認並恢復訓練後。週次是階段目標，不是每日排程；較早完成就進階，若關鍵基礎仍有漏洞則調整下一階段的時間。

## Priority tiers

| Tier | 主題 | 排程原則 |
| --- | --- | --- |
| S | Data Structures & Algorithms、Math for ML、Machine Learning、Deep Learning、Transformer / LLM、Research / Project Defense | 每週持續接觸；先測再補，不因專案經驗而跳過基礎 |
| A | Operating Systems、Computer Networks、Databases、C/C++ | 先建立口試基本覆蓋，再依弱點或目標實驗室調高優先級 |

同 Tier 的初始順序是 DSA → Math → ML → DL → Transformer / LLM；研究答辯穿插進行。依實測可調整，學校 / 實驗室偏好只有取得資訊後才納入。

## 四週階段

| 階段 | 核心目標 | 訓練方式 | 具體產出 | 檢查點 |
| --- | --- | --- | --- | --- |
| 第 1 週：診斷與基礎定位 | 完成 30 題 adaptive diagnostic，確認所有領域的基本覆蓋 | 一次一題、先答後教、逐層追問；必要時即時補基礎 | 真實 session records；第 10 / 20 / 30 題 weakness snapshots；研究 / 專案清單 | 完成不代表通過；所有評級能追溯到回答 |
| 第 2 週：集中補洞 | 優先修復已測出的 Tier S Critical / Weak 與前置知識 | 每次選 1–2 個子題，閉卷作答、短教學、白板 / coding、變形重測 | mistake log、review queue、至少一份真實 defense draft | 關鍵子題能獨立重答，且沒有新的根本錯誤 |
| 第 3 週：跨題整合 | 串接數學、ML、DL、LLM 與實際研究；補 Tier A | 混合 fundamentals、專案設計與反例；安排 mock | mock records；附實測證據的更新 map；有來源的評估表 | 能處理 1–3 層追問，並解釋 trade-off 與 failure case |
| 第 4 週：面試收斂 | 穩定回答、縮短表達、驗證研究主張 | 隨機抽問、限時白板、30 秒 / 2 分鐘 / 5 分鐘 defense、間隔重測 | 最新 priorities、精簡 defense、未解問題清單 | 高優先級已測子題沒有尚未處理的根本錯誤；保留所有未知 |

Mock 建議先做 20–30 分鐘，再按目標面試形式調整。Mock 次數與題數依實際時間決定，不預填完成紀錄。

## 每次訓練循環

1. 先看 [PROGRESS](PROGRESS.md) 與到期 [Review queue](review/spaced-repetition.md)。
2. 選一個主題：到期 Critical → 到期 Weak → 阻礙推導的前置基礎 → Tier S Untested → Review → Tier A 未覆蓋項目。
3. 先閉卷回答，再依 [rubric](diagnostic/scoring-rubric.md) 評定與追問。
4. 教學後換一個條件重答，紀錄有提示 / 無提示；安排延後重測。
5. 更新 session、mistakes 與 review queue；到檢查點再同步 map 和摘要。

## Adaptive 調整規則

| 實測訊號 | 調整 |
| --- | --- |
| Critical 出現在前置基礎，例如 chain rule 或條件機率 | 先補前置，再回到 backprop / Bayes 題；縮減進階延伸的時間 |
| 同一主題兩次獨立延後重測仍為 C / D | 拆成更小子題，換例子重新建立 mental model |
| 首答及追問為 A | 降低重複基本題比重，改問反例與跨領域應用；仍安排延後重測 |
| Theory 能回答，但 code / 白板失敗 | 為該子題安排實作；不以口述分數代替 coding 證據 |
| 專案主張缺 baseline、ablation 或數據來源 | 優先整理真實證據；無法補實驗時縮小主張並說明限制 |
| 剩餘時間不足 | 保留 Must Know、核心弱點、研究答辯與 mock；Should Know 延伸列入未完成項 |

同題提示後答對，不等於已掌握。Critical → Weak → Review → Strong 的提升只依新的獨立作答證據；可跨級提升，但必須記錄原因。

## 完成標準

- [ ] 30 題診斷完成，10 個領域皆有實測證據。
- [ ] 高優先級子題有定義、理由、推導 / 成本分析及變形題證據。
- [ ] 研究與專案能清楚交代個人貢獻、比較、結果來源及限制。
- [ ] 已進行模擬口試，改善事項有後續驗證。
- [ ] 仍未掌握與 Untested 的項目如實保留，不以看完文件宣告完成。
