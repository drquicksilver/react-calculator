# Instructions for Agents

- Consult `TODO.md` in the repository root to understand the current roadmap and pending tasks.
- When a task in `TODO.md` is finished, move it to the **Recently completed work** section of that file to keep the list up to date.
- Keep `README.md` updated with new features so users know how to use them.
- Always run `npm run lint`, `npm run typecheck`, and `npm test` before submitting a PR.
- Run `npm run lint --fix` to automatically format code before committing.
- New symbolic utilities should live under `src/lib/symbolic/`.
- Commit messages should use imperative mood (e.g. "Add parser tests").
- PR descriptions must summarise user-facing changes and include test results.
- Add unit tests for new functionality and update `TODO.md` and `README.md` when relevant.
- Ensure the calculator remains fully usable on touch devices without invoking the on-screen keyboard. Provide buttons for common variables like `x`.
