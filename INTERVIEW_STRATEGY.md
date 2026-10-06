# Interview Strategy

目標是讓教授能判斷你知道什麼、如何推理、遇到未知如何縮小問題。回答精確比名詞多更重要。

## 基本回答框架

1. **確認問題與假設**：輸入、限制、資料分布、模型或執行環境。
2. **先說結論**：用一兩句回答教授正在問的重點。
3. **說明機制**：直覺 → 正式定義 → 小例子 → 必要數學。
4. **交代代價與限制**：複雜度、假設、trade-off、反例或 failure case。
5. **停在可追問的位置**：基本回答先控制在約 60–90 秒，深入推導依問題展開。

計時是表達練習，不是所有學校的固定口試規則。教授打斷時先回應新問題，再回到原本論點。

## 演算法與白板

- 先 verbalize：可先說直接方法，再指出瓶頸與改進依據。
- 明確說出 invariant、狀態定義或正確性論證，不能只說「這樣比較快」。
- Time / space complexity 要定義 n、V、E 等輸入尺度，說明 worst / average / amortized 的差別。
- Code 前先確認語言、介面與邊界；code 後用空輸入、重複值、極端值等小例子手動走一遍。
- 指出額外空間、遞迴 stack、整數 overflow、ownership 與 invalidation 問題。

## Math / ML / DL

- 定義符號與 shape；每一步推導說明使用哪個假設或規則。
- 說出 objective、optimization 與 evaluation 的差別。
- 說明資料切分及 leakage 風險，不以 training loss 代替泛化證據。
- 先建立 intuition，再給公式；能說明公式在哪些條件下不適用。
- 用實際評估設計回答「如何知道有效」，不只列 accuracy / F1 的名稱。

## Research / Project Defense

以 [defense framework](research-defense/README.md) 組織回答。第一人稱的貢獻必須清楚界定，引用數字時能指出實驗紀錄、commit 或論文版本。

研究型回答要分清 observation（實際看到的結果）、hypothesis（待檢驗解釋）、causal claim（需識別條件支持的因果）、statistical evidence（模型假設與不確定性）及 practical significance（效果是否值得成本）。用 [Experimental Design](topics/11-statistics-experimental-design.md) 檢查推論，不以單一顯著性門檻代替結論。

系統 / SE 回答要分清 correctness（符合規格）、reliability（指定情境下持續運作）、performance（指定 workload 的成本）、scalability（規模增加時的變化）、maintainability（變更與理解成本）、reproducibility（能重現過程 / 結果）。每個維度要對應自己的證據；見 [Software Engineering](topics/12-software-engineering.md) 與 [portfolio inventory](research-defense/portfolio-index.md)。

| 教授追問方向 | 應展示的能力 |
| --- | --- |
| 為什麼值得做？ | 具體問題、使用情境、研究缺口與可驗證目標 |
| 你本人做了什麼？ | 個人工作、團隊分工、實作 / 分析與外部工具的界線 |
| 為什麼選這個方法？ | 替代方案、比較條件與取捨理由 |
| 怎麼知道結果有效？ | baseline、資料切分、消融、metrics 與公平比較 |
| 哪裡做不好？ | failure cases、限制、適用範圍與下一個實驗 |

## 逐層追問

每次只問一個追問，等回答再深入。基本方向為「為什麼成立 → 成本與替代方案 → 改變條件 / 反例」；依證據選 1–3 層，不一次把三層全丟出。

若遇到根本錯誤，先點出最核心的一點，按直覺 → 定義 → 例子 → 數學教學，再用變形題檢查。提示後的改善與首次表現分開記錄。

## 不知道時如何回答

- 明確說出不確定的部分，以及已知的條件。
- 從定義或簡單案例推理；把猜測標為假設，不冒充已知結論。
- 若無法完成推導，指出卡在哪一步及如何驗證。
- 被指出錯誤時，修正假設、重新推理，不用其他名詞迴避問題。

## 訓練紀律

- 一次一題，作答前不揭示答案；閉卷首答可直接說不會。
- 評級依 [A–D rubric](diagnostic/scoring-rubric.md)，不因經驗豐富或表達流利放寬 correctness。
- 模糊地「差不多對」不能算完全掌握；看過答案、用過框架也不等於會推導。
- 每個改善事項必須有下一次驗證；時間不足就保留未完成與未知的狀態。
