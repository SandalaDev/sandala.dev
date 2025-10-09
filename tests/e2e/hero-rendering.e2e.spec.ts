
import { test, expect } from '@playwright/test';

const tailwindBreakpoints = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
};

test.describe('Hero section rendering on different breakpoints', () => {
  for (const breakpoint in tailwindBreakpoints) {
    test(`should render correctly on ${breakpoint} breakpoint`, async ({ page }) => {
      await page.setViewportSize({ width: tailwindBreakpoints[breakpoint], height: 800 });
      await page.goto('http://localhost:3000');
      
      const heroSelector = 'article > div.container';
      const heroElement = await page.waitForSelector(heroSelector);

      await expect(heroElement).toBeVisible();
      
      await heroElement.screenshot({ path: `tests/e2e/screenshots/hero-${breakpoint}.png` });
    });
  }
});
