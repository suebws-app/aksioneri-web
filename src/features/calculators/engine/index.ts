export {
  COMPOUNDING_PERIODS,
  computeCompound,
  futureValue,
  type CompoundingFrequency,
  type CompoundInput,
  type CompoundResult,
  type CompoundYear,
} from './compound';
export {
  allFinite,
  asFraction,
  clamp,
  deflate,
  fromCents,
  isFiniteNumber,
  isRepresentableMoney,
  isValidRatePercent,
  isValidYears,
  monthlyGrowthFactor,
  roundMoney,
  toCents,
  MAX_MONEY,
  MAX_YEARS,
} from './guards';
export {
  computeAmortization,
  computeMortgage,
  PAYMENT_FREQUENCIES,
  type AmortizationInput,
  type AmortizationResult,
  type AmortizationRow,
  type MortgageInput,
  type MortgageResult,
  type PaymentFrequency,
} from './amortization';
export {
  CONTRIBUTION_FREQUENCIES,
  computeDca,
  type ContributionFrequency,
  type DcaInput,
  type DcaResult,
  type DcaYear,
} from './dca';
export {
  computeDividend,
  requiredInvestment,
  type DividendInput,
  type DividendResult,
  type DividendYear,
} from './dividend';
export {
  computeRetirement,
  SCENARIOS,
  type RetirementInput,
  type RetirementResult,
  type ScenarioName,
  type ScenarioOutcome,
} from './retirement';
export { computeFx, type FxInput, type FxResult } from './fx';
export { computeStock, type StockInput, type StockResult } from './stock';
export {
  computeChange,
  computeInflation,
  computeReturn,
  daysBetween,
  yearsBetween,
  type ReturnInput,
  type ReturnResult,
  type SimpleChangeInput,
} from './returns';
export {
  ok,
  refuse,
  type ComputeContext,
  type Currency,
  type Outcome,
  type RefusalReason,
  type SeriesPoint,
} from './types';
