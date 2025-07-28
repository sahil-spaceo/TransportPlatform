import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '@/modules/authentication/context/AuthContext'

// Mock the auth service
jest.mock('@/modules/authentication/services/authService', () => ({
  authService: {
    verifyToken: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
  },
}))

// Test component to use the auth hook
const TestComponent = () => {
  const { state, login, logout } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{state.isLoading ? 'loading' : 'not-loading'}</div>
      <div data-testid="authenticated">{state.isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <div data-testid="user">{state.user?.email || 'no-user'}</div>
      <button onClick={() => login({ email: 'test@test.com', password: 'test', rememberMe: false })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  const mockAuthService = require('@/modules/authentication/services/authService').authService

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it('should initialize with loading state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('loading')
    expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated')
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
  })

  it('should handle successful token verification on initialization', async () => {
    localStorage.setItem('adminAccessToken', 'mock-token')
    
    mockAuthService.verifyToken.mockResolvedValue({
      user: {
        id: '1',
        email: 'admin@flexflow.com',
        firstName: 'Admin',
        lastName: 'User',
        role: { name: 'admin' },
        permissions: [],
      },
      permissions: [],
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('not-loading')
    })

    expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated')
    expect(screen.getByTestId('user')).toHaveTextContent('admin@flexflow.com')
  })

  it('should handle failed token verification on initialization', async () => {
    localStorage.setItem('adminAccessToken', 'invalid-token')
    
    mockAuthService.verifyToken.mockRejectedValue(new Error('Invalid token'))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('not-loading')
    })

    expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated')
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
    
    // Should clear invalid tokens
    expect(localStorage.getItem('adminAccessToken')).toBeNull()
  })

  it('should handle successful login', async () => {
    mockAuthService.login.mockResolvedValue({
      user: {
        id: '1',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: { name: 'user' },
        permissions: [],
      },
      accessToken: 'new-token',
      refreshToken: 'new-refresh-token',
      permissions: [],
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('not-loading')
    })

    const loginButton = screen.getByText('Login')
    
    await act(async () => {
      loginButton.click()
    })

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('test@test.com')
    expect(localStorage.getItem('adminAccessToken')).toBe('new-token')
    expect(localStorage.getItem('adminRefreshToken')).toBe('new-refresh-token')
  })

  it('should handle logout', async () => {
    // Start with authenticated state
    localStorage.setItem('adminAccessToken', 'mock-token')
    mockAuthService.verifyToken.mockResolvedValue({
      user: {
        id: '1',
        email: 'admin@flexflow.com',
        firstName: 'Admin',
        lastName: 'User',
        role: { name: 'admin' },
        permissions: [],
      },
      permissions: [],
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('authenticated')
    })

    const logoutButton = screen.getByText('Logout')
    
    await act(async () => {
      logoutButton.click()
    })

    expect(screen.getByTestId('authenticated')).toHaveTextContent('not-authenticated')
    expect(screen.getByTestId('user')).toHaveTextContent('no-user')
    expect(localStorage.getItem('adminAccessToken')).toBeNull()
    expect(localStorage.getItem('adminRefreshToken')).toBeNull()
  })
})