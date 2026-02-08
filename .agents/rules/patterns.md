# Development Patterns

This document provides comprehensive development patterns for the VAIT Homepage project, expanding upon existing testing documentation and establishing React/TypeScript best practices.

## React Component Patterns

### Component Composition
```typescript
// ✅ Good: Component composition over inheritance
type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outlined';
};

export const Card = ({ children, className, variant = 'default' }: CardProps) => {
  return (
    <div className={cn(
      'rounded-lg p-6',
      variant === 'default' && 'bg-white shadow-md',
      variant === 'outlined' && 'border border-gray-200',
      className
    )}>
      {children}
    </div>
  );
};

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
};

export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
};

// Usage: Compose cards with flexible structure
<Card>
  <CardHeader>
    <h2>Community Events</h2>
  </CardHeader>
  <Card>
    <p>Join our upcoming events...</p>
  </Card>
</Card>
```

### Compound Components
```typescript
// ✅ Good: Compound component pattern for complex UI
type TabsContextValue = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

type TabsProps = {
  children: ReactNode;
  defaultTab: string;
  className?: string;
};

export const Tabs = ({ children, defaultTab, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

type TabListProps = {
  children: ReactNode;
  className?: string;
};

export const TabList = ({ children, className }: TabListProps) => {
  return (
    <div role="tablist" className={cn('flex space-x-4', className)}>
      {children}
    </div>
  );
};

type TabProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export const Tab = ({ id, children, className }: TabProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      className={cn(
        'px-4 py-2 font-medium transition-colors',
        isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900',
        className
      )}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};
```

### Render Props Pattern
```typescript
// ✅ Good: Render props for flexible component behavior
type DataFetcherProps<T> = {
  url: string;
  children: (data: { loading: boolean; data: T | null; error: string | null }) => ReactNode;
};

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [state, setState] = useState({
    loading: true,
    data: null as T | null,
    error: null as string | null
  });

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setState({ loading: false, data, error: null }))
      .catch(error => setState({ loading: false, data: null, error: error.message }));
  }, [url]);

  return <>{children(state)}</>;
}

// Usage:
<DataFetcher<UserProfile> url="/api/user/profile">
  {({ loading, data, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (data) return <div>Welcome, {data.name}</div>;
    return null;
  }}
</DataFetcher>
```

## Custom Hook Patterns

### Data Fetching Hooks
```typescript
// ✅ Good: Reusable data fetching hook with proper state management
type UseApiOptions<T> = {
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export function useApi<T>(
  url: string,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { enabled = true, onSuccess, onError } = options;

  useEffect(() => {
    if (!enabled) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
        onSuccess?.(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, enabled, onSuccess, onError]);

  return { data, loading, error };
}

// Usage:
const { data: userProfile, loading, error } = useApi(`/api/users/${userId}`, {
  onSuccess: (data) => console.log('User profile loaded:', data),
  onError: (error) => console.error('Failed to fetch user profile:', error)
});
```

### Local Storage Hooks
```typescript
// ✅ Good: Type-safe local storage hook
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

// Usage:
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
```



## TanStack Router Patterns

### Route Configuration
```typescript
// ✅ Good: Type-safe route configuration
import { createFileRoute } from '@tanstack/react-router';

type UserProfileSearchParams = {
  tab?: string;
  edit?: boolean;
};

export const Route = createFileRoute('/users/$userId')({
  component: UserProfilePage,
  loader: ({ params }) => fetchUserProfile(params.userId),
  validateSearch: (search: Record<string, unknown>): UserProfileSearchParams => ({
    tab: search.tab as string || 'overview',
    edit: search.edit === 'true'
  })
});

function UserProfilePage() {
  const { userId } = Route.useParams();
  const { tab, edit } = Route.useSearch();
  const userProfile = Route.useLoaderData();

  return (
    <div>
      <h1>User Profile: {userProfile.name}</h1>
      <UserProfileTabs activeTab={tab} />
      {edit && <UserProfileEditForm user={userProfile} />}
    </div>
  );
}
```

### Navigation Patterns
```typescript
// ✅ Good: Type-safe navigation with parameters
import { useNavigate } from '@tanstack/react-router';

export const UserCard = ({ user }: { user: UserProfile }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate({
      to: '/users/$userId',
      params: { userId: user.id },
      search: { tab: 'overview' }
    });
  };

  const handleEditProfile = () => {
    navigate({
      to: '/users/$userId',
      params: { userId: user.id },
      search: { tab: 'edit', edit: true }
    });
  };

  return (
    <Card>
      <h3>{user.name}</h3>
      <button onClick={handleViewProfile}>View Profile</button>
      <button onClick={handleEditProfile}>Edit Profile</button>
    </Card>
  );
};
```

## Testing Patterns

