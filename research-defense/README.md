# Research / Project Oral Defense

Tier S。以真實專案、研究助理工作或投稿內容訓練，重點是問題、個人貢獻、技術決策與證據。經驗只提供題材，不預先代表答辯能力。

## Defense framework

| Field | 口試必須能交代 |
| --- | --- |
| Problem | 要解的具體問題、使用情境、輸入 / 輸出、現有缺口 |
| Motivation | 為何值得做，誰受益，什麼證據支持需求 |
| My contribution | 個人完成的設計、實作、實驗 / 分析，與團隊 / 既有工具的界線 |
| Architecture / methodology | 系統元件或研究流程、資料流、主要假設 |
| Technical decisions | 關鍵決策、限制、成本與選擇理由 |
| Alternatives considered | 考慮過的其他方法、比較條件、未採用的原因 |
| Evaluation | Baselines、metrics、protocol、資料切分、資源與公平比較 |
| Results | 真實量化 / 質化結果，以及可追溯的來源 |
| Limitations | 結論適用範圍、尚未驗證的條件與資源限制 |
| Failure cases | 具體失敗輸入 / 情境、觀察與可能原因 |
| What I would improve | 下一個有優先級、可驗證且可行的改善 |
| Potential professor attacks | 可能被質疑的假設、novelty、比較、公平性與個人貢獻 |
| 30-second version | 問題 → 我的工作 → 一項有來源的證據 → 主要限制 |
| 2-minute version | 加入方法、決策與評估，能交代為何結論成立 |
| 5-minute version | 展開 architecture / methodology、比較、推導、results、failure cases 與下一步 |

## 使用流程

1. 先檢視 [真實 portfolio inventory](portfolio-index.md)，補證據與個人分工，再選一個能負責解釋的 project / research，不以未做的成果代替。
2. 專案用 [project-defense-template](project-defense-template.md)，研究 / 投稿用 [research-defense-template](research-defense-template.md)。
3. 每項主張先找 source：commit、實驗 log、figure、table、資料版本或論文版本。未知項目明確寫未驗證。
4. 先練 2-minute version，再壓成 30-second version，最後展開 5-minute version。
5. 逐題接受教授追問，把不能回答的部分記入 [mistakes](../mistakes/mistake-log.md) 與 [review](../review/spaced-repetition.md)。

## Evidence rules

- 區分已實作、已測試、已觀察、假設與未驗證；不以 demo 成功推論所有情境都有效。
- Result 要有 dataset / workload、metric definition、baseline、環境、版本與測量方法。
- 個人、團隊、開源套件與 AI 工具協助的工作範圍如實界定；仍須能解釋自己負責的技術。
- 投稿、審查中、接受與發表是不同狀態，只依真實紀錄描述。
- 無法補 baseline / ablation 時說明缺口，縮小主張；不捏造比較數字。

評估與不確定性連到 [Statistics / Experimental Design](../topics/11-statistics-experimental-design.md)；QA / SE 主張連到 [Software Engineering](../topics/12-software-engineering.md)，此主題在 defense / mock 視同 Tier S。GPU / deployment 取捨連到 [Computer Architecture](../topics/10-computer-architecture.md)。

## Professor attack directions

- 你解決的是研究問題，還是把現有工具接起來？貢獻到底在哪裡？
- 最簡單的 baseline 能做到多少？比較是否有相同資源與調參機會？
- 哪個實驗支持你的因果解釋，而非只有 correlation？
- 如果拿掉你的關鍵設計，結果會如何？
- 你最不想展示的 failure case 是什麼？結論因此需要怎樣限縮？
- 給你更多 / 更少資料或算力，最優先做什麼，為什麼？

這些是訓練方向，不代表任何教授一定如此提問。每次只選一個問題，等待回答後再追問。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無答辯證據 | 未測 | 待實測後排定 |

以 [Weakness Map](../WEAKNESS_MAP.md) 的 Research / Project Defense 子題為準。
