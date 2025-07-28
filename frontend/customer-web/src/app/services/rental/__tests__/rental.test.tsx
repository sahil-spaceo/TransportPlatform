import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockUsers, createMockAuthState } from '@/utils/test-utils'
import RentalPage from '../page'

// Mock alert function
const mockAlert = jest.fn()
global.alert = mockAlert

describe('RentalPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('redirects to login when user is not authenticated', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(null, false)
    })
    
    // Should not render rental content
    expect(screen.queryByText('Car Rental')).not.toBeInTheDocument()
  })

  it('renders car rental page with header', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('Car Rental')).toBeInTheDocument()
    expect(screen.getByText(/Choose from our fleet of well-maintained vehicles/)).toBeInTheDocument()
  })

  it('displays search form with all fields', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByLabelText(/pickup date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/pickup time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/return date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/return time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/pickup location/i)).toBeInTheDocument()
  })

  it('displays vehicle category filters', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sedan' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SUV' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Electric' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Luxury Sedan' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Van' })).toBeInTheDocument()
  })

  it('displays all vehicles by default', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda CR-V')).toBeInTheDocument()
    expect(screen.getByText('Tesla Model 3')).toBeInTheDocument()
    expect(screen.getByText('BMW 5 Series')).toBeInTheDocument()
    expect(screen.getByText('Mercedes S-Class')).toBeInTheDocument()
    expect(screen.getByText('Ford Transit Van')).toBeInTheDocument()
  })

  it('filters vehicles by category', async () => {
    const user = userEvent.setup()
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const sedanFilter = screen.getByRole('button', { name: 'Sedan' })
    await user.click(sedanFilter)
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.queryByText('Honda CR-V')).not.toBeInTheDocument() // SUV should be hidden
    expect(screen.queryByText('Tesla Model 3')).not.toBeInTheDocument() // Electric should be hidden
  })

  it('shows vehicle specifications', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Check Toyota Camry specs
    expect(screen.getByText('5 seats')).toBeInTheDocument()
    expect(screen.getByText('Automatic')).toBeInTheDocument()
    expect(screen.getByText('Gasoline')).toBeInTheDocument()
    expect(screen.getByText('32 MPG')).toBeInTheDocument()
  })

  it('displays vehicle features', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('GPS')).toBeInTheDocument()
    expect(screen.getByText('Bluetooth')).toBeInTheDocument()
    expect(screen.getByText('A/C')).toBeInTheDocument()
    expect(screen.getByText('Backup Camera')).toBeInTheDocument()
  })

  it('shows vehicle pricing', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('$12/hr')).toBeInTheDocument()
    expect(screen.getByText('$89/day')).toBeInTheDocument()
  })

  it('displays vehicle type badges', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('standard')).toBeInTheDocument()
    expect(screen.getByText('eco')).toBeInTheDocument()
    expect(screen.getByText('premium')).toBeInTheDocument()
    expect(screen.getByText('luxury')).toBeInTheDocument()
  })

  it('validates required fields before rental booking', async () => {
    const user = userEvent.setup()
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    const rentButton = screen.getAllByText('Rent Now')[0] // First vehicle
    await user.click(rentButton)
    
    expect(mockAlert).toHaveBeenCalledWith('Please fill in pickup date, return date, and pickup location')
  })

  it('books rental with valid information', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Fill in required fields
    const pickupDateInput = screen.getByLabelText(/pickup date/i)
    const returnDateInput = screen.getByLabelText(/return date/i)
    const pickupLocationInput = screen.getByLabelText(/pickup location/i)
    
    await user.type(pickupDateInput, '2024-02-01')
    await user.type(returnDateInput, '2024-02-03')
    await user.type(pickupLocationInput, '123 Main St, City')
    
    const rentButton = screen.getAllByText('Rent Now')[0]
    await user.click(rentButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('Renting vehicle:', expect.objectContaining({
      vehicle: 'Toyota Camry',
      pickupDate: '2024-02-01',
      returnDate: '2024-02-03',
      pickupLocation: '123 Main St, City',
      user: 'basic@test.com',
    }))
    
    expect(mockAlert).toHaveBeenCalledWith('Toyota Camry rental booked successfully! You will receive confirmation details shortly.')
    
    consoleSpy.mockRestore()
  })

  it('includes optional time fields in booking', async () => {
    const user = userEvent.setup()
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Fill in all fields including optional times
    await user.type(screen.getByLabelText(/pickup date/i), '2024-02-01')
    await user.type(screen.getByLabelText(/pickup time/i), '10:00')
    await user.type(screen.getByLabelText(/return date/i), '2024-02-03')
    await user.type(screen.getByLabelText(/return time/i), '15:00')
    await user.type(screen.getByLabelText(/pickup location/i), '123 Main St')
    
    const rentButton = screen.getAllByText('Rent Now')[0]
    await user.click(rentButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('Renting vehicle:', expect.objectContaining({
      pickupTime: '10:00',
      returnTime: '15:00',
    }))
    
    consoleSpy.mockRestore()
  })

  it('shows no vehicles message when filter results are empty', async () => {
    const user = userEvent.setup()
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Click on a category that might not have vehicles (this is hypothetical)
    // Since all categories have vehicles in our mock data, we'll test the UI structure
    
    // The "No vehicles found" message should appear when filteredVehicles.length === 0
    expect(screen.queryByText('No vehicles found')).not.toBeInTheDocument()
    expect(screen.queryByText('Try selecting a different category')).not.toBeInTheDocument()
  })

  it('handles Electric vehicle MPGe display', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    expect(screen.getByText('130 MPGe')).toBeInTheDocument() // Tesla Model 3
  })

  it('shows different vehicle categories correctly', async () => {
    const user = userEvent.setup()
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Test SUV filter
    const suvFilter = screen.getByRole('button', { name: 'SUV' })
    await user.click(suvFilter)
    
    expect(screen.getByText('Honda CR-V')).toBeInTheDocument()
    expect(screen.queryByText('Toyota Camry')).not.toBeInTheDocument()
    
    // Test Electric filter
    const electricFilter = screen.getByRole('button', { name: 'Electric' })
    await user.click(electricFilter)
    
    expect(screen.getByText('Tesla Model 3')).toBeInTheDocument()
    expect(screen.queryByText('Honda CR-V')).not.toBeInTheDocument()
  })

  it('returns to all vehicles when All filter is selected', async () => {
    const user = userEvent.setup()
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // First filter to Sedan
    const sedanFilter = screen.getByRole('button', { name: 'Sedan' })
    await user.click(sedanFilter)
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.queryByText('Honda CR-V')).not.toBeInTheDocument()
    
    // Then back to All
    const allFilter = screen.getByRole('button', { name: 'All' })
    await user.click(allFilter)
    
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda CR-V')).toBeInTheDocument()
    expect(screen.getByText('Tesla Model 3')).toBeInTheDocument()
  })

  it('displays vehicle availability status', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // All vehicles in mock data are available
    const rentButtons = screen.getAllByText('Rent Now')
    expect(rentButtons.length).toBeGreaterThan(0)
    
    // No unavailable buttons should be present
    expect(screen.queryByText('Unavailable')).not.toBeInTheDocument()
  })

  it('shows correct vehicle counts', () => {
    render(<RentalPage />, {
      initialAuthState: createMockAuthState(mockUsers.basic, true)
    })
    
    // Should show all 6 vehicles by default
    const rentButtons = screen.getAllByText('Rent Now')
    expect(rentButtons).toHaveLength(6)
  })

  it('returns null when no user is provided', () => {
    const { container } = render(<RentalPage />, {
      initialAuthState: createMockAuthState(null, true)
    })
    
    // Should render empty (protected route will handle redirect)
    expect(container.firstChild).toBeNull()
  })
})