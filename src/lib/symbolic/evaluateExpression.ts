import { parse } from './parser';
import { evaluate } from './evaluate';

export function evaluateExpression(input: string): number {
  const ast = parse(input);
  return evaluate(ast);
}
