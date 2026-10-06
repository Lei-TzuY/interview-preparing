# Spaced Repetition

用延後閉卷重答確認能否自行推理。以下間隔是訓練預設，可依面試日期與實測結果調整；不是保證記憶效果的固定公式。

## Review policy

| Level | 第一輪安排 | 重測方式 |
| --- | --- | --- |
| Critical | 教學後當次做 assisted check，另排約 +1、+3、+7、+14 天的獨立重測 | 從前置定義與小例子重建，再測必要推導 |
| Weak | 約 +1、+3、+7、+14 天 | 換一個例子或限制，要求理由 / 推導與追問 |
| Review | 約 +3、+7、+14 天 | 集中測原先細節、邊界與變形題 |
| Strong | 約 +7、+14 天或下一次 mock | 隨機跨題抽問，確認隔一段時間仍能回答 |
| Untested | 排入診斷或 coverage check | 首次作答，不算複習成功 |

所有間隔從實際測驗 / 修正日期起算。若剩餘準備期不足，縮短並記錄原因；若逾期，標 overdue，下一次訓練優先處理，不假填完成。

## 每次 review

1. 關閉筆記，先回答原概念或同技能的變形題。
2. 一次追問一個理由、trade-off、複雜度或條件變化，至少檢查原先漏洞。
3. 用 [rubric](../diagnostic/scoring-rubric.md) 記錄無提示表現；提示後改善另外記。
4. 失敗就縮短間隔並重新定位錯誤；成功後延長間隔。
5. 更新 [mistake log](../mistakes/mistake-log.md)、[Weakness Map](../WEAKNESS_MAP.md) 與相關 topic Review Status。

A 級可把目前狀態更新為 Strong，但一次立即重答不能成立。連續兩次延後獨立重測達 A 且能回答變形題，才將錯誤標為 Resolved；已解決仍可在 mock 抽考。

## Review queue

目前沒有到期項目，因尚未有實測結果。每列對應一個真實待重測項目，不預填日期或能力。

| Topic / Subtopic | Current Level | Evidence | Last Tested | Next Review | Method | Status |
| --- | --- | --- | --- | --- | --- | --- |

Status 使用 Scheduled、Due、Overdue、Completed；完成一輪後保留證據，新增或更新下一輪安排。

## Review evidence

| Date | Topic / Subtopic | Question / Variation | My answer | A–D | Assistance | Next interval | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

回看教材不計為實測。日期採 Asia/Taipei，Evidence 連結到實際 session 或白板 / code；獨立 review 不增加 Diagnostic 的 30 題計數。
