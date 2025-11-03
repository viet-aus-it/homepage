# Agent Guidelines for VAIT Homepage

## Commands
- **Dev server:** `pnpm run dev`
- **Build:** `pnpm run build`
- **Lint:** `pnpm run lint` (check) or `pnpm run lint:fix` (auto-fix)
- **Typecheck:** `pnpm run typecheck`
- **Tests:** `pnpm run test` (watch mode) or `pnpm run test:run` (single run)
- **Single test file:** `pnpm run test src/path/to/file.test.tsx`
- **Always run `pnpm run lint:fix && pnpm run typecheck` before completing tasks**

## Code Style
- **Formatter:** Biome (indentWidth: 2, lineWidth: 160, single quotes, semicolons, trailing commas)
- **TypeScript:** Strict mode, no `any`, prefer `interface` for object shapes, use `unknown` if type is unclear
- **Imports:** Use `@/` alias for src imports (e.g., `import { cn } from '@/lib/utils'`), organize imports automatically via Biome
- **Naming:** PascalCase for components, camelCase for functions/hooks (prefix hooks with `use`), UPPER_SNAKE_CASE for constants, prefix private members with `_`
- **Components:** Use React 19 patterns, functional components with TypeScript types, destructure props, use `type` for component props
- **Error handling:** Use error boundaries in React, prefer Result/Either patterns in services
- **Testing:** Vitest + Testing Library, place `.test.tsx` files alongside components, use `describe`, `it`, `expect` from vitest
- **No comments unless explicitly requested**
