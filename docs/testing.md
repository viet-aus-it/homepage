# Testing Guide

This guide covers the basics of testing in the VAIT Homepage project.

---

## Tools Used
- **Vitest** for unit and component tests
- **Testing Library** for React component testing
- **jsdom** for DOM environment

## Running Tests
- Run all tests:
  ```sh
  pnpm run test
  ```
- Watch mode:
  ```sh
  pnpm run test:watch
  ```
- Coverage:
  ```sh
  pnpm run test:CI
  ```

## Philosophy
- Write small, focused tests for business logic and UI components
- Prefer testing user behaviour over implementation details
- Place tests alongside code or in `__tests__` folders

---

For more, see:
- [Development Guide](./development.md)
- [Architecture Overview](./architecture.md)
