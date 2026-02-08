# Agent Guidelines for VAIT Homepage

## Quick Reference

### Essential Commands
- **Dev server:** `pnpm run dev`
- **Build:** `pnpm run build`
- **Lint:** `pnpm run lint` (check) or `pnpm run lint:fix` (auto-fix)
- **Typecheck:** `pnpm run typecheck`
- **Tests:** `pnpm run test` (watch mode) or `pnpm run test:run` (single run)
- **Single test file:** `pnpm run test src/path/to/file.test.tsx`
- **Always run `pnpm run lint:fix && pnpm run typecheck` before completing tasks**

### Core Code Style
- **Formatter:** Biome (indentWidth: 2, lineWidth: 160, single quotes, semicolons, trailing commas)
- **TypeScript:** Strict mode, no `any`, prefer `interface` for object shapes, use `unknown` if type is unclear
- **Imports:** Use `@/` alias for src imports (e.g., `import { cn } from '@/lib/utils'`), organize imports automatically via Biome
- **Naming:** PascalCase for components, camelCase for functions/hooks (prefix hooks with `use`), UPPER_SNAKE_CASE for constants, prefix private members with `_`
- **Components:** Use React 19 patterns, functional components with TypeScript types, destructure props, use `type` for component props
- **Error handling:** Use error boundaries in React, prefer Result/Either patterns in services
- **Testing:** Vitest + Testing Library, place `.test.tsx` files alongside components, use `describe`, `it`, `expect` from vitest
- **No comments unless explicitly requested**

## Comprehensive Agent Documentation

For detailed guidelines and patterns, see the `.agents/` folder structure:

### 📋 Rules and Guidelines
- **[code-style.md](.agents/rules/code-style.md)** - Comprehensive TypeScript and React patterns
- **[commands.md](.agents/rules/commands.md)** - Complete command reference and workflows
- **[communication.md](.agents/rules/communication.md)** - Agent communication standards and patterns
- **[engineering-principles.md](.agents/rules/engineering-principles.md)** - Frontend architecture and design principles
- **[patterns.md](.agents/rules/patterns.md)** - React, testing, and development patterns
- **[special-considerations.md](.agents/rules/special-considerations.md)** - Browser compatibility, SEO, and deployment considerations

### 🔗 Cross References
- **Project Documentation:** See `docs/` folder for development, architecture, testing, and contributing guides
- **Technology Stack:** React 19 + Vite + TypeScript + TanStack Router + React Query + Zod + Biome + Vitest
- **Infrastructure:** AWS CDK + S3 + CloudFront deployment

### 🎯 Agent Workflow
1. **Before starting:** Run `pnpm run lint:fix && pnpm run typecheck`
2. **During development:** Use `pnpm run dev` and `pnpm run test` (watch mode)
3. **Before committing:** Ensure all tests pass and build succeeds
4. **Reference documentation:** Use `.agents/rules/` for detailed patterns and `docs/` for project context

This structure provides both quick reference (above) and comprehensive guidelines (in `.agents/` folder) for effective AI agent development on the VAIT Homepage project.
