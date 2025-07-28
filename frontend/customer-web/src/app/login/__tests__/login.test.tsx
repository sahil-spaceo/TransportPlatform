import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockUsers } from '@/utils/test-utils'
import LoginPage from '../page'

// Mock the useRouter hook
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock the AuthContext
const mockLogin = jest.fn()
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset localStorage mock
    localStorage.clear()
  })

  it('renders login form with all required fields', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByText('Sign in to your FlexFlow account')).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('displays demo accounts section', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('Demo Accounts')).toBeInTheDocument()
    expect(screen.getByText('Gold Member')).toBeInTheDocument()
    expect(screen.getByText('Silver Member')).toBeInTheDocument()
    expect(screen.getByText('Basic Member')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    await user.click(signInButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter your email address')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'invalid-email')
    await user.click(signInButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('validates password requirement', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'test@example.com')
    await user.click(signInButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter your password')).toBeInTheDocument()
    })
  })

  it('attempts login with valid credentials', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(undefined)
    
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'demo@flexflow.com')
    await user.type(passwordInput, 'password123')
    await user.click(signInButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'demo@flexflow.com',
          firstName: 'Demo',
          lastName: 'User',
          subscriptionTier: 'gold',
        })
      )
    })
    
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('handles login failure', async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'))
    
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'wrong@example.com')
    await user.type(passwordInput, 'wrongpassword')
    await user.click(signInButton)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument()
    })
  })

  it('allows demo account quick login', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(undefined)
    
    render(<LoginPage />)
    
    const goldDemoButton = screen.getByText('Use Gold Demo')
    await user.click(goldDemoButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'demo@flexflow.com',
          subscriptionTier: 'gold',
        })
      )
    })
  })

  it('disables form during loading state', async () => {
    const user = userEvent.setup()
    // Mock a pending login
    mockLogin.mockImplementation(() => new Promise(() => {})) // Never resolves
    
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    
    await user.type(emailInput, 'demo@flexflow.com')
    await user.type(passwordInput, 'password123')
    await user.click(signInButton)
    
    // Check that the form is disabled during loading
    await waitFor(() => {
      expect(signInButton).toBeDisabled()
      expect(signInButton).toHaveTextContent('Signing in...')
    })
  })

  it('navigates to signup page', async () => {
    const user = userEvent.setup()
    render(<LoginPage />)
    
    const signUpLink = screen.getByText("Don't have an account? Sign up")
    await user.click(signUpLink)
    
    expect(mockPush).toHaveBeenCalledWith('/signup')
  })

  it('shows success message on successful login', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(undefined)
    
    render(<LoginPage />)
    
    // Use demo account for quick test
    const goldDemoButton = screen.getByText('Use Gold Demo')
    await user.click(goldDemoButton)
    
    await waitFor(() => {
      expect(screen.getByText('Login successful! Redirecting to dashboard...')).toBeInTheDocument()
    })
  })

  it('handles different demo account types', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValue(undefined)
    
    render(<LoginPage />)
    
    // Test Silver demo
    const silverDemoButton = screen.getByText('Use Silver Demo')
    await user.click(silverDemoButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          subscriptionTier: 'silver',
        })
      )
    })
    
    // Clear mock and test Basic demo
    mockLogin.mockClear()
    const basicDemoButton = screen.getByText('Use Basic Demo')
    await user.click(basicDemoButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          subscriptionTier: 'basic',
        })
      )
    })
  })

  it('clears error messages when user starts typing', async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValueOnce(new Error('Login failed'))
    
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const signInButton = screen.getByRole('button', { name: /sign in/i })
    
    // First, trigger an error
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password')
    await user.click(signInButton)
    
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument()
    })
    
    // Then start typing to clear the error
    await user.clear(emailInput)
    await user.type(emailInput, 'new@example.com')
    
    // Error message should be cleared
    expect(screen.queryByText('Invalid email or password. Please try again.')).not.toBeInTheDocument()
  })
})