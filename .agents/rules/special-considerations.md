# Special Considerations

This document outlines special considerations and constraints specific to the VAIT Homepage project, building upon the established architecture and technology stack.

## Browser Compatibility

### Target Browsers
- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive enhancement**: Core functionality should work in older browsers
- **Polyfill strategy**: Use Vite's @vitejs/plugin-legacy for legacy browser support

### Feature Detection
```typescript
// ✅ Good: Feature detection with fallbacks
export const useFeatureDetection = () => {
  const [features, setFeatures] = useState({
    intersectionObserver: false,
    webp: false,
    localStorage: false,
    geolocation: false
  });

  useEffect(() => {
    const detectFeatures = async () => {
      const intersectionObserver = 'IntersectionObserver' in window;
      const localStorage = typeof Storage !== 'undefined';
      const geolocation = 'geolocation' in navigator;
      
      // WebP detection
      const webp = await new Promise((resolve) => {
        const webp = new Image();
        webp.onload = () => resolve(true);
        webp.onerror = () => resolve(false);
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0i0oIABQAAKhEiAQEA';
      });

      setFeatures({
        intersectionObserver,
        webp,
        localStorage,
        geolocation
      });
    };

    detectFeatures();
  }, []);

  return features;
};
```

### CSS Feature Support
```typescript
// ✅ Good: CSS feature detection with Tailwind
export const HeroSection = () => {
  const { features } = useFeatureDetection();

  return (
    <section className={cn(
      'relative min-h-screen flex items-center justify-center',
      // Fallback for older browsers
      !features.intersectionObserver && 'bg-gray-100'
    )}>
      {/* Content with progressive enhancement */}
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Welcome to VAIT
        </h1>
        <p className="text-xl text-center mt-4">
          Connecting Vietnamese and Australian IT communities
        </p>
      </div>
    </section>
  );
};
```

## SEO and Accessibility

