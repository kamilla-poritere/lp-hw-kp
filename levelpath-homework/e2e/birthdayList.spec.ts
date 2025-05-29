import { test, expect } from '@playwright/test';

test.describe('BirthdayList Component', () => {
  test('loads and displays birthday list items', async ({ page }) => {
    await page.route('**/api/birthdays', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { year: '1990', text: 'John Doe' },
          { year: '1985', text: 'Jane Smith' },
        ]),
      });
    });

    await page.goto('/');

    const loadButton = page.getByRole('button', { name: /load/i });
    await expect(loadButton).toBeVisible();
    await loadButton.click();

    const listItems = page.locator('[data-testid="birthday-list"] li');
    await expect(listItems).toHaveCount(2);
    await expect(listItems.nth(0)).toContainText('1990: John Doe');
    await expect(listItems.nth(1)).toContainText('1985: Jane Smith');
  });

  test('renders emojis correctly', async ({ page }) => {
    await page.route('**/api/birthdays', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { year: '1990', text: 'John Doe' },
          { year: '1985', text: 'Jane Smith' },
        ]),
      });
    });

    await page.goto('/');
    await page.getByRole('button', { name: /load/i }).click();

    const listItems = page.locator('[data-testid="birthday-list"] li');
    await expect(listItems).toHaveCount(2);

    const getEmojiContent = async (el: any) =>
      (await el.evaluate(node =>
        window.getComputedStyle(node, '::before').getPropertyValue('content')
      )).replace(/^"(.*)"$/, '$1');

    const emoji1 = await getEmojiContent(listItems.nth(0));
    const emoji2 = await getEmojiContent(listItems.nth(1));

    expect(emoji1).toBe('🏈');
    expect(emoji2).toBe('🎾');
  });

  test('shows error when API fails', async ({ page }) => {
    await page.route('**/api/birthdays', route => {
      route.abort();
    });

    await page.goto('/');
    await page.getByRole('button', { name: /load/i }).click();

    await expect(page.locator('text=Error')).toBeVisible();
  });
});
