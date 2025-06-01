# Development Guide

This guide helps new developers get started with the VAIT Homepage project. For more details, see the referenced docs or ask in the team chat.

---

## 1. Setup

- **Requirements:**
  - Node.js 22+
  - pnpm 10+
- **Install dependencies:**
  ```sh
  pnpm install
  ```
- **Configure your editor:**
  - Use a TypeScript-aware editor for best experience. (e.g. [VSCode](https://code.visualstudio.com), [Zed](https://zed.dev/))
  - Enable format-on-save and install the Biome extension if available.

---

## 2. Workflow

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
  - Husky runs checks before pushes. If you have issues, run `pnpm run githooks:init`.

---

## 3. Conventions

- **TypeScript:**
  - Strict mode is enforced. Avoid `any`; use `unknown` if needed.
  - Prefer `interface` for object shapes.
- **Components:**
  - Use PascalCase for components, camelCase for hooks (start with `use`).
  - Keep components focused and composable.
- **Private members:**
  - Prefix with `_` (e.g., `_myVar`).
- **Constants:**
  - Use `UPPER_SNAKE_CASE` for module-level constants.
- **Imports:**
  - Maintain consistent import ordering.
- **Commits:**
  - Use clear, atomic commit messages. Explain the "why".

---

## 4. Tips

- **Testing:**
  - Use Vitest and Testing Library for unit/component tests.
  - Place tests alongside the code or in a `__tests__` folder.
- **Error handling:**
  - Use error boundaries in React.
  - Prefer Result/Either patterns in services.
- **Performance:**
  - Use lazy loading and React.memo where appropriate.
- **Accessibility:**
  - Use semantic HTML and test with screen readers if possible.

---

For more, see:
- [docs/architecture.md](docs/architecture.md) – Project structure & design
- [docs/contributing.md](docs/contributing.md) – Contribution guidelines
- [docs/testing.md](docs/testing.md) – Testing strategy
- [infra/README.md](../infra/README.md) – Infrastructure setup
