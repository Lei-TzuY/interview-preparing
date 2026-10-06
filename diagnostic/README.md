# Adaptive Diagnostic Interview

目標是透過 30 題主題題辨識口試基礎與追問韌性。目前完成 0 / 30；第 1 題已在對話提出但尚未作答，暫停至使用者確認本次 repository expansion 後才恢復。

## Session protocol

1. 一次只提出一題，先讓準備者回答；不提供答案、提示解法或一次公開完整題庫。
2. 依 [scoring rubric](scoring-rubric.md) 初評 A / B / C / D，記錄原始答案與依據。
3. 一次一個追問，依回答深入 1–3 層：理由、成本、trade-off、條件變化或反例。
4. 答錯時先指出核心錯誤，再依直覺 → 正式定義 → 例子 → 必要數學補教。
5. 教學後改變條件重答，與獨立首答分開；不以立刻複述新答案升級為 Strong。
6. 記錄本題後才提出下一題。演算法依口述 → 正確性 / 複雜度 → code 的順序，ML / DL 要檢查數學、intuition 與 failure cases。

主題題完成是指已作答、評定、追問並留下紀錄；回答「不會」也可形成 D 級證據。只出題未作答不算完成；追問、重答與 review 不占新題號。

## Adaptive 選題

- 從基本但高鑑別度的概念與小問題開始，不依履歷推定能力。
- A：改問限制、反例與條件變化，或轉入相鄰主題檢查覆蓋。
- B：追查推導、邊界、複雜度與被省略的假設。
- C / D：定位缺少的前置知識，教學後安排未來獨立重測。
- 30 題要涵蓋 12 個 technical topics + Research / Project Defense = **13 個領域**，每個領域至少有一筆真正實測 evidence；不要求平均配題，Tier S 與實際弱點可取得較多題數。
- Coverage 依已回答、評定且有 session 紀錄的領域計算；只出題、讀文件或追問提及名詞不算實測。跨題可覆蓋多領域，但每個領域都要有足夠作答與評分證據。
- 不為 coverage 硬塞低價值問題；用基本但有鑑別度、與準備目標相關的題目。未測子題保持 Untested，追問不另計 main question。
- 第 10 / 20 題檢查尚未覆蓋的領域，保留足夠題數完成覆蓋；不把某一題的結果外推到整個主題。

## Coverage domains

| Domain | Training scope | Initial evidence |
| --- | --- | --- |
| 01 Data Structures & Algorithms | [DSA](../topics/01-data-structures-algorithms.md) | Untested |
| 02 Math for ML | [Math](../topics/02-math-for-ml.md) | Untested |
| 03 Machine Learning | [ML](../topics/03-machine-learning.md) | Untested |
| 04 Deep Learning | [DL](../topics/04-deep-learning.md) | Untested |
| 05 Transformer / LLM | [Transformer / LLM](../topics/05-transformer-llm.md) | Untested |
| 06 Operating Systems | [OS](../topics/06-operating-systems.md) | Untested |
| 07 Computer Networks | [Networks](../topics/07-computer-networks.md) | Untested |
| 08 Databases | [Databases](../topics/08-databases.md) | Untested |
| 09 C/C++ | [C/C++](../topics/09-cpp.md) | Untested |
| 10 Computer Architecture | [Architecture](../topics/10-computer-architecture.md) | Untested |
| 11 Statistics / Experimental Design | [Statistics / Experimental Design](../topics/11-statistics-experimental-design.md) | Untested |
| 12 Software Engineering | [SE](../topics/12-software-engineering.md) | Untested |
| 13 Research / Project Defense | [Defense](../research-defense/README.md) / [Portfolio](../research-defense/portfolio-index.md) | Untested |

這是領域索引，不公開完整 Diagnostic 題庫或答案。Software Engineering 在 defense / mock 中視同 Tier S，其他配題規則見 [Roadmap](../ROADMAP.md)。

## 每 10 題檢查點

| Checkpoint | 工作 |
| --- | --- |
| 10 | 建立第一份實測 weakness snapshot，辨識已測部分與 Untested |
| 20 | 更新子題證據，檢查還未覆蓋的領域與早期錯誤 |
| 30 | 完成診斷總結，產生 Targeted Study 優先清單及 mock 起點 |

每個檢查點在實際 session 中保存 snapshot，再更新 [Weakness Map](../WEAKNESS_MAP.md)、[Progress](../PROGRESS.md) 與 topic Review Status。不要改寫歷史首答。

## Records

使用 [sessions 說明](sessions/README.md) 與 [session template](sessions/session-template.md)。評分必須有作答證據；尚未開始的 session 不建立假完成紀錄。
