
## Calculator

Toy React Calculator for experimenting with CI/CD, AI agents, etc.

### Themes

The application supports multiple visual themes. Use the theme switcher at the
top right of the app to try them. Available themes are:

- **Default** – basic styling provided by `globals.css`.
- **Classic** – retro calculator colors.
- **Typewriter** – round keys with typewriter vibes.
- **Metal** – shiny metallic gradients.
- **Neon** – a fun, animated palette of bright neon colors.

### Modes

Use the mode toggle at the top right to switch between **classic** and **algebraic** modes. Algebraic mode shows extra parentheses buttons and lets you type expressions like `1-(2×3)` directly in the display. Press `=` to evaluate the typed expression; any parse errors will be shown in the display.

Algebraic mode now also supports single-letter variables. Assign values with `x=2` and reference them in later expressions like `x×3`. Assigned variables are listed below the display.

### Symbolic engine

The groundwork for symbolic calculations has begun. `src/lib/symbolic/parser.ts`
parses expressions containing `+`, `-`, `×` and `÷` (including decimal numbers)
into a small AST using a lightweight parser-combinator library. This custom
grammar will make it easy to add variables and other features in the future.
`src/lib/symbolic/evaluate.ts` walks that AST to compute a numeric result.
Invalid input now raises a `ParseError` that reports the index and expected token,
making issues easier to diagnose.

