# Development

Day-to-day development workflows, conventions, and tips for the VAIT Homepage.

## Workflow

- **Start local dev server:**
  ```sh
  pnpm run dev
  ```
- **Run tests:**
  ```sh
  pnpm run test
  ```
- **Lint and format:**
  ```sh
  pnpm run lint      # Check for issues
  pnpm run lint:fix  # Auto-fix lint/format issues
  ```
- **Build for production:**
  ```sh
  pnpm run build
  ```
- **Git hooks:**
  [Husky](https://typicode.github.io/husky/) runs checks before pushes. If you have issues, run `pnpm run githooks:init`.

## Conventions

- **[TypeScript](https://www.typescriptlang.org/):**
  Strict mode is enforced. Avoid `any`; use `unknown` if needed. Prefer `interface` for object shapes.
- **Components:**
  Use PascalCase for components, camelCase for hooks (prefix with `use`). Keep components focused and composable.
- **Private members:**
  Prefix with `_` (e.g., `_myVar`).
- **Constants:**
  Use `UPPER_SNAKE_CASE` for module-level constants.
- **Imports:**
  Maintain consistent import ordering.
- **Commits:**
  Use clear, atomic commit messages following [Conventional Commits](https://www.conventionalcommits.org/). Explain the "why".

## Tips

- **Testing:**
  Use [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) for unit/component tests. Place tests alongside the code or in a `__tests__` folder.
- **Error handling:**
  Use error boundaries in [React](https://react.dev/). Prefer Result/Either patterns in services.
- **Performance:**
  Use lazy loading and `React.memo` where appropriate.
- **Accessibility:**
  Use semantic HTML and test with screen readers if possible. Aim for [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) AA compliance.

---

See also:
- [Getting Started](../tutorials/01-getting-started.md) — First-time setup
- [Contributing](./02-contributing.md) — How to propose changes
- [Project Reference](../reference/01-project-reference.md) — Commands and tech stack
