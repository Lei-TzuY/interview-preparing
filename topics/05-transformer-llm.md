# Transformer / LLM

## Interview Scope

Tier S。由 attention 的 shape / 數學連到架構、訓練、推論及 adaptation；GPU inference 經驗須以具體成本與測量支持。先能回答基本機制，再談效能技巧。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Self-attention | 同一序列投影出 Q / K / V，用相似度加權 value；causal mask 與 padding mask 不同 |
| Q / K / V | $Q=XW_Q$、$K=XW_K$、$V=XW_V$；角色、shape 與可學習 projection |
| Multi-head attention | 不同 head 的 projection / representation，concat 後 output projection；不要把多 head 等同多 layer |
| Positional encoding | Attention 本身缺少順序資訊；absolute / relative / rotary 的作用與長度外推限制 |
| Transformer architecture | Attention、FFN、residual、normalization；encoder、decoder、cross-attention 與 decoder-only 的差別 |
| Training vs inference | Next-token objective、teacher forcing、parallel training；autoregressive inference 的 prefill / decode 與 KV cache |
| Tokenization | Subword、vocabulary、token IDs；token 不等於字或詞，語言 / segmentation 影響長度 |
| LoRA | Freeze base weights，學低秩更新 $\Delta W=(\alpha/r)BA$；trainable parameters、rank、target modules 與可合併條件 |
| QLoRA | 原論文以 frozen 4-bit base、LoRA、NF4、double quantization、paged optimizers 節省 fine-tuning memory；adapter 通常不是 4-bit 訓練 |
| Quantization | 將高精度值映射到低精度表示，scale / zero point、量化誤差與 outliers；weight / activation、PTQ / QAT 的差別 |
| Fine-tuning | Full fine-tuning / PEFT、SFT、資料品質、catastrophic forgetting 與 evaluation；調整參數不等於可靠記住全部新知 |
| RAG | Retrieval → context construction → generation；檢索品質、chunking、citation / grounding 與 generation error 分開測 |
| Hallucination | 生成流暢但不受證據支持的內容；知識缺口、錯誤 retrieval、prompt / objective 都可能影響 |
| Context window | 模型可處理的 token 範圍；最大長度不等於任意位置都可可靠利用資訊，還有 latency / memory 成本 |

### 必要數學與成本

單 head：$X\in\mathbb{R}^{n\times d}$，$Q,K\in\mathbb{R}^{n\times d_k}$，$V\in\mathbb{R}^{n\times d_v}$。

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^T}{\sqrt{d_k}}+M\right)V
$$

要能說明 softmax 的軸、mask 的位置、縮放的理由與 output shape。標準 dense attention 的 score 計算為 O(n²d_k)，直接儲存 scores 為 O(n²)；這不是完整 layer / 模型的全部成本，實作也可能避免顯式儲存完整 scores。

若 $W\in\mathbb{R}^{d_{out}\times d_{in}}$，LoRA 的 $B\in\mathbb{R}^{d_{out}\times r}$、$A\in\mathbb{R}^{r\times d_{in}}$，更新參數量為 $r(d_{in}+d_{out})$。能解釋 rank 增大與可表達性 / memory 的取捨，不宣稱固定 rank 適用所有任務。

推論 memory 要分 weights、quantization metadata、KV cache、temporary buffers；不能只用 parameters × bit-width 當總顯存。KV cache 用實際 layer 數、KV head 數、head dimension、batch、序列長度與 dtype 估算，區分 MHA / GQA / MQA。

## Should Know

- Sampling temperature / top-k / top-p、exposure bias、evaluation contamination。
- KV cache、GQA / MQA、FlashAttention 的問題設定；exact attention 與 approximate attention 不混淆。
- Weight-only quantization 不保證 integer-only compute 或實際加速；hardware / kernel / workload 共同決定。
- LoRA merge 到 quantized weights 的 re-quantization 與精度問題。
- RAG evaluation：retrieval recall、答案正確性、grounding、latency、成本。

## Common Professor Questions

- 為什麼 attention 除以 $\sqrt{d_k}$？
- Q、K、V 分別提供什麼資訊？
- 訓練能同時處理 token，推論為何仍逐步產生？
- LoRA 的低秩假設針對什麼，省了哪些 memory？
- 你會為何種需求選 RAG、fine-tuning 或兩者組合？

## Follow-up Questions

- 長度增加兩倍，prefill、KV cache 與 decode 的成本分別如何變化？
- 換成 GQA，KV cache 估算中的哪個數量改變？
- 4-bit weights 是否表示 activations、optimizer state 與 adapter 都是 4-bit？
- 降低 bit-width 後品質或速度沒有改善，你會檢查什麼？
- 文件已放進 context，為何模型仍可能答錯？如何區分 retrieval 與 generation failure？

## Whiteboard / Coding Expectations

1. 標出 attention / multi-head 每一步 shape，示意 causal mask 與 stable softmax。
2. 畫 encoder-decoder 與 decoder-only block，說明 train / inference 資料流。
3. 推導 LoRA 參數量，估算指定條件下的 weights / KV memory。
4. 口述最小 next-token loss pipeline、LoRA freeze 檢查與無 leakage 的 evaluation。
5. 設計同品質 / 同硬體條件的 latency、throughput、peak memory 比較；區分 prefill 與 decode。

## Common Mistakes

- 把 Q / K / V 當成固定輸入資料，忽略 projection / shape。
- 把 LoRA 說成直接將整個 pretrained matrix 降秩。
- 把 QLoRA 當作所有 tensor 的 4-bit end-to-end training。
- 宣稱低 bit 必定較快、RAG 必定消除 hallucination、context 大必定理解完整。
- 只算權重顯存；混淆 memory saving、latency 與 throughput。

## Self-check Checklist

- [ ] 能解釋 attention 的 shape、縮放、mask 與成本。
- [ ] 能比較架構、tokenization、position 與 training / inference。
- [ ] 能推導 LoRA 參數量，正確區分 LoRA / QLoRA / quantization。
- [ ] 能估算 weights 與 KV cache，說明估算未包含的成本。
- [ ] 能比較 RAG / fine-tuning 並設計評估。
- [ ] 能用 failure cases 回答長 context、hallucination 與量化品質問題。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)

## Visual Learning

**Use only after blind diagnostic attempt.** 首答已保存，且教練指定 Review / Weak / Critical 或需 intuition 時才使用；閱讀後只算 Assisted Improvement，延後閉卷重測才產生 independent evidence。

[Scaled attention](../visual-learning/app/lessons/scaled-dot-product-attention.html) · [Multi-head attention](../visual-learning/app/lessons/multi-head-attention.html) · [KV cache](../visual-learning/app/lessons/kv-cache.html) · [Pre-LN decoder](../visual-learning/app/lessons/decoder-block.html)。外部補充（同樣限首答後）：[Transformer Explainer](https://poloclub.github.io/transformer-explainer/)。完整 external / local / scenario 決策見 [Visual Learning index](../visual-learning/INDEX.md) 與 [Resource Map](../visual-learning/RESOURCE_MAP.md)。
