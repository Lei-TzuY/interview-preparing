# Project / Research Portfolio Inventory

查核日期：2026-10-06（Asia/Taipei）。這是候選 inventory，不是已完成 defense、能力成績或成果排行榜。Why likely to be asked 是教練選題判斷；其他事實只限連結來源支持的範圍。

## Candidate inventory

GitHub ownership、repo 名稱與文件主張不能直接證明個人分工或實測效果。My actual role 需補本人工作與 commit / 分工證據；沒有來源就寫 TODO。

| Project / Research name | Type | Why likely to be asked | My actual role | Evidence | Defense status |
| --- | --- | --- | --- | --- | --- |
| Picture Magician（Picture-Magician / change-clothes，主版本待確認） | AI image-generation / deployment prototype | ComfyUI integration、API / job flow、資料與權限、部署與外部工具的貢獻界線 | TODO：確認主版本、個人設計 / 實作與團隊分工 | [平台 README](https://github.com/Lei-TzuY/Picture-Magician/blob/ee1790347dba09b39df5c3f5f41bde6f5ee24e2e/README.md)、[專題報告書](https://github.com/Lei-TzuY/Picture-Magician/blob/ee1790347dba09b39df5c3f5f41bde6f5ee24e2e/書審/專題報告書.md)、[另一個同名原型 README](https://github.com/Lei-TzuY/change-clothes/blob/67f4eb8b5d2298d8031e5cb8384da9a73b1b5bd2/README.md) | Sources located；TODO：補 defense draft；Untested |
| LLM / software testing / surviving mutants（研究題名待確認） | 待確認的 research candidate | Mutant triage、test oracle、LLM baseline、公平 budget 與 failure cases | TODO：確認研究是否屬本人、題名與實際工作 | TODO：本次候選 repo search 未取得足夠研究證據；需 paper、code、dataset / protocol 或 raw outputs | Evidence missing；不宣稱研究結果；Untested |
| Intelligent Software Quality Assurance | QA method-chain / runtime research prototype | QA-XML / QA-SOA / traceability、模擬與真實執行的區分、NFR score 的有效性 | TODO：補本人負責模組、實驗 / 分析及分工記錄 | [Quality_Assurance README](https://github.com/Lei-TzuY/Quality_Assurance/blob/525977a26a88d10e47344342f0c0eb4fe37b789f/README.md) | Sources located；TODO：區分各 evidence layer 並建立 draft；Untested |
| Mentcare traceability prototype（SE-and-AGI） | Requirements–design–implementation / V&V prototype | Structural consistency 是否等同 design quality、scoring validity、變更與 regression | TODO：補本人設計 / 實作範圍與來源 | [SE-and-AGI README](https://github.com/Lei-TzuY/SE-and-AGI/blob/b797b8d57ae65cfd2a33f3e1aee25f2285df7b07/README.md) | Sources located；TODO：補 draft；Untested |
| IQA-SOA | LLM-agent runtime governance research artifact | Trust boundary、fail-closed、claim / evidence lifecycle、實驗未支持效果時如何限縮結論 | TODO：補本人研究貢獻、artifact / paper 分工 | [IQA-SOA README](https://github.com/Lei-TzuY/iqa-soa/blob/07c92ed5add3058b06be0b86263782923689b886/README.md) | Sources located；TODO：完成 research template；Untested |
| Picture-Magician 的 GPU / local-LLM deployment work | 同一專案的 deployment defense 情境 | Transfer、queue、VRAM / latency、device placement 與多 GPU 主張的證據 | TODO：補實際硬體、部署角色、workload 與 benchmark protocol | [Ollama 啟動腳本](https://github.com/Lei-TzuY/Picture-Magician/blob/ee1790347dba09b39df5c3f5f41bde6f5ee24e2e/start_ollama_4090.bat)、[平台 README](https://github.com/Lei-TzuY/Picture-Magician/blob/ee1790347dba09b39df5c3f5f41bde6f5ee24e2e/README.md)；TODO：multi-GPU topology / measurements | Script located；沒有可確認的 multi-GPU 實測；Untested |
| Tiny Transformer & Autograd | From-scratch ML / autograd / Transformer project | Chain rule、numerical validation、attention / KV cache、LoRA 與成本；可連 fundamentals | TODO：補本人設計 / 實作與工具協助界線 | [專案 README](https://github.com/Lei-TzuY/tiny-transformer-autograd/blob/a011903671efb97db0f73b50e081f4d45f5eab11/README.md)、[個人首頁列為 flagship](https://github.com/Lei-TzuY/Lei-TzuY/blob/933d65bbd1ba666c2ab3ce54548040a14be9573e/README.md) | Sources located；TODO：補 project template；Untested |
| miniOS（minios-x86） | Educational x86 operating-system project | Paging、process / thread、scheduling、I/O、invariants 與 native / QEMU 測試 | TODO：補本人核心模組、debugging / tests 與分工 | [miniOS README](https://github.com/Lei-TzuY/minios-x86/blob/e63d4218ea91069506b05944ead5a9198bf8568a/README.md)、[個人首頁列為 flagship](https://github.com/Lei-TzuY/Lei-TzuY/blob/933d65bbd1ba666c2ab3ce54548040a14be9573e/README.md) | Sources located；TODO：補 project template；Untested |

## Supported observations and claim boundaries

| Candidate | 本次實際讀到的來源內容 | 能支持的範圍 / 待補證據 |
| --- | --- | --- |
| Picture Magician | README 與專題報告書描述 Flask、ComfyUI、影像工作流程與部署 | 支持「有這些文件與 prototype 描述」；TODO：獨立運行紀錄、個人貢獻與評估。兩個 repo 的主版本仍待確認 |
| GPU deployment | 啟動腳本含單 GPU / device-selection 設定 | 支持「存在設定腳本」；不證明所有設定被 runtime 採用、特定硬體曾成功運行或 multi-GPU 加速。TODO：版本、topology、logs、baseline / raw measurements |
| Quality_Assurance | README 區分 simulated MWE、controlled callable study 與 local Ollama execution，限制真實世界有效性主張 | 保留各層來源差別；不宣稱普遍改善品質。TODO：逐項 claim 對應 raw evidence 與 evaluation assumptions |
| SE-and-AGI | README 明示沒有 real model calls / collected evaluation data，LLM-effectiveness claims unsupported | 可談 deterministic traceability / V&V prototype；不得把它說成已驗證 Human vs LLM 優劣 |
| IQA-SOA | README 區分 mechanism / governance / effectiveness，凍結 lifecycle 為 HOLD，effectiveness 尚未建立 | 不把 HOLD、測試通過或機制存在轉成 QA 效果改善；TODO：檢查正式 claim 與 artifact mapping |
| Tiny Transformer | README 描述 NumPy autograd / Transformer、training、KV cache / LoRA 與 validation | 支持 code / documentation 存在；本次未重跑 benchmarks，不轉述 speedup / memory 數字為本人已驗證成果 |
| miniOS | README 明示 educational / hobby scope，列 kernel subsystems 與測試路徑 | 不宣稱 production 等同 Linux；TODO：選一個本人能解釋的垂直切片與真實驗證 |
| Surviving-mutants research | 有限定候選 repo 的 keyword search，但未取得匹配研究 evidence | TODO 持續保留；search 未命中不代表研究不存在，也不能把 IQA-SOA 或其他 repo 自動改名成該研究 |

上表每列沿用 inventory 的 Evidence；文字限定為來源觀察，不表示本次重新執行或正式評審。文件中的結果數字本次未搬成成果主張。

Surviving-mutants 查找記錄：本次在 Quality_Assurance、SE-and-AGI、iqa-soa、agent-authority-synthesis 以 `surviving mutant` 搜尋，未取得匹配 excerpt；search index coverage 未確認，因此只標「證據待補」，不推論研究不存在。

## Publication / submission status

任何 candidate 的 submitted / under review / accepted / published 均未取得可確認的正式狀態證據，維持 **UNKNOWN / TODO**。Paper draft、submission checklist、artifact 或研究 repo 存在，不等於已投稿、接受或發表。

若更新狀態，記錄 venue / track、實際日期、狀態來源與 checked date；只用本人可核對的通知或正式公開紀錄，不能從檔名推定。

## From inventory to formal defense

1. 先選與實際申請資料一致、本人最能解釋且有 evidence 的 1–2 個候選；這是準備順序，沒有預評 Strong。
2. 補 My actual role、目前版本、claim / evidence、baselines、Evaluation / Results / Limitations；缺資料的項目繼續 TODO。
3. 複製 [project template](project-defense-template.md) 或 [research template](research-defense-template.md) 成實際 defense file，再把連結加到 inventory。
4. 完成 Problem、Motivation、My contribution、Architecture / methodology、Technical decisions、Alternatives considered、Evaluation、Results、Limitations、Failure cases、What I would improve、Potential professor attacks。
5. 建立並實際練習 30-second、2-minute、5-minute versions；在 [mock](../mock-interviews/README.md) 保留回答與追問證據後才更新能力。

### 共用追問連結

- 實驗主張與不確定性：[Statistics / Experimental Design](../topics/11-statistics-experimental-design.md)。
- QA、surviving mutants、refactor / CI 證據：[Software Engineering](../topics/12-software-engineering.md)，defense / mock 視同 Tier S。
- GPU 成本與系統瓶頸：[Computer Architecture](../topics/10-computer-architecture.md)、[Transformer / LLM](../topics/05-transformer-llm.md)。
- 有確認面試目標後才做大量 [school-specific preparation](../school-specific/README.md)。

目前只有 inventory 與既有模板，尚無完成的正式 defense 或口試紀錄。
