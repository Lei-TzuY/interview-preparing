# Deep Learning

## Interview Scope

Tier S。能從 computation graph 解釋 forward、loss、backward 與更新，並分析 shape、numerical stability、optimization 與泛化。架構名稱必須能連到實際機制。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Backpropagation | Reverse-mode chain rule、local derivative、共享路徑梯度相加；backprop 計算梯度，optimizer 更新參數 |
| Activation functions | Sigmoid、tanh、ReLU 的 nonlinear 作用、飽和、dying ReLU；沒有 activation 的多層 affine map 可合併 |
| Softmax | $p_i=e^{z_i}/\sum_j e^{z_j}$；輸出和為 1、logits 彼此耦合；減去最大 logit 改善 stability |
| Cross entropy | Label 與 prediction 的負 log likelihood；對 one-hot target 的 softmax logits，gradient 為 $p-y$（單樣本 sum convention） |
| SGD / Adam | SGD、momentum、Adam 的一階 / 二階 moving averages、bias correction；learning rate / generalization trade-off |
| Dropout | 訓練時隨機遮蔽、inverted dropout 的 scaling；eval 關閉，不能把訓練 / 推論行為混用 |
| BatchNorm | 常見用法按 channel 用 batch / spatial statistics；running statistics 與 train / eval 不同，小 batch 可能不穩定 |
| LayerNorm | 常見 Transformer 對每個 token 的 hidden dimensions normalize；依設定的 normalized shape，不依 batch statistics |
| CNN | Local receptive field、weight sharing、stride / padding / dilation、channel；output shape 與參數量 |
| RNN / LSTM | 遞迴 hidden state、BPTT、vanishing / exploding gradients；LSTM gates 改善記憶傳遞，不保證解決所有長期依賴 |
| Attention | Query、key、value 的相似度與 weighted aggregation；softmax 維度、mask 與 output shape |

必要 whiteboard：兩層網路 $h=\phi(W_1x+b_1)$、$z=W_2h+b_2$。先標 shape，再從 loss 回推各參數 gradient，說明 activation 與 batch reduction。

## Should Know

- Residual connection、gradient clipping、weight initialization 與 learning-rate schedule。
- Training / evaluation mode、autograd graph、gradient accumulation、mixed precision 的用途與限制。
- Optimizer state、activation 與 parameter memory 的不同來源。
- CNN 的 inductive bias；RNN 與 attention 的順序建模 / parallelization 取捨。

## Common Professor Questions

- Backpropagation 與 gradient descent 有什麼差別？
- 為什麼需要 nonlinear activation？
- Softmax 後接 cross entropy 的 gradient 為何可以簡化？
- BatchNorm 和 LayerNorm normalize 的維度不同，會造成什麼差別？
- Adam 是否總比 SGD 好？你會用哪些證據比較？

## Follow-up Questions

- 同一個 tensor 影響 loss 的兩條路徑，gradient 如何合併？
- 若 logits 很大，直接算 exponential 會如何？
- Batch size 很小或 train / test distribution 不同時，BatchNorm 有什麼風險？
- Validation 時忘了 eval mode，哪些 layer 行為會改變？
- 深層 sigmoid 網路或長序列 RNN 為何可能難訓練？

## Whiteboard / Coding Expectations

1. 對小 computation graph 手算梯度，檢查 chain rule 與 shape。
2. 能解釋 training loop 的 zero_grad、forward、loss、backward、step 與 train / eval 切換。
3. 算小 CNN 的 output shape / parameter count，說明 padding 與 stride。
4. 寫 stable softmax 的思路；使用 loss API 前確認它需要 logits 還是 probabilities。
5. 以梯度檢查、overfit a tiny batch、loss curve 等方法定位訓練失敗；說清每種檢查能驗證什麼。

## Common Mistakes

- 將 backprop 與 optimizer 視為同一件事。
- 把 probability 再當 logits 傳給期待 logits 的 cross-entropy API。
- 忘記 gradient 累積、reduction scaling、train / eval 切換。
- 說 LayerNorm 就是小 batch 的 BatchNorm，忽略 normalize 軸。
- 只說 optimizer / 架構「比較強」，沒有條件、比較設計或 failure case。

## Self-check Checklist

- [ ] 能推導小型 backprop，解釋所有 shape 與 local derivative。
- [ ] 能說明 activation 與 softmax / cross entropy 的數學。
- [ ] 能比較 SGD / Adam 並提出驗證方案。
- [ ] 能辨識 dropout、BatchNorm、LayerNorm 的 train / eval 與軸。
- [ ] 能分析 CNN / RNN / LSTM / attention 的機制與限制。
- [ ] 能定位 loss / gradient 異常，而非盲目調參。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [PyTorch CrossEntropyLoss：logits 與 target 介面](https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html)
