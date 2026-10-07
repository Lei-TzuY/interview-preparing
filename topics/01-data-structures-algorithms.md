# Data Structures & Algorithms

## Interview Scope

Tier S。能從問題限制選資料結構與演算法，口述推理、證明正確性、分析成本，再寫 code。優先檢查基本概念與邊界，進階技巧依實測延伸。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Big-O | 漸近上界與 Θ / Ω 的差別；worst、average、amortized 是不同分析方式，不是 Big-O 的同義詞 |
| Array / List | Array 隨機存取 O(1)，中間插入通常 O(n)；linked list 尋找節點 O(n)，已知節點位置才可能 O(1) 修改連結；cache locality 與記憶體成本 |
| Stack / Queue | LIFO / FIFO、基本操作、array / linked implementation，以及遞迴與 BFS 的用途 |
| Hash table | Hash、collision、load factor、chaining / open addressing；適當假設下 expected O(1)，worst case 可 O(n) |
| Heap | Heap property 不代表完全排序；binary heap peek O(1)、push / pop O(log n)、bottom-up build O(n) |
| BST | Ordering invariant；查找 / 插入 / 刪除取決於高度 h，未平衡可退化 O(n)，平衡樹為 O(log n) |
| Graph | Directed / undirected、weighted / unweighted；adjacency list O(V+E) 與 matrix O(V²) 的空間及查邊取捨 |
| BFS / DFS | Queue / stack、visited、cycle、disconnected graph；adjacency list 下遍歷 O(V+E)，BFS 的最短路徑保證需等權邊 |
| Sorting | Merge、quick、heap sort 的成本、stable / in-place；quick sort 平均 O(n log n)，最壞 O(n²)；comparison model 的下界條件 |
| Binary search | 搜尋的單調條件、區間定義、invariant、終止與重複值邊界；不能只背 while loop |
| Greedy | 局部選擇成立的條件、exchange argument / cut property，以及找反例的方法 |
| Dynamic programming | State、transition、base case、依賴順序、答案位置；成本是各 state 的 transition 工作量總和 |
| Union-find | Connected components、find / union、path compression、union by rank / size；兩者搭配的 amortized O(α(n)) |
| Shortest path | 等權圖用 BFS；nonnegative weights 可用 Dijkstra；Bellman–Ford 能處理負邊並偵測從起點可達的負環；說明各自前提與成本 |

## Should Know

- Topological sort、DAG DP、MST 與 shortest path 的差別。
- Balanced BST 的目的、rotation 直覺；不以「任何 BST 都是 log n」代替分析。
- Two pointers、sliding window、prefix sum 與適用條件。
- Dijkstra 使用不同 priority queue / 表示法時的成本；遞迴深度及 stack overflow。

## Common Professor Questions

- 輸入規模很小時，理論較快的方法一定比較好嗎？
- Hash table 與 balanced BST 如何選？
- BFS 為何能在等權圖找到最短路徑？
- 如何判斷一個問題能用 greedy，還是需要 DP？
- 如何證明你的迴圈或遞迴在所有合法輸入都正確？

## Follow-up Questions

- 資料從 array 改成 linked list，原本的複雜度還成立嗎？
- 若 hash collisions 很多或輸入可被刻意安排，結論如何改變？
- 圖有負權邊時，原本的方法哪一步失去保證？
- 除了輸入儲存，遞迴 stack、visited 與 priority queue 占多少空間？
- 你的 greedy 選擇有反例嗎？若改變限制，如何重新證明？

## Whiteboard / Coding Expectations

1. 先口述方法、invariant / 正確性與 time / space complexity，再實作。
2. 能寫搜尋邊界、BFS / DFS、heap 使用、union-find 與小型 DP；不依賴背誦完整題解。
3. 用空輸入、單元素、重複值、找不到、cycle / disconnected graph 檢查。
4. DP 要先寫 state / transition 再 code；graph 要先確認表示法與權重條件。
5. Code 後重新分析實際實作的成本，包含排序、copy、遞迴與資料結構操作。

## Common Mistakes

- 把 expected / amortized O(1) 當成每次操作 worst O(1)。
- 說 linked list 插入 O(1)，忽略尋找位置的成本。
- 把 heap 當成排序好的 array，或把所有 BST 當成 balanced BST。
- 忘記 binary search 邊界、visited 時機、DP base case 與負權條件。
- 只列複雜度，不說輸入尺度、表示法或成本從哪裡來。

## Self-check Checklist

- [ ] 能精確區分上界、最壞情況與攤銷分析。
- [ ] 能比較 array / list / hash / heap / BST 的選用情境。
- [ ] 能證明搜尋或遍歷的 invariant，處理邊界。
- [ ] 能定義 DP 並分析成本；能對 greedy 找反例。
- [ ] 能依圖的權重選 shortest path 方法。
- [ ] 能在無提示下口述、分析、寫 code 並手動驗證。

勾選需要獨立作答證據，不能只因讀過文件勾選。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [MIT 6.006：Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)

## Visual Learning

**Use only after blind diagnostic attempt.** 首答已保存，且教練指定 Review / Weak / Critical 或需 intuition 時才使用；閱讀後只算 Assisted Improvement，延後閉卷重測才產生 independent evidence。

[Binary search invariant](../visual-learning/app/lessons/binary-search.html) · [BFS / DFS](../visual-learning/app/lessons/bfs-dfs.html) · [Heap](../visual-learning/app/lessons/heap-operations.html) · [Tiny DP](../visual-learning/app/lessons/dynamic-programming.html)。外部補充（同樣限首答後）：[VisuAlgo sorting](https://visualgo.net/en/sorting)／[union-find](https://visualgo.net/en/ufds)。完整 external / local / scenario 決策見 [Visual Learning index](../visual-learning/INDEX.md) 與 [Resource Map](../visual-learning/RESOURCE_MAP.md)。
