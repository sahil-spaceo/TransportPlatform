#!/bin/bash

# FlexFlow Customer Web - Automated Test Runner
# This script runs comprehensive tests and generates reports

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="FlexFlow Customer Web"
COVERAGE_THRESHOLD=70
TEST_TIMEOUT=300000  # 5 minutes

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}  $PROJECT_NAME - Test Runner${NC}"
echo -e "${BLUE}===========================================${NC}"
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

# Function to check if dependencies are installed
check_dependencies() {
    print_status "INFO" "Checking dependencies..."
    
    if ! command -v npm &> /dev/null; then
        print_status "ERROR" "npm is not installed"
        exit 1
    fi
    
    if [ ! -f "package.json" ]; then
        print_status "ERROR" "package.json not found. Are you in the correct directory?"
        exit 1
    fi
    
    print_status "SUCCESS" "Dependencies check passed"
}

# Function to install test dependencies
install_dependencies() {
    print_status "INFO" "Installing test dependencies..."
    
    if npm install --no-audit; then
        print_status "SUCCESS" "Dependencies installed successfully"
    else
        print_status "ERROR" "Failed to install dependencies"
        exit 1
    fi
}

# Function to run type checking
run_typecheck() {
    print_status "INFO" "Running TypeScript type checking..."
    
    if npm run typecheck; then
        print_status "SUCCESS" "TypeScript type checking passed"
        return 0
    else
        print_status "ERROR" "TypeScript type checking failed"
        return 1
    fi
}

# Function to run linting
run_lint() {
    print_status "INFO" "Running ESLint..."
    
    if npm run lint; then
        print_status "SUCCESS" "Linting passed"
        return 0
    else
        print_status "ERROR" "Linting failed"
        return 1
    fi
}

# Function to run unit tests
run_unit_tests() {
    print_status "INFO" "Running unit tests..."
    
    if npm test -- --testPathIgnorePatterns=integration --passWithNoTests; then
        print_status "SUCCESS" "Unit tests passed"
        return 0
    else
        print_status "ERROR" "Unit tests failed"
        return 1
    fi
}

# Function to run integration tests
run_integration_tests() {
    print_status "INFO" "Running integration tests..."
    
    if npm test -- --testPathPattern=integration --passWithNoTests; then
        print_status "SUCCESS" "Integration tests passed"
        return 0
    else
        print_status "ERROR" "Integration tests failed"
        return 1
    fi
}

# Function to run all tests with coverage
run_tests_with_coverage() {
    print_status "INFO" "Running all tests with coverage..."
    
    if npm run test:coverage -- --watchAll=false; then
        print_status "SUCCESS" "All tests passed with coverage"
        return 0
    else
        print_status "ERROR" "Tests failed or coverage threshold not met"
        return 1
    fi
}

