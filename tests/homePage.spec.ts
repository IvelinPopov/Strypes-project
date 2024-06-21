import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://strypes.eu/")
});

test('subscribe for a newsletters', async({page}) => {
  const navigateTo = new HomePage(page);
  await navigateTo.newsletterSubscription()
})

test('testing search field', async({page}) => {
  const navigateTo = new HomePage(page);
  await navigateTo.testingSearchField()
})

test('testing social media icons', async({page}) => {
  const navigateTo = new HomePage(page);
  await navigateTo.testSocialMediaIcons()
})

test('testing ChatBot', async({page}) => {
  const navigateTo = new HomePage(page);
  await navigateTo.testChatbot()
})

test('testing Contact Form', async({page}) => {
  const navigateTo = new HomePage(page);
  await navigateTo.testContactUsForm()
})

