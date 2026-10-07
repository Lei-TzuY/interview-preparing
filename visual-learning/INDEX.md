<!-- Generated from app/manifest.js by scripts/build-index.mjs; edit the canonical manifest instead. -->

# Visual Learning Index

> 首答前勿開啟對應資源。僅在 session 保存 cold baseline、且教練指定補強後使用。教材 coverage 與實測 mastery 分開；閱讀後立即重答只算 Assisted Improvement。

既有 syllabus 共 12 technical topics + Research / Project Defense、232 subtopics；24 個本地互動 lesson、74 筆資源。資源 priority 使用原有 Tier，不表示個人能力。

| Resource Type | Resources | Primary subtopic decisions |
| --- | ---: | ---: |
| Local Interactive | 24 | 49 |
| Static Diagram | 8 | 28 |
| Scenario Drill | 14 | 114 |
| External Interactive | 16 | 24 |
| External Visual Explanation | 6 | 8 |
| No Visualization Needed | 6 | 9 |

Primary decision 共 232 / 232；supplemental links 不重複增加 coverage。Ready / External / Planned / Not Needed 是**教材可用狀態**，不是 Strong / Review / Weak / Critical。

## Data Structures & Algorithms

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Binary Search Invariant](app/lessons/binary-search.html) | Local Interactive | S | Ready | Binary search | 半開區間與重複值；local 補 lower_bound 的可逆 tiny trace。 |
| [BFS vs DFS](app/lessons/bfs-dfs.html) | Local Interactive | S | Ready | Graph、BFS / DFS | 同一 tiny graph 的 frontier、parents 與 discovery / processing。 |
| [Heap Operations](app/lessons/heap-operations.html) | Local Interactive | S | Ready | Heap | 小型 min-heap 的 array / tree 同步；不是替代完整 VisuAlgo。 |
| [Tiny Dynamic Programming](app/lessons/dynamic-programming.html) | Local Interactive | S | Ready | Dynamic programming | 同一 Fibonacci 的 recursion 重複、memo 與 bottom-up。 |
| [Algorithm Choice / Counterexample](app/lessons/algorithm-choice.html) | Scenario Drill | S | Ready | Greedy | 選擇策略，檢查假設與反例，不增加新的 Diagnostic。 |
| [List / Stack / Queue](https://visualgo.net/en/list) | External Interactive | S | External | Array / List、Stack / Queue | 指標與 ADT 操作已有完整工具。 |
| [Hash Table](https://visualgo.net/en/hashtable) | External Interactive | S | External | Hash table | Collision / probing 視覺已有成熟工具。 |
| [BST / AVL](https://visualgo.net/en/bst) | External Interactive | S | External | BST | 樹操作已有完整工具。 |
| [Sorting](https://visualgo.net/en/sorting) | External Interactive | S | External | Sorting | 多排序、輸入與速度比較；不做 inferior duplicate。 |
| [Union-find](https://visualgo.net/en/ufds) | External Interactive | S | External | Union-find | Forest / compression 已有成熟工具。 |
| [Shortest Path](https://visualgo.net/en/sssp) | External Interactive | S | External | Shortest path | 已有 weighted / unweighted 假設對照。 |
| [Big-O Oral Definition](../topics/01-data-structures-algorithms.md) | No Visualization Needed | S | Not Needed | Big-O | 漸近定義與反例靠口述 / 推導，沒有必要再畫動畫。 |

## Math for ML

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Vector / Matrix Transformation](app/lessons/matrix-transform.html) | Local Interactive | S | Ready | Linear algebra、Vector / Matrix、Norm | 拖曳向量、換矩陣，連回 basis 與 numeric output。 |
| [Eigenvector / Eigenvalue](app/lessons/eigenvectors.html) | Local Interactive | S | Ready | Eigenvalue / Eigenvector | 改向量角度，查看方向、比例與沒有 real eigenvector 的情況。 |
| [Gradient Descent](app/lessons/gradient-descent.html) | Local Interactive | S | Ready | Derivative、Gradient | 修改 learning rate，逐步看參數、梯度與 loss。 |
| [Chain Rule · Tiny Graph](app/lessons/chain-rule.html) | Local Interactive | S | Ready | Partial derivative、Chain rule | 可核算的 forward values、local derivatives 與 backward product。 |
| [Rank / SVD Geometry](app/lessons/linear-geometry.html) | Static Diagram | S | Ready | Rank、SVD | 原創幾何拆解；用圖區分 collapse 與 orthogonal / scaling。 |
| [Dot Product Geometry](https://www.3blue1brown.com/lessons/dot-products/) | External Visual Explanation | S | External | Dot product | 成熟投影動畫比只畫箭頭有價值。 |
| [Probability / Expectation / Variance](https://seeing-theory.brown.edu/basic-probability/index.html) | External Interactive | S | External | Probability、Expectation、Variance | 直接操作 distribution 與 repeated draws。 |
| [Conditional Probability](https://seeing-theory.brown.edu/compound-probability/index.html) | External Interactive | S | External | Conditional probability | 直接操作縮小後的 sample space。 |
| [Bayes Theorem](https://seeing-theory.brown.edu/bayesian-inference/index.html) | External Interactive | S | External | Bayes theorem | Prior / evidence 的視覺更新。 |

## Machine Learning

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Gradient Descent](app/lessons/gradient-descent.html) | Local Interactive | S | Ready | Gradient descent | 修改 learning rate，逐步看參數、梯度與 loss。 |
| [Linear vs Logistic Regression](app/lessons/regression.html) | Local Interactive | S | Ready | Linear regression、Logistic regression | 同一 score 與 sigmoid / threshold；處理 w=0。 |
| [Underfitting vs Overfitting](app/lessons/overfitting.html) | Local Interactive | S | Ready | Overfitting、Regularization | 合成資料上改 polynomial complexity / regularization；不是普遍證明。 |
| [Precision / Recall / F1](app/lessons/confusion-matrix.html) | Local Interactive | S | Ready | Precision / Recall / F1 | 直接調四個 counts；未定義的 denominator 不偷偷填 0。 |
| [Tiny Network · Forward + Backprop](app/lessons/tiny-network.html) | Local Interactive | S | Ready | Loss | 兩個 hidden units；逐步看 values、gradients 與 update。 |
| [Softmax + Cross Entropy](app/lessons/softmax-cross-entropy.html) | Local Interactive | S | Ready | Cross entropy | 調 logits，查看 stabilized exp、概率與 logsumexp loss。 |
| [Data / Validation Decisions](app/lessons/data-validation.html) | Scenario Drill | S | Ready | Supervised / Unsupervised、Train / Validation / Test | Labels、leakage、split、tuning / test reuse 的決策。 |
| [Decision Tree](https://mlu-explain.github.io/decision-tree/) | External Interactive | S | External | Decision tree | 已有 split / decision boundary 互動。 |
| [Bias–variance](https://mlu-explain.github.io/bias-variance/) | External Interactive | S | External | Bias–variance | 已有模型複雜度與變異的原創工具。 |
| [SVM / Ensemble Visual Chapters](https://www.statlearning.com/) | External Visual Explanation | S | External | SVM、Ensemble | 作者的開放 textbook 圖解；只讀相關章節。 |

## Deep Learning

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Tiny Network · Forward + Backprop](app/lessons/tiny-network.html) | Local Interactive | S | Ready | Backpropagation | 兩個 hidden units；逐步看 values、gradients 與 update。 |
| [Softmax + Cross Entropy](app/lessons/softmax-cross-entropy.html) | Local Interactive | S | Ready | Softmax、Cross entropy | 調 logits，查看 stabilized exp、概率與 logsumexp loss。 |
| [CNN Convolution](app/lessons/convolution.html) | Local Interactive | S | Ready | CNN | 4×4 image / 2×2 kernel；逐格 dot product 與 stride。 |
| [Scaled Dot-Product Attention](app/lessons/scaled-dot-product-attention.html) | Local Interactive | S | Ready | Attention | Flagship：tiny shapes、score inspector、mask 與獨立 variance simulation。 |
| [BatchNorm / LayerNorm Axes](app/lessons/normalization.html) | Static Diagram | S | Ready | BatchNorm、LayerNorm | 原創矩陣圖標出 reduction axes，避免混淆 train / eval。 |
| [Training / Inference Decisions](app/lessons/training-mode.html) | Scenario Drill | S | Ready | SGD / Adam、Dropout | Optimizer、dropout、mode 與 cache 的使用條件。 |
| [Activation / Decision Boundary](https://playground.tensorflow.org/) | External Interactive | S | External | Activation functions | 多種 activation 與模型 boundary 已有成熟工具。 |
| [RNN / LSTM Diagram](https://colah.github.io/posts/2015-08-Understanding-LSTMs/) | External Visual Explanation | S | External | RNN / LSTM | 原作者 RNN 展開與 LSTM gates 的逐步圖解；不重畫成熟教材。 |

## Transformer / LLM

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Scaled Dot-Product Attention](app/lessons/scaled-dot-product-attention.html) | Local Interactive | S | Ready | Self-attention、Q / K / V | Flagship：tiny shapes、score inspector、mask 與獨立 variance simulation。 |
| [Multi-Head Attention](app/lessons/multi-head-attention.html) | Local Interactive | S | Ready | Multi-head attention | 兩個 projected spaces、patterns、concat 與 output projection。 |
| [KV Cache · Prefill / Decode](app/lessons/kv-cache.html) | Local Interactive | S | Ready | Training vs inference、Context window | 比較重新計算的 token positions 與 cache bytes；不是速度 benchmark。 |
| [Transformer Decoder · Pre-LN](app/lessons/decoder-block.html) | Local Interactive | S | Ready | Transformer architecture | 本圖採 Pre-LN：兩次 norm、兩次 residual 與 tiny MLP。 |
| [Fine-tuning / RAG / Claims](app/lessons/rag-flow.html) | Static Diagram | S | Ready | Fine-tuning、RAG、Hallucination | 原創 weights / retrieval boundary；可追溯文件不保證生成無錯。 |
| [Training / Inference Decisions](app/lessons/training-mode.html) | Scenario Drill | S | Ready | Training vs inference | Optimizer、dropout、mode 與 cache 的使用條件。 |
| [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) | External Interactive | S | External | Tokenization、Context window | Tokenization / forward / generation 的完整工具。 |
| [LoRA Diagram](https://arxiv.org/pdf/2106.09685) | External Visual Explanation | S | External | LoRA | 用原 paper 的 low-rank 圖與 shapes。 |
| [QLoRA / Quantization Diagram](https://arxiv.org/pdf/2305.14314) | External Visual Explanation | S | External | QLoRA、Quantization | 用原 paper 的 frozen base / adapters 圖。 |
| [Positional Encoding Diagram](https://jalammar.github.io/illustrated-transformer/) | External Visual Explanation | S | External | Positional encoding | 原作者的 positional signal 圖；原架構與 local Pre-LN 分開。 |

## Operating Systems

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Process / Thread / Context Switch](app/lessons/process-thread.html) | Local Interactive | A | Ready | Process / Thread、Context switch | Address-space / heap 共享邊界與各 thread context。 |
| [Virtual Memory / TLB / Fault](app/lessons/virtual-memory.html) | Local Interactive | A | Ready | Virtual memory、Paging | Walk、mapping、fault、DRAM 與 storage I/O 分開。 |
| [Create / Break Deadlock](app/lessons/deadlock.html) | Local Interactive | A | Ready | Deadlock | Single-instance request / allocation graph 與四個必要條件。 |
| [Concurrency / Synchronization](app/lessons/concurrency-contract.html) | Scenario Drill | A | Ready | Concurrency、Race condition、Mutex / Semaphore、Scheduling | 共享更新、mutex / semaphore、coherence 與 scheduling 的反例。 |

## Computer Networks

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [TCP · Connection / Reliable Delivery](app/lessons/tcp-delivery.html) | Local Interactive | A | Ready | 3-way handshake | SYN / ACK、byte sequence、資料或 ACK loss 的 tiny trace。 |
| [Network Layers / DNS / TLS](app/lessons/network-stack.html) | Static Diagram | A | Ready | OSI / TCP-IP basics、TCP vs UDP、HTTP / HTTPS、DNS、TLS、IP、Routing basics | 原創 protocol / name / routing boundary 圖，不硬做封包動畫。 |

## Databases

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Database Dependencies](app/lessons/database-dependencies.html) | Static Diagram | A | Ready | Normalization | 原創 schema / functional-dependency 圖，說明 normalization 的取捨。 |
| [Transaction / Isolation Schedule](app/lessons/transaction-schedule.html) | Scenario Drill | A | Ready | Transaction、ACID、Isolation | 故障與並行 schedules；SQL standard 和 PG guarantee 分開。 |
| [B / B+ Tree / Index](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html) | External Interactive | A | External | Index、B / B+ tree | 成熟樹操作工具；DB query 成本另看正式來源。 |
| [SQL Syntax Practice](../topics/08-databases.md) | No Visualization Needed | A | Not Needed | SQL basics | 查詢語意需要小資料與手寫 SQL；此階段動畫增益低。 |

## C/C++

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [C++ Lifetime / Ownership](app/lessons/cpp-lifetime.html) | Scenario Drill | A | Ready | Pointer / Reference、Stack / Heap、RAII、Copy / Move、Smart pointer、Virtual function、Memory management | 失效 reference、RAII、move / copy、virtual ownership 情境。 |
| [STL Contract Practice](../topics/09-cpp.md) | No Visualization Needed | A | Not Needed | STL | API、iterator validity 與成本需要實際 code / contract，不需動畫。 |

## Computer Architecture

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Virtual Memory / TLB / Fault](app/lessons/virtual-memory.html) | Local Interactive | A | Ready | TLB vs cache | Walk、mapping、fault、DRAM 與 storage I/O 分開。 |
| [CPU Pipeline · Hazards](app/lessons/cpu-pipeline.html) | Local Interactive | A | Ready | CPU instruction execution basics、Pipeline、IF / ID / EX / MEM / WB、Data hazards、Control hazards、Forwarding / stall、Branch prediction | 逐 cycle 比較 RAW、forwarding、load-use 與 branch flush。 |
| [Cache Locality](app/lessons/cache-locality.html) | Local Interactive | A | Ready | Cache、Cache line、Temporal locality、Spatial locality、Cache hit / miss | 固定 trace 比較 sequential、random、repeated 與 simple AMAT。 |
| [Memory / I/O Hierarchy](app/lessons/memory-hierarchy.html) | Static Diagram | A | Ready | Registers / ALU / load-store、Memory hierarchy、Register / cache / DRAM / storage、Latency vs bandwidth、Interrupts / exceptions、I/O basics、DMA | 原創層級、CPU / I/O / DMA 路徑；容量與 bandwidth 分開。 |
| [GPU Execution / Memory](app/lessons/gpu-memory.html) | Static Diagram | A | Ready | CPU vs GPU、SIMD / SIMT intuition、GPU warp / thread execution intuition、Branch divergence、Memory coalescing、Shared memory / cache / VRAM relationship | 原創 lane / address 圖；四 lanes 是縮小教學圖，非真實 warp 大小。 |
| [Concurrency / Synchronization](app/lessons/concurrency-contract.html) | Scenario Drill | A | Ready | Multicore、Cache coherence、Coherence != thread safety、False sharing | 共享更新、mutex / semaphore、coherence 與 scheduling 的反例。 |
| [Hardware / Inference Bottlenecks](app/lessons/hardware-bottleneck.html) | Scenario Drill | A | Ready | Host-device transfer cost、Amdahl's law、NUMA basics、Prefetching、Compute-bound vs memory-bound、GPU occupancy basic intuition、Roofline model intuition | Amdahl、NUMA、prefetch / occupancy、roofline 與 transfer 假設。 |
| [ISA vs Microarchitecture](../topics/10-computer-architecture.md) | No Visualization Needed | A | Not Needed | ISA vs microarchitecture | 先精確分清介面與實作；現有口述定義足以檢查。 |

## Statistics / Experimental Design

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Sampling / Measurement Unit](app/lessons/measurement-unit.html) | Scenario Drill | S | Ready | Mean / median、Variance / standard deviation、Population / sample、Sampling bias、IID assumption、Bias / variance of estimator | 中心 / tails、抽樣單位、IID / bias，不把重複觀察當獨立樣本。 |
| [Statistical Claims / Error Control](app/lessons/statistical-claims.html) | Scenario Drill | S | Ready | Hypothesis testing、Null / alternative hypothesis、P-value、Type I error、Type II error、Statistical power、Effect size、Statistical significance vs practical significance、Multiple comparisons、Bonferroni / FDR purpose | H0、p、errors、power、effect 與 multiple comparisons。 |
| [Experiment Controls / Uncertainty](app/lessons/experiment-controls.html) | Scenario Drill | S | Ready | Random seeds、Repeated runs、Variance across runs、Experimental control、Confounders、Paired vs unpaired comparison、Ablation study、Sensitivity analysis、Reproducibility、Reporting uncertainty、Permutation test intuition、Parametric vs non-parametric、Correlation vs causation、Simpson's paradox intuition、Nested CV risk、Hyperparameter search bias、Test-set overuse | Seeds、paired runs、budget、ablation、敏感度與重現性。 |
| [Estimator / CI / Bootstrap](https://seeing-theory.brown.edu/frequentist-inference/index.html) | External Interactive | S | External | Estimator、Confidence interval、Standard error、Bootstrap intuition | 重複抽樣工具優於快速重做。 |
| [Distribution / Quantile](https://seeing-theory.brown.edu/probability-distributions/index.html) | External Interactive | S | External | Quantile | 從 CDF slider 連回 quantile；需自己說明反向關係。 |

## Software Engineering

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Testing Layers / Evidence](app/lessons/testing-evidence.html) | Static Diagram | A | Ready | Code coverage、Coverage limitations、Mutation testing、Unit testing、Integration testing、System testing、E2E testing | 原創驗證範圍圖；coverage、oracle、mutation 是不同證據。 |
| [Contracts / Design Trade-offs](app/lessons/contracts-design.html) | Scenario Drill | A | Ready | Functional / non-functional requirements、Interface / contract、Precondition / postcondition、Modularity、Coupling、Cohesion、API design、Backward compatibility、Versioning / deprecation、SOLID as heuristics | API / ownership / compatibility / 模組邊界的具體取捨。 |
| [Test / Mutant Triage](app/lessons/qa-evidence.html) | Scenario Drill | A | Ready | Unit testing、Integration testing、System testing、E2E testing、Regression testing、Mocks / stubs / fakes、Test doubles、Code coverage、Coverage limitations、Mutation testing、Surviving mutant、Property-based testing、Fuzzing、Static analysis、Sanitizers | Levels、doubles、assertions、survived 與工具狀態。 |
| [Delivery / Debugging Decisions](app/lessons/delivery-debugging.html) | Scenario Drill | A | Ready | CI、CD、Build / test gates、Git / PR / code review、Rollback / revert、Debugging、Logging / metrics / traces basics、Reproducibility、Flaky tests、Feature flags、Canary deployment、Dependency pinning、Supply-chain basics | CI gates、release / revert、flaky、observability 與 dependency。 |
| [Version / Change Semantics](../topics/12-software-engineering.md) | No Visualization Needed | A | Not Needed | Version control、Semantic versioning | Git history 與 version 承諾適合口述具體變更，不需要視覺效果。 |

## Research / Project Defense

| Resource | Type | Priority | Status | Mapped existing subtopics | Decision |
| --- | --- | --- | --- | --- | --- |
| [Research / Project Claim Defense](app/lessons/research-claims.html) | Scenario Drill | S | Ready | Problem、Motivation、My contribution、Architecture / methodology、Technical decisions、Alternatives considered、Evaluation、Results、Limitations、Failure cases、What I would improve、Potential professor attacks | 把 problem、貢獻、alternative、evaluation、limits 連回證據。 |
| [Timed Defense Versions](../research-defense/project-defense-template.md) | No Visualization Needed | S | Not Needed | 30-second version、2-minute version、5-minute version | 30 秒 / 2 分鐘 / 5 分鐘要實際說，不需要動畫。 |

外部成熟工具優先；local BFS / heap / attention 等只補 reversible tiny trace、numeric inspector 與 oral connection，不聲稱取代完整外部工具。未製作 232 個 lessons。

完整逐子題索引見 [RESOURCE_MAP](RESOURCE_MAP.md)；使用方式與限制見 [README](README.md)。
