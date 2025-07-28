import React from 'react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockUsers, createMockAuthState } from '@/utils/test-utils'
import DashboardPage from '../page'

// Mock console.log to avoid noise in tests
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

describe('DashboardPage', () => {
  afterEach(() => {
    consoleSpy.mockClear()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })

  it('redirects to login when user is not authenticated', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(null, false)
    })
    
    // Should not render dashboard content
    expect(screen.queryByText(/Welcome back/)).not.toBeInTheDocument()
  })

  it('renders welcome message with user name for basic user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('Welcome back, Basic!')).toBeInTheDocument()
    expect(screen.getByText(/Your basic membership gives you access/)).toBeInTheDocument()
  })

  it('renders welcome message with user name for silver user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.silver, true)
    })
    
    expect(screen.getByText('Welcome back, Silver!')).toBeInTheDocument()
    expect(screen.getByText(/Your silver membership gives you access/)).toBeInTheDocument()
  })

  it('renders welcome message with user name for gold user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.gold, true)
    })
    
    expect(screen.getByText('Welcome back, Gold!')).toBeInTheDocument()
    expect(screen.getByText(/Your gold membership gives you access/)).toBeInTheDocument()
  })

  it('handles user with undefined firstName gracefully', () => {
    const userWithoutName = { ...mockUsers.basic, firstName: undefined }
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(userWithoutName, true)
    })
    
    expect(screen.getByText('Welcome back, User!')).toBeInTheDocument()
  })

  it('displays correct subscription banner for basic user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('🌟 Upgrade to Silver or Gold')).toBeInTheDocument()
    expect(screen.getByText(/Unlock drone delivery, ride sharing/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'View Plans' })).toBeInTheDocument()
  })

  it('displays correct subscription banner for silver user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.silver, true)
    })
    
    expect(screen.getByText('💎 Upgrade to Gold')).toBeInTheDocument()
    expect(screen.getByText(/Get exclusive ride sharing with 30-40% savings/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Upgrade Now' })).toBeInTheDocument()
  })

  it('displays correct subscription banner for gold user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.gold, true)
    })
    
    expect(screen.getByText('👑 Gold Member Benefits')).toBeInTheDocument()
    expect(screen.getByText(/You have access to all premium features/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Manage Plan' })).toBeInTheDocument()
  })

  it('displays user stats correctly', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('24')).toBeInTheDocument() // Total Rides
    expect(screen.getByText('Total Rides')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument() // Total Orders
    expect(screen.getByText('Total Orders')).toBeInTheDocument()
    expect(screen.getByText('2.4 kg')).toBeInTheDocument() // CO2 Reduced
    expect(screen.getByText('CO2 Reduced')).toBeInTheDocument()
  })

  it('shows money saved stat for gold users', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.gold, true)
    })
    
    expect(screen.getByText('$156')).toBeInTheDocument()
    expect(screen.getByText('Money Saved')).toBeInTheDocument()
    expect(screen.getByText('From ride sharing')).toBeInTheDocument()
  })

  it('shows money saved upgrade prompt for non-gold users', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('Money Saved')).toBeInTheDocument()
    expect(screen.getByText('Upgrade for savings')).toBeInTheDocument()
  })

  it('displays quick actions section', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Book a Ride')).toBeInTheDocument()
    expect(screen.getByText('Order Food')).toBeInTheDocument()
    expect(screen.getByText('Drone Delivery')).toBeInTheDocument()
    expect(screen.getByText('Ride Share')).toBeInTheDocument()
  })

  it('shows appropriate quick action buttons for basic user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Order Now' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Upgrade to Access' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Upgrade to Gold' })).toBeInTheDocument()
  })

  it('shows appropriate quick action buttons for silver user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.silver, true)
    })
    
    expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Order Now' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Use Drone' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Upgrade to Gold' })).toBeInTheDocument()
  })

  it('shows appropriate quick action buttons for gold user', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.gold, true)
    })
    
    expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Order Now' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Use Drone' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Share Ride' })).toBeInTheDocument()
  })

  it('handles quick action clicks', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.gold, true)
    })
    
    const bookRideButton = screen.getByRole('button', { name: 'Book Now' })
    await user.click(bookRideButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('Book a Ride button clicked')
  })

  it('handles action card clicks', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.gold, true)
    })
    
    const rideCard = screen.getByText('Book a Ride').closest('[data-testid], div')
    if (rideCard) {
      await user.click(rideCard)
      expect(consoleSpy).toHaveBeenCalledWith('Book a Ride clicked')
    }
  })

  it('displays recent activity section', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    expect(screen.getByText('Ride to Downtown')).toBeInTheDocument()
    expect(screen.getByText('Pizza Palace Order')).toBeInTheDocument()
    expect(screen.getByText('Car Rental')).toBeInTheDocument()
    expect(screen.getByText('Package Delivery')).toBeInTheDocument()
  })

  it('displays activity details correctly', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('Trip completed • $12.50')).toBeInTheDocument()
    expect(screen.getByText('Delivered • $18.99')).toBeInTheDocument()
    expect(screen.getByText('4-hour rental completed • $45.00')).toBeInTheDocument()
    expect(screen.getByText('Documents delivered • $8.50')).toBeInTheDocument()
  })

  it('displays activity timestamps', () => {
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('1 day ago')).toBeInTheDocument()
    expect(screen.getByText('3 days ago')).toBeInTheDocument()
    expect(screen.getByText('2 days ago')).toBeInTheDocument()
  })

  it('handles subscription banner button click', async () => {
    const user = userEvent.setup()
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const viewPlansButton = screen.getByRole('button', { name: 'View Plans' })
    await user.click(viewPlansButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('Subscription action clicked')
  })

  it('handles undefined subscription tier gracefully', () => {
    const userWithoutTier = { ...mockUsers.basic, subscriptionTier: undefined }
    render(<DashboardPage />, {
      initialAuthState: createMockAuthState(userWithoutTier, true)
    })
    
    // Should default to basic tier behavior
    expect(screen.getByText('🌟 Welcome to FlexFlow')).toBeInTheDocument()
    expect(screen.getByText(/Choose a subscription plan to unlock/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Choose Plan' })).toBeInTheDocument()
  })

  it('returns null when no user is provided', () => {
    const { container } = render(<DashboardPage />, {
      initialAuthState: createMockAuthState(null, true)
    })
    
    // Should render empty (protected route will handle redirect)
    expect(container.firstChild).toBeNull()
  })
})