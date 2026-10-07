# Statistics / Experimental Design

## Interview Scope

Tier S。回答「你憑什麼相信實驗結果？」：定義估計目標與 sample unit，區分不確定性、統計證據、因果主張與實務價值，說明公平比較與結果限制。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| Mean / median | 中心位置的不同摘要；mean 對極端值敏感，median 不等於所有情境都較好 |
| Variance / standard deviation | Spread 與單位；population 與 sample variance 的分母 / 假設，SD 不等於 SE |
| Quantile | 分布位置與 tails；p50 / p95 latency 可回答不同問題，估計法可能不同 |
| Population / sample | 想推論的母體、觀察的樣本與抽樣單位；不能把多個相關觀察當作更多獨立樣本 |
| Sampling bias | 樣本選擇導致代表性偏差；增加同樣偏差的 sample size 不會自動消除它 |
| IID assumption | Independent and identically distributed；重複病人、時間序列、共用資料等可能破壞假設 |
| Estimator | 用資料估計參數的規則；estimate 是某次資料得到的值 |
| Bias / variance of estimator | $E[\hat\theta]-\theta$ 與 $\operatorname{Var}(\hat\theta)$；區分 estimator 與 ML prediction 的 bias–variance |
| Confidence interval | Frequentist coverage 是重複抽樣方法的性質，不是固定參數在已算區間中的 posterior probability |
| Standard error | Estimator sampling distribution 的 SD；sample mean 在適當 IID 條件下常估為 $s/\sqrt n$ |
| Hypothesis testing | 先定假說、統計量、假設與檢定方式，再看資料；不拒絕 H0 不等於證明 H0 |
| Null / alternative hypothesis | H0 / H1、one-sided / two-sided 與比較目標；不能看完結果才挑有利方向 |
| P-value | 在 H0 及檢定模型假設下，統計量至少同樣極端的機率；不是 H0 為真的機率 |
| Type I error | H0 為真卻拒絕；α 是方法設定的錯誤率控制，不是個案結論為錯的機率 |
| Type II error | 在指定 alternative 下未拒絕 H0；與 effect、樣本量、noise 和方法相關 |
| Statistical power | $1-\beta$；應在指定 effect / design 下討論，不能從不顯著直接推為沒效果 |
| Effect size | 改善幅度與單位，例如 accuracy 的 percentage points；報 absolute / relative 的差別 |
| Statistical significance vs practical significance | 小而可靠的差異不一定值得成本；結合 magnitude、uncertainty 與使用需求 |
| Multiple comparisons | 嘗試很多 hypotheses / models 後挑最小 p 或最高分，會增加錯誤推論風險 |
| Bonferroni / FDR purpose | Bonferroni 控制 family-wise error；FDR 控制拒絕集合中 false discoveries 比例的期望，條件依程序 |
| Random seeds | 控制可控隨機來源，記錄哪些部分仍非 deterministic；seed 不是品質保證 |
| Repeated runs | 預先定義重複單位、protocol 與預算，不只挑 best run |
| Variance across runs | 區分 initialization / optimization、split 與 test sampling 的變異；只換 seed 未涵蓋所有 uncertainty |
| Experimental control | 固定非研究變因、randomization / blocking，公平 data、hardware、budget 與 stopping rules |
| Confounders | 同時影響比較條件與結果的因素；觀察到 association 不足以排除 confounding |
| Paired vs unpaired comparison | 相同 cases / splits 等配對可分析差值；配對單位和獨立性須正確，不能任意 pairing |
| Ablation study | 拿掉 / 改動組件以檢查其作用；組件交互作用與重新調參可能影響解釋 |
| Sensitivity analysis | 改變合理設定、threshold / hyperparameters / 假設，檢查結論是否穩健 |
| Reproducibility | 保存 code / data version、環境、設定、seed、commands 與 raw outputs；能重跑不保證推論有效 |
| Reporting uncertainty | 同時報 effect、spread / interval、run count、sampling unit 與限制，避免只有單一 mean |

### 必要數學

能自行寫出 sample mean、sample variance 與 mean difference。以 IID normal observations 的 mean 為例，未知 variance 時用 $\bar x\pm t_{1-\alpha/2,n-1}s/\sqrt n$；須交代 independence、模型條件，不能套在任意相關 observations 上。

Paired comparison 先定義 $d_i=a_i-b_i$，再分析 differences 的 mean / uncertainty。相同 test set 上多個 seeds 的分數，不自動等同獨立抽樣的多個 test sets。

## Should Know

