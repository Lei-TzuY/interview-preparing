# Computer Architecture

## Interview Scope

Tier A。因有 GPU inference / deployment 經驗，CPU/GPU architecture、memory hierarchy 與效能瓶頸在口試中提高優先級；經驗不等於能力已測。回答要連到指令、資料搬移、工作量與測量條件。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| ISA vs microarchitecture | ISA 是軟體可見的指令 / 行為契約；microarchitecture 是實現方式，同 ISA 可有不同 pipeline / cache |
| CPU instruction execution basics | Fetch、decode、執行、memory access、完成 / retirement 的角色；不把教學 CPU 當成所有現代 CPU |
| Registers / ALU / load-store | Registers 保存運算狀態，ALU 做運算；load / store 在 registers 與 memory 間搬資料 |
| Pipeline | 重疊不同指令的階段，改善 throughput；不保證單指令 latency 更短 |
| IF / ID / EX / MEM / WB | 五階段 in-order 教學模型的直覺、資料流與階段暫存；實際 CPU 不必剛好五階段 |
| Data hazards | 以 RAW dependency 說明 consumer 等 producer；WAR / WAW 與 out-of-order / renaming 的關係 |
| Control hazards | Branch 尚未確定時，後續指令的控制流可能錯誤，需要等待或 speculation |
| Forwarding / stall | 轉送已產生的值可減少等待；load-use 等情境仍可能 stall，依 pipeline 時序判斷 |
| Branch prediction | 預測控制流以降低等待；misprediction 要付重新導向 / 清除錯誤工作等成本 |
| Cache | 用小而快的儲存留住可重用資料；效果取決於 access pattern、容量與政策 |
| Cache line | 搬移 / coherence 常以 line 為單位；line 大小依架構，不等於只取單一變數 |
| Temporal locality | 近期使用的資料 / 指令可能再次使用；能舉迴圈重用例子 |
| Spatial locality | 相近位址可能很快被使用；連續存取與 pointer chasing 的差別 |
| Cache hit / miss | 是否在該層找到資料；miss 往下一層查找，不等於 disk access |
| Memory hierarchy | 用多層容量、成本、速度的取捨服務工作集；區分不同層的 hit / miss |
| Register / cache / DRAM / storage | 各層用途、容量與存取成本；virtual memory / storage 不與 cache 混為一談 |
| Latency vs bandwidth | 一次操作的延遲與單位時間資料量；throughput 是完成工作的速率，需說清單位 |
| Interrupts / exceptions | 常見直覺是外部非同步事件與指令引起的同步事件；具體命名依 ISA / OS |
| I/O basics | Device controller、memory-mapped I/O、polling / interrupt 與驅動的分工 |
| DMA | 裝置可搬移資料而不用 CPU 逐筆複製；CPU 仍需設定、同步與處理完成，注意 coherence / ownership |
| Multicore | 平行工作、共享資源、同步與 contention；更多 core 不代表線性加速 |
| Cache coherence | 多 cache 對同一位址的讀寫可見性協調；不等於完整 memory consistency 或程式同步 |
| Coherence != thread safety | Cache coherence 不能使 read-modify-write 自動 atomic，也不能代替 mutex / atomics |
| CPU vs GPU | CPU 偏重低延遲控制與通用工作；GPU 適合大量可並行工作，取決於資料與 kernel |
| SIMD / SIMT intuition | SIMD 指令操作多個 lanes；SIMT 以 threads 編程並以群組執行，兩者關聯但不完全相同 |
| GPU warp / thread execution intuition | NVIDIA warp 是執行群組，AMD 有 wavefront 等術語；群組大小與排程依架構 |
| Branch divergence | 同群組 threads 走不同路徑可能降低有效平行度；不等於任何 if 都一定昂貴 |
| Memory coalescing | 同群組的合適位址存取可減少 memory transactions；alignment、stride 與有效 bytes 影響效率 |
| Host-device transfer cost | 介面、資料量、同步與 copy 次數會限制加速；GPU kernel 快不代表 end-to-end 快 |

