import { Expression } from './parser';

export function evaluate(expr: Expression): number {
  switch (expr.type) {
    case 'number':
      return expr.value;
    case 'binary': {
      const left = evaluate(expr.left);
      const right = evaluate(expr.right);
      switch (expr.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '×':
          return left * right;
        case '÷':
          return left / right;
        default:
          throw new Error(`Unknown operator ${(expr as any).operator}`);
      }
    }
    default:
      const _exhaustive: never = expr;
      return _exhaustive;
  }
}
