# Computer Networks

## Interview Scope

Tier A。能沿著一次網路請求說明 naming、routing、transport、security 與 application 的責任，並區分可靠性、latency、throughput 與安全性。

## Must Know

| Subtopic | 面試必須能回答 |
| --- | --- |
| OSI / TCP-IP basics | 分層目的、encapsulation、各層責任；OSI 七層與 TCP/IP 常見四 / 五層模型的對應不是實作的絕對邊界 |
| TCP vs UDP | TCP 的 reliable ordered byte stream；UDP 的 datagram / message boundary 與無內建可靠傳遞保證；應用仍可在 UDP 上加機制 |
| 3-way handshake | SYN、SYN-ACK、ACK，sequence numbers 與雙方連線狀態；不等於 TLS handshake |
| HTTP / HTTPS | Request / response、method、status、header、body；HTTPS 是以 TLS 保護 HTTP，HTTP/3 使用 QUIC 而非 TCP |
| DNS | Name resolution、recursive / authoritative、records、cache / TTL；可能用 UDP 或 TCP，另有加密傳輸方式 |
| TLS | Authentication、confidentiality、integrity；certificate 驗證與 key establishment，TLS 不代表網站內容可信 |
| IP | Address、subnet / prefix、best-effort packet forwarding；IP address 與 port 的責任不同 |
| Routing basics | Route table、longest-prefix match、next hop；forwarding 與 routing / control plane 的差別 |

## Should Know

- RTT、bandwidth、throughput、packet loss、congestion control 與 flow control。
- TCP retransmission、ACK、stream 的 framing；一次 send 不對應一次 recv。
- TCP head-of-line blocking 與 HTTP multiplexing 的不同層次。
- ARP / neighbor discovery、NAT、private / public IP、CIDR。
- HTTP keep-alive、cache、idempotency、timeout / retry 的作用與風險。

## Common Professor Questions

- 在瀏覽器輸入一個 HTTPS URL 後，哪些步驟會發生？
- TCP 為何需要握手？它保證了什麼？
- 遊戲、影片與檔案傳輸如何選 transport？
- DNS 查詢一定經過遠端 server 嗎？
- IP routing 與 transport port 各如何把資料送到正確位置？

## Follow-up Questions

- 若 DNS cache 已有結果，流程如何改變？
- 對方斷線時，TCP reliable 是否代表資料一定已被 application 處理？
- TCP 的 stream 如何讓 server 分辨兩則訊息？
- HTTPS 是否隱藏所有 metadata？certificate 無效時失去什麼保證？
- 若 RTT 很高、packet loss 多，latency 與 throughput 的瓶頸如何區分？

## Whiteboard / Coding Expectations

1. 畫 DNS → transport setup → TLS → HTTP 的資料流，標出 cache / reused connection 的例外。
2. 畫 TCP handshake，說明 sequence / acknowledgement 的目的。
3. 口述 length-prefix / delimiter framing，處理 partial read / write 與多訊息合併。
4. 對簡單 CIDR / route table 做 longest-prefix match。
5. 設計 timeout / retry，區分讀取失敗、server error 與重複執行的問題。

## Common Mistakes

- 說 UDP 一定快或 TCP 一定適合所有資料。
- 把 TCP acknowledgement 當成 application transaction 已完成。
- 把 TCP / TLS handshake 混在一起；把 HTTPS 等同可信內容。
- 宣稱 DNS 只用 UDP 或所有 HTTP 都用 TCP。
- 假設一次 send / recv 就是一則完整訊息。

## Self-check Checklist

- [ ] 能沿一次請求說明分層與各層責任。
- [ ] 能比較 TCP / UDP，解釋 handshake 與 framing。
- [ ] 能說明 DNS cache、TLS certificate 與 HTTPS 的保證。
- [ ] 能解釋 IP / port / routing 的分工。
- [ ] 能區分 RTT、throughput、loss 與應用重試問題。

## Review Status

| Level | Evidence | Last Tested | Next Review |
| --- | --- | --- | --- |
| Untested | 尚無作答證據 | 未測 | 待實測後排定 |

逐子題以 [Weakness Map](../WEAKNESS_MAP.md) 為準；複習依 [spaced repetition](../review/spaced-repetition.md)。

## References

- [RFC 9293：TCP](https://www.rfc-editor.org/rfc/rfc9293.html)
- [RFC 8446：TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446.html)

## Visual Learning

**Use only after blind diagnostic attempt.** 首答已保存，且教練指定 Review / Weak / Critical 或需 intuition 時才使用；閱讀後只算 Assisted Improvement，延後閉卷重測才產生 independent evidence。

[TCP delivery](../visual-learning/app/lessons/tcp-delivery.html) · [Network / DNS / TLS diagram](../visual-learning/app/lessons/network-stack.html)。外部補充（同樣限首答後）：[TCP RFC 9293：握手與狀態圖](https://www.rfc-editor.org/rfc/rfc9293)。完整 external / local / scenario 決策見 [Visual Learning index](../visual-learning/INDEX.md) 與 [Resource Map](../visual-learning/RESOURCE_MAP.md)。
