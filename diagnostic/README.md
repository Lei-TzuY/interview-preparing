# Adaptive Diagnostic Interview

目標是透過 30 題主題題辨識口試基礎與追問韌性。目前完成 0 / 30；第 1 題已在對話提出但尚未作答，依使用者要求暫停，確認 repository 後才恢復。

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
- 30 題要涵蓋九個 topic 與 Research / Project Defense 共十個領域，每個領域至少一題；其餘題數依證據調整，Tier S 優先。
- 第 10 / 20 題檢查尚未覆蓋的領域，保留足夠題數完成覆蓋；不把某一題的結果外推到整個主題。

## 每 10 題檢查點

| Checkpoint | 工作 |
| --- | --- |
| 10 | 建立第一份實測 weakness snapshot，辨識已測部分與 Untested |
| 20 | 更新子題證據，檢查還未覆蓋的領域與早期錯誤 |
| 30 | 完成診斷總結，產生 Targeted Study 優先清單及 mock 起點 |

每個檢查點在實際 session 中保存 snapshot，再更新 [Weakness Map](../WEAKNESS_MAP.md)、[Progress](../PROGRESS.md) 與 topic Review Status。不要改寫歷史首答。

## Records

使用 [sessions 說明](sessions/README.md) 與 [session template](sessions/session-template.md)。評分必須有作答證據；尚未開始的 session 不建立假完成紀錄。
