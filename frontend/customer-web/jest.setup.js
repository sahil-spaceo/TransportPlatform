import '@testing-library/jest-dom'
import React from 'react'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock styled-components theme
const mockStyled = {
  div: () => () => 'div',
  h1: () => () => 'h1',
  h2: () => () => 'h2',
  h3: () => () => 'h3',
  p: () => () => 'p',
  span: () => () => 'span',
  button: () => () => 'button',
  input: () => () => 'input',
  form: () => () => 'form',
  section: () => () => 'section',
  header: () => () => 'header',
  nav: () => () => 'nav',
  a: () => () => 'a',
  withConfig: () => mockStyled,
}

// Add styled-components proxy for any element
const styledProxy = new Proxy(mockStyled, {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop]
    }
    // Return a function that returns a mock component
    return () => () => React.createElement(prop.toString(), null)
  },
})

styledProxy.withConfig = () => styledProxy

jest.mock('styled-components', () => {
  const actual = jest.requireActual('styled-components')
  return {
    __esModule: true,
    default: styledProxy,
    ...actual,
    ThemeProvider: ({ children }) => children,
    useTheme: () => ({
      colors: {
        primary: {
          main: '#ff6b6b',
          light: '#ffcccc',
          dark: '#cc5555',
          gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)',
        },
        subscription: {
          basic: {
            main: '#64b5f6',
            light: '#e3f2fd',
            gradient: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)',
          },
          silver: {
            main: '#9e9e9e',
            light: '#f5f5f5',
            gradient: 'linear-gradient(135deg, #c0c0c0 0%, #9e9e9e 100%)',
          },
          gold: {
            main: '#ffd54f',
            light: '#fff8e1',
            gradient: 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)',
          },
        },
        text: {
          primary: '#212121',
          secondary: '#616161',
        },
        neutral: {
          white: '#ffffff',
          100: '#f5f5f5',
          200: '#e0e0e0',
          300: '#bdbdbd',
        },
        functional: {
          success: {
            main: '#4caf50',
            light: '#e8f5e8',
            gradient: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
          },
          error: {
            main: '#f44336',
            light: '#ffebee',
          },
          warning: {
            main: '#ff9800',
            light: '#fff3e0',
          },
          info: {
            main: '#2196f3',
            light: '#e3f2fd',
          },
        },
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '3xl': '3rem',
      },
      typography: {
        fontFamily: {
          primary: 'Inter, sans-serif',
          display: 'Poppins, sans-serif',
        },
        fontSize: {
          caption: '0.75rem',
          bodySmall: '0.875rem',
          body: '1rem',
          bodyLarge: '1.125rem',
          h5: '1.25rem',
          h4: '1.5rem',
          h3: '1.875rem',
          h2: '2.25rem',
          h1: '3rem',
          display3: '2.5rem',
        },
        fontWeight: {
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          normal: 1.5,
          relaxed: 1.625,
        },
      },
      borderRadius: {
        small: '0.25rem',
        medium: '0.5rem',
        large: '0.75rem',
        xl: '1rem',
        pill: '9999px',
      },
      shadows: {
        light: '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      animations: {
        duration: {
          normal: '0.2s',
        },
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
      },
      zIndex: {
        sticky: 100,
        dropdown: 1000,
      },
    }),
  }
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock window.alert
global.alert = jest.fn()

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Suppress console warnings in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})