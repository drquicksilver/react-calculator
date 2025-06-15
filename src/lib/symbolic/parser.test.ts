import { describe, it, expect } from 'vitest';
import { parse, Expression, ParseError } from './parser';

function number(value: number): Expression {
  return { type: 'number', value };
}

function binary(op: '+' | '-' | '×' | '÷', left: Expression, right: Expression): Expression {
  return { type: 'binary', operator: op, left, right };
}

function variable(name: string): Expression {
  return { type: 'variable', name };
}

function assignment(name: string, value: Expression): Expression {
  return { type: 'assignment', name, value };
}

describe('parse', () => {
  it('parses simple addition', () => {
    expect(parse('1+2')).toEqual(binary('+', number(1), number(2)));
  });

  it('respects operator precedence', () => {
    // 2 + 3 × 4 -> 2 + (3 × 4)
    expect(parse('2+3×4')).toEqual(
      binary('+', number(2), binary('×', number(3), number(4)))
    );
  });

  it('handles parentheses', () => {
    // (2 + 3) × 4
    expect(parse('(2+3)×4')).toEqual(
      binary('×', binary('+', number(2), number(3)), number(4))
    );
  });

  it('parses decimal numbers', () => {
    expect(parse('1.5+2.25')).toEqual(binary('+', number(1.5), number(2.25)));
  });

  it('parses variable references', () => {
    expect(parse('x')).toEqual(variable('x'));
  });

  it('parses assignments', () => {
    expect(parse('x=2')).toEqual(assignment('x', number(2)));
  });

  it('parses long addition chain', () => {
    expect(parse('1+2+3+4+5')).toEqual(
      binary(
        '+',
        binary(
          '+',
          binary('+', binary('+', number(1), number(2)), number(3)),
          number(4)
        ),
        number(5)
      )
    );
  });

  it('parses mixed long expression', () => {
    // 1 + (2 × 3) - (4 ÷ 5) + 6
    const mult = binary('×', number(2), number(3));
    const div = binary('÷', number(4), number(5));
    expect(parse('1+2×3-4÷5+6')).toEqual(
      binary('+', binary('-', binary('+', number(1), mult), div), number(6))
    );
  });

  describe('errors', () => {
    it('fails on unexpected operator', () => {
      expect(() => parse('1++2')).toThrowError(new ParseError(1, 'end of input'));
    });

    it('fails on unclosed parenthesis', () => {
      expect(() => parse('(1+2')).toThrowError(new ParseError(4, ')'));
    });

    it('fails on trailing characters', () => {
      expect(() => parse('1+2a')).toThrowError(new ParseError(3, 'end of input'));
    });

    it('fails on empty input', () => {
      expect(() => parse('')).toThrowError(new ParseError(0, '('));
    });
  });
});
