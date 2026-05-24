export type Problem = {
  q: string;
  choices: string[];
  answer: number; // index
  hint?: string;
};

// Tier 1: Limits & basics
export const tier1: Problem[] = [
  { q: "lim(x→2) (x² − 4)/(x − 2)", choices: ["0", "2", "4", "undefined"], answer: 2 },
  { q: "lim(x→0) sin(x)/x", choices: ["0", "1", "∞", "π"], answer: 1 },
  { q: "lim(x→∞) (3x² + 1)/(x² − 5)", choices: ["0", "1", "3", "∞"], answer: 2 },
  { q: "lim(x→0) (1 − cos x)/x²", choices: ["0", "1/2", "1", "2"], answer: 1 },
  { q: "lim(x→1) (x³ − 1)/(x − 1)", choices: ["0", "1", "3", "∞"], answer: 2 },
  { q: "lim(x→0⁺) ln(x)", choices: ["0", "1", "−∞", "∞"], answer: 2 },
];

// Tier 2: Derivatives
export const tier2: Problem[] = [
  { q: "d/dx [ x³ ]", choices: ["x²", "3x²", "3x", "x³/3"], answer: 1 },
  { q: "d/dx [ sin(x) ]", choices: ["cos(x)", "−cos(x)", "−sin(x)", "tan(x)"], answer: 0 },
  { q: "d/dx [ e^x ]", choices: ["e^x", "x·e^(x−1)", "1", "ln(x)"], answer: 0 },
  { q: "d/dx [ ln(x) ]", choices: ["x", "1/x", "e^x", "−1/x²"], answer: 1 },
  { q: "d/dx [ x·sin(x) ]", choices: ["cos(x)", "sin(x) + x·cos(x)", "x·cos(x)", "sin(x) − x·cos(x)"], answer: 1 },
  { q: "d/dx [ (x² + 1)⁵ ]", choices: ["5(x² + 1)⁴", "10x(x² + 1)⁴", "2x·5", "(2x)⁵"], answer: 1 },
  { q: "d/dx [ tan(x) ]", choices: ["sec(x)", "sec²(x)", "−csc²(x)", "cot(x)"], answer: 1 },
  { q: "d/dx [ √x ]", choices: ["1/√x", "1/(2√x)", "2√x", "x^(−1/2)/3"], answer: 1 },
];

// Tier 3: Chain rule & implicit
export const tier3: Problem[] = [
  { q: "d/dx [ sin(x²) ]", choices: ["cos(x²)", "2x·cos(x²)", "2x·sin(x²)", "cos(2x)"], answer: 1 },
  { q: "d/dx [ e^(3x) ]", choices: ["e^(3x)", "3e^(3x)", "x·e^(3x)", "e^(3x)/3"], answer: 1 },
  { q: "d/dx [ ln(x² + 1) ]", choices: ["1/(x² + 1)", "2x/(x² + 1)", "2x", "ln(2x)"], answer: 1 },
  { q: "If y² = x, dy/dx =", choices: ["1/(2y)", "2y", "1/y²", "−1/(2y)"], answer: 0 },
  { q: "d/dx [ x^x ]", choices: ["x·x^(x−1)", "x^x · (1 + ln x)", "x^x · ln x", "x^x"], answer: 1 },
  { q: "Critical points of f(x) = x³ − 3x", choices: ["x = 0", "x = ±1", "x = ±√3", "none"], answer: 1 },
];

// Tier 4: Integrals
export const tier4: Problem[] = [
  { q: "∫ x² dx", choices: ["x³ + C", "x³/3 + C", "2x + C", "3x² + C"], answer: 1 },
  { q: "∫ cos(x) dx", choices: ["sin(x) + C", "−sin(x) + C", "−cos(x) + C", "tan(x) + C"], answer: 0 },
  { q: "∫ 1/x dx", choices: ["−1/x² + C", "ln|x| + C", "x + C", "e^x + C"], answer: 1 },
  { q: "∫ e^x dx", choices: ["e^x + C", "x·e^x + C", "e^x/x + C", "ln(x) + C"], answer: 0 },
  { q: "∫₀¹ 2x dx", choices: ["0", "1", "2", "1/2"], answer: 1 },
  { q: "∫ sec²(x) dx", choices: ["tan(x) + C", "sec(x)·tan(x) + C", "−cot(x) + C", "ln|sec x| + C"], answer: 0 },
  { q: "∫₀^π sin(x) dx", choices: ["0", "1", "2", "π"], answer: 2 },
  { q: "∫ 2x·cos(x²) dx", choices: ["sin(x²) + C", "cos(x²) + C", "x²·sin(x²) + C", "2·sin(x²) + C"], answer: 0 },
];

// Tier 5: Boss-level (series, FTC, applications)
export const tier5: Problem[] = [
  { q: "Σ(n=0..∞) 1/2ⁿ", choices: ["1", "2", "e", "diverges"], answer: 1 },
  { q: "Taylor series of e^x at 0, x² coefficient", choices: ["1", "1/2", "1/6", "2"], answer: 1 },
  { q: "Area under y = x² from 0 to 3", choices: ["3", "9", "9/2", "27/3"], answer: 3, hint: "27/3 = 9, but ∫₀³ x² dx = 9" },
  { q: "d/dx [∫₀^x sin(t²) dt ]", choices: ["sin(x²)", "cos(x²)", "2x·cos(x²)", "0"], answer: 0 },
  { q: "Σ(n=1..∞) 1/n²", choices: ["π/2", "π²/6", "ln 2", "diverges"], answer: 1 },
  { q: "Mean Value Theorem requires f to be…", choices: ["continuous only", "differentiable only", "continuous on [a,b], differentiable on (a,b)", "polynomial"], answer: 2 },
];

export const tiers = [tier1, tier2, tier3, tier4, tier5];

export function pickProblem(tier: number, used: Set<string>): Problem {
  const pool = tiers[Math.min(tier, tiers.length - 1)];
  const available = pool.filter((p) => !used.has(p.q));
  const list = available.length ? available : pool;
  return list[Math.floor(Math.random() * list.length)];
}