import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/utils/test-utils'
import SignupPage from '../page'

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

describe('SignupPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders signup form with all required fields', () => {
    render(<SignupPage />)
    
    expect(screen.getByText('Join FlexFlow')).toBeInTheDocument()
    expect(screen.getByText('Create your account and start your journey')).toBeInTheDocument()
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/password/i)).toHaveLength(2) // Password and Confirm Password
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('displays subscription tier selection', () => {
    render(<SignupPage />)
    
    expect(screen.getByText('Choose Your Plan')).toBeInTheDocument()
    expect(screen.getByText('Basic')).toBeInTheDocument()
    expect(screen.getByText('Silver')).toBeInTheDocument()
    expect(screen.getByText('Gold')).toBeInTheDocument()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('$9.99/mo')).toBeInTheDocument()
    expect(screen.getByText('$19.99/mo')).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<SignupPage />)
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<SignupPage />)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'invalid-email')
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument()
    })
  })

  it('validates password length', async () => {
    const user = userEvent.setup()
    render(<SignupPage />)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText('Password')
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, '123')
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
    })
  })

  it('validates password confirmation', async () => {
    const user = userEvent.setup()
    render(<SignupPage />)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'different123')
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
    })
  })

  it('allows subscription tier selection', async () => {
    const user = userEvent.setup()
    render(<SignupPage />)
    
    // Click on Silver tier
    const silverTier = screen.getByText('Silver').closest('div')
    await user.click(silverTier!)
    
    expect(screen.getByText('Selected: Silver')).toBeInTheDocument()
    
    // Click on Gold tier
    const goldTier = screen.getByText('Gold').closest('div')
    await user.click(goldTier!)
    
    expect(screen.getByText('Selected: Gold')).toBeInTheDocument()
  })

  it('creates account with valid data', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(undefined)
    
    render(<SignupPage />)
    
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const phoneInput = screen.getByLabelText(/phone number/i)
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(firstNameInput, 'John')
    await user.type(lastNameInput, 'Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(phoneInput, '+1234567890')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    
    // Select Gold tier
    const goldTier = screen.getByText('Gold').closest('div')
    await user.click(goldTier!)
    
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'john@example.com',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1234567890',
          subscriptionTier: 'gold',
        })
      )
    })
    
    await waitFor(() => {
      expect(screen.getByText('Account created successfully! Redirecting to dashboard...')).toBeInTheDocument()
    })
  })

  it('handles signup failure', async () => {
    const user = userEvent.setup()
    mockLogin.mockRejectedValueOnce(new Error('Signup failed'))
    
    render(<SignupPage />)
    
    // Fill out form
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'password123')
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(screen.getByText('Signup failed. Please try again.')).toBeInTheDocument()
    })
  })

  it('disables form during loading', async () => {
    const user = userEvent.setup()
    // Mock pending signup
    mockLogin.mockImplementation(() => new Promise(() => {})) // Never resolves
    
    render(<SignupPage />)
    
    // Fill out form quickly
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'password123')
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(createAccountButton).toBeDisabled()
      expect(createAccountButton).toHaveTextContent('Creating Account...')
    })
  })

  it('navigates to login page', async () => {
    const user = userEvent.setup()
    render(<SignupPage />)
    
    const loginLink = screen.getByText('Already have an account? Sign in')
    await user.click(loginLink)
    
    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('displays demo mode notice', () => {
    render(<SignupPage />)
    
    expect(screen.getByText('Demo Mode:')).toBeInTheDocument()
    expect(screen.getByText(/This creates a mock account for development purposes/)).toBeInTheDocument()
  })

  it('redirects to dashboard after successful signup', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(undefined)
    
    render(<SignupPage />)
    
    // Fill out form
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'password123')
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    await user.click(createAccountButton)
    
    // Wait for success message and redirect
    await waitFor(() => {
      expect(screen.getByText('Account created successfully! Redirecting to dashboard...')).toBeInTheDocument()
    })
    
    // Wait for redirect (the component has a 2-second timeout)
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    }, { timeout: 3000 })
  })

  it('defaults to basic subscription tier', () => {
    render(<SignupPage />)
    
    expect(screen.getByText('Selected: Basic')).toBeInTheDocument()
  })

  it('handles optional phone field correctly', async () => {
    const user = userEvent.setup()
    mockLogin.mockResolvedValueOnce(undefined)
    
    render(<SignupPage />)
    
    // Fill out form without phone
    await user.type(screen.getByLabelText(/first name/i), 'John')
    await user.type(screen.getByLabelText(/last name/i), 'Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'password123')
    
    const createAccountButton = screen.getByRole('button', { name: /create account/i })
    await user.click(createAccountButton)
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        expect.objectContaining({
          phone: '', // Should be empty string when not provided
        })
      )
    })
  })
})