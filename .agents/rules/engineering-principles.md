# Engineering Principles

This document outlines the engineering principles that guide development of the VAIT Homepage project, building upon the established architecture and technology stack.

## Core Principles

### User Experience First
- **Performance matters**: Every component should render efficiently and contribute to fast page loads
- **Accessibility is mandatory**: Build with WCAG guidelines in mind from the start
- **Mobile-first design**: Ensure responsive behavior across all device sizes
- **Progressive enhancement**: Core functionality should work without JavaScript when possible

### Type Safety and Reliability
- **No runtime surprises**: Use TypeScript to catch errors at compile time
- **Validate all inputs**: Use Zod schemas for API responses and user input
- **Handle errors gracefully**: Implement proper error boundaries and fallback states
- **Test critical paths**: Ensure user workflows are thoroughly tested

### Maintainability and Scalability
- **Code should be self-documenting**: Use clear naming and structure
- **Prefer composition over inheritance**: Build reusable components through composition
- **Separate concerns**: Keep business logic, presentation, and data fetching separate
- **Plan for growth**: Design systems that can evolve with requirements

## React 19 Principles

### Component Architecture
```tsx
// ✅ Good: Functional components with proper typing
type NavigationProps = {
  items: NavigationItem[];
  currentPath?: string;
  onNavigate?: (path: string) => void;
};

export const Navigation = ({ items, currentPath, onNavigate }: NavigationProps) => {
  return (
    <nav>
      {items.map(item => (
        <NavigationItem
          key={item.path}
          item={item}
          isActive={currentPath === item.path}
          onClick={() => onNavigate?.(item.path)}
        />
      ))}
    </nav>
  );
};
```

### Hook Patterns
```tsx
// ✅ Good: Custom hooks with proper typing and error handling
type UseApiResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useApi = <T>(url: string): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
```

### State Management Principles
- **Local state first**: Use useState for component-specific state
- **URL state for navigation**: Use TanStack Router for route state
- **Custom hooks for shared logic**: Extract reusable stateful logic
- **Avoid global state**: Only use context when truly necessary

## Performance Principles

### Rendering Optimisation
```typescript
// ✅ Good: Memoized component with proper dependencies
export const ProductList = React.memo<ProductListProps>(({ products, onAddToCart }) => {
  const memoizedProducts = useMemo(() => {
    return products.map(product => ({
      ...product,
      formattedPrice: new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD'
      }).format(product.price)
    }));
  }, [products]);

  const handleAddToCart = useCallback((productId: string) => {
    onAddToCart(productId);
  }, [onAddToCart]);

  return (
    <div>
      {memoizedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
});
```

### Bundle Optimisation
- **Code splitting**: Use dynamic imports for large components
- **Tree shaking**: Ensure imports are specific and unused code is eliminated
- **Asset optimisation**: Compress images and optimise fonts
- **Lazy loading**: Implement intersection observer for below-fold content

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: Optimise hero images and critical content
- **FID (First Input Delay)**: Minimize JavaScript execution time
- **CLS (Cumulative Layout Shift)**: Specify dimensions for media and avoid layout changes

## Security Principles

### Frontend Security
```typescript
// ✅ Good: Input validation and sanitization
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validated = contactSchema.parse(formData);
      // Process validated data
      submitContactForm(validated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.error('Validation failed:', error.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields with controlled inputs */}
    </form>
  );
};
```

### Content Security Policy
- **Inline scripts**: Avoid inline JavaScript, use event handlers
- **External resources**: Use trusted domains for external content
- **Data attributes**: Use data-* attributes for component configuration
- **XSS prevention**: Sanitize user-generated content before rendering

### API Security
- **HTTPS only**: All API calls must use HTTPS
- **CORS configuration**: Configure proper cross-origin policies
- **Rate limiting**: Implement client-side rate limiting for API calls
- **Error handling**: Don't expose sensitive information in error messages

## Accessibility Principles

