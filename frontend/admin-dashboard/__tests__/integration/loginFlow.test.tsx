import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import LoginPage from '@/app/login/page'
import { AuthProvider } from '@/modules/authentication/context/AuthContext'
import { adminTheme } from '@/styles/theme'

// Mock the auth service
jest.mock('@/modules/authentication/services/authService', () => ({
  authService: {
    login: jest.fn(),
    verifyToken: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
  },
}))

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={adminTheme}>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
)

describe('Login Flow Integration', () => {
  const mockAuthService = require('@/modules/authentication/services/authService').authService
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    mockPush.mockClear()
    
    // Mock verifyToken to return no user initially
    mockAuthService.verifyToken.mockResolvedValue({
      user: null,
      permissions: [],
    })
  })

  it('should complete full login flow successfully', async () => {
    // Mock successful login
    mockAuthService.login.mockResolvedValue({
      user: {
        id: '1',
        email: 'admin@flexflow.com',
        firstName: 'Admin',
        lastName: 'User',
        role: {
          id: '1',
          name: 'super_admin',
          description: 'Super Administrator',
          level: 1,
          permissions: ['*'],
        },
        permissions: [{
          id: '1',
          resource: '*',
          actions: ['*'],
          scope: 'global',
        }],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
      permissions: [{
        id: '1',
        resource: '*',
        actions: ['*'],
        scope: 'global',
      }],
    })

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    // Verify login page elements are present
    expect(screen.getByText('FlexFlow')).toBeInTheDocument()
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByText('Demo Credentials')).toBeInTheDocument()

    // Fill in the login form
    const emailInput = screen.getByPlaceholderText('admin@flexflow.com')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'admin@flexflow.com')
    await user.type(passwordInput, 'admin123')
    await user.click(submitButton)

    // Verify login was called with correct credentials
    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'admin@flexflow.com',
      password: 'admin123',
      rememberMe: false,
    })

    // Verify tokens are stored
    await waitFor(() => {
      expect(localStorage.getItem('adminAccessToken')).toBe('mock-access-token')
      expect(localStorage.getItem('adminRefreshToken')).toBe('mock-refresh-token')
    })

    // Verify redirect to dashboard
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('should handle login failure gracefully', async () => {
    // Mock login failure
    mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'))

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    // Fill in incorrect credentials
    const emailInput = screen.getByPlaceholderText('admin@flexflow.com')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'wrong@email.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitButton)

    // Verify error message is shown
    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
    })

    // Verify no redirect occurred
    expect(mockPush).not.toHaveBeenCalled()

    // Verify no tokens were stored
    expect(localStorage.getItem('adminAccessToken')).toBeNull()
    expect(localStorage.getItem('adminRefreshToken')).toBeNull()
  })

  it('should redirect already authenticated users away from login page', async () => {
    // Mock already authenticated user
    mockAuthService.verifyToken.mockResolvedValue({
      user: {
        id: '1',
        email: 'admin@flexflow.com',
        firstName: 'Admin',
        lastName: 'User',
        role: {
          id: '1',
          name: 'super_admin',
          description: 'Super Administrator',
          level: 1,
          permissions: ['*'],
        },
        permissions: [{
          id: '1',
          resource: '*',
          actions: ['*'],
          scope: 'global',
        }],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      permissions: [{
        id: '1',
        resource: '*',
        actions: ['*'],
        scope: 'global',
      }],
    })

    // Set existing token
    localStorage.setItem('adminAccessToken', 'existing-token')

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    // Should redirect to dashboard automatically
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('should handle token verification on page load', async () => {
    // Set existing token
    localStorage.setItem('adminAccessToken', 'existing-token')

    // Mock successful token verification
    mockAuthService.verifyToken.mockResolvedValue({
      user: {
        id: '1',
        email: 'admin@flexflow.com',
        firstName: 'Admin',
        lastName: 'User',
        role: {
          id: '1',
          name: 'super_admin',
          description: 'Super Administrator',
          level: 1,
          permissions: ['*'],
        },
        permissions: [{
          id: '1',
          resource: '*',
          actions: ['*'],
          scope: 'global',
        }],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      permissions: [{
        id: '1',
        resource: '*',
        actions: ['*'],
        scope: 'global',
      }],
    })

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    // Verify token verification was called
    expect(mockAuthService.verifyToken).toHaveBeenCalledWith('existing-token')

    // Should redirect to dashboard
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('should clear invalid tokens and stay on login page', async () => {
    // Set invalid token
    localStorage.setItem('adminAccessToken', 'invalid-token')
    localStorage.setItem('adminRefreshToken', 'invalid-refresh-token')

    // Mock token verification failure
    mockAuthService.verifyToken.mockRejectedValue(new Error('Invalid token'))

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>
    )

    // Verify token verification was attempted
    expect(mockAuthService.verifyToken).toHaveBeenCalledWith('invalid-token')

    // Should clear invalid tokens
    await waitFor(() => {
      expect(localStorage.getItem('adminAccessToken')).toBeNull()
      expect(localStorage.getItem('adminRefreshToken')).toBeNull()
    })

    // Should not redirect
    expect(mockPush).not.toHaveBeenCalled()

    // Login form should still be visible
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
  })
})