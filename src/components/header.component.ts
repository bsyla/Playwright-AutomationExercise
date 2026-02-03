import { expect, Page, Locator } from "@playwright/test";

export class HeaderComponent {
  private readonly page: Page;
  private readonly loginLink: Locator;
  private readonly logoutLink: Locator;
  private readonly deleteAccountLink: Locator;
  private readonly cartLink: Locator;
  private readonly homeLink: Locator;
  private readonly loggedInLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: /Signup \/ Login/i });
    this.logoutLink = page.getByRole("link", { name: /Logout/i });
    this.deleteAccountLink = page.getByRole("link", { name: /Delete Account/i });
    this.cartLink = page.getByRole("link", { name: /Cart/i });
    this.homeLink = page.getByRole("link", { name: /Home/i });
    this.loggedInLabel = page.getByText(/Logged in as/i);
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async goHome() {
    await this.homeLink.click();
  }

  async expectLoggedIn(expectedName?: string) {
    await expect(this.loggedInLabel).toBeVisible();
    if (expectedName) {
      await expect(this.loggedInLabel).toContainText(expectedName);
    }
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.loginLink).toBeVisible();
  }

  async deleteAccount() {
    await expect(this.deleteAccountLink).toBeVisible();
    await this.deleteAccountLink.click();
  }
}
