# Diagnostic Scoring Rubric

評分只依實際回答與教授追問。履歷、專案數、使用過的 library、閱讀完成或自信程度都不是熟練的證據。

## A / B / C / D

| Grade | 判準 | Weakness Map level |
| --- | --- | --- |
| A | 能精確回答，獨立解釋理由與必要推導，能處理教授追問與變形題 | Strong |
| B | 核心正確，但細節、推導、複雜度或追問仍有漏洞 | Review |
| C | 有印象但概念混亂，需要重新學習與組織 mental model | Weak |
| D | 不會，或回答有根本錯誤 | Critical |

**Untested** 是尚無實測證據，不是 D。N/A 代表該維度不適用；未進行 coding 只能標 Untested，不能從口述推定 coding ability。

## 評估維度

每個適用維度使用 A / B / C / D，並記一句具體證據。不以平均分數掩蓋核心錯誤。

| Dimension | 檢查內容 |
| --- | --- |
| correctness | 定義、結論、假設與邊界是否正確 |
| explanation | 能否用清楚的機制與小例子說明，而非重複題目 |
| depth | 能否說出適用條件、反例、替代方案與 trade-off |
| complexity analysis | 能否定義輸入尺度，分析 time / space，區分 worst / average / amortized |
| mathematical reasoning | 能否定義符號 / shape，推導必要步驟，說明使用的假設 |
| follow-up resilience | 條件變化與被質疑時，能否維持或修正正確推理 |
| coding ability | 能否把思路轉成正確 code，處理邊界、ownership 與小例子驗證 |

## 整體評級規則

- 核心命題有根本錯誤或無法回答，判 D；只有零碎印象或把不同概念混為一談，判 C。
- 核心正確但必要維度不完整，最多 B；缺乏追問證據的首答 A 只能是暫評。
- 演算法需要 code 的題目，未寫 code 時不能完成 coding 評定，也不能宣稱整題已獲 A。
- 要給整題 A，適用的必要維度都須有足夠證據，至少完成一層無提示追問 / 變形。
- 題目整體 grade 與子題 level 分開：一題可能測到多個子題，只更新確實被測的部分。
- 教學後立即答對記為 assisted improvement；日後閉卷獨立重測才作為升級證據。

## Record requirements

保留 first answer、provisional grade、follow-ups、提示 / 教學、獨立變形題、final diagnostic grade 及評分理由。若最終評級修正，說明新證據；首答依然保留。

一題說出名詞或背出公式但無法解釋，不能評 A；只說「差不多」「應該比較快」且無法補足必要條件，也不視為掌握。

## 狀態更新

在第 10 / 20 / 30 題同步 [Weakness Map](../WEAKNESS_MAP.md)。記錄 Last Tested 的實測日期、Evidence 的 session 連結與 Next Review；提升後仍保留歷史證據。獨立延後重測也可更新主表，不增加 Diagnostic 題數。
