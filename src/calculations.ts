export const LIMITS = {
  amount: 1_000_000,
  rate: 100,
  cost: 10,
  slippage: 10,
} as const;
export const MAX_INPUT_LENGTH = 24;
export const DIRECT_FEE_PERCENT = 0.1;
export type Scenario = {
  amount: number;
  rate: number;
  tradingPercent: number;
  slippagePercent: number;
};
export type Estimate = {
  gross: number;
  fee: number;
  slippage: number;
  received: number;
};
export type Comparison = {
  instant: Estimate;
  direct: Estimate;
  difference: number;
};
export function parseField(
  raw: string,
  max: number,
  positive = false,
): number | null {
  if (raw.length > MAX_INPUT_LENGTH) return null;
  if (!/^(?:\d+(?:\.\d{0,9})?|\.\d{1,9})$/.test(raw)) return null;
  const value = Number(raw);
  return Number.isFinite(value) &&
    value <= max &&
    (positive ? value > 0 : value >= 0)
    ? value
    : null;
}
export function calculate(s: Scenario): Comparison | null {
  const { amount, rate, tradingPercent, slippagePercent } = s;
  if (
    ![amount, rate, tradingPercent, slippagePercent].every(Number.isFinite) ||
    amount < 0 ||
    amount > LIMITS.amount ||
    rate <= 0 ||
    rate > LIMITS.rate ||
    tradingPercent < 0 ||
    tradingPercent > LIMITS.cost ||
    slippagePercent < 0 ||
    slippagePercent > LIMITS.slippage
  )
    return null;
  const gross = amount * rate;
  const fee = (gross * tradingPercent) / 100;
  const slippage = ((gross - fee) * slippagePercent) / 100;
  const instant = { gross, fee, slippage, received: gross - fee - slippage };
  const directFee = (gross * DIRECT_FEE_PERCENT) / 100;
  const direct = {
    gross,
    fee: directFee,
    slippage: 0,
    received: gross - directFee,
  };
  return { instant, direct, difference: direct.received - instant.received };
}
export const formatSOL = (n: number): string => {
  if (!Number.isFinite(n) || n < 0) return "—";
  if (n > 0 && n < 0.00005) return "<0.0001";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};
