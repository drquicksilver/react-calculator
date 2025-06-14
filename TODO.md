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

1. **Expression input and evaluation**
   - Add an `ExpressionInput` component above the keypad for typing expressions.
   - Include unit tests verifying that typed expressions like `2*(3+4)` evaluate correctly.
2. **Simplification routines** (`simplify.ts`)
   - Implement combining like terms and constant folding.
   - Add a `Simplify` button that shows the simplified form of the current expression.
3. **Quadratic tools**
   - Implement factoring of quadratic polynomials in `factor.ts`.
   - Add a routine for completing the square.
   - Surface these features through `Factor` and `Complete Square` buttons.
4. **General factoring**
   - Extend `factor.ts` with routines for higher-order polynomials.
   - Provide user feedback when a polynomial cannot be factored over the rationals.
5. **Equation solving** (`solve.ts`)
   - Handle linear and quadratic equations.
   - Provide a `Solve` button that outputs real solutions.
6. **Enhanced display**
   - Switch algebraic mode to a three-line layout showing the input, the latest transformation, and the result.
7. **History and step-by-step view**
   - Record each transformation so users can review how a result was derived.
   - Allow toggling a full log beneath the calculator.

Each stage introduces new functionality visible to the user while keeping the implementation modular. Begin by adding the new expression input to enable typed calculations, then gradually build out the symbolic engine modules.

## Possible future TODOs

- Graphing expressions on a simple Cartesian plane.
- Support for complex numbers.
- Export steps and results as LaTeX.
- Improve mobile usability with a dedicated numeric keypad.

## Recently completed work

- Added algebraic/classic mode toggle with parentheses keys
- Implemented custom arithmetic parser with unit tests
- Added numeric evaluation of the AST with unit tests
- Hooked parser and numeric evaluator into algebraic mode; '=' now evaluates typed expressions and displays parse errors
- Added single-letter variables with assignments and variable display
