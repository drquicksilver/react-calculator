import { Parser, regex, seq, str, token, lazy, many } from './parserlib';

/**
 * Error thrown when parsing fails.
 */
export class ParseError extends SyntaxError {
  constructor(public index: number, public expected: string) {
    super(`Expected ${expected} at index ${index}`);
  }
}

/**
 * AST node for a numeric literal.
 */
export interface NumberLiteral {
  type: 'number';
  value: number;
}

/**
 * AST node for a binary expression.
 */
export interface BinaryExpression {
  type: 'binary';
  operator: '+' | '-' | '×' | '÷';
  left: Expression;
  right: Expression;
}

export type Expression = NumberLiteral | BinaryExpression;

// Basic tokens
const numberTok = token(regex(/\d+(?:\.\d+)?/)).map<NumberLiteral>(v => ({
  type: 'number',
  value: Number(v),
}));
const plus = token(str('+'));
const minus = token(str('-'));
const times = token(str('×'));
const divide = token(str('÷'));
const lparen = token(str('('));
const rparen = token(str(')'));

// Forward declarations for recursive grammar
const ExpressionP: Parser<Expression> = lazy(() => Sum);

// factor: number | '(' Expression ')'
const Factor: Parser<Expression> = numberTok
  .map(expr => expr as Expression)
  .or(seq(lparen, ExpressionP, rparen).map(([, expr]) => expr));

// term: Factor ( (× | ÷) Factor )*
const Term: Parser<Expression> = seq(Factor, many(seq(times.or(divide), Factor)))
  .map(([first, rest]) => {
    return rest.reduce<Expression>((left, [op, right]) => ({
      type: 'binary',
      operator: op as '×' | '÷',
      left,
      right,
    }), first);
  });

// sum: Term ( (+ | -) Term )*
const Sum: Parser<Expression> = seq(Term, many(seq(plus.or(minus), Term)))
  .map(([first, rest]) => {
    return rest.reduce<Expression>((left, [op, right]) => ({
      type: 'binary',
      operator: op as '+' | '-',
      left,
      right,
    }), first);
  });

/**
 * Parse an arithmetic expression containing +, -, ×, ÷ and parentheses.
 */
export function parse(input: string): Expression {
  const result = ExpressionP.run(input);
  if (result.ok && result.index === input.length) {
    return result.value;
  }

  const index = result.index;
  const expected = result.ok ? 'end of input' : result.expected;
  throw new ParseError(index, expected);
}