| Subtopic | 延伸回答要求 |
| --- | --- |
| Bootstrap intuition | 重抽 sample units 近似 estimator 變異；相關資料需考慮 cluster / block，不能修復偏誤的資料 |
| Permutation test intuition | 在 null 允許的 exchangeability 下重新排列 labels / assignments，配對設計使用合適的重排 |
| Parametric vs non-parametric | 不同模型 / 假設與效率；non-parametric 不等於完全無假設 |
| Correlation vs causation | 因果需要識別條件與設計；觀察研究可報 association、假設與 sensitivity，不能靠 p-value 升格 |
| Simpson's paradox intuition | 分層與合併後關係可反轉，檢查組成與 confounding |
| Nested CV risk | 外層估評、內層調參；不恰當 reuse folds / preprocessing 造成 leakage，正確 nested CV 也有成本與方差 |
| Hyperparameter search bias | 比較機會越多越可能選中偶然好結果；預算、選擇 protocol 與獨立評估要一致 |
| Test-set overuse | 反覆查看 test 決定設計會污染最終評估；區分 exploratory 與 confirmatory analysis |

## Common Professor Questions

- Accuracy 高 1% 就算比較好嗎？
- p < 0.05 到底代表什麼？
- 為什麼不能只跑一個 random seed 就宣稱穩定？
- Sample size 很大時，統計與實務結論可能怎樣分歧？
- Ablation 和 baseline comparison 有何不同？

## Follow-up Questions

- Effect 很小但 statistically significant，是否值得採用？需要哪些成本資料？
- 如何排除 improvement 是 tuning budget / split 造成，而不是方法本身？
- 同一個人多筆資料、同一 test set 多 seeds，如何選 analysis unit？
- 做了很多比較後才挑贏家，如何揭露並處理 multiple comparisons？
- 無法做 causal experiment 時，哪些結論能成立，哪些只能是 hypothesis？
- CI 很寬或檢定不顯著，如何區分證據不足與證明沒效果？

## Whiteboard / Coding Expectations

1. 對小樣本算 mean / median / SD / SE，說明分母、單位與假設。
2. 用重複抽樣直覺解釋 CI，畫 Type I / II error 與 power 的角色。
3. 設計公平 paired comparison、baseline、ablation / sensitivity，先定 metric 與 protocol。
4. 寫摘要或 bootstrap / permutation 的 pseudocode，定義 resampling unit 與合法重排。
5. 報告 raw runs、effect、spread / interval 與 limitations，不虛構 seed 結果。

## Common Mistakes

- P-value = H0 為真的機率；CI = 參數有 95% 機率在已算出的區間。
- Statistical significance = practical importance；不顯著 = 沒有效果。
- 只報 mean 不報 spread；一個 seed 宣稱穩定。
- 把相關 observations 當 IID；把 seed variability 當全部泛化 uncertainty。
- Best run / tuning budget / test-set reuse 未揭露，卻宣稱公平改善或因果。

## Self-check Checklist

- [ ] 能區分 SD、SE、CI、estimator bias 與 uncertainty 的來源。
- [ ] 能正確解釋 p-value、H0 / H1、Type I / II error 和 power。
- [ ] 能解釋 effect size、multiple comparisons 與實務價值。
- [ ] 能辨識 sampling bias、IID 問題與 confounders。
- [ ] 能設計 repeated runs、paired comparison、ablation 與 sensitivity。
- [ ] 能報告支持與尚未支持的結論，不過度做 causal claim。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準。連到 [ML](03-machine-learning.md)、[Software Engineering](12-software-engineering.md) 與 [Research Defense](../research-defense/README.md) 檢查主張。

## References

- [ASA：Statement on Statistical Significance and P-Values](https://www.amstat.org/asa/files/pdfs/P-ValueStatement.pdf)
- [NIST：Confidence Limits for the Mean](https://www.itl.nist.gov/div898/handbook/eda/section3/eda352.htm)
- [NIST：Choosing an Experimental Design](https://www.itl.nist.gov/div898/handbook/pri/section3/pri3.htm)

## Visual Learning

**Use only after blind diagnostic attempt.** 首答已保存，且教練指定 Review / Weak / Critical 或需 intuition 時才使用；閱讀後只算 Assisted Improvement，延後閉卷重測才產生 independent evidence。

[Sampling / measurement](../visual-learning/app/lessons/measurement-unit.html) · [Statistical claims](../visual-learning/app/lessons/statistical-claims.html) · [Experiment controls](../visual-learning/app/lessons/experiment-controls.html)。外部補充（同樣限首答後）：[Seeing Theory：抽樣／信賴區間互動](https://seeing-theory.brown.edu/frequentist-inference/index.html)。完整 external / local / scenario 決策見 [Visual Learning index](../visual-learning/INDEX.md) 與 [Resource Map](../visual-learning/RESOURCE_MAP.md)。