### Component Testing with Testing Library
```typescript
// ✅ Good: User-focused component testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { UserProfile } from './user-profile';

describe('UserProfile', () => {
  it('should display user information when loaded', async () => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    
    render(<UserProfile userId="1" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('should handle user interactions correctly', async () => {
    const user = userEvent.setup();
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
    
    render(<UserProfile userId="1" />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /view details/i }));
    
    expect(screen.getByText('User Details')).toBeInTheDocument();
  });
});
```

### Mock Service Worker (MSW) Patterns
```typescript
// ✅ Good: API mocking with MSW
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    return res(
      ctx.json({
        id: userId,
        name: 'Test User',
        email: 'test@example.com'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserProfile with mocked API', () => {
  it('should handle API errors gracefully', async () => {
    server.use(
      rest.get('/api/users/:userId', (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ error: 'Internal server error' })
        );
      })
    );

    render(<UserProfile userId="1" />);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load user/i)).toBeInTheDocument();
    });
  });
});
```

### Integration Testing Patterns
```typescript
// ✅ Good: Integration testing for user workflows
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from '@tanstack/react-router';
import { App } from '../app';

describe('Navigation Flow', () => {
  it('should navigate through pages correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Step 1: Verify home page
    expect(screen.getByText('Welcome to VAIT')).toBeInTheDocument();
    
    // Step 2: Navigate to about page
    await userEvent.click(screen.getByRole('link', { name: /about/i }));
    
    // Step 3: Verify about page content
    await waitFor(() => {
      expect(screen.getByText(/about vait/i)).toBeInTheDocument();
    });
    
    // Step 4: Verify navigation structure
    expect(screen.getByRole('link', { name: /events/i })).toBeInTheDocument();
  });
});
```

## State Management Patterns

### Local State Patterns
```typescript
// ✅ Good: Component state with proper typing
export function useNavigationState() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const navigateToSection = useCallback((section: string) => {
    setActiveSection(section);
    closeMenu();
  }, [closeMenu]);

  return {
    isMenuOpen,
    activeSection,
    toggleMenu,
    closeMenu,
    navigateToSection
  };
}
```

### Context Patterns
```typescript
// ✅ Good: Context for theme management
type ThemeContextValue = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

## Performance Patterns

### Code Splitting Patterns
```typescript
// ✅ Good: Route-based code splitting
import { lazy } from 'react';

const AdminPanel = lazy(() => import('@/components/admin-panel'));
const UserProfile = lazy(() => import('@/components/user-profile'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={
        <Suspense fallback={<div>Loading profile...</div>}>
          <UserProfile />
        </Suspense>
      } />
      <Route path="/admin" element={
        <Suspense fallback={<div>Loading admin panel...</div>}>
          <AdminPanel />
        </Suspense>
      } />
    </Routes>
  );
};
```

### Memoization Patterns
```typescript
// ✅ Good: Strategic memoization for performance
export const ExpensiveComponent = React.memo<Props>(({ data, onAction }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => expensiveTransform(item));
  }, [data]);

  // Memoize event handlers
  const handleAction = useCallback((id: string) => {
    onAction(id);
  }, [onAction]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} item={item} onAction={handleAction} />
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data.length === nextProps.data.length &&
         prevProps.data.every((item, index) => item.id === nextProps.data[index]?.id);
});
```

## Cross References

- **Testing Documentation**: See `docs/testing.md` for testing philosophy and setup
- **Code Style**: See `code-style.md` for implementation standards
- **Engineering Principles**: See `engineering-principles.md` for architectural guidance
- **Commands**: See `commands.md` for development workflow commands

## Anti-Patterns to Avoid

### React Anti-Patterns
```typescript
// ❌ Bad: Using index as key
{items.map((item, index) => (
  <Item key={index} item={item} />
))}

// ✅ Good: Using stable, unique keys
{items.map(item => (
  <Item key={item.id} item={item} />
))}

// ❌ Bad: Mutating state directly
const [items, setItems] = useState([]);
const addItem = (newItem) => {
  items.push(newItem); // Mutation!
  setItems(items);
};

// ✅ Good: Immutable updates
const [items, setItems] = useState([]);
const addItem = (newItem) => {
  setItems(prev => [...prev, newItem]);
};
```

### Performance Anti-Patterns
```typescript
// ❌ Bad: Creating functions in render
const BadComponent = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <button key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
};

// ✅ Good: Using useCallback or moving functions outside
const GoodComponent = ({ items }) => {
  const handleClick = useCallback((id: string) => {
    // Handle click
  }, []);

  return (
    <div>
      {items.map(item => (
        <Item key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
};
```

These patterns provide a solid foundation for building maintainable, performant, and user-friendly React applications in the VAIT Homepage project.