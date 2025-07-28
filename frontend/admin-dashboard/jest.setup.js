import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    hostname: 'localhost',
    href: 'http://localhost:3001',
    origin: 'http://localhost:3001',
    pathname: '/',
    search: '',
    hash: '',
  },
  writable: true,
})

// Mock styled-components
jest.mock('styled-components', () => {
  const React = require('react');
  
  // Create a mock styled component function
  const createStyledComponent = (Tag) => {
    const StyledComponent = React.forwardRef((props, ref) => {
      // Handle transient props (prefixed with $)
      const cleanProps = Object.keys(props || {}).reduce((acc, key) => {
        if (!key.startsWith('$')) {
          acc[key] = props[key];
        }
        return acc;
      }, {});
      
      return React.createElement(Tag, {
        ...cleanProps,
        ref,
        'data-testid': props?.['data-testid'] || `styled-${Tag}`
      });
    });
    
    // Add withConfig method to handle styled-components API
    StyledComponent.withConfig = () => StyledComponent;
    
    return StyledComponent;
  };

  // Mock styled function that returns a component factory
  const styled = (Component) => (strings, ...values) => createStyledComponent(typeof Component === 'string' ? Component : 'div');

  // Add common HTML elements as properties that can be used as template literals
  const elements = ['div', 'span', 'button', 'input', 'form', 'header', 'nav', 'section', 'article', 'aside', 'footer', 'main', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'img', 'label'];
  elements.forEach(element => {
    const styledElement = (strings, ...values) => createStyledComponent(element);
    styledElement.withConfig = () => styledElement;
    styled[element] = styledElement;
  });

  return {
    __esModule: true,
    default: styled,
    ThemeProvider: ({ children, theme }) => React.createElement('div', { 'data-theme-provider': true }, children),
    createGlobalStyle: () => () => null,
    useTheme: () => ({
      colors: {
        text: { primary: '#000', secondary: '#666' },
        background: { default: '#fff', paper: '#f5f5f5' },
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
      spacing: (factor = 1) => `${8 * factor}px`,
      breakpoints: {
        up: (key) => `@media (min-width: 600px)`,
        down: (key) => `@media (max-width: 599px)`,
      },
      shadows: ['none', '0px 1px 3px rgba(0,0,0,0.12)'],
      zIndex: {
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
        banner: 1200,
      },
    }),
  };
})