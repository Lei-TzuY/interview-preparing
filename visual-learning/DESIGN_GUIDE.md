# Visual Learning Design Guide

**A visualization is justified only when it improves the learner's mental model.**

先評估優質公開互動 / 視覺資源，再決定是否 local。若已有更好的工具，保留外部連結與理由；local 只補 tiny numeric / interview connection。Static 能解釋清楚時不動畫，decision / experimental reasoning 用 scenario，無視覺增益則明確標 No Visualization Needed。

## Lesson contract

每個 local interactive lesson 有一致的 11 個區塊：Concept、Why oral、Intuition、Tiny example、Interactive visualization、Step mechanism、Formal definition / formula、Misconception / edge case、30-second self explanation、Interview follow-up、References。

先看最小 state，再連 mechanism / 正式符號。公式逐步 highlight，矩陣標 shape / indices，inspector 能核對 intermediate values。Self explanation 只給提示，不填標準答案；follow-up 只列問題，不預展開答案。範圍維持既有 232 index，沒有新的考試題數。

## Numeric fidelity

- Calculations / traces 是純函式，與 DOM drawing 分離；畫面、表格與 inspector 使用同一 model，不填假數值。
- 明示 teaching scale、inputs、axes、unit、convention 及省略項。合成資料與 arbitrary units 不得當本人研究 results 或硬體 benchmark。
- Softmax subtract-max，CE 由 logsumexp 計算；rounding 僅供 display，不把四捨五入 probabilities 帶回 loss。
- Attention 先標 E / W / Q / K / V shapes，再逐步算 score、scaling、mask、row probabilities 與 weighted sum。全 mask row 無定義，不能偷偷歸一化成均勻。
- Scaling simulation 的 q/k 分量為獨立零均值 unit variance draws；固定 E/W toy 不滿足此假設，不能以它宣稱一般 variance theorem。Var / SD 分開；softmax Jacobian 對角不是完整 task gradient。
- Metrics 的零分母顯示未定義；不強制採某 library 的 zero_division policy。
- 本 decoder 明確採 **Pre-LN**，original paper 為 Post-LN；normalization axes、γ/β/ε 不能省略說明。
- CNN 為單 channel VALID **cross-correlation**、不 flip kernel；未計算 output 用 N/A。
- Pipeline 是明示時序的五階段 in-order toy；cache 是 fully-associative LRU；page fault / TLB miss / data-cache miss / storage I/O 獨立處理。
- KV position counts 是省下哪些 K/V projection 的 bookkeeping，不是 runtime speedup；memory formula 明示 batch、layers、KV heads、dim、precision 與 omitted overhead。

## Interaction / accessibility

預設不 autoplay。Manual Previous / Next / Reset 與 Play / Pause / Speed 共用 StepController；改參數立即 pause / reset，頁面隱藏停止播放。Reduced-motion 禁用自動播放、移除 motion，仍可手動逐步學習。

Semantic heading / table / caption / labels；keyboard Tab、buttons / sliders、focus ring、skip link、live step status。視覺區可聚焦後用左右鍵切換。Draggable vector 另有 x/y sliders，color 之外有 labels、indices、state text。Mobile cards 單欄、table 可水平捲動，不把長矩陣壓成不可讀文字。無音效。

靜態 SVG 是原創，具 title / desc / 外部 alt，annotation buttons 補意義。Scenario 先決策後看 consequences，沒有分數 / correctness badge，也不寫 learner status。

## Firewall boundary

Homepage / lesson URL 每次載入都要求確認「closed-book 首答已保存」及「教練已指定需要補強」。Teaching modules 只在確認後 dynamic import。外部 card 另確認後提供正常新分頁 link；不 iframe、不 preload 外部 assets。

這是 honor / coach workflow gate，不是假裝已核對證據。所有 resource `requiresBlindAttempt=true`；app 沒有 grade writer、session editor、recommendation algorithm 或持久 unlock。原始碼與索引可直接讀，仍需使用者遵守首答隔離。

## References / ownership

只選原作者、university / established educator、官方 documentation / demo 或 primary paper。記錄 title、URL、category、checked date、quality / access notes。查核可達與內容合理，不宣稱每個第三方控制都已完整測試。

VisuAlgo / Transformer Explainer / Seeing Theory 等以正常 hyperlink 使用；外部可能變更、要求 login、下載模型或記錄 cookies，local 不代管。引用 paper figures 的做法是連到原 paper，不搬圖。禁止 copied animations、screenshots、media、source code 或 weights；本地 SVG / renderer 為原創。

## Change gates

1. Generated INDEX / RESOURCE_MAP 與 manifest 一致；232 exact (Topic,Subtopic) keys 唯一，不増 syllabus。
2. Local paths、source IDs、HTML / Markdown links / SVG assets 可定位。
3. Numerical oracle、gradient finite difference、shape / stability / mask / edge cases tests 通過。
4. Browser 有可執行 binary 時驗證 gating、controls、keyboard、responsive、reduced-motion、console / network；不可用則明確記 **NOT RUN**，不能以靜態掃描冒充 browser pass。
5. 本次變更不能動 cold baseline、Weakness Map、Progress、mistake log 或 topic review grades；資料寫入只在未來真實作答後由既有流程進行。
