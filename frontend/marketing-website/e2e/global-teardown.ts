import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🏁 FlexFlow Marketing Website E2E Tests completed');
  
  // Add any global teardown logic here
  // For example, you might want to:
  // - Clean up test data
  // - Stop external services
  // - Generate final reports
}

export default globalTeardown;