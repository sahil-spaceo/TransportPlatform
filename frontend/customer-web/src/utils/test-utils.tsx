import React, { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { customerTheme } from '@/styles/theme'

// Mock AuthProvider
const MockAuthProvider = ({ children, initialState }: any) => {
  return children
}


interface AllTheProvidersProps {
  children: ReactNode
  initialAuthState?: {
    user?: any
    isAuthenticated?: boolean
  }
}

const AllTheProviders = ({ children, initialAuthState }: AllTheProvidersProps) => {
  return (
    <ThemeProvider theme={customerTheme}>
      <MockAuthProvider initialState={initialAuthState}>
        {children}
      </MockAuthProvider>
    </ThemeProvider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialAuthState?: {
    user?: any
    isAuthenticated?: boolean
  }
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => {
  const { initialAuthState, ...renderOptions } = options || {}
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders initialAuthState={initialAuthState}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  })
}

// Mock user data for testing
export const mockUsers = {
  basic: {
    id: '1',
    email: 'basic@test.com',
    firstName: 'Basic',
    lastName: 'User',
    subscriptionTier: 'basic' as const,
    phone: '+1234567890',
    preferences: {
      notifications: true,
      language: 'en',
      currency: 'USD',
    },
    createdAt: '2024-01-01T00:00:00Z',
  },
  silver: {
    id: '2',
    email: 'silver@test.com',
    firstName: 'Silver',
    lastName: 'User',
    subscriptionTier: 'silver' as const,
    phone: '+1234567891',
    preferences: {
      notifications: true,
      language: 'en',
      currency: 'USD',
    },
    createdAt: '2024-01-01T00:00:00Z',
  },
  gold: {
    id: '3',
    email: 'gold@test.com',
    firstName: 'Gold',
    lastName: 'User',
    subscriptionTier: 'gold' as const,
    phone: '+1234567892',
    preferences: {
      notifications: true,
      language: 'en',
      currency: 'USD',
    },
    createdAt: '2024-01-01T00:00:00Z',
  },
}

// Test helpers
export const createMockAuthState = (user?: any, isAuthenticated = true) => ({
  user,
  isAuthenticated,
  isLoading: false,
  error: null,
})

export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0))

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
export { customerTheme as theme }