import { Page, expect } from "@playwright/test";

export class HomePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async newsletterSubscription() {
    await this.page.locator('input[type="email"]').fill("asdf@asdf.com");
    await this.page.getByText("I agree with the Privacy").click();
    await this.page.getByRole("button", { name: "Submit" }).click();

    // Assert that the thank you message appears
    const thankYouMessageLocator = this.page.locator("text=Thank you for signing up for our newsletter! You are in!");
    await expect(thankYouMessageLocator).toBeVisible();
  }

  async testingSearchField() {
    await this.page.getByRole("button", { name: "Search" }).first().click();
    const searchField = this.page.getByPlaceholder("Search...").first();
    await searchField.fill("DevOps");
    await searchField.press("Enter");

    // Assert that the message is not visible, that means there are actual results
    await expect(this.page.locator(".elementor-posts")).not.toHaveText("It seems we can't find what you're looking for.");
  }

  async testSocialMediaIcons() {
    // click on the link and wait for the new tab to get triggered
    const [newTab] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.page.locator("//span[contains(text(),'Instagram')]").click(),
    ]);

    // wait for the new tab to load
    await newTab.waitForLoadState();

    await expect(newTab).toHaveTitle(
      "Strypes (@strypes.group) • Instagram photos and videos"
    );
  }

  async testChatbot() {
    const iframe = this.page.frameLocator('[data-test-id="chat-widget-iframe"]');

    // Click the "Open live chat" button
    await iframe.getByLabel("Open live chat").click();
    await iframe.getByRole("button", { name: "Other" }).click();

    // Assert that the chatbot response appears
    const thankYouMessageLocator = iframe.locator( "//div[contains(.,'Before we move on, can I please have your first and last name?')]") .first();
    await expect(thankYouMessageLocator).toBeVisible();
  }

  async testContactUsForm() {
    await this.page.getByRole('link', { name: 'Contact'}).first().click()
    await this.page.getByPlaceholder("First name:").fill("First Name");
    await this.page.getByPlaceholder("Last name:").fill("Last Name");
    await this.page.getByPlaceholder("E-mail:*").fill("test@te.com");
    await this.page.getByPlaceholder("Company name:").fill("Google");
    await this.page.getByPlaceholder("Messages:").fill("Test message");
    await this.page.getByLabel("I agree with the Privacy policy and Terms of use.*").check();
    await this.page.getByRole('button', { name: 'SEND'}).click()
   
    const messageLocator = this.page.locator('.submitted-message');
    await expect(messageLocator).toContainText('Thank you for submitting the form.');
  }
}