### SEO Considerations
```typescript
// ✅ Good: SEO-optimized component structure
export const EventPage = ({ event }: { event: Event }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.venue.name,
      address: event.venue.address
    },
    organizer: {
      '@type': 'Organization',
      name: 'VAIT',
      url: 'https://vait.org.au'
    }
  };

  return (
    <>
      <Helmet>
        <title>{event.title} - VAIT</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.imageUrl} />
        <meta property="og:url" content={`https://vait.org.au/events/${event.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <article>
        <header>
          <h1>{event.title}</h1>
          <time dateTime={event.startDate}>
            {new Date(event.startDate).toLocaleDateString('en-AU')}
          </time>
        </header>
        
        <section>
          <h2>About this event</h2>
          <p>{event.description}</p>
        </section>
        
        <section>
          <h2>Location</h2>
          <address>{event.venue.name}</address>
        </section>
      </article>
    </>
  );
};
```

### Accessibility Requirements
```typescript
// ✅ Good: Accessible navigation component
export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Focus management
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstFocusable = menuRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      firstFocusable?.focus();
    }
  }, [isMenuOpen]);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="font-bold text-xl">
            VAIT
          </a>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
          </button>
          
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-8">
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/events" className="hover:text-blue-600">Events</a></li>
            <li><a href="/community" className="hover:text-blue-600">Community</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
        
        {/* Mobile menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={cn(
            'md:hidden',
            isMenuOpen ? 'block' : 'hidden'
          )}
        >
          <ul className="py-2">
            <li><a href="/about" className="block px-3 py-2 hover:bg-gray-100">About</a></li>
            <li><a href="/events" className="block px-3 py-2 hover:bg-gray-100">Events</a></li>
            <li><a href="/community" className="block px-3 py-2 hover:bg-gray-100">Community</a></li>
            <li><a href="/contact" className="block px-3 py-2 hover:bg-gray-100">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
```

## Performance Budgets

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100 milliseconds
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8 seconds
- **TTI (Time to Interactive)**: < 3.8 seconds

### Bundle Size Constraints
```typescript
// ✅ Good: Bundle size monitoring
export const BundleSizeMonitor = () => {
  const [bundleInfo, setBundleInfo] = useState<{
    size: number;
    chunks: number;
    loadTime: number;
  } | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      // Monitor bundle size in development
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const navigationEntry = entries.find(
          (entry) => entry.entryType === 'navigation'
        ) as PerformanceNavigationTiming;

        if (navigationEntry) {
          setBundleInfo({
            size: navigationEntry.transferSize,
            chunks: performance.getEntriesByType('resource').length,
            loadTime: navigationEntry.loadEventEnd - navigationEntry.loadEventStart
          });
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
      return () => observer.disconnect();
    }
  }, []);

  if (!bundleInfo || !import.meta.env.DEV) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 p-2 text-xs">
      Bundle: {(bundleInfo.size / 1024).toFixed(1)}KB | 
      Chunks: {bundleInfo.chunks} | 
      Load: {bundleInfo.loadTime.toFixed(0)}ms
    </div>
  );
};
```

### Image Optimization
```typescript
// ✅ Good: Optimized image component
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Low-quality placeholder */}
      <img
        src={`${src}?w=20&h=20&blur=10&format=webp`}
        alt=""
        className={cn(
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden="true"
      />
      
      {/* Main image */}
      <img
        src={`${src}?w=${width}&h=${height}&format=webp&quality=80`}
        srcSet={`${src}?w=${width * 2}&h=${height * 2}&format=webp&quality=80 2x`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
      
      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image unavailable</span>
        </div>
      )}
    </div>
  );
};
```

## Mobile-First Responsive Design

### Breakpoint Strategy
```typescript
// ✅ Good: Responsive component with mobile-first approach
export const EventCard = ({ event }: { event: Event }) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="md:flex">
        {/* Image container */}
        <div className="md:w-1/3">
          <OptimizedImage
            src={event.imageUrl}
            alt={event.title}
            width={400}
            height={300}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        
        {/* Content container */}
        <div className="p-6 md:w-2/3">
          <header>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              {event.title}
            </h2>
            <time className="text-sm text-gray-600">
              {new Date(event.startDate).toLocaleDateString('en-AU', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </header>
          
          <p className="mt-4 text-gray-700 line-clamp-3">
            {event.description}
          </p>
          
          <footer className="mt-6">
            <a
              href={`/events/${event.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Learn More
            </a>
          </footer>
        </div>
      </div>
    </article>
  );
};
```

### Touch Interaction Patterns
```typescript
// ✅ Good: Touch-friendly component
export const TouchFriendlyCarousel = ({ items }: { items: CarouselItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item.content}
          </div>
        ))}
      </div>
      
      {/* Touch indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-colors',
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            )}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
```

## Deployment Considerations

### AWS S3/CloudFront Configuration
```typescript
// ✅ Good: Environment-aware configuration
export const config = {
  development: {
    apiUrl: 'http://localhost:3001/api',
    cdnUrl: 'http://localhost:5173',
    environment: 'development'
  },
  staging: {
    apiUrl: 'https://staging-api.vait.org.au/api',
    cdnUrl: 'https://staging.vait.org.au',
    environment: 'staging'
  },
  production: {
    apiUrl: 'https://api.vait.org.au/api',
    cdnUrl: 'https://vait.org.au',
    environment: 'production'
  }
} as const;

export const useConfig = () => {
  const environment = import.meta.env.MODE as keyof typeof config;
  return config[environment] || config.development;
};
```

### Cache Headers and CDN
```typescript
// ✅ Good: Cache-aware asset loading
export const useAssetCache = () => {
  const config = useConfig();
  
  const getAssetUrl = (path: string, version?: string) => {
    const baseUrl = config.cdnUrl;
    const versionedPath = version ? `${path}?v=${version}` : path;
    return `${baseUrl}${versionedPath}`;
  };

  const preloadCriticalAssets = () => {
    const criticalAssets = [
      '/fonts/inter-var.woff2',
      '/images/hero-bg.webp',
      '/css/critical.css'
    ];

    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = getAssetUrl(asset);
      link.as = asset.endsWith('.woff2') ? 'font' : 
                asset.endsWith('.css') ? 'style' : 'image';
      if (link.as === 'font') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  };

  return { getAssetUrl, preloadCriticalAssets };
};
```

### Error Monitoring and Analytics
```typescript
// ✅ Good: Error boundary with monitoring
export class MonitoredErrorBoundary extends Component<
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
    // Log to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Send to error tracking service (e.g., Sentry)
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack
          }
        }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened. 
              Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Security Considerations

### Content Security Policy (CSP)
```typescript
// ✅ Good: CSP-compliant component
export const SecureComponent = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (newContent: string) => {
    // Sanitize content before setting
    const sanitized = DOMPurify.sanitize(newContent, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
      ALLOWED_ATTR: []
    });
    setContent(sanitized);
  };

  return (
    <div>
      {/* Use dangerouslySetInnerHTML only with sanitized content */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      
      {/* Avoid inline styles and scripts */}
      <style>{/* CSS should be in separate files */}</style>
    </div>
  );
};
```

### API Security Patterns
```typescript
// ✅ Good: Secure API client
export const secureApiClient = {
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };

    // Add CSRF token if available
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      defaultHeaders['X-CSRF-Token'] = csrfToken;
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers
      },
      credentials: 'same-origin' // Include cookies for same-origin requests
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
};
```

## Cross References

- **Architecture**: See `docs/architecture.md` for technology stack details
- **Engineering Principles**: See `engineering-principles.md` for security and performance guidelines
- **Patterns**: See `patterns.md` for implementation patterns
- **Infrastructure**: See `infra/` directory for AWS deployment configurations

## Compliance and Legal

### Data Privacy
- **GDPR compliance**: Implement cookie consent and data handling policies
- **Australian Privacy Act**: Follow Australian data protection regulations
- **Data minimization**: Only collect necessary user information
- **Transparent policies**: Clearly communicate data usage to users

### Accessibility Compliance
- **WCAG 2.1 AA**: Target AA level compliance for all public-facing content
- **Screen reader support**: Test with popular screen readers
- **Keyboard navigation**: Ensure full keyboard accessibility
- **Color contrast**: Meet WCAG contrast ratio requirements

These special considerations ensure the VAIT Homepage project meets professional standards for performance, accessibility, security, and user experience across all platforms and devices.