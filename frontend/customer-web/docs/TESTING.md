# FlexFlow Customer Web - Testing Guidelines

## Overview

This document outlines the comprehensive testing strategy for the FlexFlow Customer Web platform. Our testing approach ensures robust, maintainable code and prevents regressions through automated testing.

## Testing Strategy

### 1. Test Types

- **Unit Tests**: Test individual components and functions in isolation
- **Integration Tests**: Test user flows and component interactions
- **Defensive Programming Tests**: Verify error handling and edge cases
- **End-to-End Tests**: Full user journey testing (future implementation)

### 2. Test Structure

```
src/
├── __tests__/
│   ├── integration/           # Integration tests
│   └── defensive-programming.test.tsx
├── app/
│   ├── login/__tests__/       # Page-specific unit tests
│   ├── signup/__tests__/
│   ├── dashboard/__tests__/
│   └── profile/__tests__/
├── components/
│   └── layout/__tests__/      # Component unit tests
└── utils/
    └── test-utils.tsx         # Testing utilities
```

## Testing Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **User Event**: User interaction simulation
- **jsdom**: DOM environment for testing

## Configuration Files

- `jest.config.js`: Jest configuration with Next.js integration
- `jest.setup.js`: Global test setup and mocks
- `src/utils/test-utils.tsx`: Custom render utilities

## Running Tests

### Local Development

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run CI tests
npm run test:ci
```

### Automated Scripts

```bash
# Quick tests (unit only)
./scripts/test-runner.sh quick

# Full test suite
./scripts/test-runner.sh full

# CI pipeline
./scripts/test-runner.sh ci
```

## Test Categories

### 1. Authentication Tests

**Files**: `src/app/login/__tests__/`, `src/app/signup/__tests__/`

Tests cover:
- Form validation
- Mock authentication flows
- Demo account functionality
- Error handling
- Loading states
- Navigation after success/failure

**Key Patterns**:
```typescript
// Mock authentication context
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),
}))

// Test user interactions
const user = userEvent.setup()
await user.type(emailInput, 'test@example.com')
await user.click(signInButton)
```

### 2. Dashboard Tests

**Files**: `src/app/dashboard/__tests__/`

Tests cover:
- Subscription tier-specific features
- User stats display
- Quick actions availability
- Recent activity rendering
- Defensive programming patterns

**Key Patterns**:
```typescript
// Test different subscription tiers
render(<DashboardPage />, {
  initialAuthState: createMockAuthState(mockUsers.gold, true)
})

expect(screen.getByText('👑 Gold Member Benefits')).toBeInTheDocument()
```

### 3. Profile Tests

**Files**: `src/app/profile/__tests__/`

Tests cover:
- Profile form validation
- User data display
- Tab navigation
- Password change functionality
- Form submission handling

### 4. Component Tests

**Files**: `src/components/layout/__tests__/`

Tests cover:
- Header navigation
- User avatar display
- Subscription badge rendering
- Mobile menu functionality
- Theme integration

### 5. Integration Tests

**Files**: `src/__tests__/integration/`

Tests cover:
- Complete user flows (login → dashboard → profile)
- Cross-component state management
- Navigation between pages
- Authentication persistence

### 6. Defensive Programming Tests

**Files**: `src/__tests__/defensive-programming.test.tsx`

Tests cover:
- Undefined property handling
- Null value safety
- Invalid subscription tiers
- Missing user data
- Theme system robustness

**Key Patterns**:
```typescript
// Test undefined property handling
const userWithoutNames = { 
  ...mockUsers.basic, 
  firstName: undefined,
  lastName: undefined 
}

render(<Header />, {
  initialAuthState: createMockAuthState(userWithoutNames, true)
})

// Should display fallback values
expect(screen.getByText('UU')).toBeInTheDocument() // Default initials
```

## Test Utilities

### Mock Data

```typescript
export const mockUsers = {
  basic: {
    id: '1',
    email: 'basic@test.com',
    firstName: 'Basic',
    lastName: 'User',
    subscriptionTier: 'basic',
    // ... other properties
  },
  // silver, gold variants
}
```

### Custom Render Function

```typescript
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
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
```

## Coverage Requirements

- **Minimum Coverage**: 70% for lines, branches, functions, and statements
- **Critical Paths**: 90%+ coverage for authentication and core user flows
- **Components**: All major components must have corresponding tests

### Coverage Reports

Coverage reports are generated in the `coverage/` directory:
- `coverage/lcov-report/index.html`: Interactive HTML report
- `coverage/coverage-summary.json`: JSON summary for CI/CD

## Best Practices

### 1. Test Structure

```typescript
describe('Component Name', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should describe expected behavior', () => {
    // Arrange
    const props = { /* test props */ }
    
    // Act
    render(<Component {...props} />)
    
    // Assert
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### 2. User-Centric Testing

- Use `screen.getByRole()` instead of `getByTestId()` when possible
- Test user interactions with `userEvent` library
- Focus on behavior, not implementation details

### 3. Accessibility Testing

- Test with screen readers in mind
- Verify ARIA labels and roles
- Ensure keyboard navigation works

### 4. Error Boundary Testing

```typescript
it('handles errors gracefully', () => {
  const ThrowError = () => {
    throw new Error('Test error')
  }
  
  expect(() => {
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>)
  }).not.toThrow()
})
```

## CI/CD Integration

### GitHub Actions

The `.github/workflows/test.yml` file defines our CI pipeline:

1. **Matrix Testing**: Test on Node.js 18.x and 20.x
2. **Quality Gates**: TypeScript, ESLint, and test coverage
3. **Security Scan**: npm audit for vulnerabilities
4. **Build Verification**: Ensure production build works

### Pre-commit Hooks

The `scripts/pre-commit-hook.sh` runs before each commit:

1. TypeScript type checking
2. ESLint validation
3. Related test execution
4. Code quality checks

## Debugging Tests

### Common Issues

1. **Module Not Found**:
   - Check `moduleNameMapper` in `jest.config.js`
   - Verify import paths use `@/` alias

2. **Styled Components Errors**:
   - Ensure `jest.setup.js` has proper mocks
   - Check theme provider wrapping

3. **Async Test Failures**:
   - Use `waitFor()` for async operations
   - Mock timers when testing delays

### Debug Commands

```bash
# Run specific test file
npm test -- Header.test.tsx

# Run tests in debug mode
npm test -- --verbose

# Run single test with full output
npm test -- --testNamePattern="specific test name" --verbose
```

## Maintenance

### Regular Tasks

1. **Update Snapshots**: When UI changes are intentional
2. **Review Coverage**: Ensure new code has adequate tests
3. **Clean Test Data**: Remove obsolete mock data
4. **Performance**: Monitor test execution time

### Adding New Tests

1. Create test file alongside source file or in `__tests__/` directory
2. Follow naming convention: `ComponentName.test.tsx`
3. Include in appropriate test category
4. Update this documentation if adding new patterns

## Continuous Improvement

### Metrics to Track

- Test execution time
- Coverage percentages
- Flaky test frequency
- CI/CD failure rates

### Future Enhancements

- Visual regression testing with Percy or Chromatic
- E2E testing with Playwright
- Performance testing with Lighthouse CI
- Accessibility testing automation

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [User Event Documentation](https://testing-library.com/docs/user-event/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

*This testing strategy ensures the FlexFlow Customer Web platform maintains high quality and reliability as it evolves.*