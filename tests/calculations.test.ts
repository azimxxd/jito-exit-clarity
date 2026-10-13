import { test } from "node:test";
import assert from "node:assert/strict";
import {
  calculate,
  parseField,
  formatSOL,
  LIMITS,
} from "../src/calculations.ts";
const base = {
  amount: 10,
  rate: 1.15,
  tradingPercent: 0.2,
  slippagePercent: 0,
};
const near = (a: number, b: number) =>
  assert.ok(Math.abs(a - b) < 1e-9, `${a} differs from ${b}`);
test("default mock scenario applies rate and independent fees", () => {
  const r = calculate(base)!;
  near(r.instant.received, 11.477);
  near(r.direct.received, 11.4885);
  near(r.difference, 0.0115);
});
test("slippage applies after modeled trading cost", () => {
  const r = calculate({ ...base, slippagePercent: 1 })!;
  near(r.instant.slippage, 0.11477);
  near(r.instant.received, 11.36223);
});
test("zero amount produces zero fees and output", () => {
  const r = calculate({ ...base, amount: 0 })!;
  assert.equal(r.instant.received, 0);
  assert.equal(r.direct.fee, 0);
});
test("negative, nonfinite, excessive and invalid fields never produce quotes", () => {
  for (const field of Object.keys(base))
    for (const value of [-1, NaN, Infinity])
      assert.equal(calculate({ ...base, [field]: value }), null);
  assert.equal(calculate({ ...base, rate: 0 }), null);
  assert.equal(calculate({ ...base, amount: LIMITS.amount + 1 }), null);
  assert.equal(calculate({ ...base, tradingPercent: 11 }), null);
  assert.equal(calculate({ ...base, slippagePercent: 11 }), null);
  assert.equal(calculate({ ...base, rate: 101 }), null);
});
test("strict decimal parser rejects malformed, blank and overprecision input", () => {
  for (const value of [
    "",
    " ",
    "-1",
    "NaN",
    "Infinity",
    "1e3",
    "12x",
    "0.1234567891",
    "1,000",
  ])
    assert.equal(parseField(value, LIMITS.amount), null);
  assert.equal(parseField(".5", 100), 0.5);
  assert.equal(parseField(".", 100), null);
  assert.equal(parseField("0", 100), 0);
  assert.equal(parseField("0", 100, true), null);
  assert.equal(parseField("1.123456789", 100), 1.123456789);
  assert.equal(parseField("1000001", LIMITS.amount), null);
});
test("cost assumptions can reverse the outcome and max scenario stays finite", () => {
  assert.ok(calculate({ ...base, tradingPercent: 0 })!.difference < 0);
  const r = calculate({
    ...base,
    amount: LIMITS.amount,
    rate: LIMITS.rate,
    tradingPercent: 10,
    slippagePercent: 10,
  })!;
  assert.ok(Number.isFinite(r.instant.received));
  assert.ok(r.instant.received >= 0);
});

test("equivalent fees produce an exact tie instead of floating-point superiority", () => {
  for (const amount of [0, 0.1, 10, 1000000]) {
    const result = calculate({ ...base, amount, tradingPercent: 0.1 })!;
    assert.equal(result.difference, 0);
    assert.equal(result.instant.received, result.direct.received);
  }
});
test("small nonzero estimates do not masquerade as zero", () => {
  assert.equal(formatSOL(0), "0.0000");
  assert.equal(formatSOL(0.000001), "<0.0001");
  assert.equal(formatSOL(NaN), "—");
  assert.equal(formatSOL(Infinity), "—");
});
test("modeled costs reconcile with gross output across decimal scenarios", () => {
  for (const amount of [0.000000001, 0.5, 10.123456789, 1000000]) {
    const result = calculate({
      ...base,
      amount,
      tradingPercent: 0.7,
      slippagePercent: 2,
    })!;
    for (const route of [result.instant, result.direct]) {
      const discrepancy = Math.abs(
        route.received + route.fee + route.slippage - route.gross,
      );
      assert.ok(discrepancy <= Math.max(1, route.gross) * Number.EPSILON * 4);
      assert.ok(route.received >= 0 && route.received <= route.gross);
    }
  }
});

test("overlong input cannot expand result labels or bypass display bounds", () => {
  assert.equal(parseField("0".repeat(1000), LIMITS.amount), null);
  assert.equal(parseField("0".repeat(24), LIMITS.amount), 0);
});
