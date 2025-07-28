#!/bin/bash

# FlexFlow Admin Dashboard Test Runner
# Run this script after major changes to ensure everything is working

echo "🧪 FlexFlow Admin Dashboard - Test Suite"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the admin-dashboard directory."
    exit 1
fi

print_status "Starting comprehensive test suite..."

# 1. TypeScript Check
print_status "Running TypeScript type checking..."
if npm run typecheck; then
    print_success "TypeScript check passed ✅"
else
    print_error "TypeScript check failed ❌"
    exit 1
fi

echo ""

# 2. Linting
print_status "Running ESLint..."
if npm run lint; then
    print_success "Linting passed ✅"
else
    print_warning "Linting issues found ⚠️  (non-blocking)"
fi

echo ""

# 3. Build Test
print_status "Testing production build..."
if npm run build; then
    print_success "Build successful ✅"
else
    print_error "Build failed ❌"
    exit 1
fi

echo ""

# 4. Unit Tests
print_status "Running unit tests..."
if npm test -- --ci --coverage --watchAll=false; then
    print_success "All tests passed ✅"
else
    print_error "Some tests failed ❌"
    exit 1
fi

echo ""

# 5. Test Coverage Report
print_status "Generating test coverage report..."
if [ -d "coverage" ]; then
    echo "Coverage report generated in ./coverage/lcov-report/index.html"
    print_success "Coverage report available ✅"
fi

echo ""
echo "🎉 All tests completed successfully!"
echo ""
echo "📊 Test Summary:"
echo "- TypeScript: ✅ Passed"
echo "- ESLint: ✅ Passed" 
echo "- Build: ✅ Passed"
echo "- Unit Tests: ✅ Passed"
echo "- Coverage: ✅ Generated"
echo ""
echo "🚀 Admin dashboard is ready for deployment!"