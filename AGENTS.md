# AGENTS

## Package Manager

Use `pnpm`. Do not use `npm`, `npx`, or `yarn`.

## TypeScript rules

- Never use `any`. Prefer `unknown` + type guards. Use `@ts-expect-error` if the type is actually correct but error due to dependency issue that you can't resolve.
- Derive types from sources (API responses, library types). Use Pick, Omit, Partial, Required.
- For complex objects, create explicit interfaces or use `typeof` to infer from constants.
- Always use `!= null` for null checks (covers both `null` and `undefined`). Never use `!== null`, `!== undefined`, or `typeof x !== 'undefined'`.
