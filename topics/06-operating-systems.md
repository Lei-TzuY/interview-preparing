# Operating Systems

## Interview Scope

Tier A。能用 process、concurrency 與 virtual memory 解釋程式實際執行時的行為。若研究涉及 inference server、parallelism 或 system optimization，依實測提高優先級。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Process / Thread | Process 的資源 / address space；同 process threads 共享部分資源，但各有執行狀態與 stack |
| Context switch | 保存 / 恢復 registers、scheduling 狀態；process / thread switch 的 address-space 與 cache / TLB 成本依情境不同 |
| Concurrency | 交錯進行與 parallel execution 的差別；不需要多 core 也可能有 concurrency bug |
| Race condition | 結果依執行時序；read-modify-write 並非天然 atomic，C++ data race 還涉及 undefined behavior |
| Mutex / Semaphore | Mutual exclusion / ownership 與計數資源控制；binary semaphore 不能無條件視為 mutex 的同義詞 |
| Deadlock | Mutual exclusion、hold and wait、no preemption、circular wait 四條件；prevention / avoidance / detection 與 starvation 不同 |
| Virtual memory | Address translation、protection、isolation；virtual 不等於全部在 disk，也不等於與 physical 一對一 |
| Paging | Page / frame、page table、TLB、page fault；TLB miss 不一定是 page fault，page fault 不一定涉及 disk |
| Scheduling | FCFS、SJF、round robin、priority；turnaround、response、waiting time、fairness 與 starvation |

## Should Know

- System call 與 user / kernel mode；blocking 與 busy waiting。
- Condition variable、producer-consumer、lost wakeup 與 predicate loop。
- Atomic operations、memory ordering 的基本界線，區分語言保證與硬體實作。
- Copy-on-write、page replacement、thrashing、CPU-bound / I/O-bound workload。

## Common Professor Questions

- 多 thread 共用什麼，不共用什麼？
- 單核心是否可能有 race condition？
- Mutex、semaphore、condition variable 各解決什麼問題？
- Page fault 與 TLB miss 有何差別？
- 為何 scheduling policy 沒有對所有工作都最優的選擇？

## Follow-up Questions

- 兩把鎖的取得順序不同，會發生什麼？如何修正？
- 用大鎖包住全部工作，正確性、throughput、latency 有何取捨？
- 更多 threads 為何不保證更快？
- 改變 time quantum，response 與 context-switch overhead 如何變化？
- 程式記憶體很大卻不常存取，與頻繁 random access 的行為有何差別？

## Whiteboard / Coding Expectations

1. 畫兩個 threads 的 interleaving，指出 lost update 與 critical section。
2. 畫 resource-allocation / wait-for 情境，辨識 deadlock 並提出一致鎖順序。
3. 用簡單 address / page size 算 page number 與 offset，示意 TLB / page table 查詢。
4. 手算小 scheduling timeline 的 waiting / turnaround / response time。
5. 寫或口述 mutex / RAII lock 保護共享資料的生命週期；先談正確性再談 lock 粒度。

## Common Mistakes

- 把 concurrency 等同 parallelism，或以為單 core 不會 race。
- 說所有 context switches 都必然 flush 全部 cache / TLB。
- 把 volatile 當成同步工具，或把 thread 共享資源理解為連 stack 都共用。
- 把 deadlock、livelock、starvation 混為一談。
- 把任何 page fault 都視為缺 RAM / disk I/O。

## Self-check Checklist

- [ ] 能精確比較 process / thread 與切換成本的條件。
- [ ] 能展示 race 的 interleaving，提出正確同步方案。
- [ ] 能說明 mutex / semaphore 與 deadlock 四條件。
- [ ] 能解釋 virtual memory、paging、TLB miss 與 page fault。
- [ ] 能比較 scheduling 指標與 trade-off。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [Operating Systems: Three Easy Pieces（作者網站）](https://pages.cs.wisc.edu/~remzi/OSTEP/)
