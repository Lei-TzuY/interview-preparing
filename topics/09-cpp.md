# C/C++ Fundamentals

## Interview Scope

Tier A。以 C++ 常見口試語意為主，能說明 lifetime、ownership、資源管理與抽象成本，並對照 C 的 pointers / allocation。版本或實作相關行為要標出條件。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Pointer / Reference | Address、dereference、nullptr、aliasing；reference 綁定後不能重新綁定，pointer / reference 都可能 dangling |
| Stack / Heap | Automatic / dynamic storage duration、scope 與 lifetime；stack / heap 是常見實作概念，不是 C++ 標準對所有物件的強制位置 |
| RAII | 資源取得與 object lifetime 綁定，destructor 釋放 memory / lock / file 等；與 exception safety 的關係 |
| STL | vector、list、map、unordered_map、set、priority_queue 的用途與成本；iterator / reference invalidation |
| Copy / Move | Copy ownership / values 與 move 資源轉移；`std::move` 是 cast，不保證一定發生 move，也不是直接搬記憶體 |
| Smart pointer | unique_ptr 的獨占 ownership、shared_ptr 的共享計數、weak_ptr 的非 owning observation 與 cycle 處理 |
| Virtual function | Dynamic dispatch、override、static / dynamic type；以 polymorphic base pointer 刪除 derived object 時需正確的 destructor 設計 |
| Memory management | new / delete、new[] / delete[]、malloc / free 配對；C++ construction / destruction、leak、use-after-free、double free 與 undefined behavior |

## Should Know

- Rule of Zero / Three / Five、copy constructor / assignment、move constructor / assignment。
- const correctness、lvalue / rvalue、ownership API 設計。
- vector 的 capacity / size、reallocation、amortized push_back 與 invalidation。
- Object slicing、virtual destructor、vtable 是常見實作而非唯一標準要求。
- C array decay、pointer arithmetic、buffer bounds；C 與 C++ 的 allocation 語意差別。
- shared_ptr reference count 的安全性不等於 pointee 的 thread safety。

## Common Professor Questions

- Pointer 與 reference 的差別是什麼？如何產生 dangling reference？
- 為何 RAII 能幫助處理 early return 或 exception？
- Copy 與 move 的差別，`std::move` 實際做了什麼？
- unique_ptr、shared_ptr、weak_ptr 各適用什麼 ownership？
- 為何 vector reallocation 後先前的 pointer / iterator 可能失效？

## Follow-up Questions

- 回傳 local variable 的 reference，離開函數後發生什麼？
- shared_ptr 互相持有會造成什麼？如何切斷 ownership cycle？
- 一個 class 擁有 raw resource，預設 copy 是否安全？
- 透過 base pointer delete derived object，哪些條件需要注意？
- 移動後的物件能做什麼，哪些保證要依型別契約判斷？

## Whiteboard / Coding Expectations

1. 畫 object lifetime / ownership，標出 allocation、construction、destruction 與 release。
2. 辨識短 code 中的 dangling pointer、double free、mismatched allocation 與 iterator invalidation。
3. 使用 unique_ptr / standard containers 設計簡單 owning class，優先 Rule of Zero。
4. 分析 vector、map、unordered_map 的操作成本與使用條件。
5. 示意 virtual dispatch 與 slicing；能說明 UB 為何沒有可依賴的固定輸出。

## Common Mistakes

- 說 reference 永遠安全，或把 scope、lifetime、storage location 混在一起。
- 把 `std::move` 當作一定清空來源，忽略型別與 operation 的契約。
- 使用 shared_ptr 取代所有 pointer，忽略 cycle、ownership 設計與計數成本。
- 配錯 new / delete / malloc / free，或忽略 vector reallocation。
- 依一次執行結果解釋 UB，或把 vtable 當成唯一標準實作。

## Self-check Checklist

- [ ] 能解釋 pointer / reference / lifetime，辨識 dangling。
- [ ] 能用 RAII / Rule of Zero 設計資源管理。
- [ ] 能解釋 copy / move 與 `std::move` 的語意。
- [ ] 能選 smart pointer 並處理 cycle。
- [ ] 能分析 STL complexity / invalidation 與 virtual dispatch。
- [ ] 能辨識 C / C++ allocation 配對與常見 UB。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)

## Visual Learning

**Use only after blind diagnostic attempt.** 首答已保存，且教練指定 Review / Weak / Critical 或需 intuition 時才使用；閱讀後只算 Assisted Improvement，延後閉卷重測才產生 independent evidence。

[Lifetime / ownership scenarios](../visual-learning/app/lessons/cpp-lifetime.html)。外部補充（同樣限首答後）：[C++ Core Guidelines：ownership／RAII 對照](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines)。完整 external / local / scenario 決策見 [Visual Learning index](../visual-learning/INDEX.md) 與 [Resource Map](../visual-learning/RESOURCE_MAP.md)。
