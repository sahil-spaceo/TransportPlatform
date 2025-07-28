import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/utils/test-utils'
import LoginPage from '@/app/login/page'
import DashboardPage from '@/app/dashboard/page'
import ProfilePage from '@/app/profile/page'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock AuthContext with state management
let mockAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const mockLogin = jest.fn()
const mockLogout = jest.fn()
const mockUpdateUser = jest.fn()

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    ...mockAuthState,
    login: mockLogin,
    logout: mockLogout,
    updateUser: mockUpdateUser,
  }),
}))

describe('User Flow Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuthState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    }
  })

  describe('Complete Login to Dashboard Flow', () => {
    it('allows user to login and navigate to dashboard', async () => {
      const user = userEvent.setup()
      
      // Mock successful login
      mockLogin.mockImplementation(async (userData) => {
        mockAuthState.user = userData
        mockAuthState.isAuthenticated = true
      })
      
      // Start at login page
      render(<LoginPage />)
      
      // Fill in login form
      const emailInput = screen.getByLabelText(/email address/i)
      const passwordInput = screen.getByLabelText(/password/i)
      const signInButton = screen.getByRole('button', { name: /sign in/i })
      
      await user.type(emailInput, 'demo@flexflow.com')
      await user.type(passwordInput, 'password123')
      await user.click(signInButton)
      
      // Verify login was called
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({
          email: 'demo@flexflow.com',
          subscriptionTier: 'gold',
        }))
      })
      
      // Verify redirect to dashboard
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('shows error message for invalid credentials', async () => {
      const user = userEvent.setup()
      
      // Mock login failure
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
  })

  describe('Dashboard to Profile Navigation', () => {
    it('allows authenticated user to navigate from dashboard to profile', async () => {
      const user = userEvent.setup()
      
      // Set up authenticated state
      mockAuthState.user = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        subscriptionTier: 'gold',
        createdAt: '2024-01-01T00:00:00Z',
      }
      mockAuthState.isAuthenticated = true
      
      // Start at dashboard
      const { rerender } = render(<DashboardPage />, {
        initialAuthState: mockAuthState
      })
      
      // Verify dashboard content
      expect(screen.getByText('Welcome back, Test!')).toBeInTheDocument()
      expect(screen.getByText('👑 Gold Member Benefits')).toBeInTheDocument()
      
      // Navigate to profile (simulated)
      rerender(<ProfilePage />)
      
      // Verify profile content
      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('test@example.com')).toBeInTheDocument()
    })
  })

  describe('Profile Update Flow', () => {
    it('allows user to update profile information', async () => {
      const user = userEvent.setup()
      
      // Mock successful update
      mockUpdateUser.mockResolvedValueOnce(undefined)
      
      // Set up authenticated state
      const initialUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: '+1234567890',
        subscriptionTier: 'basic',
        createdAt: '2024-01-01T00:00:00Z',
      }
      
      mockAuthState.user = initialUser
      mockAuthState.isAuthenticated = true
      
      render(<ProfilePage />, {
        initialAuthState: mockAuthState
      })
      
      // Update first name
      const firstNameInput = screen.getByLabelText(/first name/i)
      const saveButton = screen.getByRole('button', { name: 'Save Changes' })
      
      await user.clear(firstNameInput)
      await user.type(firstNameInput, 'Updated')
      await user.click(saveButton)
      
      await waitFor(() => {
        expect(mockUpdateUser).toHaveBeenCalledWith({
          firstName: 'Updated',
          lastName: 'User',
          email: 'test@example.com',
          phone: '+1234567890',
        })
      })
      
      await waitFor(() => {
        expect(screen.getByText('Profile updated successfully!')).toBeInTheDocument()
      })
    })
  })

  describe('Quick Demo Account Login Flow', () => {
    it('allows quick login with demo accounts', async () => {
      const user = userEvent.setup()
      
      mockLogin.mockResolvedValueOnce(undefined)
      
      render(<LoginPage />)
      
      // Use Gold demo account
      const goldDemoButton = screen.getByText('Use Gold Demo')
      await user.click(goldDemoButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({
          subscriptionTier: 'gold',
          email: 'demo@flexflow.com',
        }))
      })
      
      await waitFor(() => {
        expect(screen.getByText('Login successful! Redirecting to dashboard...')).toBeInTheDocument()
      })
    })

    it('works with different demo account tiers', async () => {
      const user = userEvent.setup()
      
      mockLogin.mockResolvedValue(undefined)
      
      render(<LoginPage />)
      
      // Test Silver demo
      const silverDemoButton = screen.getByText('Use Silver Demo')
      await user.click(silverDemoButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({
          subscriptionTier: 'silver',
        }))
      })
      
      // Clear and test Basic demo
      mockLogin.mockClear()
      const basicDemoButton = screen.getByText('Use Basic Demo')
      await user.click(basicDemoButton)
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(expect.objectContaining({
          subscriptionTier: 'basic',
        }))
      })
    })
  })

  describe('Subscription Tier Feature Access', () => {
    it('shows appropriate features for different subscription tiers', () => {
      // Test Basic user
      mockAuthState.user = {
        id: '1',
        email: 'basic@test.com',
        firstName: 'Basic',
        lastName: 'User',
        subscriptionTier: 'basic',
        createdAt: '2024-01-01T00:00:00Z',
      }
      mockAuthState.isAuthenticated = true
      
      const { rerender } = render(<DashboardPage />, {
        initialAuthState: mockAuthState
      })
      
      // Basic user should see upgrade prompts
      expect(screen.getByText('🌟 Upgrade to Silver or Gold')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Upgrade to Access' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Upgrade to Gold' })).toBeInTheDocument()
      
      // Test Gold user
      mockAuthState.user.subscriptionTier = 'gold'
      
      rerender(<DashboardPage />)
      
      // Gold user should see premium features
      expect(screen.getByText('👑 Gold Member Benefits')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Use Drone' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Share Ride' })).toBeInTheDocument()
    })
  })

  describe('Error Handling and Edge Cases', () => {
    it('handles undefined user properties gracefully throughout the flow', () => {
      const userWithMissingProps = {
        id: '1',
        email: 'incomplete@test.com',
        // Missing firstName, lastName, subscriptionTier
        createdAt: '2024-01-01T00:00:00Z',
      }
      
      mockAuthState.user = userWithMissingProps
      mockAuthState.isAuthenticated = true
      
      // Should not crash with undefined properties
      const { container } = render(<DashboardPage />, {
        initialAuthState: mockAuthState
      })
      
      expect(container).toBeInTheDocument()
      expect(screen.getByText('Welcome back, User!')).toBeInTheDocument() // Default name
      expect(screen.getByText('🌟 Welcome to FlexFlow')).toBeInTheDocument() // Default tier
    })

    it('handles profile update failures gracefully', async () => {
      const user = userEvent.setup()
      
      // Mock update failure
      mockUpdateUser.mockRejectedValueOnce(new Error('Update failed'))
      
      mockAuthState.user = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        subscriptionTier: 'basic',
        createdAt: '2024-01-01T00:00:00Z',
      }
      mockAuthState.isAuthenticated = true
      
      render(<ProfilePage />, {
        initialAuthState: mockAuthState
      })
      
      const saveButton = screen.getByRole('button', { name: 'Save Changes' })
      await user.click(saveButton)
      
      await waitFor(() => {
        expect(mockUpdateUser).toHaveBeenCalled()
      })
      
      // Should not show success message on failure
      expect(screen.queryByText('Profile updated successfully!')).not.toBeInTheDocument()
    })
  })

  describe('Navigation State Management', () => {
    it('maintains authentication state across navigation', () => {
      const authenticatedUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        subscriptionTier: 'gold',
        createdAt: '2024-01-01T00:00:00Z',
      }
      
      mockAuthState.user = authenticatedUser
      mockAuthState.isAuthenticated = true
      
      // Start at dashboard
      const { rerender } = render(<DashboardPage />, {
        initialAuthState: mockAuthState
      })
      
      expect(screen.getByText('Welcome back, Test!')).toBeInTheDocument()
      
      // Navigate to profile
      rerender(<ProfilePage />)
      
      expect(screen.getByText('Test User')).toBeInTheDocument()
      
      // Navigate back to dashboard
      rerender(<DashboardPage />)
      
      expect(screen.getByText('Welcome back, Test!')).toBeInTheDocument()
    })
  })
})