# Function to check coverage thresholds
check_coverage() {
    print_status "INFO" "Checking coverage thresholds..."
    
    if [ -f "coverage/coverage-summary.json" ]; then
        # Extract coverage percentages using grep and basic shell tools
        local lines_pct=$(grep -o '"lines":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1)
        local branches_pct=$(grep -o '"branches":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1)
        local functions_pct=$(grep -o '"functions":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1)
        local statements_pct=$(grep -o '"statements":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1)
        
        echo ""
        echo -e "${BLUE}Coverage Summary:${NC}"
        echo "  Lines: ${lines_pct}%"
        echo "  Branches: ${branches_pct}%"
        echo "  Functions: ${functions_pct}%"
        echo "  Statements: ${statements_pct}%"
        echo ""
        
        # Check if coverage meets threshold (basic integer comparison)
        if (( $(echo "$lines_pct >= $COVERAGE_THRESHOLD" | bc -l 2>/dev/null || echo "0") )); then
            print_status "SUCCESS" "Coverage threshold ($COVERAGE_THRESHOLD%) met"
            return 0
        else
            print_status "WARNING" "Coverage ($lines_pct%) below threshold ($COVERAGE_THRESHOLD%)"
            return 1
        fi
    else
        print_status "WARNING" "Coverage report not found"
        return 1
    fi
}

# Function to generate test report
generate_report() {
    print_status "INFO" "Generating test report..."
    
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local report_file="test-report-$(date '+%Y%m%d-%H%M%S').txt"
    
    {
        echo "==============================================="
        echo "  $PROJECT_NAME - Test Report"
        echo "==============================================="
        echo ""
        echo "Timestamp: $timestamp"
        echo "Coverage Threshold: $COVERAGE_THRESHOLD%"
        echo ""
        
        if [ -f "coverage/coverage-summary.json" ]; then
            echo "Coverage Results:"
            grep -o '"lines":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1 | xargs -I {} echo "  Lines: {}%"
            grep -o '"branches":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1 | xargs -I {} echo "  Branches: {}%"
            grep -o '"functions":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1 | xargs -I {} echo "  Functions: {}%"
            grep -o '"statements":{"pct":[0-9.]*' coverage/coverage-summary.json | grep -o '[0-9.]*$' | head -1 | xargs -I {} echo "  Statements: {}%"
        else
            echo "Coverage Results: Not available"
        fi
        
        echo ""
        echo "Test Files Executed:"
        find . -name "*.test.tsx" -o -name "*.test.ts" | sort
        
        echo ""
        echo "==============================================="
    } > "$report_file"
    
    print_status "SUCCESS" "Test report generated: $report_file"
}

# Function to clean up old reports and coverage
cleanup() {
    print_status "INFO" "Cleaning up old reports..."
    
    # Remove old test reports (keep last 5)
    ls -t test-report-*.txt 2>/dev/null | tail -n +6 | xargs rm -f 2>/dev/null || true
    
    print_status "SUCCESS" "Cleanup completed"
}

# Main execution function
main() {
    local mode=${1:-"full"}
    local exit_code=0
    
    echo -e "${BLUE}Mode: $mode${NC}"
    echo ""
    
    # Always check dependencies
    check_dependencies
    
    case $mode in
        "quick")
            print_status "INFO" "Running quick tests (unit only)..."
            run_typecheck || exit_code=1
            run_unit_tests || exit_code=1
            ;;
        "lint")
            print_status "INFO" "Running lint checks only..."
            run_lint || exit_code=1
            ;;
        "typecheck")
            print_status "INFO" "Running type checks only..."
            run_typecheck || exit_code=1
            ;;
        "unit")
            print_status "INFO" "Running unit tests only..."
            run_unit_tests || exit_code=1
            ;;
        "integration")
            print_status "INFO" "Running integration tests only..."
            run_integration_tests || exit_code=1
            ;;
        "coverage")
            print_status "INFO" "Running tests with coverage..."
            run_tests_with_coverage || exit_code=1
            check_coverage || exit_code=1
            ;;
        "ci")
            print_status "INFO" "Running CI pipeline..."
            install_dependencies || exit_code=1
            run_typecheck || exit_code=1
            run_lint || exit_code=1
            run_tests_with_coverage || exit_code=1
            check_coverage || exit_code=1
            generate_report
            ;;
        "full")
            print_status "INFO" "Running full test suite..."
            run_typecheck || exit_code=1
            run_lint || exit_code=1
            run_unit_tests || exit_code=1
            run_integration_tests || exit_code=1
            run_tests_with_coverage || exit_code=1
            check_coverage || exit_code=1
            generate_report
            cleanup
            ;;
        *)
            echo "Usage: $0 [quick|lint|typecheck|unit|integration|coverage|ci|full]"
            echo ""
            echo "Modes:"
            echo "  quick       - Run type check and unit tests only"
            echo "  lint        - Run ESLint only"
            echo "  typecheck   - Run TypeScript type checking only"
            echo "  unit        - Run unit tests only"
            echo "  integration - Run integration tests only"
            echo "  coverage    - Run all tests with coverage"
            echo "  ci          - Full CI pipeline (install deps, run all checks)"
            echo "  full        - Complete test suite with reporting (default)"
            exit 1
            ;;
    esac
    
    echo ""
    if [ $exit_code -eq 0 ]; then
        print_status "SUCCESS" "All tests completed successfully!"
        echo -e "${GREEN}===========================================${NC}"
        echo -e "${GREEN}  Test Suite: PASSED ✓${NC}"
        echo -e "${GREEN}===========================================${NC}"
    else
        print_status "ERROR" "Some tests failed!"
        echo -e "${RED}===========================================${NC}"
        echo -e "${RED}  Test Suite: FAILED ✗${NC}"
        echo -e "${RED}===========================================${NC}"
    fi
    
    exit $exit_code
}

# Run main function with all arguments
main "$@"