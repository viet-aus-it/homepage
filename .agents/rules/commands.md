# Commands Reference

This document provides comprehensive command guidelines for the VAIT Homepage project, expanding upon the essential commands in AGENTS.md with agent-specific workflows and patterns.

## Core Development Commands

### Development Server
```bash
# Start local development server
pnpm run dev

# The dev server starts on http://localhost:5173 by default
# Includes hot module replacement (HMR) for fast development
# Supports Vite's dev-time optimisations
```

### Build Commands
```bash
# Build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Build outputs to dist/ directory
# Optimised for AWS S3/CloudFront deployment
```

### Testing Commands
```bash
# Run tests in watch mode (default)
pnpm run test

# Run tests once
pnpm run test:run

# Run tests with coverage
pnpm run test:CI

# Run specific test file
pnpm run test src/components/ui/button.test.tsx

# Preview test coverage report
pnpm run test:preview
```

### Code Quality Commands
```bash
# Check code formatting and linting
pnpm run lint

# Auto-fix formatting and linting issues
pnpm run lint:fix

# Unsafe auto-fix (may break code)
pnpm run lint:fix:unsafe

# Run CI checks (Biome)
pnpm run ci
```

### Type Checking
```bash
# Run TypeScript compiler checks
pnpm run typecheck

# Always run before commits to ensure type safety
```

## Agent-Specific Workflows

### Before Making Changes
```bash
# 1. Ensure clean working directory
git status

# 2. Pull latest changes
git pull origin main

# 3. Install dependencies (if needed)
pnpm install

# 4. Run initial checks
pnpm run lint:fix && pnpm run typecheck
```

### During Development
```bash
# 1. Start dev server
pnpm run dev

# 2. In another terminal, run tests in watch mode
pnpm run test

# 3. Make changes incrementally
# 4. Run lint and typecheck frequently
pnpm run lint:fix && pnpm run typecheck
```

### Before Committing
```bash
# 1. Stage your changes
git add .

# 2. Run full test suite
pnpm run test:run

# 3. Run lint and typecheck
pnpm run lint:fix && pnpm run typecheck

# 4. Build to ensure production compatibility
pnpm run build

# 5. Commit (pre-commit hooks will run additional checks)
git commit -m "feat: add new feature"
```

## TanStack Router Commands

### Route Tree Generation
```bash
# Generate route tree (automatically runs on file changes)
pnpm run router:gen

# Manual route tree generation
npx tsr generate

# Validate route configuration
npx tsr validate
```

### Route Development
```bash
# Create new route file
# Routes are auto-discovered from src/routes/ directory
# File structure defines route hierarchy

# Example route structure:
# src/routes/
# ├── __root.tsx           # Root layout
# ├── index.tsx           # Home page (/)
# ├── about.tsx           # About page (/about)
# └── community/
#     ├── index.tsx       # Community index (/community)
#     └── events.tsx      # Community events (/community/events)
```

## Infrastructure Commands

### AWS CDK Commands
```bash
# Navigate to infrastructure directory
cd infra/

# Install CDK dependencies
pnpm install

# Synthesize CloudFormation template
pnpm run cdk synth

# Deploy infrastructure
pnpm run cdk deploy

# Destroy infrastructure (use with caution)
pnpm run cdk destroy

# List all stacks
pnpm run cdk list
```

### Local Infrastructure Development
```bash
# Start local development environment
# Uses Vite's built-in dev server
# No local infrastructure setup required

# For API mocking, use MSW (Mock Service Worker)
pnpm run msw:init  # (run once during setup)
```

## Git Workflow Commands

### Branch Management
```bash
# Create new feature branch
git checkout -b feature/new-component

# Switch to existing branch
git checkout main

# Delete local branch
git branch -d feature/new-component

# Push new branch to remote
git push -u origin feature/new-component
```

### Commit Patterns
```bash
# Feature commits
git commit -m "feat: add user authentication component"

# Bug fixes
git commit -m "fix: resolve navigation menu overflow issue"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: optimise image loading performance"

# Breaking changes
git commit -m "feat!: update component prop interface"
```

## Performance Commands

### Bundle Analysis
```bash
# Analyze bundle size (add to package.json if needed)
pnpm add --save-dev rollup-plugin-visualizer
pnpm run build -- --analyze

# Check bundle size impact
# Use Vite's built-in bundle analyzer
# Look for large dependencies and optimisation opportunities
```

### Performance Testing
```bash
# Run Lighthouse CI (if configured)
pnpm run lighthouse

# Check Core Web Vitals
# Use browser dev tools Lighthouse panel
# Focus on: LCP, FID, CLS metrics
```

## Debugging Commands

### Development Debugging
```bash
# Start dev server with debug flags
pnpm run dev --debug

# Enable source maps in production build
pnpm run build -- --sourcemap

# Run tests with debugging
pnpm run test -- --no-coverage --reporter=verbose
```

### Error Investigation
```bash
# Check TypeScript compilation details
pnpm run typecheck -- --noEmit --pretty

# Run Biome with verbose output
pnpm run lint -- --verbose

# Check Vite build details
pnpm run build -- --mode development
```

## Maintenance Commands

### Dependency Management
```bash
# Check for outdated dependencies
pnpm outdated

# Update dependencies
pnpm update

# Add new dependency
pnpm add package-name

# Add dev dependency
pnpm add --save-dev package-name

# Remove dependency
pnpm remove package-name
```

### Cleanup Commands
```bash
# Clean build artifacts
rm -rf dist/

# Clean node modules (if needed)
rm -rf node_modules/ pnpm-lock.yaml
pnpm install

# Clean test coverage
rm -rf coverage/

# Clean cache directories
pnpm store prune
```

## Environment Commands

### Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Validate environment variables
# Check for required variables in src/lib/env.ts
```

### Production Deployment
```bash
# Build for production
pnpm run build

# Test production build locally
pnpm run preview

# Deploy to AWS (via CDK)
cd infra/ && pnpm run cdk deploy
```

## Cross References

- **Development Workflow**: See `docs/development.md#workflow`
- **Testing Strategy**: See `docs/testing.md#running-tests`
- **Infrastructure**: See `infra/README.md` for AWS CDK commands
- **Code Style**: See `code-style.md` for formatting and linting patterns

## Command Aliases (Optional)

Add these to your shell profile for convenience:
```bash
# ~/.bashrc or ~/.zshrc
alias vdev='pnpm run dev'
alias vbuild='pnpm run build'
alias vtest='pnpm run test'
alias vlint='pnpm run lint:fix'
alias vtype='pnpm run typecheck'
alias vcheck='pnpm run lint:fix && pnpm run typecheck'
```

## Agent Command Patterns

When working as an AI agent, follow these patterns:

1. **Always run checks before committing**: `pnpm run lint:fix && pnpm run typecheck`
2. **Test frequently**: Run `pnpm run test` in watch mode during development
3. **Build before PR**: Ensure `pnpm run build` succeeds
4. **Use descriptive commit messages**: Follow conventional commit format
5. **Keep changes atomic**: One logical change per commit
6. **Reference documentation**: Use cross-references to maintain consistency
