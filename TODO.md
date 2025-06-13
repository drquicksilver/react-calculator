# TODO: Symbolic Calculator Roadmap

This project currently implements a simple four-function calculator. The goal is to evolve it into a symbolic calculator capable of simplifying expressions and solving equations.

## Proposed Structure

```
src/
  lib/
    symbolic/
      parser.ts        # convert strings to an abstract syntax tree (AST)
      evaluate.ts      # numeric evaluation of an AST
      simplify.ts      # algebraic simplifications
      factor.ts        # factoring routines
      solve.ts         # equation solving
  app/
    components/
      ModeToggle.tsx      # switch between classic and algebraic modes
      ExpressionInput.tsx # new component for typed expressions
```

Keeping the symbolic logic in `src/lib/symbolic` keeps the React UI focused only on display and input handling.

## Step-by-step Path

2. **Add `ExpressionInput` component**
   - Text field above the keypad for typing complete expressions.
   - When `=` or `Enter` is pressed in algebraic mode, evaluate the expression.
   - User-visible change: typed expressions like `2*(3+4)` are handled.
4. **Numeric evaluation using the AST** (`evaluate.ts`)
   - Replace the string-based calculation with evaluation of the AST.
   - User-visible change: expression input is interpreted with operator precedence.
5. **Variable support**
   - Extend the parser to recognise single-letter variables.
   - Allow assignments like `x=2` and use stored values in later expressions.
   - Provide a simple display of defined variables.
6. **Simplification routines** (`simplify.ts`)
   - Implement combining like terms and constant folding.
   - Add a `Simplify` button that shows the simplified form of the current expression.
7. **Factoring** (`factor.ts`)
   - Start with factoring quadratics into linear factors when possible.
   - Add a `Factor` button so users can factor polynomials entered in the input.
8. **Equation solving** (`solve.ts`)
   - Handle linear and quadratic equations.
   - Provide a `Solve` button that outputs real solutions.
9. **History and step-by-step view**
   - Record each transformation step so users can see how the result was derived.
   - Display this history beneath the calculator.

Each stage introduces new functionality visible to the user while keeping the implementation modular. Begin by adding the new expression input to enable typed calculations, then gradually build out the symbolic engine modules.

## Recently completed work

- Added algebraic/classic mode toggle with parentheses keys
- Implemented custom arithmetic parser with unit tests
