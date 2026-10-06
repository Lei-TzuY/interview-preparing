# Math for ML

## Interview Scope

Tier S。能把 linear algebra、calculus、probability 用於 ML 的模型、loss、optimization 與 evaluation。重點是符號、shape、假設與小型推導，避免只背公式。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Linear algebra | Linear combination、span、linear independence、basis；矩陣表示線性映射 |
| Vector / Matrix | 維度、transpose、matrix multiplication 的 shape；分清 elementwise 與 matrix product |
| Rank | Column / row space 的維度，與獨立性、線性系統解及資訊冗餘的關係 |
| Eigenvalue / Eigenvector | $Av=\lambda v$，其中 $v\ne0$；一般矩陣不保證可對角化或只有實數 eigenvalues |
| SVD | $A=U\Sigma V^T$，singular values 非負；full / reduced shape、low-rank approximation 與 PCA 的關係 |
| Dot product | $x^Ty=\sum_i x_i y_i$；角度 / 投影解釋及 cosine similarity 的正規化 |
| Norm | L1 / L2、距離與 magnitude；$\|x\|_2=\sqrt{x^Tx}$，不要與其平方混淆 |
| Derivative | 一維局部變化率，可微與不可微點；連續不保證可微 |
| Partial derivative | 對某一變數微分、其餘固定；區分 partial 與 total derivative |
| Chain rule | 複合函數的導數；多變數用 Jacobian / gradient 串接依賴 |
| Gradient | Scalar function 對向量的偏導組合；directional derivative 與梯度下降方向 |
| Probability | Random variable、PMF / PDF、事件與分布；density 不是點機率 |
| Conditional probability | $P(A\mid B)=P(A\cap B)/P(B)$，需要 $P(B)>0$；independence 與互斥不同 |
| Bayes theorem | $P(A\mid B)=P(B\mid A)P(A)/P(B)$；prior、likelihood、posterior、evidence |
| Expectation | 離散加權和 / 連續積分；linearity 不需要 independence |
| Variance | $\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-E[X]^2$；加總時可能有 covariance |

必要練習：對 $L(w)=\frac{1}{2n}\|Xw-y\|_2^2$，先標 $X,w,y$ 的 shape，再自行推導 gradient；資料 rank 不足時討論參數解的唯一性。

## Should Know

- Orthogonality、projection、least squares、positive semidefinite matrix。
- PCA 前的 centering、covariance 與 SVD；variance preservation 不等於 label information preservation。
- Jacobian / Hessian、convexity 的基本直覺及 optimization 保證的條件。
- Covariance / correlation、law of total probability、Bernoulli / Gaussian、MLE / MAP。
- Conditional independence 與 unconditional independence 的差別。

## Common Professor Questions

- Rank 跟 feature redundancy 有什麼關係？
- Dot product 與 cosine similarity 的差別是什麼？
- Gradient 為何與局部變化最快方向有關？
- Chain rule 如何用在含共享變數的計算圖？
- 診斷事件的 base rate 很低時，為何高準確率不代表高 posterior？

## Follow-up Questions

- 若矩陣不是 square，還能談哪種 decomposition？
- 若向量長度差很多，dot product 會受什麼影響？
- 變數不獨立時，variance of sum 多了什麼項？
- 在不可微點要如何處理 optimization？
- 若 $X$ rank deficient，模型預測與參數可識別性有何差別？

## Whiteboard / Coding Expectations

1. 對簡單 matrix product、linear regression loss、sigmoid composition 做 shape 與 gradient 推導。
2. 用小型矩陣解釋 rank / eigenvector / SVD，不要求背大型數值分解流程。
3. 用小型 contingency table 算 conditional probability / Bayes；先確認分母。
4. 寫 NumPy 等價的 matrix operations，能辨識 broadcasting 與 shape 錯誤。
5. 使用 finite difference 檢查 gradient 時，說明 step size 與 numerical precision 的限制。

## Common Mistakes

- 混淆 dot、elementwise multiplication、matrix multiplication。
- 把 eigenvalues 當作 singular values，或說所有矩陣都能 eigen-decompose 成實數對角矩陣。
- 推導忽略 transpose、平均係數與 shape。
- 混淆 $P(A\mid B)$ 與 $P(B\mid A)$；忽略 base rate。
- 誤以為 expectation linearity 需要 independence，或忽略 covariance。

## Self-check Checklist

- [ ] 能解釋 span / rank / independence 的關係。
- [ ] 能用 shape 驗證矩陣式，區分 eigenvalue 與 singular value。
- [ ] 能從定義推導簡單 gradient 並說明 chain rule。
- [ ] 能算 conditional probability 與 Bayes，解釋 base rate。
- [ ] 能說明 expectation / variance 與 independence 的條件。
- [ ] 能將數學步驟對應到 ML loss 或參數更新。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [MIT 18.06：Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)
