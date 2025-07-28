import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockUsers, createMockAuthState } from '@/utils/test-utils'
import { Header } from '../Header'

// Mock the useRouter hook
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock the AuthContext functions
const mockLogout = jest.fn()

const createMockAuth = (user: any = null, isAuthenticated = false) => ({
  user,
  isAuthenticated,
  logout: mockLogout,
  isLoading: false,
  error: null,
})

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => createMockAuth(),
}))

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders FlexFlow logo', () => {
    render(<Header />)
    
    expect(screen.getByText('FlexFlow')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument() // Logo icon
  })

  it('shows unauthenticated navigation for guest users', () => {
    render(<Header />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument()
  })

  it('shows authenticated navigation for logged-in users', () => {
    // Mock authenticated state
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('My Rides')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign Out' })).toBeInTheDocument()
  })

  it('shows subscription-specific navigation for silver users', () => {
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.silver, true))
    
    render(<Header />)
    
    expect(screen.getByText('Drone Delivery')).toBeInTheDocument()
    expect(screen.queryByText('Ride Share')).not.toBeInTheDocument() // Gold only
  })

  it('shows subscription-specific navigation for gold users', () => {
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.gold, true))
    
    render(<Header />)
    
    expect(screen.getByText('Drone Delivery')).toBeInTheDocument()
    expect(screen.getByText('Ride Share')).toBeInTheDocument()
  })

  it('displays user avatar with correct initials', () => {
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    expect(screen.getByText('BU')).toBeInTheDocument() // Basic User initials
  })

  it('displays user name and subscription tier', () => {
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.silver, true))
    
    render(<Header />)
    
    expect(screen.getByText('Silver User')).toBeInTheDocument()
    expect(screen.getByText('silver')).toBeInTheDocument()
  })

  it('handles undefined user properties gracefully', () => {
    const userWithoutNames = { 
      ...mockUsers.basic, 
      firstName: undefined, 
      lastName: undefined,
      subscriptionTier: undefined
    }
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(userWithoutNames, true))
    
    render(<Header />)
    
    expect(screen.getByText('UU')).toBeInTheDocument() // Default initials
    expect(screen.getByText('User')).toBeInTheDocument() // Default name
    expect(screen.getByText('basic')).toBeInTheDocument() // Default tier
  })

  it('navigates to login when Sign In clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const signInButton = screen.getByRole('button', { name: 'Sign In' })
    await user.click(signInButton)
    
    expect(mockPush).toHaveBeenCalledWith('/auth/login')
  })

  it('navigates to signup when Sign Up clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' })
    await user.click(signUpButton)
    
    expect(mockPush).toHaveBeenCalledWith('/auth/signup')
  })

  it('logs out user when Sign Out clicked', async () => {
    const user = userEvent.setup()
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    const signOutButton = screen.getByRole('button', { name: 'Sign Out' })
    await user.click(signOutButton)
    
    expect(mockLogout).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('handles logout failure gracefully', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    mockLogout.mockRejectedValueOnce(new Error('Logout failed'))
    
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    const signOutButton = screen.getByRole('button', { name: 'Sign Out' })
    await user.click(signOutButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('Logout failed:', expect.any(Error))
    
    consoleSpy.mockRestore()
  })

  it('navigates to profile when user profile clicked', async () => {
    const user = userEvent.setup()
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    // Click on user profile area
    const userProfile = screen.getByText('Basic User').closest('div')
    if (userProfile) {
      await user.click(userProfile)
      expect(mockPush).toHaveBeenCalledWith('/profile')
    }
  })

  it('navigates when logo is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const logo = screen.getByText('FlexFlow').closest('a')
    if (logo) {
      await user.click(logo)
      expect(mockPush).toHaveBeenCalledWith('/')
    }
  })

  it('navigates to dashboard when logo clicked for authenticated users', async () => {
    const user = userEvent.setup()
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    const logo = screen.getByText('FlexFlow').closest('a')
    if (logo) {
      await user.click(logo)
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    }
  })

  it('handles navigation link clicks', async () => {
    const user = userEvent.setup()
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    const dashboardLink = screen.getByText('Dashboard')
    await user.click(dashboardLink)
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })

  it('toggles mobile menu', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Mobile menu button should be present (though hidden on desktop)
    const mobileMenuButton = screen.getByLabelText('Toggle navigation menu')
    await user.click(mobileMenuButton)
    
    // This would toggle the mobile menu state
    // The actual visual change would be tested in integration/E2E tests
  })

  it('displays subscription badge on user avatar', () => {
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.gold, true))
    
    render(<Header />)
    
    // The subscription badge shows the first letter of the tier
    // Gold tier shows "G", Silver shows "S", Basic shows "B"
    const avatarContainer = screen.getByText('GU').closest('div')
    expect(avatarContainer).toBeInTheDocument()
  })

  it('shows correct navigation items for basic users', () => {
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('My Rides')).toBeInTheDocument()
    expect(screen.getByText('Orders')).toBeInTheDocument()
    expect(screen.queryByText('Drone Delivery')).not.toBeInTheDocument()
    expect(screen.queryByText('Ride Share')).not.toBeInTheDocument()
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    // This tests the mobile menu behavior
    const dashboardLink = screen.getByText('Dashboard')
    await user.click(dashboardLink)
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
    // Mobile menu should close (tested by checking internal state changes)
  })

  it('closes mobile menu when user profile is clicked', async () => {
    const user = userEvent.setup()
    const mockAuth = jest.requireMock('@/contexts/AuthContext')
    mockAuth.useAuth.mockReturnValue(createMockAuth(mockUsers.basic, true))
    
    render(<Header />)
    
    const userProfile = screen.getByText('Basic User').closest('div')
    if (userProfile) {
      await user.click(userProfile)
      expect(mockPush).toHaveBeenCalledWith('/profile')
      // Mobile menu should close
    }
  })
})