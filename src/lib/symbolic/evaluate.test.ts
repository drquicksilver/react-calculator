import { describe, it, expect } from 'vitest';
import { parse } from './parser';
import { evaluate } from './evaluate';

function evalExpr(expr: string, env: Record<string, number> = {}): number {
  return evaluate(parse(expr), env);
}

describe('evaluate', () => {
  it('evaluates simple addition', () => {
    expect(evalExpr('1+2')).toBe(3);
  });

  it('respects operator precedence', () => {
    expect(evalExpr('2+3×4')).toBe(14);
  });

  it('handles parentheses', () => {
    expect(evalExpr('(2+3)×4')).toBe(20);
  });

  it('evaluates decimals', () => {
    expect(evalExpr('1.5+2.25')).toBeCloseTo(3.75);
  });

  it('evaluates mixed long expression', () => {
    expect(evalExpr('1+2×3-4÷5+6')).toBeCloseTo(1 + 2*3 - 4/5 + 6);
  });

  it('evaluates assignments and variable references', () => {
    const env: Record<string, number> = {};
    expect(evalExpr('x=2', env)).toBe(2);
    expect(env.x).toBe(2);
    expect(evalExpr('x+3', env)).toBe(5);
  });
});
