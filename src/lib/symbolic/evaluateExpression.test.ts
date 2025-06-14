import { describe, it, expect } from 'vitest';
import { evaluateExpression } from './evaluateExpression';

describe('evaluateExpression', () => {
  it('evaluates expressions with precedence and parentheses', () => {
    expect(evaluateExpression('2×(3+4)')).toBe(14);
  });

  it('throws on invalid input', () => {
    expect(() => evaluateExpression('1++2')).toThrow();
  });
});
