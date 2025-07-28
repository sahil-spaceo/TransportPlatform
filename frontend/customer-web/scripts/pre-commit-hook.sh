#!/bin/bash

# FlexFlow Customer Web - Pre-commit Hook
# This script runs before each commit to ensure code quality

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Running pre-commit checks...${NC}"
echo ""

# Function to print colored status
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS")
            echo -e "${GREEN}✓ $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}✗ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠ $message${NC}"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ $message${NC}"
            ;;
    esac
}

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    print_status "ERROR" "package.json not found. Are you in the correct directory?"
    exit 1
fi

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -z "$STAGED_FILES" ]; then
    print_status "INFO" "No TypeScript/JavaScript files staged for commit"
    exit 0
fi

print_status "INFO" "Found $(echo "$STAGED_FILES" | wc -l | xargs) staged files to check"

# Run TypeScript type checking
print_status "INFO" "Running TypeScript type checking..."
if npm run typecheck > /dev/null 2>&1; then
    print_status "SUCCESS" "TypeScript type checking passed"
else
    print_status "ERROR" "TypeScript type checking failed"
    echo ""
    echo "Please fix TypeScript errors before committing:"
    npm run typecheck
    exit 1
fi

# Run ESLint on staged files
print_status "INFO" "Running ESLint on staged files..."
echo "$STAGED_FILES" | xargs npm run lint -- --quiet 2>/dev/null
if [ $? -eq 0 ]; then
    print_status "SUCCESS" "ESLint passed"
else
    print_status "ERROR" "ESLint failed"
    echo ""
    echo "Please fix linting errors before committing:"
    echo "$STAGED_FILES" | xargs npm run lint --
    exit 1
fi

# Run tests related to staged files
print_status "INFO" "Running tests for staged files..."

# Find test files related to staged files
TEST_FILES=""
for file in $STAGED_FILES; do
    # Look for corresponding test files
    dir=$(dirname "$file")
    base=$(basename "$file" | sed 's/\.(ts|tsx|js|jsx)$//')
    
    # Check for test files in same directory
    if [ -f "$dir/__tests__/$base.test.tsx" ]; then
        TEST_FILES="$TEST_FILES $dir/__tests__/$base.test.tsx"
    elif [ -f "$dir/__tests__/$base.test.ts" ]; then
        TEST_FILES="$TEST_FILES $dir/__tests__/$base.test.ts"
    elif [ -f "$dir/$base.test.tsx" ]; then
        TEST_FILES="$TEST_FILES $dir/$base.test.tsx"
    elif [ -f "$dir/$base.test.ts" ]; then
        TEST_FILES="$TEST_FILES $dir/$base.test.ts"
    fi
done

if [ -n "$TEST_FILES" ]; then
    print_status "INFO" "Running specific tests: $(echo $TEST_FILES | wc -w | xargs) files"
    if npm test -- --testPathPattern="$(echo $TEST_FILES | tr ' ' '|')" --passWithNoTests --silent > /dev/null 2>&1; then
        print_status "SUCCESS" "Related tests passed"
    else
        print_status "ERROR" "Related tests failed"
        echo ""
        echo "Please fix failing tests before committing:"
        npm test -- --testPathPattern="$(echo $TEST_FILES | tr ' ' '|')" --passWithNoTests
        exit 1
    fi
else
    print_status "INFO" "No related test files found, running quick unit test suite"
    if npm test -- --testPathIgnorePatterns=integration --passWithNoTests --silent > /dev/null 2>&1; then
        print_status "SUCCESS" "Quick test suite passed"
    else
        print_status "WARNING" "Some tests failed, but allowing commit"
        print_status "INFO" "Run 'npm test' to see detailed results"
    fi
fi

# Check for common issues
print_status "INFO" "Checking for common issues..."

# Check for console.log statements (excluding test files)
CONSOLE_LOGS=$(echo "$STAGED_FILES" | grep -v test | xargs grep -l "console\.log" 2>/dev/null || true)
if [ -n "$CONSOLE_LOGS" ]; then
    print_status "WARNING" "Found console.log statements in:"
    echo "$CONSOLE_LOGS"
    print_status "INFO" "Consider removing console.log statements before committing"
fi

# Check for TODO/FIXME comments
TODOS=$(echo "$STAGED_FILES" | xargs grep -l "TODO\|FIXME" 2>/dev/null || true)
if [ -n "$TODOS" ]; then
    print_status "INFO" "Found TODO/FIXME comments in:"
    echo "$TODOS"
fi

# Check for hardcoded localhost URLs (excluding test files)
LOCALHOST_URLS=$(echo "$STAGED_FILES" | grep -v test | xargs grep -l "localhost:[0-9]" 2>/dev/null || true)
if [ -n "$LOCALHOST_URLS" ]; then
    print_status "WARNING" "Found hardcoded localhost URLs in:"
    echo "$LOCALHOST_URLS"
    print_status "INFO" "Consider using environment variables for URLs"
fi

print_status "SUCCESS" "Pre-commit checks completed"
echo ""
echo -e "${GREEN}🎉 Ready to commit!${NC}"
exit 0