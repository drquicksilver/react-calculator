import { parse } from './parser';
import { evaluate } from './evaluate';

export function evaluateExpression(
  input: string,
  env: Record<string, number> = {}
): number {
  const ast = parse(input);
  return evaluate(ast, env);
}
