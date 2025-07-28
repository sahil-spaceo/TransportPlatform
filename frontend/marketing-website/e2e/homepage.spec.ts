import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads successfully and displays main content', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/FlexFlow/);
    
    // Check for main hero section
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/The Future of Transportation/)).toBeVisible();
  });

  test('displays all service cards', async ({ page }) => {
    // Check that service cards are visible
    await expect(page.getByText('Ride-Hailing')).toBeVisible();
    await expect(page.getByText('Food Delivery')).toBeVisible();
    await expect(page.getByText('Package Delivery')).toBeVisible();
    await expect(page.getByText('Ride-Sharing')).toBeVisible();
    await expect(page.getByText('Drone Delivery')).toBeVisible();
    await expect(page.getByText('Freight & Logistics')).toBeVisible();
  });

  test('hero CTA buttons work correctly', async ({ page }) => {
    // Check that CTA buttons are present
    const getStartedButton = page.getByRole('link', { name: 'Get Started Today' });
    const viewServicesButton = page.getByRole('link', { name: 'View All Services' });
    
    await expect(getStartedButton).toBeVisible();
    await expect(viewServicesButton).toBeVisible();
    
    // Check href attributes
    await expect(getStartedButton).toHaveAttribute('href', '/download');
    await expect(viewServicesButton).toHaveAttribute('href', '/services');
  });

  test('navigation header is present and functional', async ({ page }) => {
    // Check for header elements
    await expect(page.getByText('FlexFlow')).toBeVisible();
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Solutions')).toBeVisible();
    await expect(page.getByText('Pricing')).toBeVisible();
    await expect(page.getByText('About')).toBeVisible();
  });

  test('displays statistics section', async ({ page }) => {
    // Check for key statistics
    await expect(page.getByText('5M+').first()).toBeVisible();
    await expect(page.getByText('Active Users')).toBeVisible();
    await expect(page.getByText('150+')).toBeVisible();
    await expect(page.getByText('Cities')).toBeVisible();
    await expect(page.getByText('50K+')).toBeVisible();
    await expect(page.getByText('Partner Drivers')).toBeVisible();
  });

  test('service cards are clickable and navigate correctly', async ({ page }) => {
    // Click on ride-hailing service card
    const rideHailingCard = page.getByText('Ride-Hailing').locator('..').locator('..');
    await rideHailingCard.click();
    
    // Should navigate to ride-hailing service page
    await expect(page).toHaveURL(/\/services\/ride-hailing/);
  });

  test('testimonials section is present', async ({ page }) => {
    // Check for testimonials section
    await expect(page.getByText('What Our Users Say')).toBeVisible();
    
    // Check for testimonial content
    await expect(page.getByText(/FlexFlow has revolutionized/)).toBeVisible();
  });

  test('footer is present with important links', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check for footer content (these may need adjustment based on actual footer)
    await expect(page.getByText('Ready to Transform Your Journey?')).toBeVisible();
  });

  test('is responsive on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Check that main content is still visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/The Future of Transportation/)).toBeVisible();
    
    // Check that service cards are still accessible
    await expect(page.getByText('Ride-Hailing')).toBeVisible();
  });

  test('performance - page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('accessibility - has proper heading structure', async ({ page }) => {
    // Check that there's exactly one h1
    const h1Elements = page.getByRole('heading', { level: 1 });
    await expect(h1Elements).toHaveCount(1);
    
    // Check that there are multiple h2s for sections
    const h2Elements = page.getByRole('heading', { level: 2 });
    await expect(h2Elements.first()).toBeVisible();
  });

  test('SEO - has proper meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/FlexFlow/);
    
    // Check meta description exists
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
  });
});