## Should Know

| Subtopic | 延伸回答要求 |
| --- | --- |
| Amdahl's law | 理想固定工作量下 $S(N)=1/((1-p)+p/N)$；序列部分與實際同步 / 搬移成本限制加速 |
| TLB vs cache | TLB 快取 address translations；data / instruction cache 快取內容，miss 的後果不同 |
| False sharing | 不同變數共用 coherence line，寫入互相干擾；與真正共享同變數不同 |
| NUMA basics | 不同 CPU 到 memory 的成本不同；thread placement 與資料位置會影響效能 |
| Prefetching | 提前取可能用到的資料；可能浪費 bandwidth 或污染 cache |
| Compute-bound vs memory-bound | 用運算量、有效 bytes、等待與 profiler 證據辨識，而非看 GPU utilization 一個數字 |
| GPU occupancy basic intuition | Active warps / 可用上限的比例；受 registers / shared memory 等限制，高 occupancy 不保證最優 |
| Shared memory / cache / VRAM relationship | Shared memory 是程式可管理的 on-chip 空間；cache 與 off-chip VRAM 職責不同，配置依架構 |
| Roofline model intuition | Arithmetic intensity = operations / bytes；性能上界受 compute ceiling 與 bandwidth × intensity 共同限制 |

## Common Professor Questions

- 為什麼 cache 有效？什麼程式不容易受益？
- 多核心為什麼不會線性加速？
- GPU 為什麼適合 matrix multiplication？
- VRAM 夠大是否代表 inference 一定快？
- 模型塞得下但 latency 很差，你會檢查什麼？

## Follow-up Questions

- Sequential access 改成 random access / pointer chasing，locality 與等待如何改變？
- Pipeline 更深或 clock frequency 更高，哪些代價可能抵銷收益？
- Cache coherence 已啟用，兩個 threads 的 increment 是否安全？
- Matrix size 很小、batch 很小或 transfer 很多時，GPU 的優勢還成立嗎？
- 請拆解 prefill / decode、kernel、memory、copy、queue 與同步，如何以測量定位瓶頸？
- 多張 GPU 各跑獨立服務，與 tensor / pipeline parallelism 的成本有何不同？

## Whiteboard / Coding Expectations

1. 畫五階段教學 pipeline，對兩三條依賴指令判斷 forwarding / stall，不假設所有 CPU 相同。
2. 用簡化 cache 計算 line / hit / miss，分析連續與跨 stride 存取。
3. 畫 CPU、DRAM、GPU、VRAM 的資料流，指出 host-device copy 與 synchronization。
4. 用固定工作量推 Amdahl bound；估算 operations / bytes 並說明估算省略項。
5. 設計 microbenchmark：固定 workload、warm-up、同步計時、重複測量與硬體 / dtype 記錄。

## Common Mistakes

- Clock frequency = performance；GPU core 多就必定快。
- Cache miss = disk access；TLB = data cache。
- Coherence = mutex；不需要另外同步共享更新。
- 混淆 latency、throughput、bandwidth 與 capacity。
- 用 VRAM 容量、最高 occupancy 或單一 kernel 時間代替 end-to-end 證據。

## Self-check Checklist

- [ ] 能區分 ISA / microarchitecture，解釋指令與 pipeline hazards。
- [ ] 能解釋 cache line、兩種 locality 與 memory hierarchy。
- [ ] 能區分 interrupts、I/O、DMA 與 CPU 的角色。
- [ ] 能解釋 multicore、coherence 與 thread safety 的界線。
- [ ] 能用 SIMD / SIMT、divergence、coalescing 解釋 GPU 行為。
- [ ] 能設計測量來區分 compute、memory、transfer 與同步瓶頸。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準。連到 [OS](06-operating-systems.md)、[Transformer / LLM](05-transformer-llm.md) 與 [Experimental Design](11-statistics-experimental-design.md) 做跨題訓練。

## References

- [MIT 6.004：Computation Structures](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/)
- [NVIDIA：CUDA C++ Best Practices Guide](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html)
