// Jest setup file for FlexFlow Marketing Website tests

import '@testing-library/jest-dom';
import 'jest-styled-components';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
      isLocaleDomain: false,
      isReady: true,
      defaultLocale: 'en',
      domainLocales: [],
      isPreview: false,
    };
  },
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock Next.js Image component
jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock Next.js font components
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: '--font-inter',
    style: { fontFamily: 'Inter' },
  }),
  Poppins: () => ({
    variable: '--font-poppins',
    style: { fontFamily: 'Poppins' },
  }),
  Space_Grotesk: () => ({
    variable: '--font-space-grotesk',
    style: { fontFamily: 'Space Grotesk' },
  }),
  JetBrains_Mono: () => ({
    variable: '--font-jetbrains-mono',
    style: { fontFamily: 'JetBrains Mono' },
  }),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
  },
  AnimatePresence: ({ children }) => children,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
  useInView: () => [jest.fn(), true],
  useScroll: () => ({
    scrollY: { get: () => 0 },
    scrollYProgress: { get: () => 0 },
  }),
  useTransform: () => ({ get: () => 0 }),
}));

// Mock styled-components theme
const mockTheme = {
  colors: {
    solid: {
      brand: {
        primary: '#8b9bef',
        secondary: '#73c1ff',
        accent: '#6df099',
      },
      neutral: {
        50: '#fafbfc',
        100: '#f7f8fa',
        500: '#8b95a1',
        900: '#1a202c',
      },
    },
    text: {
      primary: '#1a202c',
      secondary: '#697384',
      tertiary: '#b8c1cc',
      inverse: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#fafbfc',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #8b9bef 0%, #9d7ec4 25%, #f5a6fd 50%, #ffe8ff 100%)',
    },
  },
  typography: {
    fontFamily: {
      primary: 'Inter, sans-serif',
      display: 'Space Grotesk, sans-serif',
    },
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
  },
  borderRadius: {
    lg: '0.5rem',
    xl: '0.75rem',
  },
  shadows: {
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  animations: {
    duration: {
      normal: '300ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  },
};

// Mock styled-components ThemeProvider
jest.mock('styled-components', () => {
  const originalModule = jest.requireActual('styled-components');
  
  // Create mock styled functions for all HTML elements
  const createStyledMock = (tag) => {
    const StyledComponent = jest.fn().mockImplementation(({ children, ...props }) => {
      const mockReact = require('react');
      return mockReact.createElement(tag, props, children);
    });
    StyledComponent.attrs = (attrs) => StyledComponent;
    return (strings, ...values) => StyledComponent;
  };

  const styled = new Proxy({}, {
    get: (target, prop) => {
      if (prop === 'default' || prop === '__esModule') {
        return target[prop];
      }
      return createStyledMock(prop);
    }
  });

  // Add common HTML elements
  ['div', 'span', 'button', 'a', 'section', 'header', 'nav', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'li', 'img', 'input', 'form', 'label', 'footer', 'aside', 'main', 'article', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'td', 'th'].forEach(tag => {
    styled[tag] = createStyledMock(tag);
  });

  return {
    ...originalModule,
    default: styled,
    ThemeProvider: ({ children }) => children,
    useTheme: () => mockTheme,
  };
});

// Mock next-seo
jest.mock('next-seo', () => ({
  NextSeo: () => null,
  DefaultSeo: () => null,
}));

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});

window.IntersectionObserver = mockIntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock performance API
global.performance.mark = jest.fn();
global.performance.measure = jest.fn();
global.performance.getEntriesByType = jest.fn().mockReturnValue([]);
global.performance.getEntriesByName = jest.fn().mockReturnValue([]);

// Mock console to reduce noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});