### Semantic HTML
```typescript
// ✅ Good: Semantic and accessible component structure
export const Hero = () => {
  return (
    <main>
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading">Welcome to VAIT</h1>
        <p>Connecting Vietnamese and Australian IT communities</p>

        <nav aria-label="Main navigation">
          <a href="/about" className="button">Learn More</a>
          <a href="/community" className="button primary">Join Community</a>
        </nav>
      </section>
    </main>
  );
};
```

### Keyboard Navigation
- **Tab order**: Ensure logical tab navigation through interactive elements
- **Focus management**: Provide clear focus indicators and manage focus appropriately
- **Keyboard shortcuts**: Implement keyboard alternatives to mouse interactions
- **Skip links**: Add skip navigation links for screen reader users

### Screen Reader Support
- **ARIA labels**: Use appropriate ARIA attributes for custom components
- **Alt text**: Provide descriptive alt text for meaningful images
- **Live regions**: Use aria-live for dynamic content updates
- **Heading structure**: Maintain proper heading hierarchy (h1, h2, h3, etc.)

## Testing Principles

### Component Testing
```typescript
// ✅ Good: User-focused component testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ContactForm } from './contact-form';

describe('ContactForm', () => {
  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();

    render(<ContactForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'Test message');

    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      });
    });
  });
});
```

### Integration Testing
- **User workflows**: Test complete user journeys through the application
- **API integration**: Mock API responses for consistent testing
- **Error scenarios**: Test error states and recovery mechanisms
- **Performance testing**: Use React Testing Library's performance utilities

### Test Coverage
- **Critical paths**: Ensure 100% coverage for user-facing functionality
- **Error handling**: Test all error conditions and fallback states
- **Edge cases**: Test boundary conditions and unusual inputs
- **Accessibility**: Test with screen readers and keyboard navigation

## Code Quality Principles

### SOLID Principles in React
```typescript
// ✅ Good: Single Responsibility Principle
type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick
}: ButtonProps) => {
  const baseClasses = 'font-medium rounded-md transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### DRY (Don't Repeat Yourself)
- **Component composition**: Build complex UIs from simple, reusable components
- **Custom hooks**: Extract shared logic into reusable hooks
- **Utility functions**: Create pure functions for common operations
- **Configuration**: Use objects and constants for configuration data

### Clean Code
- **Descriptive naming**: Use names that clearly express intent
- **Small functions**: Keep functions focused and under 20 lines when possible
- **Consistent style**: Follow established patterns and formatting rules
- **Comments**: Only add comments for complex business logic, not obvious code

## Infrastructure Principles

### AWS Architecture
- **Infrastructure as Code**: Use AWS CDK for all infrastructure definitions
- **Least privilege**: Grant minimum necessary permissions to all resources
- **Cost optimisation**: Use appropriate AWS services and sizing
- **Monitoring**: Implement proper logging and monitoring

### Deployment Principles
- **Automated deployments**: Use GitHub Actions for CI/CD
- **Blue-green deployments**: Minimize downtime during releases
- **Rollback capability**: Maintain ability to quickly rollback changes
- **Environment parity**: Keep staging and production environments consistent

### Data Management
- **Caching strategy**: Use appropriate caching layers for performance
- **CDN usage**: Leverage CloudFront for static asset delivery
- **Backup procedures**: Implement regular backup and recovery processes
- **Data privacy**: Comply with relevant data protection regulations

## Cross References

- **Architecture Overview**: See `docs/architecture.md` for technology stack details
- **Code Style**: See `code-style.md` for implementation patterns
- **Testing Strategy**: See `docs/testing.md` for testing philosophy and tools
- **Development Workflow**: See `docs/development.md` for team processes

## Decision Framework

When making technical decisions, consider:

1. **User Impact**: How does this affect the end user experience?
2. **Maintainability**: Will this be easy to understand and modify later?
3. **Performance**: What are the performance implications?
4. **Security**: Does this introduce any security risks?
5. **Scalability**: Can this solution grow with our needs?
6. **Consistency**: Does this align with our existing patterns and principles?

Always document the reasoning behind significant technical decisions, especially when they deviate from established patterns.
