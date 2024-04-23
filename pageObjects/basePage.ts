import { Page, Locator, expect } from "@playwright/test";

export default class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToPage(url: string) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async assertPageUrl(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async assertText(selector: Locator, text: string) {
    await expect(selector).toHaveText(text);
  }

  async clickButton(selector: Locator) {
    await selector.click();
  }

  async blockAds() {
    await this.page.route("**/*", (route) => {
      route.request().url().startsWith("https://googleads.")
        ? route.abort()
        : route.continue();
      return;
    });
  }
}
