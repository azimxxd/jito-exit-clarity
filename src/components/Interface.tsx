import { useEffect, useRef, useState, useId } from "react";
import { animate, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Info,
  Layers3,
  Zap,
} from "lucide-react";
import {
  formatSOL,
  parseField,
  LIMITS,
  MAX_INPUT_LENGTH,
  type Estimate,
} from "../calculations";
import { SOURCES } from "../sources";
export function Token({ sol = false }: { sol?: boolean }) {
  return (
    <span className={`token ${sol ? "sol" : ""}`} aria-hidden="true">
      {sol ? (
        <span className="sol-bars">
          <i />
          <i />
          <i />
        </span>
      ) : (
        <span className="token-letter">J</span>
      )}
    </span>
  );
}
export function Header() {
  return (
    <header>
      <div className="container header-inner">
        <a
          href="#overview"
          className="brand"
          aria-label="Exit Clarity independent concept home"
        >
          <span className="concept-symbol" aria-hidden="true">
            ↗
          </span>
          <span className="brand-divider" />
          <span>
            EXIT CLARITY<small>JitoSOL UX exploration</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#overview">Overview</a>
          <a href="#compare">Compare methods</a>
          <a href="#research">Research</a>
          <a href={SOURCES.docs} target="_blank" rel="noreferrer">
            Documentation <ArrowUpRight size={12} />
          </a>
        </nav>
        <span className="concept">
          <span /> Independent concept
        </span>
      </div>
    </header>
  );
}
export function Hero() {
  return (
    <section id="overview" className="hero container">
      <div>
        <p className="eyebrow">
          <span className="line" /> AN INDEPENDENT JITOSOL UX EXPLORATION
        </p>
        <h1>
          Exit with
          <br />
          <span>clarity.</span>
        </h1>
        <p className="hero-copy">
          Understand your options before you unstake.
          <br />
          Compare withdrawal methods, understand potential costs, and explore
          your options before connecting a wallet.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#compare">
            Compare Exit Methods <ArrowDownRight size={18} />
          </a>
          <a className="text-link" href="#research">
            View Research <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="hero-note">
          <Check size={13} /> No wallet needed <span>•</span> No transactions{" "}
          <span>•</span> Just clarity
        </p>
        <p className="independent-note">
          Independent UX research concept. Not affiliated with or endorsed by
          Jito.
        </p>
      </div>
      <div
        className="flow-illustration"
        aria-label="Illustration of two routes from JitoSOL to SOL"
      >
        <div className="grid-backdrop" />
        <div className="flow-heading">
          <span>ONE ASSET. TWO WAYS OUT.</span>
          <span className="tiny-dot" />
        </div>
        <div className="flow-source">
          <Token />
          <div>
            <b>JitoSOL</b>
            <small>Your liquid staking position</small>
          </div>
          <span className="flow-tag">START</span>
        </div>
        <div className="flow-connectors" aria-hidden="true">
          <span />
          <span />
          <i className="flow-packet stem" />
          <i className="flow-packet branch-fast" />
          <i className="flow-packet branch-slow" />
        </div>
        <div className="route-row">
          <div className="route instant">
            <Zap size={20} />
            <b>Instant swap</b>
            <small>Seconds</small>
          </div>
          <div className="route direct">
            <Clock3 size={20} />
            <b>Direct unstake</b>
            <small>Up to 2 days</small>
          </div>
        </div>
        <div className="flow-bottom">
          <div className="dotted-path" aria-hidden="true">
            <i className="arrival-packet" />
          </div>
          <div className="flow-target">
            <Token sol />
            <b>SOL</b>
            <Check size={16} />
          </div>
          <div className="dotted-path reverse" aria-hidden="true">
            <i className="arrival-packet" />
          </div>
        </div>
        <div className="flow-caption">
          Different routes. Clearer expectations.
        </div>
        <span className="illustration-label">
          CONCEPTUAL FLOW · NO LIVE DATA
        </span>
      </div>
    </section>
  );
}
export function Tooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span
      className="tooltip-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement))
          setOpen(false);
      }}
    >
      <button
        className="info-button"
        aria-label="About illustrative estimates"
        aria-expanded={open}
        aria-describedby={id}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
          }
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <Info size={14} />
      </button>
      <span id={id} className={`tooltip ${open ? "open" : ""}`} role="tooltip">
        {text}
      </span>
    </span>
  );
}
export function AnimatedNumber({ value }: { value: number | null }) {
  const [display, setDisplay] = useState(value ?? 0);
  const current = useRef(value ?? 0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (value === null) return;
    if (reduced) {
      current.current = value;
      setDisplay(value);
      return;
    }
    const control = animate(current.current, value, {
      duration: 0.25,
      onUpdate: (next) => {
        current.current = next;
        setDisplay(next);
      },
    });
    return () => control.stop();
  }, [value, reduced]);
  return (
    <>
      <span className="numeric" aria-hidden="true">
        {value === null ? "—" : formatSOL(display)}
      </span>
      <span className="sr-only">
        {value === null ? "Estimate unavailable" : formatSOL(value)}
      </span>
    </>
  );
}
export function AmountInput({
  raw,
  setRaw,
  error,
}: {
  raw: string;
  setRaw: (v: string) => void;
  error: boolean;
}) {
  return (
    <div className="amount-box">
      <div className="amount-label">
        <label htmlFor="amount">Amount to unstake</label>
        <span>YOUR SCENARIO</span>
      </div>
      <div className="amount-entry">
        <input
          id="amount"
          inputMode="decimal"
          maxLength={MAX_INPUT_LENGTH}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          aria-invalid={error}
          aria-describedby="amount-help"
          autoComplete="off"
        />
        <span className="token-label">
          <Token /> JitoSOL
        </span>
      </div>
      <div className="amount-bottom">
        <span id="amount-help" className={error ? "error" : ""}>
          {error
            ? "Enter 0–1,000,000, with up to 9 decimals."
            : "Explore any amount. No wallet balance required."}
        </span>
        <div className="presets" aria-label="Amount presets">
          {[1, 10, 100].map((n) => (
            <button
              key={n}
              className={raw === String(n) ? "active" : ""}
              aria-pressed={raw === String(n)}
              onClick={() => setRaw(String(n))}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export function FeeBreakdown({
  estimate,
  instant,
  trading,
  slippage,
}: {
  estimate: Estimate | null;
  instant: boolean;
  trading: string;
  slippage: string;
}) {
  return (
    <details className="fee-details">
      <summary>
        Explore cost breakdown <ChevronDown size={15} />
      </summary>
      <div className="breakdown">
        <div>
          <span>Before modeled costs</span>
          <b>{estimate ? formatSOL(estimate.gross) : "—"} SOL</b>
        </div>
        <div>
          <span>
            {instant
              ? parseField(trading, LIMITS.cost) === null
                ? "Trading assumption invalid"
                : `Illustrative trading (${trading}%)`
              : "Protocol fee (0.1%)"}
          </span>
          <b>−{estimate ? formatSOL(estimate.fee) : "—"} SOL</b>
        </div>
        {instant && (
          <div>
            <span>
              {parseField(slippage, LIMITS.slippage) === null
                ? "Slippage assumption invalid"
                : `Slippage scenario (${slippage}%)`}
            </span>
            <b>−{estimate ? formatSOL(estimate.slippage) : "—"} SOL</b>
          </div>
        )}
        <p>
          {instant
            ? "Trading cost is deducted first; modeled slippage is applied to the remainder. This is a hypothetical scenario, not a Jupiter quote."
            : "The documented protocol fee is applied to the example SOL value. The actual protocol exchange rate may change."}{" "}
          Network fees, priority fees and account funding are not included.
          Values are rounded for display.
        </p>
      </div>
    </details>
  );
}
export function ComparisonCard({
  instant,
  estimate,
  highlighted,
  trading,
  slippage,
}: {
  instant: boolean;
  estimate: Estimate | null;
  highlighted: boolean;
  trading: string;
  slippage: string;
}) {
  return (
    <article
      className={`comparison-card ${instant ? "mint" : "lavender"} ${highlighted ? "highlighted" : ""}`}
    >
      <div className="card-top">
        <span className="method-icon">
          {instant ? <Zap size={21} /> : <Layers3 size={21} />}
        </span>
        <span className="method-tag">
          {instant ? "MARKET ROUTE" : "PROTOCOL ROUTE"}
        </span>
      </div>
      <h3>{instant ? "Instant via Jupiter" : "Direct Unstaking"}</h3>
      <p className="card-subtitle">
        {instant
          ? "Trade your JitoSOL for SOL."
          : "Redeem through the staking protocol."}
      </p>
      <div className="estimate-label">
        Estimated SOL received{" "}
        <Tooltip text="Fictional example using the shared mock conversion rate. Excludes network and account costs." />
      </div>
      <div className="estimate-number">
        <AnimatedNumber value={estimate?.received ?? null} />
        <span>SOL</span>
      </div>
      <div className="card-rows">
        <div>
          <span>{instant ? "Trading assumption" : "Protocol fee"}</span>
          <b>
            {instant
              ? parseField(trading, LIMITS.cost) === null
                ? "Check assumption"
                : `${trading}% illustrative`
              : "0.1% documented"}
          </b>
        </div>
        <div>
          <span>Slippage</span>
          <b>
            {instant
              ? parseField(slippage, LIMITS.slippage) === null
                ? "Check assumption"
                : `${slippage}% scenario`
              : "No swap slippage"}
          </b>
        </div>
        <div>
          <span>Expected time</span>
          <b className="colored">
            {instant ? <Zap size={13} /> : <Clock3 size={13} />}{" "}
            {instant ? "Seconds" : "Up to 2 days"}
          </b>
        </div>
        <div>
          <span>Wallet interactions</span>
          <b>{instant ? "One transaction" : "Multiple transactions"}</b>
        </div>
      </div>
      <FeeBreakdown
        estimate={estimate}
        instant={instant}
        trading={trading}
        slippage={slippage}
      />
      <div className="card-foot">
        <span className={highlighted ? "colored" : ""}>
          {highlighted ? (
            <>
              <Check size={14} /> Fits your preference
            </>
          ) : (
            <>
              <Info size={14} /> A different trade-off
            </>
          )}
        </span>
        <a
          href={SOURCES.docs}
          target="_blank"
          rel="noreferrer"
          aria-label={`Read official documentation for ${instant ? "Jupiter trading" : "direct unstaking"}`}
        >
          <ArrowUpRight size={17} />
        </a>
      </div>
    </article>
  );
}
export function MethodTimeline() {
  const [route, setRoute] = useState<"instant" | "direct">("instant");
  const steps =
    route === "instant"
      ? [
          ["Choose amount", "Decide how much to convert."],
          ["Review quote", "Check the actual rate and costs."],
          ["Approve transaction", "Confirm the swap in your wallet."],
          ["Receive SOL", "Settlement is expected in seconds."],
        ]
      : [
          ["Initiate unstaking", "Move stake into your stake account."],
          ["Deactivate stake account", "Begin the protocol cooldown."],
          ["Wait for epoch boundary", "Allow up to 2 days for availability."],
          ["Withdraw available SOL", "Complete the withdrawal in your wallet."],
        ];
  return (
    <section className="container journey-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / THE JOURNEY</p>
          <h2>What happens next?</h2>
        </div>
        <div className="segmented" aria-label="Withdrawal journey">
          {(["instant", "direct"] as const).map((x) => (
            <button
              key={x}
              aria-pressed={route === x}
              className={route === x ? "selected" : ""}
              onClick={() => setRoute(x)}
            >
              {x === "instant" ? "Instant exit" : "Direct unstake"}
            </button>
          ))}
        </div>
      </div>
      <ol className="timeline" key={route}>
        {steps.map(([title, copy], i) => (
          <li className="timeline-step" key={title}>
            <div className="step-line">
              <span>0{i + 1}</span>
              {i < 3 && <ArrowRight size={17} />}
            </div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
      <p className="caption">
        {route === "instant"
          ? "Four decision stages, typically one wallet transaction."
          : "Four journey stages, including a wait; multiple wallet interactions."}{" "}
        This prototype explains the flow and does not execute it.
      </p>
    </section>
  );
}
export function ResearchSection() {
  return (
    <section id="research" className="container research-section">
      <p className="eyebrow">04 / RESEARCH & RATIONALE</p>
      <div className="research-title">
        <h2>
          Built on documented
          <br />
          observations.
        </h2>
        <p>
          A desk-research concept based on two official public pages. The
          opportunity is earlier comprehension; user impact has not been tested.
        </p>
      </div>
      <div className="research-grid">
        {[
          [
            "01",
            "What we observed",
            "The homepage says “no exit penalties.” The unstaking overview already compares Jupiter trading and direct unstaking, with their fees and timing.",
          ],
          [
            "02",
            "Why it matters",
            "Hypothesis: users may confuse penalties with execution costs. Explaining the distinction earlier could support an informed choice. We have not measured this confusion.",
          ],
          [
            "03",
            "What we propose",
            "Add a pre-connection comparison: enter an amount, review rate and cost assumptions, understand the wait, then connect when ready.",
          ],
          [
            "04",
            "How to validate it",
            "Compare the existing discovery flow with this concept. Ask new users to explain fees, rate uncertainty, waiting time and withdrawal steps. Measure correct answers and decision confidence; no results yet.",
          ],
        ].map(([n, title, copy]) => (
          <article key={n}>
            <span className="research-index">{n}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className="research-evidence">
        <a href={SOURCES.home} target="_blank" rel="noreferrer">
          <span className="eyebrow">OBSERVATION / PRODUCT PAGE</span>
          <h3>Liquidity messaging</h3>
          <p>
            The homepage emphasizes freedom to exit. That statement concerns
            penalties; it does not establish zero transaction or trading costs.
          </p>
          <span className="evidence-link">
            Read JitoSOL homepage <ArrowUpRight size={15} />
          </span>
        </a>
        <a href={SOURCES.docs} target="_blank" rel="noreferrer">
          <span className="eyebrow">EVIDENCE / OFFICIAL OVERVIEW</span>
          <h3>The comparison already exists</h3>
          <p>
            The docs list instant trading with typical fees below 0.3%, and
            direct unstaking with a 0.1% fee and a wait of up to two days. The
            trading figure is not an all-in quote.
          </p>
          <span className="evidence-link">
            Read unstaking overview <ArrowUpRight size={15} />
          </span>
        </a>
      </div>
      <div className="research-proposal">
        <span className="eyebrow">PROPOSED DISCOVERY JOURNEY</span>
        <ol>
          {[
            "Explore JitoSOL",
            "Compare illustrative exits",
            "Understand trade-offs",
            "Connect when ready",
          ].map((step, i) => (
            <li key={step}>
              <span>0{i + 1}</span>
              {step}
              {i < 3 && <ArrowRight size={14} />}
            </li>
          ))}
        </ol>
        <p>
          This journey is a proposal. No wallet-connected audit, user interviews
          or usability studies were conducted.
        </p>
      </div>
      <div className="source-links">
        <span>
          PRIMARY SOURCES <small>Reviewed 13 Oct 2026</small>
        </span>
        <a href={SOURCES.home} target="_blank" rel="noreferrer">
          JitoSOL homepage <ArrowUpRight size={16} />
        </a>
        <a href={SOURCES.docs} target="_blank" rel="noreferrer">
          Official unstaking documentation <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="container">
      <div className="footer-top">
        <a className="brand" href="#overview">
          <span className="concept-symbol" aria-hidden="true">
            ↗
          </span>
          <span className="brand-divider" />
          <span>
            EXIT CLARITY<small>JitoSOL UX exploration</small>
          </span>
        </a>
        <a href={SOURCES.docs} target="_blank" rel="noreferrer">
          Official documentation <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <p>
          Independent UX concept exploring clearer withdrawal decisions for
          JitoSOL.
          <br />
          Not affiliated with or endorsed by Jito.
        </p>
        <span>DESIGNED FOR UNDERSTANDING.</span>
      </div>
    </footer>
  );
}
