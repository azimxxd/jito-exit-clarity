import { useState } from "react";
import { MotionConfig, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Info,
  SlidersHorizontal,
  Zap,
  Clock3,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  AmountInput,
  ComparisonCard,
  Footer,
  Header,
  Hero,
  MethodTimeline,
  ResearchSection,
} from "./components/Interface";
import { SOURCES } from "./sources";
import { EstimateGuide } from "./components/EstimateGuide";
import {
  calculate,
  formatSOL,
  LIMITS,
  MAX_INPUT_LENGTH,
  parseField,
} from "./calculations";
type Preference = "Speed" | "Cost transparency" | "Simplicity";
export default function App() {
  const [amount, setAmount] = useState("10");
  const [rate, setRate] = useState("1.15");
  const [trading, setTrading] = useState("0.2");
  const [slippage, setSlippage] = useState("0");
  const [preference, setPreference] = useState<Preference>("Speed");
  const a = parseField(amount, LIMITS.amount),
    r = parseField(rate, LIMITS.rate, true),
    t = parseField(trading, LIMITS.cost),
    s = parseField(slippage, LIMITS.slippage);
  const result =
    a !== null && r !== null && t !== null && s !== null
      ? calculate({ amount: a, rate: r, tradingPercent: t, slippagePercent: s })
      : null;
  const instantFit = preference !== "Cost transparency";
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#compare">
        Skip to calculator
      </a>
      <Header />
      <main>
        <Hero />
        <div className="container trust-strip">
          <span>
            <ShieldCheck size={16} /> Understand first. Decide second.
          </span>
          <span>
            Two documented methods <span className="strip-slash">/</span> One
            clear comparison
          </span>
        </div>
        <section
          id="compare"
          tabIndex={-1}
          aria-labelledby="calculator-title"
          className="container calculator-section"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / EXPLORE YOUR EXIT</p>
              <h2 id="calculator-title">Same asset. Different trade-offs.</h2>
              <p>
                Explore fictional scenarios. No live quotes or wallet
                connection.
              </p>
            </div>
            <span className="demo-badge">
              <span /> ILLUSTRATIVE DEMO
            </span>
          </div>
          <div className="calculator-grid">
            <div className="scenario-panel">
              <AmountInput raw={amount} setRaw={setAmount} error={a === null} />
              <details className="assumptions" open>
                <summary>
                  <span>
                    <SlidersHorizontal size={15} /> Edit demo assumptions
                  </span>
                  <span className="assumption-rate">
                    {r === null
                      ? "Invalid rate"
                      : `Mock: 1 JitoSOL = ${rate} SOL`}{" "}
                    <ArrowRight size={13} />
                  </span>
                </summary>
                <div className="assumption-fields">
                  {[
                    {
                      id: "rate",
                      label: "Mock conversion rate (SOL per JitoSOL)",
                      value: rate,
                      set: setRate,
                      valid: r,
                      max: LIMITS.rate,
                      positive: true,
                    },
                    {
                      id: "trading",
                      label: "Illustrative trading cost (%)",
                      value: trading,
                      set: setTrading,
                      valid: t,
                      max: LIMITS.cost,
                      positive: false,
                    },
                    {
                      id: "slippage",
                      label: "Hypothetical slippage impact (%)",
                      value: slippage,
                      set: setSlippage,
                      valid: s,
                      max: LIMITS.slippage,
                      positive: false,
                    },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id}>{f.label}</label>
                      <input
                        id={f.id}
                        inputMode="decimal"
                        maxLength={MAX_INPUT_LENGTH}
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        aria-invalid={f.valid === null}
                        aria-describedby={`${f.id}-help`}
                      />
                      <small id={`${f.id}-help`}>
                        {f.valid === null
                          ? `Enter ${f.positive ? "a value above 0" : "0"} up to ${f.max}, with at most 9 decimals.`
                          : f.id === "rate"
                            ? "Fictional example rate. Never a market quote."
                            : f.id === "slippage"
                              ? "Modeled adverse price impact, not a slippage tolerance."
                              : "Hypothetical cost, not a live Jupiter fee or quote."}
                      </small>
                    </div>
                  ))}
                </div>
              </details>
              <div className="preference">
                <span className="label">What matters most to you?</span>
                <div className="preference-buttons">
                  {(
                    ["Speed", "Cost transparency", "Simplicity"] as Preference[]
                  ).map((p) => (
                    <button
                      key={p}
                      aria-pressed={preference === p}
                      onClick={() => setPreference(p)}
                      className={preference === p ? "selected" : ""}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <p>
                  <Info size={14} />
                  {preference === "Speed"
                    ? "Jupiter fits a shorter wait: settlement is expected in seconds."
                    : preference === "Simplicity"
                      ? "Jupiter fits fewer interactions: typically a single swap transaction."
                      : "Direct unstaking has a defined protocol fee and no swap slippage. Other costs still apply."}
                </p>
                <small>Preference fit, not a financial recommendation.</small>
              </div>
            </div>
            <div className="comparison-cards">
              <ComparisonCard
                instant
                estimate={result?.instant ?? null}
                highlighted={instantFit}
                trading={trading}
                slippage={slippage}
              />
              <ComparisonCard
                instant={false}
                estimate={result?.direct ?? null}
                highlighted={!instantFit}
                trading={trading}
                slippage={slippage}
              />
            </div>
          </div>
          <p className="sr-only" role="status">
            {result
              ? `Scenario updated. Instant: ${formatSOL(result.instant.received)} SOL. Direct: ${formatSOL(result.direct.received)} SOL.`
              : "Estimates unavailable. Check the amount and demo assumptions."}
          </p>
          <div className="disclaimer">
            <Info size={16} />
            <p>
              <strong>Illustrative estimates only. Not live quotes.</strong>{" "}
              Actual amounts and execution costs may differ. Real execution
              depends on liquidity, market conditions, slippage, network fees,
              routing, and actual exchange rates. Not all execution costs are
              included. Display rounded to 4 decimals.
            </p>
          </div>
          <div className="outcome-panel">
            <div>
              <span className="eyebrow">THE SCENARIO DIFFERENCE</span>
              <h3>
                {result
                  ? `${formatSOL(Math.abs(result.difference))} SOL ${result.difference > 0 ? "more with direct unstaking" : result.difference < 0 ? "more with instant exit" : "difference"}`
                  : "Enter valid assumptions to compare"}
              </h3>
              <p>
                {result
                  ? "Under your shared mock rate and modeled costs. This does not predict the better real-world outcome."
                  : "Estimates are hidden while any input is invalid."}
              </p>
            </div>
            <div className="outcome-bars">
              {[
                { name: "Instant", value: result?.instant, color: "mint" },
                { name: "Direct", value: result?.direct, color: "lavender" },
              ].map((x) => (
                <div className="bar-row" key={x.name}>
                  <span>{x.name}</span>
                  <div className="bar-track">
                    <motion.div
                      className={`bar-fill ${x.color}`}
                      animate={{
                        width:
                          result && result.direct.gross > 0
                            ? `${(x.value!.received / result.direct.gross) * 100}%`
                            : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <b>
                    {x.value ? formatSOL(x.value.received) : "—"}{" "}
                    <small>SOL</small>
                  </b>
                </div>
              ))}
            </div>
          </div>
          <EstimateGuide />
          <div className="comparison-table-wrap">
            <table>
              <caption className="sr-only">
                Comparison of modeled withdrawal methods
              </caption>
              <thead>
                <tr>
                  <th scope="col">At a glance</th>
                  <th scope="col">Instant via Jupiter</th>
                  <th scope="col">Direct Unstaking</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Modeled costs in SOL</th>
                  <td>
                    {result
                      ? formatSOL(result.instant.fee + result.instant.slippage)
                      : "—"}
                  </td>
                  <td>{result ? formatSOL(result.direct.fee) : "—"}</td>
                </tr>
                <tr>
                  <th scope="row">Expected waiting time</th>
                  <td>Seconds</td>
                  <td>Up to 2 days</td>
                </tr>
                <tr>
                  <th scope="row">Journey stages / wallet interactions</th>
                  <td>4 stages / 1 transaction</td>
                  <td>4 stages / multiple transactions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <MethodTimeline />
        <section className="problem-section">
          <div className="container">
            <p className="eyebrow">03 / THE DESIGN OPPORTUNITY</p>
            <h2>
              No exit penalties <span>≠</span>
              <br />
              No exit costs.
            </h2>
            <p className="problem-intro">
              The documentation is there. The opportunity is to bring
              understanding earlier into the experience.
            </p>
            <div className="definitions">
              {[
                [
                  "Exit penalties",
                  "A charge specifically for leaving. This differs from the costs of completing an exit.",
                ],
                [
                  "Protocol fees",
                  "A fee charged by the staking protocol for redemption.",
                ],
                [
                  "Trading fees",
                  "Costs associated with executing a market swap.",
                ],
                [
                  "Slippage",
                  "The difference between an expected swap price and the executed price.",
                ],
                [
                  "Network costs",
                  "Transaction fees, priority fees, or account costs paid on Solana.",
                ],
              ].map(([title, copy]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
            <div className="journey-compare">
              <div>
                <p className="eyebrow">CURRENT · CONCEPTUAL MODEL</p>
                <div className="discovery-flow">
                  {[
                    "Explore staking",
                    "Connect wallet",
                    "Open unstaking",
                    "Review trade-offs",
                  ].map((x, i) => (
                    <span key={x}>
                      {x}
                      {i < 3 && <ArrowRight size={14} />}
                    </span>
                  ))}
                </div>
                <p>
                  Based on public materials, not a verified comprehensive audit
                  of the live wallet-connected experience.
                </p>
              </div>
              <div className="proposed">
                <p className="eyebrow">PROPOSED · EARLIER UNDERSTANDING</p>
                <div className="discovery-flow">
                  {[
                    "Explore staking",
                    "Compare scenarios",
                    "Understand trade-offs",
                    "Connect when ready",
                  ].map((x, i) => (
                    <span key={x}>
                      {x}
                      {i < 3 && <ArrowRight size={14} />}
                    </span>
                  ))}
                </div>
                <p>
                  Move the explanation closer to the decision. Let people
                  explore before they commit.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ResearchSection />
        <section className="container recommendation">
          <div className="recommendation-icon">
            <Check size={24} />
          </div>
          <div>
            <p className="eyebrow">A FOCUSED PRODUCT RECOMMENDATION</p>
            <h2>
              A small change.
              <br />A clearer experience.
            </h2>
            <p>
              Show withdrawal methods before wallet connection. Integrate a
              lightweight comparison module into JitoSOL’s product experience,
              then use live quotes and accurate protocol data in a real
              implementation.
            </p>
            <span>
              <Zap size={14} /> Explore first <span>→</span> Understand the
              trade-offs <span>→</span> Act when ready
            </span>
          </div>
          <a className="button secondary" href="#compare">
            Explore the concept <ArrowUpRight size={17} />
          </a>
        </section>
        <div className="container closing-note">
          <Clock3 size={14} />
          <span>
            Frontend UX concept only. No wallet access, blockchain transactions,
            or live market data.
          </span>
          <a href={SOURCES.docs} target="_blank" rel="noreferrer">
            Learn from the official docs <ArrowUpRight size={13} />
          </a>
        </div>
      </main>
      <Footer />
    </MotionConfig>
  );
}
