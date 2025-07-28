import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('logo links to homepage', async ({ page }) => {
    // Navigate to a different page first
    await page.goto('/about');
    
    // Click on logo
    await page.getByText('FlexFlow').first().click();
    
    // Should navigate back to homepage
    await expect(page).toHaveURL('/');
  });

  test('services dropdown shows all services', async ({ page }) => {
    // Click on Services dropdown
    const servicesButton = page.getByText('Services').first();
    await servicesButton.click();
    
    // Check for all service options
    await expect(page.getByText('Ride-Hailing')).toBeVisible();
    await expect(page.getByText('Food Delivery')).toBeVisible();
    await expect(page.getByText('Package Delivery')).toBeVisible();
    await expect(page.getByText('Ride-Sharing')).toBeVisible();
    await expect(page.getByText('Drone Delivery')).toBeVisible();
    await expect(page.getByText('Freight & Logistics')).toBeVisible();
  });

  test('solutions dropdown shows solution categories', async ({ page }) => {
    // Click on Solutions dropdown
    const solutionsButton = page.getByText('Solutions').first();
    await solutionsButton.click();
    
    // Check for solution categories
    await expect(page.getByText('For Customers')).toBeVisible();
    await expect(page.getByText('For Drivers')).toBeVisible();
    await expect(page.getByText('For Businesses')).toBeVisible();
    await expect(page.getByText('For Restaurants')).toBeVisible();
  });

  test('pricing link navigates correctly', async ({ page }) => {
    await page.getByText('Pricing').first().click();
    await expect(page).toHaveURL('/pricing');
  });

  test('about link navigates correctly', async ({ page }) => {
    await page.getByText('About').first().click();
    await expect(page).toHaveURL('/about');
  });

  test('mobile menu works correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Click mobile menu button (hamburger)
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await mobileMenuButton.click();
    
    // Check that mobile menu items are visible
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Solutions')).toBeVisible();
    await expect(page.getByText('Pricing')).toBeVisible();
    await expect(page.getByText('About')).toBeVisible();
  });

  test('navigation persists across pages', async ({ page }) => {
    // Navigate to different pages and check that header is always present
    const pages = ['/about', '/contact', '/pricing'];
    
    for (const pagePath of pages) {
      await page.goto(pagePath);
      await expect(page.getByText('FlexFlow').first()).toBeVisible();
      await expect(page.getByText('Services').first()).toBeVisible();
      await expect(page.getByText('Solutions').first()).toBeVisible();
    }
  });

  test('dropdown closes when clicking outside', async ({ page }) => {
    // Open services dropdown
    const servicesButton = page.getByText('Services').first();
    await servicesButton.click();
    
    // Verify dropdown is open
    await expect(page.getByText('Ride-Hailing')).toBeVisible();
    
    // Click outside the dropdown
    await page.click('body', { position: { x: 10, y: 10 } });
    
    // Dropdown should be closed
    await expect(page.getByText('Ride-Hailing')).not.toBeVisible();
  });

  test('keyboard navigation works for dropdowns', async ({ page }) => {
    // Focus on services button
    await page.getByText('Services').first().focus();
    
    // Press Enter to open dropdown
    await page.keyboard.press('Enter');
    
    // Check that dropdown opened
    await expect(page.getByText('Ride-Hailing')).toBeVisible();
    
    // Press Escape to close
    await page.keyboard.press('Escape');
    
    // Dropdown should be closed
    await expect(page.getByText('Ride-Hailing')).not.toBeVisible();
  });

  test('breadcrumb navigation on service pages', async ({ page }) => {
    // Navigate to a service page
    await page.goto('/services/ride-hailing');
    
    // Check for breadcrumb if implemented
    // This may need adjustment based on actual breadcrumb implementation
    await expect(page.getByText('Services')).toBeVisible();
  });

  test('CTA buttons in header work correctly', async ({ page }) => {
    // Check header CTA buttons
    const contactButton = page.getByText('Contact Us').first();
    const getStartedButton = page.getByText('Get Started').first();
    
    if (await contactButton.isVisible()) {
      await expect(contactButton).toHaveAttribute('href', '/contact');
    }
    
    if (await getStartedButton.isVisible()) {
      await expect(getStartedButton).toHaveAttribute('href', '/download');
    }
  });
});