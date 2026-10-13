import { ChevronDown, Info } from "lucide-react";
import { SOURCES } from "../sources";
export function EstimateGuide() {
  return (
    <details className="estimate-guide">
      <summary>
        <span>
          <Info size={16} /> How to read these estimates
        </span>
        <ChevronDown size={16} />
      </summary>
      <div className="guide-grid">
        <article>
          <h3>Exchange rate</h3>
          <p>
            JitoSOL represents a staking position, so it is not fixed at 1 SOL.
            We multiply your amount by one fictional rate for both routes to
            isolate modeled costs. Real swap prices and protocol redemption
            rates can differ.
          </p>
        </article>
        <article>
          <h3>Fees and excluded costs</h3>
          <p>
            Instant exit uses your illustrative trading cost. Direct exit models
            the documented 0.1% protocol fee. Network fees, priority fees and
            account funding are excluded from both. No exit penalties does not
            mean zero execution costs.
          </p>
        </article>
        <article>
          <h3>Slippage</h3>
          <p>
            A swap can execute at a different price from the quote. This input
            models an adverse price change after the trading cost. It is not a
            tolerance setting or a guaranteed cost. Direct redemption avoids
            swap slippage, but its actual protocol rate still matters.
          </p>
        </article>
        <article>
          <h3>Waiting time</h3>
          <p>
            A Jupiter swap is expected to settle in seconds after confirmation,
            subject to network conditions. Direct unstaking requires stake
            deactivation and an epoch boundary, documented as up to two days,
            then a separate withdrawal. These are expectations, not guarantees.
          </p>
        </article>
      </div>
      <a
        className="guide-source"
        href={SOURCES.docs}
        target="_blank"
        rel="noreferrer"
      >
        Source: official Jito unstaking overview ↗
      </a>
    </details>
  );
}
