# Databases

## Interview Scope

Tier A。能以 query、index、transaction 與 schema 設計解釋資料正確性及效能；區分理論概念與特定 DBMS 的實作 / 隔離行為。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| SQL basics | SELECT、WHERE、JOIN、GROUP BY、HAVING、ORDER BY；NULL 與 three-valued logic、COUNT(*) / COUNT(column) 的差別 |
| Index | 加速某些查詢的額外資料結構；read / write、space、selectivity、composite column order 與 query plan 的取捨 |
| B / B+ tree | 多路平衡樹與高 fanout 降低 I/O；B+ tree 在葉層存資料 / references 並利於 range scan，實際 DBMS 有不同變體 |
| Transaction | 一組操作的提交 / 回滾邊界；concurrent execution、failure 與可見性 |
| ACID | Atomicity、Consistency、Isolation、Durability；Consistency 包含定義的資料約束，不是 CAP consistency 的同義詞 |
| Isolation | Dirty read、non-repeatable read、phantom、lost update / write skew；SQL levels 與實際 DBMS 保證不能混用 |
| Normalization | Functional dependency、key、1NF / 2NF / 3NF 的目的；降低 redundancy 與 update anomalies，與 denormalization 的取捨 |

## Should Know

- Primary / foreign / unique constraints、composite index、covering index 的直覺。
- EXPLAIN、statistics、query selectivity、join cost；有 index 不代表 optimizer 一定使用。
- MVCC、locking、optimistic concurrency、deadlock、serialization failure 與 retry。
- WAL / recovery 的基本目的；transaction boundary 與 durability 設定的關係。
- BCNF、schema design、read-heavy / write-heavy workload 的不同選擇。

## Common Professor Questions

- 為何資料庫常使用 B-tree 家族 index，而非只用 hash table？
- 增加 index 為何可能讓系統更慢？
- 兩個使用者同時扣款，如何維持業務約束？
- ACID 各自保證什麼，在哪個層次定義 consistency？
- Normalization 如何避免資料異常？何時可能選擇 denormalization？

## Follow-up Questions

- 若查詢選出大部分資料，index 還可能划算嗎？
- Composite index 的欄位順序如何依查詢決定？哪些結論依 DBMS 而異？
- Repeatable Read 是否必然等同 Serializable？write skew 如何發生？
- Serializable transaction 被中止後，application 需要處理什麼？
- LEFT JOIN 的 filter 放 WHERE 或 ON，結果何時不同？

## Whiteboard / Coding Expectations

1. 用小 schema 寫 JOIN / aggregation，明確處理 NULL 與 row multiplicity。
2. 根據 query 設計候選 index，說明 read / write / space 成本及驗證方式。
3. 畫 transaction interleaving，指出 anomaly 與需要的保證。
4. 以 functional dependency 拆表，說明 keys、constraints 與可能的 JOIN 成本。
5. 口述交易開始、更新、commit / rollback、retry 的完整邊界，不只加一個 lock 名稱。

## Common Mistakes

- 宣稱每加一個 index 都會變快；忽略 write amplification 與 selectivity。
- 把 B-tree 與 binary tree 混淆，或假定所有 DB index 都相同。
- 把 isolation level 名稱當作所有 DBMS 的完全相同保證。
- 把 ACID consistency、replica consistency 與 CAP consistency 混為一談。
- 用 `column = NULL` 判斷 NULL，或忽略 JOIN 後重複列對 aggregate 的影響。

## Self-check Checklist

- [ ] 能寫 SQL 並解釋 NULL / JOIN / aggregation 語意。
- [ ] 能比較 index 選擇、B/B+ tree 與 query workload。
- [ ] 能解釋 transaction / ACID，展示至少一種 isolation anomaly。
- [ ] 能說明 DBMS 實作差異與 retry 的需求。
- [ ] 能從 functional dependencies 解釋 normalization trade-off。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [PostgreSQL：Indexes](https://www.postgresql.org/docs/current/indexes.html)
- [PostgreSQL：Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
