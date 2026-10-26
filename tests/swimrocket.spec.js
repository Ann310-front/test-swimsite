import { test, expect } from '@playwright/test';

test.describe('Страница обучения плаванию SwimRocket', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/obuchenie/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    const formTitle = page.getByText('ОСТАВИТЬ ЗАЯВКУ').first();
    await formTitle.scrollIntoViewIfNeeded();
    await expect(formTitle).toBeVisible();
  });

  test('Проверка наличия ключевых текстов на странице', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Преимущества персональных тренировок/i })).toBeVisible();
    await expect(page.getByText(/Максимальное вовлечение в процесс/i).first()).toBeVisible();
    await expect(page.getByText(/100% внимания тренера/i).first()).toBeVisible();
    await expect(page.getByText(/Удобное время тренировок/i).first()).toBeVisible();
  });

  test('Заполнение формы заявки и проверка обязательности чекбокса', async ({ page }) => {
    const nameInput = page.locator('input[placeholder="Имя и фамилия"]:visible').first();
    const emailInput = page.locator('input[placeholder="EMAIL"]:visible').first();
    const phoneInput = page.locator('input[placeholder="ТЕЛЕФОН"]:visible').first();
    
    const submitBtn = page.locator(':visible', { hasText: /^ОТПРАВИТЬ$/i }).last();
    
    const consentCheckbox = page.locator('input[type="checkbox"]:visible').first();

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    await nameInput.fill('Иван Иванов');
    await emailInput.fill('test@example.com');
    await phoneInput.fill('+79991234567');

    await expect(consentCheckbox).not.toBeChecked();

    await consentCheckbox.evaluate((node) => {
      node.click();
    });

    await expect(consentCheckbox).toBeChecked();
  });

});
