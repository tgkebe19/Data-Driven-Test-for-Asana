import { test, expect } from '@playwright/test';
import testCases from '../testCase.json'


test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((data) => {
    test(data.name, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        // Login to Asana
        await page.goto('https://app.asana.com/-/login');
        await page.getByLabel('Email address').fill('ben+pose@workwithloop.com');
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.getByLabel('Password', { exact: true }).fill('Password123');
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.waitForNavigation();
      });

      await test.step('Navigate to the project page', async () => {
        await page.getByLabel(data.leftNav).click()
      });

      await test.step('Verify the card is within the right column', async () => {
    
    const columnToDo = await page.getByRole('heading', { name: data.column });
    const taskScheduleKickoff = await page.getByText(data.card_title, { exact: true });
  
    const columnBoundingBox = await columnToDo.boundingBox();
    const taskBoundingBox = await taskScheduleKickoff.boundingBox();
  
    expect(taskBoundingBox.y).toBeGreaterThan(columnBoundingBox.y); 

      });
    });
  });
});
