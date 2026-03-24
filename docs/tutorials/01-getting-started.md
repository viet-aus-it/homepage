# Getting Started

This tutorial walks you through setting up the VAIT Homepage project for the first time.

## Prerequisites

- [Node.js](https://nodejs.org/) 22+
- [pnpm](https://pnpm.io/) 10+

## Install Dependencies

```sh
pnpm install
```

## Configure Your Editor

Use a [TypeScript](https://www.typescriptlang.org/)-aware editor for the best experience:

- [VSCode](https://code.visualstudio.com/) — install the [Biome](https://biomejs.dev/) extension and enable format-on-save
- [Zed](https://zed.dev/) — install the Biome extension and enable format-on-save

## Start the Development Server

```sh
pnpm run dev
```

This starts [Vite](https://vite.dev/) with hot module replacement. Open the URL shown in the terminal to see the site.

## Run the Tests

```sh
pnpm run test
```

## Verify Linting

```sh
pnpm run lint
```

If there are issues, auto-fix them with:

```sh
pnpm run lint:fix
```

## Initialise Git Hooks

[Husky](https://typicode.github.io/husky/) runs checks before pushes. If hooks are not working, run:

```sh
pnpm run githooks:init
```

---

You're ready to develop. See the [Development](../how-to/01-development.md) guide for day-to-day workflows and conventions.
