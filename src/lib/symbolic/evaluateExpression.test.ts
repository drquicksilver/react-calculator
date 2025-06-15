import { describe, it, expect } from 'vitest';
import { evaluateExpression } from './evaluateExpression';

describe('evaluateExpression', () => {
  it('evaluates expressions with precedence and parentheses', () => {
    expect(evaluateExpression('2×(3+4)')).toBe(14);
  });

  it('throws on invalid input', () => {
    expect(() => evaluateExpression('1++2')).toThrow();
  });

  it('supports assignments', () => {
    const env: Record<string, number> = {};
    expect(evaluateExpression('x=5', env)).toBe(5);
    expect(env.x).toBe(5);
    expect(evaluateExpression('x×2', env)).toBe(10);
  });
});
