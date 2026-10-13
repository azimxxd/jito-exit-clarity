# Research notes

Reviewed: 13 October 2026. These observations describe public materials, not a complete live product audit.

## Primary sources

1. https://www.jito.network/jitosol/
   The Liquid section uses “No lockups. No exit penalties.” The product page also describes exchange-rate growth as rewards accrue; a fixed one-to-one conversion would be misleading.
2. https://www.jito.network/docs/jitosol/get-started/unstaking-jitosol-flow/unstaking-overview/
   The method comparison lists Jupiter trading as instant with typical fees below 0.3%, and direct unstaking as up to two days with a 0.1% fee. The direct process includes moving stake, deactivation, waiting and withdrawal. The documentation already explains these choices.

## Interpretation

The design hypothesis is that presenting this explanation before wallet connection could improve comprehension. Marketing language about penalties does not imply that transaction or trading costs are zero. The concept is deliberately fair to the existing documentation.

The current discovery journey shown in the app is a conceptual model derived from these materials. No wallet was connected to verify the full live experience. Timing descriptions are documented expectations, not guarantees.

## Modeling choices

The 1.15 SOL mock rate, 0.2% trading cost and optional slippage impact are fictional editable assumptions. The direct fee is drawn from the official overview. Modeled steps are educational journey stages, not transaction counts. Direct unstaking has multiple wallet interactions; the waiting stage itself is not a transaction.

## Proposed validation

Recruit first-time liquid-staking users; compare discovery experiences with and without the module. Ask participants to explain rate conversion, total-cost uncertainty, waiting time and remaining withdrawal steps. Record comprehension and decision confidence. Do not treat faster clicks or a preferred method as proof of better financial outcomes.

## Production requirements

Use live route quotes and protocol exchange rates independently, account for network and account costs, show quote expiry and slippage settings, and verify protocol timing and wallet-specific steps. Validate accessibility and comprehension with real users. This prototype implements none of the transaction flow.
