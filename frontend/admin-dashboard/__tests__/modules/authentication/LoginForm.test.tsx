import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import { LoginForm } from '@/modules/authentication/components/LoginForm'
import { AuthProvider } from '@/modules/authentication/context/AuthContext'
import { adminTheme } from '@/styles/theme'

// Mock the auth service
jest.mock('@/modules/authentication/services/authService', () => ({
  authService: {
    login: jest.fn(),
    verifyToken: jest.fn().mockResolvedValue({ user: null, permissions: [] }),
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

describe('LoginForm', () => {
  const mockAuthService = require('@/modules/authentication/services/authService').authService
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    mockPush.mockClear()
  })

  it('should render login form with all fields', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText(/forgot your password/i)).toBeInTheDocument()
  })

  it('should show validation errors for empty fields', async () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/password is required/i)).toBeInTheDocument()
    })
  })

  it('should show validation error for invalid email format', async () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email address/i)
    await user.type(emailInput, 'invalid-email')

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })

  it('should show validation error for short password', async () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    const passwordInput = screen.getByLabelText(/password/i)
    await user.type(passwordInput, '123')

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    })
  })

  it('should handle successful login', async () => {
    mockAuthService.login.mockResolvedValue({
      user: {
        id: '1',
        email: 'admin@flexflow.com',
        firstName: 'Admin',
        lastName: 'User',
        role: { name: 'admin' },
        permissions: [],
      },
      accessToken: 'token',
      refreshToken: 'refresh-token',
      permissions: [],
    })

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'admin@flexflow.com')
    await user.type(passwordInput, 'admin123')
    await user.click(submitButton)

    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'admin@flexflow.com',
      password: 'admin123',
      rememberMe: false,
    })
  })

  it('should handle login failure', async () => {
    mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'))

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'wrong@email.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it('should handle remember me checkbox', async () => {
    mockAuthService.login.mockResolvedValue({
      user: { id: '1', email: 'test@test.com' },
      accessToken: 'token',
      refreshToken: 'refresh-token',
      permissions: [],
    })

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const rememberMeCheckbox = screen.getByLabelText(/remember me/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'admin@flexflow.com')
    await user.type(passwordInput, 'admin123')
    await user.click(rememberMeCheckbox)
    await user.click(submitButton)

    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'admin@flexflow.com',
      password: 'admin123',
      rememberMe: true,
    })
  })

  it('should show loading state during submission', async () => {
    // Make login take some time
    mockAuthService.login.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        user: { id: '1', email: 'test@test.com' },
        accessToken: 'token',
        refreshToken: 'refresh-token',
        permissions: [],
      }), 100))
    )

    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    )

    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'admin@flexflow.com')
    await user.type(passwordInput, 'admin123')
    await user.click(submitButton)

    // Should show loading state
    expect(submitButton).toBeDisabled()

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
  })

  it('should call onForgotPassword when forgot password link is clicked', async () => {
    const mockOnForgotPassword = jest.fn()

    render(
      <TestWrapper>
        <LoginForm onForgotPassword={mockOnForgotPassword} />
      </TestWrapper>
    )

    const forgotPasswordLink = screen.getByText(/forgot your password/i)
    await user.click(forgotPasswordLink)

    expect(mockOnForgotPassword).toHaveBeenCalled()
  })
})