export type ParseResult<T> =
  | { ok: true; value: T; index: number }
  | { ok: false; expected: string; index: number };

export class Parser<T> {
  constructor(private readonly fn: (input: string, index: number) => ParseResult<T>) {}

  run(input: string, index = 0): ParseResult<T> {
    return this.fn(input, index);
  }

  map<U>(f: (v: T) => U): Parser<U> {
    return new Parser((input, index) => {
      const res = this.fn(input, index);
      return res.ok ? { ok: true, value: f(res.value), index: res.index } : res;
    });
  }

  chain<U>(f: (v: T) => Parser<U>): Parser<U> {
    return new Parser((input, index) => {
      const res = this.fn(input, index);
      return res.ok ? f(res.value).run(input, res.index) : res;
    });
  }

  then<U>(next: Parser<U>): Parser<U> {
    return this.chain(() => next);
  }

  or(other: Parser<T>): Parser<T> {
    return new Parser((input, index) => {
      const res = this.fn(input, index);
      return res.ok ? res : other.run(input, index);
    });
  }
}

export function str(s: string): Parser<string> {
  return new Parser((input, index) =>
    input.startsWith(s, index)
      ? { ok: true, value: s, index: index + s.length }
      : { ok: false, expected: s, index }
  );
}

export function regex(r: RegExp): Parser<string> {
  const anchored = new RegExp('^' + r.source);
  return new Parser((input, index) => {
    const match = anchored.exec(input.slice(index));
    return match
      ? { ok: true, value: match[0], index: index + match[0].length }
      : { ok: false, expected: r.source, index };
  });
}

export function seq<A, B>(a: Parser<A>, b: Parser<B>): Parser<[A, B]>;
export function seq<A, B, C>(a: Parser<A>, b: Parser<B>, c: Parser<C>): Parser<[A, B, C]>;
export function seq(...parsers: Parser<unknown>[]): Parser<unknown[]> {
  return new Parser((input, index) => {
    const values: unknown[] = [];
    let i = index;
    for (const p of parsers) {
      const res = p.run(input, i);
      if (!res.ok) return res;
      values.push(res.value);
      i = res.index;
    }
    return { ok: true, value: values, index: i };
  });
}

export function many<T>(p: Parser<T>): Parser<T[]> {
  return new Parser((input, index) => {
    const values: T[] = [];
    let i = index;
    while (true) {
      const res = p.run(input, i);
      if (!res.ok) break;
      values.push(res.value);
      i = res.index;
    }
    return { ok: true, value: values, index: i };
  });
}

export function lazy<T>(thunk: () => Parser<T>): Parser<T> {
  return new Parser((input, index) => thunk().run(input, index));
}

export const whitespace = regex(/[\s]*/);

export function token<T>(p: Parser<T>): Parser<T> {
  return seq(whitespace, p, whitespace).map(([, v]) => v);
}
