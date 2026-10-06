# Machine Learning Fundamentals

## Interview Scope

Tier S。能說明問題設定、模型假設、loss、optimization、泛化與評估設計；會用 library 不等於能回答這些問題。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Supervised / Unsupervised | Label 的角色、regression / classification、clustering / dimensionality reduction；依 task 選 evaluation |
| Linear regression | Linear prediction、squared loss、least squares 假設與 rank；closed form 不等於必須顯式求 inverse |
| Logistic regression | $p(y=1\mid x)=\sigma(w^Tx+b)$；log-odds 線性、decision threshold 與 probability 的差別 |
| Loss | Training objective 與 evaluation metric 不一定相同；sample loss、empirical risk 與 penalty |
| Gradient descent | $\theta\leftarrow\theta-\eta\nabla L(\theta)$；learning rate、batch / mini-batch / stochastic 的成本與噪音 |
| Overfitting | Training performance 與 held-out performance 的落差、資料量 / leakage / distribution shift 的診斷 |
| Regularization | L1 / L2、early stopping、模型容量；$L_{total}=L_{data}+\lambda R(\theta)$，說明 λ 的取捨 |
| Bias–variance | 表達能力與估計不穩定的取捨；典型 squared-error decomposition 的條件，不當成所有模型的萬用曲線 |
| Train / Validation / Test | Train fit；validation 選模型 / hyperparameters；test 最終評估；preprocessing 只以 train fit |
| Precision / Recall / F1 | $P=TP/(TP+FP)$、$R=TP/(TP+FN)$、$F1=2PR/(P+R)$；零分母處理、threshold、macro / micro |
| Cross entropy | 分類機率的負 log likelihood；多類 $-\sum_k y_k\log p_k$，區分 logits 與 probabilities |
| SVM | Maximum margin、support vectors、soft margin / C、hinge loss 與 kernel 的用途 |
| Decision tree | Split criterion、depth、leaf prediction；greedy splitting 與 overfitting，連續 / 類別資料的處理 |
| Ensemble | Bagging / random forest 與 boosting 的機制、diversity、模型相關性與成本；不宣稱保證改善 |

必要推導：由 Bernoulli likelihood 寫 logistic regression 的 binary cross entropy；說清楚 label、logit、sigmoid 與 gradient 的關係。

## Should Know

- Cross-validation、stratified / group / time split 與適用情境。
- Class imbalance、PR curve / ROC curve、calibration、threshold 與錯誤成本。
- Feature scaling、missing data、feature leakage、distribution shift。
- K-means / PCA 的 objective；常見 baseline 與 learning curve。
- Random forest、gradient boosting 的基本比較與公平 hyperparameter tuning。

## Common Professor Questions

- Logistic regression 為何叫 regression，卻常用於 classification？
- Accuracy 很高但模型沒有實用價值，可能發生什麼事？
- 如何判斷模型是 overfit、underfit，還是資料切分錯誤？
- Regularization 如何改變你要解的問題？
- SVM、tree、neural network 在小資料情境如何選？

## Follow-up Questions

- 若 test set 也用來選 hyperparameters，評估出了什麼問題？
- 同一個人的多筆樣本分到 train 與 test，為何可能樂觀估計？
- Positive 很少時，precision / recall / F1 與 accuracy 各透露什麼？
- λ、threshold 或 learning rate 改變，訓練與決策如何分別受影響？
- 新資料分布變了，原本的 validation 結果仍能保證什麼？

## Whiteboard / Coding Expectations

1. 寫出 linear / logistic objective 與簡單 gradient，標清 shape 與 reduction。
2. 從 confusion matrix 算 precision / recall / F1，處理 zero denominator。
3. 設計無 leakage 的 training pipeline，先 split 再 fit preprocessing。
4. 口述一次 tree split、SVM margin 與 ensemble 的機制。
5. 設計 baseline、validation 與 test 的使用方式，不只展示一個最好的分數。

## Common Mistakes

- 把 classification probability、logit 與 predicted label 混為一談。
- 在全資料 fit scaler / feature selection，再切 train / test。
- 用 test 反覆選模型；只報 accuracy 或只看 training loss。
- 把 regularization 當作「一定變準」，或把 bias–variance 當成無條件定律。
- 背公式但不能說明不平衡資料、threshold 與 failure cases。

## Self-check Checklist

- [ ] 能說明 supervised / unsupervised 的問題設定與評估。
- [ ] 能推導 linear / logistic loss 的必要數學。
- [ ] 能區分 loss、optimization、regularization 與 metric。
- [ ] 能設計正確 split，排除明顯 leakage。
- [ ] 能解釋 precision / recall / F1 與 threshold trade-off。
- [ ] 能比較 SVM、tree、ensemble 並提出失敗情境。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [Stanford CS229：Machine Learning](https://cs229.stanford.edu/)
