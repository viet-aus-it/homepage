# Code Style Guidelines

This document provides comprehensive code style guidelines for the VAIT Homepage project, building upon the existing Biome configuration and development conventions.

## Core Principles

- **Consistency over preference**: Follow established patterns even if you prefer alternatives
- **Readability first**: Code should be self-documenting where possible
- **Type safety**: Leverage TypeScript to catch errors at compile time
- **Performance awareness**: Write code that renders efficiently

## TypeScript Configuration

### Strict Mode Requirements
- No `any` types - use `unknown` if type is unclear
- Prefer `interface` for object shapes, `type` for unions or computed types
- Enable all strict type checking options
- Use proper return type annotations for public APIs

### Type Definitions
```typescript
// ✅ Good: Interface for object shapes
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// ✅ Good: Type for unions or computed types
type Theme = 'light' | 'dark';
type ButtonVariant = 'primary' | 'secondary' | 'outline';

// ❌ Bad: Using 'any'
const fetchData = (url: any): any => { /* ... */ }

// ✅ Good: Using unknown with proper type guards
const fetchData = async (url: string): Promise<unknown> => {
  const response = await fetch(url);
  return response.json();
};
```

## React Component Patterns

### Component Structure
```typescript
// ✅ Good: Functional component with proper typing
type HeroProps = {
  title: string;
  subtitle?: string;
  onAction?: () => void;
};

export const Hero = ({ title, subtitle, onAction }: HeroProps) => {
  return (
    <section>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {onAction && <button onClick={onAction}>Get Started</button>}
    </section>
  );
};
```

### Custom Hooks
```typescript
// ✅ Good: Custom hook with proper typing and 'use' prefix
type UseApiResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useApi = <T>(url: string): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hook implementation...

  return { data, loading, error };
};
```

## Import Organization

### Import Order
1. React and related libraries
2. Third-party libraries (alphabetical)
3. Internal utilities (`@/lib/*`)
4. Components (`@/components/*`)
5. Type imports

```typescript
// ✅ Good: Properly organized imports
import { useState, useEffect } from 'react';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

import type { UserProfile } from '@/types/user';
```

### Path Aliases
- Use `@/` alias for all src imports
- Prefer absolute imports over relative imports
- Follow established patterns in the codebase

## Naming Conventions

### Components
- **PascalCase** for component names
- Descriptive names that indicate purpose
- Prefix with appropriate category if needed

```typescript
// ✅ Good: Clear, descriptive component names
export const NavigationBar = () => { /* ... */ };
export const HeroSection = () => { /* ... */ };
export const JoinCommunityButton = () => { /* ... */ };

// ❌ Bad: Unclear or abbreviated names
export const Nav = () => { /* ... */ };
export const Hero = () => { /* ... */ };
export const Btn = () => { /* ... */ };
```

### Functions and Variables
- **camelCase** for functions and variables
- Descriptive names that indicate purpose
- Use verbs for functions, nouns for variables

```typescript
// ✅ Good: Clear naming
const fetchUserData = async (userId: string) => { /* ... */ };
const isLoading = false;
const navigationItems = ['home', 'about', 'contact'];

// ❌ Bad: Unclear naming
const getData = async (id: string) => { /* ... */ };
const loading = false;
const items = ['home', 'about', 'contact'];
```

### Constants
- **UPPER_SNAKE_CASE** for constants
- Group related constants in objects

```typescript
// ✅ Good: Clear constant naming
const API_ENDPOINTS = {
  USER_PROFILE: '/api/user/profile',
  COMMUNITY_EVENTS: '/api/community/events',
} as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_TIMEOUT = 30000; // 30 seconds
```

### Private Members
- Prefix private class members with `_`
- Use private fields where appropriate

```typescript
// ✅ Good: Private member naming
class ApiService {
  private _baseUrl: string;
  private _cache: Map<string, unknown>;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._cache = new Map();
  }

  private _validateRequest = (request: unknown): boolean => {
    // Validation logic...
    return true;
  };
}
```

## File Organization

### Component Structure
```
src/components/ui/button/
├── index.ts          # Export barrel
├── button.tsx        # Component implementation
└── button.test.tsx   # Component tests
```

### Page Structure
```
src/pages/index-page/
├── index.tsx         # Page component
├── index.test.tsx    # Page tests
└── [styles].css      # Page-specific styles (if needed)
```

## Error Handling

### React Error Boundaries
```typescript
// ✅ Good: Proper error boundary implementation
export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### Service Error Handling
```typescript
// ✅ Good: Result pattern for error handling
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

const fetchUserProfile = async (id: string): Promise<Result<UserProfile>> => {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};
```

## Performance Considerations

### React Optimisation
- Use `React.memo` for pure components
- Implement proper dependency arrays in hooks
- Avoid unnecessary re-renders

```typescript
// ✅ Good: Optimised component
export const ExpensiveComponent = React.memo<Props>(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveTransform(item));
  }, [data]);

  const handleClick = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
});
```

### Bundle Optimisation
- Use dynamic imports for code splitting
- Optimise imports to reduce bundle size
- Lazy load components where appropriate

```typescript
// ✅ Good: Code splitting with dynamic imports
const AdminPanel = lazy(() => import('@/components/admin-panel'));

export const App = () => {
  const isAdmin = useAdminAuth();

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isAdmin && (
          <Route path="/admin" element={
            <Suspense fallback={<Loading />}>
              <AdminPanel />
            </Suspense>
          } />
        )}
      </Routes>
    </div>
  );
};
```

## Cross References

- **Development Workflow**: See `docs/development.md#conventions`
- **Testing Patterns**: See `docs/testing.md`
- **Architecture Overview**: See `docs/architecture.md`
- **Current Commands**: See `AGENTS.md` for essential commands

## Tool Configuration

This project uses **Biome** for consistent formatting and linting:
- **Indentation**: 2 spaces
- **Line width**: 160 characters
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Trailing commas**: Multi-line only

Run `pnpm run lint:fix` to automatically apply formatting rules.
