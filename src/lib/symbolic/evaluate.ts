import { Expression } from './parser';

export function evaluate(
  expr: Expression,
  env: Record<string, number> = {}
): number {
  switch (expr.type) {
    case 'number':
      return expr.value;
    case 'binary': {
      const left = evaluate(expr.left, env);
      const right = evaluate(expr.right, env);
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
          throw new Error('Unknown operator');
      }
    }
    case 'variable': {
      if (expr.name in env) return env[expr.name];
      throw new Error(`Undefined variable ${expr.name}`);
    }
    case 'assignment': {
      const val = evaluate(expr.value, env);
      env[expr.name] = val;
      return val;
    }
    default:
      const _exhaustive: never = expr;
      return _exhaustive;
  }
}
